import axios from "axios";

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const api = axios.create({ baseURL: BASE_URL });

export const fetchTopHeadlines = (category = "", country = "us", page = 1) => {
  const params = { apiKey: API_KEY, country, page, pageSize: 12 };
  if (category) params.category = category;
  return api.get("/top-headlines", { params });
};

export const searchNews = (q, page = 1) =>
  api.get("/everything", {
    params: {
      apiKey: API_KEY,
      q,
      page,
      pageSize: 12,
      sortBy: "publishedAt",
      language: "en",
    },
  });
