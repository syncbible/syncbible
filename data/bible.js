var bible = {};
bible.Data = {};
bible.Data.books = [
['Genesis','Gen','Ge'],
['Exodus','Exod','Ex'],
['Leviticus','Lev','Le'],
['Numbers','Num','Nu'],
['Deuteronomy','Deut','Deu','De'],
['Joshua','Josh','Jos'],
['Judges','Judg','Jud','Jdg','Ju'],
['Ruth','Ruth','Rut','Ru'],
['I Samuel','1Sam','1 Samuel','1 Sam','1 Sa','1Sa','I Sam','I Sa'],
['II Samuel','2Sam','2 Samuel','2 Sam','2 Sa','2Sa','II Sam','II Sa'],
['I Kings','1Kgs','1 Kings','1 Kin','1Kin','1 Ki','1Ki','I Kin','I Ki'],
['II Kings','2Kgs','2 Kings','2 Kin','2Kin','2 Ki','2Ki','II Kin','II Ki'],
['I Chronicles','1Chr','1 Chronicles','1 Chr','1 Ch','1Ch','I Chr','I Ch'],
['II Chronicles','2Chr','2 Chronicles','2 Chr','2 Ch','2Ch','II Chr','II Ch'],
['Ezra','Ezra','Ezr'],
['Nehemiah','Neh','Ne'],
['Esther','Esth','Est','Es'],
['Job','Job'],
['Psalms','Ps','Psalm','Psa'],
['Proverbs','Prov','Pro','Pr'],
['Ecclesiastes','Eccl','Ecc','Ec'],
['Song of Solomon','Song','Song of Songs','Songs','SOS'],
['Isaiah','Isa','Is'],
['Jeremiah','Jer','Je'],
['Lamentations','Lam','La'],
['Ezekiel','Ezek','Eze'],
['Daniel','Dan','Da'],
['Hosea','Hos','Ho'],
['Joel','Joel'],
['Amos'],
['Obadiah','Oba','Ob','Obad'],
['Jonah','Jon'],
['Micah','Mic','Mi'],
['Nahum','Nah','Na'],
['Habakkuk','Hab'],
['Zephaniah','Zep','Zeph'],
['Haggai','Hag'],
['Zechariah','Zech','Zec'],
['Malachi','Mal'],
['Matthew','Matt','Mat','Mt'],
['Mark','Mar','Mk'],
['Luke','Luk','Lu'],
['John','Joh','Jn'],
['Acts','Acts','Act','Ac'],
['Romans','Rom','Ro'],
['I Corinthians','1Cor','1 Corinthians','1 Cor','1 Co','1Co','I Cor','I Co'],
['II Corinthians','2Cor','2 Corinthians','2 Cor','2 Co','2Co','II Cor','II Co'],
['Galatians','Gal','Ga'],
['Ephesians','Eph','Ep'],
['Philippians','Phil','Phi'],
['Colossians','Col','Co'],
['I Thessalonians','1Thess','1 Thessalonians','1 Thess','1 Thes','1Thes','1 The','1The','1 Th','1Th','I Thess','I The','I Th'],
['II Thessalonians','2Thess','2 Thessalonians','2 Thess','2 Thes','2Thes','2 The','2The','2 Th','2Th','II Thess','II The','II Th'],
['I Timothy','1Tim','1 Timothy','1 Tim','1 Ti','1Ti','I Tim','I Ti'],
['II Timothy','2Tim','2 Timothy','2 Tim','2 Ti','2Ti','II Tim','II Ti'],
['Titus','Tit','Ti'],
['Philemon','Phile', 'Philm','Phlm'],
['Hebrews','Heb','He'],
['James','Jas','Jam','Ja'],
['I Peter','1Pet','1 Peter','1 Pet','1Pe','I Pet','I Pe'],
['II Peter','2Pet','2 Peter','2 Pet','2Pe','II Pet','II Pe'],
['I John','1John','1 John','1 Jn','1Jn','1 Jo','1Jo','I Jo','I Jn'],
['II John','2John','2 John','2 Jn','2Jn','2 Jo','2Jo','II Jo','II Jn'],
['III John','3John','3 John','3 Jn','3Jn','3 Jo','3Jo','III Jo','III Jn'],
['Jude','Jude'],
['Revelation of John','Rev','Revelation','Re','Apocalypse']
];
//TODO - use the arrays above
bible.Data.otBooks = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','I Samuel','II Samuel','I Kings','II Kings','I Chronicles','II Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
bible.Data.ntBooks = ['Matthew','Mark','Luke','John','Acts','Romans','I Corinthians','II Corinthians','Galatians','Ephesians','Philippians','Colossians','I Thessalonians','II Thessalonians','I Timothy','II Timothy','Titus','Philemon','Hebrews','James','I Peter','II Peter','I John','II John','III John','Jude','Revelation of John'];
bible.Data.allBooks = bible.Data.otBooks.concat( bible.Data.ntBooks );
bible.Data.bookNamesByLanguage = {
	"original":["בראשית","שמות","ויקרא","במדבר","דברים","יהושע","שפטים","רות","שמואל א","שמואל ב","מלכים א","מלכים ב","דברי הימים א","דברי הימים ב","עזרא","נחמיה","אסתר","איוב","תהילים","משלי","קהלת","שיר השירים","ישעה","ירמיה","איכה","יחזקאל","דניאל","הושע","יואל","עמוס","עבדיה","יונה","מיכה","נחום","חבקוק","צפניה","חגי","זכריה","מלאכי","Ματθαίος","Μαρκος","Λουκας","Ιωαννης","Πραξεις","Ρωμαιους","Α Κορινθίους","Β Κορινθίους","Γαλατες","Εφεσιους","Φιλιππησιους","Κολοσσαεις","Α Θεσσαλονικεις","Β Θεσσαλονικεις","Α Τιμοθεο","Β Τιμοθεο","Τιτο","Φιλημονα","Εβραιους","Ιακωβου","Α Πετρου","Β Πετρου","Α Ιωαννη","Β Ιωαννη","Γ Ιωαννη","Ιουδα","Αποκαλυψη του Ιωαννη"],
	'ar':['تكوين','خروج','لاويين','عدد','تثنية','يشوع','قضاة','راعوث','1 صموئيل','2 صموئيل','1 ملوك','2 ملوك','1 اخبار','2 اخبار','عزرا','نحميا','استير','ايوب','مزامير','امثال','جامعة','نشيد الانشاد','اشعياء','ارميا','مراثي','حزقيال','دانيال','هوشع','يوئيل','عاموس','عوبديا','يونان','ميخا','ناحوم','حبقوق','صفنيا','حجى','زكريا','ملاخي','متى','مرقس','لوقا','يوحنا','اعمال','رومية','1 كورنثوس','2 كورنثوس','غلاطية','افسس','فيلبي','كولوسي','1 تسالونيكي','2 تسالونيكي','1 تيموثاوس','2 تيموثاوس','تيطس','فليمون','عبرانيين','يعقوب','1بطرس','2بطرس','1 يوحنا','2 يوحنا','3 يوحنا','يهوذا','رؤيا'],
	'az': ['یارادیلیش','چیخیش','لاوئلی‌لر','سایلار','تثنئیه','یوشَع','داورلر','روت','۱سمویئل','۲سمویئل','۱پادشاهلار','۲پادشاهلار','۱سالنامه‌لر','۲سالنامه‌لر','عِزرا','نِحِمیا','اِستِر','اَیّوب','مزمورلار','مثل‌لر کئتابی','واعئظ','نغمه‌لر','اِشَعیا','اِرِمیا','مرثئیه‌لر','حِزِقیال','دانیال','هوشَع','یوعِل','عاموس','عوبَدیا','یونوس','مئکا','ناحوم','حَبَقوق','صِفَنیا','حَجّه‌ی','زِکَرئیّا','مَلاکی','متّا','مرقوس','لوقا','یوحنّا','حوارئلر','روملو‌لارا','۱قورئنتلی‌لره','۲قورئنتلی‌لره','قالاتئیالی‌لارا','اِفِسوسلولارا','فئلئپئلی‌لره','کولوسلولارا','۱تسالونئکلی‌لره','۲تسالونئکلی‌لره','۱تئموتاعوسا','۲تئموتاعوسا','تئطوسا','فئلئمونا','عئبرانئلره','یعقوب','۱پطروس','۲پطروس','۱یوحنّا','۲یوحنّا','۳یوحنّا','یهودا','وحی'],
	'be': ['БЫЦЦЁ','ВЫХАД','ЛЯВІТ','ЛІКІ','ДРУГІ ЗАКОН','ІСУСА','СУДЗЬДЗЯЎ','РУТ','1 ЦАРСТВАЎ','2 ЦАРСТВАЎ','3 ЦАРСТВАЎ','4 ЦАРСТВАЎ','1 ЛЕТАПІСАЎ','2 ЛЕТАПІСАЎ','ЭЗДРЫ','НЭЭМІІ','ЭСТЭР','ЁВА','ПСАЛТЫР','ВЫСЛОЎІ','ЭКЛЕЗІЯСТА','ПЕСЬНЯ','ІСАІ','ЕРАМІІ','ПЛАЧ','ЕЗЭКІІЛЯ','ДАНІІЛА','АСІІ','АМОСА','МІХЕЯ','ЁІЛЯ','АЎДЗЕЯ','ЁНЫ','НАВУМА','АБАКУМА','САФОНА','АГЕЯ','ЗАХАРЫІ','МАЛАХІІ','МАЦЬВЕЯ','МАРКА','ЛУКАША','ЯНА','ДЗЕІ','ЯКАВА','1 ПЯТРА','2 ПЯТРА','1 ЯНА','2 ЯНА','3 ЯНА','ЮДЫ','РЫМЛЯНАЎ','1 КАРЫНФЯНАЎ','2 КАРЫНФЯНАЎ','ГАЛЯТАЎ','ЭФЭСЯНАЎ','ПІЛІПЯНАЎ','КАЛАСЯНАЎ','1 ФЕСАЛОНІКІЙЦАЎ','2 ФЕСАЛОНІКІЙЦАЎ','1 ЦІМАФЕЯ','2 ЦІМАФЕЯ','ЦІТА','ФІЛІМОНА','ГАБРЭЯЎ','АДКРЫЦЦЁ'],
	'bg': ['Битие','Изход','Левит','Числа','Второзаконие','Исус Навиев','Съдии','Рут','1 Царе','2 Царе','3 Царе','4 Царе','1 Летописи','2 Летописи','Ездра','Неемия','Естир','Йов','Псалми','Притчи','Еклесиаст','Песен на песните','Исая','Еремия','Плач Еремиев','Езекил','Данаил','Осия','Иоил','Амос','Авдий','Йон','Михей','Наум','Авакум','Софоний','Агей','Захария','Малахия','Матей','Марко','Лука','Йоан','Деяния','Яков','1 Петрово','2 Петрово','1 Йоаново','2 Йоаново','3 Йоаново','Юда','Римляни','1 Коринтяни','2 Коринтяни','Галатяни','Ефесяни','Филипяни','Колосяни','1 Солунци','2 Солунци','1 Тимотей','2 Тимотей','Тит','Филимон','Евреи','Откровение'],
	'br': ['Geneliezh','Ermaeziadeg','Leviegezh','Niveroù','Adlezenn','','','','','','','','','','','','','','Salmoù','Krennlavarioù','','Kanenn ar C\'hanennoù','','','','','','','','','','','','','','','','','','Mazhev','Mark','Lukaz','Yann','Oberoù an Ebestel','Romaned','1 Korintiz','2 Korintiz','Galated','Efeziz','Filipiz','Koloseiz','1 Tesalonikiz','2 Tesalonikiz','1 Timote','2 Timote','Tit','Filemon','Hebreed','Jakez','1 Pêr','2 Pêr','1 Yann','2 Yann','3 Yann','Jud','Diskuliadur'],
	'ceb': ['Genesis','Exodus','Leviticus','Numero','Deuteronomio','Josue','Hukom','Ruth','1 Samuel','2 Samuel','1 Mga Hari','2 Mga Hari','1 Cronica','2 Cronica','Ezra','Nehemias','Ester','Job','Salmo','Panultihon','Magwawali','Awit ni Solomon','Isaias','Jeremias','Pagbangotan','Ezekiel','Daniel','Hosea','Joel','Amos','Obadia','Jonas','Micas','Nahum','Habakuk','Zefanias','Haggai','Zacarias','Malakias','Mateo','Marcos','Lucas','Juan','Binuhatan','Roma','1 Corinto','2 Corinto','Galacia','Efeso','Filipos','Colosas','1 Tesalonica','2 Tesalonica','1 Timoteo','2 Timoteo','Tito','Filemon','Hebreo','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Gipadayag'],
	'ckb':['پەیدابوون','دەرچوون','لێڤییەکان','سه‌رژمێری','دواوتار','یەشوع','ڕابەران','ڕائووس','یەکەم ساموئێل','دووەم ساموێل','یەکەم پاشایان','دووەم پاشایان','یەکەم پوختەی مێژوو','دووەم پوختەی مێژوو','عەزرا','نەحەمیا','ئەستەر','ئەیوب','زەبوورەکان','پەندەکانی سلێمان','ژیرمه‌ندی','گۆرانی گۆرانییه‌كان','ئیشایا','یه‌رمیا','شینه‌كانی یه‌رمیا','حزقیێل','دانیال','هۆشه‌ع','یۆئێل','ئامۆس','عۆبه‌دیا','یونس','میخا','ناحوم','حه‌به‌قوق','سه‌فه‌نیا','حه‌گه‌ی','زه‌كه‌ریا','مه‌لاخی','مەتا','مەرقۆس','لۆقا','یۆحەنا','کردار','ڕۆما','١ کۆرنسۆس','٢ کۆرنسۆس','گەلاتیا','ئەفەسۆس','فیلیپی','کۆلۆسی','١ سالۆنیكی','٢ سالۆنیكی','١ تیمۆساوس','٢ تیمۆساوس','تیتۆس','فلیمۆن','عیبرانییەکان','یاقوب','١ پەترۆس','٢ پەترۆس','١ یۆحەنا','٢ یۆحەنا','٣ یۆحەنا','یەهوزا','ئاشکراکردن'],
	'cop': ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','ⲘⲀⲦⲐⲈⲞⲚ','ⲘⲀⲢⲔⲞⲚ','Ⲗⲟⲩⲕⲁⲛ','ⲒⲰⲀⲚⲚⲎⲚ','ⲚⲒⲠ̀ⲢⲀⲜⲒⲤ','Ⲡⲣⲟⲥ Ⲣⲱⲙⲉⲟⲥ','Ⲡⲣⲟⲥ Ⲕⲟⲣⲓⲛⲑⲓⲟⲥ ⲁ̅','Ⲡⲣⲟⲥ Ⲕⲟⲣⲓⲛⲑⲓⲟⲥ ⲃ̅','Ⲡⲣⲟⲥ Ⲅⲁⲕⲁⲧⲏⲥ','Ⲡⲣⲟⲥ Ⲉ̇ⲫⲉⲥⲓⲟⲩⲥ','Ⲡⲣⲟⲥ Ⲫⲓⲕⲓⲡⲡⲟⲓⲥ','Ⲡⲣⲟⲥ Ⲕⲟⲕⲁⲥⲥⲓⲁⲥ','Ⲡⲣⲟⲥ Ⲑⲉⲥⲥⲁⲕⲟⲛⲓⲏⲏ ⲁ̅','Ⲡⲣⲟⲥ Ⲑⲉⲥⲥⲁⲕⲟⲛⲓⲏⲏ ⲃ̅','Ⲡⲣⲟⲥ Ⲧⲓⲙⲟⲑⲉⲟⲥ ⲁ̅','Ⲡⲣⲟⲥ Ⲧⲓⲙⲟⲑⲉⲟⲥ ⲃ̅','Ⲡⲣⲟⲥ Ⲧⲓⲧⲟⲥ','Ⲡⲣⲟⲥ Ⲫⲓⲗⲏⲙⲱⲛ','Ⲡⲣⲟⲥ Ϩⲉⲃⲣⲉⲟⲥ','Ⲓⲁⲕⲱⲃⲟⲥ','Ⲡⲉⲧⲣⲟⲥ ⲁ̅','Ⲡⲉⲧⲣⲟⲥ ⲃ̅','Ⲓⲱⲁⲛⲛⲏⲥ ⲁ̅','Ⲓⲱⲁⲛⲛⲏⲥ ⲃ̅','Ⲓⲱⲁⲛⲛⲏⲥ ⲅ̅','Ⲓⲟⲩⲇⲁⲥ','Ϯⲁ̀ⲡⲟⲕⲁⲗⲩⲙⲯⲓⲥ'],
	'cs': ['Genesis','Exodus','Leviticus','Numeri','Deuteronomium','Jozue','Soudců','Rút','1 Samuel','2 Samuel','1 Královská','2 Královská','1 Letopisů','2 Letopisů','Ezdráš','Nehemiáš','Ester','Job','Žalmy','Přísloví','Kazatel','Píseň','Izaiáš','Jeremiáš','Pláč','Ezechiel','Daniel','Ozeáš','Joel','Amos','Abdiáš','Jonáš','Micheáš','Nahum','Abakuk','Sofoniáš','Ageus','Zachariáš','Malachiáš','Matouš','Marek','Lukáš','Jan','Skutky','Římanům','1 Korintským','2 Korintským','Galatským','Efeským','Filipským','Koloským','1 Tesalonickým','2 Tesalonickým','1 Timoteus','2 Timoteus','Titus','Filemon','Židům','Jakub','1 Petr','2 Petr','1 Jan','2 Jan','3 Jan','Juda','Zjevení'],
	'cu': ['Genezis','Exodus','Levitikus','Numeri','Deuteronómium','Jozua','Sudcov','Rút','Prvá Samuelova','Druhá Samuelova','Prvá kráľov','Druhá kráľov','Prvá kroník','Druhá kroník','Ezdráš','Nehemiáš','Ester','Jób','Žalmy','Príslovia','Kohelet — Kazateľ','Veľpieseň','Izaiáš','Jeremiáš','Náreky','Ezechiel','Daniel','Ozeáš','Joel','Amos','Abdiáš','Jonáš','Micheáš','Nahum','Habakuk','Sofoniáš','Aggeus','Zachariáš','Malachiáš','Matúš','Marek','Lukáš','Ján','Skutky apoštolov','Rimanom','Prvý Korinťanom','Druhý Korinťanom','Galaťanom','Efezanom','Filipanom','Kolosanom','Prvý Tesaloničanom','Druhý Tesaloničanom','Prvý Timotejovi','Druhý Timotejovi','Títovi','Filemonovi','Hebrejom','Jakubov','Prvý Petrov','Druhý Petrov','Prvý Jánov','Druhý Jánov','Tretí Jánov','Júdov','Zjavenie Jána'], // Pretty sure these are wrong
	'da': ['1. Mosebog','2. Mosebog','3. Mosebog','4. Mosebog','5. Mosebog','Josvabogen','Dommerbogen','Ruths Bog','1. Samuelsbog','2. Samuelsbog','1. Kongebog','2. Kongebog','1. Krønikebog','2. Krønikebog','Ezras Bog','Nehemiasʼ Bog','Esters Bog','Jobs Bog','Salmernes Bog','Ordsprogenes Bog','Prædikerens Bog','Højsangen','Esajasʼ Bog','Jeremiasʼ Bog','Klagesangene','Ezekiels Bog','Daniels Bog','Hoseasʼ Bog','Joels Bog','Amosʼ Bog','Obadiasʼ Bog','Jonasʼ Bog','Mikas Bog','Nahums Bog','Habakkuks Bog','Zefaniasʼ Bog','Haggajs Bog','Zakariasʼ Bog','Malakiasʼ Bog','Mattæusevangeliet','Markusevangeliet','Lukasevangeliet','Johannesevangeliet','Apostlenes Gerninger','Romerbrevet','1. Korinterbrev','2. Korinterbrev','Galaterbrevet','Efeserbrevet','Filipperbrevet','Kolossenserbrevet','1. Thessalonikerbrev','2. Thessalonikerbrev','1. Timoteusbrev','2. Timoteusbrev','Titusbrevet','Filemonbrevet','Hebræerbrevet','Jakobs Brev','1. Petersbrev','2. Petersbrev','1. Johannesʼ Brev','2. Johannesʼ Brev','3. Johannesʼ Brev','Judasʼ brev','Johannesʼ Åbenbaring'],
	'de': ['1. Mose','2. Mose','3. Mose','4. Mose','5. Mose','Josua','Richter','Rut','1. Samuel','2. Samuel','1. Könige','2. Könige','1. Chronik','2. Chronik','Esra','Nehemia','Ester','Hiob','Psalm','Sprüche','Prediger','Hohelied','Jesaja','Jeremia','Klagelieder','Hesekiel','Daniel','Hosea','Joel','Amos','Obadja','Jona','Micha','Nahum','Habakuk','Zephanja','Haggai','Sacharja','Maleachi','Matthäus','Markus','Lukas','Johannes','Apostelgeschichte','Römer','1. Korinther','2. Korinther','Galater','Epheser','Philipper','Kolosser','1. Thessalonicher','2. Thessalonicher','1. Timotheus','2. Timotheus','Titus','Philemon','Hebräer','Jakobus','1. Petrus','2. Petrus','1. Johannes','2. Johannes','3. Johannes','Judas','Offenbarung'],
	'el': ['ΓΕΝΕΣΙΣ','ΕΞΟΔΟΣ','ΛΕΥΙΤΙΚΟΝ','ΑΡΙΘΜΟΙ','ΔΕΥΤΕΡΟΝΟΜΙΟΝ','ΙΗΣΟΥΣ ΤΟΥ ΝΑΥΗ','ΚΡΙΤΑΙ','ΡΟΥΘ','Α΄ ΣΑΜΟΥΗΛ (ή ΒΑΣΙΛΕΙΩΝ Α΄)','Β΄ ΣΑΜΟΥΗΛ (ή ΒΑΣΙΛΕΙΩΝ Β΄)','Α΄ ΒΑΣΙΛΕΩΝ (ή ΒΑΣΙΛΕΙΩΝ Γ΄)','Β΄ ΒΑΣΙΛΕΩΝ (ή ΒΑΣΙΛΕΙΩΝ Δ΄)','Α΄ ΧΡΟΝΙΚΩΝ (Ή ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Α΄)','Β΄ ΧΡΟΝΙΚΩΝ (Ή ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Β΄)','ΕΣΔΡΑΣ (ή Β΄ ΕΣΔΡΑΣ)','ΝΕΕΜΙΑΣ','ΕΣΘΗΡ','ΙΩΒ','ΨΑΛΜΟΙ','ΠΑΡΟΙΜΙΑΙ','ΕΚΚΛΗΣΙΑΣΤΗΣ','ΑΣΜΑ ΑΣΜΑΤΩΝ','ΗΣΑΪΑΣ','ΙΕΡΕΜΙΑΣ','ΘΡΗΝΟΙ','ΙΕΖΕΚΙΗΛ','ΔΑΝΙΗΛ','ΩΣΗΕ','ΙΩΗΛ','ΑΜΩΣ','ΟΒΔΙΟΥ','ΙΩΝΑΣ','ΜΙΧΑΙΑΣ','ΝΑΟΥΜ','ΑΒΒΑΚΟΥΜ','ΣΟΦΟΝΙΑΣ','ΑΓΓΑΙΟΣ','ΖΑΧΑΡΙΑΣ','ΜΑΛΑΧΙΑΣ','ΚΑΤΑ ΜΑΤΘΑΙΟΝ','ΚΑΤΑ ΜΑΡΚΟΝ','ΚΑΤΑ ΛΟΥΚΑΝ','ΚΑΤΑ ΙΩΑΝΝΗΝ','ΠΡΑΞΕΙΣ ΑΠΟΣΤΟΛΩΝ','ΠΡΟΣ ΡΩΜΑΙΟΥΣ','ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Α΄','ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Β΄','ΠΡΟΣ ΓΑΛΑΤΑΣ','ΠΡΟΣ ΕΦΕΣΙΟΥΣ','ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ','ΠΡΟΣ ΚΟΛΟΣΣΑΕΙΣ','ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Α΄','ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Β΄','Α΄ ΠΡΟΣ ΤΙΜΟΘΕΟΝ','Β΄ ΠΡΟΣ ΤΙΜΟΘΕΟΝ','ΠΡΟΣ ΤΙΤΟΝ','ΠΡΟΣ ΦΙΛΗΜΟΝΑ','ΠΡΟΣ ΕΒΡΑΙΟΥΣ','ΙΑΚΩΒΟΥ','Α΄ ΠΕΤΡΟΥ','Β΄ ΠΕΤΡΟΥ','Α΄ ΙΩΑΝΝΟΥ','Β΄ ΙΩΑΝΝΟΥ','Γ΄ ΙΩΑΝΝΟΥ','ΙΟΥΔΑ','ΑΠΟΚΑΛΥΨΗ ΙΩΑΝΝΟΥ'],
	'en': ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","I Samuel","II Samuel","I Kings","II Kings","I Chronicles","II Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","I Corinthians","II Corinthians","Galatians","Ephesians","Philippians","Colossians","I Thessalonians","II Thessalonians","I Timothy","II Timothy","Titus","Philemon","Hebrews","James","I Peter","II Peter","I John","II John","III John","Jude","Revelation"],
	'enm': ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Kings','2 Kings','3 Kings','4 Kings','1 Paralipomenon','2 Paralipomenon','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Songes of Songes','Isaiah','Jeremiah','Lamentations','Ezechiel','Daniel','Osee','Joel','Amos','Abdias','Jonas','Mychee','Naum','Abacuk','Sofonye','Aggey','Sacarie','Malachie','Matheu','Mark','Luke','John','Dedis of Apostlis','Romaynes','1 Corinthis','2 Corinthis','Galathies','Effesies','Filipensis','Colosencis','1 Thessalonycensis','2 Thessalonycensis','1 Tymothe','2 Tymothe','Tite','Filemon','Ebrews','James','1 Petre','2 Petre','1 Joon','2 Joon','3 Joon','Judas','Apocalips'],
	'eo': ['Genezo','Eliro','Levidoj','Nombroj','Readmono','Josuo','Juĝistoj','Rut','1 Samuel','2 Samuel','1 Reĝoj','2 Reĝoj','1 Kroniko','2 Kroniko','Ezra','Neĥemja','Ester','Ijob','Psalmaro','Sentencoj','Predikanto','Alt Kanto','Jesaja','Jeremia','Plorkanto','Jeĥezkel','Daniel','Hoŝea','Joel','Amos','Obadja','Jona','Miĥa','Naĥum','Ĥabakuk','Cefanja','Ĥagaj','Zeĥarja','Malaĥi','Mateo','Marko','Luko','Johano','Agoj','Romanoj','1 Korintanoj','2 Korintanoj','Galatoj','Efesanoj','Filipianoj','Koloseanoj','1 Tesalonikanoj','2 Tesalonikanoj','1 Timoteo','2 Timoteo','Tito','Filemon','Hebreoj','Jakobo','1 Petro','2 Petro','1 Johano','2 Johano','3 Johano','Judas','Apokalipso'],
	'es': ['GÉNESIS','ÉXODO','LEVÍTICO','NÚMEROS','DEUTERONOMIO','JOSUÉ','JUECES','RUT','1 SAMUEL','2 SAMUEL','1 REYES','2 REYES','1 CRÓNICAS','2 CRÓNICAS','ESDRAS','NEHEMÍAS','ESTER','JOB','SALMOS','PROVERBIOS','ECLESIASTÉS','CANTARES','ISAÍAS','JEREMÍAS','LAMENTACIONES','EZEQUIEL','DANIEL','OSEAS','JOEL','AMÓS','ABDÍAS','JONÁS','MIQUEAS','NAHUM','HABACUC','SOFONÍAS','AGEO','ZACARÍAS','MALAQUÍAS','MATEO','MARCOS','LUCAS','JUAN','HECHOS','ROMANOS','1 CORINTIOS','2 CORINTIOS','GÁLATAS','EFESIOS','FILIPENSES','COLOSENSES','1 TESALONICENSES','2 TESALONICENSES','1 TIMOTEO','2 TIMOTEO','TITO','FILEMÓN','HEBREOS','SANTIAGO','1 PEDRO','2 PEDRO','1 JUAN','2 JUAN','3 JUAN','JUDAS','APOCALIPSIS'],
	'fa': ["پدایش","خروج","لاویان","اعداد","تشنیه","یوشع","داوران","روت","اول سموییل","دوم سموییل","اول پادشاهان","دوم پادشاهان","اول تواریخ","دوم تواریخ","عزرا","نحمیا","استر","ایوب","مزامیر","امثال","جامعه","غزل غزلها","اشعیا","ارمیا","مراثی ارمیا","حزقیال","دانیال","هوشع","یوییل","عاموس","عوبدیا","یونس","میکاه","ناحوم","حبقوق","صفنیا","حخی","زکریا","ملاکی","متی","مرقس","لوقا","یوحنا","اعمال رسولان","رومیان","اول قرنتیان","دوم قرنتیان","علاطیان","افسیان","فلیپیان","کولسیان","اول تسالونیکیان","دوم تسالونیکیان","اول تیموتایوس","دوم تیموتایوس","تیطوس","فلیمون","عبرانیان","یعقوب","اول پطرس","دوم پطرس","اول یحنا","دوم یحنا","سوم یحانا","یهودا","مکاشفه"],
	'fi': ['1. Mooseksen kirja','2. Mooseksen kirja','3. Mooseksen kirja','4. Mooseksen kirja','5. Mooseksen kirja','Joosua','Tuomarien Kirja','Ruut','1. Samuelin kirja','2. Samuelin kirja','1. Kuningasten kirja','2. Kuningasten kirja','1. Aikakirja','2. Aikakirja','Esra','Nehemia','Ester','Job','Psalmit','Sananlaskut','Saarnaaja','Korkea veisu','Jesaja','Jeremia','Valitusvirret','Hesekiel','Daniel','Hoosea','Jooel','Aamos','Obadja','Joona','Miika','Naahum','Habakuk','Sefanja','Haggai','Sakarja','Malakia','Matteus','Markus','Luukas','Johannes','Apostolien teot','Roomalaiskirje','1. Korinttilaiskirje','2. Korinttilaiskirje','Galatalaiskirje','Efesolaiskirje','Filippiläiskirje','Kolossalaiskirje','1. Tessalonikalaiskirje','2. Tessalonikalaiskirje','1. Timoteuskirje','2. Timoteuskirje','Tituskirje','Filemonkirje','Heprealaiskirje','Jaakobin kirje','1. Pietarin kirje','2. Pietarin kirje','1. Johanneksen kirje','2. Johanneksen kirje','3. Johanneksen kirje','Juudaksen kirje','Ilmestyskirja'],
	"fr":["Genèse","Exode","Lévitique","Nombres","Deutéronome","Josué","Juges","Ruth","1 Samuel","2 Samuel","1 Rois","2 Rois","1 Chroniques","2 Chroniques","Esdras","Néhémie","Esther","Job","Psaumes","Proverbes","Ecclésiaste","Cantique des Cantiques","Ésaïe","Jérémie","Lamentations","Ézéchiel","Daniel","Osée","Joël","Amos","Abdias","Jonas","Michée","Nahum","Habacuc","Sophonie","Aggée","Zacharie","Malachie","Matthieu","Marc","Luc","Jean","Actes","Romains","1 Corinthiens","2 Corinthiens","Galates","Éphésiens","Philippiens","Colossiens","1 Thessaloniciens","2 Thessaloniciens","1 Timothée","2 Timothée","Tite","Philémon","Hébreux","Jacques","1 Pierre","2 Pierre","1 Jean","2 Jean","3 Jean","Jude","Apocalypse"],
	'ga': ['Genesis','Exodus','Lebhiticus','Uibhreacha','Deuteronomi','Iosua','Breitheamhuin','Rut','I Samuel','II Samuel','I Riogh','II Riogh','I Croinicoibh','II Croiniclibh','Esra','Nehemia','Ester','Job','Psailm','Seanraite','Ecclesiastes','Caintic Sholaimh','Isaiah','Ieremiah','Triabhuin','Esechiel','Daniel','Hosea','Ioel','Amos','Obadiah','Jonah','Micah','Nahum','Habaccuc','Sephaniah','Haggai','Sechariah','Malachi','Matha','Marcus','Lúcas','Eóin','Gníomhartha','Romhánach','I Ccorintiánach','II Ccorintiánach','Galatiánach','Hephesiánach','Bhphilippiánach','Ccolossianach','I Ttessalonicanach','II Ttessalonicanach','I Timóteuis','II Timóteuis','Tituis','Philémoin','Neabhruidheach','Sheamuis','I Pheadair','II Pheadair','I Eóin','II Eóin','III Eóin','Iudais','Taisbeanadh'],
	'gd': ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','Marcus','','','','','','','','','','','','','','','','','','','','','','','',''],
	'gez': ['የማቴዎስ ወንጌል','የማርቆስ ወንጌል','የሉቃስ ወንጌል','የዮሐንስ ወንጌል','የሐዋርያት ሥራ','ወደ ሮሜ ሰዎች','፩ኛ ወደ ቆሮንቶስ ሰዎች','፪ኛ ወደ ቆሮንቶስ ሰዎች','ወደ ገላትያ ሰዎች','ወደ ኤፌሶን ሰዎች','ወደ ፊልጵስዩስ ሰዎች','ወደ ቆላስይስ ሰዎች','፩ኛ ወደ ተሰሎንቄ ሰዎች','፪ኛ ወደ ተሰሎንቄ ሰዎች','፩ኛ ወደ ጢሞቴዎስ','፪ኛ ወደ ጢሞቴዎስ','ወደ ቲቶ','ወደ ፊልሞና','ወደ ዕብራውያን','የያዕቆብ መልእክት','፩ኛ የጴጥሮስ መልእክት','፪ኛ የጴጥሮስ መልእክት','፩ኛ የዮሐንስ መልእክት','፪ኛ የዮሐንስ መልእክት','፫ኛ የዮሐንስ መልእክት','የይሁዳ መልእክት','የዮሐንስ ራእይ','ኦሪት ዘፍጥረት','ኦሪት ዘጸአት','ኦሪት ዘሌዋውያን','ኦሪት ዘኍልቍ','ኦሪት ዘዳግም','መጽሐፈ ኢያሱ ወልደ ነዌ','መጽሐፈ መሳፍንት','መጽሐፈ ሩት','መጽሐፈ ሳሙኤል ቀዳማዊ','መጽሐፈ ሳሙኤል ካልዕ','መጽሐፈ ነገሥት ቀዳማዊ','መጽሐፈ ነገሥት ካልዕ','መጽሐፈ ዜና መዋዕል ቀዳማዊ','መጽሐፈ ዜና መዋዕል ካልዕ','መጽሐፈ ዕዝራ','መጽሐፈ ነህምያ','መጽሐፈ አስቴር','መጽሐፈ ኢዮብ','መዝሙረ ዳዊት','መጽሐፈ ምሳሌ','መጽሐፈ መክብብ','መኃልየ መኃልይ ዘሰሎሞን','ትንቢተ ኢሳይያስ','ትንቢተ ኤርምያስ','ሰቆቃው ኤርምያስ','ትንቢተ ሕዝቅኤል','ትንቢተ ዳንኤል','ትንቢተ ሆሴዕ','ትንቢተ አሞጽ','ትንቢተ ሚክያስ','ትንቢተ ኢዮኤል','ትንቢተ አብድዩ','ትንቢተ ዮናስ','ትንቢተ ናሆም','ትንቢተ ዕንባቆም','ትንቢተ ሶፎንያስ','ትንቢተ ሐጌ','ትንቢተ ዘካርያስ','ትንቢተ ሚልክያ'],
	'grc': ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',"Ματθαίος","Μαρκος","Λουκας","Ιωαννης","Πραξεις","Ρωμαιους","Α Κορινθίους","Β Κορινθίους","Γαλατες","Εφεσιους","Φιλιππησιους","Κολοσσαεις","Α Θεσσαλονικεις","Β Θεσσαλονικεις","Α Τιμοθεο","Β Τιμοθεο","Τιτο","Φιλημονα","Εβραιους","Ιακωβου","Α Πετρου","Β Πετρου","Α Ιωαννη","Β Ιωαννη","Γ Ιωαννη","Ιουδα","Αποκαλυψη του Ιωαννη"],
	'he': ['בראשית','שמות','ויקרא','במדבר','דברים','יהושע','שפטים','שמואל א','שמואל ב','מלכים א','מלכים ב','ישעיה','ירמיה','יחזקאל','הושע','יואל','עמוס','עבדיה','יונה','מיכה','נחום','חבקוק','צפניה','חגי','זכריה','מלאכי','תהלים','משלי','איוב','שיר השירים','רות','איכה','קהלת','אסתר','דניאל','עזרא','נחמיה','דברי הימים א','דברי הימים ב','מתי','מרקוס','לוקס','יוחנן','מעשי השליחים','אל הרומים','הראשונה אל הקורינתים','השניה אל הקורינתים','אל הגלטים','אל האפסים','אל הפיליפים','אל הקולוסים','הראשונה אל התסלוניקים','השניה אל התסלוניקים','הראשונה אל טימותיאוס','השניה אל טימותיאוס','אל טיטוס','אל פילימון','אל העברים','אגרת יעקב','הראשונה לכיפא','השניה לכיפא','הראשונה ליוחנן','השניה ליוחנן','השלישית ליוחנן','אגרת יהודה','ההתגלות'],
	'hi': ['उत्पत्ति','निर्गमन','लैव्यवस्था','गिनती','व्यवस्थाविवरण','यहोशू','न्यायियों','रूत','1 शमूएल','2 शमूएल','1 राजा','2 राजा','1 इतिहास','2 इतिहास','एज्रा','नहेमायाह','एस्तेर','अय्यूब','भजन संहिता','नीतिवचन','सभोपदेशक','श्रेष्ठगीत','यशायाह','यिर्मयाह','विलापगीत','यहेजकेल','दानिय्येल','होशे','योएल','आमोस','ओबद्दाह','योना','मीका','नहूम','हबक्कूक','सपन्याह','हाग्गै','जकर्याह','मलाकी','मत्ती','मरकुस','लूका','यूहन्ना','प्रेरितों के काम','रोमियो','1 कुरिन्थियों','2 कुरिन्थियों','गलातियों','इफिसियों','फिलिप्पियों','कुलुस्सियों','1 थिस्सलुनीकियों','2 थिस्सलुनीकियों','1 तीमुथियुस','2 तीमुथियुस','तीतुस','फिलेमोन','इब्रानियों','याकूब','1 पतरस','2 पतरस','1 यूहन्ना','2 यूहन्ना','3 यूहन्ना','यहूदा','प्रकाशित वाक्य'],
	'hlt':['Suencuek','Sunglatnah','Thothuengnah','Lampahnah','Olrhaep','Joshua','Laitloekkung','Ruth','1 Samuel','2 Samuel','1 Manghai','2 Manghai','1 Khokhuen','2 Khokhuen','Ezra','Nehemiah','Esther','Job','Tingtoeng','Olcueih','Thuituen','Solomon Laa','Isaiah','Jeremiah','Rhaengsae','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malakhi','Matthai','Marku','Luka','Johan','Caeltueih','Rom','1 Khawrin','2 Khawrin','Galati','Ephisa','Philipi','Kolosa','1 Thesalonika','2 Thesalonika','1 Timothy','2 Timothy','Titu','Philimon','Hebru','Jame','1 Peter','2 Peter','1 Johan','2 Johan','3 Johan','Jude','Olphong'],
	'ht': ['Jenèz','Egzòd','Levitik','Nonb','Detewonòm','Jozye','Jij','Rit','1 Samyèl','2 Samyèl','1 Wa','2 Wa','1 Kwonik','2 Kwonik','Esdras','Neyemi','Estè','Jòb','Sòm','Pwovèb','Eklezyas','Kantik','Ezayi','Jeremi','Lamantasyon','Ezekyèl','Danyèl','Oze','Jowèl','Amòs','Abdyas','Jonas','Miche','Nawoum','Abakik','Sofoni','Aje','Zakari','Malachi','Tobi','Jidit','Estè (Grèk)','1 Makabe','2 Makabe','Sajès','Chirasid','Barik','Lèt Jeremi','Danyèl (Grèk)','Sizàn','Bèl','Matye','Mak','Lik','Jan','Travay','Women','1 Korent','2 Korent','Galat','Efezyen','Filipyen','Kolosyen','1 Tesalonisyen','2 Tesalonisyen','1 Timote','2 Timote','Tit','Filemon','Ebre','Jak','1 Pyè','2 Pyè','1 Jan','2 Jan','3 Jan','Jid','Revelasyon'],
	'hu': ['1 Mózes','2 Mózes','3 Mózes','4 Mózes','5 Mózes','Józsué','Bírák','Ruth','1 Sámuel','2 Sámuel','1 Királyok','2 Királyok','1 Krónika','2 Krónika','Ezsdrás','Nehémiás','Eszter','Jób','Zsoltárok','Példabeszédek','Prédikátor','Énekek','Ésaiás','Jeremiás','Jeremiás siralmai','Ezékiel','Dániel','Hóseás','Jóel','Ámós','Abdiás','Jónás','Mikeás','Náhum','Habakuk','Sofóniás','Aggeus','Zakariás','Malakiás','Máté','Márk','Lukács','János','Cselekedetek','Róma','1 Korinthus','2 Korinthus','Galátzia','Efézus','Filippi','Kolossé','1 Thessalonika','2 Thessalonika','1 Timótheus','2 Timótheus','Titus','Filemon','Zsidók','Jakab','1 Péter','2 Péter','1 János','2 János','3 János','Júdás','Jelenések'],
	'hy': ['ԾՆՆԴՈՑØ','ԵԼՔØ','ՂԵՎՏԱԿԱՆØ','ԹՎԵՐØ','Բ ՕՐԵՆՔØ','ՀԵՍՈՒØ','ԴԱՏԱՎՈՐՆԵՐØ','ՀՌՈՒԹØ','Ա ԹԱԳԱՎՈՐՆԵՐԻØ','Բ ԹԱԳԱՎՈՐՆԵՐԻØ','Գ ԹԱԳԱՎՈՐՆԵՐԻØ','Դ ԹԱԳԱՎՈՐՆԵՐԻØ','Ա ՄՆԱՑՈՐԴԱՑØ','Բ ՄՆԱՑՈՐԴԱՑØ','ԵԶՐԱՍØ','ՆԵԵՄԻԱØ','ԵՍԹԵՐØ','ՀՈԲØ','ՍԱՂՄՈՍՆԵՐØ','ԱՌԱԿՆԵՐØ','ԺՈՂՈՎՈՂØ','ԵՐԳ ԵՐԳՈՑØ','ԵՍԱՅԻØ','ԵՐԵՄԻԱØ','ԵՐԵՄԻԱՅԻ ՈՂԲԵՐԸØ','ԵԶԵԿԻԵԼØ','ԴԱՆԻԵԼØ','ՈՎՍԵԵØ','ՀՈՎԵԼØ','ԱՄՈՎՍØ','ԱԲԴԻԱØ','ՀՈՎՆԱՆØ','ՄԻՔԻԱØ','ՆԱՈՒՄØ','ԱՄԲԱԿՈՒՄØ','ՍՈՓՈՆԻԱØ','ԱՆԳԵØ','ԶԱՔԱՐԻԱØ','ՄԱՂԱՔԻԱØ','ՄատթեոսØ','ՄարկոսØ','ՂուկասØ','ՀՈՎՀԱՆՆԵՍØ','Գործք ԱռաքելոցØ','ՀռոմեացիներինØ','Ա ԿորնթացիներինØ','Բ ԿորնթացիներինØ','ԳաղատացիներինØ','ԵփեսացիներինØ','ՓիլիպպեցիներինØ','ԿողոսացիներինØ','Ա ԹեսաղոնիկեցիներինØ','Բ ԹեսաղոնիկեցիներինØ','Ա ՏիմոթեոսինØ','Բ ՏիմոթեոսինØ','ՏիտոսինØ','ՓիլիմոնինØ','ԵբրայեցիներինØ','ՀակոբոսØ','Ա ՊետրոսØ','Բ ՊետրոսØ','Ա ՀովհաննեսØ','Բ ՀովհաննեսØ','Գ ՀովհաննեսØ','ՀուդաØ','ՀայտնությունØ'],
	'it': ['Genesi','Esodo','Levitico','Numeri','Deuteronomio','Giosuè','Giudici','Rut','1 Samuele','2 Samuele','1 Re','2 Re','1 Cronache','2 Cronache','Esdra','Neemia','Ester','Giobbe','Salmi','Proverbi','Qoelet','Cantico dei Cantici','Isaia','Geremia','Lamentazioni','Ezechiele','Daniele','Osea','Gioele','Amos','Abdia','Giona','Michea','Naum','Abacuc','Sofonia','Aggeo','Zaccaria','Malachia','Matteo','Marco','Luca','Giovanni','Atti','Romani','1 Corinzi','2 Corinzi','Galati','Efesini','Filippesi','Colossesi','1 Tessalonicesi','2 Tessalonicesi','1 Timoteo','2 Timoteo','Tito','Filèmone','Ebrei','Giacomo','1 Pietro','2 Pietro','1 Giovanni','2 Giovanni','3 Giovanni','Giuda','Apocalisse'],
	'ja': ['創世記','出エジプト記','レビ記','民数記','申命記','ヨシュア記','士師記','ルツ記','サムエル記上','サムエル記下','列王記上','列王記下','歴代誌上','歴代誌下','エズラ記','ネヘミヤ記','エステル記','ヨブ記','詩篇','箴言','伝道の書','雅歌','イザヤ書','エレミヤ書','哀歌','エゼキエル書','ダニエル書','ホセア書','ヨエル書','アモス書','オバデヤ書','ヨナ書','ミカ書','ナホム書','ハバクク書','ゼパニヤ書','ハガイ書','ゼカリヤ書','マラキ書','マタイによる福音書','マルコによる福音書','ルカによる福音書','ヨハネによる福音書','使徒行伝','ローマ人への手紙','コリント人への第一の手紙','コリント人への第二の手紙','ガラテヤ人への手紙','エペソ人への手紙','ピリピ人への手紙','コロサイ人への手紙','テサロニケ人への第一の手紙','テサロニケ人への第二の手紙','テモテへの第一の手紙','テモテへの第二の手紙','テトスへの手紙','ピレモンへの手紙','ヘブル人への手紙','ヤコブの手紙','ペテロの第一の手紙','ペテロの第二の手紙','ヨハネの第一の手紙','ヨハネの第二の手紙','ヨハネの第三の手紙','ユダの手紙','ヨハネの黙示録'],
	'kk': ['Жаратылыстың баст.','Мысырдан шығу','Леуіліктер','Руларды санау','Заңды қайталау','Ешуа','Билер','Рут','Патшалықтар 1-ж.','Патшалықтар 2-ж.','Патшалықтар 3-ж.','Патшалықтар 4-ж.','Шежірелер 1-ж.','Шежірелер 2-ж.','Езра','Нехемия','Естер','Әйүп','Забур жырлары','Нақыл сөздер','Уағыздаушы','Таңдаулы ән','Ишая','Еремия','Жоқтау','Езекиел','Даниял','Ошия','Амос','Миха','Жоел','Абди','Жүніс','Нақұм','Аббақұқ','Софония','Хаққай','Зәкәрия','Малахи','Матай','Марқа','Лұқа','Жохан','Елшіл. істері','Жақыптың хаты','Петірдің 1-хаты','Петірдің 2-хаты','Жоханның 1-хаты','Жоханның 2-хаты','Жоханның 3-хаты','Яһуданың хаты','Римдіктерге хат','Қорынттықт. 1-хат','Қорынттықт. 2-хат','Ғалаттықт. хат','Ефестікт. хат','Філіпілікт. хат','Қолостықт. хат','Салониқал. 1-хат','Салониқал. 2-хат','Тімотеге 1-хат','Тімотеге 2-хат','Титке хат','Філимонға хат','Еврейлерге хат','Аян'],
	'ko': ['창세기','출애굽기','레위기','민수기','신명기','여호수아','사사기','룻기','사무엘상','사무엘하','열왕기상','열왕기하','역대상','역대하','에스라','느헤미야','에스더','욥기','시편','잠언','전도서','아가','이사야','예레미야','예레미야애가','에스겔','다니엘','호세아','요엘','아모스','오바댜','요나','미가','나훔','하박국','스바냐','학개','스가랴','말라기','마태복음','마가복음','누가복음','요한복음','사도행전','로마서','고린도전서','고린도후서','갈라디아서','에베소서','빌립보서','골로새서','데살로니가전서','데살로니가후서','디모데전서','디모데후서','디도서','빌레몬서','히브리서','야고보서','베드로전서','베드로후서','요한일서','요한이서','요한삼서','유다서','요한계시록'],
	'la': ['Genesis','Exodus','Leviticus','Numeri','Deuteronomium','Josue','Judicum','Ruth','Regum I','Regum II','Regum III','Regum IV','Paralipomenon I','Paralipomenon II','Esdræ','Nehemiæ','Tobiæ','Judith','Esther','Job','Psalmi','Proverbia','Ecclesiastes','Canticum Canticorum','Sapientia','Ecclesiasticus','Isaias','Jeremias','Lamentationes','Baruch','Ezechiel','Daniel','Osee','Joël','Amos','Abdias','Jonas','Michæa','Nahum','Habacuc','Sophonias','Aggæus','Zacharias','Malachias','Machabæorum I','Machabæorum II','Matthæus','Marcus','Lucas','Joannes','Actus Apostolorum','ad Romanos','ad Corinthios I','ad Corinthios II','ad Galatas','ad Ephesios','ad Philippenses','ad Colossenses','ad Thessalonicenses I','ad Thessalonicenses II','ad Timotheum I','ad Timotheum II','ad Titum','ad Philemonem','ad Hebræos','Jacobi','Petri I','Petri II','Joannis I','Joannis II','Joannis III','Judæ','Apocalypsis'],
	'lt': ['Pradžios','Išėjimo','Kunigų','Skaičių','Pakartoto Įstatymo','Jozuės','Teisėjų','Rūtos','1 Samuelio','2 Samuelio','1 Karalių','2 Karalių','1 Metraščių','2 Metraščių','Ezros','Nehemijo','Esteros','Jobo','Psalmynas','Patarlės','Mokytojo','Giesmių giesmės','Izaijo','Jeremijo','Raudų','Ezechielio','Danieliaus','Ozėjo','Joelio','Amoso','Abdijo','Jonos','Michėjo','Nahumo','Habakuko','Sofonijo','Agėjo','Zacharijo','Malachijo','Tobito','Juditos','Esteros (graikiškoji)','1 Makabiejų','2 Makabiejų','Išminties','Siracido','Barucho','Danieliaus (graikiškieji)','Mato','Morkaus','Luko','Jono','Apaštalų darbai','Romiečiams','1 Korintiečiams','2 Korintiečiams','Galatams','Efeziečiams','Filipiečiams','Kolosiečiams','1 Tesalonikiečiams','2 Tesalonikiečiams','1 Timotiejui','2 Timotiejui','Titui','Filemonui','Hebrajams','Jokūbo','1 Petro','2 Petro','1 Jono','2 Jono','3 Jono','Judo','Apreiškimas'],
	'luo': ['Chakruok','Wuok','Tim jo-Lawi','Kwan','Rapar mar Chik','Joshua','Jong’ad Bura','Ruth','1 Samuel','2 Samuel','1 Ruodhi','2 Ruodhi','1 Weche mag Ndalo','2 Weche mag Ndalo','Ezra','Nehemia','Tobit','Judith','Esta, kod weche moko momedie','1 Jo-Makabayo','2 Jo-Makabayo','Ayub','Zaburi','Ngeche','Eklesiastes','Wer Mamit Moloyo Wende Moko Duto','Rieko','Eklesiastikus','Isaya','Jeremia','Ywagruok','Baruk','Ezekiel','Daniel','Hosea','Joel','Amos','Obadia','Jona','Mika','Nahum','Habakuk','Zefania','Hagai','Zekaria','Malaki','Mathayo','Mariko','Luka','Johana','Tich Joote','Jo-Rumi','1 Jo-Korintho','2 Jo-Korintho','Jo-Galatia','Jo-Efeso','Jo-Filipi','Jo-Kolosai','1 Jo-Thesalonika','2 Jo-Thesalonika','1 Timotheo','2 Timotheo','Tito','Filemon','Jo-Hibrania','Jakobo','1 Petro','2 Petro','1 Johana','2 Johana','3 Johana','Juda','Fweny'],
	'lv': ['1. Mozus','2. Mozus','3. Mozus','4. Mozus','5. Mozus','Jozuas','Soģu','Rutes','1. Samuēla','2. Samuēla','1. Ķēniņu','2. Ķēniņu','1. Laiku','Otrā Laiku','Ezras','Nehemijas','Esteres','Ījaba','Psalmi','Salamana Pamācības','Salamans mācītājs','Augstā dziesma','Jesajas','Jeremijas','Raudu dziesmas','Ecēhiēla','Daniēla','Hozejas','Joēla','Amosa','Obadjas','Jonas','Mihas','Nahuma','Habakuka','Cefanjas','Hagaja','Caharijas','Maleahija','Mateja','Marka','Lūkas','Jāņa','Apustuļu darbi','Romiešiem','1. korintiešiem','2. korintiešiem','Galatiešiem','Efeziešiem','Filipiešiem','Kolosiešiem','1. Tesaloniķiešiem','2. Tesaloniķiešiem','1. Timotejam','2. Timotejam','Titam','Filemonam','Ebrejiem','Jēkaba','1. Pētera','2. Pētera','1. Jāņa','2. Jāņa','3. Jāņa','Jūdas','Jāņa atklāsmes'],
	'lzh': ['創世記','出埃及記','利未記','民數紀畧','申命記','約書亞記','士師記','路得記','撒母耳記上','撒母耳記下','列王紀畧上','列王紀畧下','歷代志畧上','歷代志畧下','以士喇紀','尼希米紀','以士帖紀','約百紀','詩篇','箴言','傳道','雅歌','以賽亞書','耶利米書','耶利米哀歌','以西結書','但以理書','何西書','約耳書','亞麽士書','阿巴底書','約拿書','米迦書','拿翁書','哈巴谷書','西番雅書','哈基書','撒加利亞書','馬拉基書','馬太福音傳','馬可福音傳','路加福音傳','約翰福音傳','使徒行傳','使徒保羅達羅馬人書','使徒保羅達哥林多人前書','使徒保羅達哥林多人後書','使徒保羅達加拉太人書','使徒保羅達以弗所人書','使徒保羅達腓立比人書','使徒保羅達哥羅西人書','使徒保羅達帖撒羅尼迦人前書','使徒保羅達帖撒羅尼迦人後書','使徒保羅達提摩太前書','使徒保羅達提摩太後書','使徒保羅達提多書','使徒保羅達腓利門書','使徒保羅達希伯來人書','使徒雅各書','使徒彼得前書','使徒彼得後書','使徒約翰第一書','使徒約翰第二書','使徒約翰第三書','使徒猶大書','使徒約翰默示錄'],
	'mal': ['ഉല്പ.','പുറ.','ലേവ്യ.','സംഖ്യ.','ആവർ.','യോശുവ','ന്യായാ.','രൂത്ത്','1 ശമു.','2 ശമു.','1 രാജാ.','2 രാജാ.','1 ദിന.','2 ദിന.','എസ്രാ','നെഹെ.','എസ്ഥേ.','ഇയ്യോ.','സങ്കീ.','സദൃ.','സഭാ.','ഉത്ത.','യെശ.','യിരെ.','വിലാ.','യെഹെ.','ദാനീ.','ഹോശേ.','യോവേ.','ആമോ.','ഓബ.','യോനാ','മീഖാ','നഹൂം','ഹബ.','സെഫ.','ഹഗ്ഗാ.','സെഖ.','മലാ.','മത്താ.','മർക്കൊ.','ലൂക്കൊ.','യോഹ.','പ്രവൃത്തികൾ','റോമ.','1 കൊരി.','2 കൊരി.','ഗലാ.','എഫെ.','ഫിലി.','കൊലൊ.','1 തെസ്സ.','2 തെസ്സ.','1 തിമൊ.','2 തിമൊ.','തീത്തൊ.','ഫിലേ.','എബ്രാ.','യാക്കോ.','1 പത്രൊ.','2 പത്രൊ.','1 യോഹ.','2 യോഹ.','3 യോഹ.','യൂദാ','വെളി.'],
	'nb': ['1 Mosebok','2 Mosebok','3 Mosebok','4 Mosebok','5 Mosebok','Josva','Dommerne','Rut','1 Samuel','2 Samuel','1 Kongebok','2 Kongebok','1 Krønikebok','2 Krønikebok','Esra','Nehemja','Ester','Job','Salmene','Salomos Ordspråk','Forkynneren','Høysangen','Jesaja','Jeremia','Klagesangene','Esekiel','Daniel','Hosea','Joel','Amos','Obadja','Jona','Mika','Nahum','Habakkuk','Sefanja','Haggai','Sakarja','Malaki','Matteus','Markus','Lukas','Johannes','Apostlenes gjerninger','Romerne','1 Korinter','2 Korinter','Galaterne','Efeserne','Filipperne','Kolosserne','1 Tessaloniker','2 Tessaloniker','1 Timoteus','2 Timoteus','Titus','Filemon','Hebreerne','Jakob','1 Peter','2 Peter','1 Johannes','2 Johannes','3 Johannes','Judas','Åpenbaringen'],
	'nd': ['UGenesisi','U-Eksodusi','ULevi','Amanani','UDutheronomi','UJoshuwa','Abahluleli','URuthe','1 USamuyeli','2 USamuyeli','1 Amakhosi','2 Amakhosi','1 Imilando','2 Imilando','U-Ezra','UNehemiya','U-Esta','UJobe','Amahubo','Izaga','UmTshumayeli','Ingoma Yezingoma','U-Isaya','UJeremiya','Izililo','UHezekheli','UDanyeli','UHoseya','UJoweli','U-Amosi','U-Obhadiya','UJona','UMikha','UNahume','UHabakhukhi','UZefaniya','UHagayi','UZekhariya','UMalaki','UMathewu','UMakho','ULukha','UJohane','Imisebenzi','KwabaseRoma','1 KwabaseKhorinte','2 Kwabasekhorinte','KwabaseGalathiya','Kwabase-Efesu','KwabaseFiliphi','KwabaseKholose','1 KwabaseThesalonika','2 KwabaseThesalonika','1 KuThimothi','2 KuThimothi','KuThithusi','UFilimoni','KumaHebheru','UJakhobe','1 UPhetro','2 UPhetro','1 UJohane','2 UJohane','3 UJohane','UJuda','Isambulo'],
	'nl': ['Genesis','Exodus','Leviticus','Numeri','Deuteronomium','Jozua','Richteren','Ruth','1 Samuel','2 Samuel','1 Koningen','2 Koningen','1 Kronieken','2 Kronieken','Ezra','Nehemia','Esther','Job','Psalm','Spreuken','Prediker','Hooglied','Jesaja','Jeremia','Klaagliederen','Ezechiël','Daniël','Hosea','Joël','Amos','Obadja','Jona','Micha','Nahum','Habakuk','Zefanja','Haggaï','Zacharia','Maleachi','Mattheüs','Markus','Lukas','Johannes','Handelingen','Romeinen','1 Korinthe','2 Korinthe','Galaten','Efeze','Filippenzen','Kolossenzen','1 Thessalonicenzen','2 Thessalonicenzen','1 Timotheüs','2 Timotheüs','Titus','Filemon','Hebreeën','Jakobus','1 Petrus','2 Petrus','1 Johannes','2 Johannes','3 Johannes','Judas','Openbaring'],
	'nn': ['1. Mosebok','2. Mosebok','3. Mosebok','4. Mosebok','5. Mosebok','Josva','Dommarane','Rut','1. Samuelsbok','2. Samuelsbok','1. Kongebok','2. Kongebok','1. Krønikebok','2. Krønikebok','Esra','Nehemja','Ester','Job','Salmane','Ordtaka','Forkynnaren','Høgsongen','Jesaja','Jeremia','Klagesongane','Esekiel','Daniel','Hosea','Joel','Amos','Obadja','Jona','Mika','Nahum','Habakkuk','Sefanja','Haggai','Sakarja','Malaki','Matteus','Markus','Lukas','Johannes','Apostelgjerningane','Romarane','1. Korintar','2. Korintar','Galatarane','Efesarane','Filipparane','Kolossarane','1. Tessalonikar','2. Tessalonikar','1. Timoteus','2. Timoteus','Titus','Filemon','Hebrearane','Jakob','1. Peter','2. Peter','1. Johannes','2. Johannes','3. Johannes','Judas','Johannes\' openberring'],
	'pl': ['I Księga Mojżesza','II Księga Mojżesza','III Księga Mojżesza','IV Księga Mojżesza','V Księga Mojżesza','Księga Jezusa syna Nuna','Księga Sędziów','Księga Rut','1 Samuela','2 Samuela','Pierwsza Księga Królów','Druga Księga Królów','1 Kronik','2 Kronik','Księga Ezdrasza','Księga Nehemiasza','Księga Estery','Księga Ijoba','Księga Psalmów','Przypowieści Salomona','Księga Koheleta','Pieśń nad pieśniami','Księga Izajasza','Księga Jeremiasza','Treny','Księga Ezechiela','Księga Daniela','Księga Ozeasza','Księga Joela','Księga Amosa','Księga Abdjasza','Księga Jonasza','Księga Micheasza','Ksiega Nahuma','Księga Habakuka','Księga Sofonjasza','Księga Aggeusza','Księga Zacharjasza','Księga Malachjasza','Ewangelia Mateusza','Ewangelia Marka','Ewangelia Łukasza','Ewangelia Jana','Dokonania apostołów','List do Rzymian','Pierwszy list do Koryntian','Drugi list do Koryntian','List do Galacjan','List do Efezjan','List do Filippian','List do Kolosan','Pierwszy list do Tesaloniczan','Drugi list do Tesaloniczan','Pierwszy list do Tymoteusza','Drugi list do Tymoteusza','List do Tytusa','List do Filemona','List do Hebrajczyków','List Jakóba','Pierwszy list Piotra','Drugi list Piotra','Pierwszy List Jana','Drugi List Jana','Trzeci List Jana','List Judasa','Objawienie spisane przez Jana'],
	'pon': ['SENESIS','EKSODUS','LIPAI','NEMPE KAN','DEUDERONOMI','SOSUA','SOUNKOPWUNG KAN','RUD','1 SAMUEL','2 SAMUEL','1 NANMWARKI KAN','2 NANMWARKI KAN','1 KRONIKEL','2 KRONIKEL','ESRA','NEHMAIA','ESTER','SOHP','MELKAHKA KAN','LEPIN PADAHK AUDAPAN KAN','EKLESIASDES','MELKAHKAHN MELKAHKA KAN','AISEIA','SEREMAIA','KOULEN KEDEPWIDEPW KAN','ESEKIEL','DANIEL','OSEIA','JOEL','EIMWOS','OPADAIA','SONA','MAIKA','NAHUM','APAKUK','SEPANAIA','AKKAI','SEKARAIA','MALAKAI','MADIU','MARK','LUK','SOHN','WIEWIA KAN','ROM','1 KORINT','2 KORINT','KALESIA','EPISOS','PILIPAI','KOLOSE','1 DESELONIKA','DESELONIKA','1 TIMOTY','2 TIMOTY','TAITUS','PAILIMWON','IPRU','SEIMS','1 PITER','2 PITER','1 SOHN','2 SOHN','3 SOHN','SUD','KAUDIAHL'],
	'pot': ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","I Samuel","II Samuel","I Kings","II Kings","I Chronicles","II Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","I Corinthians","II Corinthians","Galatians","Ephesians","Philippians","Colossians","I Thessalonians","II Thessalonians","I Timothy","II Timothy","Titus","Philemon","Hebrews","James","I Peter","II Peter","I John","II John","III John","Jude","Revelation"],
	'prs': ['پیدایش','خروج','لاویان','اعداد','تثنیه','یوشع','داوران','روت','اول سموئیل','دوم سموئیل','اول پادشاهان','دوم پادشاهان','اول تواریخ','دوم تواریخ','عِزرا','نِحِمیا','اِستَر','ایوب','مزامیر','امثال سلیمان','جامعه','غزلِ غزلها','اشعیا','ارمیا','سوگنامه','حِزقیال','دانیال','هوشع','یوئیل','عاموس','عوبَدیا','یونس','میکاه','ناحوم','حبَقوق','سِفَنیا','حجی','زِکَریا','ملاکی','متی','مرقُس','لوقا','یوحنا','اعمال','رومیان','اول قرنتیان','دوم قرنتیان','غلاتیان','اِفِسُسیان','فیلپیان','کولسیان','اول تسالونیکیان','دوم تسالونیکیان','اول تیموتاوس','دوم تیموتاوس','تیتوس','فِلیمون','عبرانیان','یعقوب','اول پِترُس','دوم پِترُس','اول یوحنا','دوم یوحنا','سوم یوحنا','یهودا','مکاشفه'],
	'pt': ['Génesis','Êxodo','Levítico','Números','Deuteronómio','Josué','Juízes','Rute','1 Samuel','2 Samuel','1 Reis','2 Reis','1 Crónicas','2 Crónicas','Esdras','Neemias','Ester','Job','Salmos','Provérbios','Eclesiastes','Cântico de Salomão','Isaías','Jeremias','Lamentações','Ezequiel','Daniel','Oséias','Joel','Amós','Obadias','Jonas','Miqueias','Naum','Habacuque','Sofonias','Ageu','Zacarias','Malaquias','Mateus','Marcos','Lucas','João','Atos','Romanos','1 Coríntios','2 Coríntios','Gálatas','Efésios','Filipenses','Colossenses','1 Tessalonicenses','2 Tessalonicences','1 Timóteo','2 Timóteo','Tito','Filémon','Hebreus','Tiago','1 Pedro','2 Pedro','1 João','2 João','3 João','Judas','Apocalipse'],
	'rmq': ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','Lucas','','','','','','','','','','','','','','','','','','','','','','','',''],
	'ro': ['Geneza','Exodul','Leviticul','Numeri','Deuteronom','Iosua','Judecători','Rut','1 Samuel','2 Samuel','1 Regi','2 Regi','1 Cronici','2 Cronici','Ezra','Neemia','Estera','Iov','Psalmii','Proverbe','Eclesiastul','Cântarea Cântărilor','Isaia','Ieremia','Plângeri','Ezechiel','Daniel','Osea','Ioel','Amos','Obadia','Iona','Mica','Naum','Habacuc','Ţefania','Hagai','Zaharia','Maleahi','Matei','Marcu','Luca','Ioan','Faptele Apostolilor','Romani','1 Corintieni','2 Corintieni','Galateni','Efeseni','Filipeni','Coloseni','1 Tesaloniceni','2 Tesaloniceni','1 Timotei','2 Timotei','Titus','Filimon','Evrei','Iacov','1 Petru','2 Petru','1 Ioan','2 Ioan','3 Ioan','Iuda','Apocalipsa'],
	'ru': ['Бытие','Исход','Левит','Числа','Второзаконие','Иисус Навин','Судей','Руфь','I Царств','II Царств','III Царств','IV Царств','I Паралипоменон','II Паралипоменон','Эзра','Неемия','Эсфирь','Иов','Псалтырь','Притчи','Экклезиаст','Песнь песней','Исайя','Иеремия','Плач Иеремии','Иезекииль','Даниил','Осия','Амос','Михей','Иоиль','Авдий','Иона','Наум','Аввакум','Софония','Аггей','Захария','Малахия','Матфей','Марк','Лука','Иоанн','Деяния','Послание Иакова','I Послание Петра','II Послание Петра','I Послание Иоанна','II Послание Иоанна','III Послание Иоанна','Послание Иуды','Послание Рим','I Послание в Коринф','II Послание в Коринф','Послание в Галатию','Послание в Эфес','Послание в Филиппы','Послание в Колоссы','I Послание в Фессалонику','II Послание в Фессалонику','I Послание Тимофею','II Послание Тимофею','Послание Титу','Послание Филимону','Послание к евреям','Откровение'],
	'sl': ['Genezis','Exodus','Levitikus','Numeri','Deuteronómium','Jozua','Sudcov','Rút','Prvá Samuelova','Druhá Samuelova','Prvá kráľov','Druhá kráľov','Prvá kroník','Druhá kroník','Ezdráš','Nehemiáš','Ester','Jób','Žalmy','Príslovia','Kohelet — Kazateľ','Veľpieseň','Izaiáš','Jeremiáš','Náreky','Ezechiel','Daniel','Ozeáš','Joel','Amos','Abdiáš','Jonáš','Micheáš','Nahum','Habakuk','Sofoniáš','Aggeus','Zachariáš','Malachiáš','Matúš','Marek','Lukáš','Ján','Skutky apoštolov','Rimanom','Prvý Korinťanom','Druhý Korinťanom','Galaťanom','Efezanom','Filipanom','Kolosanom','Prvý Tesaloničanom','Druhý Tesaloničanom','Prvý Timotejovi','Druhý Timotejovi','Títovi','Filemonovi','Hebrejom','Jakubov','Prvý Petrov','Druhý Petrov','Prvý Jánov','Druhý Jánov','Tretí Jánov','Júdov','Zjavenie Jána'],
	'sml': ['Panagna\'an','Paglappas','Leviticus','Numbers','Deuteronomy','Joshua','Maghuhukum','Rūt','1 Samwel','2 Samwel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Ester','Job','Kalangan','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Yunus','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matiyu','Markus','Lukas','Yahiya','Kahinangan','Rōm','1 Kurintu','2 Kurintu','Galatiya','Epesos','Pilipi','Kolossa','1 Tessaloneka','2 Tessaloneka','1 Timuti','2 Timuti','Titus','Pilimun','Hibrani','Yakub','1 Petros','2 Petros','1 Yahiya','2 Yahiya','3 Yahiya','Judas','Pamabukisan'],
	'so': ['BILOWGII','BAXNIINTII','LAAWIYIINTII','TIRINTII','SHARCIGA KUNOQOSHADIISA','YASHUUCA','XAAKINNADA','RUUD','SAMUU\'EEL KOWAAD','SAMUU\'EEL LABAAD','BOQORRADII KOWAAD','BOQORRADII LABAAD','TAARIIKHDII KOWAAD','TAARIIKHDII LABAAD','CESRAA','NEXEMYAAH','ESTEER','AYUUB','SABUURRADII','MAAHMAAHYADII','WACDIYAHII','GABAYGII SULAYMAAN','ISHACYAAH','YEREMYAAH','BAROORASHADII YEREMYAAH','YEXESQEEL','DAANYEEL','HOOSHEECA','YOO\'EEL','CAAMOOS','COBADYAAH','YOONIS','MIIKAAH','NAXUUM','XABAQUUQ','SEFANYAAH','XAGGAY','SEKARYAAH','MALAAKII','MATAYOS','MARKOS','LUUKOS','YOOXANAA','FALIMAHA RASUULLADA','ROOMA','1 KORINTOS','2 KORINTOS','GALATIYA','EFESOS','FILIBOY','KOLOSAY','1 TESALONIIKA','2 TESALONIIKA','1 TIMOTEYOS','2 TIMOTEYOS','TIITOS','FILEMON','CIBRAANIYADA','YACQUUB','1 BUTROS','2 BUTROS','1 YOOXANAA','2 YOOXANAA','3 YOOXANAA','YUUDAS','MUUJINTII'],
	'sq': ['Zanafilla','Eksodi','Levitiku','Numrat','Ligji i Përtërirë','Jozueu','Gjyqtarët','Ruthi','1 i Samuelit','2 i Samuelit','1 i Mbretërve','2 i Mbretërve','1 i Kronikave','2 i Kronikave','Esdra','Nehemia','Ester','Jobi','Psalmet','Fjalët e urta','Predikuesi','Kantiku i Kantikëve','Isaia','Jeremia','Vajtimet','Ezekieli','Danieli','Osea','Joeli','Amosi','Abdia','Jona','Mikea','Nahumi','Habakuku','Sofonia','Hagai','Zakaria','Malakia','Mateu','Marku','Luka','Gjoni','Veprat e Apostujve','Romakëve','1 e Korintasve','2 e Korintasve','Galatasve','Efesianëve','Filipianëve','Kolosianëve','1 Thesalonikasve','2 Thesalonikasve','1 Timoteut','2 Timoteut','Titi','Filemonit','Hebrenjve','Jakobit','1 Pjetrit','2 Pjetrit','1 Gjonit','2 Gjonit','3 Gjonit','Juda','Zbulesa'],
	'sr': ['1. Мојсијева','2. Мојсијева','3. Мојсијева','4. Мојсијева','5. Мојсијева','Књига Исуса Навина','Књига о судијама','Књига о Рути','1. Књига Самуилова','2. Књига Самуилова','1. Књига о царевима','2. Књига о царевима','1. Књига дневника','2. Књига дневника','Јездрина','Књига Немијина','Књига о Јестири','Књига о Јову','Псалми','Приче Соломонове','Књига проповедникова','Песма над песмама','Књига пророка Исаије','Књига пророка Јеремије','Плач Јеремијин','Књига пророка Језекиља','Књига пророка Данила','Књига пророка Осије','Књига пророка Јоила','Књига пророка Амоса','Књига пророка Авдије','Књига пророка Јоне','Књига пророка Михеја','Књига пророка Наума','Књига пророка Авакума','Књига пророка Софоније','Књига пророка Агеја','Књига пророка Захарије','Књига пророка Малахије','Матеј','Марко','Лука','Јован','Дела апостолска','Римљанима','1. Коринћанима','2. Коринћанима','Галатима','Ефесцима','Филипљанима','Колошанима','1. Солуњанима','2. Солуњанима','1. Тимотеју','2. Тимотеју','Титу','Филимону','Јеврејима','Јаковљева','1. Петрова','2. Петрова','1. Јованова','2. Јованова','3. Јованова','Јудина','Откривење'],
	'sv': ['Första Moseboken','Andra Moseboken','Tredje Moseboken','Fjärde Moseboken','Femte Moseboken','Josua','Domarboken','Rut','Första Samuelsboken','Andra Samuelsboken','Första Kungaboken','Andra Kungaboken','Första Krönikeboken','Andra Krönikeboken','Esra','Nehemja','Ester','Job','Psaltaren','Ordspråksboken','Predikaren','Höga Visan','Jesaja','Jeremia','Klagovisorna','Hesekiel','Daniel','Hosea','Joel','Amos','Obadja','Jona','Mika','Nahum','Habackuk','Sefanja','Haggai','Sakarja','Malaki','Matteusevangeliet','Markusevangeliet','Lukasevangeliet','Johannesevangeliet','Apostlagärningarna','Romarbrevet','Första Korintierbrevet','Andra Korintierbrevet','Galaterbrevet','Efesierbrevet','Filipperbrevet','Kolosserbrevet','Första Tessalonikerbrevet','Andra Tessalonikerbrevet','Första Timoteusbrevet','Andra Timoteusbrevet','Brevet till Titus','Brevet till Filemon','Hebreerbrevet','Jakobs brev','Första Petrusbrevet','Andra Petrusbrevet','Första Johannesbrevet','Andra Johannesbrevet','Tredje Johannesbrevet','Judas brev','Uppenbarelseboken'],
	'sw': ['Mwanzo • Kitabu cha Kwanza cha Musa','Kutoka','Mambo ya Walawi','Hesabu','Kumbukumbu la Torati (la Sheria)','Yoshua','Waamuzi','Ruthu','1 Samweli','2 Samweli','1 Wafalme','2 Wafalme','1 Mambo ya Nyakati','2 Mambo ya Nyakati','Ezra','Nehemia','Esta','Kitabu cha Ayubu • Yobu','Zaburi','Mithali • Methali','Mhubiri','Wimbo Ulio Bora • Hekima ya Solomoni','Isaya','Yeremia','Maombolezo ya Yeremia','Ezekieli','Danieli','Hosea','Yoeli','Amosi','Obadia','Yona','Mika','Nahumu','Habakuki','Sefania','Hagai','Zekaria','Malaki','Mathayo • Injili ya Matthayo','Marko','Luka','Yohana','Matendo ya Mitume','Warumi • Waraka kwa Waroma','1 Wakorintho','2 Wakorintho','Wagalatia','Waefeso','Wafilipi','Wakolosai','1 Wathesalonike','2 Wathesalonike','1 Timotheo','2 Timotheo','Waraka kwa Tito','Filemoni','Waebrania','Yakobo','1 Petro','2 Petro','1 Yohana','2 Yohana','3 Yohana','Yuda','Ufunuo wa Yohane'],
	'th': ['ปฐมกาล','อพยพ','เลวีนิติ','กันดารวิถี','เฉลยธรรมบัญญัติ','โยชูวา','ผู้วินิจฉัย','นางรูธ','1 ซามูเอล','2 ซามูเอล','1 พงศ์กษัตริย์','2 พงศ์กษัตริย์','1 พงศาวดาร','2 พงศาวดาร','เอสรา','เนหะมียาห์','เอสเธอร์','โยบ','สดุดี','สุภาษิต','ปัญญาจารย์','บทเพลง_ไพเราะ','อิสยาห์','เยเรมียาห์','บทเพลง_ร้องทุกข์','เอเสเคียล','ดาเนียล','โฮเชยา','โยเอล','อาโมส','โอบาดียาห์','โยนาห์','มีคาห์','นาฮูม','ฮาบากุก','เศฟันยาห์','ฮักกัย','เศคาริยาห์','มาลาคี','มัทธิว','มาระโก','ลูกา','ยอห์น','กิจการ','โรม','1 โครินธ์','2 โครินธ์','กาลาเทีย','เอเฟซัส','ฟีลิปปี','โคโลสี','1 เธสะโลนิกา','2 เธสะโลนิกา','1 ทิโมธี','2 ทิโมธี','ทิตัส','ฟีเลโมน','ฮีบรู','ยากอบ','1 เปโตร','2 เปโตร','1 ยอห์น','2 ยอห์น','3 ยอห์น','ยูดา','วิวรณ์'],
	'tl': ['Genesis','Exodo','Levitico','Bilang','Deuteronomio','Josue','Mga Hukom','Rut','1 Samuel','2 Samuel','1 Mga Hari','2 Mga Hari','1 Cronica','2 Cronica','Ezra','Nehemias','Ester','Job','Salmo','Kawikaan','Eclesiastes','Awit ni Solomon','Isaias','Jeremias','Mga Panaghoy','Ezequiel','Daniel','Oseas','Joel','Amos','Obadias','Jonas','Miqueas','Nahum','Habacuc','Zefanias','Hagai','Zacarias','Malaquias','Mateo','Marcos','Lucas','Juan','Mga Gawa','Roma','1 Corinto','2 Corinto','Galata','Efeso','Filipos','Coloso','1 Tesalonica','2 Tesalonica','1 Timoteo','2 Timoteo','Tito','Filemon','Hebreo','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Pahayag'],
	'tr': ['YARATILIŞ','MISIR\'DAN ÇIKIŞ','LEVİLİLER','ÇÖLDE SAYIM','YASA\'NIN TEKRARI','YEŞU','HÂKİMLER','RUT','1.SAMUEL','2.SAMUEL','1.KRALLAR','2.KRALLAR','1.TARİHLER','2.TARİHLER','EZRA','NEHEMYA','ESTER','EYÜP','MEZMURLAR','SÜLEYMAN\'IN ÖZDEYİŞLERİ','VAİZ','EZGİLER EZGİSİ','YEŞAYA','YEREMYA','AĞITLAR','HEZEKİEL','DANİEL','HOŞEA','YOEL','AMOS','OVADYA','YUNUS','MİKA','NAHUM','HABAKKUK','SEFANYA','HAGAY','ZEKERİYA','MALAKİ','MATTA','MARKOS','LUKA','YUHANNA','ELÇİLERİN İŞLERİ','ROMALILAR','1.KORİNTLİLER','2.KORİNTLİLER','GALATYALILAR','EFESLİLER','FİLİPİLİLER','KOLOSELİLER','1. SELANİKLİLER','2.SELANİKLİLER','1.TİMOTEOS','2.TİMOTEOS','TİTUS','FİLİMON','İBRANİLER','YAKUP','1.PETRUS','2.PETRUS','1.YUHANNA','2.YUHANNA','3.YUHANNA','YAHUDA','VAHİY'],
	'twi': ['1 Mose','2 Mose','3 Mose','4 Mose','5 Mose','Yosua','Atemmufoɔ','Rut','1 Samuel','2 Samuel','1 Ahemfo','2 Ahemfo','1 Berɛsosɛm','2 Berɛsosɛm','Ɛsra','Nehemia','Ɛster','Hiob','Nnwom','Mmɛbusɛm','Ɔsɛnkafoɔ','Nnwom Mu Dwom','Yesaia','Yeremia','Kwadwom','Hesekiel','Daniel','Hosea','Yoɛl','Amos','Obadia','Yona','Mika','Nahum','Habakuk','Sefania','Hagai','Sakaria','Malaki','Mateo','Marko','Luka','Yohane','Asomafoɔ','Romafoɔ','1 Korintofoɔ','2 Korintofoɔ','Galatifoɔ','Efesofoɔ','Filipifoɔ','Kolosefoɔ','1 Tesalonikafoɔ','2 Tesalonikafoɔ','1 Timoteo','2 Timoteo','Tito','Filemon','Hebrifoɔ','Yakobo','1 Petro','2 Petro','1 Yohane','2 Yohane','3 Yohane','Yuda','Adiyisɛm'],
	'uk': ['Буття','Вихід','Левит','Числа','Повторення Закону','Ісус Навин','Книга Суддів','Рут','1 Самуїлова','2 Самуїлова','1 царів','2 царів','1 хроніки','2 хроніки','Ездра','Неемія','Естер','Йов','Псалми','Приповісті','Екклезіяст','Пісня над піснями','Ісая','Єремія','Плач Єремії','Єзекіїль','Даниїл','Осія','Йоїл','Амос','Овдій','Йона','Михей','Наум','Авакум','Софонія','Огій','Захарія','Малахії','Від Матвія','Від Марка','Від Луки','Від Івана','Дії','До римлян','1 до коринтян','2 до коринтян','До галатів','До ефесян','До филип\'ян','До колоссян','1 до солунян','2 до солунян','1 Тимофію','2 Тимофію','До Тита','До Филимона','До євреїв','Якова','1 Петра','2 Петра','1 Івана','2 Івана','3 Івана','Юда','Об\'явлення'],
	'ur': ['पैदाइश','ख़ुरूज','अहबार','गिनती','इस्तिसना','यशुअ','क़ुज़ात','रूत','1 समुएल','2 समुएल','1 सलातीन','2 सलातीन','1 तवारीख़','2 तवारीख़','अज़रा','नहमियाह','आस्तर','अय्यूब','ज़बूर','अमसाल','वाइज़','ग़ज़लुल-ग़ज़लात','यसायाह','यरमियाह','नोहा','हिज़क़ियेल','दानियाल','होसेअ','योएल','आमूस','अबदियाह','यूनुस','मीकाह','नाहूम','हबक़्क़ूक़','सफ़नियाह','हज्जी','ज़करियाह','मलाकी','मत्ती','मरक़ुस','लूक़ा','यूहन्ना','आमाल','रोमियों','1 कुरिंथियों','2 कुरिंथियों','गलतियों','इफ़िसियों','फ़िलिप्पियों','कुलुस्सियों','1 थिस्सलुनीकियों','2 थिस्सलुनीकियों','1 तीमुथियुस','2 तीमुथियुस','तितुस','फ़िलेमोन','इबरानियों','याक़ूब','1 पतरस','2 पतरस','1 यूहन्ना','2 यूहन्ना','3 यूहन्ना','यहूदाह','मुकाशफ़ा'],
	'vi': ['Sáng Thế','Xuất Hành','Lê Vi','Dân Số','Phục Truyền','Giô-suê','Thẩm Phán','Ru-tơ','1 Sa-mu-ên','2 Sa-mu-ên','1 Các Vua','2 Các Vua','1 Sử Ký','2 Sử Ký','Ê-xơ-ra','Nê-hê-mi','Ê-xơ-tê','Gióp','Thánh Thi','Châm Ngôn','Giáo Huấn','Nhã Ca','I-sa','Giê-rê-mi','Ai Ca','Ê-xê-chi-ên','Đa-ni-ên','Ô-sê','Giô-ên','A-mốt','Áp-đia','Giô-na','Mi-ca ','Na-hum','Ha-ba-cúc','Sô-phô-ni','Ha-gai','Xa-cha-ri','Ma-la-chi','Ma-thi-ơ','Mác','Lu-ca','Giăng','Công Vụ','Rô-ma','1 Cô-rinh-tô','2 Cô-rinh-tô','Ga-la-ti','Ê-phê-sô','Phi-líp','Cô-lô-se','1 Tê-sa-lô-ni-ca','2 Tê-sa-lô-ni-ca','1 Ti-mô-thê','2 Ti-mô-thê','Tích','Phi-lê-môn','Hê-bơ-rơ','Gia-cơ','1 Phê-rơ','2 Phê-rơ','1 Giăng','2 Giăng','3 Giăng','Giu-đe','Khải Huyền'],
	'yo': ['Chakruok','Wuok','Tim Jo-Lawi','Kwan','Rapar Mar Chik','Joshua','Jongʼad Bura','Ruth','1 Samuel','2 Samuel','1 Ruodhi','2 Ruodhi','1 Weche Mag Ndalo','2 Weche Mag Ndalo','Ezra','Nehemia','Esta','Ayub','Zaburi','Ngeche','Eklesiastes','Wer Mamit','Isaya','Jeremia','Ywagruok','Ezekiel','Daniel','Hosea','Joel','Amos','Obadia','Jona','Mika','Nahum','Habakuk','Zefania','Hagai','Zekaria','Malaki','Mathayo','Mariko','Luka','Johana','Tich Joote','Jo-Rumi','1 Jo-Korintho','2 Jo-Korintho','Jo-Galatia','Jo-Efeso','Jo-Filipi','Jo-Kolosai','1 Jo-Thesalonika','2 Jo-Thesalonika','1 Timotheo','2 Timotheo','Tito','Filemon','Jo-Hibrania','Jakobo','1 Petro','2 Petro','1 Johana','2 Johana','3 Johana','Juda','Fweny'],
	'zh-hans': ['創 世 記','出 埃 及 記','利 未 記','民 數 記','申 命 記','約 書 亞 記','士 師 記','路 得 記','撒 母 耳 記 上','撒 母 耳 記 下','列 王 紀 上','列 王 紀 下','歷 代 志 上','歷 代 志 下','以 斯 拉 記','尼 希 米 記','以 斯 帖 記','約 伯 記','詩 篇','箴 言','傳 道 書','雅 歌','以 賽 亞 書','耶 利 米 書','耶 利 米 哀 歌','以 西 結 書','但 以 理 書','何 西 阿 書','約 珥 書','阿 摩 司 書','俄 巴 底 亞 書','約 拿 書','彌 迦 書','那 鴻 書','哈 巴 谷 書','西 番 雅 書','哈 該 書','撒 迦 利 亞','瑪 拉 基 書','馬 太 福 音','馬 可 福 音','路 加 福 音','約 翰 福 音','使 徒 行 傳','羅 馬 書','歌 林 多 前 書','歌 林 多 後 書','加 拉 太 書','以 弗 所 書','腓 立 比 書','歌 羅 西 書','帖 撒 羅 尼 迦 前 書','帖 撒 羅 尼 迦 後 書','提 摩 太 前 書','提 摩 太 後 書','提 多 書','腓 利 門 書','希 伯 來 書','雅 各 書','彼 得 前 書','彼 得 後 書','約 翰 一 書','約 翰 二 書','約 翰 三 書','猶 大 書','启 示 录'],
	'zh-hant': ['創 世 記','出 埃 及 記','利 未 記','民 數 記','申 命 記','約 書 亞 記','士 師 記','路 得 記','撒 母 耳 記 上','撒 母 耳 記 下','列 王 紀 上','列 王 紀 下','歷 代 志 上','歷 代 志 下','以 斯 拉 記','尼 希 米 記','以 斯 帖 記','約 伯 記','詩 篇','箴 言','傳 道 書','雅 歌','以 賽 亞 書','耶 利 米 書','耶 利 米 哀 歌','以 西 結 書','但 以 理 書','何 西 阿 書','約 珥 書','阿 摩 司 書','俄 巴 底 亞 書','約 拿 書','彌 迦 書','那 鴻 書','哈 巴 谷 書','西 番 雅 書','哈 該 書','撒 迦 利 亞','瑪 拉 基 書','馬 太 福 音','馬 可 福 音','路 加 福 音','約 翰 福 音','使 徒 行 傳','羅 馬 書','歌 林 多 前 書','歌 林 多 後 書','加 拉 太 書','以 弗 所 書','腓 立 比 書','歌 羅 西 書','帖 撒 羅 尼 迦 前 書','帖 撒 羅 尼 迦 後 書','提 摩 太 前 書','提 摩 太 後 書','提 多 書','腓 利 門 書','希 伯 來 書','雅 各 書','彼 得 前 書','彼 得 後 書','約 翰 一 書','約 翰 二 書','約 翰 三 書','猶 大 書','启 示 录'],
};
bible.Data.rtlLanguages = [ 'he', 'fa', 'ar', 'ckb', 'prs', 'ur' ];
bible.Data.supportedVersions = {
	'original': { name: 'Original', language: 'original' },
	'accented': { name: 'Accented original', language: 'original' },
	'KJV': { name: 'King James Version (1769) with Strongs Numbers and Morphology', language: 'en', strongs: true },
	'ESV': { name: 'English Standard Version with Strongs Numbers', language: 'en', strongs: true },
	'ASV': { name: 'American Standard Version (1901) with Strongs Numbers', language: 'en', strongs: true },
	'WEB': { name: 'World English Bible', language: 'en', strongs: true },
	'ABP': { name: 'Apostolic Bible Polyglot English Text with Strongs Numbers', language: 'en', strongs: true },
	'DARBY': { name: 'Darby Bible (1889) with Strongs Numbers', language: 'en', strongs: true },
	'ACV': { name: 'A Conservative Version', language: 'en' },
	'AKJV': { name: 'American King James Version', language: 'en' },
	'BBE': { name: '1949/1964 Bible in Basic English', language: 'en' },
	'BSB': { name: 'Berean Study Bible', language: 'en' },
	'CPDV': { name: 'Catholic Public Domain Version', language: 'en' },
	'DRC': { name: 'Douay-Rheims Bible, Challoner Revision', language: 'en' },
	'Etheridge': { name: 'The Peschito Syriac New Testament: Translated into English by John Wesley Etheridge', language: 'en' },
	'Geneva1599': { name: 'Geneva Bible (1599)', language: 'en' },
	'Godbey': { name: '1902 William Baxter Godbey NT', language: 'en' },
	'GW': { name: 'God\'s Word Translation', language: 'en' },
	'JPS': { name: 'Jewish Publication Society Old Testament', language: 'en' },
	'JUB': { name: 'Jubilee Bible 2000', language: 'en' },
	'KJVPCE': { name: 'King James Version: Pure Cambridge Edition', language: 'en' },
	'LEB': { name: 'Lexham English Bible', language: 'en' },
	'LITV': { name: 'Green\'s Literal Translation', language: 'en' },
	'MKJV': { name: 'Green\'s Modern King James Version', language: 'en' },
	'NET': { name: 'New English Translation', language: 'en' },
	'NHEB': { name: 'New Heart English Bible', language: 'en' },
	'NHEBJE': { name: 'New Heart English Bible: Jehovah Edition', language: 'en' },
	'NHEBME': { name: 'New Heart English Bible: Messianic Edition', language: 'en' },
	'OrthJBC': { name: 'The Orthodox Jewish Brit Chadasha', language: 'en' },
	'RKJNT': { name: 'Revised King James New Testament', language: 'en' },
	'RNKJV': { name: 'Restored Name King James Version', language: 'en' },
	'Rotherham': { name: 'The Emphasised Bible by J. B. Rotherham', language: 'en' },
	'SPE': { name: 'Samaritan Pentateuch in English', language: 'en' },
	'Tyndale': { name: 'William Tyndale Bible (1525/1530)', language: 'en' },
	'Webster': { name: 'Webster Bible', language: 'en' },
	'WMB': { name: 'World Messianic Bible', language: 'en' },
	'Worsley': { name: '1770 John Worsley NT', language: 'en' },
	'Wycliffe': { name: 'John Wycliffe Bible (c.1395)', language: 'enm' },
	'YLT': { name: 'Young\'s Literal Translation', language: 'en' },
	'LC': { name: 'Literal Consistent', language: 'en' },
	'OPV': { name: 'ترجمه-ی قدام', language: 'fa' },
	'TPV': { name: 'مژده برای اسرع جدید', language: 'fa' },
	'NMV': { name: 'ترجمه هزارۀ نو', language: 'fa' },
	'AraSVD': { name: 'Arabic Bible', language: 'ar' },
	'NorthernAzeri': { name: 'Northern Azeri', language: 'az' },
	'Bela': { name: 'Belarusian Bible', language: 'be' },
	'BulVeren': { name: 'Veren’s Contemporary Bible', language: 'bg' },
	'BretonNT': { name: 'Breton New Testament (Koad 21)', language: 'br' },
	'CebPinadayag': { name: 'Cebuano Pinadayag', language: 'ceb' },
	'ckbOKS': { name: "وەشانی بێبەرامبەری کوردیی سۆرانیی ستاندەر", language: 'ckb' },
	'CopNT': { name: 'The Coptic New Testament', language: 'cop' },
	'CopSahHorner': { name: 'Sahidic Coptic New Testament, ed. by G. W. Horner', language: 'cop' },
	'CopSahidica': { name: 'Sahidica - A New Edition of the New Testament in Sahidic Coptic', language: 'cop' },
	'CopSahidicMSS': { name: 'The Sahidica Manuscripts', language: 'cop' },
	'CzeB21': { name: 'Czech Bible, Překlad 21. století včetně deuterokanonických knih', language: 'cs' },
	'CzeBKR': { name: 'Czech Bible Kralicka', language: 'cs' },
	'CzeCEP': { name: 'Czech Ekumenicky Cesky preklad', language: 'cs' },
	'CzeCSP': { name: 'Czech Český studijní překlad', language: 'cs' },
	'CSlElizabeth': { name: '1757 Church Slavonic Elizabeth Bible', language: 'cu' },
	'DaNT1819': { name: 'Danish New Testament from 1819 with original orthography', language: 'da' },
	'DaOT1871NT1907': { name: 'Danish OT1871 + NT1907 with original orthography', language: 'da' },
	'GerBoLut': { name: 'Deutsch Bolsingerߴs Luther 1545 Bibel (moderne Rechtschreibung)', language: 'de' },
	'GerElb1871': { name: 'German Elberfelder (1871) (sogenannt)', language: 'de' },
	'GerElb1905': { name: 'German Darby Unrevidierte Elberfelder (1905)', language: 'de' },
	'GerLeoRP18': { name: 'Leonberger Bibel, NT (RP19)', language: 'de', strongs: true },
	'GerNeUe': { name: 'Neue evangelistische Übersetzung', language: 'de' },
	'GerZurcher': { name: 'Deutsche Zürcher Bibel von 1931.', language: 'de' },
	'GreVamvas': { name: 'Neophytos Vamvas\'s translation of the Holy Bible into modern Greek (1850)', language: 'el' },
	'Esperanto': { name: 'Esperanto Londona Biblio', language: 'eo' },
	'MCSB': { name: 'Matupi Chin Standard Bible', language: 'hlt', strongs: true },
	'FreSegond1910': { name: "Bible Louis Segond (1910)", language: 'fr' },
	'FreJND': { name: "Bible J.N.Darby en français", language: 'fr' },
	'FrePGR': { name: "Bible Perret-Gentil et Rilliet", language: 'fr' },
	'SpaPlatense': { name: 'Biblia Platense (Straubinger)', language: 'es' },
	'SpaRV': { name: 'La Santa Biblia Reina-Valera (1909)', language: 'es' },
	'SpaRV1865': { name: 'La Santa Biblia Reina-Valera (1865) con arreglos ortográficos', language: 'es' },
	'SpaTDP': { name: 'Spanish Traducción de dominio público (Mateo a Romanos)', language: 'es', strongs: true },
	'SpaVNT': { name: 'Spanish 1858 Reina Valera New Testament', language: 'es' },
	'FinBiblia': { name: 'Finnish Biblia (1776)', language: 'fi' },
	'FinRK': { name: 'Raamattu Kansalle (2012)', language: 'fi' },
	'FinSTLK2017': { name: 'Pyhä Raamattu (STLK 2017)', language: 'fi' },
	'FreBBB': { name: 'French Bible Bovet Bonnet (1900)', language: 'fr' },
	'FreBDM1744': { name: 'Bible David Martin (1744)', language: 'fr' },
	'FreKhan': { name: 'La Bible de Zadoc Khan', language: 'fr' },
	'FrePGR': { name: 'Bible Perret-Gentil et Rilliet', language: 'fr' },
	'FreSegond': { name: 'French Traduction de Louis Segond (1910)', language: 'fr' },
	'FreSegond1910': { name: 'Bible Louis Segond (1910)', language: 'fr' },
	'IriODomhnuill': { name: 'A modern Irish New Testament (Luke preview)', language: 'ga' },
	'ScotsGaelic': { name: 'Scottish Gaelic Gospel of Mark', language: 'gd' },
	'Geez': { name: 'Ge’ez Bible', language: 'gez' },
	'ABPGRK': { name: 'Apostolic Bible Polyglot Greek Text', language: 'grc', strongs: true },
	'Antoniades': { name: 'Antoniades Patriarchal Edition (1904/1912)', language: 'grc', strongs: true },
	'byzparsed': { name: 'Byzantine Majority Text', language: 'grc', strongs: true },
	'Elzevir': { name: 'Elzevir Textus Receptus (1624)', language: 'grc', strongs: true },
	'MorphGNT': { name: 'Morphologically Parsed Greek New Testament based on the SBLGNT', language: 'grc', strongs: true },
	'SBLGNT': { name: 'The Greek New Testament: SBL Edition', language: 'grc' },
	'TNT': { name: 'Tregelles\' Greek New Testament', language: 'grc' },
	'WHNU': { name: 'Westcott and Hort with NA27/UBS4 variants', language: 'grc', strongs: true },
	'f35': { name: 'Family 35', language: 'grc' },
	'Aleppo': { name: 'Aleppo Codex', language: 'he' },
	'HebModern': { name: 'Modern Hebrew Bible', language: 'he' },
	'SP': { name: 'Samaritan Pentateuch', language: 'he', strongs: true },
	'SPMT': { name: 'Masoretic Text parallel to the Samaritan Pentateuch', language: 'he', strongs: true },
	'SPVar': { name: 'Samaritan Pentateuch with variant readings', language: 'he' },
	'Haitian': { name: 'Haitian Creole Bible', language: 'ht' },
	'HunIMIT': { name: 'Az Izraelita-Magyar Irodalmi Társaság (IMIT) Bibliája (zsidó)', language: 'hu' },
	'HunKar': { name: 'Revideált Károli Biblia 1908', language: 'hu' },
	'HunRUF': { name: 'A Magyar Bibliatársulat Revideált Újfordítású Bibliája', language: 'hu' },
	'HunUj': { name: 'A Magyar Bibliatársulat Újfordítású Bibliája', language: 'hu' },
	'ArmWestern': { name: '1853 Western Armenian NT', language: 'hy' },
	'ItaDio': { name: 'Italian Giovanni Diodati Bibbia 1649', language: 'it' },
	'ItaRive': { name: 'Italian Riveduta Bibbia (1927)', language: 'it' },
	'JapBungo': { name: 'Japanese Bungo-yaku/Taisho-kaiyaku 大正改訳「新約聖書」(1950年版)', language: 'ja' },
	'JapKougo': { name: 'Japanese Kougo-yaku 口語訳「聖書」(1954/1955年版)', language: 'ja' },
	'JapRaguet': { name: 'Japanese Raguet-yaku ラゲ訳「我主イエズスキリストの新約聖書」(1910年版)', language: 'ja' },
	'Kaz': { name: 'Киелі кітап', language: 'kk' },
	'KorHKJV': { name: 'Hangul King James Version', language: 'ko' },
	'KorRV': { name: '개역성경', language: 'ko' },
	'VulgClementine': { name: 'Clementine Vulgate', language: 'la' },
	'VulgConte': { name: 'Vulgata Clementina, Conte editore', language: 'la' },
	'VulgHetzenauer': { name: 'Vulgata Clementina, Hetzenauer editore', language: 'la' },
	'VulgSistine': { name: 'Vulgata Sistina', language: 'la' },
	'Vulgate': { name: 'Latin Vulgate', language: 'la' },
	'LtKBB': { name: 'Lithuanian Bible', language: 'lt' },
	'Latvian': { name: 'Latvian New Testament', language: 'lv' },
	'LvGluck8': { name: 'Latvian Glück 8th edition', language: 'lv' },
	'ChiUnL': { name: '聖經 (文理和合)', language: 'lzh' },
	'Mal1910': { name: 'Sathyavedapusthakam (Malayalam Bible) published in 1910', language: 'mal' },
	'NorBroed': { name: 'Brød Nye Testamente', language: 'nb' },
	'Norsk': { name: 'Bibelen på Norsk (1930)', language: 'nb' },
	'Ndebele': { name: 'Ndebele Bible', language: 'nd' },
	'DutSVV': { name: 'Dutch Statenvertaling Bijbel', language: 'nl' },
	'DutSVVA': { name: 'De ganse Heilige Schrift bevattende al de kanonieke boeken van het Oude en Nieuwe Testament, met de apocriefe (deuterocanonieke) boeken', language: 'nl', strongs: true },
	'NlCanisius1939': { name: 'Petrus Canisius Translation', language: 'nl' },
	'NorSMB': { name: 'Studentmållagsbibelen frå 1921', language: 'nn' },
	'PolGdanska': { name: 'Polish Biblia Gdanska (1881)', language: 'pl' },
	'Pohnpeian': { name: 'Bible in Pohnpeian language', language: 'pon' },
	'PotLykins': { name: '1833 Potawatomi Matthew and Acts', language: 'pot' },
	'Dari': { name: 'Dari Translation', language: 'prs' },
	'PorAR': { name: 'Bíblia Almeida Recebida (AR)', language: 'pt' },
	'PorAlmeida1911': { name: 'De 1911 Biblia Sagrada Traduzida em Portuguez Por João Ferreeira D\'Almeida', language: 'pt' },
	'PorBLivre': { name: 'Bíblia Livre', language: 'pt' },
	'PorBLivreTR': { name: 'Bíblia Livre - Textus Receptus', language: 'pt' },
	'Calo': { name: 'El Evangelio segun S. Lucas, traducido al Romaní, ó dialecto de los Gitanos de España', language: 'rmq' },
	'RomCor': { name: 'Cornilescu Bible in Romanian language', language: 'ro' },
	'RusSynodal': { name: 'Синодального Перевода Библии', language: 'ru' },
	'RusSynodalLIO': { name: 'Russian Synodal Bible, Licht im Osten Edition', language: 'ru', strongs: true },
	'SloOjacano': { name: 'Ojačano Sveto pismo (Ps + Gal)', language: 'sl' },
	'sml_BL_2008': { name: 'Kitab Injil and Kitab Awal-Jaman', language: 'sml' },
	'SomKQA': { name: 'Kitaabka Quduuska Ah', language: 'so' },
	'Alb': { name: 'Albanian Bible', language: 'sq' },
	'SrKDEkavski': { name: 'Serbian Bible Daničić-Karadžić Ekavski', language: 'sr' },
	'SrKDIjekav': { name: 'Serbian Bible Daničić-Karadžić Ijekavski', language: 'sr' },
	'Swe1917': { name: 'Swedish Bible (1917)', language: 'sv' },
	'SweFolk1998': { name: 'Svenska Folkbibeln (1998)', language: 'sv' },
	'SweKarlXII1873': { name: 'Svenska Karl XII:s Bibel (1873)', language: 'sv' },
	'ThaiKJV': { name: 'Thai King James Version', language: 'th' },
	'Tagalog': { name: 'Tagalog (John & James)', language: 'tl' },
	'TagAngBiblia': { name: "Philippine Bible Society (1905)", language: 'tl' },
	'TurNTB': { name: 'Kutsal Kitap (New Turkish Bible)', language: 'tr' },
	'UkrKulish': { name: 'Новий Завіт. Переклад П. Куліша (1871)', language: 'uk' },
	'Ukrainian': { name: 'Українська Біблія. Переклад Івана Огієнка.', language: 'uk' },
	'UrduGeo': { name: 'Urdu Geo Version (UGV)', language: 'ur' },
	'UrduGeoDeva': { name: 'Urdu Geo Version Devanagari Script (UGV)', language: 'ur' },
	'UrduGeoRoman': { name: 'Urdu Geo Version Latin Script (UGV)', language: 'ur' },
	'Viet': { name: 'Kinh Thánh Tiếng Việt (1934)', language: 'vi' },
	'ChiNCVs': { name: '新译本', language: 'zh-hans' },
	'ChiUns': { name: '和合本 (简体字)', language: 'zh-hans', strongs: true },
	'ChiUn': { name: '和合本 (繁體字)', language: 'zh-hant', strongs: true },
	'swONEN': { name: "Toleo Wazi Neno: Bibilia Takatifu™", language: 'sw' },
	'hinIRV': { name: "हिंदी भारतीय संशोधित संस्करण बाइबिल भारत", language: 'hi' },
	'luoONL': { name: "Ochiw Thuolo Motingʼo Loko Manyien", language: 'luo' },
	'twiONA': { name: "Wɔnhia ɛho kwamma nwoma Asante Twi Nkwa Asɛm", language: 'twi' },
	'twkONA': { name: "Wonhia Akuapem Twi Nkwa Asɛm™ ho kwamma nhoma", language: 'twi' },
	'yoOBYO': { name: "Biblica® Open Yoruba Contemporary Bible", language: 'yo' },
};
bible.Data.interfaceLanguages = {
	'original': 'Hebrew/Greek',
	'en': 'English',
	'fa': 'فارسی (Farsi)',
	'ar': 'عربى (Arabic)',
	'az': 'آذری (Northern Azeri)',
	'be': 'беларуская (Belarusian)',
	'bg': 'български (Bulgarian)',
	'br': 'Brezhoneg (Breton)',
	'ceb': 'Cebuano',
	'ckb': 'کوردیی سۆرانی (Kurdi Sorani)',
	'cop': 'ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ (Coptic)',
	'cs': 'Čeština (Czech)',
	'cu': 'Church Slavonic',
	'da': 'Dansk (Danish)',
	'de': 'Deutsch (German)',
	'el': 'Ελληνικά (Modern Greek)',
	'enm': 'Middle English',
	'eo': 'Esperanto',
	'es': 'Español (Spanish)',
	'fi': 'Suomi (Finish)',
	'fr': 'Français (French)',
	'ga': 'Gaeilge (Gaelic)',
	'gd': 'Gaelg (Scots Gaelic)',
	'gez': 'ግዕዝ (Geez)',
	'grc': 'Ελληνικά (Ancient Greek)',
	'he': 'עברית (Hebrew)',
	'hi': 'हिन्दी (Hindi)',
	'hlt': 'Matupi Chin',
	'ht': 'Kreyòl ayisyen (Haitian Creole)',
	'hu': 'Magyar (Hungarian)',
	'hy': 'հայերեն (Armenian)',
	'it': 'Italiano (Italian)',
	'ja': '日本語 (Japanese)',
	'kk': 'Қазақша / Qazaqşa / قازاق ٴتىلى / Kazakh',
	'ko': '한국어 (Korean)',
	'la': 'Latin',
	'lt': 'Lietuvių (Lithuanian)',
	'luo': 'Luo',
	'lv': 'Latviešu Valoda (Latvian)',
	'lzh': '文言（中文）(Classical Chinese)',
	'mal': 'മലയാളം (Malayalam)',
	'nb': 'Norsk: bokmål (Norwegian bokmål)',
	'nd': 'isiNdebele (Ndebele)',
	'nl': 'Nederlands (Dutch)',
	'nn': 'Norsk: nynorsk (Norwegian new)',
	'pl': 'Polski (Polish)',
	'pon': 'Pohnpeian',
	'pot': 'Potawatomi',
	'prs': 'دری (Dari)',
	'pt': 'Português (Portugese)',
	'rmq': 'Romaní: Caló (Romany)',
	'ro': 'Română (Romanian)',
	'ru': 'Русский (Russian)',
	'sl': 'Slovenčina (Slovenian)',
	'sml': 'Central Sama',
	'so': 'Soomaali (Somali)',
	'sq': 'Shqip (Albanian)',
	'sr': 'Српски Srpski (Serbian)',
	'sv': 'Svenska (Swedish)',
	'sw': 'Kiswahili (Swahili)',
	'th': 'ไทย (Thai)',
	'tl': 'Tagalog',
	'tr': 'Türkçe',
	'twi': 'Twi',
	'uk': 'український (Ukranian)',
	'ur': 'اردو (Urdu)',
	'vi': 'Vietnamese (Tiếng Việt)',
	'yo': 'Yoruba ',
	'zh-hans': '中国人 (Chinese)',
	'zh-hant': '中国人 (Chinese)',
};

bible.Data.verses = [
[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
[22,23,18,22],
[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
[11,70,13,24,17,22,28,36,15,44],
[11,20,32,23,19,19,73,18,38,39,36,47,31],
[22,23,15,17,14,14,10,17,32,3],
[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],
[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
[18,26,22,16,20,12,29,17,18,20,10,14],
[17,17,11,16,16,13,13,14],
[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
[22,22,66,22,22],
[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
[21,49,30,37,31,28,28,27,27,21,45,13],
[11,23,5,19,15,11,16,14,17,15,12,14,16,9],
[20,32,21],
[15,16,15,13,27,14,17,14,15],
[21],
[17,10,10,11],
[16,13,12,13,15,16,20],
[15,13,19],
[17,20,19],
[18,15,20],
[15,23],
[21,13,10,14,11,15,14,23,17,12,17,14,9,21],
[14,17,18,6],
[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
[24,17,18,18,21,18,16,24,15,18,33,21,14],
[24,21,29,31,26,18],
[23,22,21,32,33,24],
[30,30,21,23],
[29,23,25,18],
[10,20,13,18,28],
[12,17,18],
[20,15,16,16,25,21],
[18,26,17,22],
[16,15,15],
[25],
[14,18,19,16,14,20,28,13,28,39,40,29,25],
[27,26,18,17,20],
[25,25,22,19,14],
[21,22,18],
[10,29,24,21,21],
[13],
[14],
[25],
[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,20]
];

bible.parseReference = function(textReference) {

	var bookID = -1;
	var chapter1 = -1;
	var verse1 = -1;
	var chapter2 = -1;
	var verse2 = -1;
	var input = new String(textReference);

	bookID = bible.getBookId( input )

	var afterRange = false;
	var afterSeparator = false;
	var startedNumber = false;
	var currentNumber = '';

	for (var i = 0; i < input.length; i++) {
		var c = input.charAt(i);

		if (c == ' ' || isNaN(c)) {
			if (!startedNumber)
				continue;

			if (c == '-') {
				afterRange = true;
				afterSeparator = false;
			} else if (c == ':' || c == ',' || c == '.') {
				afterSeparator = true;
			} else {
				// ignore
			}

			// reset
			currentNumber = '';
			startedNumber = false;

		} else {
			startedNumber = true;
			currentNumber += c;

			if (afterSeparator) {
				if (afterRange) {
					verse2 = parseInt(currentNumber);
				} else { // 1:1
					verse1 = parseInt(currentNumber);
				}
			} else {
				if (afterRange) {
					chapter2 = parseInt(currentNumber);
				} else { // 1
					chapter1 = parseInt(currentNumber);
				}
			}
		}
	}

	// reassign 1:1-2
	if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 <= 0) {
		verse2 = chapter2;
		chapter2 = chapter1;
	}
	// fix 1-2:5
	if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 > 0) {
		verse1 = 1;
	}

	// just book
	if (bookID > 0 && chapter1 <= 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) {
		chapter1 = 1;
		verse1 = 1;
	}

	// validate max chapter
	if (chapter1 == -1) {
		chapter1 = 1;
	} else if (chapter1 > bible.Data.verses[bookID - 1].length) {
		chapter1 = bible.Data.verses[bookID - 1].length;
		verse1 = 1;
	}

	// validate max verse
	if (verse1 == -1) {
		verse1 = 1;
	} else if (verse1 > bible.Data.verses[bookID - 1][chapter1-1]) {
		verse1 = bible.Data.verses[bookID - 1][chapter1-1];
	}


	// finalize

	return new bible.Reference(bookID, chapter1, verse1, chapter2, verse2);
};

bible.Reference = function() {

	var _bookID = -1;
	var _chapter1 = -1;
	var _verse1 = -1;
	var _chapter2 = -1;
	var _verse2 = -1;

	if (arguments.length == 0) {
		// error
	} else if (arguments.length == 1) { // a string that needs to be parsed
		return bible.parseReference(arguments[0]);
	} else {
		_bookID = arguments[0];
		_chapter1 = arguments[1];
		if (arguments.length >= 3) _verse1 = arguments[2];
		if (arguments.length >= 4) _chapter2 = arguments[3];
		if (arguments.length >= 5) _verse2 = arguments[4];
	}

	function padLeft(input, length, s) {
		while (input.length < length)
			input = s + input;
		return input;
	}

	return {
		bookID: _bookID,
		bookName: bible.getBook( _bookID ),
		chapter: _chapter1,
		verse: _verse1,
		chapter1: _chapter1,
		verse1: _verse1,
		chapter2: _chapter2,
		verse2: _verse2,

		isValid: false,

		toString: function() {
			if (this.bookID < 1 || this.bookID > bible.Data.books.length) return "invalid";

			var b = bible.Data.books[this.bookID - 1][0] + ' ';

			if (this.chapter1 > 0 && this.verse1 <= 0 && this.chapter2 <= 0 && this.verse2 <= 0) // John 1
				return b + this.chapter1;
			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 <= 0 && this.verse2 <= 0) // John 1:1
				return b + this.chapter1 + ':' + this.verse1;
			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 <= 0 && this.verse2 > 0) // John 1:1-5
				return b + this.chapter1 + ':' + this.verse1 + '-' + this.verse2;
			else if (this.chapter1 > 0 && this.verse1 <= 0 && this.chapter2 > 0 && this.verse2 <= 0) // John 1-2
				return b + this.chapter1 + '-' + this.chapter2;
			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 > 0 && this.verse2 > 0) // John 1:1-2:2
				return b + this.chapter1 + ':' + this.verse1 + '-' + ((this.chapter1 != this.chapter2) ? this.chapter2 + ':' : '') + this.verse2;
			else
				return 'unknown';
		},
		toOsis: function() {
			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
			return bible.Data.books[this.bookID - 1][0] + '.' + this.chapter1 + '.' + this.verse1;
		},
		toChapterCode: function() {
			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
			//return this.bookID.toString() + this.chapter1.toString()
			return 'c' + padLeft(this.bookID.toString(), 3, '0') + padLeft(this.chapter1.toString(), 3, '0');
		},
		toVerseCode: function() {
			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
			return 'v' + padLeft(this.bookID.toString(), 3, '0') + padLeft(this.chapter1.toString(), 3, '0') + padLeft(this.verse1.toString(), 3, '0');
		},
		prevChapter: function() {
			this.verse1 = 1;
			this.chapter2 = -1;
			this.verse2 = -1;
			if (this.chapter1 == 1 && this.bookID > 1) {
				this.bookID--;
				this.chapter1 = bible.Data.verses[this.bookID - 1].length;
			} else if ( this.chapter1 === 1 && this.bookID === 1 ) {
				return null;
			} else {
				this.chapter1--;
			}

			this.bookName = bible.getBook( this.bookID );
			return Object.assign( {}, this );
		},
		nextChapter: function() {
			this.verse1 = 1;
			this.chapter2 = -1;
			this.verse2 = -1;
			if (this.chapter1 < bible.Data.verses[this.bookID - 1].length) {
				this.chapter1++;
			} else if (this.bookID < bible.Data.books.length) {
				this.bookID++;
				this.chapter1 = 1;
			} else {
				return null;
			}

			this.bookName = bible.getBook( this.bookID );
			return Object.assign( {}, this );
		}
		,
		isFirstChapter: function() {
			return (this.bookID == 1 && this.chapter1 ==1); //  && this.verse1 == 1);
		},
		isLastChapter: function() {
			var v = bible.Data.verses[this.bookID-1];

			return (this.bookID	== bible.Data.books.length &&
				this.chapter1 == v.length);//  && 	this.verse1 == v[v.length-1]);
		},
		getBook: function() {
			return bible.Data.books[ this.bookID - 1 ][ 0 ];
		}
	}
};
bible.utility = {};
bible.getBookId = function( textReference ) {
	var input = textReference;
	var bookID = -1;
	// tear off book name
	for (var i = bible.Data.books.length - 1; i >= 0; i--) {
		for (var j = 0; j < bible.Data.books[i].length; j++) {
			var name = new String(bible.Data.books[i][j]).toLowerCase();
			var possibleMatch = input.substring(0, Math.floor(name.length, input.length)).toLowerCase();

			if (possibleMatch == name) {
				bookID = i + 1;
				input = input.substring(name.length);
				break;
			}

		}
		if (bookID > -1)
			break;
	}
	return bookID;
};
bible.getBook = function( bookId ) {
	return bible.Data.books[ bookId - 1][0];
};

bible.getTranslatedBookNameByLanguage = function( bookName, language ) {
	return bible.Data.bookNamesByLanguage[ language ][ bible.getBookId( bookName ) - 1 ];
};

bible.getTranslatedBookName = function( bookName, version ) {
	if ( ! bookName || ! version ) {
		return 'problemo';
	}
	var language = bible.Data.supportedVersions[ version ].language;
	return bible.getTranslatedBookNameByLanguage( bookName, language );
};

bible.isRtlVersion = function( version, book ) {
	if ( ! version ) {
		return false;
	}

	var versionLanguage = bible.Data.supportedVersions[ version ].language;
	if ( bible.Data.rtlLanguages.indexOf( versionLanguage ) > -1 ) {
		return true;
	}

	if ( versionLanguage === 'original' && book && bible.Data.otBooks.indexOf( book ) > -1 ) {
		return true;
	}
};
