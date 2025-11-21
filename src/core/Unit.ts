import type { IUnit, IProperty, IPropertyCollection, PropertyType, PropertyModifier, CharacterTrait } from '../types';
import { Property } from './Property';

export class BaseUnit implements IUnit {
  id: string;
  name: string;
  type: string;
  properties: IPropertyCollection;

  constructor(id: string, name: string, type: string, initialProperties?: IPropertyCollection) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.properties = initialProperties ? { ...initialProperties } : {};
  }

  /**
   * Get a property by name
   */
  getProperty<T = any>(name: string): IProperty<T> | undefined {
    return this.properties[name] as IProperty<T> | undefined;
  }

  /**
   * Get the value of a property by name, returning undefined if the property doesn't exist
   */
  getPropertyValue<T = any>(name: string): T | undefined {
    const prop = this.getProperty<T>(name);
    return prop ? prop.value : undefined;
  }

  /**
   * Get a property by name, throwing an error if the property doesn't exist
   */
  requireProperty<T = any>(name: string): IProperty<T> {
    const prop = this.getProperty<T>(name);
    if (!prop) {
      throw new Error(`Property "${name}" does not exist`);
    }
    return prop;
  }

  /**
   * Get the value of a property by name, throwing an error if the property doesn't exist
   */
  requirePropertyValue<T = any>(name: string): T {
    const prop = this.requireProperty<T>(name);
    return prop.value;
  }

  /**
   * Set a property value
   */
  setProperty<T = any>(name: string, value: T, _type?: PropertyType): void {
    if (this.properties[name]?.readonly) {
      throw new Error(`Property "${name}" is readonly`);
    }

    if (this.properties[name]) {
      // Update existing property
      (this.properties[name] as IProperty<T>).value = value;
      if ((this.properties[name] as IProperty<T>).baseValue !== undefined) {
        (this.properties[name] as IProperty<T>).baseValue = value;
      }
    } else {
      // Create new property
      this.properties[name] = new Property<T>(name, value);
    }
  }

  /**
   * Add a modifier to a property
   */
  addPropertyModifier<T = any>(propertyName: string, modifier: PropertyModifier<T>): void {
    const property = this.properties[propertyName] as IProperty<T>;
    if (!property) {
      throw new Error(`Property "${propertyName}" does not exist`);
    }
    
    // Check if modifier with same source already exists, replace it
    const existingIndex = (property.modifiers || []).findIndex(m => m.source === modifier.source);
    if (existingIndex !== -1) {
      if (property.modifiers) {
        property.modifiers[existingIndex] = modifier;
      }
    } else {
      if (property.modifiers) {
        property.modifiers.push(modifier);
      }
    }
  }

  /**
   * Remove a modifier from a property
   */
  removePropertyModifier(propertyName: string, source: string): void {
    const property = this.properties[propertyName];
    if (!property) {
      return;
    }

    if (property.modifiers) {
      property.modifiers = property.modifiers.filter(mod => mod.source !== source);
    }
  }

  /**
   * Update the unit and all its properties
   */
  update(_deltaTime: number): void {
    // In a real game, deltaTime would be used for time-based updates
    // For now, we just update all properties by applying modifiers
    Object.values(this.properties).forEach(property => {
      if (property instanceof Property) {
        property.update();
      }
    });
  }

  // Character trait methods
  /**
   * Add a character trait to the unit
   */
  addTrait(trait: CharacterTrait): void {
    this.setProperty(trait, true, 'trait');
  }

  /**
   * Remove a character trait from the unit
   */
  removeTrait(trait: CharacterTrait): void {
    delete this.properties[trait];
  }

  /**
   * Check if the unit has a specific trait
   */
  hasTrait(trait: CharacterTrait): boolean {
    const traitProperty = this.getProperty(trait);
    return traitProperty ? traitProperty.value === true : false;
  }

  /**
   * Get all character traits of the unit
   */
  getTraits(): CharacterTrait[] {
    return Object.keys(this.properties).filter(key => {
      // Check if the property value is a boolean and true (meaning it's an active trait)
      const prop = this.properties[key];
      return prop && typeof prop.value === 'boolean' && prop.value === true;
    }) as CharacterTrait[];
  }

  /**
   * Destroy the unit and clean up resources
   */
  destroy(): void {
    // Clean up properties
    this.properties = {};
  }
}