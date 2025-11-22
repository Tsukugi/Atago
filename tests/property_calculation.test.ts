import { describe, it, expect } from 'vitest';
import { Property } from '../src/core/Property';

describe('Property calculateValue with preserved baseValue', () => {
  it('should calculate value starting from baseValue and applying modifiers', () => {
    const prop = new Property('speed', 10);
    
    // Initially, baseValue and value should be the same
    expect(prop.baseValue).toBe(10);
    expect(prop.value).toBe(10);
    
    // Manually change the value without changing baseValue
    prop.value = 15;
    
    // The baseValue should still be the original
    expect(prop.baseValue).toBe(10);
    expect(prop.value).toBe(15);
    
    // Add a modifier
    prop.modifiers.push({
      source: 'potion',
      value: (current: number) => current * 2,
      priority: 1
    });
    
    // CalculateValue should start from baseValue (10) and apply modifiers
    const calculated = prop.calculateValue();
    expect(calculated).toBe(20); // 10 * 2, starting from baseValue
  });

  it('should calculate value properly when value was manually set but baseValue preserved', () => {
    const prop = new Property('attack', 50);
    
    // Simulate the behavior of setProperty after my change
    // This should only change value, not baseValue
    prop.value = 60;  // This simulates what happens with setProperty now
    
    expect(prop.baseValue).toBe(50); // Original base
    expect(prop.value).toBe(60);     // Changed value
    
    // Add a flat modifier
    prop.modifiers.push({
      source: 'weapon',
      value: (current: number) => current + 15,
      priority: 1
    });
    
    // CalculateValue should start from baseValue, not current value
    const calculated = prop.calculateValue();
    expect(calculated).toBe(65); // 50 (baseValue) + 15 = 65
  });

  it('should work correctly with multiple modifiers', () => {
    const prop = new Property('defense', 100);
    
    // Add modifiers with different priorities
    prop.modifiers.push({
      source: 'armor',
      value: (current: number) => current + 20,
      priority: 2
    });
    
    prop.modifiers.push({
      source: 'buff',
      value: (current: number) => current * 1.1,
      priority: 1
    });
    
    // CalculateValue should start from baseValue (100)
    // First apply buff (priority 1): 100 * 1.1 = 110
    // Then apply armor (priority 2): 110 + 20 = 130
    const calculated = prop.calculateValue();
    expect(calculated).toBe(130);
  });
});