// CSP Report Endpoint - Netlify Function
// Receives Content-Security-Policy violation reports
// Logs reports to Netlify Dashboard

export default async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const report = JSON.parse(event.body);
    const csp = report['csp-report'] || report;

    const details = {
      documentUri: csp['document-uri'] || 'unknown',
      violatedDirective: csp['violated-directive'] || 'unknown',
      blockedUri: csp['blocked-uri'] || 'unknown',
      lineNumber: csp['line-number'] || 'unknown',
      columnNumber: csp['column-number'] || 'unknown',
      userAgent: event.headers['user-agent'] || 'unknown',
      timestamp: new Date().toISOString()
    };

    console.log(JSON.stringify({
      type: 'CSP_VIOLATION',
      ...details
    }));

    return { statusCode: 204, body: '' };
  } catch (error) {
    console.error('[CSP Report Error]', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) };
  }
}
