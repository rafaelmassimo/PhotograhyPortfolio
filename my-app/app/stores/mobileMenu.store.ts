import { create, type StateCreator } from 'zustand';
import { ImageType } from '../models/image.model';
import { devtools } from 'zustand/middleware';
import { MdMenuOpen } from 'react-icons/md';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
	menuOpened: boolean;
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
	setOpenOrClose: (value: boolean) => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
	menuOpened: false,
	setOpenOrClose: (value: boolean) => set({ menuOpened: value }),
});

// Finally, create the Zustand store and export it for use in your app
export const useMobileMenu = create<State & Actions>()(devtools(storeAPI));
