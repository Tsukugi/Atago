import { BaseUnit } from '../src/core/Unit';
import {
  areTraitsCompatible,
  doTraitsConflict,
  getTraitInfluence,
} from '../src/utils/traitUtils';

describe('traitUtils', () => {
  describe('areTraitsCompatible', () => {
    it('should return true when both units have the same trait', () => {
      const unit1 = new BaseUnit('unit1', 'Test Unit 1');
      unit1.addTrait('brave');

      const unit2 = new BaseUnit('unit2', 'Test Unit 2');
      unit2.addTrait('brave');

      const result = areTraitsCompatible(unit1, unit2, 'brave');
      expect(result).toBe(true);
    });

    it('should return false when one unit does not have the trait', () => {
      const unit1 = new BaseUnit('unit1', 'Test Unit 1');
      unit1.addTrait('brave');

      const unit2 = new BaseUnit('unit2', 'Test Unit 2');
      // unit2 does not have 'brave' trait

      const result = areTraitsCompatible(unit1, unit2, 'brave');
      expect(result).toBe(false);
    });

    it('should return false when neither unit has the trait', () => {
      const unit1 = new BaseUnit('unit1', 'Test Unit 1');
      // unit1 does not have 'brave' trait

      const unit2 = new BaseUnit('unit2', 'Test Unit 2');
      // unit2 does not have 'brave' trait

      const result = areTraitsCompatible(unit1, unit2, 'brave');
      expect(result).toBe(false);
    });
  });

  describe('doTraitsConflict', () => {
    it('should return true when units have directly conflicting traits', () => {
      const unit1 = new BaseUnit('unit1', 'Brave Unit');
      unit1.addTrait('brave');
      unit1.addTrait('honest'); // Add this so both units have the same base trait

      const unit2 = new BaseUnit('unit2', 'Cowardly Unit');
      unit2.addTrait('cowardly');
      unit2.addTrait('honest'); // Same base trait

      // For unit1 to have 'brave' and unit2 to have 'cowardly' should be conflicting
      const result = doTraitsConflict(unit1, unit2, 'honest');
      expect(result).toBe(true);
    });

    it('should return true when units have reverse conflicting traits', () => {
      const unit1 = new BaseUnit('unit1', 'Cowardly Unit');
      unit1.addTrait('cowardly');
      unit1.addTrait('generous'); // Add this so both units have the same base trait

      const unit2 = new BaseUnit('unit2', 'Brave Unit');
      unit2.addTrait('brave');
      unit2.addTrait('generous'); // Same base trait

      // For unit1 to have 'cowardly' and unit2 to have 'brave' should be conflicting
      const result = doTraitsConflict(unit1, unit2, 'generous');
      expect(result).toBe(true);
    });

    it('should return false when units do not have conflicting traits', () => {
      const unit1 = new BaseUnit('unit1', 'Brave Unit');
      unit1.addTrait('brave');
      unit1.addTrait('honest');

      const unit2 = new BaseUnit('unit2', 'Strong Unit');
      unit2.addTrait('strong'); // Not in conflicting list
      unit2.addTrait('honest'); // Same base trait

      const result = doTraitsConflict(unit1, unit2, 'honest');
      expect(result).toBe(false);
    });

    it('should return false when one unit does not have any traits', () => {
      const unit1 = new BaseUnit('unit1', 'Brave Unit');
      unit1.addTrait('brave');

      const unit2 = new BaseUnit('unit2', 'Neutral Unit');
      // unit2 has no traits

      const result = doTraitsConflict(unit1, unit2, 'brave');
      expect(result).toBe(false);
    });

    it('should return false when units share non-conflicting traits', () => {
      const unit1 = new BaseUnit('unit1', 'Brave Unit');
      unit1.addTrait('brave');
      unit1.addTrait('generous');

      const unit2 = new BaseUnit('unit2', 'Brave Unit');
      unit2.addTrait('brave');
      unit2.addTrait('generous');

      const result = doTraitsConflict(unit1, unit2, 'brave');
      expect(result).toBe(false);
    });
  });

  describe('getTraitInfluence', () => {
    it('should return influence values for known traits', () => {
      const braveInfluence = getTraitInfluence('brave');
      expect(braveInfluence.attack).toBe(1.1);
      expect(braveInfluence.defense).toBe(1.05);
    });

    it('should return influence values for cowardly trait', () => {
      const cowardlyInfluence = getTraitInfluence('cowardly');
      expect(cowardlyInfluence.attack).toBe(0.9);
      expect(cowardlyInfluence.defense).toBe(0.8);
    });

    it('should return influence values for honest trait', () => {
      const honestInfluence = getTraitInfluence('honest');
      expect(honestInfluence.trust).toBe(1.2);
    });

    it('should return influence values for deceitful trait', () => {
      const deceitfulInfluence = getTraitInfluence('deceitful');
      expect(deceitfulInfluence.trust).toBe(0.6);
    });

    it('should return influence values for generous trait', () => {
      const generousInfluence = getTraitInfluence('generous');
      expect(generousInfluence.resource).toBe(1.1);
    });

    it('should return influence values for greedy trait', () => {
      const greedyInfluence = getTraitInfluence('greedy');
      expect(greedyInfluence.resource).toBe(0.9);
    });

    it('should return influence values for loyal trait', () => {
      const loyalInfluence = getTraitInfluence('loyal');
      expect(loyalInfluence.loyalty).toBe(1.5);
    });

    it('should return empty object for unknown trait', () => {
      const unknownInfluence = getTraitInfluence('unknown_trait' as any);
      expect(unknownInfluence).toEqual({});
    });

    it('should return empty object for undefined trait', () => {
      // Testing with undefined to ensure safety
      const undefinedInfluence = getTraitInfluence(undefined as any);
      expect(undefinedInfluence).toEqual({});
    });
  });
});
