/**
 * Feature: Basic Properties
 * 
 * This example demonstrates the core functionality of setting and getting properties
 * on game units using the Atago library.
 */

import { BaseUnit } from '../src/core/Unit';

console.log('=== Feature Example: Basic Properties ===\n');

// Create a unit
const player = new BaseUnit('player-1', 'Hero', 'player');

// Set basic properties
player.setProperty('health', 100);
player.setProperty('attack', 20);
player.setProperty('defense', 10);

console.log('Initial properties:');
console.log(`Health: ${player.getPropertyValue('health')}`); // 100
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 20
console.log(`Defense: ${player.getPropertyValue('defense')}`); // 10

// Update properties
player.setProperty('health', 90);
console.log(`\nAfter taking damage, health: ${player.getPropertyValue('health')}`); // 90

// Check if a property exists and get it
const healthProperty = player.getProperty('health');
if (healthProperty) {
  console.log(`Found health property with value: ${healthProperty.value}`);
}

// Try to get a non-existent property (returns undefined)
const mana = player.getPropertyValue('mana');
console.log(`Mana (non-existent): ${mana}`); // undefined

// Safe property access when you know the property should exist
try {
  const requiredHealth = player.requirePropertyValue('health');
  console.log(`Required health (safe access): ${requiredHealth}`); // 90
} catch (error) {
  if (error instanceof Error) {
    console.error('Health property not found:', error.message);
  } else {
    console.error('Health property not found:', error);
  }
}

console.log('\nBasic Properties example completed!');