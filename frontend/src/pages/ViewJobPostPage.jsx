


// src/pages/ViewJobPostPage.jsx
import { createEffect } from "solid-js";
import ViewJobPost from "../components/ViewJobPost";
import useStore from "../store";

function ViewJobPostPage() {
  const store = useStore;

  // Reactive access to state
  createEffect(() => {
    console.log("Count changed:", store.getState().count);
  });

  return (
    <>
      <button
        onClick={() => {
          store.getState().increment();
        }}
      >
        {store.getState().count}
      </button>
      <ViewJobPost />
    </>
  );
}

export default ViewJobPostPage;

