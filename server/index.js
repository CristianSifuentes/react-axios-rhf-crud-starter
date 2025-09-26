import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: "u_1", name: "Ada Lovelace", email: "ada@computing.org", role: "admin" },
  { id: "u_2", name: "Alan Turing", email: "alan@computing.org", role: "user" }
];

app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
  const { name, email, role } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  const user = { id: nanoid(), name, email, role: role ?? "user" };
  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const { name, email, role } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  users[idx] = { ...users[idx], name, email, role: role ?? users[idx].role };
  res.json(users[idx]);
});

app.delete("/users/:id", (req, res) => {
  const before = users.length;
  users = users.filter(u => u.id !== req.params.id);
  if (users.length === before) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`[api] listening on http://localhost:${port}`));
