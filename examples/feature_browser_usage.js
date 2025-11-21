/**
 * JavaScript example for using the Atago game library (UMD build)
 */

// This example shows how to use the library via CDN or direct script inclusion
// <script src="https://unpkg.com/@atago/lib@latest/dist/index.global.js"></script>

// If using in browser environment with UMD build:
// const { BaseUnit, Property } = window.Atago;

// For Node.js usage (CommonJS):
// const { BaseUnit, Property } = require('@atago/lib');

// For ES modules usage:
// import { BaseUnit, Property } from '@atago/lib';

function example() {
  // Create a unit
  const unit = new BaseUnit('unit-1', 'Test Unit', 'example');

  // Set properties
  unit.setProperty('health', 100);
  unit.setProperty('mana', 50);

  console.log('Initial stats:');
  console.log('Health:', unit.getPropertyValue('health'));
  console.log('Mana:', unit.getPropertyValue('mana'));

  // Add a temporary buff
  unit.addPropertyModifier('health', {
    source: 'potion',
    value: (current) => current + 20,
    priority: 5
  });

  // Update to apply modifiers
  unit.update(0);
  console.log('After potion buff:');
  console.log('Health:', unit.getPropertyValue('health'));

  // Remove the buff
  unit.removePropertyModifier('health', 'potion');
  unit.update(0);
  console.log('After potion wears off:');
  console.log('Health:', unit.getPropertyValue('health'));
}

// Run the example if this file is executed directly
if (typeof window !== 'undefined' && window.BaseUnit) {
  // Browser environment
  example();
} else if (typeof require !== 'undefined') {
  // Node.js environment - this would need to be adapted to import properly
  console.log('This example is meant to demonstrate browser usage of the UMD build');
}