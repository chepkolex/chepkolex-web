import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ALLOWED_ORIGIN = "https://chepkolex-ai.vercel.app";

// --- CORS HELPER ---
const getCorsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

// --- SERVICE EXECUTION MODULES ---
const ExecutionEngine = {
  async runModel(systemPrompt, userPrompt) {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt + " NEVER mention Google or Gemini. You are Chepkolex AI, a Digital Operator.",
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  },

  async executeMarketing(dna, input) {
    return this.runModel(
      `Senior Marketing Strategist for Chepkolex AI. Location: ${dna.location || 'Nairobi'}. Context: ${dna.businessBio || ''}`,
      `Develop a full localized marketing funnel for: ${input}`
    );
  },

  async executeWebsite(dna, input) {
    return this.runModel(
      `Senior Web Architect. Stack: React/Vite/Tailwind.`,
      `Generate complete system architecture and production-ready code for: ${input}`
    );
  },

  async executeAutomation(dna, input) {
    return this.runModel(
      `AI Automation Engineer. Focus on efficiency and autonomous workflows.`,
      `Build a structured automation logic and trigger set for: ${input}`
    );
  },

  async executeContent(dna, input) {
    return this.runModel(
      `Content Director. Style: Professional and high-impact.`,
      `Generate high-conversion copy and social media scripts for: ${input}`
    );
  },

  async executeCustom(dna, input) {
    return this.runModel(
      `Chepkolex AI Digital Operator. Founder: Denis Kipkoech.`,
      `Solve this custom business challenge with precision: ${input}`
    );
  }
};

// --- API HANDLER ---
export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req.headers.get("origin")) });
}

export async function POST(req) {
  const origin = req.headers.get("origin");
  const headers = getCorsHeaders(origin);

  try {
    const { service, userId, input } = await req.json();

    // 1. Fetch Business DNA from Firebase
    const userDoc = await db.collection("users").doc(userId || "denis_kipkoech").get();
    const dna = userDoc.exists ? userDoc.data() : { location: "Nairobi", techStack: "React/Next.js" };

    // 2. Planning Logic
    const planModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const planRes = await planModel.generateContent(`As Chepkolex AI, create a 3-step execution plan for the ${service} service. Return as a clean JSON array of strings only.`);
    let plan = ["Analyze Request", "Execute Logic", "Verify Output"];
    try {
        plan = JSON.parse(planRes.response.text().replace(/```json|```/g, ""));
    } catch (e) { console.error("Plan parsing failed, using default."); }

    // 3. Execution & Chaining
    let finalOutput = "";

    if (service === "business") {
      const [mkt, cont, auto] = await Promise.all([
        ExecutionEngine.executeMarketing(dna, input),
        ExecutionEngine.executeContent(dna, input),
        ExecutionEngine.executeAutomation(dna, input)
      ]);
      finalOutput = `### MARKETING STRATEGY\n${mkt}\n\n### CONTENT PRODUCTION\n${cont}\n\n### AUTOMATION LOGIC\n${auto}`;
    } else {
      const map = {
        marketing: ExecutionEngine.executeMarketing,
        website: ExecutionEngine.executeWebsite,
        automation: ExecutionEngine.executeAutomation,
        content: ExecutionEngine.executeContent,
        custom: ExecutionEngine.executeCustom
      };
      const executor = map[service] || ExecutionEngine.executeCustom;
      finalOutput = await executor.call(ExecutionEngine, dna, input);
    }

    return NextResponse.json({
      status: "executed",
      plan: plan,
      result: finalOutput
    }, { headers });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers });
  }
}
