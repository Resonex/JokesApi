import Database from 'better-sqlite3';
import path from 'path';

// Create or open the local database file
const dbPath = path.join(process.cwd(), 'jokes.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create jokes table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general'
  )
`);

// Seed 50 Nigerian jokes if the table is empty
const count = db.prepare('SELECT COUNT(*) AS count FROM jokes').get();
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO jokes (content, category) VALUES (?, ?)');
  const jokes = [
    ["Why do Nigerians excel at chess? Because they already know how to dodge checkpoints.", "street"],
    ["I told my Nigerian dad I was hungry. He said 'You're not hungry; you're just breathing through your mouth.'", "dad"],
    ["What's a Nigerian's favorite programming language? Pidgin++", "tech"],
    ["Why did the Nigerian student bring a ladder to school? Because he heard the education was high.", "school"],
    ["My village people said I wouldn't succeed. Now they call it 'village luck.'", "village"],
    ["How do you know a Nigerian is lying? His lips are moving... and there's a WhatsApp broadcast.", "social"],
    ["I told my barber I wanted to look like Davido. He gave me 30 BG and said 'OBO no dey finish.'", "music"],
    ["Why did the tomato blush? Because it saw the salad dressing... and Mama Nkechi's pot.", "food"],
    ["Nigerian parents don't say 'I love you.' They say 'Have you eaten?' while handing you a plate of jollof.", "family"],
    ["Why do Nigerians never get lost? Because every corner has a 'You are here' sign written with pure stubbornness.", "street"],
    ["What do you call a Nigerian who can keep a secret? A ghost.", "social"],
    ["My phone fell into the lagoon. I said 'My SIM card!' – that's where the real life is.", "tech"],
    ["Why do Nigerian aunties ask 'When will you marry?' even at naming ceremonies? Because joy is incomplete without your own wahala.", "family"],
    ["I told my village people I got a remote job. They asked if the remote controls the TV in the palace.", "village"],
    ["What's the difference between a Nigerian tailor and a magician? The tailor says 'It will be ready tomorrow' – and you believe it.", "fashion"],
    ["Why do Nigerians love titles? Because 'Chairman of the Committee of Husbands Who Cook' sounds better than 'I helped in the kitchen.'", "social"],
    ["My pastor said 'The devil is a liar.' I whispered 'But he's still better than NEPA.'", "church"],
    ["How do you know a Nigerian wedding is starting? When the asoebi squad arrives two hours late and still forms a procession.", "party"],
    ["Why did the Nigerian tomato cross the road? To escape being blended into stew without proper negotiation.", "food"],
    ["My mum said 'You'll understand when you have children.' Now I have children, and I understand that I was a headache.", "family"],
    ["What do you call a Nigerian who doesn't like jollof? A lost soul – probably Ghanaian.", "food"],
    ["Why is the Nigerian police officer always at the bus stop? Because criminals don't use Uber.", "street"],
    ["I bought suya and the seller asked 'With or without pepper?' I said 'Make pepper no finish my life.'", "food"],
    ["Why do Nigerian mothers knock before entering? They don't – they just walk in and say 'Is it not my house?'", "family"],
    ["What's a Nigerian's favourite exercise? Dodging calls from unknown numbers.", "social"],
    ["My village people tried to stop me. I sent them recharge card and they changed their minds.", "village"],
    ["Why did the Nigerian musician bring a calculator to the studio? To count his blessings... and his streams.", "music"],
    ["What do you call a rich Nigerian? Someone who doesn't check data balance before watching a video.", "tech"],
    ["I told my wife she was overreacting. She said 'Overreacting? I'm just being Nigerian.'", "family"],
    ["Why do Nigerian pastors pray for long hours? Because they know the offering time comes after.", "church"],
    ["What's the official sport of Nigeria? Blaming the government while eating jollof.", "social"],
    ["My friend said he's a 'serial entrepreneur.' I asked if he sells wristwatches at traffic lights. He nodded.", "street"],
    ["Why do Nigerian kids fear the wooden spoon? Because it's the original lie detector.", "family"],
    ["I told my mechanic my car was making a noise. He revved the engine, hissed, and said 'It's your village people.'", "street"],
    ["What's the Nigerian version of 'I love you'? 'I've sent you the transport fare.'", "love"],
    ["Why did the Nigerian doctor carry a pen and notepad? To write a list of all the things that won't kill you – yet.", "health"],
    ["My dad says 'When I was your age...' and then tells a story that includes walking 10 miles barefoot. I just nod.", "dad"],
    ["What do you call a Nigerian who is always on time? A miracle.", "social"],
    ["Why do Nigerian shop owners write 'This shop is not for sale'? Because buyers still ask.", "business"],
    ["I asked my village chief for advice. He said 'My son, if you see a snake and a lawyer, kill the lawyer first.' I'm still confused.", "village"],
    ["What's the fastest thing in Nigeria? Rumors – they travel faster than 5G.", "social"],
    ["Why did the Nigerian student fail geography? Because he couldn't find 'Hustle' on the map.", "school"],
    ["My mum said I should be a doctor. I became a comedian. Now she tells people 'He's a doctor of laughter.'", "family"],
    ["What do you call a Nigerian with a PhD? 'Oga Doctor' – even at the beer parlour.", "social"],
    ["Why do Nigerians give the best advice? Because we've survived NEPA, fuel scarcity, and ASUU strikes.", "street"],
    ["I told my barber 'Trim small.' He said 'I know your head.' Thirty minutes later, I was bald.", "fashion"],
    ["What's the Nigerian way to say 'I'm leaving'? 'I'm coming' – and you'll be gone for hours.", "social"],
    ["Why did the Nigerian tomato refuse to enter the pot? It said 'Not without a lawyer.'", "food"],
    ["My father said 'A man must have three things: a house, a car, and a plan B.' I have a bicycle and a prayer point.", "dad"],
    ["What do you call a Nigerian who doesn't argue? A visitor.", "social"]
  ];

  for (const [content, category] of jokes) {
    insert.run(content, category);
  }
}

const API_KEY = 'apiboxpractice764235';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;
  const path = slug ? `/${slug.join('/')}` : '';

  function getIdFromRequest() {
    if (req.query.id) {
      const id = parseInt(req.query.id, 10);
      if (!isNaN(id)) return id;
    }
    if (path && /^\/\d+$/.test(path)) {
      return parseInt(path.slice(1), 10);
    }
    return null;
  }

  const requireApiKey = () => {
    const key = req.headers['x-api-key'];
    if (key !== API_KEY) {
      res.status(401).json({ error: 'Unauthorized – valid x-api-key header required' });
      return false;
    }
    return true;
  };

  // GET /api/jokes (with optional query params ?id=, ?ids=, ?category=)
  if (req.method === 'GET' && path === '') {
    const { id, ids, category } = req.query;

    if (id) {
      const num = parseInt(id, 10);
      if (isNaN(num)) return res.status(400).json({ error: 'Invalid id' });
      const joke = db.prepare('SELECT * FROM jokes WHERE id = ?').get(num);
      return joke ? res.status(200).json(joke) : res.status(404).json({ error: 'Joke not found' });
    }

    if (ids) {
      const idArray = ids.split(',').map(i => parseInt(i.trim(), 10));
      if (idArray.some(isNaN)) return res.status(400).json({ error: 'Invalid ids parameter' });
      const placeholders = idArray.map(() => '?').join(',');
      const jokes = db.prepare(`SELECT * FROM jokes WHERE id IN (${placeholders})`).all(...idArray);
      return res.status(200).json(jokes);
    }

    if (category) {
      const jokes = db.prepare('SELECT * FROM jokes WHERE category = ?').all(category);
      return res.status(200).json(jokes);
    }

    const allJokes = db.prepare('SELECT * FROM jokes').all();
    return res.status(200).json(allJokes);
  }

  // GET /api/jokes/random
  if (req.method === 'GET' && path === '/random') {
    const joke = db.prepare('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1').get();
    return joke ? res.status(200).json(joke) : res.status(404).json({ error: 'No jokes available' });
  }

  // GET /api/jokes/{id} (path fallback)
  if (req.method === 'GET' && /^\/\d+$/.test(path)) {
    const id = parseInt(path.slice(1), 10);
    const joke = db.prepare('SELECT * FROM jokes WHERE id = ?').get(id);
    return joke ? res.status(200).json(joke) : res.status(404).json({ error: 'Joke not found' });
  }

  // POST /api/jokes
  if (req.method === 'POST' && path === '') {
    const { content, category } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });

    const result = db.prepare('INSERT INTO jokes (content, category) VALUES (?, ?)').run(content, category || 'general');
    const newJoke = db.prepare('SELECT * FROM jokes WHERE id = ?').get(result.lastInsertRowid);
    return res.status(201).json(newJoke);
  }

  // PUT /api/jokes?id= or /{id}
  if (req.method === 'PUT') {
    const id = getIdFromRequest();
    if (!id) return res.status(400).json({ error: 'Missing joke id – use ?id= or /{id}' });
    if (!requireApiKey()) return;

    const existing = db.prepare('SELECT * FROM jokes WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Joke not found' });

    const { content, category } = req.body;
    const newContent = content !== undefined ? content : existing.content;
    const newCategory = category !== undefined ? category : existing.category;
    db.prepare('UPDATE jokes SET content = ?, category = ? WHERE id = ?').run(newContent, newCategory, id);
    const updated = db.prepare('SELECT * FROM jokes WHERE id = ?').get(id);
    return res.status(200).json(updated);
  }

  // DELETE /api/jokes?id= or /{id}
  if (req.method === 'DELETE') {
    const id = getIdFromRequest();
    if (!id) return res.status(400).json({ error: 'Missing joke id – use ?id= or /{id}' });
    if (!requireApiKey()) return;

    const existing = db.prepare('SELECT * FROM jokes WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Joke not found' });

    db.prepare('DELETE FROM jokes WHERE id = ?').run(id);
    return res.status(200).json({ message: 'Joke deleted successfully' });
  }

  return res.status(404).json({ error: 'Route not found' });
}
