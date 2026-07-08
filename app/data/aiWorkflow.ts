import type { AiWorkflowItem } from '~/types'

// How I integrate AI into my daily development workflow
export const aiWorkflow: AiWorkflowItem[] = [
  {
    id: 1,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    title: {
      en: 'Coding agents, every day',
      es: 'Agentes de código, todos los días'
    },
    description: {
      en: 'Claude Code is my daily development agent: it explores the codebase, implements features, refactors and generates tests while I direct the architecture. I break complex work into plans the agent executes step by step, and I verify every change before it lands.',
      es: 'Claude Code es mi agente de desarrollo diario: explora la base de código, implementa funcionalidades, refactoriza y genera pruebas mientras yo dirijo la arquitectura. Divido el trabajo complejo en planes que el agente ejecuta paso a paso, y verifico cada cambio antes de integrarlo.'
    },
    tools: ['Claude Code', 'Plan Mode', 'Git'],
  },
  {
    id: 2,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="4" cy="19" r="2"/><circle cx="20" cy="19" r="2"/><path d="M5.5 6.5 10 10.5M18.5 6.5 14 10.5M5.5 17.5 10 13.5M18.5 17.5 14 13.5"/></svg>`,
    title: {
      en: 'MCP servers: real context',
      es: 'Servidores MCP: contexto real'
    },
    description: {
      en: 'I connect my tools to the model through the Model Context Protocol: Supabase for database and migrations, GitHub for PRs and issues, Figma for design-to-code, and Vercel for deployments and logs. The agent works with the real state of my environment instead of guessing.',
      es: 'Conecto mis herramientas al modelo mediante el Model Context Protocol: Supabase para base de datos y migraciones, GitHub para PRs e issues, Figma para pasar de diseño a código, y Vercel para deploys y logs. El agente trabaja con el estado real de mi entorno en lugar de adivinar.'
    },
    tools: ['MCP', 'Supabase', 'GitHub', 'Figma', 'Vercel'],
  },
  {
    id: 3,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>`,
    title: {
      en: 'Subagents & orchestration',
      es: 'Subagentes y orquestación'
    },
    description: {
      en: 'For large tasks I delegate to specialized subagents running in parallel: one explores the code, another plans the architecture, another reviews the diff for bugs. Each works in its own context, so the main thread stays focused and big tasks stop being blockers.',
      es: 'Para tareas grandes delego en subagentes especializados que corren en paralelo: uno explora el código, otro planea la arquitectura y otro revisa el diff en busca de bugs. Cada uno trabaja en su propio contexto, así el hilo principal se mantiene enfocado y las tareas grandes dejan de ser bloqueos.'
    },
    tools: ['Subagents', 'Explore', 'Plan', 'Code Review'],
  },
  {
    id: 4,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>`,
    title: {
      en: 'LLMs inside my products',
      es: 'LLMs dentro de mis productos'
    },
    description: {
      en: "I don't just develop with AI — I ship it. Kivo's support chatbot runs on the Claude API behind a FastAPI backend, using tool use and streaming. I trained on this with Anthropic Academy's “Building with the Claude API” certification.",
      es: 'No solo desarrollo con IA — también la integro en producto. El chatbot de soporte de Kivo funciona con la API de Claude detrás de un backend en FastAPI, usando tool use y streaming. Me formé en esto con la certificación “Building with the Claude API” de Anthropic Academy.'
    },
    tools: ['Claude API', 'FastAPI', 'Tool Use', 'Streaming'],
  },
  {
    id: 5,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>`,
    title: {
      en: 'Context engineering',
      es: 'Context engineering'
    },
    description: {
      en: 'Every repo I work on carries a CLAUDE.md documenting its architecture, conventions and commands, plus custom skills for repetitive tasks. A well-fed agent produces code consistent with the project — context design matters as much as the prompt.',
      es: 'Cada repo en el que trabajo lleva un CLAUDE.md que documenta su arquitectura, convenciones y comandos, además de skills personalizadas para tareas repetitivas. Un agente bien alimentado produce código consistente con el proyecto — diseñar el contexto importa tanto como el prompt.'
    },
    tools: ['CLAUDE.md', 'Skills', 'Custom Commands'],
  },
  {
    id: 6,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    title: {
      en: 'AI-assisted quality, human judgment',
      es: 'Calidad asistida por IA, criterio humano'
    },
    description: {
      en: 'Before every PR I run an AI code review over the diff to catch bugs and simplifications, generate missing tests and update documentation. The AI accelerates; the judgment is mine: everything ships only after my own verification.',
      es: 'Antes de cada PR ejecuto una revisión de código con IA sobre el diff para detectar bugs y simplificaciones, generar pruebas faltantes y actualizar documentación. La IA acelera; el criterio es mío: todo se publica solo después de mi propia verificación.'
    },
    tools: ['AI Code Review', 'Testing', 'Docs'],
  },
]
