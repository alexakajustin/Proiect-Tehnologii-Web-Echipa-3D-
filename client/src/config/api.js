/**
 * API Configuration
 * Handles dynamic API URL based on environment
 */

// Use environment variable in production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
