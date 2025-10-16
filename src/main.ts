import './app.css';
import App from './App.svelte';

// Display branded console message
console.log(
  '%c████████╗██╗██╗  ██╗████████╗ █████╗ ██╗  ██╗████████╗ ██████╗ ███████╗\n' +
  '%c╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔══██╗██║ ██╔╝╚══██╔══╝██╔═══██╗██╔════╝\n' +
  '%c   ██║   ██║█████╔╝    ██║   ███████║█████╔╝    ██║   ██║   ██║█████╗  \n' +
  '%c   ██║   ██║██╔═██╗    ██║   ██╔══██║██╔═██╗    ██║   ██║   ██║██╔══╝  \n' +
  '%c   ██║   ██║██║  ██╗   ██║   ██║  ██║██║  ██╗   ██║   ╚██████╔╝███████╗\n' +
  '%c   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝',
  'color: #33ff33; font-weight: bold;',
  'color: #33ff33; font-weight: bold;',
  'color: #33ff33; font-weight: bold;',
  'color: #33ff33; font-weight: bold;',
  'color: #33ff33; font-weight: bold;',
  'color: #33ff33; font-weight: bold;'
);

console.log(
  '%c👋 Hey there, fellow developer! ',
  'color: #33ff33; font-size: 16px; font-weight: bold; text-shadow: 0 0 5px #33ff33;'
);

console.log(
  '%cIan Bell %c| %cSenior AI Engineer & Architect',
  'color: #33ff33; font-size: 14px; font-weight: bold;',
  'color: #666;',
  'color: #33ff33; font-size: 14px;'
);

console.log(
  '%c25 years building systems. Shipping AI that works.\n' +
  '%cTurning vibe code into maintainable systems since 1999.',
  'color: #33ff33; font-size: 12px;',
  'color: #999; font-size: 11px; font-style: italic;'
);

console.log(
  '\n%c🔧 Tech Stack:\n' +
  '%c• LLMs (RAG, fine-tuning), vector DBs, agents, knowledge graphs\n' +
  '• .NET/C#, React, Azure, Docker, CI/CD\n' +
  '• Digital Employees (AI Agents), system architecture',
  'color: #33ff33; font-size: 13px; font-weight: bold;',
  'color: #33ff33; font-size: 11px; line-height: 1.6;'
);

console.log(
  '\n%c📧 Get in touch:\n' +
  '%cemail:    %cian@tiktaktoe.co.uk\n' +
  '%clinkedin: %chttps://linkedin.com/in/ianbellprofile',
  'color: #33ff33; font-size: 13px; font-weight: bold;',
  'color: #999; font-size: 11px;',
  'color: #33ff33; font-size: 11px;',
  'color: #999; font-size: 11px;',
  'color: #33ff33; font-size: 11px;'
);

console.log(
  '\n%c💡 Like what you see? Type %chelp%c in the terminal above to explore!',
  'color: #999; font-size: 11px;',
  'color: #33ff33; font-weight: bold; background: #001100; padding: 2px 6px; border-radius: 3px;',
  'color: #999; font-size: 11px;'
);

const app = new App({
  target: document.getElementById('app')!,
});

export default app;
