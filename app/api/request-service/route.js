import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { runExecutionEngine } from '@/lib/execution-engine';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  // 🔐 Security: Define Allowed Origins
  const origin = req.headers.get('origin');
  const allowedOrigins = [
    "https://chepkolex-web.vercel.app", 
    "https://chepkolex-ai.vercel.app" // Ensure no trailing slash for exact matching
  ];
  
  const isAllowed = allowedOrigins.includes(origin);

  if (process.env.NODE_ENV === 'production' && !isAllowed) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const { service, userId, input } = await req.json();

    // 1. Context Injection (Fetch Business DNA)
    // Silently pulls context for personalization
    const dnaRef = doc(db, "business_dna", userId || "global");
    const dnaSnap = await getDoc(dnaRef);
    const businessContext = dnaSnap.exists() ? dnaSnap.data().context : "General digital operator";

    // 2. Initialize Gemini Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Trigger External Execution Engine Logic
    // This uses the modular library we created earlier
    const engineOutput = await runExecutionEngine(model, service, input, businessContext);

    // 4. Firebase Write (Triggers real-time dashboard updates)
    const docRef = await addDoc(collection(db, "service_requests"), {
      userId: userId || "anonymous",
      service,
      input,
      result: engineOutput.result,
      plan: engineOutput.plan,
      status: "executed",
      timestamp: serverTimestamp(),
      operator: "Chepkolex-V1"
    });

    // 5. Response to Frontend
    const response = NextResponse.json({ 
      success: true, 
      requestId: docRef.id, 
      ...engineOutput 
    });

    // Set CORS headers dynamically
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

// Handle OPTIONS for preflight requests
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