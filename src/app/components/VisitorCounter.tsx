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
    // TODO: Replace with your actual API Gateway endpoint
    // Example: 'https://abc123.execute-api.us-east-1.amazonaws.com/prod/counter'
    const API_ENDPOINT = 'https://your-api-gateway-url.execute-api.region.amazonaws.com/prod/counter';

    const incrementVisitor = async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.count);
        } else {
          // Fallback to mock data if API is not set up yet
          setVisitorCount(402);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Mock data for development
        setVisitorCount(402);
      } finally {
        setLoading(false);
      }
    };

    incrementVisitor();
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
