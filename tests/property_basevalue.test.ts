import { describe, it, expect, beforeEach } from 'vitest';
import { BaseUnit } from '../src/core/Unit';
import { Property } from '../src/core/Property';

describe('Property baseValue vs value mutation', () => {
  let unit: BaseUnit;

  beforeEach(() => {
    unit = new BaseUnit('unit-1', 'Test Unit', 'test');
  });

  it('should mutate only value and not baseValue when using setProperty', () => {
    // Set a property initially
    unit.setProperty('health', 100);
    
    const healthProp = unit.getProperty('health');
    expect(healthProp?.value).toBe(100);
    expect(healthProp?.baseValue).toBe(100);
    
    // Change the property value
    unit.setProperty('health', 150);
    
    const updatedProp = unit.getProperty('health');
    expect(updatedProp?.value).toBe(150); // value should be updated
    expect(updatedProp?.baseValue).toBe(100); // baseValue should remain unchanged
  });

  it('should preserve baseValue when applying modifiers', () => {
    // Set a property with initial value
    unit.setProperty('attack', 50);
    
    const attackProp = unit.getProperty('attack');
    expect(attackProp?.value).toBe(50);
    expect(attackProp?.baseValue).toBe(50);
    
    // Add a modifier that increases value by 10
    unit.addPropertyModifier('attack', {
      source: 'weapon',
      value: (current: number) => current + 10,
      priority: 1
    });
    
    // Update to apply modifiers
    unit.update(1/60);
    
    // After applying modifiers, value should be 60 but baseValue should still be 50
    const modifiedProp = unit.getProperty('attack');
    expect(modifiedProp?.value).toBe(60);
    expect(modifiedProp?.baseValue).toBe(50);
  });

  it('should allow baseValue preservation even after multiple setProperty calls', () => {
    unit.setProperty('defense', 20);
    
    const initialProp = unit.getProperty('defense');
    expect(initialProp?.value).toBe(20);
    expect(initialProp?.baseValue).toBe(20);
    
    // Change value multiple times
    unit.setProperty('defense', 25);
    unit.setProperty('defense', 30);
    unit.setProperty('defense', 35);
    
    const finalProp = unit.getProperty('defense');
    expect(finalProp?.value).toBe(35); // Should reflect the last set value
    expect(finalProp?.baseValue).toBe(20); // Should remain the original base value
  });
});