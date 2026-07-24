import { create } from 'zustand';
import { MOCK_REEFS } from '../utils/mockData';

export const useReefStore = create((set, get) => ({
  // Active Tab: 'globe' | 'research' | 'forum' | 'story' | 'volunteer'
  activeTab: 'globe',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Visual mode in 3D: 'SURFACE_OCEAN' | 'DEEP_SEA_PLASTIC_CURRENT'
  visualMode: 'SURFACE_OCEAN',
  setVisualMode: (mode) => set({ visualMode: mode }),

  // Selected Reef Location
  selectedReefId: 'reef-01',
  selectedReef: MOCK_REEFS[0],
  setSelectedReefId: (id) => {
    const found = get().reefs.find(r => r.id === id) || MOCK_REEFS[0];
    set({ selectedReefId: id, selectedReef: found });
  },

  // Reefs list
  reefs: MOCK_REEFS,
  setReefs: (data) => set({ reefs: data }),

  // Halftone Dot Overlay Toggle
  halftoneEnabled: true,
  toggleHalftone: () => set((state) => ({ halftoneEnabled: !state.halftoneEnabled })),

  // Sound FX toggle
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Story Mode Active Chapter
  activeStoryChapter: 1,
  setStoryChapter: (ch) => set({ activeStoryChapter: ch }),
  isStoryModalOpen: false,
  openStoryModal: () => set({ isStoryModalOpen: true }),
  closeStoryModal: () => set({ isStoryModalOpen: false }),

  // Auth State
  user: null,
  token: null,
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setUserAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),

  // Volunteer Modal State
  isVolunteerModalOpen: false,
  openVolunteerModal: () => set({ isVolunteerModalOpen: true }),
  closeVolunteerModal: () => set({ isVolunteerModalOpen: false }),
}));
