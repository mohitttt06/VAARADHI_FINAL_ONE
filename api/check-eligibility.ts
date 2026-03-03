export default async function handler(req, res) {
  if (req.method === "POST") {
    const { income, age } = req.body;

    const eligible = income > 30000 && age >= 18;

    return res.status(200).json({ eligible });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
