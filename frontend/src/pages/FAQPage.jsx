
// // src/pages/FAQPage.jsx
// import { createSignal } from 'solid-js';

// const FAQPage = () => {
//   const [faqData] = createSignal([
//     { question: "How do I apply for a job?", answer: "Click on the 'Apply Now' button on the job posting page." },
//     { question: "Can I update my resume?", answer: "Yes, you can update your resume in your profile section." },
//     { question: "How do I reset my password?", answer: "Go to the login page and click on 'Forgot Password'." },
//     { question: "How do I receive job alerts?", answer: "Enable job alerts from the settings in your profile and select the types of jobs you're interested in." },
//     { question: "Can I apply for multiple jobs at once?", answer: "No, you need to apply for each job individually to ensure your application is tailored to each position." },
//     { question: "How long does it take to hear back after applying?", answer: "Most companies respond within 1-2 weeks, but this can vary by employer." },
//     { question: "Is there a way to track my application status?", answer: "Yes, you can view your application status in the 'My Applications' section of your profile." },
//     { question: "How do I delete my account?", answer: "To delete your account, go to your account settings and select 'Delete Account'. Note that this action is irreversible." },
//     { question: "Can I edit a job application after submission?", answer: "No, once an application is submitted, it cannot be edited. Ensure all details are correct before submitting." },
//     { question: "How do I contact support?", answer: "Visit the 'Contact Us' page or email our support team at support@jobportal.com." },
//     { question: "What file formats are accepted for resumes?", answer: "We accept .pdf, .doc, and .docx formats for resumes." },
//     { question: "Can I save jobs to apply later?", answer: "Yes, you can save jobs by clicking the 'Save' button on the job listing." },
//     { question: "Is there a mobile app for the portal?", answer: "Yes, our mobile app is available on both iOS and Android platforms." },
//     { question: "How do I report a suspicious job posting?", answer: "Click the 'Report' button on the job listing and provide the necessary details." },
//     { question: "Do you offer career advice or resume building tips?", answer: "Yes, check out our blog section for articles on career tips and resume building." }
//   ]);

//   return (
//     <div class="p-8 bg-gray-100 min-h-screen">
//       <h1 class="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h1>
//       <div class="space-y-6">
//         {faqData().map((item, index) => (
//           <div key={index} class="bg-white p-6 shadow-lg rounded-lg">
//             <h3 class="text-xl font-semibold text-gray-900">{item.question}</h3>
//             <p class="text-gray-700 mt-2">{item.answer}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQPage;


// src/pages/FAQPage.jsx
import { createSignal } from 'solid-js';
import { createEffect } from 'solid-js';

const FAQPage = () => {
  const [faqData] = createSignal([
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

 

  createEffect(() => {
    console.log("FAQ Page Loaded");
  });

  return (
    <div class="p-8 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 class="text-5xl font-extrabold text-center text-gray-800 mb-12">Frequently Asked Questions</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faqData().map((item, index) => (
          <div key={index} class="bg-white p-8 shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300">
            <h3 class="text-2xl font-semibold text-gray-900">{item.question}</h3>
            <p class="text-gray-700 mt-4 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
