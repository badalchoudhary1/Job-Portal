// import { createStore } from "zustand";
// import { persist } from "zustand/middleware";

// const useStore = createStore(
//   persist(
//     (set) => ({
//         isLoading: 0,
//         setIsloading: () => set((state) => ({ count: state.count + 1 })),
//       count: 0,
//       increment: () => set((state) => ({ count: state.count + 1 })),
//     }),
//     { name: "app-state" } // Persist in localStorage
//   )
// );

// // Access state and actions
// const AppStore = useStore();
// export default AppStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create the zustand store
const useStore = create(
  persist(
    (set) => ({
      count: 0,
      isLoading: 0,
      setIsLoading: () => set((state) => ({ isLoading: state.isLoading + 1 })),
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "app-state" } // Persist in localStorage
  )
);

export default useStore;
