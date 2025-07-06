# Ascension: Legacy of Conflict Core Rules

* [1. Game Components](#1-game-components)
* [2. Resolution Mechanic](#2-resolution-mechanic)
* [3. Game Flow](#3-game-flow)
* [4. Model and Terrain Size](#4-model-and-terrain-size)
* [5. Movement Action](#5-movement-action)
* [6. Combat](#6-combat)
* [7. Special Rules](#7-special-rules)
* [8. Game Setup](#8-game-setup)
* [9. Glossary](#9-glossary)

## 1. Game Components

### 1.1 Required Materials

#### R-1.1.1 Model Size Requirements

All model miniatures **MUST** be between 25mm and 170mm base. Model size directly impacts gameplay, including movement, line of sight, and area of effect. Terrain **MAY** be outside those ranges

#### R-1.1.2 Terrain Requirements

Players **MUST** provide terrain pieces to create a dynamic battlefield. Terrain **MAY** include buildings, forests, obstacles, and other features.

#### R-1.1.3 Measuring Tools

Players **SHOULD** have a spare base of every size their force fields to use as a measuring tool. A a measuring tape or ruler works but movement will be done in mm as that is the most common base sizing measurement.

##### R-1.1.4 Card Deck Composition

Each player needs a custom card deck that consists of 18 cards with the following distribution:

* 4 Aces
* 4 Twos
* 4 Threes
* 4 Jacks
* 1 Red Joker
* 1 Black Joker

##### R-1.1.5 Suit Distribution

Each Ace, Two, Three, and Jack **MUST** have one card of each suit: Spades (♠), Hearts (♥), Diamonds (♦), and Clubs (♣).

##### R-1.1.7 Token Requirements

Players **MUST** provide tokens to mark statuses, effects, and scenario-specific zones and tokens as required.

##### R-1.1.8 Rule Priority and Conflicts

If two rules conflict, the more specific rule **ALWAYS** overrides the more general rule. If ambiguity remains, players **MUST** agree on an interpretation before proceeding.

---

## 2. Resolution Mechanic

**Design Note:** This game uses a card-based resolution mechanic instead of dice to provide a unique probability curve and allow for more strategic play. The card system introduces memory, tension, and the potential for players to track which cards have been played, rewarding skillful planning and risk assessment in a way that dice cannot.

### R-2.1.1 Card Value Assignment

Each card in the custom deck has a specific value:

* Ace: 1
* Two: 2
* Three: 3
* Jack: -1
* Red Joker: -2 (Wild; player chooses its suit when revealed)
* Black Joker: +4 (No suit)

### R-2.1.2 Card Flip Process

When a random outcome is required, the active player **MUST** flip two cards from their custom deck. The sum of their values, plus any relevant modifiers, determines the result.

### R-2.1.3 Deck Cycling

After cards are flipped, they **MUST** be placed in a discard pile face down. When the deck is empty, shuffle the discard pile to form a new deck. The discard pile contents are not public knowledge.

After shuffling a deck, discard 1 card face down from the top of the new deck. This card is not revealed and **CANNOT** be examined.

### R-2.1.4 Tie-Breaking Procedure

In case of a tie between two or more sides, follow this procedure:

1. **Check Highest Suit:** The side with the highest-ranking suit among all flipped cards wins. Suit dominance is: Red Joker > Spades (♠) > Hearts (♥) > Diamonds (♦) > Clubs (♣) > Black Joker.
2. **Same Highest Suit:** If two or more sides have the same highest suit, compare the values of the cards with that suit. The side with the highest value wins.
3. **Still Tied (First Card):** If the highest suit and its value are the same on the first card, repeat steps 1 and 2 for the second card flipped.
4. **Exact Match:** If two or more sides flipped the exact same two cards, discard the flipped cards, and repeat the card flip process ([R-2.1.2 Card Flip Process](#r-212-card-flip-process)) to resolve the tie.

### R-2.1.5 Probability Curve Awareness

Players **SHOULD** be aware that the card system produces a probability curve for sums from -3 to +7. The probabilities listed are for a full deck which changes as cards are used.

* **Probability of Each Sum:**

    | Sum | Number of Ways | Probability (Percentage) |
    |:----|:---------------|:-------------------------|
    | -3  | 4              | 2.61%                    |
    | -2  | 6              | 3.92%                    |
    | -1  | 4              | 2.61%                    |
    | 0   | 20             | 13.07%                   |
    | 1   | 20             | 13.07%                   |
    | 2   | 23             | 15.03%                   |
    | 3   | 20             | 13.07%                   |
    | 4   | 22             | 14.38%                   |
    | 5   | 20             | 13.07%                   |
    | 6   | 10             | 6.54%                    |
    | 7   | 4              | 2.61%                    |

* **Probability of a Specific Suit:**

    | Event                                                                                                           | Percentage (approx.) |
    |:----------------------------------------------------------------------------------------------------------------|:---------------------|
    | At Least One of Two Cards Counts as a Specific Suit (e.g., at least one of your two cards can count as a Heart) | 49.02%               |
    | Drawing One Card of a Specific Suit AND One Card of a Different Specific Suit (e.g., one Heart and one Spade)   | 15.69%               |
    | Drawing Two Cards of a Single Specific Suit (e.g., exactly two Hearts)                                          | 6.54%                |

    NOTE: All three effect triggers—Always, Match Suit, and Both Suits—are now fully supported in character creation. See [R-5.1 Effect Categories](characterCreation.md#r-51-effect-categories) for details.

### R-2.1.6 Rule Reference

Whenever a rule requires a random outcome, it **MUST** reference the card flip process described in [R-2.1.2 Card Flip Process](#r-212-card-flip-process) (see section 2.1.2).

```markdown
Example: To determine if a unit successfully charges, flip two cards and add the unit's Charge modifier. If the total is 5 or higher, the charge succeeds.
```

---

## 3. Game Flow

### 3.1 Round Structure

#### R-3.1.1 Rounds and Model Activation

The game is divided into a series of **Rounds**. During each Round, all sides of a conflict alternate activating one model at a time, starting with the side that has **Initiative**. A Round ends when every model on the battlefield has had the opportunity to activate once.

* Each side **MUST** track which of their models have activated during the current Round.
* When all models have activated, the Round ends and a new Round begins.

### 3.2 Turn Structure

#### R-3.2.1 Turn Steps Overview

During a Turn, the active side follows these steps in order:

1. **Pass Activation (Optional)** ([R-3.2.2 Pass Activation Option](#r-322-pass-activation-option))
2. **Choose and Declare Activation** ([R-3.2.3 Model Activation Declaration](#r-323-model-activation-declaration))
3. **Remove Exhaust Tokens** ([R-3.2.4 Exhaust Token Removal](#r-324-exhaust-token-removal))
4. **Perform Actions** ([R-3.2.5 Action Sequence and Limits](#r-325-action-sequence-and-limits))
5. **End of Turn** ([R-3.2.6 End of Turn Procedures](#r-326-end-of-turn-procedures))

#### R-3.2.2 Pass Activation Option

If all opposing sides have at least 2 more un-activated models than the active side, the active side **MAY** choose to pass their activation. If this option is chosen:

* The active side activates no model for this Turn.
* The activation is immediately passed to the next side in initiative order.
* The active side's Turn ends.

#### R-3.2.3 Model Activation Declaration

The active side **MUST** select a friendly model that has not activated this Round and declare it as the **Active Model** for this Turn.

#### R-3.2.4 Exhaust Token Removal

Remove one **Exhaust Token** from each of the Active Model's Actions at the start of its activation. (See [R-1.1.7 Token Requirements](#r-117-token-requirements) and [9. Glossary](#9-glossary) for token definitions.)

#### R-3.2.5 Action Sequence and Limits

During its activation, the Active Model **MAY** perform up to two actions, provided that neither action currently has an Exhaust Token. The following actions are eligible:

**Move Action**
**Attack Action**
**Primary Ability Action**
**Secondary Ability Actions** do not count toward this two-action limit and **MAY** be used at any time during the activation.

After a model performs any action, place an Exhaust Token on that action to indicate it has been used this Turn. A model **CANNOT** perform an action that already has an Exhaust Token.

#### R-3.2.6 End of Turn Procedures

At the end of the Turn, perform the following steps in order:

1. Place a token next to the Active Model to indicate it has activated this Round.
2. Pass activation to the next side in initiative order.
3. The next side's Turn begins.

### 3.3 Initiative

#### R-3.3.1 Initiative Card Resolution

At the start of each Round, all sides determine Initiative using the following procedure:

1. Each side uses the resolution mechanic (see [R-2.1.2 Card Flip Process](#r-212-card-flip-process)).
2. Apply all applicable Initiative modifiers:
    * Modifiers from model special abilities (if any).
    * Modifiers from scenario or terrain effects (if any).
    * If a side has fewer total force points than the total agreed upon, it gains a bonus equal to half the difference (rounded down), up to a maximum of +3.
3. The side with the highest total wins Initiative.

#### R-3.3.2 Initiative Order and Team Coordination

* Once the Initiative order is established, it persists for the remainder of the game.
* At the start of each subsequent Round, play continues from where it left off in the previous Round. The side that was next to act after the last model activation in the previous Round begins the new Round.
* If a side or player has no models left to activate, they are skipped in the Initiative order until the next Round.
* If a side consists of multiple players (a team), those players **MUST** decide the order in which they will activate immediately after initiative is determined. This order **MUST** be maintained for the duration of the game.
* If a player on a side runs out of models to activate, the remaining players on that side continue to activate their models in the established order before passing activation to the next side.

---

## 4. Model and Terrain Size

### R-4.1.1 Model and Terrain Size Categories

All models and terrain pieces **MUST** be assigned a **Size Value** according to their largest dimension. For models, this is determined by base size. Use the bases smallest dimension. For terrain it can be less straight forward to classify use the following tables to help:

| Base Size | Size Value |
|:----------|:-----------|
| < 25mm    | 0.5        |
| 25-39mm   | 1          |
| 40-59mm   | 2          |
| 60-89mm   | 3          |
| 90-129mm  | 4          |
| 130-170mm | 5          |
| > 170mm   | 6          |

| Size Value | Example Reference          |
|:----------:|:---------------------------|
|    0.5     | Dog, mailbox, crate        |
|     1      | Human, humanoid            |
|     2      | Large human, motorcycle    |
|     3      | Car, large dumpster        |
|     4      | Dump truck, small building |
|     5      | Medium building            |
|     6      | Large building             |

Everyone playing a game **MUST** agree on the size of each piece of terrain during setup.

### R-4.1.2 Base Dimension Definitions

* **Longest Base Dimension:** The greatest straight-line distance across a model's base.
* **Shortest Base Dimension:** The smallest straight-line distance across a model's base.
* For terrain, use the largest and smallest relevant dimensions for movement and interaction.

---

## 5. Movement Action

### 5.1 Stride Assignment and Expenditure

#### R-5.1.1 Stride Value Assignment

Each model has a number of **Strides** it can take during a Move Action. This value is determined by its Size Category and any modifiers from [character creation](characterCreation.md#2-size-category-selection-and-base-stats) or abilities. The default number of Strides for a model **MUST** be recorded on its profile.

#### R-5.1.2 Stride Expenditure

During a Move Action, a model **MAY** spend Strides to perform movement and certain special actions as described in [5.2 Move Actions](#52-move-actions).

### 5.2 Move Actions

#### R-5.2.1 Standard Move

When a model performs a Standard Move:

1. **Adjust Facing:** Before each Stride, the model **MAY** adjust its facing to any direction.
2. **Determine Stride Length:**
    * If moving in a straight line directly forward from its current facing, the Stride length is equal to the **Longest Base Dimension**.
    * If not moving directly forward, the Stride length is equal to the **Shortest Base Dimension**.
3. **Move:** The model **MAY** move up to the determined Stride length per Stride spent.

```markdown
Example: A model with a 40mm x 25mm oval base moves straight forward. Each Stride is 40mm. If it moves sideways or diagonally, each Stride is 25mm.
```

#### R-5.2.2 Step Over Terrain

A model **MAY** cross over terrain features with a Size Value up to half its own Size Value (rounded down) without spending additional Strides. The model **MUST** end its movement on a surface it can physically stand on.

#### R-5.2.3 Interact with Objectives or Terrain

A model in base contact with an objective or terrain **MAY** spend 1 Stride to interact with it, following the scenario or terrain rules.

#### R-5.2.4 Climbing Terrain

A model **MAY** climb terrain with a Size Value equal to or less than its own Size Value. Climbing costs 1 Stride per full Size Value difference between the model and the terrain. After climbing, place the model within 1/2" of the climbed edge.

```markdown
Example: A Size 1 model climbing Size 3 terrain spends 2 Strides (3 - 1 = 2).
```

### 5.3 Special Movement Actions

#### R-5.2.5 Run

A model **MAY** spend all remaining Strides during its Move Action to move double the normal distance for each remaining Stride. If it does so:

* The model **CANNOT** perform an Attack Action this Turn.
* The model gains +1 Defense until its next activation.

#### R-5.2.6 Shake

A model **MAY** spend 1 Stride during its Move Action to remove 1 temporary condition token from itself. A model **CANNOT** perform more than 1 Shake per Move Action.

---

## 6. Combat

### 6.1 Combat Resolution Sequence

#### R-6.1.1 Combat Resolution Sequence

1. Declare Target and Attack.
2. Attacker: card resolution total + attack skill + Attack Bonuses – Weaken Tokens = Total Attack Value.
3. Defender: card resolution total + Defense + defense bonuses – Hindered tokens = Total Defense Value.
4. If Total Attack Value > Total Defense Value: Hit. Damage = Difference.
5. If Total Attack Value ≤ Total Defense Value: Miss.
6. Apply Damage (reduce Wounds).
7. Apply Attack Effects.

#### R-6.1.2 Attack Stat Blocks

Each attack on a model's profile **MUST** include the following:

* **Target Type:**
  * Single Target: Attacks one model within range
  * Area: Affects all models whose bases are touched by or partially within a circular template centered at the target point
  * Breakthrough: Affects models whose bases are touched by or intersect with a 1" wide line drawn from the attacker's front arc
  * Ricochet: Chain attack that hits multiple targets in sequence, following line of sight rules between each target
* **Range:** Measure from the closest point of the attacker's base to the appropriate point for the target type:
  * Single Target: Closest point of target's base
  * Area: Center point of area template
  * Breakthrough: Any point along the line
  * Ricochet: First target only; subsequent targets measured from previous target
* **Attack Skill:** Base power of the attack (1–6)
* **Effects:** Optional modifiers that trigger in one of three ways:
  * Always: Effect happens immediately after damage resolution
  * Match Suit: Effect triggers after damage if the attack effect suite matches either suite of the flipped cards.
  * Both Suits: Effect triggers after damage if both attack effect suites match both suits of the flipped cards.
  * Multiple effects resolve in the order chosen by the attacker

For detailed requirements for attack stat blocks, see [R-8.2 Attack Stat Block Recording](characterCreation.md#r-82-attack-stat-block-recording).

For more information on attack construction and types of effects, see the Character Creation document.

### 6.2 Strategic Placement and Modifiers

#### R-6.2.1 Engagement

A model is **Engaged** with another model, terrain piece, or scenario feature if all of the following conditions are met:

1. The target is not a friendly model. (Terrain and scenario features are always eligible for engagement unless a rule states otherwise.)
2. At least one of the following is true:
    * The model is in base-to-base contact with the target.
    * Any part of the model's **Influence** overlaps with any part of the target's base or designated area.

* Engagement status **MAY** affect eligibility for certain actions, modifiers, or effects (for example see [R-6.2.4 GangUp](#r-624-gangup)).
* Terrain and scenario features **MAY** specify additional effects or restrictions when Engaged; these **MUST** be defined in the scenario or terrain rules.

#### R-6.2.2 Cover

* No Cover: Clear line of sight.
* Partial Cover: +1 to defense roll if terrain Size = Character Size - 1.
* Full Cover: +2 to defense roll if terrain Size ≤ Character Size - 2.
* Obscured: No line of sight if terrain Size ≥ Character Size.

#### R-6.2.4 GangUp

If a target is engaged by two or more enemy models, attackers gain +1 to their attack roll per additional model (max +3).

#### R-6.2.5 High Ground

If a model attacks from a terrain feature at least two size categories higher than the target, it gains +1 to its attack roll.

---

## 7. Special Rules

### 7.1 Temporary Conditions

The following conditions can be inflicted by attacks and abilities. Each can stack up to 2 times. All temporary conditions stack the effect strength except Damage Over Time (DOT). Stacks must all be removed before DOT's effect stops:

#### R-7.1.1 Slow

Target loses 1 stride (minimum of 1). Stacks.

#### R-7.1.2 Weaken

Target's Defense is reduced by 1. Stacks.

#### R-7.1.3 Hinder

Target's Attack Skill is reduced by 1. Stacks.

#### R-7.1.4 Damage Over Time

Target suffers 1 wound at the end of its activation. Stacks don't increase wounds suffered.

### 7.2 Terrain and Model Interaction Effects

#### R-7.2.1 Push

Push the target directly away by half the size difference (minimum 1"). Cannot push targets more than one size larger.

#### R-7.2.2 Falling

A model falls when it is moved to a position where it is no longer supported by terrain. This can occur due to a Push, Throw, or terrain destruction.

#### R-7.2.3 Falling Damage

* The falling model gains **Slow**, **Weak**, or **Hindered** (model owner's choice).
* The model suffers damage equal to the height fallen in size categories (minimum 1) plus the size of the model (rounded down, minimum 0). For example, falling from Size 3 terrain deals 3 damage.
* Falling damage ignores Defense.

#### R-7.2.4 Terrain on Impact

If a falling model lands on terrain, that terrain is subject to Terrain Interaction rules as if the model were thrown at it.

#### R-7.2.5 Models on Impact

If a falling model lands on another model, both models gain **Slow**, **Weak**, or **Hindered** (model owner's choice) and each suffers 1 Physical damage per size category of the other model. The smaller model is displaced so no part of its base is touching the other model; displacement must be legal and use the least movement possible.

#### R-7.2.6 Terrain Interaction

If terrain is impacted by a model or another piece of terrain, it is destroyed if the size of the thrown object is greater than the size of the impacted terrain, unless it is reinforced terrain.

When terrain impacts models or reinforced terrain, the attack value is equal to the size of the thrown terrain (ignores Defense).

#### R-7.2.7 Attacking and Destroying Terrain

A model **MAY** target a piece of terrain with an Attack Action, following these rules:

1. Declare the terrain piece as the target of the attack.
2. Resolve the attack using the standard combat sequence ([R-6.1.1 Combat Resolution Sequence](#r-611-combat-resolution-sequence)).
    * The terrain's **Defense** is equal to its Size Value, unless it is Reinforced ([R-7.2.8 Reinforced Terrain](#r-728-reinforced-terrain)) or Fragile ([R-7.2.9 Fragile Terrain](#r-729-fragile-terrain)).
    * The terrain's **Wounds** is equal to its Size Value, unless otherwise specified.
3. If the attack deals damage equal to or greater than the remaining Wounds of the terrain, the terrain is destroyed.
4. When terrain is destroyed, apply any scenario or terrain-specific effects (e.g., creating difficult or hazardous terrain) as agreed during setup ([R-7.2.9 Fragile Terrain](#r-729-fragile-terrain)).
5. If a model is on or in contact with terrain that is destroyed, resolve falling and impact effects as normal ([R-7.2.2 Falling](#r-722-falling), [R-7.2.3 Falling Damage](#r-723-falling-damage), [R-7.2.5 Models on Impact](#r-725-models-on-impact)).

*Exception:* Some terrain may be marked as indestructible and **CANNOT** be targeted or destroyed by attacks unless a scenario or special rule allows it.

```markdown
Example: A Size 2 wall (Defense 2, Wounds 2) is targeted by an attack with Attack Skill 3. The attacker flips cards and adds modifiers, achieving a total of 4. The wall's defense is 2. The attack deals 2 damage (4 - 2 = 2), destroying the wall.
```

#### R-7.2.8 Reinforced Terrain

* Wounds = size value × 2
* Can only be damaged by attacks or thrown objects that deal at least as much damage as its size value in a single hit.
* Defense equal to Size value + 2
* Some terrain leaves effects on destruction; these are determined during terrain placement.

#### R-7.2.9 Fragile Terrain

* Fragile terrain has 1 Wound and no Defense. It is destroyed by any successful attack or by a model with a higher Size Value moving through it.

#### R-7.2.10 Influence

Influence is determined by Size Category and is the area around the models base that they can influence. Influence is important for [Engagement Rules](#r-621-engagement) and scenario play.

#### R-7.2.11 Multilevel Terrain and Elevation

* Terrain pieces **MAY** have multiple designated levels or elevations. Each level must have a size and **MUST** be clearly defined and agreed upon during setup.
* For Falling, line of sight, and [R-6.2.5 High Ground](#r-625-high-ground) add the sizes of the levels your on.
* Line of Sight (LoS) is blocked by any intervening level of terrain unless both the attacker and target are on the same level or there is a clear, unobstructed path between them (example the floors are grates).
* Area of Effect (AoE) attacks only affect models on the same level unless otherwise specified.

#### R-7.2.12 Stairs, Ladders, and Ramps

* Stairs, ladders, and ramps are traversable terrain features that connect different levels.
* Moving between adjacent levels via stairs, ladders, or ramps costs 1 Stride, regardless of height difference.
* Models **CANNOT** Run ([R-5.2.5 Run](#r-525-run)) while moving on stairs, ladders, or ramps.
* Models **CANNOT** be pushed or thrown up stairs, ladders, or ramps unless specified by a special rule.

#### R-7.2.13 Bridges and Walkways

* Bridges and walkways are treated as standard ground for movement and Stride costs.
* Models **MAY** fall from bridges or walkways if pushed, thrown, or if they end movement with no part of their base supported.
* Bridges and walkways **MAY** provide Cover as determined by their Size Value and structure (see [R-6.2.2 Cover](#r-622-cover)).

#### R-7.2.14 Impassable Terrain

* Impassable terrain **CANNOT** be moved through, climbed, or ended upon by any model, regardless of Size Value, unless a special rule allows it.
* If a model is pushed or thrown into impassable terrain, it stops at the edge and suffers 1 additional Physical damage per Size Value of the terrain.

#### R-7.2.15 Difficult Terrain

* Difficult terrain (e.g., dense forest, rubble, swamp) increases the Stride cost to move through it.
* If a model size would allow it [Step Over](#r-522-step-over-terrain) it is not impaired by the Difficult Terrain.
* Each stride only goes half as far until completely outside the Difficult terrain.

#### R-7.2.16 Doors and Gates

* Doors and gates are interactive terrain features. They **MAY** be [Interacted with](#r-523-interact-with-objectives-or-terrain) to open or close a door or gate.
* Open doors and gates allow movement and LoS; closed doors and gates block both.

#### R-7.2.17 Consoles and Terminals

* Consoles and terminals are interactive terrain features. A model in base contact **MAY** spend 1 Stride to activate a console or terminal.
* Activation **MAY** trigger scenario effects, activate other terrain, or provide temporary bonuses as defined by the scenario.

#### R-7.2.18 Hazardous Terrain

* Hazardous terrain (e.g., acid pools, flaming rubble, electrical grids) inflicts damage or conditions on models that start their activation in, move through, or are pushed/thrown onto it.
* When a model enters or starts its activation in hazardous terrain, flip two cards. If the sum is 0 or less, the model suffers 1 Wound and gains **Hindered**.
* The specific effects and triggers for hazardous terrain **MUST** be agreed upon during setup and clearly marked.

```markdown
Example: A model is pushed into a flaming rubble terrain. Flip two cards; if the sum is 0 or less, the model suffers 1 Wound and gains Hindered.
```

---

## 8. Game Setup

All game setup procedures, including force selection, deployment, objectives, and victory conditions, are defined by the chosen scenario.  
See [Scenarios](scenarios.md) for detailed setup and scenario rules.

---

## 9. Glossary

### 9.1 Terms and Definitions

* **Action:** Any declared activity a model performs during its activation, including attacks, movements, and special abilities.
* **Base Influence:** The area around a model's base used to determine zone control and other effects. Unless otherwise specified, this is the model's base plus any additional influence radius granted by abilities or effects.
* **Exhaust Token:** A token placed on an action to indicate it has been used this Turn. Exhaust Tokens prevent an action from being performed again until removed.
* **Initiative:** The order in which players or sides activate their models during a Round. Determined at the start of each Round.
* **Stride:** A unit of movement for models, representing a single step or dash. The length of a Stride is determined by the model's Size Value.
