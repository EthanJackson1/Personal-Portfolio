import { Shield, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function SecurityHeaders() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const headers = [
    {
      name: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
      description: 'Forces HTTPS connections'
    },
    {
      name: 'X-Content-Type-Options',
      value: 'nosniff',
      description: 'Prevents MIME type sniffing'
    },
    {
      name: 'X-Frame-Options',
      value: 'DENY',
      description: 'Prevents clickjacking attacks'
    },
    {
      name: 'Content-Security-Policy',
      value: "default-src 'self'",
      description: 'Controls resource loading'
    },
    {
      name: 'X-XSS-Protection',
      value: '1; mode=block',
      description: 'Blocks XSS attacks'
    }
  ];

  return (
    <div className={`border rounded-lg p-8 ${
      isDark
        ? 'border-gray-800 bg-gray-900/30'
        : 'border-gray-300 bg-gray-50'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-blue-400" />
        <h3 className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Security Headers</h3>
      </div>

      <div className={`mb-6 p-4 border rounded-lg ${
        isDark
          ? 'bg-blue-900/20 border-blue-800'
          : 'bg-blue-50 border-blue-300'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          <span className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Security Grade: A</span>
        </div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          Implemented via CloudFront Functions to inject security headers into every response
        </p>
      </div>

      <div className="space-y-3">
        {headers.map((header) => (
          <div
            key={header.name}
            className={`p-4 rounded-lg border ${
              isDark
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <code className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{header.name}</code>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div className={`text-xs mb-2 font-mono ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{header.value}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{header.description}</div>
          </div>
        ))}
      </div>

      <div className={`mt-6 p-4 rounded border ${
        isDark
          ? 'bg-gray-800/30 border-gray-700'
          : 'bg-gray-100 border-gray-300'
      }`}>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>
          💡 <span className={isDark ? 'text-gray-400' : 'text-gray-800'}>Pro Tip:</span> These headers are automatically added using
          CloudFront Functions, ensuring every response meets enterprise security standards.
        </p>
      </div>
    </div>
  );
}
