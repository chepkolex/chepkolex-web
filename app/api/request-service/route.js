import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '@/lib/firebaseAdmin'; // Points to your admin initialization
import { runExecutionEngine } from '@/lib/execution-engine';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  const origin = req.headers.get('origin');
  const allowedOrigins = [
    "https://chepkolex-web.vercel.app",
    "https://chepkolex-ai.vercel.app"
  ];
  
  const isAllowed = allowedOrigins.includes(origin);

  if (process.env.NODE_ENV === 'production' && !isAllowed) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const { service, userId, input } = await req.json();

    // 1. Context Injection (Firebase Admin Syntax)
    // Silently retrieves business context for personalization
    const dnaDoc = await db.collection("business_dna").doc(userId || "global").get();
    const businessContext = dnaDoc.exists ? dnaDoc.data().context : "General digital operator";

    // 2. Initialize Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Execution Engine (Modular Logic)
    // Uses the modular dispatcher for specialized processing
    const engineOutput = await runExecutionEngine(model, service, input, businessContext);

    // 4. Firebase Write (Firebase Admin Syntax)
    // Triggers real-time dashboard updates by logging requests
    const docRef = await db.collection("service_requests").add({
      userId: userId || "anonymous",
      service,
      input,
      result: engineOutput.result,
      plan: engineOutput.plan,
      status: "executed",
      timestamp: new Date(), // Admin SDK natively handles JS Date objects
      operator: "Chepkolex-V1"
    });

    // 5. Build Response
    const response = NextResponse.json({
      success: true,
      requestId: docRef.id,
      ...engineOutput
    });

    // Set CORS
    if (origin && (isAllowed || process.env.NODE_ENV !== 'production')) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    return response;

  } catch (error) {
    console.error("Chepkolex API Error:", error);
    return NextResponse.json({ 
      error: "Service execution failed", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}