import axios from "axios";

const BASE_URL = "https://gnews.io/api/v4";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const api = axios.create({ baseURL: BASE_URL });

const CATEGORY_MAP = {
  "": "general",
  business: "business",
  technology: "technology",
  science: "science",
  health: "health",
  sports: "sports",
  entertainment: "entertainment",
};

export const fetchTopHeadlines = (category = "", country = "us", page = 1) => {
  const topic = CATEGORY_MAP[category] || "general";
  return api.get("/top-headlines", {
    params: { apikey: API_KEY, topic, lang: "en", country, max: 12, page },
  });
};

export const searchNews = (q, page = 1) =>
  api.get("/search", {
    params: {
      apikey: API_KEY,
      q,
      lang: "en",
      max: 12,
      page,
      sortby: "publishedAt",
    },
  });
