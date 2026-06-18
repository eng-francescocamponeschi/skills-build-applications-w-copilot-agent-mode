/**
 * API Configuration Utility
 *
 * Provides base URL for API calls using Vite environment variables.
 * VITE_CODESPACE_NAME must be defined in .env.local for Codespaces deployments.
 * Falls back to localhost:8000 if not set.
 */

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  // Fallback for local development
  return 'http://localhost:8000/api';
}

export async function fetchFromApi(endpoint) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
