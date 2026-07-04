import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { destinationData } from "../../../data/destination-data";
import { destinations } from "../../../data/destinations-list";

export default defineTool({
  name: "search_hotels",
  title: "Search allergy-friendly hotels",
  description:
    "Search allergy-friendly hotels across all destination guides by keyword (hotel name, destination, or allergy info). Returns matching hotels with the destination they belong to.",
  inputSchema: {
    query: z
      .string()
      .min(1)
      .describe("Keyword, e.g. 'gluten-free London', 'nut-free', or a hotel name."),
    limit: z
      .number()
      .int()
      .optional()
      .describe("Max results to return. Defaults to 20."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.trim().toLowerCase();
    const max = Math.max(1, Math.min(limit ?? 20, 50));
    const nameById = new Map<string, string>(destinations.map((d) => [d.id as string, d.name]));
    const results: any[] = [];

    for (const [id, content] of Object.entries(destinationData as Record<string, any>)) {
      const destName = nameById.get(id) ?? id;
      for (const h of content.hotels ?? []) {
        const hay = [h.name, h.description, h.allergyInfo, destName, id, (h.allergenFriendly ?? []).join(" ")]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (hay.includes(q)) {
          results.push({
            name: h.name,
            destination: destName,
            destinationId: id,
            description: h.description,
            website: h.website ?? h.websiteUrl,
            allergyInfo: h.allergyInfo,
          });
        }
        if (results.length >= max) break;
      }
      if (results.length >= max) break;
    }

    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, hotels: results },
    };
  },
});