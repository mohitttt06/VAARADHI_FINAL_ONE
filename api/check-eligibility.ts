import type { VercelRequest, VercelResponse } from '@vercel/node';

const schemes = [/* 👈 PASTE YOUR FULL SCHEME ARRAY HERE */];

function checkEligibility(user: any, scheme: any) {
  const conditions = scheme.conditions;

  for (const key in conditions) {
    const value = conditions[key];

    if (key === "min_age" && user.age < value) return false;
    if (key === "max_income" && user.income > value) return false;
    if (key === "occupation" && user.occupation !== value) return false;
    if (key === "gender" && user.gender !== value) return false;
    if (key === "marital_status" && user.marital_status !== value) return false;
  }

  // Check state if state scheme
  if (scheme.type === "State" && scheme.state !== user.state) {
    return false;
  }

  return true;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const user = req.body;

  const eligible: any[] = [];
  const not_eligible: any[] = [];

  schemes.forEach((scheme) => {
    const isEligible = checkEligibility(user, scheme);

    if (isEligible) {
      eligible.push({
        name: scheme.name,
        type: scheme.type,
        state: scheme.state || "All India",
        benefit: scheme.benefit
      });
    } else {
      not_eligible.push({
        name: scheme.name,
        type: scheme.type,
        state: scheme.state || "All India",
        benefit: scheme.benefit,
        reasons: [{ text: "Does not meet eligibility criteria." }]
      });
    }
  });

  return res.status(200).json({
    name: user.name || "User",
    eligible,
    not_eligible
  });
}
