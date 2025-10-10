// functionHandlers.ts
import { FunctionHandler } from "./types";

const functions: FunctionHandler[] = [];

// --- web_searching ---
functions.push({
  schema: {
    type: "function",
    name: "web_searching",
    description:
      "Use this tool to search the web for recent information on a topic. Useful when you need to find current events, news, or updates that may not be in the model's training data.",
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description:
            "The user's request describing what they want to search for on the web or information they want to find.",
        },
        user: {
          type: "string",
          description: "Este siempre debe ser 'Lupita Web Search'.",
        },
      },
      required: ["message", "user"],
    },
  },
  handler: async (args: { message: string; user: string }) => {
    const res = await fetch("https://lupita-webapp-v3.azurewebsites.net/api/websearching", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: args.user, message: args.message }),
    });

    if (!res.ok) throw new Error("Failed to fetch web search results");
    const data = await res.json();
    return JSON.stringify(data);
  },
});

// --- rag ---
functions.push({
  schema: {
    type: "function",
    name: "rag",
    description:
      "This function is triggered when the user asks questions related to business models, growth strategies, optimization, inventory management, or ways to improve and scale a local business. It leverages retrieval-augmented generation (RAG) to provide strategic recommendations and actionable suggestions.",
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description:
            "A user request asking for a business recommendation, suggestion, or strategy focused on growing, improving, or optimizing a local store or business operation.",
        },
        user: {
          type: "string",
          description: "Este siempre debe ser 'Lupita RAG'.",
        },
      },
      required: ["message", "user"],
    },
  },
  handler: async (args: { message: string; user: string }) => {
    const res = await fetch("https://lupita-webapp-v3.azurewebsites.net/api/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: args.user, message: args.message }),
    });

    if (!res.ok) throw new Error("Failed to fetch RAG results");
    const data = await res.json();
    return JSON.stringify(data);
  },
});

export default functions;
