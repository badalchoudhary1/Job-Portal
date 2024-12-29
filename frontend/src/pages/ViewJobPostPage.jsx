


// src/pages/ViewJobPostPage.jsx
import ViewJobPost from "../components/ViewJobPost";
import useStore from "../store";

function ViewJobPostPage() {
  const {increment, count} = useStore();

  return (
    <>
      <button
        onClick={increment}
      >
        {count}
      </button>
      <ViewJobPost />
    </>
  );
}

export default ViewJobPostPage;

