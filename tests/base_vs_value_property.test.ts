import { describe, it, expect, beforeEach } from 'vitest';
import { BaseUnit } from '../src/core/Unit';

describe('setProperty vs setBaseProperty', () => {
  let unit: BaseUnit;

  beforeEach(() => {
    unit = new BaseUnit('unit-1', 'Test Unit', 'test');
  });

  it('should use setProperty to change only value, not baseValue (for temporary changes like damage)', () => {
    // Set initial property
    unit.setProperty('health', 100);
    
    const initialProp = unit.getProperty('health');
    expect(initialProp?.value).toBe(100);
    expect(initialProp?.baseValue).toBe(100);
    
    // Simulate taking damage - only change value, keep base health the same
    unit.setProperty('health', 70);
    
    const afterDamage = unit.getProperty('health');
    expect(afterDamage?.value).toBe(70);      // Current health is reduced
    expect(afterDamage?.baseValue).toBe(100); // Base health stays the same
  });

  it('should use setBaseProperty to change both baseValue and value (for permanent changes like training)', () => {
    // Set initial property
    unit.setProperty('strength', 10);
    
    const initialProp = unit.getProperty('strength');
    expect(initialProp?.value).toBe(10);
    expect(initialProp?.baseValue).toBe(10);
    
    // Simulate strength training - permanently increase base value
    unit.setBaseProperty('strength', 15);
    
    const afterTraining = unit.getProperty('strength');
    expect(afterTraining?.value).toBe(15);    // Current strength is increased
    expect(afterTraining?.baseValue).toBe(15); // Base strength is also increased
  });

  it('should work correctly with modifiers after both types of changes', () => {
    // Set initial property
    unit.setProperty('attack', 20);
    
    // Add a damage debuff - only affects current value
    unit.setProperty('attack', 15);
    
    const afterDebuff = unit.getProperty('attack');
    expect(afterDebuff?.value).toBe(15);      // Affected by debuff
    expect(afterDebuff?.baseValue).toBe(20); // Base value unchanged
    
    // Add a modifier that increases attack by 5
    unit.addPropertyModifier('attack', {
      source: 'weapon',
      value: (current: number) => current + 5,
      priority: 1
    });

    unit.update(1/60);

    // After modifiers, the value should be baseValue (20) + modifier (5) = 25
    // Note: modifiers apply to baseValue, not the current value set by setProperty
    const afterModifier = unit.getProperty('attack');
    expect(afterModifier?.value).toBe(25);
    
    // Now simulate training to permanently increase base attack
    unit.setBaseProperty('attack', 25);
    
    // Add another modifier
    unit.addPropertyModifier('attack', {
      source: 'buff',
      value: (current: number) => current + 3,
      priority: 2
    });
    
    unit.update(1/60);
    
    // After setting base value to 25 and applying modifiers (25 + 5 from weapon + 3 from buff = 33)
    const afterTrainingAndBuff = unit.getProperty('attack');
    expect(afterTrainingAndBuff?.value).toBe(33);
    expect(afterTrainingAndBuff?.baseValue).toBe(25);
  });
});