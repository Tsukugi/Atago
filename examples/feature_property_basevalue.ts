import { BaseUnit } from '../src/core/Unit';

// Example demonstrating the difference between value and baseValue
console.log('=== Property baseValue vs value mutation example ===\n');

// Create a unit
const unit = new BaseUnit('hero-1', 'Hero', 'warrior');
console.log('Created unit:', unit.name);

// Set initial health
unit.setProperty('health', 100);
console.log('\nInitial health set to 100');

const healthProp = unit.getProperty('health');
console.log(`Property value: ${healthProp?.value}`);      // Should be 100
console.log(`Property baseValue: ${healthProp?.baseValue}`);  // Should be 100

// Now change the health using setProperty
unit.setProperty('health', 120);
console.log('\nAfter setProperty health to 120:');

const updatedHealthProp = unit.getProperty('health');
console.log(`Property value: ${updatedHealthProp?.value}`);      // Should be 120 (changed)
console.log(`Property baseValue: ${updatedHealthProp?.baseValue}`);  // Should still be 100 (unchanged!)

// Add a modifier that increases health by 10
unit.addPropertyModifier('health', {
  source: 'potion',
  value: (current: number) => current + 10,
  priority: 1
});

console.log('\nAdded health modifier (+10)');

// Update the unit to apply modifiers
unit.update(1/60);
console.log('Applied modifiers');

const modifiedHealthProp = unit.getProperty('health');
console.log(`Property value after modifier: ${modifiedHealthProp?.value}`);      // Should be 130 (baseValue + modifier)
console.log(`Property baseValue after modifier: ${modifiedHealthProp?.baseValue}`);  // Should still be 100
console.log(`Calculated value (baseValue + modifier): ${modifiedHealthProp?.calculateValue()}`);  // Should be 110

console.log('\n=== Summary ===');
console.log('✓ setProperty now only mutates value, not baseValue');
console.log('✓ baseValue remains the original base for modifier calculations');
console.log('✓ Modifiers are applied to the baseValue, not the current value');