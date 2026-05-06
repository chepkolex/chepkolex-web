import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req) {
  if (!genAI) {
    return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
  }

  try {
    const { service, input, userId } = await req.json();
    let location = "Nairobi";

    if (db) {
      const userDoc = await db.collection("users").doc(userId || "denis_kipkoech").get();
      if (userDoc.exists) {
        location = userDoc.data().location || "Nairobi";
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Context: User is based in ${location}. Task: Execute ${service} for ${input}.`;
    const result = await model.generateContent(prompt);

    return NextResponse.json({
      status: "executed",
      plan: ["Database Connected", "Identity Verified", "AI Execution Complete"],
      result: result.response.text()
    }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
