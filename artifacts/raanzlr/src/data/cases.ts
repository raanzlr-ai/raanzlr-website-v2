export const CASES = [
  {
    slug: "gcc-real-estate-lead-automation",
    date: "2025-03-15",
    tag: { en: "Workflow Automation", ar: "أتمتة سير العمل" },
    title: { en: "How a Gulf Property Developer Processes 8 Lead Sources Without a Single Manual Entry", ar: "كيف بات مطور عقاري خليجي يعالج 8 مصادر عملاء دون لمسة يدوية واحدة" },
    desc: { en: "An n8n automation captures leads from 8 channels simultaneously — WhatsApp, Instagram, portals, walk-ins — qualifies them with AI scoring, and routes them to the right broker. The team stopped doing data entry. They started closing deals instead.", ar: "منظومة أتمتة تلتقط العملاء من 8 قنوات في آنٍ واحد — واتساب، إنستغرام، البوابات العقارية، الزيارات المباشرة — وتُقيّمهم بالذكاء الاصطناعي وتوجّههم للوسيط المناسب. الفريق تخلّص من الإدخال اليدوي. وبدأ يُغلق الصفقات بدلاً منه." },
    challenge: {
      en: "One of the region's active property developers was managing leads from 8 different sources — website forms, WhatsApp, Instagram DMs, property portals (Bayut, Property Finder), phone calls, referrals, walk-ins, and LinkedIn — each feeding into a different spreadsheet managed by a different broker. Leads were being lost, duplicated, and followed up on days late. The sales team was spending 3+ hours per day just on data entry.",
      ar: "عملية عقارية نشطة في الخليج كانت تدير عملاء من 8 مصادر مختلفة، كل منها يغذي جدول بيانات مختلف تديره وسيط مختلف. كانت العملاء تُفقد وتُكرر وتُتابع بعد أيام من فوات الأوان.",
    },
    solution: {
      en: "The system uses n8n as the orchestration layer, with WhatsApp Business API webhooks, website form endpoints, and Meta Graph API for social DMs all feeding into a single normalisation node. The node extracts name, phone, budget, property type, and intent from every lead regardless of source. An OpenAI classifier then scores each lead on a 1–10 scale and assigns it to the correct sales pod automatically. Everything syncs to HubSpot in real time with full source attribution — no human touch required.",
      ar: "المنظومة تستخدم n8n كطبقة تنسيق، مع webhook لواتساب Business ونقاط نهاية النماذج وMeta Graph API لرسائل التواصل الاجتماعي — كلها تصب في نقطة تطبيع واحدة. تستخلص البيانات الأساسية من كل عميل بغض النظر عن المصدر، ثم يُصنّف الذكاء الاصطناعي كل عميل ويُعيّنه للفريق المناسب تلقائياً.",
    },
    metrics: [
      { label: { en: "Faster processing", ar: "تسريع المعالجة" }, value: "90%" },
      { label: { en: "Daily hours saved", ar: "ساعات يومية موفرة" }, value: "3h" },
      { label: { en: "Lead sources unified", ar: "مصادر موحدة" }, value: "8" },
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Real Estate", ar: "العقارات" },
  },
  {
    slug: "uae-retail-whatsapp-ai-agent",
    date: "2025-02-20",
    tag: { en: "AI Chatbot", ar: "روبوت محادثة AI" },
    title: { en: "The WhatsApp AI Agent Handling 2,000+ Monthly Inquiries for a UAE Retail Operation", ar: "وكيل واتساب يتعامل مع أكثر من ٢٠٠٠ استفسار شهري لعملية تجزئة في الإمارات" },
    desc: { en: "A trilingual AI agent (Arabic, English, Urdu) handles product questions, order tracking, and return requests around the clock — deflecting 78% of tickets before they reach the human team. The 6-agent support team now handles only what actually needs a human.", ar: "وكيل ذكاء اصطناعي ثلاثي اللغات يعمل على مدار الساعة — يرد على استفسارات المنتجات ويتابع الطلبات ويعالج المرتجعات. 78% من التذاكر تُحسم قبل أن تصل لأي إنسان. فريق الدعم أصبح يتعامل فقط مع ما يستحق اهتمام بشري فعلي." },
    challenge: {
      en: "A growing UAE electronics retailer was receiving 2,000+ WhatsApp messages per month across a team of 6 customer service agents. 70% of messages were repetitive: stock availability, order status, return policy, and delivery timelines. The team was overwhelmed, response times averaged 4 hours, and customer satisfaction was declining.",
      ar: "عملية تجزئة إلكترونيات نامية في الإمارات كانت تستقبل أكثر من 2000 رسالة واتساب شهرياً. 70% من الرسائل كانت متكررة. كان الفريق مرهقاً وأوقات الاستجابة تتجاوز 4 ساعات.",
    },
    solution: {
      en: "The system is a trilingual AI agent (Arabic, English, Urdu) trained on a full product catalogue, order management system API, and returns policy documentation. Intent detection routes each message automatically: product queries go to catalogue RAG lookup; order tracking triggers a real-time API fetch; return requests follow a guided flow with human handoff for edge cases. An escalation score triggers live agent routing when confidence falls below 0.7 or a frustrated message is detected by the sentiment layer.",
      ar: "الوكيل ثلاثي اللغات مُدرَّب على كتالوج المنتجات الكامل وواجهة برمجة نظام إدارة الطلبات وسياسة المرتجعات. يستخدم اكتشاف النية لتوجيه كل رسالة تلقائياً، وينتقل الأمر للوكيل البشري حين تنخفض الثقة أو يُكشف عن توتر في الرسالة.",
    },
    metrics: [
      { label: { en: "Monthly inquiries handled", ar: "استفسارات شهرية" }, value: "2k+" },
      { label: { en: "Ticket deflection rate", ar: "معدل تحويل التذاكر" }, value: "78%" },
      { label: { en: "Languages supported", ar: "لغات مدعومة" }, value: "3" },
    ],
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Retail", ar: "التجزئة" },
  },
  {
    slug: "saudi-fintech-saas-dashboard",
    date: "2025-01-10",
    tag: { en: "Web Platform", ar: "منصة ويب" },
    title: { en: "A Bilingual SaaS Analytics Platform Built for a Saudi Fintech Startup — 12 Weeks to Launch", ar: "منصة تحليلات ثنائية اللغة لشركة تقنية مالية سعودية — ١٢ أسبوعاً من الصفر للإطلاق" },
    desc: { en: "Full-stack bilingual (AR/EN) SaaS platform with real-time financial dashboards, five-tier role-based access, and Plaid + Tamara integrations. Built on a Next.js 14 foundation with PostgreSQL row-level security. Launched in week 12.", ar: "منصة SaaS ثنائية اللغة شاملة مع لوحات بيانات مالية آنية، وتحكم في الوصول بخمسة مستويات، وتكاملات Plaid و Tamara. مبنية على Next.js 14 مع أمان على مستوى الصف في PostgreSQL. أُطلقت في الأسبوع الثاني عشر." },
    challenge: {
      en: "A Saudi fintech startup had an MVP built by freelancers — a single-language, single-page React app that worked for demos but couldn't scale. They needed a production-grade bilingual platform with enterprise role-based access, real-time data dashboards, and compliance with Saudi SAMA's open banking requirements, all in 12 weeks before their Series A fundraise.",
      ar: "شركة ناشئة في مجال التقنية المالية السعودية كان لديها MVP مبني من قِبل مستقلين — تطبيق React بلغة واحدة يعمل للعروض التوضيحية لكن لا يمكنه التوسع.",
    },
    solution: {
      en: "The platform is built on Next.js 14 App Router with i18n routing for Arabic/English. A role-based access control system covers five permission levels (admin, analyst, viewer, auditor, API) backed by PostgreSQL row-level security. Fourteen real-time dashboard widgets run via React Query and WebSockets. Plaid handles bank account data; Tamara handles BNPL payment flows. The stack was delivered on day 83 — one week ahead of schedule.",
      ar: "المنصة مبنية على Next.js 14 مع توجيه i18n للعربية والإنجليزية. نظام تحكم في الوصول بخمسة مستويات مدعوم بأمان على مستوى الصف في PostgreSQL. أربع عشرة أداة لوحة بيانات آنية. تكاملات Plaid وTamara. أُسلّمت في اليوم 83.",
    },
    metrics: [
      { label: { en: "Time to launch", ar: "وقت الإطلاق" }, value: "12w" },
      { label: { en: "Performance score", ar: "درجة الأداء" }, value: "98/100" },
      { label: { en: "Integrations", ar: "تكاملات" }, value: "6" },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Fintech", ar: "التقنية المالية" },
  },
  {
    slug: "kuwait-legal-rag-system",
    date: "2024-12-05",
    tag: { en: "Custom AI", ar: "ذكاء اصطناعي مخصص" },
    title: { en: "Arabic Legal Research That Used to Take 8 Hours Now Takes Under 3 Minutes", ar: "بحث قانوني عربي كان يستغرق ٨ ساعات — الآن أقل من ٣ دقائق" },
    desc: { en: "A retrieval-augmented system over 15,000+ Arabic legal documents lets attorneys query case law, rulings, and legislation in plain language. Built on semantic chunking, multilingual embeddings, and Qdrant vector search — with full citation trails back to source PDFs.", ar: "نظام استرجاع دلالي على أكثر من 15,000 وثيقة قانونية عربية يُتيح للمحامين الاستعلام بلغة عادية عن السوابق القضائية والتشريعات. مبني على تقطيع دلالي وتضمينات متعددة اللغات وبحث متجهي في Qdrant — مع مسارات اقتباس كاملة للمصادر." },
    challenge: {
      en: "A Gulf-region law firm had 15,000+ Arabic legal documents — court rulings, regulatory filings, case precedents, and legislation — stored as scanned PDFs. Junior attorneys were spending 4–8 hours per case on manual document research, limiting the firm's capacity and creating billing inefficiency. The team needed a way to query this corpus using natural language.",
      ar: "مكتب محاماة في منطقة الخليج كان لديه أكثر من 15,000 وثيقة قانونية عربية مخزنة كملفات PDF ممسوحة ضوئياً. كان المحامون يقضون 4-8 ساعات لكل قضية في البحث اليدوي.",
    },
    solution: {
      en: "The system runs an end-to-end Arabic document intelligence pipeline: an OCR layer fine-tuned on Arabic legal fonts extracts text from scanned PDFs; Arabic text normalisation handles diacritics and Unicode variations; semantic chunking preserves document structure and metadata (court, date, case number, type); multilingual-e5-large embeddings via a self-hosted inference endpoint; vector storage in Qdrant; and a GPT-4o powered RAG interface with citation trails back to source documents.",
      ar: "المنظومة تُشغّل خط معالجة وثائق عربي شامل: طبقة OCR مدربة على الخطوط القانونية العربية، تطبيع نصي للتشكيل وتباينات Unicode، تقطيع دلالي يحفظ بنية الوثيقة، تضمينات multilingual-e5-large، تخزين متجهي في Qdrant، وواجهة RAG مع مسارات اقتباس للمصادر.",
    },
    metrics: [
      { label: { en: "Documents indexed", ar: "وثائق مفهرسة" }, value: "15k+" },
      { label: { en: "Query response time", ar: "وقت استجابة الاستعلام" }, value: "<3s" },
      { label: { en: "Research time saved", ar: "وقت بحث موفر" }, value: "85%" },
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Legal", ar: "القانون" },
  },
  {
    slug: "turkish-manufacturing-crm-erp-bridge",
    date: "2024-11-18",
    tag: { en: "Systems Integration", ar: "تكامل الأنظمة" },
    title: { en: "40+ Weekly Reconciliation Reports Eliminated With a Real-Time SAP–Salesforce Bridge", ar: "أكثر من ٤٠ تقرير تسوية أسبوعي ألغتها جسر مزامنة آني بين SAP وSalesforce" },
    desc: { en: "A real-time, event-driven integration layer syncs SAP S/4HANA and Salesforce across four business units — automatically, bidirectionally, with field-level conflict resolution. The 120 person-hours per week spent on reconciliation? Gone.", ar: "طبقة تكامل مدفوعة بالأحداث تُزامن SAP S/4HANA مع Salesforce عبر أربع وحدات أعمال — آنياً، في الاتجاهين، مع حل تعارضات على مستوى الحقل. الـ 120 ساعة عمل أسبوعية على التسوية اليدوية؟ انتهت." },
    challenge: {
      en: "A multi-site industrial manufacturing group with operations across four cities had Salesforce for sales and SAP S/4HANA for operations, but no integration between them. Each business unit ran its own weekly reconciliation — 40+ reports across the group — to manually align customer data, order status, inventory levels, and invoicing. The process consumed a combined 120 person-hours per week and still contained errors.",
      ar: "مجموعة تصنيع صناعية متعددة المواقع لديها Salesforce للمبيعات وSAP S/4HANA للعمليات دون أي تكامل. كل وحدة أعمال تدير تقارير تسوية أسبوعية — أكثر من 40 تقرير — تستهلك 120 ساعة عمل أسبوعياً.",
    },
    solution: {
      en: "The integration layer is a real-time, event-driven system built on Node.js microservices hosted on AWS ECS. SAP change data is captured via RFC calls on a 30-second polling interval. Salesforce changes are captured via Platform Events. A central transformation engine maps SAP's data model to Salesforce's schema with full field-level conflict resolution. The setup runs with circuit breakers, dead-letter queues, and a monitoring dashboard showing integration health across all four business units.",
      ar: "طبقة التكامل منظومة مدفوعة بالأحداث في الوقت الفعلي. التقاط بيانات التغيير من SAP عبر RFC. أحداث Salesforce Platform Events. محرك تحويل مركزي مع حل تعارضات كامل على مستوى الحقول. تعمل مع قواطع دوائر وقوائم رسائل معطوبة ولوحة مراقبة.",
    },
    metrics: [
      { label: { en: "Business units synced", ar: "وحدات أعمال مزامنة" }, value: "4" },
      { label: { en: "Manual reports eliminated", ar: "تقارير يدوية ملغاة" }, value: "40+" },
      { label: { en: "Data sync latency", ar: "تأخير المزامنة" }, value: "<30s" },
    ],
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Manufacturing", ar: "التصنيع" },
  },
  {
    slug: "qatar-healthcare-patient-app",
    date: "2024-10-25",
    tag: { en: "Mobile App", ar: "تطبيق موبايل" },
    title: { en: "A Healthcare App That Reached 4.8★ on Both App Stores Within 30 Days of Launch", ar: "تطبيق رعاية صحية وصل لتقييم ٤.٨★ على كلا المتجرين خلال ٣٠ يوماً من الإطلاق" },
    desc: { en: "React Native patient engagement app with AI appointment scheduling, bilingual symptom checker, and encrypted doctor messaging. Integrated with the clinic's HIS via HL7 FHIR. Patients gave it 4.8 stars. Within the first month.", ar: "تطبيق React Native لتفاعل المرضى مع جدولة مواعيد بالذكاء الاصطناعي ومدقق أعراض ثنائي اللغة ومراسلة آمنة مع الأطباء. مدمج مع نظام المعلومات الصحي للعيادة عبر HL7 FHIR. المرضى منحوه 4.8 نجمة. في الشهر الأول." },
    challenge: {
      en: "A multi-clinic healthcare provider was struggling with appointment no-shows (32% rate), poor patient communication between visits, and an outdated booking system that required phone calls. They needed a mobile app that worked for both Arabic-speaking and English-speaking patients, integrated with their existing HIS (Hospital Information System), and complied with local healthcare data regulations.",
      ar: "مزود رعاية صحية متعدد العيادات كان يعاني من معدل عدم حضور 32% ونظام حجز قديم يستوجب المكالمات الهاتفية. احتاجوا إلى تطبيق موبايل يعمل للمرضى العرب والناطقين بالإنجليزية ومتوافق مع أنظمتهم الحالية.",
    },
    solution: {
      en: "The app is built in React Native with Expo for cross-platform deployment. AI-powered appointment scheduling suggests optimal slots based on doctor availability, patient history, and clinic load patterns. A bilingual (Arabic/English) symptom pre-checker uses a fine-tuned triage model that flags urgent cases for same-day booking. End-to-end encrypted doctor-patient messaging, push notifications for reminders and results, and a secure HL7 FHIR API layer handling all HIS integration.",
      ar: "التطبيق مبني بـ React Native مع Expo. جدولة مواعيد بالذكاء الاصطناعي تقترح المواعيد المثلى. مدقق أعراض ثنائي اللغة بنموذج تصنيف دقيق يُعلّم الحالات المستعجلة. مراسلة مشفرة وإشعارات مدفوعة وطبقة HL7 FHIR للتكامل مع نظام المعلومات الصحي.",
    },
    metrics: [
      { label: { en: "App store rating", ar: "تقييم المتجر" }, value: "4.8★" },
      { label: { en: "Days to 4.8★", ar: "أيام حتى 4.8★" }, value: "30" },
      { label: { en: "Languages", ar: "لغات" }, value: "2" },
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    industry: { en: "Healthcare", ar: "الصحة" },
  },
];
