
/**
 * Cleans the response text from the search API to remove any prompt instructions 
 * or metadata that may have leaked into the response
 */
export const cleanResponseText = (text: string): string => {
  if (!text) return "";

  // Remove any prompt instructions or metadata that may have leaked into the response
  return text
    .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Format your response as[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/EXTREMELY IMPORTANT SAFETY REQUIREMENTS:[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/For hotels, ONLY include[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/ALL guest reviews MUST be authentic[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/If you're not 100% certain[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Include WARNING notices[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Include EXACT street addresses[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/IMPORTANT RULES:[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/Format exactly as shown[\s\S]*?(?=\n\n|$)/g, '')
    .trim();
};
