import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { NewsArticle } from './types';

// Every factual claim below was checked against the primary/near-primary
// source on 2026-10-18 (Southwest's own snack menu page, Parade/AOL's and
// TravelPulse's coverage of the announcement, Yahoo News' coverage of FARE's
// statement, and SnackSafely.com's report on the Pitt softball boycott,
// fetched directly). If you edit a claim, re-check it against the linked
// source and bump updatedAt.
const SRC = {
  southwestMenu: 'https://www.southwest.com/coffee',
  parade: 'https://www.aol.com/articles/southwest-airlines-marks-major-milestone-192932786.html',
  travelpulse: 'https://www.travelpulse.com/news/airlines-airports/southwest-airlines-makes-controversial-change-to-in-flight-snacks',
  yahooFare: 'https://www.yahoo.com/news/articles/southwest-upsets-fliers-allergies-bringing-124956909.html',
  allergicLiving: 'https://www.allergicliving.com/2025/10/19/pistachios-on-planes-southwest-sparks-allergy-safety-concerns/',
  snackSafely: 'https://snacksafely.com/2026/02/pistachios-over-people-pitt-softball-boycotts-southwest-airlines-over-dangerous-new-snack-policy/',
  fareFlying: 'https://www.foodallergy.org/fare-blog/flying-food-allergies',
};

const Cite = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="text-blue-700 underline hover:text-blue-900">
    {children}
  </a>
);

const Body = () => (
  <>
    <p>
      Southwest Airlines spent years building a reputation as one of the more allergy-cautious US carriers. In 2018, it
      became the last major US airline to stop serving peanuts, specifically to reduce risk for passengers with nut
      allergies. That reputation is now being tested by a new onboard snack.
    </p>
    <p>
      Starting <strong>October 16, 2025</strong>, Southwest began rolling out a new Extra Legroom (ELR) cabin section
      across its fleet (<Cite href={SRC.parade}>Parade</Cite>). Alongside it came a new snack exclusive to those seats:{' '}
      <strong>Wonderful Pistachios No Shells</strong>, in Roasted &amp; Salted and Honey Roasted flavors, with wider
      service beginning <strong>January 27, 2026</strong> (<Cite href={SRC.travelpulse}>TravelPulse</Cite>). Pistachios
      are a tree nut — a top-nine food allergen under US law, and one Southwest's own 2018 decision had been widely
      read as moving away from.
    </p>

    <h2>Why are food allergy advocates concerned about Southwest's pistachio snack?</h2>
    <p>
      Food Allergy Research &amp; Education (FARE), the largest US food-allergy nonprofit, said it was{' '}
      <strong>&ldquo;deeply concerned&rdquo;</strong> about the plan. FARE's CEO, Sung Poblete, warned that{' '}
      <em>&ldquo;adding a known allergen to in-flight service without strong safety protocols is going to increase the
      risk for food-allergic passengers&rdquo;</em> (<Cite href={SRC.yahooFare}>Yahoo News</Cite>).
    </p>
    <p>
      The concern isn't only about passengers who eat pistachios. In an aircraft cabin, shelled-nut debris and residue
      can end up on shared surfaces — tray tables, armrests, seat-back pockets — that the next passenger in that seat
      will touch, regardless of whether they ordered the snack themselves. Southwest has not announced a buffer zone,
      a cabin announcement policy, or a nut-free section for Extra Legroom rows.
    </p>
    <p>
      Asked how it would protect passengers with tree nut allergies, Southwest said it can offer an{' '}
      <strong>alternative snack</strong> to an affected passenger and that it will{' '}
      <strong>&ldquo;continually evaluate customer feedback&rdquo;</strong> — but it did not commit to any additional
      safety protocol, such as withholding the snack fleet-wide on a given flight when notified
      (<Cite href={SRC.allergicLiving}>Allergic Living</Cite>).
    </p>

    <h2>Why did a college softball team boycott Southwest Airlines?</h2>
    <p>
      On <strong>February 12, 2026</strong>, the University of Pittsburgh's softball program publicly said it would
      boycott Southwest over the pistachio policy, in a story headlined &ldquo;Pistachios Over People?&rdquo;
      (<Cite href={SRC.snackSafely}>SnackSafely.com</Cite>). The report's own framing was blunt: a passenger's{' '}
      &ldquo;pistachio cravings&rdquo; should never be valued more than a human life.
    </p>
    <p>
      It's a reminder that this isn't an abstract policy debate for everyone affected — for a traveler with a severe
      tree nut allergy, an airline's choice of onboard snack can be the difference between a routine flight and a
      medical emergency at altitude.
    </p>

    <h2>Does the pistachio snack apply to every Southwest flight and every seat?</h2>
    <p>
      As announced, no — it's tied to the Extra Legroom product, not standard economy seating, and Southwest's other
      snack options (pretzels and similar shelf-stable snacks) continue to be offered elsewhere in the cabin. That
      said, a tree nut allergy doesn't respect seating sections: pistachio residue carried onto a tray table, seat-back
      pocket or shared bin by a passenger or crew member isn't confined to the Extra Legroom rows, and recirculated
      cabin air (though HEPA-filtered on most aircraft) is a separate consideration some travelers weigh.
    </p>

    <h2>What should a traveler with a tree nut allergy do before flying Southwest?</h2>
    <ul>
      <li>
        Check Southwest's current snack menu before you fly — airline snack lineups change, and this one has already
        drawn enough pushback that it's worth confirming what's being served on your specific flight
        (<Cite href={SRC.southwestMenu}>Southwest's own snack page</Cite>).
      </li>
      <li>Notify the gate agent and cabin crew of your allergy before boarding, and ask what Southwest can do for your specific flight.</li>
      <li>Ask whether an alternative snack is available if you're seated in or near the Extra Legroom section.</li>
      <li>Bring your own safe snacks rather than relying on what's served on board.</li>
      <li>Wipe down your tray table, armrests and seat-back pocket — airlines do not guarantee allergen-free surfaces.</li>
      <li>
        Carry your own prescribed epinephrine in the cabin, not in checked luggage. See our guides to{' '}
        <Link to="/destinations/flying-with-epipens-north-america/">flying with EpiPens in North America</Link> and{' '}
        <Link to="/destinations/flying-with-epipens/">flying with EpiPens in Europe</Link>.
      </li>
    </ul>
    <p>
      None of this is medical advice — talk to your physician or allergist about your personal travel plan, especially
      if you have a history of severe reactions.
    </p>

    <h2>Is this part of the same 2026 US airline allergy-policy debate?</h2>
    <p>
      It's related but distinct. Southwest's pistachio snack is a company's own commercial food-service decision, not
      a federal rule. For the separate 2026 regulatory story — the FAA's proposal to loosen emergency medical kit
      requirements (including epinephrine) and a US DOT ruling on allergy preboarding rights — see our explainer on{' '}
      <Link to="/news/airline-food-allergy-policies-2026/">airline food allergy policies in 2026</Link>.
    </p>
  </>
);

export const southwestPistachioSnackAllergyBacklash2026: NewsArticle = {
  slug: 'southwest-pistachio-snack-allergy-backlash-2026',
  title: "Southwest's New Pistachio Snack Is Sparking an Allergy Safety Backlash",
  seoTitle: "Southwest's Pistachio Snack Sparks Food Allergy Backlash (2026)",
  description:
    "Southwest Airlines added pistachios to its Extra Legroom snack lineup, drawing a FARE warning and a college team's boycott. What tree-nut-allergic travelers should know.",
  publishedAt: '2026-10-18',
  updatedAt: '2026-10-18',
  heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  heroAlt: 'Airplane wing above the clouds',
  heroCredit: 'Photo: Unsplash',
  keyTakeaways: [
    "Southwest began rolling out Extra Legroom seating fleet-wide on October 16, 2025, with Wonderful Pistachios No Shells (Roasted & Salted, Honey Roasted) as an exclusive snack for those seats, with wider service from January 27, 2026.",
    'FARE (Food Allergy Research & Education) called itself "deeply concerned," warning that adding a known allergen to in-flight service without strong safety protocols raises risk for food-allergic passengers.',
    "Southwest said it can offer an alternative snack to an affected passenger, but has not committed to a buffer zone, cabin announcement, or withholding the snack fleet-wide when notified.",
    "On February 12, 2026, the University of Pittsburgh softball program publicly boycotted Southwest over the policy.",
    "The pistachio snack is tied to Extra Legroom seating, not the whole cabin, but nut residue on shared surfaces isn't confined to those rows. Notify the airline, ask about alternatives, and carry your own epinephrine.",
  ],
  faqs: [
    {
      question: 'Does Southwest Airlines serve pistachios now?',
      answer:
        'Yes, as an exclusive snack in its Extra Legroom seats: Wonderful Pistachios No Shells, in Roasted & Salted and Honey Roasted flavors, with wider rollout from January 27, 2026. Other cabin sections continue to be offered Southwest\'s other snacks. Check Southwest\'s own snack page before you fly, since menus change.',
    },
    {
      question: 'Did Southwest Airlines used to be peanut-free?',
      answer:
        "Southwest stopped serving peanuts fleet-wide in 2018, specifically to reduce risk for passengers with peanut allergies. That policy wasn't reversed by the new pistachio snack, but pistachios are a different tree nut now being served on board, which is what has drawn allergy-community concern.",
    },
    {
      question: "What does FARE say about Southwest's pistachio snack?",
      answer:
        'FARE (Food Allergy Research & Education), the largest US food-allergy nonprofit, said it was "deeply concerned." Its CEO, Sung Poblete, said adding a known allergen to in-flight service without strong safety protocols increases risk for food-allergic passengers.',
    },
    {
      question: 'Can I ask Southwest for a different snack if I have a tree nut allergy?',
      answer:
        "Southwest has said it can offer an alternative snack to a passenger with a tree nut allergy. It has not committed to a buffer zone, a cabin announcement, or withholding the pistachio snack fleet-wide on a flight when notified, so ask the gate agent and crew directly before and during boarding.",
    },
    {
      question: 'Why did a college sports team boycott Southwest Airlines?',
      answer:
        'In February 2026, the University of Pittsburgh\'s softball program said it would boycott Southwest over the pistachio snack policy, arguing passenger safety was being weighed against a snack option for tree-nut-allergic travelers and teammates.',
    },
    {
      question: 'Should I avoid flying Southwest if I have a tree nut allergy?',
      answer:
        "That's a personal medical decision best made with your doctor or allergist, not something this article can decide for you. Practical steps regardless of airline: confirm the current snack menu before flying, notify the airline of your allergy, ask about alternatives, bring your own safe snacks, wipe down your seating area, and always carry your own prescribed epinephrine in the cabin.",
    },
  ],
  sources: [
    { label: "Southwest Airlines: current snack menu", url: SRC.southwestMenu },
    { label: 'Parade/AOL: "Southwest Airlines Marks Major Milestone With Cabin and In-Flight Menu Transformation" (Oct 15, 2025)', url: SRC.parade },
    { label: 'TravelPulse: "Southwest Airlines Makes Controversial Change to In-Flight Snacks" (updated Nov 3, 2025)', url: SRC.travelpulse },
    { label: 'Yahoo News: "Southwest upsets fliers with allergies by bringing pistachios on board" (FARE statement)', url: SRC.yahooFare },
    { label: 'Allergic Living: "Pistachios on Planes? Southwest Sparks Allergy Safety Concerns" (Oct 19, 2025)', url: SRC.allergicLiving },
    { label: 'SnackSafely.com: "Pistachios Over People? Pitt Softball Boycotts Southwest Airlines Over Dangerous New Snack Policy" (Feb 12, 2026)', url: SRC.snackSafely },
    { label: 'FARE: "Flying with Food Allergies"', url: SRC.fareFlying },
  ],
  Body,
};
