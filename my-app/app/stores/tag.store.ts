import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ImageType } from '../models/image.model';
import { splitAndCapitalize, toPascalCase } from '../utils/functions';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
	tags: string[];
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
	setTags: (images: ImageType[] | ImageType) => void;
	setAddNewTag: (tags: string | string[]) => void;
	deleteTag: (tagToRemove: string) => void;
	clearAll: () => void;
	updateTag: (newTag: string, currentTag: string) => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
	tags: [],
	setTags: (images: ImageType[] | ImageType) =>
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

	setAddNewTag: (tags: string | string[]) =>
		set((state) => {
			if (Array.isArray(tags)) {
				// Use includes method to check each tag
				const updatedTags = [...state.tags];
				tags.forEach((tag) => {
					if (!state.tags.includes(tag)) {
						updatedTags.push(tag);
					}
				});
				return { tags: updatedTags };
			} else {
				// Single tag - add its tag if not already present
				const newTag = tags;
				if (!state.tags.includes(newTag)) {
					return { tags: [...state.tags, newTag] };
				}
				return state;
			}
		}),

	deleteTag: (tagToRemove: string) =>
		set((state) => ({
			// It keeps all tags that are not the tag to remove
			tags: state.tags.filter((tag) => tag !== tagToRemove),
		})),

	clearAll: () => set({ tags: [] }),

	updateTag: (newTag: string, currentTag: string) =>
		set((state) => {
			const updatedTags = [...state.tags];
			const indexOldTag = state.tags.indexOf(currentTag);
			if (indexOldTag !== -1) {
				updatedTags[indexOldTag] = newTag;
				return { tags: updatedTags };
			}
			return state;
		}),
});

// Finally, create the Zustand store and export it for use in your app
export const useTagStore = create<State & Actions>()(devtools(storeAPI));
