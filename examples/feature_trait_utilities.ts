/**
 * Feature: Trait Utilities
 * 
 * This example demonstrates utility functions for working with character traits,
 * including compatibility checking, conflict detection, and trait influence systems.
 */

import { BaseUnit } from '../src/core/Unit';
import { getTraitInfluence, areTraitsCompatible, doTraitsConflict } from '../src/utils/traitUtils';

console.log('=== Feature Example: Trait Utilities ===\n');

// Create two units to demonstrate trait interactions
const player = new BaseUnit('player-1', 'Hero', 'player');
const ally = new BaseUnit('ally-1', 'Sidekick', 'npc');

// Add traits to player
player.addTrait('brave');
player.addTrait('honest');
player.addTrait('loyal');

// Add traits to ally
ally.addTrait('brave');
ally.addTrait('loyal');
ally.addTrait('generous');

console.log('Player traits:', player.getTraits());
console.log('Ally traits:', ally.getTraits());

// Check if units have compatible traits
const braveryCompatible = areTraitsCompatible(player, ally, 'brave');
console.log(`\nBravery compatibility: ${braveryCompatible}`); // true

// Add conflicting traits to demonstrate conflict detection
const enemy = new BaseUnit('enemy-1', 'Villain', 'enemy');
enemy.addTrait('deceitful');
enemy.addTrait('cowardly');

player.addTrait('honest'); // Player is honest
// Enemy is deceitful - these may be conflicting in social interactions

console.log(`\nPlayer has honest trait: ${player.hasTrait('honest')}`);
console.log(`Enemy has deceitful trait: ${enemy.hasTrait('deceitful')}`);

const conflict = doTraitsConflict(player, enemy, 'honest');
console.log(`Do player's honest trait and enemy's traits conflict: ${conflict}`); // This checks if they have conflicting traits

// Check for specific trait conflicts
const braveCowardlyConflict = doTraitsConflict(player, enemy, 'brave');
console.log(`Brave vs Cowardly conflict: ${braveCowardlyConflict}`); // true (brave vs cowardly are conflicting)

// Demonstrate trait influence system
console.log('\n=== Trait Influence System ===');

// Get influence of brave trait
const braveInfluence = getTraitInfluence('brave');
console.log(`Brave trait influence:`, braveInfluence); // { attack: 1.1, defense: 1.05 }

// Get influence of honest trait
const honestInfluence = getTraitInfluence('honest');
console.log(`Honest trait influence:`, honestInfluence); // { trust: 1.2 }

// Get influence of trait that has no defined influence
const curiousInfluence = getTraitInfluence('curious');
console.log(`Curious trait influence:`, curiousInfluence); // {} (empty object)

// Get influence of cowardly trait
const cowardlyInfluence = getTraitInfluence('cowardly');
console.log(`Cowardly trait influence:`, cowardlyInfluence); // { attack: 0.9, defense: 0.8 }

// Example of using trait influences in a game mechanic
function calculateCombatEffectiveness(unit: BaseUnit): number {
  let baseEffectiveness = 1.0;
  
  // Apply all trait influences
  const unitTraits = unit.getTraits();
  for (const trait of unitTraits) {
    const influence = getTraitInfluence(trait);
    
    // Apply attack influence if it exists
    if (influence.attack) {
      const currentAttack = unit.getPropertyValue<number>('attack') || 0;
      const newAttack = currentAttack * influence.attack;
      console.log(`${unit.name} ${trait} trait affects attack by ${influence.attack}x (if they had attack property)`);
    }
    
    // Apply other influences as needed
    Object.entries(influence).forEach(([property, multiplier]) => {
      if (property !== 'attack' && property !== 'defense') {
        console.log(`${unit.name} ${trait} trait affects ${property} by ${multiplier}x`);
      }
    });
  }
  
  return baseEffectiveness;
}

// Set some properties to demonstrate influence calculations
player.setProperty('attack', 20);
player.setProperty('defense', 15);

console.log(`\n${player.name} trait influences on combat:`);
calculateCombatEffectiveness(player);

// Example of compatibility checking for forming alliances
function canFormAlliance(unit1: BaseUnit, unit2: BaseUnit): boolean {
  const commonTraits = unit1.getTraits().filter(trait => unit2.hasTrait(trait));
  console.log(`Units share ${commonTraits.length} common traits: [${commonTraits.join(', ')}]`);
  
  // Check for any conflicts between the units
  const hasConflicts = unit1.getTraits().some(trait => 
    doTraitsConflict(unit1, unit2, trait)
  );
  
  return commonTraits.length > 0 && !hasConflicts;
}

console.log(`\nCan player and ally form alliance: ${canFormAlliance(player, ally)}`); // true
console.log(`Can player and enemy form alliance: ${canFormAlliance(player, enemy)}`); // likely false due to conflicts

console.log('\nTrait Utilities example completed!');