import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface VehicleDetectionResult {
  make: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  confidence: number;
  rawResponse?: string;
}

export async function detectVehicle(imageBase64: string, mimeType: string = "image/jpeg"): Promise<VehicleDetectionResult> {
  const response = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: `Analyze this vehicle image and identify the car. Return a JSON object with exactly these fields:
{
  "make": "string (e.g. Toyota)",
  "model": "string (e.g. Camry)",
  "year": number (e.g. 2022),
  "color": "string (e.g. Pearl White)",
  "bodyType": "string (one of: Sedan, Coupe, SUV, Truck, Van, Hatchback, Wagon, Convertible)",
  "confidence": number (0-100, your confidence percentage)
}

If you cannot identify the vehicle with confidence, use your best estimate and set confidence below 50. Return ONLY the JSON object, no other text.`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const parsed = JSON.parse(text.trim());
    return {
      make: parsed.make || "Unknown",
      model: parsed.model || "Unknown",
      year: parsed.year || new Date().getFullYear(),
      color: parsed.color || "Unknown",
      bodyType: parsed.bodyType || "Sedan",
      confidence: parsed.confidence || 50,
      rawResponse: text,
    };
  } catch {
    return {
      make: "Unknown",
      model: "Unknown",
      year: new Date().getFullYear(),
      color: "Unknown",
      bodyType: "Sedan",
      confidence: 20,
      rawResponse: text,
    };
  }
}
