// app/api/discord-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

// Define TypeScript interfaces
interface WebhookRequestBody {
  bossName: string;
  respawnTime: string;
  respawnHours: number;
}

interface DiscordWebhookPayload {
  content: string;
  embeds: Array<{
    title: string;
    description: string;
    color: number;
    fields: Array<{
      name: string;
      value: string;
      inline: boolean;
    }>;
  }>;
}

// Replace with your actual Discord webhook URL
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

export async function POST(request: NextRequest) {
  try {
    // Make sure the webhook URL is configured
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { error: "Discord webhook URL not configured" },
        { status: 500 }
      );
    }

    // Parse the request body
    const body: WebhookRequestBody = await request.json();
    const { bossName, respawnTime, respawnHours } = body;

    // Validate the required fields
    if (!bossName || !respawnTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format the respawn time
    const formattedTime = format(new Date(respawnTime), "PPpp");

    // Create the Discord webhook payload
    const payload: DiscordWebhookPayload = {
      content: `**${bossName}**`,
      embeds: [
        {
          title: "",
          description: "",
          color: 3447003, // Discord blue color
          fields: [
            {
              name: "Next Respawn Time",
              value: formattedTime,
              inline: false,
            },
            {
              name: "Respawn Cycle",
              value: `Every ${respawnHours} hours`,
              inline: true,
            },
            // {
            //   name: "Notification Source",
            //   value: "Boss Hunt App",
            //   inline: true,
            // },
          ],
        },
      ],
    };

    // Send the webhook to Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Discord webhook error:", error);

    return NextResponse.json(
      { error: "Failed to send to Discord" },
      { status: 500 }
    );
  }
}
