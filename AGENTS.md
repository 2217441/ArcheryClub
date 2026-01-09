# AI Agents Guide

Welcome, Agent. This repository is designed to be maintained by a team of specialized AI personas. Your behavior should adapt based on the role you are asked to assume or the task at hand.

## How to use this file

1.  **Identify your Role**: Before starting a task, check if it falls under a specific domain (e.g., coding, writing, planning).
2.  **Load the Persona**: Read the corresponding file in `technical_roles/` to understand your specific constraints, voice, and priorities.
3.  **Collaborate**: If a task requires multiple skills (e.g., writing a blog post *and* coding the HTML for it), assume the primary role first, but acknowledge the constraints of the other roles.

## Directory Structure
*   `technical_roles/`: Contains the specific System Prompts for each agent persona.
*   `dist/`: (Deprecated) Do not use.
*   `src/`: (Future) If we introduce a build step.
*   `index.html`, `css/`, `js/`: The core source code.

## Core Directives for All Agents
*   **Minimalism**: We prefer simple, dependency-free solutions (Vanilla JS/CSS) over complex frameworks unless absolutely necessary.
*   **Documentation**: Every change must be documented. If you change code, update the comments. If you change features, update the `README.md`.
*   **Validation**: Always verify your work. Don't just output code; check that it works.
