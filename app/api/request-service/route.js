import { NextResponse } from "next/server";
import { runService } from "@/lib/engine";

export async function POST(req) {
  try {
    const { service, input } = await req.json();
    
    // Call the engine to get the specific business logic
    const resultText = await runService(service, input);

    return NextResponse.json({
      status: "executed",
      plan: ["Engine Handshake", "Module Loaded", "Logic Applied"],
      result: resultText
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
