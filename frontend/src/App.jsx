
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
import ProtectedRoute from "./components/ProtectedRoute";

import { Router, Route } from "@solidjs/router";

const App = (props) => {
  return (
    <Layout>
      <main class="p-6">
        {props.children}
      </main>
    </Layout>
  );
};

export const Routes = () => (
 
  <Router root={App}>
    <Route path="/view-job" component={ViewJobPostPage} />
    <Route path="/about-us" component={AboutUsPage} />
    <Route path="/contact-us" component={ContactUsPage} />
    <Route path="/profile/employer" component={EmployerProfilesPage} />
    <Route path="/profile/employer/:id" component={EmployerProfilePage} />
    <Route path="/job-seekers" component={JobSeekerList} />
    <Route path="/job-seekers/new" component={JobSeekerForm} />
    <Route path="/job-seekers/:id" component={JobSeekerDetails} />
    <Route
      path="/compare-jobs"
      component={() => {
        console.log("Accessing CompareJobsPage...");
        return (
          <ProtectedRoute>
            <CompareJobsPage />
          </ProtectedRoute>
        );
      }}
    />
    <Route path="/faq" component={FAQPage} />
    <Route path="/blog" component={BlogPage} />
    <Route path="/success-stories" component={SuccessStoriesPage} />
    <Route path="/job/:id" component={JobDetailsPage} />
    <Route path="/" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/register" component={Register} />
  </Router>
);

export default App;

