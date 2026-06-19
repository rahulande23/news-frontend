import axios from "axios";

// In production these hit Netlify serverless functions (no CORS issues)
// In dev, Vite proxies /.netlify/functions -> same functions via netlify dev
const BASE = "/.netlify/functions";

export const fetchTopHeadlines = (category = "", country = "us", page = 1) =>
  axios.get(`${BASE}/top-headlines`, { params: { category, country, page } });

export const searchNews = (q, page = 1) =>
  axios.get(`${BASE}/search`, { params: { q, page } });
