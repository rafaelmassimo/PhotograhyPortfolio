import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
    FullScreenImage: string;
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
    setFullScreenImage: (url: string)=> void;
    clearAll: () => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
    FullScreenImage: '',

    setFullScreenImage: (url: string) => set({ FullScreenImage: url }),

    clearAll: () => set({ FullScreenImage: '' }),
});

// Finally, create the Zustand store and export it for use in your app
export const useFullScreenImage = create<State & Actions>()(devtools((storeAPI)));