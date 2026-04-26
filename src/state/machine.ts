import { create } from 'zustand';
import { nanoid } from 'nanoid';

export interface PlacedPart {
  instanceId: string;
  assetId: string;
  x: number; // center, in machine canvas coords (0..1)
  y: number;
  scale: number;
  rotation: number; // degrees
  z: number;
}

interface MachineState {
  parts: PlacedPart[];
  selectedId: string | null;
  /** Asset id queued by tap-to-place (mobile-friendly). Tapping the machine
   *  places this asset and clears the armed selection. */
  armedAssetId: string | null;
  toyName: string;
  isAssembling: boolean;
  addPart: (assetId: string, x: number, y: number) => string;
  movePart: (id: string, x: number, y: number) => void;
  selectPart: (id: string | null) => void;
  removePart: (id: string) => void;
  updatePart: (id: string, patch: Partial<PlacedPart>) => void;
  clear: () => void;
  setToyName: (name: string) => void;
  setAssembling: (v: boolean) => void;
  armAsset: (assetId: string | null) => void;
}

export const useMachine = create<MachineState>((set) => ({
  parts: [],
  selectedId: null,
  armedAssetId: null,
  toyName: '',
  isAssembling: false,
  addPart: (assetId, x, y) => {
    const instanceId = nanoid(8);
    set((s) => ({
      parts: [
        ...s.parts,
        { instanceId, assetId, x, y, scale: 1, rotation: 0, z: s.parts.length + 1 },
      ],
      selectedId: instanceId,
    }));
    return instanceId;
  },
  movePart: (id, x, y) =>
    set((s) => ({
      parts: s.parts.map((p) => (p.instanceId === id ? { ...p, x, y } : p)),
    })),
  selectPart: (id) => set({ selectedId: id }),
  removePart: (id) =>
    set((s) => ({
      parts: s.parts.filter((p) => p.instanceId !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),
  updatePart: (id, patch) =>
    set((s) => ({
      parts: s.parts.map((p) => (p.instanceId === id ? { ...p, ...patch } : p)),
    })),
  clear: () => set({ parts: [], selectedId: null, toyName: '', armedAssetId: null }),
  setToyName: (name) => set({ toyName: name }),
  setAssembling: (v) => set({ isAssembling: v }),
  armAsset: (assetId) => set({ armedAssetId: assetId }),
}));
