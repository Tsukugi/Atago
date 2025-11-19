import { describe, it, expect, beforeEach } from 'vitest';
import { BaseUnit } from '../src/core/Unit';
import { Property } from '../src/core/Property';

describe('BaseUnit', () => {
  let unit: BaseUnit;

  beforeEach(() => {
    unit = new BaseUnit('unit-1', 'Test Unit', 'test');
  });

  it('should create a unit with id, name, and type', () => {
    expect(unit.id).toBe('unit-1');
    expect(unit.name).toBe('Test Unit');
    expect(unit.type).toBe('test');
  });

  it('should set and get a property', () => {
    unit.setProperty('health', 100);
    const health = unit.getPropertyValue<number>('health');
    expect(health).toBe(100);
  });

  it('should handle property modifiers', () => {
    unit.setProperty('attack', 50);
    
    // Add a modifier that increases attack by 10
    unit.addPropertyModifier('attack', {
      source: 'buff',
      value: (current: number) => current + 10,
      priority: 1
    });
    
    // For this test, we'll just check that the modifier is registered
    const attackProp = unit.getProperty('attack');
    expect(attackProp?.modifiers.length).toBe(1);
  });

  it('should update properties properly', () => {
    unit.setProperty('speed', 5);
    const initialSpeed = unit.getPropertyValue<number>('speed');
    expect(initialSpeed).toBe(5);
    
    // Update the unit
    unit.update(1/60); // deltaTime simulating ~60fps
    
    // After update, speed value should still be 5 as no modifiers affect it
    const updatedSpeed = unit.getPropertyValue<number>('speed');
    expect(updatedSpeed).toBe(5);
  });

  it('should destroy properly', () => {
    unit.setProperty('health', 100);
    expect(unit.getPropertyValue<number>('health')).toBe(100);
    
    unit.destroy();
    expect(unit.properties).toEqual({});
  });
});

describe('Property', () => {
  it('should create a property with name and value', () => {
    const prop = new Property('health', 100);
    expect(prop.name).toBe('health');
    expect(prop.value).toBe(100);
    expect(prop.baseValue).toBe(100);
  });

  it('should calculate value with modifiers', () => {
    const prop = new Property('attack', 50);
    
    // Add a modifier that increases value by 10
    prop.modifiers.push({
      source: 'weapon',
      value: (current: number) => current + 10,
      priority: 1
    });
    
    const calculatedValue = prop.calculateValue();
    expect(calculatedValue).toBe(60);
  });
});