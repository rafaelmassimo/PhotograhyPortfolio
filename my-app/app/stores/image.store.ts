import { create, type StateCreator } from 'zustand';
import { ImageType } from '../models/image.model';
import { devtools } from 'zustand/middleware';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
	images: ImageType[];
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
	setImages: (value: ImageType[] | ImageType) => void;
	deleImage: (id: string) => void;
	clearAll: () => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
	images: [],
	setImages: (value: ImageType[] | ImageType) =>
		set({ images: Array.isArray(value) ? value : [value] }),

	// When I'm creating the state with the images, I'm creating an array of objects so in order to remove it I can do the same logic as I would do in a
	deleImage: (id: string) =>
		set((state) => ({
			images: state.images.filter((image) => image._id?.toString() !== id),
		})),

	clearAll: () => set({ images: [] }),
});

// Finally, create the Zustand store and export it for use in your app
export const useImageStore = create<State & Actions>()(devtools(storeAPI));
