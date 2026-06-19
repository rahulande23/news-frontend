import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api/news";

const api = axios.create({ baseURL: BASE_URL });

export const fetchTopHeadlines = (category = "", country = "us", page = 1) =>
  api.get("/top-headlines", {
    params: { category, country, page, pageSize: 12 },
  });

export const searchNews = (q, page = 1) =>
  api.get("/search", { params: { q, page, pageSize: 12 } });
