import { createContext, useContext } from 'react'
import { PostStore } from "./.."

// usePostStore hook for accessing mobX powered Post Store
const postStore = new PostStore();
const postStoreContext = createContext(postStore);
export const usePostStore = () => {
  return useContext(postStoreContext);
}

export default { usePostStore };