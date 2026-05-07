import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import VisitorCounter from './components/VisitorCounter';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import TechStack from './components/TechStack';
import CostDashboard from './components/CostDashboard';
import SecurityHeaders from './components/SecurityHeaders';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

//test CI

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and payment integration.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team features.",
      tags: ["TypeScript", "Firebase", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Portfolio Analytics Dashboard",
      description: "Analytics dashboard for tracking portfolio performance with interactive charts.",
      tags: ["Next.js", "Chart.js", "API Integration"],
      link: "#"
    },
    {
      title: "Weather Forecast App",
      description: "Clean weather application with 7-day forecasts and location-based services.",
      tags: ["React", "Weather API", "Geolocation"],
      link: "#"
    },
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-3xl text-center">
          <VisitorCounter />

          <h1 className={`text-5xl md:text-6xl mb-6 mt-8 tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Hi, I'm <span className={`italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ethan Jackson</span>
          </h1>
          <p className={`text-xl leading-relaxed mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A creative developer passionate about building solutions to complex problems.
            I specialise in Web Services (AWS, OCI), Cloud Architecture, and Frontend Development.
          </p>

          {/* GitHub Source Button */}
          <a
            href="https://github.com/EthanJackson1/Personal-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View the Terraform Code on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Cloud Architecture Section */}
      <section className={`py-32 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className={`text-3xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Cloud Resume Challenge</h2>
            <p className={`leading-relaxed max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              This portfolio is built using the Cloud Resume Challenge architecture, demonstrating
              serverless AWS infrastructure, Infrastructure as Code (Terraform), and CI/CD automation.
            </p>
          </div>

          <ArchitectureDiagram />
          <TechStack />
          <CostDashboard />
          <SecurityHeaders />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>About</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm a full-stack developer with a passion for creating elegant solutions to complex problems.
                With expertise in modern web technologies, I focus on building applications that are both
                beautiful and performant.
              </p>
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                When I'm not coding, you can find me exploring new design trends, contributing to open source,
                or experimenting with emerging technologies.
              </p>
            </div>
            <div>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "PostgreSQL", "Git", "Figma"].map((skill) => (
                  <span key={skill} className={`px-4 py-2 border rounded-full text-sm ${
                    isDark
                      ? 'border-gray-800 text-gray-300'
                      : 'border-gray-300 text-gray-700'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-32 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Selected Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-32 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
          <div className="max-w-2xl">
            <p className={`leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through any of the platforms below.
            </p>
            <div className="flex gap-6">
              <a href="mailto:ethan,jackson-9@students.plymouth.ac.uk" className={`flex items-center gap-2 text-sm transition-colors ${
                isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}>
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a href="https://github.com/EthanJackson1" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm transition-colors ${
                isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}>
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ethan-jackson03/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm transition-colors ${
                isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}>
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className={`max-w-6xl mx-auto text-center text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
          © 2026 Ethan Jackson. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}