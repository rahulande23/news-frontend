const https = require("https");

exports.handler = async (event) => {
  const {
    category = "",
    country = "us",
    page = 1,
  } = event.queryStringParameters || {};

  const CATEGORY_MAP = {
    "": "general",
    business: "business",
    technology: "technology",
    science: "science",
    health: "health",
    sports: "sports",
    entertainment: "entertainment",
  };

  const topic = CATEGORY_MAP[category] || "general";
  const apiKey = process.env.VITE_NEWS_API_KEY;
  const url = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&topic=${topic}&lang=en&country=${country}&max=12&page=${page}`;

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: data,
          });
        });
      })
      .on("error", (err) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: err.message }),
        });
      });
  });
};
