import { useTheme } from '../contexts/ThemeContext';

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

      {/* TODO: Replace src with your actual architecture diagram */}
      <div className={`rounded-lg p-8 flex items-center justify-center min-h-[400px] border ${
        isDark
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-100 border-gray-300'
      }`}>
        <div className="text-center">
          <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Upload your architecture diagram</p>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Create with Lucidchart, Excalidraw, or draw.io</p>
        </div>
        {/* When you have your diagram, uncomment below and add the import:
        import { ImageWithFallback } from './figma/ImageWithFallback';

        Then use:
        <ImageWithFallback
          src="path/to/your/architecture-diagram.png"
          alt="Cloud Resume Architecture Diagram"
          className="w-full h-auto rounded"
        />
        */}
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
