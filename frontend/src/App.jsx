import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ViewJobPostPage from './pages/ViewJobPostPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import EmployerProfilePage from "./pages/EmployerProfilePage";
import JobSeekerList from "./components/JobSeeker/JobSeekerList";
import JobSeekerForm from "./components/JobSeeker/JobSeekerForm";
import JobSeekerDetails from "./components/JobSeeker/JobSeekerDetails";
import CompareJobsPage from "./pages/CompareJobsPage";
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import JobDetailsPage from './pages/JobDetailsPage';
import EmployerProfilesPage from "./pages/EmployerProfilesPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import useStore from './store';

import "./config/axios"

const App = () => {
  const {token, user} = useStore()
  return (
      <main className="p-6">
      {token ? 
      <Layout>
        <Routes>
          {(user?.role === "employer" || user?.role === "job_seeker") && (
            <>
            <Route path="/" element={<ViewJobPostPage />} />
            <Route path="/" element={<ViewJobPostPage />} />
            <Route path="/view-job" element={<ViewJobPostPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/job-seekers" element={<JobSeekerList />} />
            <Route path="/job-seekers/:id" element={<JobSeekerDetails />} />
            <Route path="/compare-jobs" element={<CompareJobsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/profile" element={<Profile />} />
            </>
          )}

          {(user?.role === "employer") && (<>
                <Route path="/profile/employer" element={<EmployerProfilesPage />} />
                <Route path="/profile/employer/:id" element={<EmployerProfilePage />} />
          </>)}

          {(user?.role === "job_seeker") && (<>
            <Route path="/job-seekers/new" element={<JobSeekerForm />} />
          </>)}

   
          {/* <Route path="/profile/employer" element={<EmployerProfilesPage />} />
          <Route path="/profile/employer/:id" element={<EmployerProfilePage />} /> */}
          {/* <Route path="/job-seekers" element={<JobSeekerList />} />
          <Route path="/job-seekers/new" element={<JobSeekerForm />} />
          <Route path="/job-seekers/:id" element={<JobSeekerDetails />} />
          <Route path="/compare-jobs" element={<CompareJobsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/profile" element={<Profile />} /> */}

          <Route path="*" element={<div className='h-[200px] bg-gray-400'>Not Found</div>} />

         </Routes>
         </Layout>
             :
        <>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>

        </>
          }
      </main>
   
  );
};

export default App;
