export const CASES = [
  {
    slug: "gcc-real-estate-lead-automation",
    tag: { en: "Workflow Automation", ar: "أتمتة سير العمل" },
    title: { en: "90% Faster Lead Processing for GCC Real Estate Firm", ar: "تسريع معالجة العملاء المحتملين بنسبة 90% لشركة عقارية في الخليج" },
    desc: { en: "We engineered a multi-step n8n automation that captured leads from 8 channels, qualified them via AI scoring, and synced them directly to HubSpot — eliminating 3 hours of daily manual entry.", ar: "هندسنا أتمتة متعددة الخطوات التقطت العملاء من 8 قنوات، قيّمتهم بالذكاء الاصطناعي، وزامنتهم مع HubSpot — مما أزال 3 ساعات من الإدخال اليدوي اليومي." },
    challenge: {
      en: "A major GCC real estate developer was managing leads from 8 different sources — website forms, WhatsApp, Instagram DMs, property portals (Bayut, Property Finder), phone calls, referrals, walk-ins, and LinkedIn — each feeding into a different spreadsheet managed by a different broker. Leads were being lost, duplicated, and followed up on days late. The sales team was spending 3+ hours per day just on data entry.",
      ar: "كان مطور عقاري رئيسي في الخليج يدير عملاء محتملين من 8 مصادر مختلفة، كل منها يغذي جدول بيانات مختلف. كان العملاء يُفقدون ويُكررون وتُتابع معهم بعد أيام.",
    },
    solution: {
      en: "We architected a centralised lead ingestion pipeline using n8n as the orchestration layer. WhatsApp Business API webhooks fed directly into the workflow. Website forms posted via a custom API. Social DMs were captured through Meta's Graph API. All 8 streams merged into a single normalisation node that extracted name, phone, budget, property type, and intent. An OpenAI classifier scored each lead on a 1–10 scale and assigned it to the correct sales pod automatically. Everything synced to HubSpot in real time with full source attribution.",
      ar: "صممنا خط استيعاب مركزي باستخدام n8n كطبقة تنسيق. جميع المصادر الثمانية تدمج في نقطة تطبيع واحدة، ثم يُصنّف الذكاء الاصطناعي كل عميل ويعينه للفريق المناسب.",
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
    tag: { en: "AI Chatbot", ar: "روبوت محادثة AI" },
    title: { en: "WhatsApp AI Agent Handling 2,000+ Monthly Inquiries for UAE Retailer", ar: "وكيل ذكاء اصطناعي عبر واتساب يتعامل مع أكثر من 2000 استفسار شهري لتاجر تجزئة في الإمارات" },
    desc: { en: "Deployed a trilingual AI agent (Arabic/English/Urdu) on WhatsApp Business API that handled product inquiries, order tracking, and escalation — deflecting 78% of tickets from human agents.", ar: "نشرنا وكيل ذكاء اصطناعي ثلاثي اللغات على واتساب Business API تعامل مع استفسارات المنتجات وتتبع الطلبات والتصعيد — محولاً 78% من التذاكر عن الوكلاء البشريين." },
    challenge: {
      en: "A mid-size UAE electronics retailer was receiving 2,000+ WhatsApp messages per month across a team of 6 customer service agents. 70% of messages were repetitive: stock availability, order status, return policy, and delivery timelines. The team was overwhelmed, response times averaged 4 hours, and CSAT was declining.",
      ar: "كان تاجر إلكترونيات إماراتي متوسط الحجم يستقبل أكثر من 2000 رسالة واتساب شهرياً. 70% من الرسائل كانت متكررة. كان الفريق مرهقاً وأوقات الاستجابة تتجاوز 4 ساعات.",
    },
    solution: {
      en: "We deployed a trilingual AI agent (Arabic, English, Urdu) trained on the client's full product catalogue, order management system API, and returns policy. The agent used intent detection to route messages: product queries → catalogue RAG lookup; order tracking → real-time API fetch; returns → guided flow with human handoff for edge cases. An escalation score triggered live agent routing when confidence fell below 0.7 or the user sent a frustrated message detected by our sentiment layer.",
      ar: "نشرنا وكيلاً ثلاثي اللغات مدرباً على كتالوج المنتجات الكامل وواجهة برمجة نظام إدارة الطلبات. الوكيل يستخدم اكتشاف النية لتوجيه الرسائل تلقائياً.",
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
    tag: { en: "Web Platform", ar: "منصة ويب" },
    title: { en: "SaaS Dashboard for Saudi Arabia Financial Analytics Startup", ar: "لوحة تحكم SaaS لشركة ناشئة في تحليلات مالية بالسعودية" },
    desc: { en: "Built a full-stack bilingual SaaS platform with real-time financial data visualization, role-based access control, and Plaid + Tamara payment integrations — launched in 12 weeks.", ar: "بنينا منصة SaaS ثنائية اللغة متكاملة مع تصور بيانات مالية في الوقت الفعلي، وتحكم في الوصول المبني على الأدوار، وتكاملات Plaid + Tamara — أُطلقت في 12 أسبوعاً." },
    challenge: {
      en: "A Saudi fintech startup had an MVP built by freelancers — a single-language, single-page React app that worked for demos but couldn't scale. They needed a production-grade bilingual platform with enterprise role-based access, real-time data dashboards, and compliance with Saudi SAMA's open banking requirements, all in 12 weeks before their Series A fundraise.",
      ar: "كانت شركة ناشئة في مجال التقنية المالية السعودية لديها MVP مبني من قبل مستقلين — تطبيق React بلغة واحدة يعمل للعروض التوضيحية لكن لا يمكنه التوسع.",
    },
    solution: {
      en: "We took over the codebase on day one. Built a Next.js 14 App Router foundation with i18n routing for Arabic/English. Implemented a role-based access control system with five permission levels (admin, analyst, viewer, auditor, API) backed by PostgreSQL row-level security. Built 14 real-time dashboard widgets using React Query + WebSockets for live data. Integrated Plaid for bank account data and Tamara for BNPL payment flows. Delivered on day 83 — one week ahead of schedule.",
      ar: "بنينا أساساً بـ Next.js 14 مع توجيه i18n للعربية/الإنجليزية. نظام تحكم في الوصول المبني على الأدوار مع خمسة مستويات. 14 أداة لوحة تحكم في الوقت الفعلي. أُسلمنا في اليوم 83.",
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
    tag: { en: "Custom AI", ar: "ذكاء اصطناعي مخصص" },
    title: { en: "Arabic Legal Document RAG System for Kuwait Law Firm", ar: "نظام RAG للمستندات القانونية العربية لمكتب محاماة في الكويت" },
    desc: { en: "Built a Retrieval-Augmented Generation system over 15,000+ Arabic legal documents enabling attorneys to query case law in seconds, reducing research time from hours to minutes.", ar: "بنينا نظام RAG على أكثر من 15,000 وثيقة قانونية عربية يمكّن المحامين من الاستعلام عن قانون القضايا في ثوانٍ، مما يقلل وقت البحث من ساعات إلى دقائق." },
    challenge: {
      en: "A prominent Kuwaiti law firm had 15,000+ Arabic legal documents — court rulings, regulatory filings, case precedents, and legislation — stored as scanned PDFs. Junior attorneys were spending 4–8 hours per case on manual document research, limiting the firm's capacity and creating billing inefficiency. They needed a way to query this corpus using natural language.",
      ar: "مكتب محاماة كويتي بارز كان لديه أكثر من 15,000 وثيقة قانونية عربية مخزنة كملفات PDF ممسوحة ضوئياً. كان المحامون يقضون 4-8 ساعات لكل قضية في البحث اليدوي.",
    },
    solution: {
      en: "We built an end-to-end Arabic document intelligence pipeline. OCR layer using Tesseract fine-tuned on Arabic legal fonts to extract text from scanned PDFs. Arabic text normalisation to handle diacritics, different Unicode representations of the same characters, and common OCR errors. Semantic chunking preserving document structure and metadata (court, date, case number, type). Embeddings using multilingual-e5-large via a self-hosted inference endpoint. Vector storage in Qdrant. A GPT-4o powered RAG interface with citation trails back to source documents.",
      ar: "بنينا خط استخبارات وثائق عربي شامل. طبقة OCR مدربة على الخطوط القانونية العربية. تطبيع نصي. تقطيع دلالي. تضمينات باستخدام multilingual-e5-large. تخزين متجهي في Qdrant. واجهة RAG مع مسارات اقتباس.",
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
    tag: { en: "Systems Integration", ar: "تكامل الأنظمة" },
    title: { en: "Unified CRM + ERP Data Bridge for Turkish Manufacturing Group", ar: "جسر بيانات CRM + ERP موحد لمجموعة تصنيع تركية" },
    desc: { en: "Architected a real-time bi-directional sync between SAP S/4HANA and Salesforce across 4 business units, eliminating 40+ weekly manual reconciliation reports.", ar: "صممنا مزامنة ثنائية الاتجاه في الوقت الفعلي بين SAP S/4HANA وSalesforce عبر 4 وحدات أعمال، مما أزال 40+ تقرير تسوية يدوي أسبوعي." },
    challenge: {
      en: "A Turkish industrial manufacturing group with operations in Istanbul, Izmir, Ankara, and Bursa had Salesforce for sales and SAP S/4HANA for operations, but no integration between them. Each business unit ran its own weekly reconciliation — 40+ reports across the group — to manually align customer data, order status, inventory levels, and invoicing. The process took a combined 120 person-hours per week and still contained errors.",
      ar: "مجموعة تصنيع صناعية تركية لديها Salesforce للمبيعات وSAP S/4HANA للعمليات دون أي تكامل. كل وحدة أعمال تدير تقارير تسوية أسبوعية — أكثر من 40 تقرير — تستغرق 120 ساعة عمل أسبوعياً.",
    },
    solution: {
      en: "We designed and built a real-time event-driven integration layer using Node.js microservices hosted on AWS ECS. SAP change data captured via RFC calls on a 30-second polling interval. Salesforce changes captured via Platform Events. A central transformation engine mapped SAP's data model to Salesforce's schema with full field-level conflict resolution. Deployed with circuit breakers, dead-letter queues, and a monitoring dashboard showing integration health across all 4 business units.",
      ar: "صممنا وبنينا طبقة تكامل مدفوعة بالأحداث في الوقت الفعلي. التقاط بيانات التغيير من SAP. أحداث Salesforce. محرك تحويل مركزي مع حل تعارضات كامل على مستوى الحقول.",
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
    tag: { en: "Mobile App", ar: "تطبيق موبايل" },
    title: { en: "Patient Engagement App for Qatar Healthcare Provider", ar: "تطبيق تفاعل المرضى لمزود رعاية صحية في قطر" },
    desc: { en: "Developed an iOS/Android app with AI appointment scheduling, bilingual symptom checker, and real-time doctor messaging — achieving 4.8★ on both app stores within 30 days of launch.", ar: "طورنا تطبيق iOS/Android مع جدولة مواعيد بالذكاء الاصطناعي، مدقق أعراض ثنائي اللغة، ومراسلة طبيب في الوقت الفعلي — محققاً 4.8★ على متجري التطبيقات خلال 30 يوماً من الإطلاق." },
    challenge: {
      en: "A Qatari multi-clinic healthcare provider was struggling with appointment no-shows (32% rate), poor patient communication between visits, and an outdated booking system that required phone calls. They needed a mobile app that worked for both Arabic-speaking and English-speaking patients, integrated with their existing HIS (Hospital Information System), and complied with Qatar's healthcare data regulations.",
      ar: "مزود رعاية صحية قطري متعدد العيادات كان يعاني من معدل عدم حضور 32% ونظام حجز قديم. احتاجوا إلى تطبيق موبايل يعمل للمرضى العرب والناطقين بالإنجليزية.",
    },
    solution: {
      en: "Built a React Native app with Expo for cross-platform deployment. AI-powered appointment scheduling that suggested optimal slots based on doctor availability, patient history, and clinic load patterns. A bilingual (Arabic/English) symptom pre-checker using a fine-tuned triage model that flagged urgent cases for same-day booking. End-to-end encrypted doctor-patient messaging. Push notifications for appointment reminders, test results, and prescription refills. Integrated with the existing HIS via a secure HL7 FHIR API layer.",
      ar: "بنينا تطبيق React Native مع Expo. جدولة مواعيد بالذكاء الاصطناعي. مدقق أعراض ثنائي اللغة. مراسلة مشفرة. إشعارات مدفوعة. تكامل مع HIS عبر HL7 FHIR.",
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
