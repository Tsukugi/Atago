/**
 * Feature: Property Modifiers
 * 
 * This example demonstrates how to add and use property modifiers that can dynamically
 * change property values based on functions or static values.
 */

import { BaseUnit } from '../src/core/Unit';

console.log('=== Feature Example: Property Modifiers ===\n');

// Create a unit
const player = new BaseUnit('player-1', 'Warrior', 'player');

// Set initial properties
player.setProperty('attack', 25);
player.setProperty('defense', 15);

console.log('Initial stats:');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 25
console.log(`Defense: ${player.getPropertyValue('defense')}`); // 15

// Add equipment that increases attack
player.addPropertyModifier('attack', {
  source: 'iron-sword',                    // Unique identifier for this modifier
  value: (current: number) => current + 5, // Function that adds 5 to current value
  priority: 5                             // Priority level (lower numbers apply first)
});

// Add equipment that increases defense
player.addPropertyModifier('defense', {
  source: 'steel-shield',                  // Unique identifier for this modifier  
  value: (current: number) => current + 3, // Function that adds 3 to current value
  priority: 5                             // Same priority as the sword
});

// Apply modifiers by updating the unit
player.update(1/60);

console.log('\nStats with equipment:');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 30 (25 + 5)
console.log(`Defense: ${player.getPropertyValue('defense')}`); // 18 (15 + 3)

// Add a level-based modifier (dynamically changes based on level)
player.setProperty('level', 1);
player.addPropertyModifier('attack', {
  source: 'level-bonus',                                    // Unique identifier for this modifier
  value: (current: number) => current + (player.getPropertyValue<number>('level') || 1) * 2, // +2 per level
  priority: 10                                             // Higher priority than equipment
});

player.update(1/60);

console.log('\nStats with level bonus (level 1):');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 32 (25 + 5 + 2)
console.log(`Level: ${player.getPropertyValue('level')}`); // 1

// Level up and see how the modifier updates automatically
player.setProperty('level', 5);
player.update(1/60);

console.log('\nStats after leveling up to level 5:');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 40 (25 + 5 + 10)
console.log(`Level: ${player.getPropertyValue('level')}`); // 5

// Remove equipment temporarily
player.removePropertyModifier('attack', 'iron-sword');
player.update(1/60);

console.log('\nStats after removing sword:');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 35 (25 + 0 + 10)
console.log(`Defense: ${player.getPropertyValue('defense')}`); // 18 (unchanged)

// Add the sword back
player.addPropertyModifier('attack', {
  source: 'iron-sword',
  value: (current: number) => current + 5,
  priority: 5
});
player.update(1/60);

console.log('\nStats after adding sword back:');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 40 (25 + 5 + 10)

// Demonstrate priority system (higher priority applies later)
player.addPropertyModifier('attack', {
  source: 'temporary-buff',
  value: (current: number) => current * 1.1, // 10% increase
  priority: 15                               // Higher priority than level bonus
});

player.update(1/60);

console.log('\nStats with temporary buff (applies after level bonus):');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 44 (40 * 1.1)

console.log('\nProperty Modifiers example completed!');