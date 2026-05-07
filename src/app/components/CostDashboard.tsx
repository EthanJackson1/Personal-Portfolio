import { DollarSign, TrendingDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function CostDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const costs = [
    { service: 'S3 Hosting', monthly: '$0.00', note: 'Within Free Tier' },
    { service: 'CloudFront', monthly: '$0.00', note: '1TB free data transfer' },
    { service: 'Lambda', monthly: '$0.00', note: '1M requests/month free' },
    { service: 'DynamoDB', monthly: '$0.00', note: '25GB storage free' },
    { service: 'API Gateway', monthly: '$0.00', note: '1M calls/month free' },
  ];

  const totalMonthlyCost = 0.00;

  return (
    <div className={`border rounded-lg p-8 ${
      isDark
        ? 'border-gray-800 bg-gray-900/30'
        : 'border-gray-300 bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Cost Breakdown</h3>
        <div className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
          isDark
            ? 'bg-green-900/30 border-green-800'
            : 'bg-green-50 border-green-300'
        }`}>
          <TrendingDown className="w-4 h-4 text-green-400" />
          <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>Free Tier Optimized</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {costs.map((item) => (
          <div
            key={item.service}
            className={`flex justify-between items-center p-4 rounded-lg border ${
              isDark
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div>
              <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.service}</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{item.note}</div>
            </div>
            <div className={`font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>{item.monthly}</div>
          </div>
        ))}
      </div>

      <div className={`flex justify-between items-center pt-6 border-t ${
        isDark ? 'border-gray-800' : 'border-gray-300'
      }`}>
        <div className={isDark ? 'text-gray-400' : 'text-gray-700'}>Total Monthly Cost</div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          <span className={`text-2xl font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalMonthlyCost.toFixed(2)}</span>
          <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>/month</span>
        </div>
      </div>

      <p className={`mt-4 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
        Estimated costs based on AWS Free Tier. Actual costs may vary with usage.
      </p>
    </div>
  );
}
