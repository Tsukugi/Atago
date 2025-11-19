/**
 * Example usage of the Atago game library
 */

import { BaseUnit } from '../src/core/Unit';
import { Property } from '../src/core/Property';

// Create a player unit
const player = new BaseUnit('player-1', 'Hero', 'player');

// Set initial properties
player.setProperty('health', 100);
player.setProperty('maxHealth', 100);
player.setProperty('attack', 20);
player.setProperty('defense', 10);
player.setProperty('level', 1);
player.setProperty('experience', 0);

console.log('=== Initial Player Stats ===');
console.log(`Health: ${player.getPropertyValue('health')}`);
console.log(`Attack: ${player.getPropertyValue('attack')}`);
console.log(`Defense: ${player.getPropertyValue('defense')}`);

// Add a weapon that increases attack
player.addPropertyModifier('attack', {
  source: 'iron-sword',
  value: (current: number) => current + 5, // +5 attack
  priority: 5
});

// Add an armor that increases defense
player.addPropertyModifier('defense', {
  source: 'leather-armor',
  value: (current: number) => current + 3, // +3 defense
  priority: 5
});

// Apply modifiers by updating the unit
player.update(1/60);

console.log('\n=== Player Stats with Equipment ===');
console.log(`Health: ${player.getPropertyValue('health')}`);
console.log(`Attack: ${player.getPropertyValue('attack')}`); // Should be 25 (20+5)
console.log(`Defense: ${player.getPropertyValue('defense')}`); // Should be 13 (10+3)

// Add a level-based modifier (e.g., attack increases with level)
player.addPropertyModifier('attack', {
  source: 'level-bonus',
  value: (current: number) => current + (player.getPropertyValue<number>('level') || 1) * 2,
  priority: 10 // Higher priority than equipment
});

player.update(1/60);

console.log('\n=== Player Stats with Level Bonus ===');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // Should be 27 (20+5+2)

// Level up the player
player.setProperty('level', 5);
player.setProperty('experience', 100);

// Update again to apply new level bonus
player.update(1/60);

console.log('\n=== Player Stats after Leveling Up ===');
console.log(`Level: ${player.getPropertyValue('level')}`);
console.log(`Attack: ${player.getPropertyValue('attack')}`); // Should be 35 (20+5+10)

// Remove the sword temporarily
player.removePropertyModifier('attack', 'iron-sword');
player.update(1/60);

console.log('\n=== Player Stats without Sword ===');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // Should be 30 (20+10)

// Add the sword back
player.addPropertyModifier('attack', {
  source: 'iron-sword',
  value: (current: number) => current + 5,
  priority: 5
});
player.update(1/60);

console.log('\n=== Player Stats with Sword Again ===');
console.log(`Attack: ${player.getPropertyValue('attack')}`); // Should be 35 again (25+10)

console.log('\n=== All Properties ===');
Object.keys(player.properties).forEach(key => {
  const prop = player.getProperty(key);
  if (prop) {
    console.log(`${key}: ${prop.value}`);
  }
});