import { Cloud, Database, Zap, Globe, GitBranch, Workflow, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function TechStack() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const technologies = [
    { name: 'AWS S3', icon: Cloud, category: 'Storage' },
    { name: 'CloudFront', icon: Globe, category: 'CDN' },
    { name: 'API Gateway', icon: Workflow, category: 'API' },
    { name: 'Lambda', icon: Zap, category: 'Compute' },
    { name: 'DynamoDB', icon: Database, category: 'Database' },
    { name: 'Terraform', icon: FileText, category: 'IaC' },
    { name: 'GitHub Actions', icon: GitBranch, category: 'CI/CD' },
  ];

  return (
    <div className={`border rounded-lg p-8 ${
      isDark
        ? 'border-gray-800 bg-gray-900/30'
        : 'border-gray-300 bg-gray-50'
    }`}>
      <h3 className={`text-xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tech Stack</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  : 'bg-gray-100 border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className="w-8 h-8 text-blue-400 mb-3" />
              <div className={`text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tech.name}</div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{tech.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
