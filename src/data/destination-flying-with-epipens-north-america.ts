import { DestinationContent } from '@/types/definitions';
import airplaneTakeoffImage from '@/assets/airplane-takeoff.jpg';

export const flyingWithEpipensNorthAmericaContent: Partial<DestinationContent> = {
  title: "North America guide to flying with EpiPens and allergy medication",
  metaTitle: "North America guide to flying with EpiPens and allergy medication",
  metaDescription: "Clear guidance for traveling in the United States, Canada and Mexico with EpiPens and prescription medicines. Airport screening rules, airline expectations, and a practical packing checklist. Updated 21 September 2025.",
  imageUrl: airplaneTakeoffImage,
  
  intro: {
    title: "North America guide to flying with EpiPens and allergy medication",
    description: "If you live with food allergies, keep your EpiPens and all essential medication in your cabin bag and be ready to show them at security. Airports in the United States and Canada allow medically necessary items when you declare them, and many airlines prefer that you carry a short doctor letter or a copy of your prescription. That keeps your treatment within reach and speeds up screening.",
    quickTip: "Quick answer. EpiPens in your cabin bag. Declare medication at security. Bring proof of medical need for any needles and for liquid medicine in containers larger than 100 ml."
  },

  longDescription: `
    <h2>What the rules look like in practice</h2>

    <h3>United States</h3>
    <p>TSA allows larger amounts of medically necessary liquids, gels and aerosols in reasonable quantities for your trip when you declare them at the checkpoint. Unused syringes are allowed when they are accompanied by injectable medication. Keep medicines easy to show and expect additional screening if an item alarms the scanner.</p>

    <h3>Canada</h3>
    <p>CATSA confirms that prescription and essential non prescription medicines are exempt from the liquid limits when you declare them for inspection. Jet injectors such as EpiPens are permitted in carry on and checked baggage for personal medical use. Documentation is not mandatory but can help speed the process.</p>

    <h3>Mexico</h3>
    <p>Airports publish the standard 100 ml rule for regular liquids. Some airport and airline pages note that liquid medicines may be carried in hand baggage when you have a prescription and you bring only the quantity reasonably needed for your trip. Always check the security page of your departure airport and your airline before you fly.</p>

    <h2>What airlines say in North America</h2>
    <p>The common approach is straightforward. Keep medication and EpiPens in your cabin bag and carry a short note or a prescription when you travel with needles or syringes.</p>

    <h3>United States airlines</h3>
    
    <h4>American Airlines</h4>
    <p>The international travel guidance tells customers to carry medical documentation for medicines and a doctor letter if you need to use a syringe during flight.</p>
    
    <h4>United Airlines</h4>
    <p>The accessibility page states you may bring medical syringes in your carry on and recommends carrying proof of prescription in case security asks.</p>
    
    <h4>Delta Air Lines</h4>
    <p>The allergy page advises customers with peanut allergy to bring appropriate medication on board for example an EpiPen.</p>
    
    <h4>Southwest Airlines</h4>
    <p>The help center explains that needles and syringes used to inject medication are allowed past security when packed with the medication for which they are needed.</p>
    
    <h4>Alaska Airlines</h4>
    <p>The carry on exceptions page lists prescription medication and devices needed to administer them for example syringes and auto injections as accepted within the rules.</p>
    
    <h4>JetBlue</h4>
    <p>The medication help page says you may bring associated supplies for example syringes pens infusers and saline solution and that medication should remain with you in your hand baggage.</p>

    <h3>Canadian airlines</h3>
    
    <h4>Air Canada</h4>
    <p>The carry on page instructs you to keep prescription medication with you and explicitly permits syringes or hypodermic needles for personal medical use for example EpiPen when the needle guards are intact and the items are accompanied by the prescription medication with a printed label.</p>
    
    <h4>WestJet</h4>
    <p>The medical equipment and medication page accepts needles and syringes in your personal carry on item only when they are required to administer medication and accompanied by properly labelled medication. The airline also recommends carrying an epinephrine auto injector if prescribed for anaphylaxis.</p>

    <h3>Mexican airlines</h3>
    
    <h4>Aeroméxico</h4>
    <p>Follows the general liquid rules and refers customers to security restrictions on the baggage pages so keep medicines in hand baggage and carry a prescription if you need liquids for the flight.</p>
    
    <h4>Volaris</h4>
    <p>Advises travelers to carry medicines in hand baggage with a prescription and to take only reasonable quantities for the trip. The medical assistance page also notes that crew cannot administer medication.</p>
    
    <h4>Viva Aerobus</h4>
    <p>States that liquid medicines in containers larger than 100 ml must be accompanied by medical proof.</p>

    <h2>The smart way to pack and pass security</h2>
    <ul>
      <li>Place EpiPens and essential medicines in your cabin bag. Do not check them.</li>
      <li>Carry a short doctor letter or a copy of your prescription in English or Spanish as needed. A pharmacy label on the medicine helps at screening.</li>
      <li>At the checkpoint declare medication calmly and present it separately if requested. Use the phrase medically necessary if asked.</li>
      <li>If your medicine needs to stay cold pack a small ice or gel pack and keep it with the medication.</li>
      <li>Check the exact rules for every airport on your route 48 to 72 hours before departure. Screening procedures can differ between airports.</li>
    </ul>

    <h2>Doctor letter template</h2>
    <p>Keep the wording factual and brief. Print it or save it as a PDF on your phone.</p>
    <blockquote>
      <p>To whom it may concern</p>
      <p>Patient name and date of birth</p>
      <p>Diagnosis indicating risk of anaphylaxis</p>
      <p>Medication required on person at all times including during the flight</p>
      <p>Quantity for the trip for example two adrenaline auto injectors and an antihistamine syrup of 150 ml</p>
      <p>Physician name licence contact details date and signature</p>
    </blockquote>

    <h2>Bottom line</h2>
    <p>Carry your EpiPens and any essential medication in your cabin bag. Declare them at security. Bring proof that the treatment is yours and medically necessary. Check the exact airport and airline rules before you travel. If you follow these steps you will move through security quickly and focus on your trip.</p>
  `,

  faqs: [
    {
      question: "Can I carry EpiPens in my hand baggage in the United States and Canada",
      answer: "Yes. EpiPens and medically necessary medication belong in your cabin bag. Declare them at security and be ready for additional screening if requested."
    },
    {
      question: "Do I need a letter for syringes or liquid medicine over 100 ml",
      answer: "Carry a short letter or a prescription. Several airlines ask for documentation and a pharmacy label helps in Canada and Mexico."
    },
    {
      question: "What is different in Mexico",
      answer: "Airports publish the 100 ml rule for regular liquids. Some airport and airline pages say liquid medicines may be carried when you have a prescription and bring only what you reasonably need for the trip. Always check your airport and airline pages before you fly."
    },
    {
      question: "Can I bring a cooling gel pack for medication",
      answer: "Yes for medical purposes. Pack a small cooling element with the medicine in your cabin bag and present it at screening if asked."
    },
    {
      question: "Do airlines carry epinephrine on board",
      answer: "Airlines carry emergency medical kits. Many kits contain epinephrine in a vial rather than an auto injector. You should still carry your own prescribed auto injectors."
    }
  ],

  travelTips: []
};