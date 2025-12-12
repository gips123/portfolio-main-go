import { NextResponse } from 'next/server';
import { apiClient } from '../../lib/api/client';

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;

export async function GET() {
  const results: Record<string, any> = {
    baseUrl: API_BASE_URL,
    timestamp: new Date().toISOString(),
    endpoints: {},
  };

  const endpoints = [
    { name: 'projects', url: '/api/projects' },
    { name: 'projects_categories', url: '/api/projects/categories' },
    { name: 'about', url: '/api/about' },
    { name: 'skills', url: '/api/skills' },
    { name: 'skills_page_data', url: '/api/skills/page-data' },
    { name: 'contact', url: '/api/contact' },
  ];

  for (const endpoint of endpoints) {
    try {
      const startTime = Date.now();
      const data = await apiClient.get(endpoint.url);
      const duration = Date.now() - startTime;

      results.endpoints[endpoint.name] = {
        status: 'success',
        duration: `${duration}ms`,
        dataType: Array.isArray(data) ? 'array' : 'object',
        itemCount: Array.isArray(data) ? data.length : (data && typeof data === 'object' ? Object.keys(data).length : 0),
      };
    } catch (error: any) {
      results.endpoints[endpoint.name] = {
        status: 'error',
        error: error.message,
        errorType: error.constructor.name,
      };
    }
  }

  const successCount = Object.values(results.endpoints).filter(
    (e: any) => e.status === 'success'
  ).length;
  const totalCount = Object.keys(results.endpoints).length;

  results.summary = {
    total: totalCount,
    success: successCount,
    failed: totalCount - successCount,
    allPassed: successCount === totalCount,
  };

  return NextResponse.json(results, {
    status: results.summary.allPassed ? 200 : 207, // 207 = Multi-Status
  });
}

