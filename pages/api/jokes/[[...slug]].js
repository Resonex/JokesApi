// In-memory joke storage (resets on cold start)
let jokes = [
  {
    id: 1,
    content: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    category: "dad",
  },
  {
    id: 2,
    content: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    category: "dad",
  },
  {
    id: 3,
    content: "Why don't scientists trust atoms? Because they make up everything!",
    category: "science",
  },
  {
    id: 4,
    content: "What do you call fake spaghetti? An impasta!",
    category: "food",
  },
];

let nextId = jokes.length + 1;

const API_KEY = "apiboxpractice764235";

export default function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { slug } = req.query;
  const path = slug ? `/${slug.join("/")}` : "";

  function requireApiKey() {
    const key = req.headers["x-api-key"];
    if (key !== API_KEY) {
      res.status(401).json({ error: "Unauthorized – valid x-api-key header required" });
      return false;
    }
    return true;
  }

  // ========================
  // GET /api/jokes
  // Supports query params: ?id=3, ?ids=1,2,3, ?category=dad
  // ========================
  if (req.method === "GET" && path === "") {
    const { id, ids, category } = req.query;

    // Single ID via ?id=3
    if (id) {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return res.status(400).json({ error: "Invalid id parameter" });
      }
      const joke = jokes.find((j) => j.id === numericId);
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }
      return res.status(200).json(joke);
    }

    // Multiple IDs via ?ids=1,2,3
    if (ids) {
      const idArray = ids.split(",").map((i) => parseInt(i.trim(), 10));
      if (idArray.some(isNaN)) {
        return res.status(400).json({ error: "ids parameter contains invalid numbers" });
      }
      const result = jokes.filter((j) => idArray.includes(j.id));
      return res.status(200).json(result);
    }

    // Category filter via ?category=dad
    if (category) {
      const result = jokes.filter((j) => j.category === category);
      return res.status(200).json(result);
    }

    // No query params → return all jokes
    return res.status(200).json(jokes);
  }

  // ========================
  // GET /api/jokes/random
  // ========================
  if (req.method === "GET" && path === "/random") {
    if (jokes.length === 0) {
      return res.status(404).json({ error: "No jokes available" });
    }
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return res.status(200).json(randomJoke);
  }

  // ========================
  // GET /api/jokes/{id} (path style, still works)
  // ========================
  if (req.method === "GET" && /^\/\d+$/.test(path)) {
    const id = parseInt(path.slice(1), 10);
    const joke = jokes.find((j) => j.id === id);
    if (!joke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    return res.status(200).json(joke);
  }

  // ========================
  // POST /api/jokes
  // ========================
  if (req.method === "POST" && path === "") {
    const { content, category } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const newJoke = {
      id: nextId++,
      content,
      category: category || "general",
    };
    jokes.push(newJoke);
    return res.status(201).json(newJoke);
  }

  // ========================
  // PUT /api/jokes/{id} (requires API key)
  // ========================
  if (req.method === "PUT" && /^\/\d+$/.test(path)) {
    if (!requireApiKey()) return;

    const id = parseInt(path.slice(1), 10);
    const jokeIndex = jokes.findIndex((j) => j.id === id);
    if (jokeIndex === -1) {
      return res.status(404).json({ error: "Joke not found" });
    }
    const { content, category } = req.body;
    if (content !== undefined) jokes[jokeIndex].content = content;
    if (category !== undefined) jokes[jokeIndex].category = category;
    return res.status(200).json(jokes[jokeIndex]);
  }

  // ========================
  // DELETE /api/jokes/{id} (requires API key)
  // ========================
  if (req.method === "DELETE" && /^\/\d+$/.test(path)) {
    if (!requireApiKey()) return;

    const id = parseInt(path.slice(1), 10);
    const jokeIndex = jokes.findIndex((j) => j.id === id);
    if (jokeIndex === -1) {
      return res.status(404).json({ error: "Joke not found" });
    }
    jokes.splice(jokeIndex, 1);
    return res.status(200).json({ message: "Joke deleted successfully" });
  }

  // 404 for unmatched routes
  return res.status(404).json({ error: "Route not found" });
}
