import  {create} from 'zustand'
import { persist } from "zustand/middleware";

// Create the zustand store
const useStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (value) => set({ token: value }),
      user: null,
      setUser: (value) => set({ user: value }),
      isLoading: false,  // Set isLoading to boolean
      setIsLoading: (loading) => set({ isLoading: loading }), 
       // Set directly to a boolean
    }),
    { name: "job-portal" } // Persist in localStorage
  )
);
export default useStore;


