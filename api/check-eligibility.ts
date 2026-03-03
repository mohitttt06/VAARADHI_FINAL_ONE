import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, occupation } = req.body;

  const eligible = [];
  const not_eligible = [];

  if (occupation === "Farmer") {
    eligible.push({
      name: "PM Kisan Samman Nidhi",
      type: "Central",
      state: "All India",
      benefit: "₹6000 annual income support to farmers."
    });
  } else {
    not_eligible.push({
      name: "PM Kisan Samman Nidhi",
      type: "Central",
      state: "All India",
      benefit: "₹6000 annual income support to farmers.",
      reasons: [{ text: "Only applicable for farmers." }]
    });
  }

  return res.status(200).json({
    name: name || "User",
    eligible: eligible || [],
    not_eligible: not_eligible || []
  });
}
