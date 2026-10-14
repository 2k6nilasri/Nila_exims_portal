export const servicesList = [
  {
    id: 'documentation',
    title: 'Documentation (Import & Export)',
    shortDesc: 'Complete customs documentation, invoice, packing list, bill of lading & shipping bill preparation.',
    fullDesc: 'End-to-end foreign trade documentation services for both importers and exporters. We prepare and audit pre-shipment and post-shipment documents including Commercial Invoices, Packing Lists, Shipping Bills, Bills of Lading, Certificates of Origin, and Customs Declarations to ensure 100% compliance with DGFT and Indian Customs regulations.',
    category: 'Trade Documentation',
    iconName: 'FileText',
    benefits: [
      'Zero customs clearance delays',
      'Flawless DGFT & Customs compliance',
      'Pre-audit of invoice & packing list details',
      'Filing of Bill of Entry & Shipping Bills'
    ],
    documentsRequired: [
      'Commercial Invoice & Packing List',
      'IEC Certificate & Bank AD Code Letter',
      'Purchase Order / Sales Contract',
      'Transport Bill / Bill of Lading / Airway Bill'
    ]
  },
  {
    id: 'rosctl',
    title: 'ROSCTL Scheme',
    shortDesc: 'Rebate of State and Central Taxes and Levies for apparel & textile exports.',
    fullDesc: 'The Rebate of State and Central Taxes and Levies (ROSCTL) scheme provides duty credit scrips for embedded state and central taxes on export of apparel, garments, and made-ups. We handle full scrip generation, application submission, ICEGATE scroll linking, and scrip transfer/utilization.',
    category: 'Government Incentive',
    iconName: 'Percent',
    benefits: [
      'Monetize embedded state & central tax levies',
      'Duty credit scrips transferable to buyers',
      'Fast scrip generation on ICEGATE portal',
      'Maximizes export profitability for garment units'
    ],
    documentsRequired: [
      'Shipping Bills with ROSCTL claim checked',
      'eBRC (Electronic Bank Realization Certificate)',
      'ICEGATE login credentials & Digital Signature (DSC)',
      'IEC & RCMC Registration'
    ]
  },
  {
    id: 'rodtep',
    title: 'RODTEP Scheme',
    shortDesc: 'Remission of Duties and Taxes on Exported Products for all export sectors.',
    fullDesc: 'RODTEP remits non-refundable taxes, duties, and levies at Central, State, and Local levels incurred during manufacturing and distribution of export goods. NILA EXIMS guides exporters through ledger creation, scroll generation, and duty credit scrip realization.',
    category: 'Government Incentive',
    iconName: 'Coins',
    benefits: [
      'Covers electricity duties, fuel taxes & mandi tax',
      'Direct credit into ICEGATE e-Ledger',
      'Usable for Basic Customs Duty (BCD) payments',
      'Complete end-to-end scroll ledger audit'
    ],
    documentsRequired: [
      'Export Shipping Bills',
      'Bank Realization Certificates (eBRC)',
      'ICEGATE Account details',
      'GSTIN & IEC Code'
    ]
  },
  {
    id: 'epcg',
    title: 'EPCG Licence',
    shortDesc: 'Export Promotion Capital Goods Scheme for duty-free machinery imports.',
    fullDesc: 'The EPCG Scheme allows import of capital goods/machinery at ZERO customs duty, subject to an export obligation equal to 6 times of duty saved over 6 years. We handle EPCG licence fresh issuance, modification, export obligation discharge certificate (EODC), and redemption.',
    category: 'Licensing & Incentives',
    iconName: 'ShieldCheck',
    benefits: [
      'Import advanced machinery with 0% customs duty',
      'Huge capital expenditure savings for manufacturers',
      'Expert export obligation tracking & compliance',
      'Smooth EODC redemption with DGFT'
    ],
    documentsRequired: [
      'Chartered Engineer Certificate',
      'Imported Machinery Proforma Invoice & HSN Code',
      'Past 3 years Export Performance statement',
      'IEC, RCMC & Industrial Registration'
    ]
  },
  {
    id: 'edi',
    title: 'EDI Registration',
    shortDesc: 'Electronic Data Interchange customs port registration across Indian ports.',
    fullDesc: 'EDI registration links your AD (Authorised Dealer) Bank Code and IEC with Indian Customs EDI ports (ICD Tiruppur, Chennai, Tuticorin, Cochin, Mumbai, etc.) for automated customs clearance and direct drawback/incentive bank credit.',
    category: 'Port & Customs',
    iconName: 'Network',
    benefits: [
      'Multi-port EDI registration across India',
      'Direct bank credit of duty drawbacks & rebates',
      'Seamless online clearance on Customs EDI',
      'Fast 24-48 hour approval turnaround'
    ],
    documentsRequired: [
      'Bank AD Code Authorization Letter',
      'IEC Copy & PAN Card',
      'GST Registration Certificate',
      'Cancelled Cheque of AD Bank Account'
    ]
  },
  {
    id: 'icegate',
    title: 'ICEGATE Registration',
    shortDesc: 'Indian Customs Electronic Gateway portal registration and DSC configuration.',
    fullDesc: 'ICEGATE is the official portal of Indian Customs providing e-filing services, duty payment, e-Sanchit document upload, and incentive ledger tracking. We assist with Class 3 DSC registration, portal registration, user profile validation, and advisory services.',
    exchangeRateUrl: 'https://foservices.icegate.gov.in/#/services/viewExchangeRate',
    category: 'Port & Customs',
    iconName: 'Globe',
    benefits: [
      'Access to e-Sanchit paperless document filing',
      'Live tracking of Shipping Bills & Bill of Entry',
      'Management of RODTEP & ROSCTL credit ledgers',
      'Seamless customs duty online payment gateway'
    ],
    documentsRequired: [
      'Class 3 Digital Signature Certificate (DSC)',
      'IEC & PAN Card of Proprietor/Directors',
      'Aadhaar Card & Active Email/Mobile Number',
      'GSTIN Registration Certificate'
    ]
  },
  {
    id: 'aa-licence',
    title: 'AA Licence (Advance Authorization)',
    shortDesc: 'Duty-free raw material import against export obligation.',
    fullDesc: 'Advance Authorization (AA) scheme allows duty-free import of raw materials, inputs, and packaging material physically incorporated into export products. We consult on standard input-output norms (SION), licence application, closure, and bond waiver.',
    category: 'Licensing & Incentives',
    iconName: 'Award',
    benefits: [
      'Import raw materials duty-free (BCD + IGST exemption)',
      'Improves export pricing competitiveness',
      'Norms fixing (SION) & self-declaration support',
      'Fast DGFT licence approval & bond execution'
    ],
    documentsRequired: [
      'Export Order / Contract Copy',
      'Input-Output Consumption statement',
      'Chartered Engineer Verification',
      'Past Export & Import History'
    ]
  },
  {
    id: 'aeo',
    title: 'AEO Certification',
    shortDesc: 'Authorized Economic Operator status for priority customs clearance.',
    fullDesc: 'AEO is a global quality mark issued by CBIC / Indian Customs certifying an entity\'s international supply chain security. Benefits include faster customs release, direct port delivery (DPD), reduced bank guarantees, and priority treatment worldwide.',
    category: 'Customs Certification',
    iconName: 'BadgeCheck',
    benefits: [
      'Priority customs processing & faster release',
      'Waiver of Bank Guarantee requirement for schemes',
      'Direct Port Delivery (DPD) & Direct Port Entry (DPE)',
      'Mutual Recognition Agreements (MRA) with foreign customs'
    ],
    documentsRequired: [
      'Company Financial Audit statements (3 years)',
      'Site Security & Supply Chain Safety Audit reports',
      'Standard Operating Procedures (SOP) documentation',
      'Customs Compliance track record'
    ]
  },
  {
    id: 'iso',
    title: 'ISO Certification',
    shortDesc: 'ISO 9001, 14001, 45001 international quality management certifications.',
    fullDesc: 'Global buyers mandate ISO certifications to verify quality, environmental, and safety management. We assist export businesses in acquiring ISO 9001 (Quality), ISO 14001 (Environmental), and ISO 45001 (Occupational Health & Safety) credentials with accredited certification bodies.',
    category: 'Quality & Standards',
    iconName: 'CheckCircle2',
    benefits: [
      'Unlocks global buyer tenders and contracts',
      'Enhances brand reputation & credibility',
      'Structured operational & quality standards',
      'Hassle-free documentation & audit preparation'
    ],
    documentsRequired: [
      'Business Registration / IEC / GST',
      'Company Process Flowchart & Org Structure',
      'Employee Details & Factory Address Proof'
    ]
  },
  {
    id: 'aepc-rcmc',
    title: 'AEPC (RCMC) Registration',
    shortDesc: 'Apparel Export Promotion Council Registration cum Membership Certificate.',
    fullDesc: 'Registration Cum Membership Certificate (RCMC) from AEPC is mandatory for garment and apparel exporters to claim DGFT benefits, ROSCTL rebates, participation in international trade fairs, and export market development schemes.',
    category: 'Council Registration',
    iconName: 'Shirt',
    benefits: [
      'Mandatory for garment export DGFT scheme benefits',
      'Access to international buyer delegations & expos',
      'Market Intelligence & Trade Statistics updates',
      'Quick new registration & annual renewal'
    ],
    documentsRequired: [
      'IEC Copy & PAN Card of Entity',
      'GSTIN Certificate & Bank Certificate',
      'Partnership Deed / MOA & AOA / Partnership details',
      'Factory License / SSI / Udyam Registration'
    ]
  },
  {
    id: 'iec',
    title: 'IEC (Import Export Code)',
    shortDesc: 'Mandatory 10-digit DGFT Import Export Code registration and modification.',
    fullDesc: 'Import Export Code (IEC) is a 10-digit unique code issued by the Directorate General of Foreign Trade (DGFT) required by any business entity engaging in import or export activities in India. We handle fresh IEC issuance, annual IEC update, and profile modifications.',
    category: 'Core DGFT License',
    iconName: 'Briefcase',
    benefits: [
      'Mandatory gateway for all foreign trade in India',
      'Lifetime validity with simple annual online update',
      'Fast 24-hour issuance turn-around time',
      'Seamless link with GSTIN & Bank accounts'
    ],
    documentsRequired: [
      'PAN Card of Proprietor / Firm / Company',
      'Aadhaar Card / Passport of Applicant',
      'Bank Account Cancelled Cheque / Certificate',
      'Address Proof of Business Premises'
    ]
  },
  {
    id: 'txc',
    title: 'TXC (Textile Commissioner)',
    shortDesc: 'Textile Commissioner clearance and return filing compliance.',
    fullDesc: 'Textile Commissioner registration and statutory periodic reporting for yarn, fabric, and garment manufacturing units. NILA EXIMS handles TXC registrations, returns, and quota/statutory compliance for textile mills and apparel exporters.',
    category: 'Textile Compliance',
    iconName: 'Layers',
    benefits: [
      'Statutory compliance for textile manufacturing units',
      'Required for specialized government textile subsidies',
      'Error-free filing of monthly/annual TXC returns',
      'Expert consulting on textile policy norms'
    ],
    documentsRequired: [
      'Factory Machinery & Installed Capacity details',
      'Udyam Registration / Industrial License',
      'Power Connection bill & Property documents',
      'IEC & GST Certificates'
    ]
  },
  {
    id: 'rex',
    title: 'REX System (Registered Exporter)',
    shortDesc: 'EU Registered Exporter system for duty preference in European Union.',
    fullDesc: 'The REX system is a system of certification of origin of goods applied by the European Union under Generalized Scheme of Preferences (GSP). Registered exporters can self-certify origin statements on commercial invoices for exports to EU, UK, Switzerland, and Norway.',
    category: 'EU Trade & Customs',
    iconName: 'Zap',
    benefits: [
      'Self-certification of origin on commercial invoice',
      'Duty-free or reduced tariff access into EU markets',
      'Eliminates paper Certificate of Origin per shipment',
      'Accelerates European customer customs clearance'
    ],
    documentsRequired: [
      'IEC Code & RCMC Certificate',
      'EORI / REX Application Form',
      'Factory Production & Raw Material Sourcing proof',
      'Entity Bank Account Details'
    ]
  },
  {
    id: 'gsp-co-fta',
    title: 'GSP / CO / FTA Certificate of Origin',
    shortDesc: 'Certificate of Origin (Non-Preferential & Preferential FTA / GSP).',
    fullDesc: 'Certificates of Origin (CoO) verify that goods exported originate from India. Preferential Certificates under Free Trade Agreements (India-UAE CEPA, India-Australia ECTA, ASEAN, Japan, Korea) reduce or eliminate import duties for overseas buyers.',
    category: 'Trade Documentation',
    iconName: 'FileCheck',
    benefits: [
      'Reduces import duty tariffs for your overseas buyers',
      'Official DGFT e-CoO portal filing & endorsement',
      'Covering GSP, SAPTA, APTA, CEPA & FTA trade agreements',
      'Chamber of Commerce & Council attestations'
    ],
    documentsRequired: [
      'Export Commercial Invoice & Packing List',
      'Bill of Lading / Airway Bill copy',
      'Manufacturing Cost Breakdown / Process Description',
      'IEC & DSC Token'
    ]
  }
];
