/**
 * Maps allergy names to appropriate emoji icons
 * @param allergyName The name of the allergy
 * @returns The appropriate emoji or null if no mapping exists
 */
export const getAllergyIcon = (allergyName: string): string | null => {
  const nameLower = allergyName.toLowerCase();
  
  // Common allergies
  if (nameLower.includes('peanut')) return '🥜';
  if (nameLower.includes('tree nut') || nameLower.includes('treenut')) return '🌰';
  if (nameLower.includes('milk') || nameLower.includes('dairy')) return '🥛';
  if (nameLower.includes('egg')) return '🍳';
  if (nameLower.includes('fish') && !nameLower.includes('shell')) return '🐟';
  if (nameLower.includes('shellfish')) return '🦐';
  if (nameLower.includes('wheat')) return '🌾';
  if (nameLower.includes('soy')) return '🫘';
  if (nameLower.includes('sesame')) return '🌱';
  if (nameLower.includes('mustard')) return '🌭';
  if (nameLower.includes('celery')) return '🥬';
  if (nameLower.includes('gluten')) return '🍞';
  if (nameLower.includes('lupin')) return '🌿';
  
  // Specific nuts
  if (nameLower.includes('almond')) return '🥜';
  if (nameLower.includes('walnut')) return '🌰';
  if (nameLower.includes('cashew')) return '🥜';
  
  // Specific seafood
  if (nameLower.includes('crab')) return '🦀';
  if (nameLower.includes('shrimp')) return '🦐';
  if (nameLower.includes('lobster')) return '🦞';
  if (nameLower.includes('clam') || nameLower.includes('mussel')) return '🐚';
  
  // Other common allergies
  if (nameLower.includes('chocolate')) return '🍫';
  if (nameLower.includes('strawberry') || nameLower.includes('strawberries')) return '🍓';
  if (nameLower.includes('banana')) return '🍌';
  if (nameLower.includes('apple')) return '🍎';
  if (nameLower.includes('corn')) return '🌽';
  if (nameLower.includes('tomato')) return '🍅';
  if (nameLower.includes('citrus') || nameLower.includes('orange')) return '🍊';
  
  // Default for unknown allergies
  return null;
};
