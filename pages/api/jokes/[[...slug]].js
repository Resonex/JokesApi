let jokes=[
{id:1,content:'Why do Nigerians excel at chess? Because they already know how to dodge checkpoints.',category:'street'},
{id:2,content:"I told my Nigerian dad I was hungry. He said 'You're not hungry; you're just breathing through your mouth.'",category:'dad'},
{id:3,content:"What's a Nigerian's favorite programming language? Pidgin++",category:'tech'},
{id:4,content:'Why did the Nigerian student bring a ladder to school? Because he heard the education was high.',category:'school'},
{id:5,content:"My village people said I wouldn't succeed. Now they call it 'village luck.'",category:'village'},
{id:6,content:"How do you know a Nigerian is lying? His lips are moving... and there's a WhatsApp broadcast.",category:'social'},
{id:7,content:"I told my barber I wanted to look like Davido. He gave me 30 BG and said 'OBO no dey finish.'",category:'music'},
{id:8,content:"Why did the tomato blush? Because it saw the salad dressing... and Mama Nkechi's pot.",category:'food'},
{id:9,content:"Nigerian parents don't say 'I love you.' They say 'Have you eaten?' while handing you a plate of jollof.",category:'family'},
{id:10,content:"Why do Nigerians never get lost? Because every corner has a 'You are here' sign written with pure stubbornness.",category:'street'},
{id:11,content:'What do you call a Nigerian who can keep a secret? A ghost.',category:'social'},
{id:12,content:"My phone fell into the lagoon. I said 'My SIM card!' – that's where the real life is.",category:'tech'},
{id:13,content:"Why do Nigerian aunties ask 'When will you marry?' even at naming ceremonies? Because joy is incomplete without your own wahala.",category:'family'},
{id:14,content:'I told my village people I got a remote job. They asked if the remote controls the TV in the palace.',category:'village'},
{id:15,content:"What's the difference between a Nigerian tailor and a magician? The tailor says 'It will be ready tomorrow' – and you believe it.",category:'fashion'},
{id:16,content:"Why do Nigerians love titles? Because 'Chairman of the Committee of Husbands Who Cook' sounds better than 'I helped in the kitchen.'",category:'social'},
{id:17,content:"My pastor said 'The devil is a liar.' I whispered 'But he's still better than NEPA.'",category:'church'},
{id:18,content:'How do you know a Nigerian wedding is starting? When the asoebi squad arrives two hours late and still forms a procession.',category:'party'},
{id:19,content:'Why did the Nigerian tomato cross the road? To escape being blended into stew without proper negotiation.',category:'food'},
{id:20,content:"My mum said 'You'll understand when you have children.' Now I have children, and I understand that I was a headache.",category:'family'},
{id:21,content:"What do you call a Nigerian who doesn't like jollof? A lost soul – probably Ghanaian.",category:'food'},
{id:22,content:"Why is the Nigerian police officer always at the bus stop? Because criminals don't use Uber.",category:'street'},
{id:23,content:"I bought suya and the seller asked 'With or without pepper?' I said 'Make pepper no finish my life.'",category:'food'},
{id:24,content:"Why do Nigerian mothers knock before entering? They don't – they just walk in and say 'Is it not my house?'",category:'family'},
{id:25,content:"What's a Nigerian's favourite exercise? Dodging calls from unknown numbers.",category:'social'},
{id:26,content:'My village people tried to stop me. I sent them recharge card and they changed their minds.',category:'village'},
{id:27,content:'Why did the Nigerian musician bring a calculator to the studio? To count his blessings... and his streams.',category:'music'},
{id:28,content:"What do you call a rich Nigerian? Someone who doesn't check data balance before watching a video.",category:'tech'},
{id:29,content:"I told my wife she was overreacting. She said 'Overreacting? I'm just being Nigerian.'",category:'family'},
{id:30,content:'Why do Nigerian pastors pray for long hours? Because they know the offering time comes after.',category:'church'},
{id:31,content:"What's the official sport of Nigeria? Blaming the government while eating jollof.",category:'social'},
{id:32,content:"My friend said he's a 'serial entrepreneur.' I asked if he sells wristwatches at traffic lights. He nodded.",category:'street'},
{id:33,content:"Why do Nigerian kids fear the wooden spoon? Because it's the original lie detector.",category:'family'},
{id:34,content:"I told my mechanic my car was making a noise. He revved the engine, hissed, and said 'It's your village people.'",category:'street'},
{id:35,content:"What's the Nigerian version of 'I love you'? 'I've sent you the transport fare.'",category:'love'},
{id:36,content:"Why did the Nigerian doctor carry a pen and notepad? To write a list of all the things that won't kill you – yet.",category:'health'},
{id:37,content:"My dad says 'When I was your age...' and then tells a story that includes walking 10 miles barefoot. I just nod.",category:'dad'},
{id:38,content:'What do you call a Nigerian who is always on time? A miracle.',category:'social'},
{id:39,content:"Why do Nigerian shop owners write 'This shop is not for sale'? Because buyers still ask.",category:'business'},
{id:40,content:"I asked my village chief for advice. He said 'My son, if you see a snake and a lawyer, kill the lawyer first.' I'm still confused.",category:'village'},
{id:41,content:"What's the fastest thing in Nigeria? Rumors – they travel faster than 5G.",category:'social'},
{id:42,content:"Why did the Nigerian student fail geography? Because he couldn't find 'Hustle' on the map.",category:'school'},
{id:43,content:"My mum said I should be a doctor. I became a comedian. Now she tells people 'He's a doctor of laughter.'",category:'family'},
{id:44,content:"What do you call a Nigerian with a PhD? 'Oga Doctor' – even at the beer parlour.",category:'social'},
{id:45,content:"Why do Nigerians give the best advice? Because we've survived NEPA, fuel scarcity, and ASUU strikes.",category:'street'},
{id:46,content:"I told my barber 'Trim small.' He said 'I know your head.' Thirty minutes later, I was bald.",category:'fashion'},
{id:47,content:"What's the Nigerian way to say 'I'm leaving'? 'I'm coming' – and you'll be gone for hours.",category:'social'},
{id:48,content:"Why did the Nigerian tomato refuse to enter the pot? It said 'Not without a lawyer.'",category:'food'},
{id:49,content:"My father said 'A man must have three things: a house, a car, and a plan B.' I have a bicycle and a prayer point.",category:'dad'},
{id:50,content:"What do you call a Nigerian who doesn't argue? A visitor.",category:'social'}
];
let nextId=51;
const API_KEY="apiboxpractice764235";
export default function handler(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
res.setHeader("Access-Control-Allow-Headers","Content-Type,x-api-key");
if(req.method==="OPTIONS")return res.status(200).end();
const p=req.query.slug?"/"+req.query.slug.join("/"):"";
const gid=()=>{if(req.query.id){let n=parseInt(req.query.id);if(!isNaN(n))return n;} if(/^\/\d+$/.test(p))return parseInt(p.slice(1)); return null;};
const auth=()=>req.headers["x-api-key"]===API_KEY;
if(req.method==="GET"&&p===""){const{id,ids,category}=req.query;
if(id){const j=jokes.find(x=>x.id==id);return j?res.status(200).json(j):res.status(404).json({error:"Joke not found"});}
if(ids) return res.status(200).json(jokes.filter(x=>ids.split(",").map(Number).includes(x.id)));
if(category) return res.status(200).json(jokes.filter(x=>x.category===category));
return res.status(200).json(jokes);}
if(req.method==="GET"&&p==="/random")return res.status(200).json(jokes[Math.floor(Math.random()*jokes.length)]);
if(req.method==="GET"&&/^\/\d+$/.test(p)){const j=jokes.find(x=>x.id===gid());return j?res.status(200).json(j):res.status(404).json({error:"Joke not found"});}
if(req.method==="POST"&&p===""){const{content,category}=req.body;if(!content)return res.status(400).json({error:"Content is required"});const j={id:nextId++,content,category:category||"general"};jokes.push(j);return res.status(201).json(j);}
if(req.method==="PUT"){if(!auth())return res.status(401).json({error:"Unauthorized"});const id=gid();const i=jokes.findIndex(x=>x.id===id);if(i<0)return res.status(404).json({error:"Joke not found"});const{content,category}=req.body;if(content!==undefined)jokes[i].content=content;if(category!==undefined)jokes[i].category=category;return res.status(200).json(jokes[i]);}
if(req.method==="DELETE"){if(!auth())return res.status(401).json({error:"Unauthorized"});const id=gid();const i=jokes.findIndex(x=>x.id===id);if(i<0)return res.status(404).json({error:"Joke not found"});jokes.splice(i,1);return res.status(200).json({message:"Joke deleted successfully"});}
return res.status(404).json({error:"Route not found"});
}
