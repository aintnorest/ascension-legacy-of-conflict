# Scenarios

* [Pre-Game Setup](#pre-game-setup)
* [Deployment](#deployment)
* [Victory Conditions](#victory-conditions)
* [Scenario List](#scenario-list)
* [Goal List](#goal-list)

## Pre-Game Setup

### Matchmaking

The game system supports various player configurations, including 1v1, 1v1v1, 1v1v1v1, 2v1, 2v2, and more. When an uneven number of players are present, or players wish to form teams, players **MUST** agree upon the team compositions and victory conditions (e.g., last team standing, cumulative points) before setup begins.

### Team Creation

Players create their forces using the character creation point-buy system. The total point cost of all characters in a team **MUST** stay within the agreed-upon game's point limit. One character **MUST** be designated as the team leader. In Campaign mode, restrictions may apply to which models can be designated as leaders.

### Initiative

Initiative is determined using the [Card Resolution](coreRules.md#2-resolution-mechanic) mechanic.
Add applicable modifiers from:

* Model special abilities.
* Scenario terrain effects.
* If a team has fewer points than their opponent(s), they gain half the difference (rounded down) as a bonus to their Initiative flip, up to a maximum of a 3-point bonus.
The highest total wins Initiative. Ties are resolved by the [suit order](coreRules.md#2-resolution-mechanic)  or by repeated flips until a clear winner emerges.

### Scenario Selection

Each player secretly selects one scenario from a shared list. All selected scenarios are active unless identical. If multiple players select the same scenario, only one copy of that scenario's setup is used, and its conditions apply to all players involved.
Each player also selects a secondary goal. In regular games, secondary goals award bonus victory points. In Campaign mode, they provide special rewards.

### Board Setup

Players alternate placing terrain and scenario pieces. The player with Initiative places the first piece.

1. **Scenario Pieces:** Begin by placing scenario-specific pieces as detailed in the active scenarios. Players alternate placing one piece at a time. If a piece of terrain would overlap another, the placing player **MUST** use minimal displacement while attempting to keep the placement as equidistant to all players' deployment zones as possible. If this is not possible, the placing player **MAY** choose its final position. Scenario Zones **MAY** overlap.
2. **Regular Terrain:** Each player may then place the following regular terrain pieces:
    * 5× Size 0-1 terrain pieces
    * 4× Size 2 terrain pieces
    * 2× Size 3 terrain pieces
    * Optional: 1 Size 4 or 5 terrain piece.
    There is no required order for placing regular terrain, unless Advantageous Terrain is used.
3. **Optional: Advantageous Terrain Placement:** Up to 3 of the regular terrain pieces listed above **MAY** be replaced by **Advantageous Terrain** pieces. If Advantageous Terrain is used, it **MUST** be placed first, before any other regular terrain pieces.

Players **MAY** agree to use more or less terrain than listed.

**Advantageous Terrain:**

* Advantageous Terrain pieces provide special rules and unique effects.
* Advantageous Terrain placed by a player is initially under their team's control.
* Control of Advantageous Terrain resets to its original placing player at the start of each Round, before any models activate.
* If an opponent's team controls an Advantageous Terrain piece at the end of a Round, the original placing player's opponent gains +1 victory point.
* If a scenario includes an Advantageous Terrain piece in its setup, a player cannot place another Advantageous Terrain piece of the same name.
* Unless otherwise stated, players can take control of each other's Advantageous Terrain by Interacting with Terrain (see R-5.2.3 Interact with Objectives or Terrain in the Core Rules). To take control, a model **MUST** spend 1 Stride to interact with the Advantageous Terrain while in base contact. Control is immediately transferred to the interacting model's team.

**Ley Lines:**
Some Advantageous Terrain can be assigned Ley Lines, making their abilities stronger. If an Advantageous Terrain description uses 'X' in its description, 'X' equals the number of Ley Lines assigned to that specific Advantageous Terrain. No Advantageous Terrain can have more than 3 Ley Lines assigned to it.

* Size 1, 0.5" x 3" strips.
* Cannot be destroyed or moved.
* A model in base contact with a Ley Line **MAY** spend 1 Stride to interact with it. When interacting, the player **MAY** choose one Advantageous Terrain piece within 6" of the Ley Line to assign or re-assign the Ley Line to ('power' or 'un-power' it). An Advantageous Terrain piece cannot be assigned more than three Ley Lines.
* After the third interaction with a specific Ley Line (regardless of who interacted with it), that Ley Line is removed from the battlefield.
* A maximum of 4 Ley Lines can be on the board at any time.

**Specific Advantageous Terrain Examples:**

* **Font of Conflict**
  * Size: 2
  * Cannot be destroyed or moved.
  * Effect: The controlling team's leader gains +1 on all attack actions.
  * Campaign Reward: Grants "License for Conflict" to all who interact with it.
* **Ancient Gateway**
  * Size: 2
  * Reinforced Terrain.
  * Effect: The controlling player's friendly units starting their activation within X + 1" of the Gateway gain one additional Stride.
* **Power Nexus**
  * Size: 3
  * Cannot be destroyed or moved.
  * Effect: The controlling player's models that are within X" of the Power Nexus have the following benefits:
    * +1 to Attack actions.
    * +1 to Defense actions.
    * Gain a 1" free move during the model's activation. This move does not cost a Stride and does not place an Exhaust Token.

### Deployment

1. Starting with the player who won Initiative, players alternate deploying characters.
2. Characters **MUST** be placed within scenario-defined deployment zones unless an ability or Advantageous Terrain specifically says otherwise.

## Victory Conditions

The game ends when either:

* After Round 5.
* After one opponent loses all their characters.

## Scenario List

* Seize Fate [Campaign Scenario](scenario-seizeFate.md)

## Goal List

* **First Blood:**
  * Description: Be the first player to successfully resolve an attack against an enemy model (causing damage or an effect).
  * Scenario Reward: 1 victory point.
  * Campaign Reward: Gains 5 Renown.
* **Fortune Favors the Bold:**
  * Description: Be the first player to Interact with the Font of Conflict.
  * Scenario Reward: 1 victory point.
  * Campaign Reward: Gains 5 Renown.
* **Battlefield Prowess:**
  * Description: Defeat enemy models.
  * Scenario Reward: 1 victory point for every enemy model defeated.
  * Campaign Reward: Gain 5 Coin for each enemy model defeated.
