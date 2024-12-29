import { animate } from '@motionone/dom';
import { useEffect, useState } from 'react';

const initStories = [
  { name: "John Doe", job: "Software Engineer", company: "Tech Corp", story: "I found my dream job within two weeks of using this portal!" },
  { name: "Jane Smith", job: "Marketing Manager", company: "Creative Solutions", story: "The job application process was simple and easy to follow." },
  { name: "Emily Johnson", job: "UX Designer", company: "Design Studios", story: "I got hired by my favorite company through this portal." },
  { name: "Michael Lee", job: "Project Manager", company: "BuildIt", story: "The support team guided me through every step." },
  { name: "Sarah Connor", job: "AI Engineer", company: "Cyberdyne Systems", story: "This portal connected me with cutting-edge AI projects." },
  { name: "Raj Patel", job: "Data Scientist", company: "AnalyticsHub", story: "I landed my first job in data science here." },
  { name: "Alice Brown", job: "Product Manager", company: "NextGen Solutions", story: "The job board helped me switch careers successfully." },
  { name: "Kevin Hart", job: "Full Stack Developer", company: "InnovateTech", story: "Great platform for tech job seekers." },
  { name: "Raj Patel", job: "Data Scientist", company: "AnalyticsHub", story: "I landed my first job in data science here." },
  { name: "Alice Brown", job: "Product Manager", company: "NextGen Solutions", story: "The job board helped me switch careers successfully." },
  { name: "Kevin Hart", job: "Full Stack Developer", company: "InnovateTech", story: "Great platform for tech job seekers." },
  { name: "Raj Patel", job: "Data Scientist", company: "AnalyticsHub", story: "I landed my first job in data science here." },
  { name: "Alice Brown", job: "Product Manager", company: "NextGen Solutions", story: "The job board helped me switch careers successfully." },
  { name: "Kevin Hart", job: "Full Stack Developer", company: "InnovateTech", story: "Great platform for tech job seekers." },
];

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState(initStories);
  const [filterText, setFilterText] = useState('');
  const [sorted, setSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredStories = () => {
    return stories.filter(story =>
      story.name.toLowerCase().includes(filterText.toLowerCase()) ||
      story.company.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const paginatedStories = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredStories().slice(start, end);
  };

  const nextPage = () => {
    if ((currentPage * itemsPerPage) < filteredStories().length) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSort = () => {
    const sortedStories = [...stories].sort((a, b) => {
      return sorted ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setStories(sortedStories);
    setSorted(!sorted);
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.story-card');
    elements.forEach((el, index) => {
      animate(el, { opacity: 1, y: 0 }, { duration: 0.5, delay: index * 0.1 });
    });
  }, [stories]); // Depend on stories to trigger animation after sorting/filtering

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Success Stories</h1>
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or company..."
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-indigo-500"
          onInput={(e) => setFilterText(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          onClick={toggleSort}
        >
          Sort by Name {sorted ? '(A-Z)' : '(Z-A)'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStories()?.map((story, index) => (
          <div
            key={index}
            className="story-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ opacity: 0, transform: 'translateY(20px)' }} // Initial state for animation
          >
            <h3 className="text-2xl font-semibold text-gray-900">{story.name}</h3>
            <p className="text-indigo-600 font-medium mt-1">{story.job} at {story.company}</p>
            <p className="text-gray-700 mt-3">{story.story}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 flex justify-center gap-4">
        {currentPage > 1 && (
          <button onClick={prevPage} className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Previous Page
          </button>
        )}
        <button
          onClick={nextPage}
          disabled={(currentPage * itemsPerPage) >= filteredStories().length}
          className={`px-6 py-3 rounded-md ${((currentPage * itemsPerPage) >= filteredStories().length) ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
