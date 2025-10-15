# Terminal Portfolio - TODO List

## Status: Initial Setup Complete ✅

## Completed
- [x] Clone repository from m4tt72/terminal
- [x] Install dependencies
- [x] Set Treehouse theme as default
- [x] Customize package.json with Ian's info
- [x] Update HTML metadata and page title
- [x] Create custom commands: about, skills, services, contact
- [x] Update banner with custom ASCII art
- [x] Remove donate command
- [x] Initialize new git repository
- [x] Create initial commit
- [x] Set up development environment

## High Priority - Before Launch
- [ ] Replace Calendly placeholder URLs
  - [ ] package.json line 14: `"url": "calendly-link"`
  - [ ] src/utils/commands.ts line 111: `window.open("calendly-link")`
- [ ] Test all commands in browser
  - [ ] help
  - [ ] about
  - [ ] skills
  - [ ] services
  - [ ] contact
  - [ ] email
  - [ ] theme ls
  - [ ] theme set [another theme]
  - [ ] banner
- [ ] Hard refresh browser to see changes (Ctrl+F5 or Cmd+Shift+R)
- [ ] Clear localStorage if theme isn't loading
- [ ] Create/replace custom favicon (public/icon.png)

## Content Enhancements
- [ ] Add `projects` command to showcase work
  - [ ] List notable projects
  - [ ] Include tech stack for each
  - [ ] Add links to demos/repos
- [ ] Add `resume` or `cv` command
  - [ ] Display formatted resume in terminal
  - [ ] Option to download PDF
- [ ] Add `github` command with link to profile
- [ ] Add `linkedin` command with link to profile
- [ ] Consider adding `blog` or `articles` command
- [ ] Add `testimonials` or `references` command

## Visual/UX Improvements
- [ ] Test responsive design on mobile
- [ ] Create custom ASCII art variations
- [ ] Add command autocomplete suggestions
- [ ] Add command history (up/down arrows)
- [ ] Consider adding typing animation for responses
- [ ] Test color contrast/accessibility
- [ ] Add keyboard shortcuts documentation

## Technical Tasks
- [ ] Set up GitHub repository
  - [ ] Push to remote
  - [ ] Update repo URL in package.json
- [ ] Configure deployment
  - [ ] Choose platform (Vercel/Netlify/etc.)
  - [ ] Set up custom domain
  - [ ] Configure environment variables if needed
- [ ] Set up analytics (optional)
  - [ ] Add VITE_TRACKING_* environment variables
  - [ ] Configure tracking service
- [ ] Add SEO optimization
  - [ ] Open Graph tags
  - [ ] Twitter Card tags
  - [ ] Structured data

## Documentation
- [ ] Update README.md with:
  - [ ] Personal project description
  - [ ] Available commands list
  - [ ] How to contact
  - [ ] Attribution to original repo
- [ ] Add comments to complex code sections
- [ ] Document custom command patterns

## Optional Enhancements
- [ ] Add command aliases (e.g., `ls` for `help`)
- [ ] Create custom error messages
- [ ] Add Easter eggs or fun commands
- [ ] Implement command piping (advanced)
- [ ] Add ASCII art gallery command
- [ ] Create interactive tutorials/walkthrough
- [ ] Add sound effects (optional, toggle-able)
- [ ] Implement tab completion

## Future Ideas
- [ ] Blog integration
- [ ] Project filtering/search
- [ ] Real-time availability indicator
- [ ] Integration with GitHub API for live stats
- [ ] Dark/light mode toggle (separate from themes)
- [ ] Export terminal session as text
- [ ] Share specific commands via URL params

## Notes
- Original repo: https://github.com/m4tt72/terminal
- License: MIT (maintain attribution)
- Dev server: http://localhost:3000
- Build output: dist/

## Questions/Decisions Needed
- [ ] Do you want to add a projects/portfolio section?
- [ ] Should we add a downloadable resume?
- [ ] Any specific social media links to add?
- [ ] Do you want analytics tracking?
- [ ] Any other custom commands you'd like?
