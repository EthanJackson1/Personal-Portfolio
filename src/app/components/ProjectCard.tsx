import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`group border rounded-lg p-6 transition-all ${
      isDark
        ? 'border-gray-800 hover:border-gray-600 bg-gray-900/50'
        : 'border-gray-200 hover:border-gray-400 bg-white'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        {link && (
          <ArrowUpRight className={`w-5 h-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isDark
              ? 'text-gray-500 group-hover:text-white'
              : 'text-gray-400 group-hover:text-gray-900'
          }`} />
        )}
      </div>
      <p className={`text-sm mb-4 leading-relaxed ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-3 py-1 rounded-full ${
              isDark
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
