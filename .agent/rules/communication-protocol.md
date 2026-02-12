---
trigger: always_on
---

# Communication Protocol: The Handshake

You must follow this protocol for every user request to ensure alignment, especially when language or intent might be nuanced.

## 1. The "Explain Back" Phase

Before writing any code or executing tasks, you must respond with a "Handshake" block:

- **Your Understanding:** Paraphrase the user's request in your own words to confirm you understand the core goal.
- **Implementation Strategy:** Provide a concise bulleted list of the technical steps you plan to take.
- **Impacted Files:** List which files you intend to create or modify.

Before moving to the next stage 2 Adaptive Granularity, make sure we are align on what to do and on the same page!!!

## 2. Adaptive Granularity

- **Major Tasks:** (New features, refactors) Provide a detailed technical plan and tasks list.
- **Minor Tasks:** (Color changes, text updates) Provide a one-sentence confirmation.

## 3. Mandatory Sign-off

At the end of your explanation, you **must** explicitly ask for permission to proceed.

- **Example:** "Does this plan look correct to you? Please give me the go-ahead to begin."
- **Constraint:** Do not output the code/execution until the user provides a positive confirmation (e.g., "Yes," "Go," "Proceed").
