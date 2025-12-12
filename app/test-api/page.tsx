"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface TestResult {
  name: string;
  status: 'loading' | 'success' | 'error';
  duration?: string;
  error?: string;
  dataType?: string;
  itemCount?: number;
}

export default function TestAPIPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    async function runTests() {
      setLoading(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
      if (!API_BASE_URL) {
        setResults([{
          name: 'Configuration Error',
          status: 'error',
          error: 'NEXT_PUBLIC_API_BASE environment variable is not set',
        }]);
        setLoading(false);
        return;
      }
      setBaseUrl(API_BASE_URL);

      const endpoints = [
        { name: 'Projects', url: '/api/projects' },
        { name: 'Projects Categories', url: '/api/projects/categories' },
        { name: 'About Cards', url: '/api/about' },
        { name: 'Skills', url: '/api/skills' },
        { name: 'Skills Page Data', url: '/api/skills/page-data' },
        { name: 'Contact', url: '/api/contact' },
      ];

      const testResults: TestResult[] = [];

      for (const endpoint of endpoints) {
        const startTime = Date.now();
        
        try {
          const response = await fetch(`${API_BASE_URL}${endpoint.url}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const duration = `${Date.now() - startTime}ms`;

          if (!response.ok) {
            testResults.push({
              name: endpoint.name,
              status: 'error',
              duration,
              error: `${response.status} ${response.statusText}`,
            });
            continue;
          }

          const data = await response.json();
          let result = data;
          
          if (data.success !== undefined) {
            if (!data.success) {
              testResults.push({
                name: endpoint.name,
                status: 'error',
                duration,
                error: data.error || data.message || 'API returned success: false',
              });
              continue;
            }
            result = data.data;
          }

          testResults.push({
            name: endpoint.name,
            status: 'success',
            duration,
            dataType: Array.isArray(result) ? 'array' : 'object',
            itemCount: Array.isArray(result) ? result.length : Object.keys(result).length,
          });
        } catch (error: any) {
          testResults.push({
            name: endpoint.name,
            status: 'error',
            duration: `${Date.now() - startTime}ms`,
            error: error.message || 'Unknown error',
          });
        }
      }

      setResults(testResults);
      setLoading(false);
    }

    runTests();
  }, []);

  const successCount = results.filter(r => r.status === 'success').length;
  const totalCount = results.length;

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Backend API Connection Test</h1>
          <p className="text-white/70">Testing connection to backend API</p>
          <p className="text-white/50 text-sm mt-2">Base URL: {baseUrl}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <span className="ml-3 text-white">Running tests...</span>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {result.status === 'loading' && (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      )}
                      {result.status === 'success' && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {result.status === 'error' && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-white font-medium">{result.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {result.duration && (
                        <span className="text-white/60 text-sm">{result.duration}</span>
                      )}
                      {result.itemCount !== undefined && (
                        <span className="text-white/60 text-sm">
                          {result.itemCount} {result.dataType === 'array' ? 'items' : 'keys'}
                        </span>
                      )}
                    </div>
                  </div>
                  {result.error && (
                    <div className="mt-2 text-red-400 text-sm">{result.error}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Total Endpoints:</span>
                  <span>{totalCount}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>Successful:</span>
                  <span>{successCount}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Failed:</span>
                  <span>{totalCount - successCount}</span>
                </div>
                <div className="pt-4 border-t border-white/20">
                  {successCount === totalCount ? (
                    <div className="text-green-400 font-semibold">
                      ✅ All tests passed! Backend is connected and working.
                    </div>
                  ) : successCount === 0 ? (
                    <div className="text-red-400">
                      ❌ All tests failed. Please check:
                      <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                        <li>Backend is running on {baseUrl}</li>
                        <li>CORS is configured correctly</li>
                        <li>Environment variable NEXT_PUBLIC_API_BASE is set correctly</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="text-yellow-400">
                      ⚠️ Some tests failed. Please check the errors above.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                Run Tests Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

