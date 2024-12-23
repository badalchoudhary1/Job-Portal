// src/pages/SuccessStoriesPage.jsx
import { createSignal, createEffect } from 'solid-js';
import { animate } from '@motionone/dom';

const SuccessStoriesPage = () => {
  const [stories, setStories] = createSignal([
    { name: "John Doe", job: "Software Engineer", company: "Tech Corp", story: "I found my dream job within two weeks of using this portal!" },
    { name: "Jane Smith", job: "Marketing Manager", company: "Creative Solutions", story: "The job application process was simple and easy to follow." },
    { name: "Emily Johnson", job: "UX Designer", company: "Design Studios", story: "I got hired by my favorite company through this portal." },
    { name: "Michael Lee", job: "Project Manager", company: "BuildIt", story: "The support team guided me through every step." },
    { name: "Sarah Connor", job: "AI Engineer", company: "Cyberdyne Systems", story: "This portal connected me with cutting-edge AI projects." },
    { name: "Raj Patel", job: "Data Scientist", company: "AnalyticsHub", story: "I landed my first job in data science here." },
    { name: "Alice Brown", job: "Product Manager", company: "NextGen Solutions", story: "The job board helped me switch careers successfully." },
    { name: "Kevin Hart", job: "Full Stack Developer", company: "InnovateTech", story: "Great platform for tech job seekers." },
    { name: "Samantha Green", job: "HR Specialist", company: "PeopleFirst", story: "The portal made job hunting seamless and stress-free." },
    { name: "Tom Hardy", job: "QA Engineer", company: "BugFree Inc.", story: "I quickly found a QA role that matched my skills." },
    { name: "Olivia White", job: "Graphic Designer", company: "Creativa", story: "This portal connected me to exciting design projects." },
    { name: "Daniel Craig", job: "Network Engineer", company: "NetSolutions", story: "I secured a network engineering role through this site." },
    { name: "Megan Fox", job: "Business Analyst", company: "Strategic Inc.", story: "I transitioned into business analysis thanks to this portal." },
    { name: "Chris Evans", job: "DevOps Engineer", company: "CloudOps", story: "My DevOps journey started with a job from this portal." },
    { name: "John Doe", job: "Software Engineer", company: "Tech Corp", story: "I found my dream job within two weeks of using this portal!" },
    { name: "Jane Smith", job: "Marketing Manager", company: "Creative Solutions", story: "The job application process was simple and easy to follow." },
    { name: "Emily Johnson", job: "UX Designer", company: "Design Studios", story: "I got hired by my favorite company through this portal." },
    { name: "Michael Lee", job: "Project Manager", company: "BuildIt", story: "The support team guided me through every step." },
    { name: "Sarah Connor", job: "AI Engineer", company: "Cyberdyne Systems", story: "This portal connected me with cutting-edge AI projects." },
    { name: "Raj Patel", job: "Data Scientist", company: "AnalyticsHub", story: "I landed my first job in data science here." },
    { name: "Alice Brown", job: "Product Manager", company: "NextGen Solutions", story: "The job board helped me switch careers successfully." },
    { name: "Kevin Hart", job: "Full Stack Developer", company: "InnovateTech", story: "Great platform for tech job seekers." },
    { name: "Samantha Green", job: "HR Specialist", company: "PeopleFirst", story: "The portal made job hunting seamless and stress-free." },
    { name: "Tom Hardy", job: "QA Engineer", company: "BugFree Inc.", story: "I quickly found a QA role that matched my skills." },
    { name: "Emma Thompson", job: "Content Strategist", company: "WordCraft", story: "Found my ideal content role in just a month!" },
    { name: "David Chen", job: "Cloud Architect", company: "CloudScale", story: "This platform helped me advance in cloud computing." },
    { name: "Linda Martinez", job: "Systems Analyst", company: "SysLogic", story: "Perfect match for my technical expertise." },
    { name: "Ryan Cooper", job: "Mobile Developer", company: "AppWorks", story: "Discovered great opportunities in mobile development." },
    { name: "Sofia Rodriguez", job: "Data Engineer", company: "DataFlow", story: "Connected with top data companies instantly." },
    { name: "James Wilson", job: "Security Expert", company: "SecureNet", story: "Found specialized cybersecurity positions easily." },
    { name: "Nina Patel", job: "Frontend Developer", company: "WebCraft", story: "Great platform for UI/UX opportunities." },
    { name: "Mark Zhang", job: "ML Engineer", company: "AICore", story: "Connected with cutting-edge ML projects." },
    { name: "Amanda Clark", job: "IT Consultant", company: "TechAdvise", story: "Found consulting opportunities quickly." },
    { name: "Hassan Ali", job: "Backend Developer", company: "ServerPro", story: "Perfect match for backend development." },
    { name: "Lisa Wong", job: "QA Lead", company: "TestMaster", story: "Advanced my testing career here." },
    { name: "Carlos Garcia", job: "DevOps Manager", company: "DeployFast", story: "Found my dream DevOps position." },
    { name: "Rachel Green", job: "UI Designer", company: "PixelPerfect", story: "Connected with creative design teams." },
    { name: "Alex Turner", job: "Blockchain Developer", company: "ChainTech", story: "Great for blockchain opportunities." },
    { name: "Maria Silva", job: "Scrum Master", company: "AgilePro", story: "Found the perfect agile team to lead." },
    { name: "Sean Murphy", job: "Database Admin", company: "DataCore", story: "Excellent database positions available." },
    { name: "Priya Sharma", job: "Technical Writer", company: "DocuTech", story: "Found my niche in technical writing." },
    { name: "Benjamin Lee", job: "Solution Architect", company: "ArchSoft", story: "Connected with enterprise projects." },
    { name: "Anna Kowalski", job: "Game Developer", company: "GameForge", story: "Perfect for game dev opportunities." },
    { name: "Mohammed Ahmed", job: "IoT Engineer", company: "ConnectedTech", story: "Found innovative IoT projects." },
    { name: "Julia Santos", job: "API Developer", company: "APITech", story: "Great platform for API development roles." },
    { name: "Derek Chang", job: "System Admin", company: "SysCore", story: "Found the perfect admin position." },
    { name: "Natalie White", job: "AR Developer", company: "RealityTech", story: "Connected with AR innovation teams." },
    { name: "Victor Mendez", job: "Network Admin", company: "NetCore", story: "Found great networking opportunities." },
    { name: "Sophia Anderson", job: "Cloud Security", company: "SecureCloud", story: "Advanced my security career here." },
    { name: "Ibrahim Khan", job: "Python Developer", company: "PythonPro", story: "Perfect match for Python development." },
    { name: "Laura Miller", job: "IT Project Lead", company: "ProjectFlow", story: "Found my leadership role quickly." },
    { name: "Tom Wilson", job: "React Developer", company: "ReactPro", story: "Great React opportunities available." },
    { name: "Elena Popov", job: "Data Architect", company: "DataDesign", story: "Found my ideal data architecture role." },
    { name: "Chris Morgan", job: "Linux Admin", company: "LinuxPro", story: "Perfect for system administration." }
  ]);

  const [filterText, setFilterText] = createSignal('');
  const [sorted, setSorted] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal(1);
  const itemsPerPage = 12;

  const filteredStories = () => {
    return stories().filter(story =>
      story.name.toLowerCase().includes(filterText().toLowerCase()) ||
      story.company.toLowerCase().includes(filterText().toLowerCase())
    );
  };

  const paginatedStories = () => {
    const start = (currentPage() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredStories().slice(start, end);
  };

  const nextPage = () => {
    if ((currentPage() * itemsPerPage) < filteredStories().length) {
      setCurrentPage(currentPage() + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage() > 1) {
      setCurrentPage(currentPage() - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSort = () => {
    const sortedStories = [...stories()].sort((a, b) => {
      return sorted() ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setStories([...sortedStories]);
    setSorted(!sorted());
  };

  createEffect(() => {
    const elements = document.querySelectorAll('.story-card');
    elements.forEach((el, index) => {
      animate(el, { opacity: 1, y: 0 }, { duration: 0.5, delay: index * 0.1 });
    });
  });

  return (
    <div class="p-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Success Stories</h1>
      <div class="flex justify-center gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name or company..." 
          class="p-3 border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-indigo-500"
          onInput={(e) => setFilterText(e.target.value)}
        />
        <button 
          class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          onClick={toggleSort}
        >
          Sort by Name {sorted() ? '(A-Z)' : '(Z-A)'}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStories().map((story, index) => (
          <div 
            ref={(el) => animate(el, { opacity: 0, y: 20 })} 
            key={index} 
            class="story-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 class="text-2xl font-semibold text-gray-900">{story.name}</h3>
            <p class="text-indigo-600 font-medium mt-1">{story.job} at {story.company}</p>
            <p class="text-gray-700 mt-3">{story.story}</p>
          </div>
        ))}
      </div>

      <div class="text-center mt-10 flex justify-center gap-4">
        {currentPage() > 1 && (
          <button onClick={prevPage} class="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600">Previous Page</button>
        )}
       <button 
  onClick={nextPage} 
  disabled={(currentPage() * itemsPerPage) >= filteredStories().length}
  class={`px-6 py-3 rounded-md ${((currentPage() * itemsPerPage) >= filteredStories().length) ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
>
  Next Page
</button>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;


