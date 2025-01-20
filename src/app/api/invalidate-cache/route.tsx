import { cacheTag } from "@/lib/datocms";
import { revalidateTag } from "next/cache";
import type { NextRequest, NextResponse } from "next/server";
import {
  handleUnexpectedError,
  invalidRequestResponse,
  successfulResponse,
} from "../utils";

/*
 * This route handler receives "Cache Tag Invalidation" events from a DatoCMS
 * webhook, and is responsible for invalidating the Next.js cache.
 *
 * All requests to DatoCMS are tagged with "datocms" in the Next.js Data Cache.
 * Whenever DatoCMS notifies us of any updates, we invalidate all requests with
 * the same tag.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse query string parameters
    const token = req.nextUrl.searchParams.get("token");

    // Ensure that the request is coming from a trusted source
    if (token !== process.env.SECRET_API_TOKEN) {
      return invalidRequestResponse("Invalid token", 401);
    }

    revalidateTag(cacheTag);

    return successfulResponse();
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
