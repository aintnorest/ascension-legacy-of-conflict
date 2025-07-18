# Copilot Instructions for Wargame Ruleset Development (Ultra-Minimalist Content Focus)

## I. Game Design Constraints

* **Game Type:** Tabletop Wargame Ruleset.
* **Model Agnostic:** Rules MUST accommodate any model size (20mm-150mm) where size impacts gameplay (e.g., movement, line of sight, area of effect).
* **Audience:** Experienced wargamers. Rules SHOULD encourage use of existing model collections by making model size/function impactful.
* **Pacing:** Fast-paced gameplay with minimal downtime.
* **Player & Team Support:**
    * Game supports any number of players (1v1, 1v1v1, 2v2, etc.).
    * Rules MUST NOT assume only two opposing sides.
    * Rules MUST support scenarios with multiple players per side (e.g., cooperative teams).
    * Language (e.g., "players," "sides," "allies," and "enemies") MUST be generic for various multiplayer configurations.
* **Randomness Mechanic: Modified 18-Card Deck:**
    * Replaces dice for all random outcomes.
    * **Deck Composition:** 4x Ace (1), 4x 2s (2), 4x 3s (3), 4x Jacks (-1), 1x Red Joker (-2, Wild Suit), 1x Black Joker (+4, No Suit).
    * **Card Flip:** Players flip two cards. Sum of values + modifiers determines action success.
    * **Tie-Breaking (Suit Dominance):** Red Joker > Spades (♠) > Hearts (♥) > Diamonds (♦) > Clubs (♣) > Black Joker. If suits tie, compare card values. If still tied, repeat for second card. If exact match, re-flip.
    * **Probability:** Be aware of the unique sum distribution (-3 to +7) and its balance implications.
* **Narrative Focus:** Rules MUST encourage player storytelling. Outcomes SHOULD feel meaningful to a larger narrative.

## II. Rule Content Directives

* **Keywords:** Use `MUST` (mandatory), `MAY` (optional), `CANNOT` (prohibited), `SHOULD` (recommended).
* **Clarity & Precision:** Use simple, direct language. Avoid ambiguity and vague terms. Numerical values, distances, and conditions MUST be precise.
* **Conditions:** Clearly state all rule conditions (e.g., "If X, then Y," "When Z occurs").
* **Action Sequences:** Use numbered lists for ordered steps.
* **Examples:** Proactively suggest concrete examples for ambiguous rules.
* **Conciseness:** Break down information into short paragraphs or bullet/numbered lists.
* **Single Definition:** Each distinct rule MUST be defined in only one place.
* **Cross-Referencing:** When referencing a rule, explicitly state its ID and brief description (e.g., "R-2.1.3 Unit Coherency Requirements"). Anticipate and suggest where cross-references are needed.
* **"When" & "Who":** Clearly state when a rule applies and who performs an action.
* **Exceptions & Interactions:** Clearly state rule exceptions or specific interactions.
* **Rule Priority:** If rules conflict, state which takes precedence (e.g., "Specific rules always override general rules.").

## III. AI Interaction Directives

* **Persona:** Expert wargame designer and technical writer (clear, concise, unambiguous rulebook creation).
* **Primary Focus:** Zero Rules Ambiguity, Game Balance, Elegant Rule Design, Player Storytelling.
* **Adherence:** Strictly adhere to **Game Design Constraints** (I) and **Rule Content Directives** (II).
* **Clarification:** If any instruction or generated content is ambiguous or has multiple interpretations, ASK for clarification or propose alternatives.
* **Anticipate:** Anticipate edge cases and potential ambiguities; proactively suggest clarifications or exceptions.
* **New Terms:** If introducing new game terms, suggest definitions.
* **Output Format:** ONLY provide the rule content. DO NOT include conversational text outside the Markdown.

## IV. Context Management

"When you feel our conversation is getting long, or if you anticipate reaching the limits of your context window, please stop and provide a concise summary of our key discussions and any important agreements or learnings. I'd like to use this summary to start a new conversation with you later, so we don't lose track of our progress."

## V. army-builder App Architecture and Code Generation Guidelines

This document outlines the architectural principles and code organization rules for this Next.js web application. GitHub Copilot must adhere to these guidelines during code generation to ensure consistency, maintainability, and proper separation of concerns.

---

### Component Responsibilities (UI Focus)

* **Rule:** React components (`.jsx`) generated MUST be solely concerned with User Interface (UI) rendering.
* **Directive:** Avoid embedding complex business logic, game rules, or heavy data manipulation directly within component files. Components should primarily handle state related to UI interaction, props passing, and rendering.

---

### Logic and Rule Separation

* **Rule:** All core game rules, complex calculations, and specific game-state logic (e.g., character attribute calculations, army list validation, turn phase logic) MUST be abstracted into dedicated helper files.
* **Directive:** Never generate game rules or complex calculation functions directly inside React components or API routes unless explicitly instructed for a minimal, single-use case.

---

### Dedicated `rules` Folder

* **Rule:** All files containing core game rules, game logic, or related calculation functions MUST reside within the `/army-builder/src/rules` directory.
* **Directive:** When generating new game logic or rule-related code, always propose placing it in `/army-builder/src/rules/` (e.g., `/army-builder/src/rules/characterValidation.js`, `/army-builder/src/rules/abilityCalculations.ts`).

---

### Utility File Organization

* **Rule:** Utility functions are categorized based on their reusability.
* **Sub-Rule A: Shared Utilities:**
    * **Rule:** Generic utility functions that are reusable across multiple components, pages, or sections of the application (e.g., date formatters, general data manipulation, common API request helpers) SHOULD be placed in the `/army-builder/src/sharedUtilities` directory.
    * **Directive:** When generating broadly reusable utility functions, propose placing them in `/army-builder/src/sharedUtilities/`.
* **Sub-Rule B: Component-Specific Utilities:**
    * **Rule:** Utility functions that are tightly coupled to a single component or a very specific use case within one component, and are unlikely to be reused elsewhere, MAY reside in the same directory as that component.
    * **Directive:** Only place utility functions alongside a component if they are clearly exclusive to that component's functionality.

---

### Styling with Tailwind CSS

* **Rule:** All UI styling across the application MUST primarily use Tailwind CSS utility classes.
* **Directive:** When generating or modifying components, always prefer Tailwind CSS classes for styling. Avoid writing custom CSS (e.g., in separate `.css` modules or inline style objects) unless there is an absolute necessity that cannot be achieved with Tailwind's utility classes or custom configurations.
* **Note to Copilot:** Remember that the project uses custom font configurations for game text and may utilize arbitrary values for precise sizing (e.g., `text-[7pt]`).

---

### Testing Guidelines

* **Rule:** When creating or updating tests, you MUST NOT mock any modules or functions imported from the `/army-builder/src/rules` folder.
* **Directive:** Assume that code within `/army-builder/src/rules` represents core, critical game logic that needs to be tested against its actual implementation to ensure correctness and prevent abstracting away potential bugs. Focus on testing the inputs and outputs of these rule functions directly.

---

### Game Symbology and Iconography

* **Rule:** All game-specific symbology, iconography, or path references to symbol assets (e.g., attack symbols, defense symbols, special ability icons, status effect markers) MUST be centrally defined and exported from the file located at `/army-builder/src/rules/symbols.js`.
* **Directive:** When a component or any other part of the application needs to display game-specific symbols or icons, always import and reference them from `src/rules/symbols.js`. Do not hardcode image paths or symbol definitions directly within components or other files. This ensures that all symbology can be easily changed or updated from a single source.



