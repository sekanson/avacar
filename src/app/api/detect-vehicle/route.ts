import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64 } = body as { imageBase64: string };

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'imageBase64 is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Identify this vehicle. Return ONLY a JSON object with these fields: make, model, year (number), color, bodyType (one of: Sedan, Coupe, SUV, Truck, Hatchback, Convertible, Wagon, Van). Example: {"make":"BMW","model":"M4","year":2024,"color":"Black","bodyType":"Coupe"}',
            },
          ],
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Extract JSON from response (model may include surrounding text)
    const jsonMatch = text.match(/\{[^}]+\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Could not parse vehicle data from AI response' },
        { status: 422 }
      );
    }

    const vehicle = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!vehicle.make || !vehicle.model || !vehicle.year || !vehicle.bodyType) {
      return NextResponse.json(
        { error: 'Incomplete vehicle data returned' },
        { status: 422 }
      );
    }

    return NextResponse.json({ vehicle });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
