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
      Contact: ["contact", "email"],
      System: ["help", "clear", "cls", "banner", "home"],
    };

    let output = "Available commands:\n\n";

    for (const [category, cmds] of Object.entries(categories)) {
      output += `${category}:\n`;
      output += cmds.map((cmd) => `  ${cmd}`).join("\n");
      output += "\n\n";
    }

    output += "For more information, type a command name.";

    return output;
  },
  hostname: () => hostname,
  whoami: () => "guest",
  date: () => new Date().toLocaleString(),
  about: () => `[TITLE]Senior AI Engineer & Architect[/TITLE]
Senior engineer supporting CTOs with hands-on delivery and architecture.
Security-cleared; enterprise-grade focus on reliability, observability, and cost control.

I turn vibe code into maintainable systems.

Technical Stack:
- LLMs (RAG, fine-tuning), vector DBs, agents, knowledge graphs
- .NET/C#, React, Azure, Docker, CI/CD
- 25 years building systems across gov, finance, pharma, legal, retail

Approach: Start with the problem. Ship small. Measure. Scale.

Type [CMD]'services'[/CMD] to see what I can help with.
Type [CMD]'skills'[/CMD] for detailed technical capabilities.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to get in touch.`,
  skills: () => `[TITLE]Technical Skills & Expertise[/TITLE]
AI Engineering:
  • Production RAG & C-RAG pipelines with hybrid search
  • LLM fine-tuning (LoRA/QLoRA) and evaluation frameworks
  • Agent orchestration & workflow runners
  • Vector databases & knowledge graph integration
  • On-prem and local LLM deployments

Full-Stack Development:
  • .NET/C# backend development
  • React frontend development
  • RESTful APIs, integrations, event-driven architectures
  • Legacy modernization & performance tuning
  • Clean architecture, TDD, CI/CD pipelines

Infrastructure & DevOps:
  • Azure cloud platform
  • Docker containerization
  • CI/CD automation
  • Security best practices & compliance
  • System observability & monitoring

Recent Work:
  • LoRA-tuned Mistral models
  • Corrective RAG (C-RAG) pipeline implementation
  • On-premises LLM deployments
  • Digital employee (agent) systems

Industries: Government, Finance, Pharma, Legal, Retail

Type [CMD]'about'[/CMD] to learn more about me.
Type [CMD]'services'[/CMD] to see what I can help with.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to get in touch.`,
  services: () => `[TITLE]Services & Solutions[/TITLE]
AI Engineering
  • RAG/C-RAG pipelines & hybrid search systems
  • LLM fine-tuning (LoRA/QLoRA) and evaluation
  • Agent orchestration & workflow automation
  • Vector databases & knowledge graph integration

Full-Stack Development
  • APIs, integrations, event-driven systems
  • Legacy modernization & performance optimization
  • Clean architecture, TDD, CI/CD, SLOs
  • .NET/C#, React, Azure stack

Digital Employees (AI Agents)
  • Role design, tool access, and guardrails
  • Human-in-the-loop workflows & audit trails
  • Observability, cost tracking, and ROI measurement

Architecture & Advisory
  • System design reviews and recommendations
  • PoC to Production pathways and runbooks
  • Team enablement on AI integration
  • CTO-level strategic guidance

Type [CMD]'about'[/CMD] to learn more about me.
Type [CMD]'skills'[/CMD] for detailed technical capabilities.
Type [CMD]'clients'[/CMD] to see who I've worked with.
Type [CMD]'contact'[/CMD] to discuss your project.`,
  contact: () => {
    return `[TITLE]Ian Bell[/TITLE]
Senior AI Engineer & Architect

Email: ian@tiktaktoe.co.uk
Mobile: 07971 235 265
LinkedIn: https://www.linkedin.com/in/ianbellprofile/
Location: Warwickshire, UK — Remote first

Let's discuss your complex build requirements.

Type [CMD]'email'[/CMD] to send me an email`;
  },
  clients: () => {
    return `[TITLE]Client Portfolio[/TITLE]
Just some of the clients I've had the opportunity to work with:

• JCB                      • National Express
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
• McCann

Industries: Government, Finance, Pharma, Legal, Retail, Manufacturing, Education

Type [CMD]'about'[/CMD] to learn more about my expertise.
Type [CMD]'services'[/CMD] to see how I can help your organization.
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
  banner: () => `
████████╗██╗██╗  ██╗████████╗ █████╗ ██╗  ██╗████████╗ ██████╗ ███████╗
╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔══██╗██║ ██╔╝╚══██╔══╝██╔═══██╗██╔════╝
   ██║   ██║█████╔╝    ██║   ███████║█████╔╝    ██║   ██║   ██║█████╗
   ██║   ██║██╔═██╗    ██║   ██╔══██║██╔═██╗    ██║   ██║   ██║██╔══╝
   ██║   ██║██║  ██╗   ██║   ██║  ██║██║  ██╗   ██║   ╚██████╔╝███████╗
   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝

[TITLE]Senior AI Engineer & Architect[/TITLE]
[TITLE]25 years building systems. Shipping AI that works.[/TITLE]
[TITLE]Professional Generalist[/TITLE]
Adaptable problem-solver with cross-domain expertise spanning AI, legacy modernization,
and enterprise architecture. Forward-thinking approach to integrating emerging AI
technologies with proven engineering practices. Flexible delivery model supporting
everything from rapid prototypes to production-scale systems.

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
