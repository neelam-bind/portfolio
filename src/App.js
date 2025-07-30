import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Code, Layers, Wrench, Lightbulb, Award } from 'lucide-react'; // Changed 'Tool' to 'Wrench'

// Define custom CSS for animations within the component for direct application
const customAnimations = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap'); /* For typing effect */

  body {
    font-family: 'Inter', sans-serif;
  }

  /* Keyframes for existing animations */
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(60, 150, 250, 0.5); }
    50% { opacity: 0.8; text-shadow: 0 0 15px rgba(60, 150, 250, 0.9); }
  }

  @keyframes slide-in-left {
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes neon-glow {
    0%, 100% { text-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff, 0 0 15px #00bfff, 0 0 20px #00bfff; }
    50% { text-shadow: 0 0 10px #00bfff, 0 0 20px #00bfff, 0 0 30px #00bfff, 0 0 40px #00bfff; }
  }

  .shimmer-button {
    background: linear-gradient(90deg, #1f2937 0%, #3b82f6 50%, #1f2937 100%);
    background-size: 200% 100%;
    transition: background-position 0.4s ease-in-out;
  }
  .shimmer-button:hover {
    background-position: -100% 0;
  }

  /* Particle animation for home section */
  .particle {
    position: absolute;
    background-color: rgba(60, 150, 250, 0.5); /* Blue particles */
    border-radius: 50%;
    animation: float-and-fade linear infinite;
  }

  @keyframes float-and-fade {
    0% {
      transform: translateY(0) translateX(0) scale(0);
      opacity: 0;
    }
    20% {
      opacity: 1;
      transform: translateY(-20%) translateX(10%) scale(0.5);
    }
    80% {
      opacity: 0.5;
      transform: translateY(-80%) translateX(-10%) scale(0.8);
    }
    100% {
      transform: translateY(-100%) translateX(0) scale(1);
      opacity: 0;
    }
  }

  /* Typing cursor blink effect */
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #00bfff; }
  }

  /* Code lines animation */
  @keyframes code-line-fade {
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 0.1; }
  }

  /* New: Section Border Pulse */
  @keyframes border-pulse {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  }
  .animate-border-pulse {
    animation: border-pulse 4s infinite cubic-bezier(0.4, 0, 0.6, 1);
  }
`;

// Typewriter component for the typing effect
const Typewriter = ({ text, delay, infinite, className = '' }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (infinite) {
      // Optional: restart typing for an infinite loop
      // setCurrentIndex(0);
      // setCurrentText('');
    }
  }, [currentIndex, delay, infinite, text]);

  return (
    <span className={`font-fira-code ${className}`}>
      {currentText}
      <span className="inline-block w-2 h-full ml-1 bg-blue-400 align-bottom animate-blink-caret"></span>
    </span>
  );
};

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Determine the active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'];
      let currentActive = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider a section active if its top is within 50% of the viewport height
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = sections[i];
            break;
          }
        }
      }
      setActiveSection(currentActive);

      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId); // Update active section for highlighting
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-blue-100 font-inter">
      {/* Side Navigation Bar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between rounded-r-lg shadow-lg fixed h-full z-10 border-r border-blue-700">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-400 mb-8 tracking-wide animate-pulse-slow">Neelam Bind</h1>
          <nav>
            <ul>
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Achievements', 'Contact'].map((item) => (
                <li key={item} className="mb-4">
                  <button
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className={`relative block w-full text-left py-2 px-4 rounded-md transition-all duration-300 ease-in-out group
                      ${activeSection === item.toLowerCase() ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'hover:bg-gray-700 hover:text-blue-300 hover:translate-x-1'}`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <span className="absolute inset-y-0 right-0 w-1 bg-blue-300 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Social media links in sidebar (Keeping only GitHub for consistency with Home section) */}
        <div className="mt-8">
          <a
            href="https://github.com/neelam-bind"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
          >
            <Github className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg">GitHub</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto relative">
        {/* Render all sections on a single page */}
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 z-50"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

// Home Section
const Home = () => {
  // Generate a fixed number of particles
  const particles = Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        width: `${Math.random() * 5 + 2}px`,
        height: `${Math.random() * 5 + 2}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 15 + 5}s`,
      }}
    ></div>
  ));

  // Generate background code lines for a tech aesthetic
  const codeLines = Array.from({ length: 20 }).map((_, i) => (
    <div
      key={`code-${i}`}
      className="absolute text-xs text-blue-500 opacity-10 whitespace-nowrap animate-code-line-fade"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        transform: `translateX(-${Math.random() * 50}%)`, // Random starting position
      }}
    >
      {`const data = { id: ${i}, value: ${Math.random().toFixed(2)} };`}
    </div>
  ));

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-70 z-0 animate-gradient-shift"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles}
        {codeLines} {/* Add animated code lines */}
      </div>
      <div className="relative z-10">
        <h2 className="text-7xl font-extrabold text-blue-500 mb-6 animate-fade-in-up">
          <Typewriter
            text="Hi, I'm Neelam Bind"
            delay={100} // Adjust typing speed
            infinite={false}
            className="drop-shadow-lg animate-neon-glow" // Apply neon glow to the typing text
          />
        </h2>
        <p className="text-3xl text-gray-300 mb-10 animate-fade-in-up delay-200 leading-tight max-w-3xl">
          A passionate AI & ML undergraduate, crafting scalable and privacy-focused solutions.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-400">
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="shimmer-button bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-blue-700 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Explore My Work
          </button>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="shimmer-button bg-gray-700 text-blue-300 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-gray-700 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Get in Touch
          </button>
        </div>

        {/* New: Social Media Buttons */}
        <div className="mt-12 flex justify-center space-x-6 animate-fade-in-up delay-600">
          <a
            href="https://www.linkedin.com/in/neelam-bind/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transform hover:scale-125 transition-transform duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-10 h-10" />
          </a>
          <a
            href="https://github.com/neelam-bind"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transform hover:scale-125 transition-transform duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="w-10 h-10" />
          </a>
          <a
            href="https://leetcode.com/u/neelam_bind/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transform hover:scale-125 transition-transform duration-300"
            aria-label="LeetCode Profile"
          >
            {/* LeetCode SVG Icon - Using a custom SVG as Lucide does not have a direct LeetCode icon */}
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M13.483 0a1.234 1.234 0 0 0-.946.335L7.005 5.867l-.001.002-.002.002a.777.777 0 0 0-.256.577c0 .21.08.41.256.577l5.532 5.532a1.234 1.234 0 0 0 .946.335h.001a1.234 1.234 0 0 0 .946-.335l5.532-5.532a.777.777 0 0 0 .256-.577c0-.21-.08-.41-.256-.577L14.43 2.053a1.234 1.234 0 0 0-.947-.335zM12 14.47l-5.532-5.532a.777.777 0 0 0-.256-.577c0-.21.08-.41.256-.577l5.532-5.532a1.234 1.234 0 0 0 .946-.335h.001a1.234 1.234 0 0 0 .946.335l5.532 5.532a.777.777 0 0 0 .256.577c0 .21-.08.41-.256.577L12 14.47zM12 17.513l-5.532-5.532a.777.777 0 0 0-.256-.577c0-.21.08-.41.256-.577l5.532-5.532a1.234 1.234 0 0 0 .946-.335h.001a1.234 1.234 0 0 0 .946.335l5.532 5.532a.777.777 0 0 0 .256.577c0 .21-.08.41-.256.577L12 17.513zM12 20.556l-5.532-5.532a.777.777 0 0 0-.256-.577c0-.21.08-.41.256-.577l5.532-5.532a1.234 1.234 0 0 0 .946-.335h.001a1.234 1.234 0 0 0 .946.335l5.532 5.532a.777.777 0 0 0 .256.577c0 .21-.08.41-.256.577L12 20.556z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => (
  <section id="about" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">About Me</h2>
    <p className="text-lg text-gray-300 leading-relaxed mb-4 animate-fade-in delay-100">
      I am a third-year AI & ML undergraduate with a solid foundation in machine learning, full-stack development, and research-driven projects such as federated learning and sentiment analysis. I am enthusiastic about creating scalable, privacy-focused solutions to address real-world challenges. My skills span across various programming languages, frameworks, and tools, enabling me to tackle complex problems and deliver robust solutions.
    </p>
    <p className="text-lg text-gray-300 leading-relaxed animate-fade-in delay-200">
      I thrive in dynamic environments and am always eager to learn new technologies and apply them to impactful projects. My academic background and practical experience have equipped me with a strong analytical mindset and problem-solving abilities. I am committed to continuous learning and contributing to innovative solutions in the tech world.
    </p>
  </section>
);

// Experience Section
const Experience = () => (
  <section id="experience" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Work Experience</h2>
    <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Intel Unnati Industrial Training</h3>
      <p className="text-gray-400 text-sm mb-2">May 2024 - July 2024</p>
      <p className="text-lg text-gray-300 mt-2 font-medium">Sentiment Analysis of Intel Product Reviews:</p>
      <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
        <li>Developed a sentiment analysis model using VADER for classification and GloVe for word embeddings.</li>
        <li>Implemented sentiment classification, seasonal trend analysis, and product improvement recommendations.</li>
        <li><span className="font-semibold text-blue-200">Tech Stack:</span> Python, Pandas, Scikit-learn, APIs for web scraping.</li>
      </ul>
    </div>
  </section>
);

// Projects Section
const Projects = () => (
  <section id="projects" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Projects</h2>

    {/* Project Card: LeetLab (formerly Online Code Judge Platform) */}
    <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">LeetLab (Online Code Judge Platform)</h3>
      <p className="text-gray-400 text-sm mb-4">
        <span className="font-semibold text-blue-200">Tech Stack:</span> React.js, Node.js, Express.js, PostgreSQL, Judge0, AWS EC2, Render, NeonDB, Vercel
      </p>
      <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
        <li>Engineered a full-stack online coding platform that enables users to solve algorithmic problems, submit code for live evaluation, and track progress over time.</li>
        <li>Integrated a self-hosted Judge0 engine on AWS EC2 to support multi-language code execution with real-time feedback.</li>
        <li>Implemented Role-Based Access Control (RBAC) allowing admins to manage problems and test cases, and users to create custom playlists and track their submissions.</li>
        <li>Deployed the backend using Render, frontend on Vercel, and PostgreSQL database on NeonDB, ensuring reliable cross-service communication.</li>
        <li>Developed a feature-rich admin dashboard for managing problem statements, test cases, hints, and expected outputs.</li>
      </ul>
      <div className="mt-6 flex space-x-4">
        <a
          href="https://leetlab-frontend-ten.vercel.app/" // Updated Deploy Link
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-blue-600 text-white font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          View Live
        </a>
        <a
          href="https://github.com/neelam-bind/leetlab_frontend" // Updated GitHub Link
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-gray-600 text-blue-200 font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          View Code
        </a>
      </div>
    </div>

    {/* Project Card: AI-Powered Interview Prep */}
    <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">AI-Powered Interview Prep</h3>
      <p className="text-gray-400 text-sm mb-4">
        <span className="font-semibold text-blue-200">Tech Stack:</span> Next.js, Firebase, TailwindCSS, Vapi
      </p>
      <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
        <li>Implemented backend logic with Next.js API routes to handle dynamic AI prompts and generate interview questions based on user input.</li>
        <li>Integrated Firebase Authentication for secure login and account management, with Firestore as the real-time database for storing session data and user progress.</li>
        <li>Leveraged Vapi's voice AI agents to simulate realistic, spoken interview conversations, helping users practice communication skills interactively.</li>
      </ul>
      <div className="mt-6 flex space-x-4">
        <a
          href="https://ai-mock-interviews-mu.vercel.app/" // Updated Deploy Link
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-blue-600 text-white font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          View Live
        </a>
        <a
          href="https://github.com/neelam-bind/ai_mock_interviews" // Updated GitHub Link
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-gray-600 text-blue-200 font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          View Code
        </a>
      </div>
    </div>

    {/* Project Card: Seizure Prediction Using EEG and Deep Learning */}
    <div className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">Seizure Prediction Using EEG and Deep Learning</h3>
      <p className="text-gray-400 text-sm mb-4">
        <span className="font-semibold text-blue-200">Tech Stack:</span> PyTorch, PyTorch Geometric, MNE, CHB-MIT EEG dataset, ConvLSTM, P3D-CNN, GCN
      </p>
      <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
        <li>Developed an early seizure prediction system using EEG time-series signals and deep learning models for proactive neurofeedback intervention.</li>
        <li>Implemented ConvLSTM2D and P3D-CNN architectures to capture temporal and spatial features from preprocessed EEG segments.</li>
        <li>Integrated a Graph Convolutional Network (GCN) using PyTorch Geometric to model inter-electrode dependencies and improve prediction accuracy.</li>
        <li>Used MNE for artifact removal, bandpass filtering, and channel standardization on the CHB-MIT pediatric dataset.</li>
      </ul>
      <div className="mt-6 flex space-x-4">
        {/* Conditional rendering: Only show View Live button if a deploy link exists */}
        {/* For Seizure Prediction, there is no deploy link, so this button will not render */}
        {/* <a
          href="#" // No deploy link provided, so this button is removed
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-blue-600 text-white font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          View Live
        </a> */}
        <a
          href="https://github.com/swara063/SeizurePrediction_Neurofeedback" // Updated GitHub Link
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-button bg-gray-600 text-blue-200 font-bold py-2 px-5 rounded-full text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          View Code
        </a>
      </div>
    </div>
  </section>
);

// Skills Section
const Skills = () => (
  <section id="skills" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Languages */}
      <div className="bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500 group">
        <h3 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors duration-300 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-400" /> Languages
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li className="hover:text-blue-200 transition-colors duration-200">C++</li>
          <li className="hover:text-blue-200 transition-colors duration-200">C</li>
          <li className="hover:text-blue-200 transition-colors duration-200">Python</li>
          <li className="hover:text-blue-200 transition-colors duration-200">JavaScript</li>
        </ul>
      </div>
      {/* Frameworks */}
      <div className="bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500 group">
        <h3 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors duration-300 flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-400" /> Frameworks
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li className="hover:text-blue-200 transition-colors duration-200">Node.js</li>
          <li className="hover:text-blue-200 transition-colors duration-200">React</li>
          <li className="hover:text-blue-200 transition-colors duration-200">Next.js</li>
          <li className="hover:text-blue-200 transition-colors duration-200">Tailwind CSS</li>
        </ul>
      </div>
      {/* Tools */}
      <div className="bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500 group">
        <h3 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors duration-300 flex items-center">
          <Wrench className="w-5 h-5 mr-2 text-blue-400" /> Tools
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li className="hover:text-blue-200 transition-colors duration-200">Git</li>
          <li className="hover:text-blue-200 transition-colors duration-200">MongoDB</li>
          <li className="hover:text-blue-200 transition-colors duration-200">MySQL</li>
          <li className="hover:text-blue-200 transition-colors duration-200">Firebase</li>
        </ul>
      </div>
      {/* Concepts */}
      <div className="bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-700 hover:border-blue-500 group">
        <h3 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors duration-300 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-blue-400" /> Concepts
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li className="hover:text-blue-200 transition-colors duration-200">Machine Learning</li>
          <li className="hover:text-blue-200 transition-colors duration-200">Operating Systems</li>
          <li className="hover:text-blue-200 transition-colors duration-200">OOPS</li>
        </ul>
      </div>
    </div>
  </section>
);

// Education Section
const Education = () => (
  <section id="education" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Education</h2>
    <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">B.E. in Artificial Intelligence and Machine Learning</h3>
      <p className="text-gray-400 text-sm mb-2">MS Ramaiah Institute of Technology, Bengaluru, India (2022-2026)</p>
      <p className="text-lg text-gray-300 mt-2">CGPA: <span className="font-semibold text-blue-200">9.39</span></p>
    </div>
    <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Senior Secondary (CBSE) - 12th</h3>
      <p className="text-gray-400 text-sm mb-2">Kendriya Vidyalaya AFS Jalahalli (East), Bangalore (2021-2022)</p>
      <p className="text-lg text-gray-300 mt-2">Aggregate: <span className="font-semibold text-blue-200">93.8%</span></p>
    </div>
    <div className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-blue-500 border border-gray-700 group">
      <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Secondary (CBSE) - 10th</h3>
      <p className="text-gray-400 text-sm mb-2">Kendriya Vidyalaya AFS Kasauli, Solan (2019-2020)</p>
      <p className="text-lg text-gray-300 mt-2">Aggregate: <span className="font-semibold text-blue-200">94.4%</span></p>
    </div>
  </section>
);

// Achievements Section
const Achievements = () => (
  <section id="achievements" className="p-8 bg-gray-800 rounded-lg shadow-xl mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Achievements</h2>
    <ul className="list-disc list-inside text-gray-300 text-lg ml-4 space-y-2">
      <li className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 transform hover:translate-x-1 hover:text-blue-200 flex items-center">
        <Award className="w-5 h-5 mr-2 text-blue-400" /> Selected as Pre-finalist team (top 7) out of 2000 in the <span className="font-semibold text-blue-200 ml-1">Unisys Innovation Program</span>
      </li>
      <li className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 transform hover:translate-x-1 hover:text-blue-200 flex items-center">
        <Award className="w-5 h-5 mr-2 text-blue-400" /> Selected for <span className="font-semibold text-blue-200 ml-1">Intel Unnati Industrial Training 2024</span>
      </li>
      <li className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 transform hover:translate-x-1 hover:text-blue-200 flex items-center">
        <Award className="w-5 h-5 mr-2 text-blue-400" /> Selected for <span className="font-semibold text-blue-200 ml-1">Argonyx's 2024 Hackathon Round 2</span>
      </li>
    </ul>
  </section>
);

// Contact Section
const Contact = () => (
  <section id="contact" className="p-8 bg-gray-800 rounded-lg shadow-xl text-center mb-12 animate-fade-in border border-blue-800 animate-border-pulse">
    <h2 className="text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-2 animate-slide-in-left">Contact Me</h2>
    <p className="text-lg text-gray-300 mb-8">Feel free to reach out to me via email or phone. I'm always open to new opportunities and collaborations!</p>
    <div className="flex flex-col items-center space-y-6">
      <a
        href="mailto:neelambind2004@gmail.com"
        className="text-blue-300 hover:text-blue-400 text-xl flex items-center transition-colors duration-300 group"
      >
        <svg
          className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
          />
          <path
            d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
          />
        </svg>
        <span className="text-2xl">neelambind2004@gmail.com</span>
      </a>
      <a
        href="tel:+917259742004"
        className="text-blue-300 hover:text-blue-400 text-xl flex items-center transition-colors duration-300 group"
      >
        <svg
          className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l1.3 9.137a1 1 0 01-.277.953l-1.559 1.559A15.902 15.902 0 0012.01 18.29a15.902 15.902 0 001.559-1.559 1 1 0 01.953-.277l9.137 1.3c.35.05.63.303.72.653L19 17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
          />
        </svg>
        <span className="text-2xl">+91-7259742004</span>
      </a>
    </div>
  </section>
);

export default App;
