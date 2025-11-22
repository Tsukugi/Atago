/**
 * Feature: Non-Undefined Methods
 * 
 * This example demonstrates the safe property access methods that throw errors
 * instead of returning undefined when properties don't exist.
 */

import { BaseUnit } from '../src/core/Unit';

console.log('=== Feature Example: Non-Undefined Methods ===\n');

// Create a unit
const player = new BaseUnit('player-1', 'Hero', 'player');

// Set some properties
player.setProperty('health', 100);
player.setProperty('attack', 25);
player.addTrait('brave');

console.log('Available properties:');
console.log(`Health: ${player.getPropertyValue('health')}`); // 100
console.log(`Attack: ${player.getPropertyValue('attack')}`); // 25
console.log(`Brave trait: ${player.getPropertyValue('brave')}`); // true

// Example 1: Using getPropertyValue (can return undefined)
console.log('\n--- Standard Methods (can return undefined) ---');
const healthValue = player.getPropertyValue('health');
console.log(`Health value: ${healthValue}`); // 100

const manaValue = player.getPropertyValue('mana');
console.log(`Mana value (doesn't exist): ${manaValue}`); // undefined

// Example 2: Using requirePropertyValue (throws error if property doesn't exist)
console.log('\n--- Safe Methods (throw errors instead of returning undefined) ---');
try {
  const requiredHealth = player.requirePropertyValue('health');
  console.log(`Required health: ${requiredHealth}`); // 100
} catch (error) {
  console.error('Error:', error.message);
}

// This will throw an error since 'mana' property doesn't exist
try {
  const requiredMana = player.requirePropertyValue('mana');
  console.log(`Required mana: ${requiredMana}`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error getting required mana: ${error.message}`); // Property "mana" does not exist
  } else {
    console.log(`Error getting required mana: ${String(error)}`);
  }
}

// Example 3: Using getProperty vs requireProperty
console.log('\n--- Property Object Access ---');
const healthProperty = player.getProperty('health');
console.log(`Health property exists: ${!!healthProperty}`);
if (healthProperty) {
  console.log(`Health property name: ${healthProperty.name}, value: ${healthProperty.value}`);
}

const manaProperty = player.getProperty('mana');
console.log(`Mana property exists: ${!!manaProperty}`); // false

// Using requireProperty (will throw for non-existent properties)
try {
  const requiredHealthProp = player.requireProperty('health');
  console.log(`Required health property value: ${requiredHealthProp.value}`); // 100
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Error:', error);
  }
}

try {
  const requiredManaProp = player.requireProperty('mana');
  console.log(`Required mana property value: ${requiredManaProp.value}`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error getting required mana property: ${error.message}`); // Property "mana" does not exist
  } else {
    console.log(`Error getting required mana property: ${String(error)}`);
  }
}

// Example 4: Practical use case - safe access when you expect properties to exist
console.log('\n--- Practical Use Cases ---');
function applyWeaponBonus(unit: BaseUnit, weaponAttackBonus: number): void {
  console.log(`Applying weapon bonus of ${weaponAttackBonus}...`);

  try {
    // Use requirePropertyValue when you expect the property to exist
    const currentAttack = unit.requirePropertyValue<number>('attack');
    const newAttack = currentAttack + weaponAttackBonus;
    unit.setProperty('attack', newAttack);

    console.log(`Attack increased from ${currentAttack} to ${newAttack}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Cannot apply weapon bonus: ${error.message}`);
    } else {
      console.error(`Cannot apply weapon bonus: ${String(error)}`);
    }
  }
}

applyWeaponBonus(player, 10); // Should work fine
console.log(`New attack value: ${player.getPropertyValue('attack')}`); // 35

// Example of when you might use safe methods in game logic
function calculateDamage(attacker: BaseUnit, defender: BaseUnit): number {
  try {
    const attackerAttack = attacker.requirePropertyValue<number>('attack');
    const defenderDefense = defender.requirePropertyValue<number>('defense');

    // Calculate damage (simplified)
    const baseDamage = Math.max(1, attackerAttack - defenderDefense);
    return baseDamage;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Cannot calculate damage: ${error.message}`);
    } else {
      console.error(`Cannot calculate damage: ${String(error)}`);
    }
    return 0; // Return 0 if required properties don't exist
  }
}

// Set a defense property on a new unit for the calculation
const enemy = new BaseUnit('enemy-1', 'Goblin', 'enemy');
enemy.setProperty('health', 50);
enemy.setProperty('attack', 15);
enemy.setProperty('defense', 5);

console.log(`\nDamage calculation:`);
console.log(`Player attack: ${player.getPropertyValue('attack')}`); // 35
console.log(`Enemy defense: ${enemy.getPropertyValue('defense')}`); // 5
console.log(`Calculated damage: ${calculateDamage(player, enemy)}`); // 30

// Try with a unit missing properties (should handle gracefully)
const basicUnit = new BaseUnit('basic-1', 'Basic', 'basic');
console.log(`Damage against basic unit (missing properties): ${calculateDamage(player, basicUnit)}`); // 0

console.log('\nNon-Undefined Methods example completed!');
console.log('\nUse requireProperty and requirePropertyValue when you expect properties to exist,');
console.log('and get/getPropertyValue when you want to handle missing properties gracefully.');