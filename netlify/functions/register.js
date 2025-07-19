
import { neon } from '@netlify/neon';

export default async (req, context) => {
  const sql = neon(); // uses NETLIFY_DATABASE_URL

  const data = await req.json();
  const {
    teamName,
    leaderName,
    phone,
    email,
    player1,
    player2,
    player3,
    player4
  } = data;

  try {
    await sql`
      INSERT INTO registrations (team_name, leader_name, phone, email, player1, player2, player3, player4)
      VALUES (${teamName}, ${leaderName}, ${phone}, ${email}, ${player1}, ${player2}, ${player3}, ${player4})
    `;
    return new Response("Registration successful!", { status: 200 });
  } catch (err) {
    return new Response("Failed to register: " + err.message, { status: 500 });
  }
};
