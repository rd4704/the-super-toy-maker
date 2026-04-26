import Dexie, { type Table } from 'dexie';
import type { PlacedPart } from '../state/machine';

export interface SavedToy {
  id?: number;
  name: string;
  parts: PlacedPart[];
  thumbnail: string; // dataURL
  createdAt: number;
}

class ToyDB extends Dexie {
  toys!: Table<SavedToy, number>;
  constructor() {
    super('SuperToyMaker');
    this.version(1).stores({
      toys: '++id, createdAt, name',
    });
  }
}

export const db = new ToyDB();
