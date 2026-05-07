/**
 * Chepkolex AI - Execution Engine
 * Core logic for processing service requests and intent detection.
 */

export async function runExecutionEngine(model, service, input, context) {
  const prompt = `
    Identity: You are Chepkolex AI, a professional digital operator.
    Business DNA / Context: ${context}
    Service Type: ${service}
    User Input: ${input}

    Task: Execute the service, perform intent detection, and plan the workflow.
    
    Constraint: You must act as a digital operator, not an AI model. 
    Output Requirement: Return ONLY a strict JSON object.
    Format: { "plan": ["step 1", "step 2", "step 3"], "result": "detailed output" }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean and parse JSON from the operator's response
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Engine Execution Error:", error);
    throw new Error("The digital operator failed to generate a valid plan.");
  }
}

// Modular Dispatcher for expanded logic
export const engine = {
  executeAutomation: async (data) => { /* Specialized logic */ },
  executeWebsite: async (data) => { /* Specialized logic */ },
  executeMarketing: async (data) => { /* Specialized logic */ },
  executeContent: async (data) => { /* Specialized logic */ },
  executeCustomSolution: async (data) => { /* Specialized logic */ }
};
