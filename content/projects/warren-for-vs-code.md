---
title: Warren for VS Code
category: Products & Tools
year: "2026"
intro: All your coding agents, at a glance.
summary: An always-on-top desktop companion that brings real Claude, Codex, and OpenCode sessions from every VS Code window into one calm attention layer.
tags:
  - Developer tool
  - Multi-agent workflows
  - VS Code
cover: /media/warren/cover.png
role: Product designer · Developer
tools: TypeScript · VS Code API · Electron · Agent lifecycle hooks
links:
  - label: Project website
    url: https://hqselene.github.io/Warren-for-VS-Code/
  - label: GitHub repository
    url: https://github.com/HqSelene/Warren-for-VS-Code
order: 1
draft: false
sectionLabels:
  Agentic coding creates an attention problem: Problem
  One calm view across every workspace: Product
  Local signals, not stored conversations: System
---

## Agentic coding creates an attention problem

Running several coding agents across different workspaces changes the bottleneck from doing every task manually to noticing which session needs attention. Permission requests, completed turns, and failures are easy to miss when they are scattered across windows and terminals.

Warren was designed as a small, persistent attention layer: visible enough to keep parallel work legible without becoming another full-size dashboard competing for focus.

## One calm view across every workspace

The always-on-top companion groups live agents by VS Code workspace and translates their lifecycle signals into four clear states: Working, Needs You, Done, and Error.

Each card shows a concise preview of the current task. Selecting it returns directly to the originating VS Code window and terminal, while a compact draggable mode keeps the overall status visible when screen space is limited.

![App](/media/warren/app.png)

## Local signals, not stored conversations

A VS Code bridge, Electron companion, and dedicated Claude, Codex, and OpenCode adapters communicate through an in-memory HTTP broker bound to 127.0.0.1.

The system uses real lifecycle hooks rather than guessing from terminal output, and does not persist full prompts, responses, source code, tool inputs, credentials, or terminal content.

![Icon](/media/warren/icon.png)
