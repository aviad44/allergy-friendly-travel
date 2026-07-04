import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { destinations } from "../../../data/destinations-list";

export default defineTool({
  name: "list_destinations",
  title: "List destinations",
  description:
    "List all allergy-friendly travel destination guides on the site, with id, name, country, and a short description. Use the returned id with get_destination_guide.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive filter matched against name, country, or description."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const items = destinations
      .filter((d) =>
        !q
          ? true
          : [d.name, d.country, d.description, d.subtitle]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(q)),
      )
      .map((d) => ({
        id: d.id,
        name: d.name,
        country: d.country,
        description: d.description,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, destinations: items },
    };
  },
});