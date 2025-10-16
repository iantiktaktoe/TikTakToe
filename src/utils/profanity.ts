import wordsJson from "../../words.json";
import quotesJson from "../../quotes.json";

// Convert the profanity list to lowercase for case-insensitive matching
const profanityList = wordsJson.map(word => word.toLowerCase());

// Track profanity offenses
let profanityCount = 0;
const MAX_OFFENSES = 4;

/**
 * Check if a word contains profanity by checking against the words list
 */
export function isProfane(text: string): boolean {
  const lowerText = text.toLowerCase().trim();
  return profanityList.includes(lowerText);
}

/**
 * Get current profanity offense count
 */
export function getProfanityCount(): number {
  return profanityCount;
}

/**
 * Increment profanity count and return the new count
 */
export function incrementProfanityCount(): number {
  profanityCount++;
  return profanityCount;
}

/**
 * Reset profanity count (after terminal crash)
 */
export function resetProfanityCount(): void {
  profanityCount = 0;
}

/**
 * Check if we've hit the max offense limit
 */
export function isMaxOffenseReached(): boolean {
  return profanityCount >= MAX_OFFENSES;
}

/**
 * Get a random quote from the quotes list
 */
export function getRandomQuote(): string {
  const randomIndex = Math.floor(Math.random() * quotesJson.length);
  return quotesJson[randomIndex];
}

/**
 * Generate the soap bar ASCII art with message and progress bar
 */
export function getSoapBarArt(): string {
  const quote = getRandomQuote();
  const count = getProfanityCount();
  const remaining = MAX_OFFENSES - count;

  return `[ASCII]
    ___________________
   /                   \\
  /     S O A P         \\
 /   ~~~~~~~~~~~~~~~     \\
|   ~~~~~~~~~~~~~~~~~     |
|   ~~~~~~~~~~~~~~~~~     |
|   ~~~~~~~~~~~~~~~~~     |
 \\                       /
  \\____________________/
[/ASCII]

[TITLE]Washing your mouth out with soap...[/TITLE]

[DIM]"${quote}"[/DIM]

[DIM]⚠️  ${remaining - 1} ${remaining - 1 === 1 ? 'chance' : 'chances'} left[/DIM]

[PROGRESS]`;
}

/**
 * Check if we should show the BSOD (4th offense)
 */
export function shouldShowBSOD(): boolean {
  return profanityCount >= MAX_OFFENSES;
}
