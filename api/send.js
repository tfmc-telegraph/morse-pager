const Ably = require("ably");

// Set this variable in Vercel Dashboard
const rest = new Ably.Rest({ key: process.env.ABLY_SECRET_KEY });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    const { to, message } = JSON.parse(req.body);
    const channel = rest.channels.get(to);
    await channel.publish('new-morse', { text: message });
    return res.status(200).json({ success: true });
  }
  res.status(405).send("Method Not Allowed");
}
