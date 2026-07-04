import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { destinationData } from "../../../data/destination-data";
import { destinations } from "../../../data/destinations-list";

function toText(intro: unknown): string {
  if (!intro) return "";
  if (typeof intro === "string") return intro;
  if (Array.isArray(intro)) return intro.join("\n\n");
  if (typeof intro === "object") {
    const o = intro as Record<string, string>;
    return [o.title, o.description, o.quickTip].filter(Boolean).join("\n\n");
  }
  return "";
}

export default defineTool({
  name: "get_destination_guide",
  title: "Get destination guide",
  description:
    "Get the full allergy-friendly guide for one destination by its id (from list_destinations): intro, hotels, restaurants, FAQs, and travel tips.",
  inputSchema: {
    id: z.string().min(1).describe("Destination id, e.g. 'london', 'paris', 'tuscany'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const key = id.trim().toLowerCase();
    const content = (destinationData as Record<string, any>)[key];
    const meta = destinations.find((d) => d.id === key);

    if (!content) {
      return {
        content: [
          {
            type: "text",
            text: `No destination guide found for id "${id}". Use list_destinations to see valid ids.`,
          },
        ],
        isError: true,
      };
    }

    const guide = {
      id: key,
      name: meta?.name ?? content.title ?? key,
      country: meta?.country,
      intro: toText(content.intro),
      hotels: (content.hotels ?? []).map((h: any) => ({
        name: h.name,
        description: h.description,
        location: h.location ?? h.address,
        website: h.website ?? h.websiteUrl,
        allergyInfo: h.allergyInfo,
        allergenFriendly: h.allergenFriendly,
      })),
      restaurants: (content.restaurants ?? []).map((r: any) => ({
        name: r.name,
        description: r.description,
        cuisine: r.cuisine,
        location: r.location ?? r.address,
        allergyInfo: r.allergyInfo,
      })),
      faqs: content.faqs ?? [],
      travelTips: content.travelTips ?? content.tips ?? [],
    };

    return {
      content: [{ type: "text", text: JSON.stringify(guide, null, 2) }],
      structuredContent: { guide },
    };
  },
});