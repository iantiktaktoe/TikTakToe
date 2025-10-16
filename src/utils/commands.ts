import packageJson from "../../package.json";
import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import { todoManager } from "./todo";

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => {
    const categories = {
      About: ["about", "skills", "services", "clients"],
      Contact: ["contact", "email", "linkedin"],
      System: ["help", "clear", "cls", "home", "reboot"],
    };

    let output = "Available commands:\n\n";

    for (const [category, cmds] of Object.entries(categories)) {
      output += `${category}:\n`;
      output += cmds.map((cmd) => `  [CMD]${cmd}[/CMD]`).join("\n");
      output += "\n\n";
    }

    output += "For more information, type a command name.";

    return output;
  },
  hostname: () => hostname,
  whoami: () => "guest",
  date: () => new Date().toLocaleString(),
  debug: () => `Screen width: ${window.innerWidth}px
Device type: ${window.innerWidth <= 640 ? 'Mobile' : 'Desktop'}
Breakpoint: 640px`,
  about: () => `[TITLE]Senior .NET Developer, AI Engineer, and Architect[/TITLE]
Senior engineer supporting CTOs with hands-on delivery and architecture.
Security-cleared; enterprise-grade focus on reliability, observability, and cost control.

I turn vibe code into maintainable systems.

[DESKTOP][HEADING]Technical Stack:[/HEADING]
- LLMs (RAG, fine-tuning), vector DBs, agents, knowledge graphs
- .NET/C#, React, Azure, Docker, CI/CD
- 25 years building systems across gov, finance, pharma, legal, retail[/DESKTOP]
[MOBILE][HEADING]Technical Stack:[/HEADING]
LLMs (RAG, fine-tuning), vector DBs, agents, knowledge graphs, .NET/C#, React, Azure, Docker, CI/CD, 25 years building systems across gov, finance, pharma, legal, retail.[/MOBILE]

[DESKTOP][HEADING]Approach:[/HEADING]
Start with the problem. Ship small. Measure. Scale.

Type [CMD]'services'[/CMD] to see what I can help with.
Type [CMD]'skills'[/CMD] for detailed technical capabilities.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to get in touch.`,
  skills: () => `[TITLE]Technical Skills & Expertise[/TITLE]
[DESKTOP][HEADING]AI Engineering:[/HEADING]
  • Production RAG & C-RAG pipelines with hybrid search
  • LLM fine-tuning (LoRA/QLoRA) and evaluation frameworks
  • Agent orchestration & workflow runners
  • Vector databases & knowledge graph integration
  • On-prem and local LLM deployments

[HEADING]Full-Stack Development:[/HEADING]
  • .NET/C# backend development
  • React frontend development
  • RESTful APIs, integrations, event-driven architectures
  • Legacy modernisation & performance tuning
  • Clean architecture, TDD, CI/CD pipelines

[HEADING]Infrastructure & DevOps:[/HEADING]
  • Azure cloud platform
  • Docker containerisation
  • CI/CD automation
  • Security best practices & compliance
  • System observability & monitoring

[HEADING]Recent Work:[/HEADING]
  • LoRA-tuned Mistral models
  • Corrective RAG (C-RAG) pipeline implementation
  • On-premises LLM deployments
  • Digital employee (agent) systems[/DESKTOP]
[MOBILE][HEADING]AI Engineering:[/HEADING]
Production RAG & C-RAG pipelines with hybrid search, LLM fine-tuning (LoRA/QLoRA) and evaluation frameworks, agent orchestration & workflow runners, vector databases & knowledge graph integration, on-prem and local LLM deployments.

[HEADING]Full-Stack Development:[/HEADING]
.NET/C# backend development, React frontend development, RESTful APIs, integrations, event-driven architectures, legacy modernisation & performance tuning, clean architecture, TDD, CI/CD pipelines.

[HEADING]Infrastructure & DevOps:[/HEADING]
Azure cloud platform, Docker containerisation, CI/CD automation, security best practices & compliance, system observability & monitoring.

[HEADING]Recent Work:[/HEADING]
LoRA-tuned Mistral models, Corrective RAG (C-RAG) pipeline implementation, on-premises LLM deployments, digital employee (agent) systems.[/MOBILE]

Industries: Government, Finance, Pharma, Legal, Retail

Type [CMD]'about'[/CMD] to learn more about me.
Type [CMD]'services'[/CMD] to see what I can help with.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to get in touch.`,
  services: () => `[TITLE]Services & Solutions[/TITLE]
[DESKTOP][HEADING]AI Engineering:[/HEADING]
  • RAG/C-RAG pipelines & hybrid search systems
  • LLM fine-tuning (LoRA/QLoRA) and evaluation
  • Agent orchestration & workflow automation
  • Vector databases & knowledge graph integration

[HEADING]Full-Stack Development:[/HEADING]
  • APIs, integrations, event-driven systems
  • Legacy modernisation & performance optimisation
  • Clean architecture, TDD, CI/CD, SLOs
  • .NET/C#, React, Azure stack

[HEADING]Digital Employees (AI Agents):[/HEADING]
  • Role design, tool access, and guardrails
  • Human-in-the-loop workflows & audit trails
  • Observability, cost tracking, and ROI measurement

[HEADING]Architecture & Advisory:[/HEADING]
  • System design reviews and recommendations
  • PoC to Production pathways and runbooks
  • Team enablement on AI integration
  • CTO-level strategic guidance[/DESKTOP]
[MOBILE][HEADING]AI Engineering:[/HEADING]
RAG/C-RAG pipelines & hybrid search systems, LLM fine-tuning (LoRA/QLoRA) and evaluation, agent orchestration & workflow automation, vector databases & knowledge graph integration.

[HEADING]Full-Stack Development:[/HEADING]
APIs, integrations, event-driven systems, legacy modernisation & performance optimisation, clean architecture, TDD, CI/CD, SLOs, .NET/C#, React, Azure stack.

[HEADING]Digital Employees (AI Agents):[/HEADING]
Role design, tool access, and guardrails, human-in-the-loop workflows & audit trails, observability, cost tracking, and ROI measurement.

[HEADING]Architecture & Advisory:[/HEADING]
System design reviews and recommendations, PoC to Production pathways and runbooks, team enablement on AI integration, CTO-level strategic guidance.[/MOBILE]

Type [CMD]'about'[/CMD] to learn more about me.
Type [CMD]'skills'[/CMD] for detailed technical capabilities.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to discuss your project.`,
  contact: () => {
    return `[TITLE]Ian Bell[/TITLE]
Senior .NET Developer, AI Engineer, and Architect

Email: [LINK]mailto:ian@tiktaktoe.co.uk|ian@tiktaktoe.co.uk[/LINK]
Mobile: [LINK]tel:+447971235265|07971 235 265[/LINK]
LinkedIn: [LINK]https://www.linkedin.com/in/ianbellprofile/|linkedin.com/in/ianbellprofile[/LINK]
Location: Warwickshire, UK — Remote first

Let's discuss your complex build requirements.

Type [CMD]'email'[/CMD] to send me an email
Type [CMD]'linkedin'[/CMD] to view my LinkedIn profile`;
  },
  clients: () => {
    return `[TITLE]Client Portfolio[/TITLE]
Just some of the clients I've had the opportunity to work with:

[DESKTOP]• JCB                      • National Express
• Police Mutual            • PrescQIPP
• RICOH                    • Rayburn Tours
• Ingersoll Rand           • Doosan Group
• Bury College             • Baileys UK
• QNUK                     • Guinness GB
• The Ticket Factory       • Tanqueray
• The NEC                  • Captain Morgan
• Sheffield Council        • Atlas Assistance
• The Post Office          • Compressed Air Parts
• College of Policing      • St Modwens
• Carter Synergy           • Countrywide Insurance
• Tarmac                   • M Training
• Celcat                   • Medibroker Insurance
• Manchester Connexions    • Helpfinder UK
• Goodtyre                 • Serverlec Controls
• Crown Paints UK          • Marlins
• Oxford University        • Hansa Biopharma
• National Grid            • Staffordshire University
• McCann                   • Halifax
• AstraZeneca              • Barclays Technology
• Lloyds Bank              • Eversheds[/DESKTOP][MOBILE]• JCB
• Police Mutual
• RICOH
• Ingersoll Rand
• Bury College
• QNUK
• The Ticket Factory
• The NEC
• Sheffield Council
• The Post Office
• College of Policing
• Carter Synergy
• Tarmac
• Celcat
• Manchester Connexions
• Goodtyre
• Crown Paints UK
• Oxford University
• National Grid
• McCann
• AstraZeneca
• Lloyds Bank
• National Express
• PrescQIPP
• Rayburn Tours
• Doosan Group
• Baileys UK
• Guinness GB
• Tanqueray
• Captain Morgan
• Atlas Assistance
• Compressed Air Parts
• St Modwens
• Countrywide Insurance
• M Training
• Medibroker Insurance
• Helpfinder UK
• Serverlec Controls
• Marlins
• Hansa Biopharma
• Staffordshire University
• Halifax
• Barclays Technology
• Eversheds[/MOBILE]

Industries: Government, Finance, Pharma, Legal, Retail, Manufacturing, Education

Type [CMD]'about'[/CMD] to learn more about my expertise.
Type [CMD]'services'[/CMD] to see how I can help your organisation.
Type [CMD]'contact'[/CMD] to get in touch.`;
  },
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(" "),
  sudo: (args: string[]) => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case "ls": {
        let result = themes.map((t) => t.name.toLowerCase()).join(", ");
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case "set": {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  repo: () => {
    window.open(packageJson.repository.url, "_blank");

    return "Opening repository...";
  },
  clear: () => {
    history.set([]);

    return (commands.banner as () => string)();
  },
  cls: () => {
    history.set([]);

    return (commands.banner as () => string)();
  },
  home: () => {
    history.set([]);

    return (commands.banner as () => string)();
  },
  email: () => {
    window.location.href = `mailto:${packageJson.author.email}`;

    return `Opening email client...`;
  },
  linkedin: () => {
    window.open("https://www.linkedin.com/in/ianbellprofile/", "_blank");

    return `Opening LinkedIn profile...`;
  },
  weather: async (args: string[]) => {
    const city = args.join("+");

    if (!city) {
      return "Usage: weather [city]. Example: weather Brussels";
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return "Please close the tab to exit.";
  },
  reboot: () => {
    // Clear the boot flag from sessionStorage to trigger boot sequence
    sessionStorage.removeItem('isBooted');
    // Clear command history from localStorage directly (not via store to avoid race condition)
    localStorage.removeItem('history');
    // Reload the page immediately
    window.location.reload();
    return "";
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return "curl: no URL provided";
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `[ASCII]████████╗██╗██╗  ██╗████████╗ █████╗ ██╗  ██╗████████╗ ██████╗ ███████╗
╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔══██╗██║ ██╔╝╚══██╔══╝██╔═══██╗██╔════╝
   ██║   ██║█████╔╝    ██║   ███████║█████╔╝    ██║   ██║   ██║█████╗
   ██║   ██║██╔═██╗    ██║   ██╔══██║██╔═██╗    ██║   ██║   ██║██╔══╝
   ██║   ██║██║  ██╗   ██║   ██║  ██║██║  ██╗   ██║   ╚██████╔╝███████╗
   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝[/ASCII]

[TITLE]Senior .NET Developer, AI Engineer, and Architect[/TITLE][TITLE]25 years building systems. Shipping AI that works.[/TITLE][TITLE]Professional Generalist[/TITLE]
[PARA]Adaptable problem-solver with cross-domain expertise spanning AI, legacy modernisation, and enterprise architecture. Forward-thinking approach to integrating emerging AI technologies with proven engineering practices. Flexible delivery model supporting everything from rapid prototypes to production-scale systems.[/PARA]

Type [CMD]'help'[/CMD] to see all available commands.
Type [CMD]'about'[/CMD] to learn more.
`,
  todo: (args: string[]) => {
    const usage = `Usage: todo [command] [args]

Commands:
  add <text>     Add a new todo
  ls [filter]    List todos (filter: all, completed, pending)
  done <id>      Mark todo as completed
  rm <id>        Remove a todo
  clear [completed]  Clear todos (add 'completed' to clear only completed)
  stats          Show todo statistics

Examples:
  todo add Buy groceries
  todo ls
  todo ls pending
  todo done 1
  todo rm 2
  todo clear completed`;

    if (args.length === 0) {
      return usage;
    }

    const [subCommand, ...subArgs] = args;

    switch (subCommand) {
      case "add":
        if (subArgs.length === 0) {
          return "Error: Please provide todo text. Example: todo add Buy milk";
        }
        return todoManager.add(subArgs.join(" "));

      case "ls":
      case "list":
        const filter = subArgs[0] as
          | "all"
          | "completed"
          | "pending"
          | undefined;
        if (filter && !["all", "completed", "pending"].includes(filter)) {
          return "Error: Invalid filter. Use: all, completed, or pending";
        }
        return todoManager.list(filter);

      case "done":
      case "complete":
        const completeId = parseInt(subArgs[0]);
        if (isNaN(completeId)) {
          return "Error: Please provide a valid todo ID number";
        }
        return todoManager.complete(completeId);

      case "rm":
      case "remove":
      case "delete":
        const removeId = parseInt(subArgs[0]);
        if (isNaN(removeId)) {
          return "Error: Please provide a valid todo ID number";
        }
        return todoManager.remove(removeId);

      case "clear":
        const onlyCompleted = subArgs[0] === "completed";
        return todoManager.clear(onlyCompleted);

      case "stats":
        return todoManager.stats();

      default:
        return `Unknown todo command: ${subCommand}\n\n${usage}`;
    }
  },
};
