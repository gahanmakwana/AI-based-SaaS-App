import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import axios from "axios"; // Import axios
import FormData from "form-data"; // Import form-data

const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  if (ratelimit) {
    const headersList = await headers();
    const ipIdentifier = headersList.get("x-real-ip");
    const result = await ratelimit.limit(ipIdentifier ?? "");
    if (!result.success) {
      return new Response("Too many uploads in 1 day.", { status: 429 });
    }
  }

  try {
    const { imageUrl, theme, room } = await request.json();

    // 1. Convert the base64 data URL to a Buffer
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    // 2. Prepare the form data using the 'form-data' library
    const formData = new FormData();
    formData.append("init_image", imageBuffer, {
      filename: "init_image.png",
      contentType: "image/png",
    });
    formData.append(
      "text_prompts[0][text]",
      `A photo of a ${theme.toLowerCase()} ${room.toLowerCase()}, award-winning, best quality, extremely detailed, cinematic, ultra-realistic`
    );
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", "0.35");

    // 3. Make the API call using Axios
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    // 4. Handle the successful response
    const responseJSON = response.data;
    const restoredImage = responseJSON.artifacts[0].base64;
    const finalImageDataUrl = `data:image/png;base64,${restoredImage}`;

    return NextResponse.json({
      output: [finalImageDataUrl],
    });
  } catch (error: any) {
    // 5. Handle any errors from the Axios request
    console.error("Stability AI Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to generate image." },
      { status: 500 }
    );
  }
}