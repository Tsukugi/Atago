/**
 * Feature: Character Traits
 * 
 * This example demonstrates how to add, remove, and check character traits
 * that represent personality characteristics of game units.
 */

import { BaseUnit } from '../src/core/Unit';

console.log('=== Feature Example: Character Traits ===\n');

// Create a unit
const npc = new BaseUnit('npc-1', 'Village Elder', 'npc');

// Add character traits
npc.addTrait('wise');
npc.addTrait('honest');
npc.addTrait('patient');

console.log('Initial traits:');
console.log(`Wise: ${npc.hasTrait('wise')}`);   // true
console.log(`Honest: ${npc.hasTrait('honest')}`); // true
console.log(`Patient: ${npc.hasTrait('patient')}`); // true

// Get all traits of the unit
const allTraits = npc.getTraits();
console.log(`All traits: [${allTraits.join(', ')}]`); // ['wise', 'honest', 'patient']

// Check for traits that don't exist
console.log(`Brave: ${npc.hasTrait('brave')}`); // false
console.log(`Jealous: ${npc.hasTrait('jealous')}`); // false

// Add more traits
npc.addTrait('calm');
npc.addTrait('loyal');

console.log(`\nAfter adding more traits: [${npc.getTraits().join(', ')}]`); // ['wise', 'honest', 'patient', 'calm', 'loyal']

// Remove a trait
npc.removeTrait('patient');
console.log(`\nAfter removing 'patient': [${npc.getTraits().join(', ')}]`); // ['wise', 'honest', 'calm', 'loyal']

// Traits behave like boolean properties internally
console.log(`\nTrait values as properties:`);
console.log(`Wise: ${npc.getPropertyValue('wise')}`); // true
console.log(`Honest: ${npc.getPropertyValue('honest')}`); // true
console.log(`Patient: ${npc.getPropertyValue('patient')}`); // undefined (removed)

// Try safe access for traits that may not exist
try {
  const wiseValue = npc.requirePropertyValue('wise');
  console.log(`Safe access to 'wise' trait: ${wiseValue}`); // true
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Trait not found:', error.message);
  } else {
    console.error('Trait not found:', error);
  }
}

// Try safe access for a non-existent trait (will throw error)
try {
  const braveValue = npc.requirePropertyValue('brave');
  console.log(`Safe access to 'brave' trait: ${braveValue}`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Safe access to non-existent 'brave' trait failed: ${error.message}`);
  } else {
    console.log(`Safe access to non-existent 'brave' trait failed: ${String(error)}`);
  }
}

// Example of how traits might influence gameplay
function applyTraitBonuses(unit: BaseUnit): void {
  let attackBonus = 0;
  let defenseBonus = 0;
  
  if (unit.hasTrait('brave')) {
    attackBonus += 5;
    defenseBonus += 2;
  }
  
  if (unit.hasTrait('cowardly')) {
    attackBonus -= 3;
    defenseBonus += 1;
  }
  
  if (unit.hasTrait('honest')) {
    // Honest characters might have trust bonuses
    console.log('Applying honest trait effects...');
  }
  
  // These are just examples - in a real game you'd implement actual mechanics
  console.log(`Calculated trait bonuses - Attack: ${attackBonus}, Defense: ${defenseBonus}`);
}

console.log('\nApplying trait bonuses example:');
applyTraitBonuses(npc);

console.log('\nCharacter Traits example completed!');