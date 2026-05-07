import { useTheme } from '../contexts/ThemeContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ArchitectureDiagram() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`border rounded-lg p-8 ${
      isDark
        ? 'border-gray-800 bg-gray-900/30'
        : 'border-gray-300 bg-gray-50'
    }`}>
      <h3 className={`text-xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Architecture Overview</h3>

      <div className={`rounded-lg p-8 flex items-center justify-center min-h-[400px] border ${
        isDark
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-100 border-gray-300'
      }`}>
        
        <ImageWithFallback
          src="././AWS_flow_chart_personal_portfolio.png"
          alt="Cloud Resume Architecture Diagram"
          className="w-full h-auto rounded"
          />

      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className={`text-center p-3 rounded border ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-100 border-gray-300'
        }`}>
          <div className={isDark ? 'text-gray-400 mb-1' : 'text-gray-600 mb-1'}>Frontend</div>
          <div className={isDark ? 'text-white' : 'text-gray-900'}>S3 + CloudFront</div>
        </div>
        <div className={`text-center p-3 rounded border ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-100 border-gray-300'
        }`}>
          <div className={isDark ? 'text-gray-400 mb-1' : 'text-gray-600 mb-1'}>API</div>
          <div className={isDark ? 'text-white' : 'text-gray-900'}>API Gateway</div>
        </div>
        <div className={`text-center p-3 rounded border ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-100 border-gray-300'
        }`}>
          <div className={isDark ? 'text-gray-400 mb-1' : 'text-gray-600 mb-1'}>Compute</div>
          <div className={isDark ? 'text-white' : 'text-gray-900'}>Lambda</div>
        </div>
        <div className={`text-center p-3 rounded border ${
          isDark
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-gray-100 border-gray-300'
        }`}>
          <div className={isDark ? 'text-gray-400 mb-1' : 'text-gray-600 mb-1'}>Database</div>
          <div className={isDark ? 'text-white' : 'text-gray-900'}>DynamoDB</div>
        </div>
      </div>
    </div>
  );
}
