import { BaseUnit } from '../src/core/Unit';

// Example demonstrating the difference between temporary and permanent property changes
console.log('=== Property System: Temporary vs Permanent Changes ===\n');

// Create a unit
const warrior = new BaseUnit('warrior-1', 'Brave Warrior', 'warrior');
console.log('Created unit:', warrior.name);

// Set initial base stats
warrior.setProperty('health', 100);
warrior.setProperty('strength', 15);
console.log('\nInitial stats set');

const initialHealth = warrior.getProperty('health');
console.log(`Health value: ${initialHealth?.value}, baseValue: ${initialHealth?.baseValue}`); // 100, 100
const initialStrength = warrior.getProperty('strength');
console.log(`Strength value: ${initialStrength?.value}, baseValue: ${initialStrength?.baseValue}`); // 15, 15

// Scenario 1: Temporary change (like taking damage)
console.log('\n--- Scenario 1: Taking Damage (Temporary Change) ---');
warrior.setProperty('health', 60); // Warrior took damage, health drops temporarily

const afterDamage = warrior.getProperty('health');
console.log(`After damage - Health value: ${afterDamage?.value}, baseValue: ${afterDamage?.baseValue}`);
// value: 60 (current health after damage), baseValue: 100 (original health capacity)

// Scenario 2: Permanent change (like training)
console.log('\n--- Scenario 2: Training Session (Permanent Change) ---');
warrior.setBaseProperty('strength', 20); // Warrior trained and permanently increased strength

const afterTraining = warrior.getProperty('strength');
console.log(`After training - Strength value: ${afterTraining?.value}, baseValue: ${afterTraining?.baseValue}`);
// value: 20 (current strength after training), baseValue: 20 (new permanent base)

// Scenario 3: Using modifiers with both types of changes
console.log('\n--- Scenario 3: Using Modifiers ---');
warrior.addPropertyModifier('health', {
  source: 'potion',
  value: (current: number) => current + 20,
  priority: 1
});

warrior.addPropertyModifier('strength', {
  source: 'weapon',
  value: (current: number) => current + 5,
  priority: 1
});

// Update to apply modifiers
warrior.update(1/60);

const modifiedHealth = warrior.getProperty('health');
const modifiedStrength = warrior.getProperty('strength');
console.log(`After modifiers - Health: ${modifiedHealth?.value}`); // 80 (60 current + 20 from potion)
console.log(`After modifiers - Strength: ${modifiedStrength?.value}`); // 25 (20 current + 5 from weapon)

// Notice that modifiers work on the CURRENT value when using setProperty
// but the base value remains unchanged for future calculations

console.log('\n=== Summary ===');
console.log('✓ setProperty - Use for temporary changes (damage, buffs, etc.)');
console.log('✓ setBaseProperty - Use for permanent changes (training, equipment upgrades, etc.)');
console.log('✓ Modifiers apply to current values regardless of how they were set');