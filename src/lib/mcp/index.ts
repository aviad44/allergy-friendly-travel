import { defineMcp } from "@lovable.dev/mcp-js";
import listDestinationsTool from "./tools/list-destinations";
import getDestinationGuideTool from "./tools/get-destination-guide";
import searchHotelsTool from "./tools/search-hotels";

export default defineMcp({
  name: "allergy-friendly-travel-mcp",
  title: "Allergy-Friendly Travel MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Allergy-Friendly Travel guide. Use list_destinations to browse destination guides, get_destination_guide to read a full guide (hotels, restaurants, FAQs, tips), and search_hotels to find allergy-friendly hotels by keyword.",
  tools: [listDestinationsTool, getDestinationGuideTool, searchHotelsTool],
});