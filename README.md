# Atago Game Library

A TypeScript library for managing game units with properties and modifiers.

## Installation

```bash
npm install @atsu/atago
```

## Basic Usage

```typescript
import { BaseUnit, Property } from '@atsu/atago';

// Create a new unit
const player = new BaseUnit('player-1', 'Hero', 'player');

// Set some properties
player.setProperty('health', 100);
player.setProperty('attack', 20);
player.setProperty('defense', 10);

// Get properties
console.log(player.getPropertyValue('health')); // 100

// Add a modifier to a property
player.addPropertyModifier('attack', {
  source: 'sword',
  value: (current: number) => current + 5,
  priority: 1
});

// Update the unit to apply modifiers
player.update(1/60); // deltaTime in seconds (e.g., 1/60 for 60fps)

console.log(player.getPropertyValue('attack')); // 25 (20 + 5 from modifier)
```

## Features

### Units
- Create customizable game units with unique IDs, names, and types
- Manage properties dynamically
- Apply modifiers to properties with priorities

### Properties
- Strongly typed property system
- Base values with modifier support
- Priority-based modifier application
- Read-only property support

### Modifiers
- Function-based modifiers that can calculate new values
- Priority system for modifier application order
- Source tracking for modifier management
- Add/remove modifiers dynamically

## API Reference

### BaseUnit
The main unit class that represents a game entity.

#### Constructor
```typescript
new BaseUnit(id: string, name: string, type: string, initialProperties?: IPropertyCollection)
```

#### Methods
- `getProperty<T>(name: string): IProperty<T> | undefined` - Get a property by name
- `getPropertyValue<T>(name: string): T | undefined` - Get the value of a property by name
- `setProperty<T>(name: string, value: T, type?: PropertyType): void` - Set a property value
- `addPropertyModifier<T>(propertyName: string, modifier: PropertyModifier<T>): void` - Add a modifier to a property
- `removePropertyModifier(propertyName: string, source: string): void` - Remove a modifier from a property
- `update(deltaTime: number): void` - Update the unit and apply modifiers
- `destroy(): void` - Clean up the unit

### Property
The property class that manages values and modifiers.

#### Constructor
```typescript
new Property<T>(name: string, value: T, readonly: boolean = false)
```

## Examples

### Example 1: Creating a Warrior Unit
```typescript
import { BaseUnit } from '@atsu/atago';

// Create a warrior unit
const warrior = new BaseUnit('warrior-1', 'Brave Warrior', 'warrior');

// Set basic properties
warrior.setProperty('health', 150);
warrior.setProperty('attack', 30);
warrior.setProperty('defense', 15);
warrior.setProperty('level', 1);

// Add equipment modifier
warrior.addPropertyModifier('attack', {
  source: 'magic-sword',
  value: (current: number) => current * 1.2, // 20% attack increase
  priority: 10
});

// Update unit to apply modifiers
warrior.update(0);

console.log(`Warrior attack: ${warrior.getPropertyValue('attack')}`); // 36 (30 * 1.2)
```

### Example 2: Dynamic Property Modification
```typescript
import { BaseUnit } from '@atsu/atago';

const enemy = new BaseUnit('enemy-1', 'Goblin', 'enemy');

enemy.setProperty('health', 50);
enemy.setProperty('speed', 5);

// Apply a temporary speed boost
enemy.addPropertyModifier('speed', {
  source: 'potion',
  value: (current: number) => current + 3,
  priority: 5
});

enemy.update(0);
console.log(`Goblin speed: ${enemy.getPropertyValue('speed')}`); // 8

// Remove the speed boost after some time
enemy.removePropertyModifier('speed', 'potion');
enemy.update(0);
console.log(`Goblin speed after potion wears off: ${enemy.getPropertyValue('speed')}`); // 5
```

## Development

To contribute to this library:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run tests: `npm run test`
6. Build: `npm run build`
7. Submit a pull request

## License

MIT