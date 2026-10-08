/**
 * Celiac-specific card paragraph. Celiac disease is an autoimmune condition,
 * not an allergy, and the generic card text ("I have severe allergies to the
 * following foods") says the wrong thing for it. When "Celiac disease" is
 * selected this paragraph replaces that wording.
 *
 * Only languages with a reviewed-quality paragraph are listed. Every other
 * language falls back to the standard card with "Gluten" as the item (see
 * translationService.ts) rather than shipping a weak medical translation.
 * These are safety-relevant texts: have a native speaker check a language
 * before promoting it publicly.
 */
export const CELIAC_LABEL = 'Celiac disease';

export const CELIAC_PARAGRAPHS: Record<string, string> = {
  en: "I have celiac disease (an autoimmune condition, not a food preference). I must avoid gluten completely: wheat, barley, rye and anything made with them. Even small traces from shared utensils, fryers, cutting boards, surfaces or flour can make me seriously ill. Please prepare my meal gluten-free, with clean utensils and surfaces.",
  he: "יש לי צליאק (מחלה אוטואימונית, לא העדפה תזונתית). אני חייב/ת להימנע לחלוטין מגלוטן: חיטה, שעורה, שיפון וכל מה שמכיל אותם. גם שאריות קטנות מכלים משותפים, מטגנים, קרשי חיתוך, משטחים או קמח עלולות לגרום לי למחלה חמורה. אנא הכינו את המנה שלי ללא גלוטן, עם כלים ומשטחים נקיים.",
  es: "Tengo enfermedad celíaca (una enfermedad autoinmune, no una preferencia alimentaria). Debo evitar el gluten por completo: trigo, cebada, centeno y todo lo que los contenga. Incluso pequeñas trazas de utensilios compartidos, freidoras, tablas de cortar, superficies o harina pueden enfermarme gravemente. Por favor, prepare mi comida sin gluten, con utensilios y superficies limpios.",
  fr: "Je suis atteint(e) de la maladie cœliaque (une maladie auto-immune, pas un choix alimentaire). Je dois éviter totalement le gluten : blé, orge, seigle et tout ce qui en contient. Même de petites traces provenant d'ustensiles partagés, de friteuses, de planches à découper, de surfaces ou de farine peuvent me rendre gravement malade. Merci de préparer mon repas sans gluten, avec des ustensiles et des surfaces propres.",
  de: "Ich habe Zöliakie (eine Autoimmunerkrankung, keine Ernährungspräferenz). Ich muss Gluten vollständig meiden: Weizen, Gerste, Roggen und alles, was daraus hergestellt wird. Schon kleinste Spuren von gemeinsam genutzten Utensilien, Fritteusen, Schneidebrettern, Oberflächen oder Mehl können mich schwer krank machen. Bitte bereiten Sie mein Essen glutenfrei zu, mit sauberen Utensilien und Oberflächen.",
  it: "Sono celiaco/a (una malattia autoimmune, non una preferenza alimentare). Devo evitare completamente il glutine: frumento, orzo, segale e tutto ciò che li contiene. Anche piccole tracce provenienti da utensili condivisi, friggitrici, taglieri, superfici o farina possono farmi stare molto male. Per favore, preparate il mio pasto senza glutine, con utensili e superfici puliti.",
  pt: "Tenho doença celíaca (uma doença autoimune, não uma preferência alimentar). Devo evitar completamente o glúten: trigo, cevada, centeio e tudo o que os contenha. Mesmo pequenos vestígios de utensílios partilhados, fritadeiras, tábuas de corte, superfícies ou farinha podem prejudicar gravemente a minha saúde. Por favor, prepare a minha refeição sem glúten, com utensílios e superfícies limpos.",
  nl: "Ik heb coeliakie (een auto-immuunziekte, geen voedingsvoorkeur). Ik moet gluten volledig vermijden: tarwe, gerst, rogge en alles wat daarvan gemaakt is. Zelfs kleine sporen van gedeeld keukengerei, frituurpannen, snijplanken, oppervlakken of meel kunnen me ernstig ziek maken. Bereid mijn maaltijd alstublieft glutenvrij, met schoon keukengerei en schone oppervlakken.",
  ja: "私はセリアック病（自己免疫疾患であり、食べ物の好みではありません）です。グルテンを完全に避ける必要があります。小麦、大麦、ライ麦、およびそれらを使ったすべての食品が対象です。共用の調理器具、フライヤー、まな板、調理台、小麦粉からのごくわずかな混入でも、重い症状を引き起こすことがあります。清潔な調理器具と調理台を使い、グルテンフリーで調理してください。",
  ko: "저는 셀리악병(자가면역질환이며 식습관 선호가 아닙니다)이 있습니다. 글루텐을 완전히 피해야 합니다. 밀, 보리, 호밀과 이를 사용한 모든 음식이 해당됩니다. 공용 조리도구, 튀김기, 도마, 조리대 표면, 밀가루에서 묻은 소량만으로도 심하게 아플 수 있습니다. 깨끗한 조리도구와 조리대를 사용하여 글루텐 없이 조리해 주세요.",
  zh: "我患有乳糜泻（一种自身免疫性疾病，不是饮食偏好）。我必须完全避免麸质：小麦、大麦、黑麦以及所有含有它们的食物。即使是共用餐具、油炸锅、砧板、台面或面粉带来的微量残留，也可能使我严重不适。请使用干净的餐具和台面，为我准备无麸质的餐食。",
  ru: "У меня целиакия (аутоиммунное заболевание, а не пищевая прихоть). Мне необходимо полностью исключить глютен: пшеницу, ячмень, рожь и все продукты, в которых они содержатся. Даже следовые количества от общей посуды, фритюрниц, разделочных досок, поверхностей или муки могут серьёзно навредить моему здоровью. Пожалуйста, приготовьте моё блюдо без глютена, используя чистую посуду и чистые поверхности.",
  tr: "Çölyak hastasıyım (otoimmün bir hastalıktır, bir yeme tercihi değildir). Glütenden tamamen kaçınmam gerekiyor: buğday, arpa, çavdar ve bunlarla yapılan her şey. Ortak kullanılan mutfak gereçlerinden, fritözlerden, kesme tahtalarından, yüzeylerden veya undan bulaşan küçük miktarlar bile beni ciddi şekilde hasta edebilir. Lütfen yemeğimi temiz gereçler ve yüzeylerle glütensiz hazırlayın.",
  el: "Έχω κοιλιοκάκη (αυτοάνοση νόσο, όχι διατροφική προτίμηση). Πρέπει να αποφεύγω πλήρως τη γλουτένη: σιτάρι, κριθάρι, σίκαλη και ό,τι περιέχει αυτά. Ακόμη και μικρά ίχνη από κοινά σκεύη, φριτέζες, επιφάνειες κοπής, πάγκους ή αλεύρι μπορούν να με αρρωστήσουν σοβαρά. Παρακαλώ ετοιμάστε το φαγητό μου χωρίς γλουτένη, με καθαρά σκεύη και επιφάνειες.",
  pl: "Mam celiakię (chorobę autoimmunologiczną, a nie preferencję żywieniową). Muszę całkowicie unikać glutenu: pszenicy, jęczmienia, żyta i wszystkiego, co je zawiera. Nawet niewielkie śladowe ilości ze wspólnych naczyń i sztućców, frytownic, desek do krojenia, blatów lub mąki mogą poważnie zaszkodzić mojemu zdrowiu. Proszę przygotować moje danie bez glutenu, przy użyciu czystych naczyń i powierzchni.",
  ar: "أعاني من مرض السيلياك (الداء البطني)، وهو مرض مناعي ذاتي وليس تفضيلاً غذائياً. يجب أن أتجنب الغلوتين تماماً: القمح والشعير والجاودار وكل ما يحتوي عليها. حتى الكميات الضئيلة من الأدوات المشتركة أو القلايات أو ألواح التقطيع أو الأسطح أو الدقيق قد تسبب لي مرضاً شديداً. يرجى تحضير وجبتي خالية من الغلوتين باستخدام أدوات وأسطح نظيفة.",
};
