# Terminal Portfolio - Claude Code Instructions

## Project Overview
This is a Svelte + TypeScript terminal-style portfolio website customized for Ian, a Senior AI Engineer & Architect. The site mimics a terminal interface with custom commands showcasing skills, services, and contact information.

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
- `[CMD]text[/CMD]` - Yellow bold command text
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
- Hanging indent for bullet points on mobile (text-indent: -1em, padding-left: 1em)
- ASCII art excluded from hanging indent using `:not(:has())` selector
- Device-specific content filtering in Input.svelte before teletype animation

## Important Notes
- Browser localStorage caches the selected theme and command history
- Hot Module Replacement (HMR) enabled for fast development
- If changes don't appear, clear browser cache/localStorage or hard refresh (Ctrl+F5)
- Commands are case-sensitive by default
- The banner displays on page load automatically (no teletype animation)
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

## To-Do Before Going Live
- [ ] Replace "calendly-link" placeholder with actual Calendly URL
  - Location 1: `package.json` line 14
  - Location 2: `src/utils/commands.ts` line 111
- [ ] Add custom favicon/icon in `public/icon.png`
- [ ] Update README.md with your own content
- [ ] Test all commands in the terminal
- [ ] Consider adding more custom commands (projects, resume, etc.)
- [ ] Set up analytics if desired (VITE_TRACKING_* env vars)

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

## Known Issues to Address
- **Mobile bullet point alignment**: Hanging indent implementation needs refinement for different bullet types
- Current hanging indent works but may need adjustment for various content structures
