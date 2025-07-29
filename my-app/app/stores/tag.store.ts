import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ImageType } from '../models/image.model';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
	tags: string[];
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
	setTag: (images: ImageType[] | ImageType) => void;
	deleTag: (id: string) => void;
	clearAll: () => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
	tags: [],
	setTag: (images: ImageType[] | ImageType) =>
		set((state) => {
			if (Array.isArray(images)) {
				// Extract unique tags from array of images
				const newTags = images.map((image) => image.tag);
				const uniqueTags = [...new Set([...state.tags, ...newTags])];
				return { tags: uniqueTags };
			} else {
				// Single image - add its tag if not already present
				const newTag = images.tag;
				if (!state.tags.includes(newTag)) {
					return { tags: [...state.tags, newTag] };
				}
				return state;
			}
		}),

	deleTag: (tagToRemove: string) =>
		set((state) => ({
			// It keeps all tags that are not the tag to remove
			tags: state.tags.filter((tag) => tag !== tagToRemove),
		})),

	clearAll: () => set({ tags: [] }),
});

// Finally, create the Zustand store and export it for use in your app
export const useTagStore = create<State & Actions>()(devtools(storeAPI));
