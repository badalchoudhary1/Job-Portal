// src/pages/FAQPage.jsx
import { useEffect, useState } from 'react';

const FAQPage = () => {
  const [faqData] = useState([
    { question: "How do I apply for a job?", answer: "Click on the 'Apply Now' button on the job posting page." },
    { question: "Can I update my resume?", answer: "Yes, you can update your resume in your profile section." },
    { question: "How do I reset my password?", answer: "Go to the login page and click on 'Forgot Password'." },
    { question: "How do I receive job alerts?", answer: "Enable job alerts from the settings in your profile and select the types of jobs you're interested in." },
    { question: "Can I apply for multiple jobs at once?", answer: "No, you need to apply for each job individually to ensure your application is tailored to each position." },
    { question: "How can I track my job applications?", answer: "You can track your applications from the 'Applications' section in your profile." },
    { question: "What should I do if I don't receive a response after applying?", answer: "Follow up with the employer after one to two weeks or check the job posting for specific timelines." },
    { question: "How can I delete my account?", answer: "Visit your profile settings and click on the 'Delete Account' option. You will receive a confirmation email." },
    { question: "Can I save job postings for later?", answer: "Yes, click on the 'Save Job' button to bookmark job postings for future reference." },
    { question: "Is there a mobile app available?", answer: "Yes, you can download our mobile app from the App Store or Google Play." },
    { question: "How do I contact support?", answer: "You can reach our support team via the 'Contact Us' page or email us at support@example.com." },
    { question: "Can I change my email address?", answer: "Yes, you can update your email address from the account settings section." },
    { question: "How do I know if my application was successful?", answer: "You will receive an email confirmation once your application is successfully submitted." },
    { question: "Can I delete a job from my saved list?", answer: "Yes, click the 'Remove' button next to the job in your saved jobs list." },
    { question: "How long do job postings stay active?", answer: "Job postings remain active for 30 days unless specified otherwise by the employer." }
  ]);

  useEffect(() => {
    console.log("FAQ Page Loaded");
  }, []);
  
  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white p-8 shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-900">{item.question}</h3>
            <p className="text-gray-700 mt-4 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
