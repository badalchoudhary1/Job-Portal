import { useState, useEffect } from "react";
import defaultImage from "../../assets/images/blog_default.webp";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Fetch blogs from Dev.to API
  useEffect(() => {
    fetch(`https://dev.to/api/articles?tag=career&per_page=${blogsPerPage}&page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [currentPage]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Latest Job & Tech Blogs</h1>

      {/* Blog List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            <img
              src={blog.cover_image || defaultImage}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
            <p className="text-sm text-gray-500 mb-2">By {blog.user.name} | {new Date(blog.published_at).toDateString()}</p>
            
            {/* Blog Content with "Read More" Toggle */}
            <p className="text-gray-600">
              {expanded === index ? (
                <>
                  {blog.description.slice(0,300)}
                  <button
                    onClick={() => setExpanded(null)}
                    className="text-blue-600 mt-2 block"
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  {blog.description.slice(0, 50)}...
                  <button
                    onClick={() => setExpanded(index)}
                    className="text-blue-600 ml-1"
                  >
                    Read More
                  </button>
                </>
              )}
            </p>
            
            {/* View Full Blog Link */}
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold block mt-2"
            >
              View Full Blog ↗
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={currentPage === 1}
        >
          ⬅️ Prev
        </button>
        <span className="text-lg font-semibold">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default BlogList;
