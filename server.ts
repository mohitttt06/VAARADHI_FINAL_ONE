import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const schemes = [
  {
    "name": "PM Kisan Samman Nidhi",
    "type": "Central",
    "conditions": {"occupation": "Farmer", "max_income": 600000},
    "benefit": "₹6000 annual income support for farmers"
  },
  {
    "name": "Ayushman Bharat (PM-JAY)",
    "type": "Central",
    "conditions": {"max_income": 300000},
    "benefit": "Health insurance coverage up to ₹5 lakh per family"
  },
  {
    "name": "Pradhan Mantri Awas Yojana",
    "type": "Central",
    "conditions": {"max_income": 300000},
    "benefit": "Subsidy for affordable housing"
  },
  {
    "name": "National Widow Pension Scheme",
    "type": "Central",
    "conditions": {
      "gender": "Female",
      "marital_status": "Widow",
      "min_age": 40,
      "max_income": 200000
    },
    "benefit": "Monthly pension assistance"
  },
  {
    "name": "PM Scholarship Scheme",
    "type": "Central",
    "conditions": {"occupation": "Student", "max_income": 250000},
    "benefit": "Higher education financial support"
  },
  {
    "name": "YSR Rythu Bharosa",
    "type": "State",
    "state": "Andhra Pradesh",
    "conditions": {"occupation": "Farmer", "max_income": 500000},
    "benefit": "₹13,500 yearly farmer investment assistance"
  },
  {
    "name": "YSR Pension Kanuka",
    "type": "State",
    "state": "Andhra Pradesh",
    "conditions": {"min_age": 60, "max_income": 200000},
    "benefit": "Monthly pension for elderly citizens"
  },
  {
    "name": "YSR Amma Vodi",
    "type": "State",
    "state": "Andhra Pradesh",
    "conditions": {"occupation": "Student", "max_income": 300000},
    "benefit": "₹15,000 yearly education support"
  },
  {
    "name": "Rythu Bandhu",
    "type": "State",
    "state": "Telangana",
    "conditions": {"occupation": "Farmer"},
    "benefit": "Investment support per acre for farmers"
  },
  {
    "name": "KCR Kit Scheme",
    "type": "State",
    "state": "Telangana",
    "conditions": {"gender": "Female", "max_income": 300000},
    "benefit": "Support for pregnant women and newborn care"
  },
  {
    "name": "Kalaignar Health Insurance Scheme",
    "type": "State",
    "state": "Tamil Nadu",
    "conditions": {"max_income": 250000},
    "benefit": "Free advanced medical treatment"
  },
  {
    "name": "Tamil Nadu Marriage Assistance Scheme",
    "type": "State",
    "state": "Tamil Nadu",
    "conditions": {"gender": "Female", "max_income": 200000},
    "benefit": "Financial support for marriage expenses"
  },
  {
    "name": "Kanyashree Prakalpa",
    "type": "State",
    "state": "West Bengal",
    "conditions": {
      "gender": "Female",
      "occupation": "Student",
      "max_income": 200000
    },
    "benefit": "Scholarship for girl students"
  },
  {
    "name": "Ladli Laxmi Yojana",
    "type": "State",
    "state": "Madhya Pradesh",
    "conditions": {"gender": "Female", "max_income": 200000},
    "benefit": "Financial security scheme for girl children"
  },
  {
    "name": "Mukhyamantri Kanya Utthan Yojana",
    "type": "State",
    "state": "Bihar",
    "conditions": {"gender": "Female", "occupation": "Student"},
    "benefit": "Education incentives for girls"
  },
  {
    "name": "Delhi Ladli Scheme",
    "type": "State",
    "state": "Delhi",
    "conditions": {"gender": "Female", "max_income": 300000},
    "benefit": "Financial support for girl child education"
  },
  {
    "name": "Mahatma Jyotiba Phule Jan Arogya Yojana",
    "type": "State",
    "state": "Maharashtra",
    "conditions": {"max_income": 300000},
    "benefit": "Free medical treatment coverage"
  },
  {
    "name": "PM Ujjwala Yojana",
    "type": "Central",
    "conditions": {"max_income": 200000},
    "benefit": "Free LPG gas connection for low-income households"
  },
  {
    "name": "Atal Pension Yojana",
    "type": "Central",
    "conditions": {"min_age": 18, "max_income": 500000},
    "benefit": "Guaranteed pension after retirement"
  },
  {
    "name": "Stand Up India Scheme",
    "type": "Central",
    "conditions": {"gender": "Female", "max_income": 800000},
    "benefit": "Bank loans for women entrepreneurs"
  },
  {
    "name": "Skill India Training Program",
    "type": "Central",
    "conditions": {"occupation": "Unemployed"},
    "benefit": "Free skill development training programs"
  },
  {
    "name": "Gruha Lakshmi Scheme",
    "type": "State",
    "state": "Karnataka",
    "conditions": {"gender": "Female", "max_income": 300000},
    "benefit": "₹2000 monthly financial assistance to women heads"
  },
  {
    "name": "Anna Bhagya Scheme",
    "type": "State",
    "state": "Karnataka",
    "conditions": {"max_income": 200000},
    "benefit": "Free food grains distribution"
  },
  {
    "name": "Mukhyamantri Chiranjeevi Health Scheme",
    "type": "State",
    "state": "Rajasthan",
    "conditions": {"max_income": 300000},
    "benefit": "Cashless health insurance coverage"
  },
  {
    "name": "Indira Gandhi Urban Employment Scheme",
    "type": "State",
    "state": "Rajasthan",
    "conditions": {"occupation": "Unemployed"},
    "benefit": "Urban employment guarantee program"
  },
  {
    "name": "Chief Minister Farmer Welfare Scheme",
    "type": "State",
    "state": "Madhya Pradesh",
    "conditions": {"occupation": "Farmer"},
    "benefit": "Financial assistance for agricultural activities"
  },
  {
    "name": "Sikshashree Scheme",
    "type": "State",
    "state": "West Bengal",
    "conditions": {"occupation": "Student", "max_income": 200000},
    "benefit": "Scholarship support for school students"
  },
  {
    "name": "Delhi Free Electricity Scheme",
    "type": "State",
    "state": "Delhi",
    "conditions": {"max_income": 300000},
    "benefit": "Free electricity up to specified consumption limit"
  },
  {
    "name": "Mazi Kanya Bhagyashree",
    "type": "State",
    "state": "Maharashtra",
    "conditions": {"gender": "Female", "max_income": 250000},
    "benefit": "Financial savings scheme for girl child"
  },
  {
    "name": "Orunodoi Scheme",
    "type": "State",
    "state": "Assam",
    "conditions": {"gender": "Female", "max_income": 200000},
    "benefit": "Monthly financial support for women-led households"
  },
  {
    "name": "Krushak Assistance for Livelihood and Income Augmentation (KALIA)",
    "type": "State",
    "state": "Odisha",
    "conditions": {"occupation": "Farmer"},
    "benefit": "Financial assistance and livelihood support"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/check-eligibility", (req, res) => {
    const { name, age, income, gender, occupation, marital_status, state } = req.body;
    
    const eligible_schemes: any[] = [];
    const not_eligible: any[] = [];

    schemes.forEach((s: any) => {
      let eligible = true;
      const reasons: any[] = [];
      const cond = s.conditions || {};

      // 1. State Filter
      if (s.type === "State" && s.state !== state) {
        return; // Skip schemes from other states
      }

      // 2. Gender Check
      if (cond.gender && gender !== cond.gender) {
        eligible = false;
        reasons.push({ text: `This scheme is specifically for ${cond.gender} applicants.` });
      }

      // 3. Age Range Check
      if (cond.min_age && age < cond.min_age) {
        eligible = false;
        reasons.push({ text: `Minimum age required is ${cond.min_age} years.` });
      }
      if (cond.max_age && age > cond.max_age) {
        eligible = false;
        reasons.push({ text: `This scheme is only for individuals under ${cond.max_age} years.` });
      }

      // 4. Marital Status Check
      if (cond.marital_status && marital_status !== cond.marital_status) {
        eligible = false;
        reasons.push({ text: `Exclusively for ${cond.marital_status} individuals.` });
      }

      // 5. Income Check
      if (cond.max_income && income > cond.max_income) {
        eligible = false;
        reasons.push({ text: `Income limit is ₹${cond.max_income}.` });
      }

      // 6. Occupation Check
      if (cond.occupation && occupation !== cond.occupation) {
        eligible = false;
        reasons.push({ text: `Only for ${cond.occupation}s.` });
      }

      if (eligible) {
        eligible_schemes.push(s);
      } else {
        not_eligible.push({ ...s, reasons });
      }
    });

    res.json({
      name,
      eligible: eligible_schemes,
      not_eligible: not_eligible
    });
  });

  app.post("/api/chat", (req, res) => {
    const user_msg = (req.body.message || "").toLowerCase();
    let reply = "";

    if (user_msg.includes("aadhar") || user_msg.includes("aadhaar") || user_msg.includes("update")) {
      reply = "Check the 'Support' section at the bottom for Aadhaar tutorials in 6 languages!";
    } else if (user_msg.includes("sachivalayam") || user_msg.includes("map")) {
      reply = "Enter your area in the search bar above the map to find your nearest office.";
    } else if (user_msg.includes("farmer") || user_msg.includes("kisan")) {
      reply = "Ensure your Aadhaar is linked to your land records for farmer benefits.";
    } else if (user_msg.includes("female") || user_msg.includes("woman") || user_msg.includes("girl")) {
      reply = "Several schemes are gender-specific. Make sure your profile details are accurate.";
    } else {
      reply = "I'm Vaaradhi AI. I can help with scheme eligibility, map locations, or Aadhaar updates.";
    }

    res.json({ reply });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
