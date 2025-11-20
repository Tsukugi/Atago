import type { BaseUnit } from '../core/Unit';
import type { CharacterTrait } from '../types';

/**
 * Trait utilities for working with character traits
 */

/**
 * Check if two units have compatible traits
 */
export function areTraitsCompatible(unit1: BaseUnit, unit2: BaseUnit, trait: CharacterTrait): boolean {
  // This is a basic implementation - in a game, you might have more complex compatibility rules
  return unit1.hasTrait(trait) && unit2.hasTrait(trait);
}

/**
 * Check if two units have conflicting traits
 */
export function doTraitsConflict(unit1: BaseUnit, unit2: BaseUnit, trait: CharacterTrait): boolean {
  // This is a basic implementation - in a game, you might have more complex conflict rules
  // For example, "honest" and "deceitful" might be considered conflicting
  const conflictingTraits: [CharacterTrait, CharacterTrait][] = [
    ['honest', 'deceitful'],
    ['brave', 'cowardly'],
    ['generous', 'greedy'],
    ['optimistic', 'pessimistic'],
    ['calm', 'angry'],
    ['outgoing', 'shy'],
    ['diligent', 'lazy']
  ];

  const unit1HasTrait = unit1.hasTrait(trait);
  const unit2HasTrait = unit2.hasTrait(trait);

  if (unit1HasTrait && unit2HasTrait) {
    // Check if the units have conflicting traits
    return conflictingTraits.some(([traitA, traitB]) => 
      (unit1.hasTrait(traitA) && unit2.hasTrait(traitB)) || 
      (unit1.hasTrait(traitB) && unit2.hasTrait(traitA))
    );
  }

  return false;
}

/**
 * Calculate trait influence on other properties
 * For example, a "brave" trait might increase attack, or "cowardly" might decrease it
 */
export function getTraitInfluence(trait: CharacterTrait): Record<string, number> {
  const influence: Record<string, Record<string, number>> = {
    brave: { attack: 1.1, defense: 1.05 }, // Brave units have slightly higher attack and defense
    cowardly: { attack: 0.9, defense: 0.8 }, // Cowardly units have reduced attack and defense
    honest: { trust: 1.2 }, // Honest units might have higher trust values
    deceitful: { trust: 0.6 }, // Deceitful units have lower trust values
    generous: { resource: 1.1 }, // Generous units might share resources better
    greedy: { resource: 0.9 }, // Greedy units might hoard resources
    loyal: { loyalty: 1.5 } // Loyal units have higher loyalty
  };

  return influence[trait] || {};
}