import CompareJobs from "../components/CompareJobs/CompareJobs";

const mockJobs = [
  { 
    id: 1, 
    title: "Frontend Developer", 
    company: "Company A", 
    salary: "$70,000", 
    location: "Remote", 
    type: "Full-Time", 
    postedDate: "2024-12-01", 
    applicationLink: "https://example.com/apply1"
  },
  { 
    id: 2, 
    title: "Backend Developer", 
    company: "Company B", 
    salary: "$80,000", 
    location: "On-site", 
    type: "Full-Time", 
    postedDate: "2024-12-02", 
    applicationLink: "https://example.com/apply2"
  },
  { 
    id: 3, 
    title: "Full Stack Developer", 
    company: "Company C", 
    salary: "$90,000", 
    location: "Hybrid", 
    type: "Contract", 
    postedDate: "2024-12-05", 
    applicationLink: "https://example.com/apply3"
  },
];

const CompareJobsPage = () => {
  console.log("Rendering CompareJobsPage...");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <CompareJobs jobs={mockJobs} />
    </div>
  );
};

export default CompareJobsPage;

