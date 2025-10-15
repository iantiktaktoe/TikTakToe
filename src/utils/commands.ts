import packageJson from "../../package.json";
import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import { todoManager } from "./todo";

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => {
    const categories = {
      About: ["about", "skills", "services"],
      Contact: ["contact", "email"],
      System: ["help", "clear", "cls", "banner"],
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
  about: () => `Senior AI Engineer & Architect

Senior engineer supporting CTOs with hands-on delivery and architecture.
Security-cleared; enterprise-grade focus on reliability, observability, and cost control.

I turn vibe code into maintainable systems.

Technical Stack:
- LLMs (RAG, fine-tuning), vector DBs, agents, knowledge graphs
- .NET/C#, React, Azure, Docker, CI/CD
- 25 years building systems across gov, finance, pharma, legal, retail

Approach: Start with the problem. Ship small. Measure. Scale.

Type 'services' to see what I can help with.
Type 'skills' for detailed technical capabilities.
Type 'contact' to get in touch.`,
  skills: () => `Technical Skills & Expertise

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

Industries: Government, Finance, Pharma, Legal, Retail`,
  services: () => `Services & Solutions

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

Type 'contact' to discuss your project.`,
  contact: () => {
    window.open("calendly-link", "_blank");
    return `Opening booking link...

Email: ian@tiktaktoe.co.uk
Location: Rugby, UK — Remote first

Let's discuss your complex build requirements.`;
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

    return "";
  },
  cls: () => {
    history.set([]);

    return "";
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
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

Senior AI Engineer & Architect
25 years building systems. Shipping AI that works.

Type 'help' to see all available commands.
Type 'about' to learn more.
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
