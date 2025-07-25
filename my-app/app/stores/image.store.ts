import { create, type StateCreator } from 'zustand';
import { ImageType } from '../models/image.model';

// First, define the shape of your state (the data you want to manage in this store)
interface State {
	images: ImageType[];
}

// Then, define the actions (functions) that will update or interact with that state
interface Actions {
	setImages: (value: ImageType[] | ImageType) => void;
    deleImage: (id: string) => void;
}

// Here, you define how the store behaves (initial state and the logic of each action)
const storeAPI: StateCreator<State & Actions> = (set) => ({
	images: [],
	setImages: (value: ImageType[] | ImageType) =>
		set({ images: Array.isArray(value) ? value : [value] }),

    deleImage: (id:string) => 
        set((state) => ({
            images: state.images.filter((image)=> image.id?.toString() !== id),
        }))
});

// Finally, create the Zustand store and export it for use in your app
export const useImageStore = create<State & Actions>()(storeAPI);