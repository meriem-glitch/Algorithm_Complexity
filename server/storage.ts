// This application doesn't need persistent storage
// All benchmark execution happens on-demand
export interface IStorage {}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
