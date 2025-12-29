import type { IProperty, PropertyModifier, PropertyValue } from '../types';

export class Property<T extends PropertyValue = PropertyValue>
  implements IProperty<T>
{
  name: string;
  value: T;
  baseValue?: T;
  modifiers: PropertyModifier<T>[];
  readonly: boolean;

  constructor(name: string, value: T, readonly: boolean = false) {
    this.name = name;
    this.value = value;
    this.baseValue = value;
    this.modifiers = [];
    this.readonly = readonly;
  }

  /**
   * Apply all modifiers to calculate the final value
   */
  calculateValue(): T {
    let result = this.baseValue as T;

    // Sort modifiers by priority (lower to higher)
    const sortedModifiers = [...this.modifiers].sort((a, b) =>
      (a.priority || 0) - (b.priority || 0)
    );

    for (const modifier of sortedModifiers) {
      if (typeof modifier.value === 'function') {
        result = (modifier.value as (current: T) => T)(result);
      } else {
        result = modifier.value;
      }
    }

    return result;
  }

  /**
   * Update the property by applying modifiers
   */
  update(): void {
    this.value = this.calculateValue();
  }
}
