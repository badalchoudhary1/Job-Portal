

// src/pages/BlogPage.jsx
import { createSignal } from 'solid-js';
import { createEffect } from 'solid-js';

// Sample data for blog posts
const blogData = [
  {
    title: "How to Ace a Job Interview",
    content: "Prepare by researching the company and practicing common interview questions. Confidence is key!",
    imageUrl: "/assets/images/interview.jpg", 
    tags: ["Career", "Interview", "Job Search"],
    publishedDate: "2024-12-10",
    author: "John Doe",
    comments: [
      { user: "Alice", content: "Great tips! I'll definitely use these." },
      { user: "Bob", content: "Very informative, thank you!" }
    ]
  },
  {
    title: "Top 5 Programming Languages to Learn in 2024",
    content: "Focus on languages like Python, JavaScript, and Rust for better career opportunities in the tech industry.",
    imageUrl: "/assets/images/programming.jpg", 
    tags: ["Programming", "Tech", "Languages"],
    publishedDate: "2024-11-22",
    author: "Jane Smith",
    comments: [
      { user: "Charlie", content: "I agree with the list. Python and JS are amazing!" }
    ]
  },
  {
    title: "Building an Impressive Resume",
    content: "Make sure to highlight your achievements and keep your resume concise. A good resume stands out.",
    imageUrl: "/assets/images/resume.jpg",
    tags: ["Resume", "Career", "Job Search"],
    publishedDate: "2024-11-15",
    author: "Mike Johnson",
    comments: [
      { user: "Diana", content: "I learned a lot from this, thanks!" },
      { user: "Emma", content: "Great advice on resume formatting!" }
    ]
  }
];

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = createSignal(blogData);

  // Pagination state
  const [currentPage, setCurrentPage] = createSignal(1);
  const postsPerPage = 2;
  
  // Calculating the displayed posts based on current page
  const displayedPosts = () => {
    const startIndex = (currentPage() - 1) * postsPerPage;
    return blogPosts().slice(startIndex, startIndex + postsPerPage);
  };

  const totalPages = () => Math.ceil(blogPosts().length / postsPerPage);

  // Handle pagination navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages()) {
      setCurrentPage(page);
    }
  };

  // Effect to reset page when the blog posts data changes
  createEffect(() => {
    setCurrentPage(1); // Reset to first page on data change
  });

  return (
    <div class="p-6 bg-gray-100">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">Blog</h1>

      <div class="flex">
        {/* Sidebar */}
        <div class="w-1/4 pr-6">
          <div class="bg-white p-4 shadow-md rounded-md">
            <h2 class="text-xl font-semibold mb-4">Categories</h2>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Career Tips</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Programming</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Job Search</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Resume Building</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div class="w-3/4">
          <div class="space-y-6">
            {displayedPosts().map((post, index) => (
              <div key={index} class="bg-white p-6 shadow-md rounded-md">
                <div class="mb-4">
                  
                  <img src={post.imageUrl} alt={post.title} class="w-full h-full object-cover rounded-md" style="width: 500px; height: 300px;" />
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p class="text-gray-500 text-sm mb-2">{`By ${post.author} on ${post.publishedDate}`}</p>
                <p class="text-gray-600">{post.content}</p>

                {/* Tags */}
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-700">Tags:</h4>
                  <ul class="flex space-x-2 mt-2">
                    {post.tags.map((tag, index) => (
                      <li key={index} class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{tag}</li>
                    ))}
                  </ul>
                </div>

                {/* Comments Section */}
                <div class="mt-6">
                  <h4 class="font-semibold text-gray-800 mb-2">Comments</h4>
                  <ul class="space-y-4">
                    {post.comments.map((comment, index) => (
                      <li key={index} class="bg-gray-50 p-4 rounded-md">
                        <p class="font-semibold text-gray-700">{comment.user}</p>
                        <p class="text-gray-600">{comment.content}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Comment Form (Optional) */}
                  <div class="mt-4">
                    <textarea
                      placeholder="Add a comment..."
                      class="w-full p-3 border border-gray-300 rounded-md"
                    />
                    <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div class="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage() - 1)}
              class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              disabled={currentPage() === 1}
            >
              Prev
            </button>
            <span class="text-lg font-semibold text-gray-800">{`Page ${currentPage()} of ${totalPages()}`}</span>
            <button
              onClick={() => handlePageChange(currentPage() + 1)}
              class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
              disabled={currentPage() === totalPages()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;