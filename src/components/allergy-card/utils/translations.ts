/**
 * Complete translation data for allergy card text in multiple languages
 */

export interface TranslationData {
  [key: string]: {
    title: string;
    mainText: string;
    allergyPrefix: string;
    crossContamination: string;
    thankYou: string;
  };
}

export const COMPLETE_TRANSLATIONS: TranslationData = {
  // English (original)
  en: {
    title: "FOOD ALLERGY NOTIFICATION",
    mainText: "I have severe allergies to the following foods:",
    allergyPrefix: "",
    crossContamination: "Cross-contamination can cause a serious allergic reaction. Please ensure that my meal is prepared without these allergens and that all cooking utensils and surfaces are thoroughly cleaned before preparing my food.",
    thankYou: "Thank you for your assistance in this important health matter."
  },

  // Hebrew - עברית
  he: {
    title: "הודעה על אלרגיות מזון",
    mainText: "יש לי אלרגיות חמורות למזונות הבאים:",
    allergyPrefix: "",
    crossContamination: "זיהום צולב יכול לגרום לתגובה אלרגית חמורה. אנא וודאו שהארוחה שלי מוכנה ללא האלרגנים הללו וכי כל כלי הבישול והמשטחים נוקו ביסודיות לפני הכנת האוכל שלי.",
    thankYou: "תודה על עזרתכם בעניין בריאותי חשוב זה."
  },

  // Spanish - Español
  es: {
    title: "NOTIFICACIÓN DE ALERGIA ALIMENTARIA",
    mainText: "Tengo alergias graves a los siguientes alimentos:",
    allergyPrefix: "",
    crossContamination: "La contaminación cruzada puede causar una reacción alérgica grave. Por favor, asegúrese de que mi comida se prepare sin estos alérgenos y que todos los utensilios de cocina y superficies se limpien completamente antes de preparar mi comida.",
    thankYou: "Gracias por su asistencia en este importante asunto de salud."
  },

  // French - Français
  fr: {
    title: "NOTIFICATION D'ALLERGIE ALIMENTAIRE",
    mainText: "J'ai de graves allergies aux aliments suivants:",
    allergyPrefix: "",
    crossContamination: "La contamination croisée peut provoquer une réaction allergique grave. Veuillez vous assurer que mon repas est préparé sans ces allergènes et que tous les ustensiles de cuisine et surfaces sont soigneusement nettoyés avant de préparer ma nourriture.",
    thankYou: "Merci pour votre aide dans cette importante question de santé."
  },

  // German - Deutsch
  de: {
    title: "LEBENSMITTELALLERGIE-MITTEILUNG",
    mainText: "Ich habe schwere Allergien gegen folgende Lebensmittel:",
    allergyPrefix: "",
    crossContamination: "Kreuzkontamination kann eine schwere allergische Reaktion verursachen. Bitte stellen Sie sicher, dass mein Essen ohne diese Allergene zubereitet wird und dass alle Kochutensilien und Oberflächen gründlich gereinigt werden, bevor mein Essen zubereitet wird.",
    thankYou: "Vielen Dank für Ihre Hilfe in dieser wichtigen Gesundheitsangelegenheit."
  },

  // Italian - Italiano
  it: {
    title: "NOTIFICA DI ALLERGIA ALIMENTARE",
    mainText: "Ho gravi allergie ai seguenti alimenti:",
    allergyPrefix: "",
    crossContamination: "La contaminazione incrociata può causare una grave reazione allergica. Vi prego di assicurarvi che il mio pasto sia preparato senza questi allergeni e che tutti gli utensili da cucina e le superfici siano accuratamente puliti prima di preparare il mio cibo.",
    thankYou: "Grazie per la vostra assistenza in questa importante questione di salute."
  },

  // Japanese - 日本語
  ja: {
    title: "食物アレルギー通知",
    mainText: "私は以下の食品に重篤なアレルギーがあります：",
    allergyPrefix: "",
    crossContamination: "交差汚染は重篤なアレルギー反応を引き起こす可能性があります。私の食事がこれらのアレルゲンなしで調理され、すべての調理器具と表面が私の食事を準備する前に徹底的に清掃されることを確認してください。",
    thankYou: "この重要な健康問題でのご協力をありがとうございます。"
  },

  // Korean - 한국어
  ko: {
    title: "음식 알레르기 알림",
    mainText: "저는 다음 음식들에 심각한 알레르기가 있습니다:",
    allergyPrefix: "",
    crossContamination: "교차 오염은 심각한 알레르기 반응을 일으킬 수 있습니다. 제 음식이 이러한 알레르겐 없이 준비되고, 모든 조리 도구와 표면이 제 음식을 준비하기 전에 철저히 청소되도록 해주시기 바랍니다.",
    thankYou: "이 중요한 건강 문제에 대한 도움을 주셔서 감사합니다."
  },

  // Chinese (Simplified) - 中文 (简体)
  zh: {
    title: "食物过敏通知",
    mainText: "我对以下食物有严重过敏：",
    allergyPrefix: "",
    crossContamination: "交叉污染可能引起严重的过敏反应。请确保我的餐食在没有这些过敏原的情况下准备，并且所有烹饪用具和表面在准备我的食物之前都要彻底清洁。",
    thankYou: "感谢您在这个重要健康问题上的协助。"
  },

  // Russian - Русский
  ru: {
    title: "УВЕДОМЛЕНИЕ О ПИЩЕВОЙ АЛЛЕРГИИ",
    mainText: "У меня серьезная аллергия на следующие продукты:",
    allergyPrefix: "",
    crossContamination: "Перекрестное загрязнение может вызвать серьезную аллергическую реакцию. Пожалуйста, убедитесь, что моя еда приготовлена без этих аллергенов и что все кухонные принадлежности и поверхности тщательно очищены перед приготовлением моей пищи.",
    thankYou: "Спасибо за помощь в этом важном вопросе здоровья."
  },

  // Arabic - العربية
  ar: {
    title: "إشعار حساسية الطعام",
    mainText: "لدي حساسية شديدة من الأطعمة التالية:",
    allergyPrefix: "",
    crossContamination: "التلوث المتبادل يمكن أن يسبب رد فعل تحسسي خطير. يرجى التأكد من أن وجبتي محضرة بدون هذه المواد المسببة للحساسية وأن جميع أدوات الطبخ والأسطح تم تنظيفها بدقة قبل تحضير طعامي.",
    thankYou: "شكراً لمساعدتكم في هذه المسألة الصحية المهمة."
  },

  // Hindi - हिंदी
  hi: {
    title: "खाद्य एलर्जी सूचना",
    mainText: "मुझे निम्नलिखित खाद्य पदार्थों से गंभीर एलर्जी है:",
    allergyPrefix: "",
    crossContamination: "क्रॉस-संदूषण गंभीर एलर्जी प्रतिक्रिया का कारण बन सकता है। कृपया सुनिश्चित करें कि मेरा भोजन इन एलर्जेन के बिना तैयार किया गया है और मेरा भोजन तैयार करने से पहले सभी खाना पकाने के बर्तन और सतहों को अच्छी तरह से साफ किया गया है।",
    thankYou: "इस महत्वपूर्ण स्वास्थ्य मामले में आपकी सहायता के लिए धन्यवाद।"
  },

  // Portuguese - Português
  pt: {
    title: "NOTIFICAÇÃO DE ALERGIA ALIMENTAR",
    mainText: "Eu tenho alergias graves aos seguintes alimentos:",
    allergyPrefix: "",
    crossContamination: "A contaminação cruzada pode causar uma reação alérgica grave. Por favor, certifique-se de que minha refeição seja preparada sem esses alérgenos e que todos os utensílios de cozinha e superfícies sejam cuidadosamente limpos antes de preparar minha comida.",
    thankYou: "Obrigado por sua assistência neste importante assunto de saúde."
  },

  // Dutch - Nederlands
  nl: {
    title: "VOEDSELALLERGIEMELDING",
    mainText: "Ik heb ernstige allergieën voor de volgende voedingsmiddelen:",
    allergyPrefix: "",
    crossContamination: "Kruisbesmetting kan een ernstige allergische reactie veroorzaken. Zorg ervoor dat mijn maaltijd wordt bereid zonder deze allergenen en dat alle kookgerei en oppervlakken grondig worden schoongemaakt voordat mijn voedsel wordt bereid.",
    thankYou: "Dank u voor uw hulp in deze belangrijke gezondheidskwestie."
  },

  // Turkish - Türkçe
  tr: {
    title: "GIDA ALERJİSİ BİLDİRİMİ",
    mainText: "Aşağıdaki gıdalara karşı ciddi alerjim var:",
    allergyPrefix: "",
    crossContamination: "Çapraz kontaminasyon ciddi alerjik reaksiyona neden olabilir. Lütfen yemeğimin bu alerjenler olmadan hazırlandığından ve tüm pişirme gereçleri ile yüzeylerin yemeğim hazırlanmadan önce iyice temizlendiğinden emin olun.",
    thankYou: "Bu önemli sağlık konusundaki yardımınız için teşekkür ederim."
  },

  // Polish - Polski
  pl: {
    title: "POWIADOMIENIE O ALERGII POKARMOWEJ",
    mainText: "Mam poważne alergie na następujące produkty spożywcze:",
    allergyPrefix: "",
    crossContamination: "Zanieczyszczenie krzyżowe może wywołać poważną reakcję alergiczną. Proszę upewnić się, że mój posiłek jest przygotowany bez tych alergenów i że wszystkie przybory kuchenne i powierzchnie są dokładnie wyczyszczone przed przygotowaniem mojego jedzenia.",
    thankYou: "Dziękuję za pomoc w tej ważnej sprawie zdrowotnej."
  },

  // Vietnamese - Tiếng Việt
  vi: {
    title: "THÔNG BÁO DỊ ỨNG THỰC PHẨM",
    mainText: "Tôi bị dị ứng nghiêm trọng với các loại thực phẩm sau:",
    allergyPrefix: "",
    crossContamination: "Ô nhiễm chéo có thể gây phản ứng dị ứng nghiêm trọng. Vui lòng đảm bảo rằng bữa ăn của tôi được chuẩn bị mà không có những chất gây dị ứng này và tất cả dụng cụ nấu ăn và bề mặt được làm sạch kỹ lưỡng trước khi chuẩn bị thức ăn của tôi.",
    thankYou: "Cảm ơn sự hỗ trợ của bạn trong vấn đề sức khỏe quan trọng này."
  },

  // Thai - ไทย
  th: {
    title: "การแจ้งเตือนการแพ้อาหาร",
    mainText: "ฉันแพ้อาหารชนิดต่อไปนี้อย่างรุนแรง:",
    allergyPrefix: "",
    crossContamination: "การปนเปื้อนข้ามสามารถทำให้เกิดอาการแพ้ที่รุนแรงได้ กรุณาตรวจสอบให้แน่ใจว่าอาหารของฉันถูกเตรียมโดยไม่มีสารก่อภูมิแพ้เหล่านี้ และอุปกรณ์การทำอาหารและพื้นผิวทั้งหมดถูกทำความสะอาดอย่างละเอียดก่อนเตรียมอาหารของฉัน",
    thankYou: "ขอบคุณสำหรับความช่วยเหลือในเรื่องสุขภาพที่สำคัญนี้"
  },

  // Swedish - Svenska
  sv: {
    title: "MEDDELANDE OM MATALLERGI",
    mainText: "Jag har allvarliga allergier mot följande livsmedel:",
    allergyPrefix: "",
    crossContamination: "Korsförorening kan orsaka en allvarlig allergisk reaktion. Se till att min måltid tillagas utan dessa allergener och att alla köksredskap och ytor rengörs noggrant innan min mat tillagas.",
    thankYou: "Tack för er hjälp i denna viktiga hälsofråga."
  },

  // Danish - Dansk
  da: {
    title: "MEDDELELSE OM FØDEVAREALLERGI",
    mainText: "Jeg har alvorlige allergier over for følgende fødevarer:",
    allergyPrefix: "",
    crossContamination: "Krydskontamination kan forårsage en alvorlig allergisk reaktion. Sørg venligst for, at mit måltid tilberedes uden disse allergener, og at alt køkkentøj og overflader rengøres grundigt, før min mad tilberedes.",
    thankYou: "Tak for jeres hjælp i denne vigtige sundhedssag."
  },

  // Finnish - Suomi
  fi: {
    title: "RUOKA-ALLERGIATIEDOTUS",
    mainText: "Minulla on vakavia allergioita seuraaville ruoille:",
    allergyPrefix: "",
    crossContamination: "Ristikontaminaatio voi aiheuttaa vakavan allergisen reaktion. Varmistakaa, että ruokani valmistetaan ilman näitä allergeeneja ja että kaikki keittiövälineet ja pinnat puhdistetaan perusteellisesti ennen ruokani valmistamista.",
    thankYou: "Kiitos avustanne tässä tärkeässä terveysasiassa."
  },

  // Norwegian - Norsk
  no: {
    title: "VARSEL OM MATALLERGI",
    mainText: "Jeg har alvorlige allergier mot følgende matvarer:",
    allergyPrefix: "",
    crossContamination: "Kryssforurensning kan forårsake en alvorlig allergisk reaksjon. Vennligst sørg for at måltidet mitt tilberedes uten disse allergenene og at alle kjøkkenutstyr og overflater rengjøres grundig før maten min tilberedes.",
    thankYou: "Takk for hjelpen i denne viktige helsesaken."
  },

  // Greek - Ελληνικά
  el: {
    title: "ΕΙΔΟΠΟΙΗΣΗ ΑΛΛΕΡΓΙΑΣ ΤΡΟΦΙΜΩΝ",
    mainText: "Έχω σοβαρές αλλεργίες στα παρακάτω τρόφιμα:",
    allergyPrefix: "",
    crossContamination: "Η διασταυρούμενη μόλυνση μπορεί να προκαλέσει σοβαρή αλλεργική αντίδραση. Παρακαλώ βεβαιωθείτε ότι το φαγητό μου προετοιμάζεται χωρίς αυτά τα αλλεργιογόνα και ότι όλα τα μαγειρικά σκεύη και οι επιφάνειες καθαρίζονται διεξοδικά πριν από την προετοιμασία του φαγητού μου.",
    thankYou: "Σας ευχαριστώ για τη βοήθειά σας σε αυτό το σημαντικό θέμα υγείας."
  },

  // Czech - Čeština
  cs: {
    title: "OZNÁMENÍ O POTRAVINOVÉ ALERGII",
    mainText: "Mám vážné alergie na následující potraviny:",
    allergyPrefix: "",
    crossContamination: "Křížová kontaminace může způsobit vážnou alergickou reakci. Ujistěte se prosím, že mé jídlo je připraveno bez těchto alergenů a že všechno kuchyňské náčíní a povrchy jsou důkladně vyčištěny před přípravou mého jídla.",
    thankYou: "Děkuji za vaši pomoc v této důležité zdravotní záležitosti."
  },

  // Hungarian - Magyar
  hu: {
    title: "ÉLELMISZER-ALLERGIA ÉRTESÍTÉS",
    mainText: "Súlyos allergiám van a következő ételekre:",
    allergyPrefix: "",
    crossContamination: "A keresztszennyeződés súlyos allergiás reakciót okozhat. Kérjük, győződjenek meg arról, hogy az ételem ezen allergének nélkül készül, és hogy minden konyhai eszköz és felület alaposan meg van tisztítva az ételem elkészítése előtt.",
    thankYou: "Köszönöm a segítségüket ebben a fontos egészségügyi kérdésben."
  }
};

export const allergyTranslations: Record<string, Record<string, string>> = {
  // Common allergens translated to all languages
  en: {
    "Milk": "Milk",
    "Eggs": "Eggs", 
    "Tree nuts": "Tree nuts",
    "Peanuts": "Peanuts",
    "Shellfish": "Shellfish",
    "Fish": "Fish",
    "Soy": "Soy",
    "Wheat": "Wheat",
    "Sesame": "Sesame",
    "Celery": "Celery",
    "Mustard": "Mustard",
    "Lupin": "Lupin",
    "Sulphites": "Sulphites",
    "Molluscs": "Molluscs"
  },
  he: {
    "Milk": "חלב",
    "Eggs": "ביצים",
    "Tree nuts": "אגוזי עץ",
    "Peanuts": "בוטנים",
    "Shellfish": "פירות ים",
    "Fish": "דגים",
    "Soy": "סויה",
    "Wheat": "חיטה",
    "Sesame": "שומשום",
    "Celery": "סלרי",
    "Mustard": "חרדל",
    "Lupin": "תורמוס",
    "Sulphites": "סולפיטים",
    "Molluscs": "רכיכות"
  },
  es: {
    "Milk": "Leche",
    "Eggs": "Huevos",
    "Tree nuts": "Frutos secos",
    "Peanuts": "Cacahuetes",
    "Shellfish": "Mariscos",
    "Fish": "Pescado",
    "Soy": "Soja",
    "Wheat": "Trigo",
    "Sesame": "Sésamo",
    "Celery": "Apio",
    "Mustard": "Mostaza",
    "Lupin": "Altramuz",
    "Sulphites": "Sulfitos",
    "Molluscs": "Moluscos"
  },
  fr: {
    "Milk": "Lait",
    "Eggs": "Œufs",
    "Tree nuts": "Noix",
    "Peanuts": "Arachides",
    "Shellfish": "Fruits de mer",
    "Fish": "Poisson",
    "Soy": "Soja",
    "Wheat": "Blé",
    "Sesame": "Sésame",
    "Celery": "Céleri",
    "Mustard": "Moutarde",
    "Lupin": "Lupin",
    "Sulphites": "Sulfites",
    "Molluscs": "Mollusques"
  },
  de: {
    "Milk": "Milch",
    "Eggs": "Eier",
    "Tree nuts": "Nüsse",
    "Peanuts": "Erdnüsse",
    "Shellfish": "Schalentiere",
    "Fish": "Fisch",
    "Soy": "Soja",
    "Wheat": "Weizen",
    "Sesame": "Sesam",
    "Celery": "Sellerie",
    "Mustard": "Senf",
    "Lupin": "Lupine",
    "Sulphites": "Sulfite",
    "Molluscs": "Weichtiere"
  },
  it: {
    "Milk": "Latte",
    "Eggs": "Uova",
    "Tree nuts": "Frutta a guscio",
    "Peanuts": "Arachidi",
    "Shellfish": "Crostacei",
    "Fish": "Pesce",
    "Soy": "Soia",
    "Wheat": "Grano",
    "Sesame": "Sesamo",
    "Celery": "Sedano",
    "Mustard": "Senape",
    "Lupin": "Lupini",
    "Sulphites": "Solfiti",
    "Molluscs": "Molluschi"
  },
  ja: {
    "Milk": "乳",
    "Eggs": "卵",
    "Tree nuts": "木の実",
    "Peanuts": "ピーナッツ",
    "Shellfish": "甲殻類",
    "Fish": "魚",
    "Soy": "大豆",
    "Wheat": "小麦",
    "Sesame": "ごま",
    "Celery": "セロリ",
    "Mustard": "マスタード",
    "Lupin": "ルピナス",
    "Sulphites": "亜硫酸塩",
    "Molluscs": "軟体動物"
  },
  ko: {
    "Milk": "우유",
    "Eggs": "계란",
    "Tree nuts": "견과류",
    "Peanuts": "땅콩",
    "Shellfish": "갑각류",
    "Fish": "생선",
    "Soy": "콩",
    "Wheat": "밀",
    "Sesame": "참깨",
    "Celery": "셀러리",
    "Mustard": "겨자",
    "Lupin": "루핀",
    "Sulphites": "아황산염",
    "Molluscs": "연체동물"
  },
  zh: {
    "Milk": "牛奶",
    "Eggs": "鸡蛋",
    "Tree nuts": "坚果",
    "Peanuts": "花生",
    "Shellfish": "贝类",
    "Fish": "鱼",
    "Soy": "大豆",
    "Wheat": "小麦",
    "Sesame": "芝麻",
    "Celery": "芹菜",
    "Mustard": "芥末",
    "Lupin": "羽扇豆",
    "Sulphites": "亚硫酸盐",
    "Molluscs": "软体动物"
  },
  ru: {
    "Milk": "Молоко",
    "Eggs": "Яйца",
    "Tree nuts": "Орехи",
    "Peanuts": "Арахис",
    "Shellfish": "Моллюски",
    "Fish": "Рыба",
    "Soy": "Соя",
    "Wheat": "Пшеница",
    "Sesame": "Кунжут",
    "Celery": "Сельдерей",
    "Mustard": "Горчица",
    "Lupin": "Люпин",
    "Sulphites": "Сульфиты",
    "Molluscs": "Моллюски"
  },
  ar: {
    "Milk": "حليب",
    "Eggs": "بيض",
    "Tree nuts": "المكسرات",
    "Peanuts": "فول سوداني",
    "Shellfish": "محار",
    "Fish": "سمك",
    "Soy": "صويا",
    "Wheat": "قمح",
    "Sesame": "سمسم",
    "Celery": "كرفس",
    "Mustard": "خردل",
    "Lupin": "ترمس",
    "Sulphites": "كبريتيت",
    "Molluscs": "رخويات"
  },
  hi: {
    "Milk": "दूध",
    "Eggs": "अंडे",
    "Tree nuts": "मेवे",
    "Peanuts": "मूंगफली",
    "Shellfish": "शेलफिश",
    "Fish": "मछली",
    "Soy": "सोया",
    "Wheat": "गेहूं",
    "Sesame": "तिल",
    "Celery": "अजवाइन",
    "Mustard": "सरसों",
    "Lupin": "ल्यूपिन",
    "Sulphites": "सल्फाइट",
    "Molluscs": "मोलस्क"
  },
  pt: {
    "Milk": "Leite",
    "Eggs": "Ovos",
    "Tree nuts": "Nozes",
    "Peanuts": "Amendoins",
    "Shellfish": "Marisco",
    "Fish": "Peixe",
    "Soy": "Soja",
    "Wheat": "Trigo",
    "Sesame": "Gergelim",
    "Celery": "Aipo",
    "Mustard": "Mostarda",
    "Lupin": "Tremoço",
    "Sulphites": "Sulfitos",
    "Molluscs": "Moluscos"
  },
  nl: {
    "Milk": "Melk",
    "Eggs": "Eieren",
    "Tree nuts": "Noten",
    "Peanuts": "Pinda's",
    "Shellfish": "Schaaldieren",
    "Fish": "Vis",
    "Soy": "Soja",
    "Wheat": "Tarwe",
    "Sesame": "Sesam",
    "Celery": "Selderij",
    "Mustard": "Mosterd",
    "Lupin": "Lupine",
    "Sulphites": "Sulfieten",
    "Molluscs": "Weekdieren"
  },
  tr: {
    "Milk": "Süt",
    "Eggs": "Yumurta",
    "Tree nuts": "Sert kabuklu meyveler",
    "Peanuts": "Yer fıstığı",
    "Shellfish": "Kabuklu deniz ürünleri",
    "Fish": "Balık",
    "Soy": "Soya",
    "Wheat": "Buğday",
    "Sesame": "Susam",
    "Celery": "Kereviz",
    "Mustard": "Hardal",
    "Lupin": "Acı bakla",
    "Sulphites": "Sülfitler",
    "Molluscs": "Yumuşakçalar"
  },
  pl: {
    "Milk": "Mleko",
    "Eggs": "Jaja",
    "Tree nuts": "Orzechy drzewne",
    "Peanuts": "Orzeszki ziemne",
    "Shellfish": "Skorupiaki",
    "Fish": "Ryby",
    "Soy": "Soja",
    "Wheat": "Pszenica",
    "Sesame": "Sezam",
    "Celery": "Seler",
    "Mustard": "Gorczyca",
    "Lupin": "Łubin",
    "Sulphites": "Siarczyny",
    "Molluscs": "Mięczaki"
  },
  vi: {
    "Milk": "Sữa",
    "Eggs": "Trứng",
    "Tree nuts": "Các loại hạt",
    "Peanuts": "Đậu phộng",
    "Shellfish": "Tôm cua",
    "Fish": "Cá",
    "Soy": "Đậu nành",
    "Wheat": "Lúa mì",
    "Sesame": "Mè",
    "Celery": "Cần tây",
    "Mustard": "Mù tạt",
    "Lupin": "Đậu lupin",
    "Sulphites": "Sunfit",
    "Molluscs": "Động vật thân mềm"
  },
  th: {
    "Milk": "นม",
    "Eggs": "ไข่",
    "Tree nuts": "ถั่วต้นไม้",
    "Peanuts": "ถั่วลิสง",
    "Shellfish": "หอย",
    "Fish": "ปลา",
    "Soy": "ถั่วเหลือง",
    "Wheat": "ข้าวสาลี",
    "Sesame": "งา",
    "Celery": "ขึ้นฉ่าย",
    "Mustard": "มัสตาร์ด",
    "Lupin": "ลูปิน",
    "Sulphites": "ซัลไฟต์",
    "Molluscs": "หอยต่างๆ"
  },
  sv: {
    "Milk": "Mjölk",
    "Eggs": "Ägg",
    "Tree nuts": "Nötter",
    "Peanuts": "Jordnötter",
    "Shellfish": "Skaldjur",
    "Fish": "Fisk",
    "Soy": "Soja",
    "Wheat": "Vete",
    "Sesame": "Sesam",
    "Celery": "Selleri",
    "Mustard": "Senap",
    "Lupin": "Lupin",
    "Sulphites": "Sulfiter",
    "Molluscs": "Blötdjur"
  },
  da: {
    "Milk": "Mælk",
    "Eggs": "Æg",
    "Tree nuts": "Nødder",
    "Peanuts": "Jordnødder",
    "Shellfish": "Skaldyr",
    "Fish": "Fisk",
    "Soy": "Soja",
    "Wheat": "Hvede",
    "Sesame": "Sesam",
    "Celery": "Selleri",
    "Mustard": "Sennep",
    "Lupin": "Lupin",
    "Sulphites": "Sulfitter",
    "Molluscs": "Bløddyr"
  },
  fi: {
    "Milk": "Maito",
    "Eggs": "Munat",
    "Tree nuts": "Pähkinät",
    "Peanuts": "Maapähkinät",
    "Shellfish": "Äyriäiset",
    "Fish": "Kala",
    "Soy": "Soija",
    "Wheat": "Vehnä",
    "Sesame": "Seesami",
    "Celery": "Selleri",
    "Mustard": "Sinappi",
    "Lupin": "Lupiini",
    "Sulphites": "Sulfiitit",
    "Molluscs": "Nilviäiset"
  },
  no: {
    "Milk": "Melk",
    "Eggs": "Egg",
    "Tree nuts": "Nøtter",
    "Peanuts": "Peanøtter",
    "Shellfish": "Skalldyr",
    "Fish": "Fisk",
    "Soy": "Soya",
    "Wheat": "Hvete",
    "Sesame": "Sesam",
    "Celery": "Selleri",
    "Mustard": "Sennep",
    "Lupin": "Lupin",
    "Sulphites": "Sulfitter",
    "Molluscs": "Bløtdyr"
  },
  el: {
    "Milk": "Γάλα",
    "Eggs": "Αυγά",
    "Tree nuts": "Ξηροί καρποί",
    "Peanuts": "Φιστίκια",
    "Shellfish": "Οστρακοειδή",
    "Fish": "Ψάρι",
    "Soy": "Σόγια",
    "Wheat": "Σιτάρι",
    "Sesame": "Σουσάμι",
    "Celery": "Σέλινο",
    "Mustard": "Μουστάρδα",
    "Lupin": "Λούπινο",
    "Sulphites": "Θειώδη",
    "Molluscs": "Μαλάκια"
  },
  cs: {
    "Milk": "Mléko",
    "Eggs": "Vejce",
    "Tree nuts": "Ořechy",
    "Peanuts": "Arašídy",
    "Shellfish": "Korýši",
    "Fish": "Ryby",
    "Soy": "Sója",
    "Wheat": "Pšenice",
    "Sesame": "Sezam",
    "Celery": "Celer",
    "Mustard": "Hořčice",
    "Lupin": "Vlčí bob",
    "Sulphites": "Siřičitany",
    "Molluscs": "Měkkýši"
  },
  hu: {
    "Milk": "Tej",
    "Eggs": "Tojás",
    "Tree nuts": "Diófélék",
    "Peanuts": "Földimogyoró",
    "Shellfish": "Rákfélék",
    "Fish": "Hal",
    "Soy": "Szója",
    "Wheat": "Búza",
    "Sesame": "Szezám",
    "Celery": "Zeller",
    "Mustard": "Mustár",
    "Lupin": "Csillagfürt",
    "Sulphites": "Szulfitok",
    "Molluscs": "Puhatestűek"
  }
};