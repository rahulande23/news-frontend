const https = require("https");

exports.handler = async (event) => {
  const { q, page = 1 } = event.queryStringParameters || {};
  if (!q)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "q is required" }),
    };

  const apiKey = process.env.VITE_NEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?apikey=${apiKey}&q=${encodeURIComponent(q)}&lang=en&max=12&page=${page}&sortby=publishedAt`;

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
