# Terminal Portfolio - Claude Code Instructions

## Project Overview
This is a Svelte + TypeScript terminal-style portfolio website customized for Ian, a Senior .NET Developer, AI Engineer, and Architect. The site mimics a terminal interface with custom commands showcasing skills, services, and contact information.

## Technology Stack
- **Framework**: Svelte 4.x
- **Build Tool**: Vite 5.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Treehouse (default)
- **Features**: 100+ terminal themes, custom commands, localStorage persistence

## Project Structure
```
terminal-portfolio/
├── src/
│   ├── components/       # Svelte components
│   │   ├── Input.svelte        # Command input with green block cursor
│   │   ├── History.svelte      # Command history display
│   │   ├── Ps1.svelte          # Prompt (guest@hostname:)
│   │   └── TeletypeOutput.svelte  # Teletype animation component
│   ├── stores/          # Svelte stores (theme, history)
│   ├── utils/
│   │   ├── commands.ts         # All terminal commands
│   │   ├── teletype.ts         # Character-by-character animation
│   │   ├── todo.ts             # Todo manager
│   │   └── tracking.ts         # Analytics tracking
│   ├── interfaces/      # TypeScript interfaces
│   └── App.svelte       # Main app component
├── public/              # Static assets (fonts, icon)
├── themes.json          # 100+ terminal color schemes
└── index.html          # Entry point
```

## Key Commands (Terminal)
When you run the site locally and type these commands:

### Portfolio Commands
- `about` - Professional introduction and tech stack
- `skills` - Detailed technical capabilities
- `services` - Services offered (AI engineering, architecture, etc.)
- `clients` - Client portfolio list (2-column desktop, 1-column mobile)
- `contact` - Shows contact info with email and LinkedIn command prompts
- `email` - Opens default email client
- `linkedin` - Opens LinkedIn profile in new tab

### System Commands
- `help` - List all available commands
- `banner` - Display ASCII art banner
- `theme set [name]` - Change color scheme (e.g., `theme set dracula`)
- `theme ls` - List all available themes
- `clear` - Clear terminal history
- `todo` - Todo list manager

### Fun Commands
- `weather [city]` - Get weather for a city
- `echo [text]` - Echo text back
- `sudo` - Try it and see 😉

## Development

### Running Locally
```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type check with svelte-check
```

### Making Changes

#### Adding/Modifying Commands
Edit `src/utils/commands.ts`:
```typescript
export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  mycommand: () => `Output text here`,
  // ... other commands
};
```

**Special Markup Tags** (parsed in History.svelte and TeletypeOutput.svelte):
- `[CMD]text[/CMD]` - Yellow bold clickable command text (executes command on click)
- `[LINK]url|displaytext[/LINK]` - Yellow bold clickable link (opens URL)
  - Format: `[LINK]mailto:email@example.com|email@example.com[/LINK]`
  - Supports mailto:, tel:, and http(s):// URLs
  - External links open in new tab with security attributes
- `[TITLE]text[/TITLE]` - Large green title with spacing logic
- `[PARA]text[/PARA]` - Paragraph text with 1rem size, normal wrapping
- `[ASCII]text[/ASCII]` - ASCII art with special sizing (0.57rem mobile, 1rem desktop)
- `[DESKTOP]text[/DESKTOP]` - Desktop-only content (hidden on mobile <640px)
- `[MOBILE]text[/MOBILE]` - Mobile-only content (hidden on desktop >640px)
- `[LIST]text[/LIST]` - List content (currently unused, kept for future)
- `[DIM]text[/DIM]` - Dimmed text (60% opacity)
- `[ARROW]` - Right arrow symbol (→)

#### Changing Default Theme
Edit `src/stores/theme.ts`:
```typescript
const defaultColorscheme: Theme = themes.find((t) => t.name === 'Treehouse')!;
```

#### Updating Personal Info
- `package.json` - Update author, email, URLs
- `index.html` - Update page title and meta description
- `src/utils/commands.ts` - Update banner ASCII art and command outputs

#### Customizing Styles
- Tailwind classes in `src/app.css`
- Component-specific styling in `.svelte` files
- Theme colors managed via `themes.json` + localStorage

**Mobile Responsiveness** (640px breakpoint):
- ASCII logo: 0.57rem font-size, line-height 1.4 on mobile
- Paragraph text: 0.875rem on mobile, 1rem on desktop
- Input font-size: 16px to prevent iOS auto-zoom
- Text-shadow removed on mobile for crisp text (prevents fuzzy rendering)
- Bottom padding (50vh) for keyboard visibility
- Centered scrolling for better keyboard UX
- Touch-friendly tap targets for clickable commands/links
- Hanging indent for bullet points on mobile (text-indent: -1em, padding-left: 1em)
- ASCII art excluded from hanging indent using `:not(:has())` selector
- Device-specific content filtering in Input.svelte before teletype animation

## Important Notes
- Browser localStorage caches the selected theme and command history
- Hot Module Replacement (HMR) enabled for fast development
- If changes don't appear, clear browser cache/localStorage or hard refresh (Ctrl+F5)
- **Commands are case-insensitive** (HELP, Help, help all work)
- The banner displays on page load automatically (no teletype animation)
- **Boot Sequence**: Site displays retro BIOS boot animation on first load (per session)
  - Plays boot sound effect
  - Beep sound on completion
  - Can be skipped by pressing any key
  - Stored in sessionStorage (resets on new tab/window)
- **Clickable Commands & Links**: All `[CMD]` and `[LINK]` tagged text is clickable
  - Commands execute directly without showing in input field
  - Hover shows underline + opacity change
  - Mobile tap-friendly with active state feedback
  - Keyboard accessible (Tab + Enter)
  - Commands in help page are all clickable
  - Contact page has clickable email, phone, LinkedIn links
- **Teletype Effect**: All command outputs (except banner/home/clear) display with character-by-character animation
  - Press any key to skip animation
  - Animation speed: 25ms per character (configurable in teletype.ts)
  - Max length: 5000 characters (configurable in teletype.ts)
  - Bright green block cursor (█) follows typing
  - Sound is currently disabled (can be re-enabled in TeletypeOutput.svelte)
- **Device-Specific Content**: Use `[DESKTOP]...[/DESKTOP]` and `[MOBILE]...[/MOBILE]` tags in command outputs
  - Content is filtered before teletype based on screen size (640px breakpoint)
  - Desktop shows only DESKTOP tags, mobile shows only MOBILE tags
  - Example: `clients` command has 2-column layout for desktop, single-column for mobile

## Deployment Options
1. **Vercel/Netlify**: Connect git repo, auto-deploy
2. **Static hosting**: Run `npm run build`, upload `dist/` folder
3. **Docker**: Use included `Dockerfile` and `docker-compose.yml`

## Deployment Notes
- **Live Site**: Deployed on Vercel with auto-deployment from GitHub
- **Repository**: https://github.com/iantiktaktoe/TikTakToe.git
- **Excluded from Git**: CLAUDE.md, TODO.md, .claude/ directory (see .gitignore)
- **Copyright Footer**: Automatically shows current year, displays Purple Ohm Ltd trading name

## Customization Ideas
- Add `projects` command to list portfolio projects
- Add `resume` command to display/download resume
- Add `github` command to link to GitHub profile
- Add `linkedin` command to link to LinkedIn
- Create custom ASCII art for different sections
- Add more interactive commands with arguments
- Re-enable typing sound (set `playSound: true` in TeletypeOutput.svelte)
- Adjust teletype speed (modify `speed` option in teletype.ts)
- Customize cursor color/shape (currently bright green █ block)

## Troubleshooting
- **Changes not showing**: Clear browser cache, check console for errors
- **Theme not changing**: Clear localStorage in browser DevTools
- **Commands not working**: Check `src/utils/commands.ts` syntax
- **Build errors**: Run `npm run check` to see TypeScript errors
- **Teletype not working**: Clear localStorage history (old entries don't have `isTyping` flag)
- **Teletype too fast/slow**: Adjust `speed` parameter in `src/utils/teletype.ts` (default: 10ms)
- **Teletype pauses/stops**: Check that content length is under maxLength (5000 chars)
- **Title spacing issues**: Check that consecutive `[TITLE]` tags have proper whitespace handling
- **Mobile ASCII logo shifted**: Ensure `.ascii-art` has `text-indent: 0 !important` on mobile
- **Device content not filtering**: Check `filterOutputForDevice()` in Input.svelte
- **Clickable commands not working**: Check `[CMD]` tags don't have extra quotes inside
- **iOS zoom issues**: Ensure input font-size is 16px minimum
- **Mobile keyboard covering input**: Check bottom padding (50vh) is applied on mobile

## Recent Updates
- ✅ Boot sequence with beep sound on completion
- ✅ Case-insensitive command execution
- ✅ Mobile UX improvements (zoom fix, keyboard visibility, fuzzy text fix)
- ✅ Clickable commands and links throughout site
- ✅ Contact page with clickable email, phone, LinkedIn
- ✅ Help page with all commands clickable
- ✅ Copyright footer with dynamic year
- ✅ Title updated to "Senior .NET Developer, AI Engineer, and Architect"
