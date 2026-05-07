import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ALLOWED_ORIGIN = "https://chepkolex-ai.vercel.app";

const getCorsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

const ExecutionEngine = {
  async runModel(systemPrompt, userPrompt) {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt + " You are Chepkolex AI, a Digital Operator. Never mention Google or Gemini.",
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  },

  async executeMarketing(dna, input) {
    return this.runModel(
      `Senior Marketing Strategist. Founder: Denis Kipkoech. Focus: ${dna.location || 'Nairobi'}.`,
      `Create a marketing funnel for: ${input}`
    );
  },

  async executeWebsite(dna, input) {
    return this.runModel(
      `Senior Web Architect. Stack: React/Vite/Tailwind.`,
      `Design architecture and code for: ${input}`
    );
  },

  async executeAutomation(dna, input) {
    return this.runModel(
      `AI Automation Engineer. Target: Autonomous workflows.`,
      `Build automation logic for: ${input}`
    );
  },

  async executeContent(dna, input) {
    return this.runModel(
      `Content Director. Focus: High-conversion localized copy.`,
      `Generate content strategy for: ${input}`
    );
  },

  async executeCustom(dna, input) {
    return this.runModel(
      `Chepkolex AI Digital Operator.`,
      `Execute custom solution for: ${input}`
    );
  }
};

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req.headers.get("origin")) });
}

export async function POST(req) {
  const origin = req.headers.get("origin");
  const headers = getCorsHeaders(origin);

  try {
    const { service, userId, input } = await req.json();

    // Fetch Business DNA (Denis Kipkoech/Nairobi context)
    const userDoc = await db.collection("users").doc(userId || "denis_kipkoech").get();
    const dna = userDoc.exists ? userDoc.data() : { location: "Nairobi" };

    // Planning Engine
    const planModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const planRes = await planModel.generateContent(`Plan 3 steps for ${service}. Return JSON array of strings only.`);
    let plan = ["Initialize", "Process", "Deliver"];
    try {
        plan = JSON.parse(planRes.response.text().replace(/```json|```/g, ""));
    } catch (e) { console.error("Plan parse error"); }

    // Execution & Workflow Chaining
    let finalOutput = "";
    if (service === "business") {
      const [mkt, cont] = await Promise.all([
        ExecutionEngine.executeMarketing(dna, input),
        ExecutionEngine.executeContent(dna, input)
      ]);
      finalOutput = `## MARKETING\n${mkt}\n\n## CONTENT\n${cont}`;
    } else {
      const map = { marketing: "executeMarketing", website: "executeWebsite", automation: "executeAutomation", content: "executeContent" };
      const method = map[service] || "executeCustom";
      finalOutput = await ExecutionEngine[method](dna, input);
    }

    return NextResponse.json({ status: "executed", plan, result: finalOutput }, { headers });

  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers });
  }
}
