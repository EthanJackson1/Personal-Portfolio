import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * VisitorCounter Component
 *
 * This component connects to your AWS API Gateway endpoint to track and display visitor counts.
 *
 * SETUP INSTRUCTIONS:
 * 1. Deploy your AWS Lambda function with DynamoDB integration
 * 2. Create an API Gateway endpoint that triggers your Lambda
 * 3. Replace the API_ENDPOINT below with your actual endpoint URL
 * 4. Your Lambda should increment a counter in DynamoDB and return { count: number }
 *
 * Example Lambda response format:
 * {
 *   "statusCode": 200,
 *   "body": JSON.stringify({ count: 123 })
 * }
 */
export default function VisitorCounter() {
  const { theme } = useTheme();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const isDark = theme === 'dark';

  useEffect(() => {
    const API_ENDPOINT = 'https://z8x9yvgnt3.execute-api.eu-west-2.amazonaws.com/prod/counter';

    const handleVisitor = async () => {
      //only log repeat visiors once
      const hasVisited = localStorage.getItem('hasVisited');
      
      const httpMethod = hasVisited ? 'GET' : 'POST';

      try {
        const response = await fetch(API_ENDPOINT, {
          method: httpMethod,
          headers: {'Content-Type': 'application/json'},
        });

      if (response.ok) {
        const data = await response.json();
        const bodyObj = data.body ? JSON.parse(data.body) : data; // Handle both formats

        setVisitorCount(bodyObj.count);

        // Only set the flag if it was a successful increment
        if (httpMethod === 'POST') {
          localStorage.setItem('hasVisited', 'true');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  handleVisitor();
}, []);

  return (
    <div className={`inline-flex items-center gap-3 px-6 py-3 border rounded-lg ${
      isDark
        ? 'bg-gray-900 border-gray-700'
        : 'bg-gray-50 border-gray-300'
    }`}>
      <Users className="w-5 h-5 text-blue-400" />
      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
        {loading ? (
          'Loading...'
        ) : (
          <>
            You are visitor <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>#{visitorCount?.toLocaleString()}</span>
          </>
        )}
      </span>
    </div>
  );
}
