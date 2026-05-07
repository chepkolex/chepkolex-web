import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { service, input } = await req.json();
    
    // 1. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Generate the Strategy
    const prompt = `You are the Chepkolex AI Digital Operator. 
    Task: ${input} for service: ${service}.
    Provide a 3-step execution plan and a detailed technical result.
    Return JSON format: { "plan": ["step1", "step2", "step3"], "result": "detailed text here" }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // 3. Parse and Send (Ensuring it matches your frontend state)
    const cleanData = JSON.parse(text.replace(/```json|```/g, ""));

    return NextResponse.json(cleanData, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Or your specific frontend URL
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json(
      { error: "Operator logic failed. Check API keys and JSON parsing." }, 
      { status: 500 }
    );
  }
}