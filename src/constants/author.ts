// Single source of truth for the site's real, named author/editor — used in
// both visible bylines (ArticleByline) and JSON-LD `author` fields (Person,
// not a generic Organization). This content deals with severe, life-
// threatening food allergies, so Google treats E-E-A-T signals here more
// strictly than most topics: a real named person with a genuine, verifiable
// connection to the subject matter is what that calls for — see AboutUs.tsx
// for the full story this is summarized from. Never replace this with an
// invented name or fabricated credential.
export const SITE_AUTHOR = {
  name: 'Aviad Beit Halachmi',
  url: 'https://www.allergy-free-travel.com/about',
  jobTitle: 'Founder',
  // Short form of the AboutUs.tsx bio, for the visible byline.
  shortBio: 'Parent of a child with severe peanut and tree nut allergies, and founder of Allergy-Free Travel.',
};
