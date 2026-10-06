import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { NewsArticle } from './types';

// Every factual claim below was checked against the primary source on
// 2026-10-06 (FAA newsroom, Federal Register API, Sen. Duckworth's press
// releases with full letter text, each airline's own policy page, and a
// law-firm summary of the DOT dismissal order). If you edit a claim,
// re-check it against the linked source and bump updatedAt.
const SRC = {
  faa: 'https://www.faa.gov/newsroom/statements/general-statements',
  nprm: 'https://www.federalregister.gov/documents/2026/08/05/2026-15929/improving-emergency-medical-kit-efficacy-and-flexibility-in-commercial-airline-operations',
  congressOct5: 'https://www.duckworth.senate.gov/news/press-releases/duckworth-schumer-matsui-lead-bipartisan-call-requiring-faa-to-guarantee-every-emergency-medical-kit-aboard-flights-include-life-saving-epinephrin',
  congressSept: 'https://www.duckworth.senate.gov/news/press-releases/duckworth-schumer-call-on-airlines-to-guarantee-that-emergency-medical-kits-aboard-their-commercial-planes-include-life-saving-epinephrine',
  dot: 'https://www.eckertseamans.com/stay-informed/blogs/aviation/dot-dismisses-allergy-related-complaint-against-southwest',
  delta: 'https://www.delta.com/us/en/accessible-travel-services/dietary-needs-and-allergies',
  american: 'https://www.aa.com/i18n/travel-info/experience/dining/special-meals-and-nut-allergies.html',
  ryanair: 'https://help.ryanair.com/hc/en-gb/articles/12894491842577-Can-I-travel-with-a-nut-allergy',
  airCanada: 'https://www.aircanada.com/ca/en/aco/home/plan/accessibility/severe-allergies.html',
  emirates: 'https://www.emirates.com/us/english/before-you-fly/travel/dietary-requirements/',
};

const Cite = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="text-blue-700 underline hover:text-blue-900">
    {children}
  </a>
);

const AUTO_INJECTOR_STATUS: { airline: string; status: string }[] = [
  { airline: 'American Airlines', status: 'Adult- and pediatric-dose auto-injectors in emergency medical kits' },
  { airline: 'JetBlue', status: 'Auto-injectors in emergency medical kits' },
  { airline: 'Southwest Airlines', status: 'Auto-injectors in emergency medical kits' },
  { airline: 'Breeze Airways', status: 'Auto-injectors in emergency medical kits' },
  { airline: 'Frontier Airlines', status: 'Auto-injectors in emergency medical kits' },
  { airline: 'Delta Air Lines', status: 'Fleet transition underway, planned by September 2027' },
  { airline: 'United Airlines', status: 'Work to add auto-injectors begins in 2026' },
  { airline: 'Allegiant Air', status: 'Work to add auto-injectors begins in 2026' },
];

const Body = () => (
  <>
    <p>
      Flying with a severe food allergy can be stressful, especially when airline policies differ significantly from
      one carrier to another.
    </p>
    <p>
      In 2026, food allergy safety in aviation is getting renewed attention. The US Federal Aviation Administration
      (FAA) has proposed rewriting the rules for the emergency medical kits carried on commercial aircraft, a group of
      US lawmakers is pushing for easy-to-use epinephrine on every flight, and a US Department of Transportation (DOT)
      decision has highlighted that preboarding protections currently differ by allergen.
    </p>
    <p>
      At the same time, airlines still take very different approaches. Some let passengers board early to clean their
      seating area. Some stop serving peanuts when told about an allergic passenger. Some make cabin announcements or
      create buffer zones. Others say plainly that they cannot change onboard food service because of an allergy.
    </p>

    <h2>What is changing for airline passengers with food allergies in 2026?</h2>
    <p>
      The biggest development concerns emergency treatment for anaphylaxis on US commercial flights.
    </p>
    <p>
      On <strong>August 4, 2026</strong>, the FAA announced a proposal to modernize the requirements for emergency
      medical kits on commercial airplanes (<Cite href={SRC.faa}>FAA</Cite>). The formal Notice of Proposed
      Rulemaking was published in the Federal Register on August 5 (Docket FAA-2026-9178), with public comments
      closing on <strong>October 5, 2026</strong> (<Cite href={SRC.nprm}>Federal Register</Cite>).
    </p>
    <p>
      Instead of today's fixed checklist of required items, the proposal would adopt a performance-based standard:
      airlines would decide what to carry, as long as their kits are "practical and sufficient" to manage nine
      life-threatening conditions. <strong>Anaphylaxis (severe allergic reaction) is one of the nine</strong>, along
      with cardiac emergencies, breathing difficulties, gastrointestinal emergencies, opioid overdoses, childbirth,
      seizures, major bleeding and hypoglycemia (<Cite href={SRC.faa}>FAA</Cite>).
    </p>
    <p>
      That is what worries food allergy advocates. Current FAA rules require each kit to contain epinephrine (two
      single-dose 1:1,000 ampules or equivalent). Under the proposal, epinephrine would no longer be on a mandatory
      list; the FAA's guidance would only say that treatment options for anaphylaxis "could include medication such as
      epinephrine" (<Cite href={SRC.congressOct5}>congressional comment letter, quoting the proposal</Cite>).
    </p>
    <p>
      Epinephrine is the first-line treatment for anaphylaxis. For a passenger having a severe reaction at 35,000 feet,
      whether epinephrine is on board, and in what form, can matter a great deal.
    </p>

    <h2>Will airlines be required to carry epinephrine auto-injectors?</h2>
    <p>
      Not under current rules, and not under the FAA's proposal as written.
    </p>
    <p>
      On <strong>October 5, 2026</strong>, the last day of the comment period, a bipartisan, bicameral group of 20 US
      lawmakers led by Senator Tammy Duckworth, Senate Democratic Leader Chuck Schumer and Representative Doris Matsui
      filed a formal comment asking the FAA to guarantee that every emergency medical kit includes epinephrine in an
      FDA-approved form designed to be easily self-administered by people without medical training, such as an
      auto-injector, rather than a vial that must be measured and drawn up with a syringe. They noted that the FAA's own
      expert working group had recommended a "pre-measured auto-delivery device" in its May 2025 report (
      <Cite href={SRC.congressOct5}>Sen. Duckworth press release, Oct 5, 2026</Cite>).
    </p>
    <p>
      This matters because anaphylaxis can progress within minutes. A vial and syringe may contain epinephrine, but
      giving the right dose takes more knowledge and more steps than using an auto-injector. In a September 2026 letter
      to airline CEOs, the same senators described a 2019 case in which a physician on board had to calculate and draw
      a diluted dose from a cardiac-arrest epinephrine vial to treat a passenger in anaphylaxis (
      <Cite href={SRC.congressSept}>Sen. Duckworth press release, Sept 2026</Cite>).
    </p>
    <p>
      For families traveling with children who have severe food allergies, this debate is worth following. The FAA
      must now review the comments before issuing any final rule.
    </p>

    <h2>Which US airlines currently carry epinephrine auto-injectors?</h2>
    <p>
      According to the lawmakers' October 5, 2026 letter to the FAA, which drew on airlines' answers to the senators'
      September inquiry, several US carriers already stock auto-injectors or are adding them:
    </p>
    <div className="not-prose overflow-x-auto my-6">
      <table className="w-full text-sm border border-gray-200 rounded-lg">
        <caption className="sr-only">Epinephrine auto-injector status by US airline, as reported to Congress in 2026</caption>
        <thead className="bg-blue-50 text-left">
          <tr>
            <th scope="col" className="p-3 font-semibold text-blue-900">Airline</th>
            <th scope="col" className="p-3 font-semibold text-blue-900">Reported status (October 2026)</th>
          </tr>
        </thead>
        <tbody>
          {AUTO_INJECTOR_STATUS.map((row) => (
            <tr key={row.airline} className="border-t border-gray-200">
              <th scope="row" className="p-3 font-medium text-gray-900">{row.airline}</th>
              <td className="p-3 text-gray-700">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-2">
        Source: <Cite href={SRC.congressOct5}>October 5, 2026 letter to the FAA</Cite> led by Sen. Tammy Duckworth,
        Sen. Chuck Schumer and Rep. Doris Matsui.
      </p>
    </div>
    <p>
      This is not a ranking of airline safety. Aircraft equipment can change, the airline operating your flight may
      differ from the one on your booking, and anyone prescribed epinephrine should still carry their own.
    </p>

    <h2>Can passengers with food allergies board an airplane early?</h2>
    <p>Sometimes, and in the US it currently depends on which food you are allergic to.</p>
    <p>
      On <strong>March 18, 2026</strong>, the DOT's Office of Aviation Consumer Protection dismissed a complaint filed
      in 2022 by food allergy nonprofits against Southwest Airlines. The groups argued that refusing to let passengers
      with food allergies preboard to wipe down their seating area violated the Air Carrier Access Act (
      <Cite href={SRC.dot}>Eckert Seamans summary of the DOT order</Cite>).
    </p>
    <p>
      DOT acknowledged that dairy, egg or shellfish allergies can be as dangerous as nut allergies, but concluded that
      the right to preboard to clean the seating area has so far only been tied to nut allergies. Because Southwest had
      reinstated preboarding for passengers with nut allergies, DOT dismissed the complaint, and said that extending the
      protection to all food allergies would be better handled through formal notice-and-comment rulemaking (
      <Cite href={SRC.dot}>Eckert Seamans</Cite>).
    </p>
    <p>
      In practice, a passenger with a severe peanut or tree nut allergy currently has clearer US precedent for
      allergy-related preboarding than a passenger with a severe milk, egg, sesame or other food allergy. That may
      change if DOT opens a rulemaking.
    </p>

    <h2>What is Delta Air Lines' food allergy policy?</h2>
    <p>Delta has one of the more detailed public allergy policies among major airlines (<Cite href={SRC.delta}>Delta</Cite>):</p>
    <ul>
      <li>
        <strong>Peanut allergy:</strong> when notified, Delta says it will refrain from serving peanuts and peanut
        products on your flight and offer non-peanut snacks instead.
      </li>
      <li>
        <strong>Early boarding:</strong> passengers with peanut, tree nut, other food or other severe allergies can ask
        the gate agent to preboard to clean their seat area. You must bring your own cleaning materials.
      </li>
      <li>
        <strong>Seat changes:</strong> Delta says it will help with seat changes when needed because of an allergy.
      </li>
      <li>
        <strong>How to notify:</strong> through the Accessibility Service Request form in My Trips, or Delta's
        Accessibility Services team. If a partner airline operates part of your trip, contact that carrier too.
      </li>
    </ul>
    <p>
      Note that the "stop serving" commitment applies to peanuts specifically. Delta also states that it cannot
      guarantee a peanut-free or allergen-free flight or prohibit other customers from bringing these products on board.
    </p>

    <h2>Does American Airlines provide a nut-free flight?</h2>
    <p>
      No. American says it doesn't serve peanuts but does serve other nut products (such as warmed nuts), and that
      meals and snacks may contain traces of unspecified nut ingredients, including peanut oils. Other customers may
      bring peanuts or tree nuts on board (<Cite href={SRC.american}>American Airlines</Cite>).
    </p>
    <p>
      American says it can't accommodate requests to not serve certain foods or to provide nut "buffer zones," and that
      while its planes are cleaned regularly, it can't guarantee removal of nut allergens from surfaces or air filters.
      It notes that allergen information is available on board flights departing EU countries.
    </p>
    <p>
      Yet according to the lawmakers' letter, American's emergency medical kits carry both adult- and pediatric-dose
      epinephrine auto-injectors (<Cite href={SRC.congressOct5}>Oct 5 letter</Cite>). That is a good illustration of why
      it pays to look at each part of an airline's approach, rather than searching for a simple "allergy-friendly
      airline" label.
    </p>

    <h2>What does Ryanair do for passengers with nut allergies?</h2>
    <p>
      Ryanair asks passengers with nut allergies to tell the cabin crew when boarding. The crew then makes an
      announcement informing other passengers and advising that no products containing nuts will be sold on board.
      Other passengers are asked not to open peanut products, but Ryanair says it cannot guarantee a peanut-free
      aircraft (<Cite href={SRC.ryanair}>Ryanair Help Centre</Cite>).
    </p>
    <p>An announcement can reduce exposure risk, but it does not create an allergen-free cabin.</p>

    <h2>Does Air Canada offer an allergy buffer zone?</h2>
    <p>
      Yes. For severe allergies, including food allergies such as peanuts and nuts, Air Canada can set up a seat buffer
      zone. Its size depends on the aircraft type, cabin and seating configuration. Passengers seated in the zone are
      asked before departure not to eat products containing the allergen (to the extent possible), and are not offered
      food known to contain it from the onboard café (<Cite href={SRC.airCanada}>Air Canada</Cite>).
    </p>
    <p>
      Air Canada asks for at least 48 hours' advance notice to request a buffer zone, and says it cannot guarantee
      allergen-free meals, snacks or environment. If your trip includes a codeshare or partner-operated flight, confirm
      the operating carrier's procedures as well.
    </p>

    <h2>What is Emirates' food allergy policy?</h2>
    <p>Emirates takes a more limited approach (<Cite href={SRC.emirates}>Emirates</Cite>):</p>
    <ul>
      <li>It serves nuts and foods containing allergens on all its flights and cannot guarantee an allergen-free environment.</li>
      <li>Unless required by applicable law, it does not make inflight announcements for passengers with allergies.</li>
      <li>
        Its special meals, including gluten-intolerant and lactose-intolerant meals, are produced in facilities that
        handle a wide range of allergens, so no meal is guaranteed free of allergen traces.
      </li>
      <li>
        It recommends discussing an allergy action plan with your doctor, carrying prescribed medication (including
        epinephrine auto-injectors), bringing your own food that needs no refrigeration or heating, and informing
        Emirates of severe allergies in advance.
      </li>
    </ul>

    <h2>Are any airlines completely allergy-free?</h2>
    <p>
      No major airline guarantees an allergen-free aircraft. Passengers bring their own food, aircraft fly several
      sectors a day, residue can remain on seats and tray tables, and catering facilities handle multiple allergens.
    </p>
    <p>
      So the useful question is not "Is this airline allergy-free?" but <strong>"What precautions will this airline take
      for my specific allergy?"</strong> Factors worth comparing:
    </p>
    <ol>
      <li>Whether the airline records your allergy before travel</li>
      <li>Whether you can preboard to clean your seating area</li>
      <li>Whether it will stop serving a particular allergen</li>
      <li>Whether the crew will make a cabin announcement</li>
      <li>Whether a buffer zone is available</li>
      <li>Whether allergen information is available for onboard food</li>
      <li>What emergency medication (and in what form) is carried on board</li>
      <li>How cabin crew are trained to respond to suspected anaphylaxis</li>
    </ol>
    <p>These vary considerably between airlines, and sometimes between routes.</p>

    <h2>Should travelers rely on an airline's onboard epinephrine?</h2>
    <p>
      No. Even if an airline reports carrying auto-injectors, anyone prescribed emergency medication should carry their
      own, in the cabin rather than in checked luggage, according to their medical plan. Treat airline equipment as a
      backup, not a replacement. For security-screening and carry-on rules, see our guides to{' '}
      <Link to="/destinations/flying-with-epipens-north-america/">flying with EpiPens in North America</Link> and{' '}
      <Link to="/destinations/flying-with-epipens/">flying with EpiPens in Europe</Link>.
    </p>
    <p>Discuss your travel plan with your physician or allergy specialist before flying.</p>

    <h2>What should you ask an airline before flying with a severe food allergy?</h2>
    <p>Don't settle for "we accommodate allergies." Before booking, ask specifically:</p>
    <ul>
      <li>Can my allergy be added to my reservation?</li>
      <li>Can I preboard to clean my seat and tray table?</li>
      <li>Will you change snack or meal service for my allergen?</li>
      <li>Will the crew make an announcement?</li>
      <li>Is a buffer zone available, and how much notice do you need?</li>
      <li>How is allergen information for meals provided?</li>
      <li>If a partner airline operates the flight, what is <em>its</em> policy?</li>
    </ul>
    <p>
      Check the policy again shortly before departure, since procedures change. If you're traveling abroad, an{' '}
      <Link to="/allergy-translation-card/">allergy translation card</Link> can help you communicate with crew and
      restaurant staff.
    </p>

    <h2>Why 2026 could be an important year for airline food allergy safety</h2>
    <p>The US debate goes beyond one airline or one allergen. It raises broader questions:</p>
    <ul>
      <li>Should epinephrine auto-injectors be standard equipment on commercial aircraft?</li>
      <li>Should passengers with any severe food allergy have the same right to preboard?</li>
      <li>Should airlines publish clearer allergen information for inflight meals?</li>
      <li>Should airline allergy policies become more standardized internationally?</li>
    </ul>
    <p>
      There is currently no single worldwide standard covering these issues, which is why comparing airline policies
      before booking remains so important.
    </p>
  </>
);

export const airlineFoodAllergyPolicies2026: NewsArticle = {
  slug: 'airline-food-allergy-policies-2026',
  title: 'Airline Food Allergy Policies Are Changing in 2026: What Travelers Need to Know',
  seoTitle: 'Airline Food Allergy Policies 2026: What Travelers Need to Know',
  description:
    'Airline food allergy policies are changing in 2026. Learn about epinephrine on planes, allergy preboarding, nut policies and passenger protections.',
  publishedAt: '2026-10-06',
  updatedAt: '2026-10-06',
  heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  heroAlt: 'Airplane wing above the clouds',
  heroCredit: 'Photo: Unsplash',
  keyTakeaways: [
    'On August 4, 2026, the FAA proposed replacing the fixed list of emergency medical kit contents with a performance standard covering nine conditions, including anaphylaxis. Epinephrine would no longer be mandatory. Comments closed October 5, 2026.',
    'On October 5, 2026, 20 US lawmakers asked the FAA to require easy-to-use epinephrine (such as auto-injectors) on every flight. American, JetBlue, Southwest, Breeze and Frontier already carry auto-injectors; Delta, United and Allegiant are adding them.',
    'In March 2026, the US DOT said the right to preboard to clean your seat is currently tied only to nut allergies; extending it to other food allergies would require rulemaking.',
    'Policies differ widely: Delta stops serving peanuts on request, Ryanair stops selling nut products and makes an announcement, Air Canada offers buffer zones, while American and Emirates say they cannot change onboard food service.',
    'No airline guarantees an allergen-free flight. Always carry your own prescribed epinephrine and confirm the operating carrier\'s policy before you fly.',
  ],
  faqs: [
    {
      question: 'Do airplanes carry EpiPens?',
      answer:
        'Some do. According to an October 2026 letter from US lawmakers, American, JetBlue, Southwest, Breeze and Frontier carry epinephrine auto-injectors in their emergency medical kits, Delta plans to complete the switch by September 2027, and United and Allegiant begin adding them in 2026. Other aircraft typically carry epinephrine in vials that must be measured with a syringe. Passengers prescribed epinephrine should always carry their own.',
    },
    {
      question: 'Can I preboard a flight if I have a food allergy?',
      answer:
        'Often, yes, but it depends on the airline and the allergen. Delta, for example, accepts preboarding requests for peanut, tree nut and other severe allergies. In the US, the DOT said in March 2026 that the right to preboard to clean the seating area has so far only been tied to nut allergies. Ask the airline in advance and tell the gate agent before boarding.',
    },
    {
      question: 'Will airlines stop serving nuts if a passenger has a nut allergy?',
      answer:
        'Some will and some will not. Delta says it will refrain from serving peanuts when notified of a peanut allergy. Ryanair says it will not sell nut products after the crew is informed. American Airlines and Emirates say they cannot change onboard food service because of an allergy.',
    },
    {
      question: 'Can an airline guarantee a nut-free flight?',
      answer:
        'No. Airlines cannot control food other passengers bring on board and cannot guarantee that allergen residue is absent from seats, tray tables or the cabin air.',
    },
    {
      question: 'Which airline is best for passengers with food allergies?',
      answer:
        'No single airline is safest for every food allergy. Compare the specific accommodations that matter to you: preboarding, whether service of your allergen can be stopped, cabin announcements, buffer zones, allergen information for meals, and whether auto-injectors are carried. Always check the policy of the airline actually operating the flight.',
    },
    {
      question: 'Is epinephrine required on every US commercial flight?',
      answer:
        'Under current FAA rules, emergency medical kits must contain epinephrine (two single-dose ampules or equivalent), usually as vials rather than auto-injectors. The FAA\'s August 2026 proposal would remove epinephrine from the mandatory list and only suggest it as a possible treatment for anaphylaxis. The comment period closed on October 5, 2026; as of October 6, 2026, no final rule has been issued and there is no requirement to carry auto-injectors.',
    },
  ],
  sources: [
    { label: 'FAA: "FAA Issues Emergency Medical Kit Modernization Proposal" (Aug 4, 2026)', url: SRC.faa },
    { label: 'Federal Register: Improving Emergency Medical Kit Efficacy and Flexibility in Commercial Airline Operations (Aug 5, 2026)', url: SRC.nprm },
    { label: 'Sen. Tammy Duckworth: 20 lawmakers\' comment letter to the FAA (Oct 5, 2026)', url: SRC.congressOct5 },
    { label: 'Sen. Tammy Duckworth: letter to airline CEOs on emergency medical kits (Sept 2026)', url: SRC.congressSept },
    { label: 'Eckert Seamans: DOT dismisses allergy-related complaint against Southwest (Mar 2026)', url: SRC.dot },
    { label: 'Delta Air Lines: Dietary Needs & Allergies', url: SRC.delta },
    { label: 'American Airlines: Special meals and nut allergies', url: SRC.american },
    { label: 'Ryanair Help Centre: Can I travel with a nut allergy?', url: SRC.ryanair },
    { label: 'Air Canada: Severe allergies', url: SRC.airCanada },
    { label: 'Emirates: Dietary requirements', url: SRC.emirates },
  ],
  Body,
};
