// Inside app/api/request-service/route.js
import { NextResponse } from "next/server";

export async function OPTIONS(req) {
  const origin = req.headers.get('origin');
  
  // List of allowed origins
  const allowedOrigins = [
    'https://chepkolex-ai.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  const responseHeaders = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // If the request comes from an allowed origin, set the header
  if (allowedOrigins.includes(origin)) {
    responseHeaders['Access-Control-Allow-Origin'] = origin;
  }

  return new NextResponse(null, { status: 204, headers: responseHeaders });
}

export async function POST(req) {
  try {
    const origin = req.headers.get('origin');
    // ... your existing logic (Gemini API calls, etc.) ...

    const response = NextResponse.json(yourDataResult);
    
    // Also add the origin check here for the actual response
    const allowedOrigins = ['https://chepkolex-ai.vercel.app', 'http://localhost:5173'];
    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}