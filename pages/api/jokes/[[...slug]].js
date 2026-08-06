// In-memory joke storage (resets on cold start – perfect for practice)
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

export default function handler(req, res) {
  // CORS – allows students to call the API from any browser app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Parse the URL path. With [[...slug]], slug is undefined for /api/jokes,
  // or an array for sub‑paths like ["random"] or ["1"].
  const { slug } = req.query;
  const path = slug ? `/${slug.join("/")}` : "";

  // ========================
  // 1. GET /api/jokes
  // Return all jokes. Optional ?category=xxx
  // ========================
  if (req.method === "GET" && path === "") {
    const { category } = req.query;
    let result = jokes;
    if (category) {
      result = jokes.filter((j) => j.category === category);
    }
    return res.status(200).json(result);
  }

  // ========================
  // 2. GET /api/jokes/random
  // Return a single random joke
  // ========================
  if (req.method === "GET" && path === "/random") {
    if (jokes.length === 0) {
      return res.status(404).json({ error: "No jokes available" });
    }
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return res.status(200).json(randomJoke);
  }

  // ========================
  // 3. GET /api/jokes/{id}
  // Return a joke by its numeric ID
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
  // 4. POST /api/jokes
  // Create a new joke. Body: { "content": "...", "category": "..." }
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
  // 5. PUT /api/jokes/{id}
  // Update a joke. Body can include content and/or category.
  // ========================
  if (req.method === "PUT" && /^\/\d+$/.test(path)) {
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
  // 6. DELETE /api/jokes/{id}
  // Remove a joke
  // ========================
  if (req.method === "DELETE" && /^\/\d+$/.test(path)) {
    const id = parseInt(path.slice(1), 10);
    const jokeIndex = jokes.findIndex((j) => j.id === id);
    if (jokeIndex === -1) {
      return res.status(404).json({ error: "Joke not found" });
    }
    jokes.splice(jokeIndex, 1);
    return res.status(200).json({ message: "Joke deleted successfully" });
  }

  // If no route matched
  return res.status(404).json({ error: "Route not found" });
}
