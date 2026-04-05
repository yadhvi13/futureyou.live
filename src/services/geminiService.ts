import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface SimulationInput {
  habits: string;
  goals: string;
  career: string;
  lifestyle: string;
}

export interface SimulationResult {
  pathName: string;
  summary: string;
  milestones: { year: number; event: string; impact: string }[];
  metrics: { label: string; value: number }[];
}

export async function generateSimulation(input: SimulationInput, pathType: 'disciplined' | 'distracted' | 'balanced'): Promise<SimulationResult> {
  const prompt = `
    Generate a detailed 10-year future simulation for a person with the following profile:
    - Habits: ${input.habits}
    - Goals: ${input.goals}
    - Career Interests: ${input.career}
    - Lifestyle: ${input.lifestyle}
    
    The simulation should reflect a "${pathType}" path.
    
    Return the result as a JSON object with the following structure:
    {
      "pathName": "A catchy name for this path",
      "summary": "A 2-3 sentence summary of the long-term outcome",
      "milestones": [
        { "year": 2027, "event": "Specific event description", "impact": "How it affects their life" },
        ... (provide 5 milestones over 10 years)
      ],
      "metrics": [
        { "label": "Career Success", "value": 0-100 },
        { "label": "Health & Vitality", "value": 0-100 },
        { "label": "Financial Stability", "value": 0-100 },
        { "label": "Personal Fulfillment", "value": 0-100 }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pathName: { type: Type.STRING },
          summary: { type: Type.STRING },
          milestones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                event: { type: Type.STRING },
                impact: { type: Type.STRING }
              },
              required: ["year", "event", "impact"]
            }
          },
          metrics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["label", "value"]
            }
          }
        },
        required: ["pathName", "summary", "milestones", "metrics"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
