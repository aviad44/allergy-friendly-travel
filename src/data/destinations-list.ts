
import { DestinationId } from '@/types/definitions';

export interface DestinationListItem {
  id: DestinationId;
  name: string;
  country: string;
  description: string;
  subtitle?: string;
  image?: string;
}

export const destinations: DestinationListItem[] = [
  // Europe destinations
  {
    id: 'london' as DestinationId,
    name: 'London',
    country: 'United Kingdom',
    description: 'A comprehensive guide to allergy-friendly restaurants and hotels in London, featuring dedicated allergen menus and trained staff.',
    subtitle: 'Your Complete Allergy-Friendly Guide to London'
  },
  {
    id: 'paris' as DestinationId,
    name: 'Paris',
    country: 'France',
    description: 'Discover safe dining and accommodation options in the City of Light for travelers with food allergies.',
    subtitle: 'Navigate Paris Safely with Food Allergies'
  },
  {
    id: 'barcelona' as DestinationId,
    name: 'Barcelona',
    country: 'Spain',
    description: 'Explore Barcelona\'s allergy-friendly restaurants and hotels, with detailed reviews and safety information.',
    subtitle: 'Allergy-Safe Travel in Catalonia\'s Capital'
  },
  {
    id: 'rome' as DestinationId,
    name: 'Rome',
    country: 'Italy',
    description: 'Navigate the Eternal City safely with our guide to allergy-friendly dining and accommodations.',
    subtitle: 'Safe Travel Guide for Food Allergies in Rome'
  },
  {
    id: 'cyprus' as DestinationId,
    name: 'Cyprus',
    country: 'Cyprus',
    description: 'Mediterranean paradise with allergy-conscious resorts and restaurants catering to dietary restrictions.',
    subtitle: 'Island Paradise for Allergy-Safe Vacations'
  },
  {
    id: 'crete' as DestinationId,
    name: 'Crete',
    country: 'Greece',
    description: 'Greece\'s largest island offers excellent allergy-friendly accommodations and traditional cuisine adaptations.',
    subtitle: 'Greek Island Getaway with Allergy Awareness'
  },
  {
    id: 'portugal' as DestinationId,
    name: 'Portugal',
    country: 'Portugal',
    description: 'From Lisbon to Porto, discover Portugal\'s growing allergy-awareness in hotels and restaurants.',
    subtitle: 'Coastal Charm with Allergy Accommodations'
  },
  {
    id: 'swiss-alps' as DestinationId,
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Mountain resorts and chalets with excellent allergy protocols and pristine dining standards.',
    subtitle: 'Alpine Adventures with Allergy Safety'
  },
  {
    id: 'tuscany' as DestinationId,
    name: 'Tuscany',
    country: 'Italy',
    description: 'Wine country escapes with allergy-friendly agriturismos and restaurants understanding dietary needs.',
    subtitle: 'Italian Countryside with Culinary Safety'
  },
  {
    id: 'gluten-free-europe' as DestinationId,
    name: 'Gluten-Free Europe',
    country: 'Multiple Countries',
    description: 'A comprehensive guide to celiac-safe travel across European destinations with certified restaurants.',
    subtitle: 'Celiac-Safe European Adventure Guide'
  },
  {
    id: 'athens' as DestinationId,
    name: 'Athens',
    country: 'Greece',
    description: 'Ancient history meets modern allergy awareness in Greece\'s capital city.',
    subtitle: 'Historic Athens with Contemporary Food Safety'
  },
  {
    id: 'ayia-napa' as DestinationId,
    name: 'Ayia Napa',
    country: 'Cyprus',
    description: 'Beach resort destination with allergy-conscious hotels and seaside dining options.',
    subtitle: 'Beach Paradise with Dietary Accommodations'
  },

  // Asia & Middle East destinations  
  {
    id: 'tokyo' as DestinationId,
    name: 'Tokyo',
    country: 'Japan',
    description: 'Navigate Japan\'s capital with confidence using our allergy-friendly restaurant and hotel guide.',
    subtitle: 'Safe Dining in the Land of the Rising Sun'
  },
  {
    id: 'thailand' as DestinationId,
    name: 'Thailand',
    country: 'Thailand',
    description: 'Tropical paradise with increasing allergy awareness in resorts and local cuisine establishments.',
    subtitle: 'Southeast Asian Adventure with Food Safety'
  },
  {
    id: 'koh-samui' as DestinationId,
    name: 'Koh Samui',
    country: 'Thailand',
    description: 'Island getaway with luxury resorts offering comprehensive allergy management and safe dining.',
    subtitle: 'Tropical Island Retreat with Allergy Care'
  },
  {
    id: 'abu-dhabi' as DestinationId,
    name: 'Abu Dhabi',
    country: 'UAE',
    description: 'Luxury destination with world-class hotels providing exceptional allergy accommodation services.',
    subtitle: 'Desert Luxury with Premium Allergy Services'
  },
  {
    id: 'turkey' as DestinationId,
    name: 'Turkey',
    country: 'Turkey',
    description: 'Bridge between Europe and Asia offering diverse allergy-friendly accommodations and cuisine.',
    subtitle: 'Cultural Crossroads with Culinary Safety'
  },
  {
    id: 'eilat' as DestinationId,
    name: 'Eilat',
    country: 'Israel',
    description: 'Red Sea resort destination featuring the pioneering allergy-friendly program at U Coral Beach Hotel.',
    subtitle: 'Desert Oasis with Revolutionary Allergy Care',
    image: 'https://images.unsplash.com/photo-1544918796-60e440755919?auto=format&fit=crop&w=1200&q=80'
  },

  // North America destinations
  {
    id: 'new-york' as DestinationId,
    name: 'New York',
    country: 'United States',
    description: 'The Big Apple\'s extensive allergy-friendly dining scene and accommodating hotel options.',
    subtitle: 'Urban Adventure with Comprehensive Allergy Resources'
  },
  {
    id: 'toronto' as DestinationId,
    name: 'Toronto',
    country: 'Canada',
    description: 'Canada\'s largest city offers excellent allergy protocols in hotels and diverse safe dining options.',
    subtitle: 'Canadian Hospitality Meets Allergy Awareness'
  },

  // Special categories
  {
    id: 'hotel-chains' as DestinationId,
    name: 'Hotel Chains',
    country: 'Global',
    description: 'Comprehensive reviews of international hotel chains and their allergy accommodation policies.',
    subtitle: 'Global Hospitality Standards for Food Allergies'
  },
  {
    id: 'cruise-lines' as DestinationId,
    name: 'Cruise Lines',
    country: 'Global',
    description: 'Ocean adventures with detailed allergy management protocols across major cruise operators.',
    subtitle: 'Safe Sailing with Comprehensive Allergy Support'
  }
];
