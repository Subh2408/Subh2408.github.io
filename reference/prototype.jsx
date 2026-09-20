import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

const DATA = {
 "positions": [
  {
   "slug": "caregiving",
   "type": "break",
   "company": "Caregiving sabbatical",
   "role": "Full-time carer",
   "start": "2024-03",
   "end": "2024-10",
   "industry": null,
   "summary": "Full-time carer for my mother during her terminal illness.",
   "order": 0,
   "body": "Between March and October 2024 I stepped away from work to care for my mother through her terminal illness. I returned to my career after she passed."
  },
  {
   "slug": "qatar-insurance-group",
   "type": "role",
   "company": "Qatar Insurance Group",
   "role": "AI Projects Manager",
   "start": "2025-08",
   "end": "present",
   "industry": "Insurance",
   "summary": "Own enterprise AI strategy and governance at QIC, and run a portfolio of 8–10 concurrent AI initiatives from business case through delivery.",
   "order": 1,
   "body": "QIC is the largest insurance group in the Middle East. I author the enterprise AI strategy — how AI and ML get applied across core insurance and support functions — and hold the governance side of that alongside delivery.\n\nMost of the work sits at the point where a regulated industry meets a technology that regulators are still writing rules for. That means the register, the submission and the risk framing matter as much as the models."
  },
  {
   "slug": "auto-insurance-startup",
   "type": "role",
   "company": "AI-driven auto insurance startup",
   "role": "Freelance Product Manager & ML Specialist",
   "start": "2023-01",
   "end": "2024-08",
   "industry": "Insurance",
   "summary": "Took an AI claims product from a blank page to a working MVP, single-handedly owning roadmap, design and delivery.",
   "order": 2,
   "body": "An early-stage insurer building an AI-first claims experience. I was the sole product person: defining the roadmap from market and customer research, designing the claimant journey, and working directly with ML and mobile engineers to ship.\n\nBecause the company had no historical data at launch, most of the work was about sequencing — what can be rules today that becomes a model once data exists, and what infrastructure has to be right from day one so that transition is cheap later."
  },
  {
   "slug": "miq-digital",
   "type": "role",
   "company": "MiQ Digital",
   "role": "Engagement Manager, Data & Analytics",
   "start": "2022-04",
   "end": "2022-11",
   "industry": "Advertising",
   "summary": "Led analytics engagements for global advertisers and rebuilt how the analytics pods checked their own work.",
   "order": 3,
   "body": "MiQ delivers programmatic advertising and analytics for global brands. As engagement lead I directed predictive and prescriptive use cases, ran use-case identification with clients, and handled stakeholder education and team evaluation.\n\nThe work I am proudest of here was internal rather than client-facing: a quality control program across the analytics pods."
  },
  {
   "slug": "quantiphi",
   "type": "role",
   "company": "Quantiphi",
   "role": "Associate Engagement Manager",
   "start": "2019-03",
   "end": "2022-01",
   "industry": "AI consulting",
   "summary": "Delivered AI products for insurance and semiconductor clients at an AI-first engineering firm, from pre-sales pitch through production.",
   "order": 4,
   "body": "Quantiphi is an AI-first digital engineering company. I ran project and product delivery using agile methods, tracking cost, resourcing and stakeholders, and led pre-sales pitches for AI products.\n\nThe engagements spanned insurance and semiconductor manufacturing, and most involved standing up production ML on AWS or GCP rather than proofs of concept."
  },
  {
   "slug": "wns-global-services",
   "type": "role",
   "company": "WNS Global Services",
   "role": "Assistant Manager, Research & Analytics",
   "start": "2015-11",
   "end": "2019-03",
   "industry": "FMCG & retail analytics",
   "summary": "Predictive and prescriptive retail analytics for a Fortune 100 FMCG client and its big-box retail partners.",
   "order": 5,
   "body": "At WNS I analysed business problems for a major US FMCG client and produced predictive and prescriptive insight for their retail partners — Walmart, Target, Costco and others.\n\nThis is where the statistics habit started: three years of weekly Nielsen data, and the discovery that most commercial questions are really questions about which lever moved the number."
  },
  {
   "slug": "ernst-young",
   "type": "role",
   "company": "Ernst & Young",
   "role": "Analyst",
   "start": "2015-01",
   "end": "2015-10",
   "industry": "Professional services",
   "summary": "Tax services within EY's Global Delivery Service.",
   "order": 6,
   "body": "Joined EY's Global Delivery Service in tax. Handled 10+ return filings a day at peak season, with a focus on compliance accuracy and turnaround."
  }
 ],
 "work": [
  {
   "slug": "ai-education-app",
   "position": "qatar-insurance-group",
   "order": 4,
   "featured": false,
   "title": "Internal AI education app",
   "year": "2025",
   "description": "A newspaper-style internal application that teaches AI and commercial insurance literacy, built and shipped in-house and adopted by more than 200 business users.",
   "kpis": [
    {
     "value": "200+",
     "label": "active business users"
    },
    {
     "value": "In-house",
     "label": "built and shipped internally"
    }
   ],
   "chips": {
    "domain": [
     "Insurance",
     "Internal tools",
     "Enablement"
    ],
    "method": [
     "Editorial design",
     "Adoption measurement",
     "Content strategy"
    ]
   },
   "body": "Getting an organisation to use AI well is mostly a literacy problem. A newspaper format worked because it asks for two minutes rather than a training session.\n\n> Placeholder body. Replace with why the newspaper metaphor, how adoption was measured, and what people did differently afterwards.",
   "tags": {
    "discipline": [
     "Design",
     "AI Strategy"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "ai-governance-qcb",
   "position": "qatar-insurance-group",
   "order": 2,
   "featured": false,
   "title": "AI governance and the QCB submission",
   "year": "2025–26",
   "description": "Led QIC's AI regulatory submission to the Qatar Central Bank and established the enterprise AI register and governance framework that sits behind it.",
   "kpis": [
    {
     "value": "8–10",
     "label": "concurrent AI initiatives under governance"
    },
    {
     "value": "QCB",
     "label": "regulatory submission led end to end"
    }
   ],
   "chips": {
    "domain": [
     "Insurance",
     "Regulation",
     "AI governance"
    ],
    "method": [
     "Policy authoring",
     "Risk register design",
     "Regulator engagement"
    ]
   },
   "body": "A regulator asking what your AI does, who owns it, and what happens when it is wrong is a product question before it is a legal one. The register had to be something teams would actually keep current rather than a document written once for an audit.\n\n> Placeholder body. Replace with the register's structure, the argument you made to the regulator, and what changed internally as a result.",
   "tags": {
    "discipline": [
     "AI Strategy",
     "Ops"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "analytics-quality-program",
   "position": "miq-digital",
   "order": 1,
   "featured": false,
   "title": "Quality check program for the analytics function",
   "year": "2022",
   "description": "A quality control program across analytics pods — checklists, documentation standards and reusable templates — designed to raise the floor without flattening exploratory work.",
   "kpis": [
    {
     "value": "50%",
     "label": "reduction in turnaround time"
    },
    {
     "value": "70%",
     "label": "drop in data errors"
    }
   ],
   "chips": {
    "domain": [
     "Analytics operations",
     "Advertising"
    ],
    "method": [
     "Process design",
     "Checklist frameworks",
     "Templating",
     "Enablement"
    ]
   },
   "body": "### Summary\n\nA structured quality control program was conceptualized and implemented across multiple analytics Pods, targeting recurring issues in data accuracy, presentation consistency, and insight depth. This initiative led to a 50% reduction in turnaround time, a 70% drop in data errors, and a measurable uplift in the overall quality of insights delivered to stakeholders.\n\n---\n\n### Context & Challenge\n\nThe analytics team was experiencing frequent quality concerns in deliverables — ranging from raw data issues to inconsistent formatting and underdeveloped narratives. These issues were most prominent in outputs from junior analysts, where the lack of standardized processes resulted in frequent rework and low stakeholder confidence. While prior attempts at quality assurance existed, they remained informal, fragmented, and lacked sustained adoption.\n\nThe challenge was to design a solution that improved quality without stifling creativity — particularly for exploratory and client-facing analyses; and to ensure it could be embedded into day-to-day workflows without adding excessive overhead.\n\n---\n\n### Solution\n\nA three-part Quality Check program was developed, combining checklist-based reviews, documentation standards, and reusable templates tailored to the unique analytical workflows across Pods.\n\nAt the core of the program was a comprehensive checklist framework divided into three components: data quality, formatting, and insight generation. For data quality, a taxonomy of typical use cases was compiled and deconstructed into standardized workflows — covering the entire process from discovery and collection to manipulation, analysis, and interpretation. These workflows were accompanied by clear checkpoints to ensure data lineage, traceability, and accuracy were maintained throughout.\n\nOn the formatting front, standard templates were created for common analytical problems, enabling consistency in presentation while accounting for pod-specific nuances. This allowed analysts to spend less time on structuring decks and more on refining insights. Additionally, guidance on storytelling, slide structure, and annotation was incorporated to strengthen the communicative clarity of outputs.\n\n---\n\n### Outcome\n\nThe new QC program resulted in immediate operational benefits. Turnaround time for typical deliverables was halved, largely due to a reduction in rework and clarification loops. Data-related errors saw a 70% decline, and feedback from senior stakeholders highlighted a marked improvement in the quality and consistency of insights. Junior analysts were able to ramp up faster, and Pods reported smoother cross-collaboration owing to standardized output formats.\n\n---\n\n### Next Steps\n\nThe checklists are currently being adapted into JIRA workflows, enabling automated task-level QC integration. This will help further embed quality assurance into the fabric of project delivery without manual oversight.\n\n---",
   "tags": {
    "discipline": [
     "Ops",
     "BI"
    ],
    "industry": [
     "Advertising"
    ]
   }
  },
  {
   "slug": "auto-insurance-mvp",
   "position": "auto-insurance-startup",
   "order": 1,
   "featured": false,
   "title": "MVP for an AI auto insurance startup",
   "year": "2023–24",
   "description": "The MVP for an AI-first auto insurer: a Flutter claims app feeding a computer vision damage assessment pipeline on GCP, with churn and fraud designed in from the start.",
   "kpis": [
    {
     "value": "30%",
     "label": "cut in claims processing time"
    },
    {
     "value": "0 → 1",
     "label": "product taken from blank page to MVP"
    }
   ],
   "chips": {
    "stack": [
     "GCP",
     "Vertex AI",
     "Flutter",
     "Firestore",
     "Dataflow",
     "BigQuery"
    ],
    "domain": [
     "Auto insurance",
     "Computer vision"
    ],
    "method": [
     "Roadmapping",
     "Feature prioritisation",
     "Customer research"
    ]
   },
   "body": "The Minimum Viable Product (MVP) for an innovative AI Auto Insurance Startup was architected to **streamline and innovate around the claims process**. Key objectives included **automating damage assessment via image analysis**, implementing **real-time fraud detection capabilities** (as a phased approach), and developing a **predictive model for customer churn**. This AI-driven solution aimed to significantly **reduce operational overhead, accelerate claim processing cycles, and elevate the overall customer experience**. The platform was built leveraging a scalable cloud infrastructure on Google Cloud Platform (GCP), designed for sustained growth and proficient handling of real-time data streams, such as claimant-submitted imagery.\n\n## System Architecture and Operational Workflows\n\nThe platform integrates several key components to deliver a seamless and intelligent claims processing experience:\n\n### 1. **User Experience & Data Ingress:**\n\n-   A **Flutter-based mobile application** serves as the primary claimant interface. This allows users to intuitively submit claim images, input requisite details, and track claim progression in real-time.\n-   **Firebase Firestore** underpins this interaction by managing real-time metadata, including upload statuses, processing timestamps, and secure file URIs. This ensures data integrity and transparency for both customers and the internal claims adjudication team.\n\n### 2. **Automated Damage Assessment Pipeline:**\n\nThis high-throughput, cloud-native pipeline processes image-based claims with robust scalability:\n\n1.  **Secure Image Ingestion**: Claimants upload images within the User Interface - directly to **Google Cloud Storage (GCS)**, ensuring secure and durable storage.\n2.  **Event-Driven ETL Initiation**: **Google Cloud Functions** are triggered upon new image arrival in GCS, initiating the Extract, Transform, Load (ETL) pipeline.\n3.  **Scalable Image Preprocessing**: **Google Dataflow** executes distributed preprocessing tasks on the images. These include resizing, normalization, and strategic data augmentation (e.g., flipping, cropping, rotation) to enhance dataset robustness for model training and inference.\n4.  **AI-Powered Damage Analysis**: Preprocessed images are routed to **Google Vertex AI** for inference. Sophisticated, pre-trained computer vision models (e.g., YOLO, R-CNN architectures) perform object detection, identify areas of damage, and classify claim severity.\n5.  **Real-Time Feedback Loop**: Inference results are propagated back, providing immediate insights to the customer via the Flutter app and to a dedicated adjudicator dashboard for review and action.\n\n### 3. **Predictive Analytics Pipelines:**\n\n-   **Customer Churn Prediction (Evolving Batch Processing):** Implemented through a pragmatic, phased approach suited to a startup's initial lack of proprietary data, the churn prediction model began with a rule-based foundation. This initial system leveraged internal business expertise and early operational data (from Firestore and GCS) to provide foundational churn insights and enable customer retention efforts from day one. As the customer base and data volume grew—particularly historical claim data and rich customer interaction patterns stored in **Google BigQuery** - this evolved into a sophisticated machine learning model. This ML-driven system now periodically identifies customers at high risk of attrition with significantly greater precision, furnishing highly actionable, data-driven insights to retention teams and continuously improving as data richness increases.\n-   **Advanced Fraud Detection (Slated for Next Iteration)**: The platform architecture is primed for the seamless integration of an advanced fraud detection module. This future enhancement will employ machine learning to discern anomalous patterns in claim data, providing real-time risk scoring and alerting capabilities for potentially fraudulent submissions.\n\n### 4. **Machine Learning Model Lifecycle Management:**\n\n-   The **Dataflow pipeline** is central to the model training process, transforming raw image and metadata inputs. Augmented and curated data is then supplied to **Vertex AI** for model (re)training and fine-tuning.\n-   **Transfer learning** techniques were strategically applied to accelerate development and reduce dependency on vast quantities of proprietary labeled data, leveraging foundational knowledge from established models like YOLO and R-CNN.\n\n## Core Technology Stack\n\nThe technology selection prioritized scalability, reliability, operational efficiency, and seamless integration within the Google Cloud ecosystem:\n\n-   **Frontend Application:** Flutter (for cross-platform mobile deployment)\n-   **Backend & Real-Time Database:** Firebase Firestore (for dynamic metadata management)\n-   **Object Storage:** Google Cloud Storage (GCS) (for claimant images and large data assets)\n-   **Scalable Data Processing (ETL):** Google Dataflow\n-   **ML Model Training & Serving:** Google Vertex AI\n-   **Serverless Compute:** Google Cloud Functions (for event-driven automation)\n-   **Data Warehousing & Analytics:** Google BigQuery (for historical data, churn analysis, and large-scale batch processing)\n-   **System Monitoring & Observability:** Google Cloud Monitoring & Logging\n\n![Base Architecture](/images/projects/arch.png)\n\n## Key Technical Challenges and Strategic Solutions\n\nNavigating the complexities of an AI-driven platform required addressing several critical challenges:\n\n### 1. **Ensuring Real-Time Performance and Scalability:**\n\n-   **Challenge:** Managing high-volume image uploads and concurrent metadata updates while maintaining low-latency user interactions.\n-   **Solution:** A **bifurcated architectural approach** was adopted. Firestore handled real-time metadata and user-facing updates due to its low-latency capabilities. Simultaneously, GCS, Dataflow, and Vertex AI managed the computationally intensive backend processes (image storage, transformation, and model inference), allowing independent scaling based on specific load profiles.\n\n### 2. **Orchestrating Diverse GCP Services:**\n\n-   **Challenge:** Creating a cohesive and efficient workflow across multiple, specialized GCP services (Firestore, GCS, Dataflow, Vertex AI, BigQuery).\n-   **Solution:** An **event-driven architecture** was implemented. Firestore triggers invoked Cloud Functions, which acted as orchestrators, directing data through Dataflow for transformation and then to Vertex AI for inference. Results were cycled back to Firestore for end-user visibility, while BigQuery served as the central repository for batch analytics and historical data persistence.\n\n### 3. **Addressing Scarcity of Labeled Training Data:**\n\n-   **Challenge:** Insufficient labeled image data to effectively train or fine-tune sophisticated computer vision models from scratch.\n-   **Solution:** This was mitigated through a two-pronged strategy: **comprehensive data augmentation** techniques (programmatic generation of diverse image variants) significantly expanded the effective training set size. Concurrently, **transfer learning** from pre-trained models (YOLO, R-CNN) enabled the system to achieve high accuracy with a comparatively smaller custom dataset.\n\n### 4. **Optimizing Model Serving Latency:**\n\n-   **Challenge:** Minimizing inference latency for large object detection models to ensure a responsive real-time user experience.\n-   **Solution:** Models were deployed on **GPU-accelerated Vertex AI endpoints** configured with **auto-scaling** to dynamically adjust to inference demand. Further model optimization techniques, such as **quantization and pruning**, were explored and applied to reduce model size and computational footprint without significant degradation in predictive accuracy.\n\n## Demonstrated Impact & Anticipated Value\n\nThe MVP successfully demonstrated the transformative potential of AI in the auto insurance domain:\n\n-   **Accelerated Claim Processing:** Achieved an estimated **50% reduction** in average claim processing time, enhancing efficiency for both customers and adjudicators.\n-   **Foundation for Enhanced Fraud Detection:** The architecture is designed to support a projected **40% improvement** in fraud detection accuracy upon full implementation of the fraud module.\n-   **Improved Operational Efficiency:** Reduced manual review workload for claims agents by an estimated **60%**, freeing resources for complex cases and value-added tasks.\n-   **Optimized Model Performance:** Maintained an average model inference latency of **~0.8 seconds per image**, crucial for real-time applications.\n-   **Elevated Customer Satisfaction:** Forecasted a potential **+10 point increase** in Net Promoter Score (NPS) driven by faster resolutions and improved service transparency.\n\n## Strategic Roadmap and Future Enhancements\n\nThe platform is poised for continued evolution with several key enhancements planned:\n\n-   **Implement Google Cloud Pub/Sub:** Introduce Pub/Sub for enhanced asynchronous processing and robust decoupling between GCS events, Dataflow jobs, and Vertex AI pipelines, further increasing system resilience and scalability.\n-   **Expand BigQuery Utilization:** Leverage BigQuery for more sophisticated analytics, including advanced cohort analysis, comprehensive training data versioning, and establishing automated model retraining and drift detection pipelines.\n-   **Transition to Real-Time Churn Prediction:** Evolve the churn model to operate in real-time or near real-time, enabling more immediate and targeted customer retention interventions.\n-   **Diversification into New Insurance Verticals:** Strategically adapt and extend the core AI platform to address claim processing needs in other insurance lines, such as property, casualty, or health insurance.\n\n----",
   "tags": {
    "discipline": [
     "ML",
     "Design"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "churn-prediction",
   "position": "auto-insurance-startup",
   "order": 3,
   "featured": false,
   "title": "From expert rules to AI-driven churn prediction",
   "year": "2023–24",
   "description": "Churn management from day one at a company with no historical data: expert rules first, deliberately instrumented so they could be replaced by a model once the data existed.",
   "kpis": [
    {
     "value": "15%",
     "label": "projected churn reduction"
    },
    {
     "value": "10%",
     "label": "projected retention uplift"
    }
   ],
   "chips": {
    "stack": [
     "GCP",
     "BigQuery",
     "Firestore"
    ],
    "domain": [
     "Retention",
     "Insurance"
    ],
    "method": [
     "Rule-based design",
     "Phased ML adoption"
    ]
   },
   "body": "### Project Objective and Strategic Imperative\n\nFor an early-stage insurance startup operating without historical customer data, establishing an immediate and actionable churn management framework was paramount. The core objective was to implement a foundational **rule-based system, leveraging internal business expertise and industry best practices,** to proactively identify and mitigate early customer attrition. This pragmatic strategy enabled churn management from day one, supported initial business operations, and critically, facilitated the collection of proprietary customer data necessary for planned future AI-driven enhancements.\n\n---\n\n### 1. Initial Churn Indication: An Expert-Driven Rule-Based System\n\nIn the absence of data for machine learning, our initial churn identification relied on a system of rules derived from the collective expertise of our team. This allowed us to be proactive from launch.\n\n**Key Principles Guiding Rule Design:**\n\n-   **Focus on Early-Stage Behaviors:** Indicators were primarily based on customer actions (or inactions) within the initial months of their journey.\n-   **Leveraging Industry Knowledge:** Rules incorporated common patterns associated with churn in similar insurance or subscription products.\n-   **Prioritizing Actionable Signals:** The system was designed to flag customers for whom targeted interventions by our service teams could be most effective.\n\n**Categories of Early Churn Indicators Monitored:**\n\n1.  **Policy Renewal Intent & Payment Behavior**\n2.  **Application Engagement & Feature Usage**\n3.  **Customer Support Interaction Patterns**\n\n**Framework & Iteration:**\n\n-   The initial rules were applied to user activity within the first **3-6 months**.\n-   The system was designed for **periodic review and refinement** as anecdotal evidence and early data trends emerged, ensuring adaptability.\n\n---\n\n### 2. System Integration and Enabling Business Growth\n\nThe insights from this rule-based system were immediately operationalized:\n\n-   **Agent Dashboard Integration:** Churn risk indicators were integrated into agent dashboards, providing visibility into at-risk customer segments and enabling targeted outreach.\n-   **Facilitating Essential Data Collection:** A crucial outcome was the **systematic accrual of proprietary customer data**. Interactions monitored by these rules (e.g., payment patterns, app usage) formed the foundational dataset for future, more sophisticated predictive modeling.\n-   **Establishing an Operational Baseline:** This provided an initial framework for churn management and early benchmarks for customer retention.\n\n---\n\n### 3. Planned Evolution: Architecting for Future AI-Driven Insights\n\nWhile the rule-based system provided immediate value, it was architected as a foundational step. Concurrently, groundwork was laid for a **scalable, AI-driven churn prediction system,** including planning for data infrastructure (ETL, data warehousing in BigQuery) and ML modeling capabilities (leveraging Vertex AI). This strategic foresight ensures that as sufficient customer data accumulates, the company can seamlessly transition to more advanced predictive analytics, enhancing churn prediction accuracy and enabling more nuanced retention strategies without losing momentum.\n\n---",
   "tags": {
    "discipline": [
     "ML",
     "Data"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "claims-adjudication",
   "position": "quantiphi",
   "order": 1,
   "featured": true,
   "title": "AI-powered claims adjudication for a Fortune 100 insurer",
   "year": "2021–22",
   "description": "Replaced manual first-pass review at a Fortune 100 insurer with document AI and a predictive eligibility model, cutting adjudication from most of a working day to about fifteen minutes.",
   "kpis": [
    {
     "value": "15–24 hrs → ~15 min",
     "label": "claims adjudication time"
    },
    {
     "value": "10+",
     "label": "cross-functional team led"
    }
   ],
   "chips": {
    "stack": [
     "AWS Textract",
     "AWS SageMaker",
     "XGBoost"
    ],
    "domain": [
     "Insurance",
     "Claims"
    ],
    "method": [
     "Discovery",
     "SOP mapping",
     "User-centred design"
    ]
   },
   "body": "Engineered and delivered a scalable, AI-driven adjudication platform for a **Fortune 100 insurance provider**, achieving a landmark reduction in claims processing time from **15–24 hours to under 30 minutes**. This solution utilized **AWS Textract** for intelligent document digitization and **AWS SageMaker** for predictive modeling. Led a cross-functional team of 10+ professionals (data scientists, ML/data engineers), overseeing the project lifecycle from problem discovery through to deployment and delivery.\n\nThe platform was designed to **augment human adjudicators**, automating routine tasks, extracting key data from complex documents, and providing predictive insights on claim eligibility and potential payouts. This significantly reduced manual errors, improved processing consistency, and boosted adjudicator productivity.\n\n---\n\n## The Challenge: Modernizing Claims Adjudication\n\nTraditional insurance claims adjudication is often a manual, time-intensive process, leading to inefficiencies, higher operational costs, and impacts on customer satisfaction. Our objective was to develop an intelligent automation solution to:\n\n-   Streamline document intake and data extraction.\n-   Automate eligibility assessment based on policy criteria.\n-   Provide data-driven payout estimations.\n-   Equip adjudicators with an intuitive interface for faster, more consistent decision-making.\n\n---\n\n## Our Approach: Strategic Design and Phased Execution\n\nA structured approach ensured the solution directly addressed core business needs and user workflows:\n\n1.  **Deep Dive & Discovery:** Collaborated extensively with claims teams to understand existing processes, pain points, and opportunities for automation.\n2.  **User-Centric Design:** Mapped adjudicator SOPs and decision logic to ensure the AI solution complemented and enhanced their expertise.\n3.  **Data-Driven Foundation:** Audited historical claims data and policy guidelines to inform model development and define key predictive variables.\n4.  **Hybrid AI Architecture:** Opted for an ML-first architecture, reinforced with rule-based safeguards, to balance predictive power with compliance and risk management.\n\n---\n\n## Core Solution Capabilities\n\nThe platform integrated key AI-powered components:\n\n-   **Intelligent Document Processing:** Automated data extraction from diverse claim documents using AWS Textract.\n-   **Predictive Modeling (Eligibility & Payout):** Utilized custom ML models (built with AWS SageMaker) trained on historical data to predict claim eligibility and estimate appropriate payout ranges.\n-   **Intuitive Adjudication Interface:** A user-friendly UI presented extracted data and model predictions (with confidence scores) to adjudicators, streamlining their review and decision process.\n-   **Human-in-the-Loop Governance:** Ensured all AI-driven recommendations were reviewed by human adjudicators before finalization, maintaining accountability and trust.\n\n---\n\n## Transformative Outcomes\n\nThe AI-powered adjudication platform delivered significant business value:\n\n-   **Drastic Turnaround Time Reduction**: Claims processing time cut from 15–24 hours to less than **~30 minutes per claim**.\n-   **Enhanced Operational Efficiency**: Improved data standardization and accuracy, reducing manual errors and pre-check workloads.\n-   **Scalable Architecture**: Designed for future expansion to new insurance lines and geographies.\n-   **Improved Adjudicator Experience**: Higher confidence, reduced workload, and greater focus on complex cases for adjudicators.\n---",
   "tags": {
    "discipline": [
     "ML",
     "Design"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "customer-360-insurance",
   "position": "quantiphi",
   "order": 3,
   "featured": false,
   "title": "Customer-360 insurance product",
   "year": "2020",
   "description": "Designed a customer-360 product using machine learning for personalised experiences, cross-sell identification and lifetime value calculation, built to demonstrate capability to prospective clients.",
   "kpis": [
    {
     "value": "$200K+",
     "label": "average converted lead value"
    }
   ],
   "chips": {
    "stack": [
     "Machine learning",
     "CLTV modelling"
    ],
    "domain": [
     "Insurance",
     "Personalisation"
    ],
    "method": [
     "Cross-sell design",
     "Capability demonstration",
     "Pre-sales"
    ]
   },
   "body": "> Placeholder body. Replace with the segmentation logic, what the CLTV model was actually used for, and how it converted in pre-sales.",
   "tags": {
    "discipline": [
     "ML",
     "Data"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "fraud-detection",
   "position": "auto-insurance-startup",
   "order": 2,
   "featured": false,
   "title": "AI-powered fraud detection in auto insurance",
   "year": "2024",
   "description": "A multi-model fraud layer for auto claims — supervised scoring for known patterns, anomaly detection for novel ones, and image analysis for staged damage.",
   "kpis": [
    {
     "value": "40%",
     "label": "targeted reduction in fraudulent claims"
    }
   ],
   "chips": {
    "stack": [
     "GCP",
     "Vertex AI",
     "BigQuery",
     "Cloud Functions"
    ],
    "domain": [
     "Fraud",
     "Auto insurance"
    ],
    "method": [
     "Multi-model design",
     "Precision/recall trade-off"
    ]
   },
   "body": "Fraudulent claims pose a significant challenge in the auto insurance industry, leading to financial losses and diminished customer trust. As part of an AI-driven MVP for an auto insurance startup, we developed and implemented a robust fraud detection system capable of identifying high-risk claims in near real-time.\n\n**Strategic Approach & Core Architecture:**\n\n-   **Cloud-Native Design (GCP):** Leveraged Google Cloud Platform's serverless and scalable services (GCS for storage, Firestore for real-time metadata, Dataflow for ETL) to ensure efficient, resilient processing of claim data.\n-   **Integrated Workflow:** From claim submission via a mobile app, data (images, documents, metadata) flowed through an automated pipeline. This involved GCS for storage, Cloud Functions for triggering processes, Dataflow for data preparation, and Vertex AI for real-time fraud scoring.\n-   **Actionable Insights:** High-risk claims triggered immediate notifications to insurance agents via an internal dashboard, enabling prompt investigation and intervention.\n\n---\n\n## Intelligent Fraud Detection: A Multi-Model Strategy\n\nOur system employed a sophisticated, multi-layered approach to fraud detection, combining various machine learning techniques:\n\n-   **Predictive Modeling for Known Fraud Patterns:**\n    -   A primary supervised learning model (e.g., gradient boosting methods like XGBoost) was trained on historical claims data to identify claims exhibiting characteristics commonly associated with known fraudulent activities.\n    -   Key feature categories included claim amount irregularities, unusual claim frequencies, geographic risk factors, and prior claim history.\n-   **Anomaly Detection for Novel Fraud Schemes:**\n    -   Unsupervised learning techniques (e.g., autoencoders, one-class SVMs) were utilized to detect outliers and novel or unusual claim patterns that deviate significantly from normal behavior, helping to uncover emerging fraud tactics.\n-   **Advanced Image Analysis for Visual Inconsistencies:**\n    -   For claims involving vehicle damage, deep learning models (e.g., Convolutional Neural Networks like Faster R-CNN) were fine-tuned to analyze submitted images. These models identified inconsistencies in damage patterns, helping to flag potentially staged accidents or manipulated visual evidence.\n\n**Model Training & Performance Focus:**\n\n-   Training data, comprising historical claims and image data, was aggregated and prepared using BigQuery.\n-   Model evaluation prioritized a balance between minimizing false positives (incorrectly flagging legitimate claims) and false negatives (missing actual fraud), focusing on metrics like precision, recall, and F1-score.\n\n---\n\n## Operational Excellence: Monitoring, Retraining & Impact\n\n-   **Continuous System Monitoring:** Implemented robust monitoring (using Google Cloud Monitoring & Logging) for system latency, error rates, and model performance drift to ensure sustained effectiveness.\n-   **Adaptive Learning & Retraining:** A regular retraining schedule (e.g., monthly) incorporated new claim data and adjudicator feedback, allowing models to adapt to evolving fraud patterns and improve accuracy over time via Vertex AI and Dataflow.\n\n**Significant Business Impact:**\n\n-   Achieved a **30% reduction** in fraudulent payouts through early detection.\n-   Decreased the need for manual claim reviews by **40%**, freeing up agent resources.\n-   Led to **20% faster overall claim resolution** times by efficiently filtering suspicious claims.\n\n---\n\n## Key Learnings & Approach\n\n-   Successfully addressed challenges like **data imbalance** in fraud datasets using appropriate mitigation techniques (e.g., over-sampling).\n-   Ensured **model interpretability** using methods like SHAP to provide transparency and build stakeholder trust in AI-driven decisions.\n-   Managed **integration complexity** by closely collaborating across business and engineering teams to seamlessly embed the fraud detection pipeline into core operational workflows.\n\n---",
   "tags": {
    "discipline": [
     "ML",
     "Data"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "market-basket-analysis",
   "position": "wns-global-services",
   "order": 3,
   "featured": false,
   "title": "Market basket optimization for a US retailer",
   "year": "2016",
   "description": "Association rule mining on six months of POS data for a North American big-box retailer, turned into shelf placement and bundling recommendations.",
   "kpis": [
    {
     "value": "10%",
     "label": "increase in average basket size"
    },
    {
     "value": "10-15%",
     "label": "lift in category sales"
    }
   ],
   "chips": {
    "stack": [
     "Apriori",
     "SQL",
     "R"
    ],
    "domain": [
     "Retail",
     "FMCG"
    ],
    "method": [
     "Association rule mining",
     "Pilot design",
     "Stakeholder handover"
    ]
   },
   "body": "Led a strategic market basket analysis for a prominent North American big-box retailer, focusing on uncovering product associations within the feminine care category. The initiative aimed to increase average basket size and optimize merchandising and promotional strategies. This data-driven approach yielded a **10% increase in average basket size** and a **10–15% lift in category sales**.\n\n### The Opportunity: Understanding Customer Purchase Patterns\n\nThe client sought deeper insights into which feminine care products were frequently purchased together. This understanding was crucial for enhancing in-store shelf placement, developing effective bundled promotions, and refining targeted marketing campaigns. The analysis utilized six months of transaction-level data from stores across North America, concentrating on specific partner brands within the category.\n\n---\n\n## Strategic Approach & Analytical Methodology\n\nOur approach involved a systematic analysis of transaction data to identify actionable product relationships:\n\n1.  **Data Aggregation & Preparation:** Processed extensive point-of-sale (POS) data, isolating transactions containing relevant feminine care products and structuring them to represent individual customer baskets.\n2.  **Association Rule Mining:**\n    -   Applied established market basket analysis techniques (e.g., the **Apriori algorithm**) to identify frequent co-occurring itemsets from the prepared transactional data.\n    -   Generated and evaluated association rules based on key statistical measures (Support, Confidence, and Lift) to pinpoint strong, commercially relevant product pairings.\n3.  **Actionable Insight Generation:**\n    -   Translated statistical findings into practical recommendations, such as optimizing in-store shelf layouts to encourage co-purchases of highly associated products.\n    -   Advised on creating bundled promotional offers for identified product pairs and implementing cross-selling prompts in digital channels.\n4.  **Stakeholder Engagement & Knowledge Transfer:** Delivered a comprehensive report detailing the methodology, key findings, and prioritized recommendations, supported by visualizations. Collaborated closely with the client’s category management and analytics teams to facilitate understanding and guide implementation.\n\n---\n\n## Significant Business Outcomes & Strategic Value\n\nThe market basket analysis initiative delivered substantial, measurable results:\n\n-   **Increased Sales & Basket Size:** Achieved a **10% increase in average basket size** in pilot stores and a **10–15% uplift in overall category sales** within the subsequent quarter.\n-   **Enhanced Merchandising Strategies:** Provided data-driven rationale for optimizing product placement and promotional activities.\n-   **Scalable Insights:** The success of this pilot led to the adoption of similar analytical approaches across other key retail categories (e.g., baby care, personal hygiene).\n-   **Improved Customer Experience:** More intuitive product layouts contributed to a better shopping experience.\n-   **Strengthened Client Partnership:** Deepened the collaborative relationship, paving the way for further advanced analytics engagements.\n\nThis project effectively demonstrated how applying foundational data mining techniques like market basket analysis, when aligned with clear business objectives, can drive significant commercial impact for large-scale retail operations.\n\n---",
   "tags": {
    "discipline": [
     "Data",
     "BI"
    ],
    "industry": [
     "FMCG"
    ]
   }
  },
  {
   "slug": "risk-operations-tool",
   "position": "qatar-insurance-group",
   "order": 1,
   "featured": true,
   "title": "Risk operations tool",
   "year": "2026",
   "description": "A multi-department tool that scores real-world events — conflict, catastrophe, disruption — against live policy exposure, and recommends action for the teams that have to respond.",
   "kpis": [
    {
     "value": "5",
     "label": "teams served from one signal"
    },
    {
     "value": "Live",
     "label": "policy exposure scored against world events"
    }
   ],
   "chips": {
    "stack": [
     "GCP",
     "BigQuery"
    ],
    "domain": [
     "Insurance",
     "Risk operations",
     "Reinsurance"
    ],
    "method": [
     "Cross-department discovery",
     "Alert design",
     "Exposure modelling"
    ]
   },
   "body": "Risk, claims, underwriting, investments and reinsurance were all reacting to the same world events on different timelines, from different sources, with no shared view of which policies were actually exposed.\n\nThe tool takes real-world events and scores them against active exposure, then routes a recommended action to whichever teams the exposure touches. The design problem was not detection — it was thresholds. Alert on everything and five departments stop reading. Alert on too little and the tool is decorative the one time it matters.\n\n> Placeholder body. Replace with the discovery detail, the threshold argument, and what the teams did with it.",
   "tags": {
    "discipline": [
     "AI Strategy",
     "Design",
     "Ops"
    ],
    "industry": [
     "Insurance"
    ]
   }
  },
  {
   "slug": "sales-driver-analysis",
   "position": "wns-global-services",
   "order": 2,
   "featured": false,
   "title": "Sales driver analysis for a Fortune 100 FMCG brand",
   "year": "2017",
   "description": "Quantified what actually moves volume for a Fortune 100 FMCG brand — media, price, distribution, promotion — modelled separately for each segment and retailer.",
   "kpis": [
    {
     "value": "$100K+",
     "label": "in additional contracts secured"
    },
    {
     "value": "3",
     "label": "segments across 3 major retailers"
    }
   ],
   "chips": {
    "stack": [
     "R",
     "Nielsen data",
     "Log-log regression"
    ],
    "domain": [
     "FMCG",
     "Marketing mix"
    ],
    "method": [
     "Adstock modelling",
     "Statistical validation",
     "Cross-sectional analysis"
    ]
   },
   "body": "Led a high-impact sales driver analysis for a **leading US-based feminine care brand (Fortune 100 CPG)**, providing deep insights into the levers affecting volume sales across major North American big-box retailers (including Walmart, Target, Costco). The comprehensive analysis spanned core product segments (Pads, Tampons, Liners) and quantified the impact of marketing, pricing, distribution, and promotional activities.\n\nThis project equipped the client with a statistically rigorous framework to optimize commercial strategies, enhance internal alignment, and ultimately led to an **expanded scope of work, securing additional contracts valued at over $100K**.\n\n---\n\n## The Challenge: Decoding In-Store Sales Performance\n\nThe client sought to deconstruct the drivers of their feminine care portfolio's in-store performance. Lacking a unified, data-backed understanding of how different commercial levers influenced sales across various product segments and retail channels, they needed a robust analytical framework to:\n\n-   Identify key drivers of volume sales at a granular level.\n-   Differentiate these drivers across major retail partners.\n-   Quantify the contribution of media, price, distribution, and promotions.\n-   Guide strategic resource allocation for marketing and sales efforts.\n\n---\n\n## Strategic Analytical Approach\n\nOur approach focused on analyzing **volume sales** (to isolate true consumer demand from pricing effects) using Nielsen sales data, encompassing:\n\n-   **Core Data Inputs:** Systematically structured data across distribution metrics, pricing variables, promotional activity, and media investment (including adstock modeling to capture advertising carryover).\n-   **Rigorous Modeling by Segment & Retailer:** Developed statistical models (e.g., log-log linear regression chosen for its interpretability and fit) for each product segment within each key retailer. This allowed for nuanced insights tailored to specific market conditions.\n-   **Statistical Validation:** Ensured model robustness through standard diagnostic checks and validation procedures.\n-   **Cross-Sectional Analysis:** Conducted aggregate analyses across all retailers (by segment) and across all segments (by retailer) to identify both universal and channel-specific growth levers.\n\n---\n\n## Key Insights & Deliverables\n\nThe analysis provided the client with clear, actionable intelligence:\n\n-   **Granular Understanding of Sales Drivers:** Quantified the impact of distribution, pricing, media spend, and promotions on volume sales, differentiated by product segment and retail partner.\n-   **Optimized Media Allocation Insights:** Adstock analysis provided a clearer picture of advertising effectiveness and informed more efficient media budget planning.\n-   **Actionable Strategic Recommendations:** Delivered prioritized recommendations for optimizing commercial levers to drive growth.\n-   **Scalable Analytical Framework:** Provided a reusable modeling template for future analyses across other product categories or regions.\n\n---\n\n## Business Impact & Outcomes\n\n-   **Enhanced Strategic Decision-Making:** Enabled the client's sales and marketing teams to make more informed, data-driven decisions regarding resource allocation and commercial strategy.\n-   **Improved Internal Alignment:** Fostered a common understanding of sales drivers across different functional teams.\n-   **Strengthened Client Partnership & Growth:** The demonstrated analytical rigor and actionable insights led to a significant expansion of the engagement, securing **over $100K in additional project value**.\n-   **Foundation for Ongoing Analytics:** Elevated the client's internal capability for data-driven planning and laid the groundwork for a long-term analytical partnership.\n---",
   "tags": {
    "discipline": [
     "Data"
    ],
    "industry": [
     "FMCG"
    ]
   }
  },
  {
   "slug": "semiconductor-defect-detection",
   "position": "quantiphi",
   "order": 2,
   "featured": false,
   "title": "Real-time defect detection in semiconductors with GCP MLOps",
   "year": "2021",
   "description": "Built the model training flow of an image analytics backbone for a semiconductor manufacturer, so defect detection models could be retrained and deployed without hand-holding.",
   "kpis": [
    {
     "value": "~1 sec",
     "label": "real-time prediction latency"
    },
    {
     "value": "$2.5M",
     "label": "client account expansion"
    }
   ],
   "chips": {
    "stack": [
     "GCP",
     "Vertex AI",
     "Dataflow",
     "TFX",
     "Cloud Composer",
     "TensorBoard"
    ],
    "domain": [
     "Semiconductor",
     "MLOps"
    ],
    "method": [
     "Pipeline design",
     "Experiment tracking"
    ]
   },
   "body": "Engaged with a leading **semiconductor client** to architect and implement a critical **\"Model Training Flow\"** section of their broader Image Analytics Backbone project. The objective was to build a robust, semi-automated MLOps pipeline on Google Cloud Platform (GCP), specifically designed to handle the training, monitoring, and deployment of image analysis models. This initiative aimed to significantly accelerate analysis cycles, improve the speed and accuracy of defect detection in their manufacturing processes, contributing to **substantial cost savings** through early issue identification and optimized resource utilization.\n\n---\n![Silicon wafer under inspection](/images/projects/wafer.jpeg)\n\n## Business Need & MLOps Vision\n\nThe **semiconductor client** required a sophisticated MLOps pipeline to empower their data science teams. The goal was a semi-automated system that could efficiently manage:\n\n-   **Scalable Data Pipelining and Preprocessing** for large image datasets.\n-   **Distributed ML Training and Retraining** utilizing GCP's modern AI infrastructure (transitioning to the newly introduced Vertex AI from Unified AI Platform).\n-   **Comprehensive ML Pipeline Monitoring** with capabilities for tracking metrics, distributions, and model behavior (e.g., via TensorBoard).\n-   **Streamlined Model Exporting, Deployment, and Inference** supporting both online (with **~1-second prediction latency for real-time defect detection**) and batch modes.\n\nThe solution needed to be developed using industry-best MLOps practices, with options for orchestration via **TensorFlow-Estimator with Cloud Composer** and **TensorFlow-Extended (TFX) with Vertex AI Pipelines (formerly Managed Pipelines)**, including support for experiment tracking.\n\n---\n\n## Core MLOps Pipeline Architecture & Deliverables\n\nOur team focused on delivering the \"Model Training Flow,\" encompassing the following key stages and deliverables on GCP:\n\n1.  **Data Pipeline and Preprocessing:**\n    -   Designed robust data ingestion and preprocessing pipelines using **Google Dataflow** and **Cloud Storage (GCS)** to handle large image datasets.\n2.  **Model Training Orchestration:**\n    -   Enabled distributed training on **Vertex AI** (incorporating AI Platform Training, AI Notebooks, and exploring AutoML).\n    -   Facilitated hyperparameter optimization and configurable training runs.\n3.  **Model Pipeline Monitoring & Development:**\n    -   Integrated **TensorBoard** within Vertex AI for comprehensive monitoring of training runs.\n4.  **Model Management & Deployment:**\n    -   **Model Exporting & Deployment (Production):** Implemented strategies on Vertex AI for both online (targeting **~1-second real-time defect detection latency**) and batch modes.\n    -   **Model Retraining & Validation:** Established processes for model retraining, validation, and versioning.\n5.  **Orchestration & Operationalization:**\n    -   Delivered **Managed Pipelines** leveraging TF-Estimator with Cloud Composer and TFX with Vertex AI Pipelines for robust, end-to-end MLOps orchestration.\n    -   Ensured end-to-end testing, comprehensive documentation, and a formal handover.\n\n---\n\n## Key Success Criteria & Technical Performance\n\nThe project adhered to specific performance and operational criteria crucial for the **semiconductor client**:\n\n-   **Data Handling:** Processing large image files (JPEGs, PNGs for training; Base64 for real-time prediction).\n-   **Training Cadence & Scale:** Accommodating weekly ingestion of training data and extensive training runs.\n-   **Model Versioning & Lifecycle:** Implementing robust model archiving and performance-based promotion.\n-   **Deployment & Inference Performance:** Critical success factor was achieving **~1-second latency for real-time defect detection**, alongside support for batch prediction, across numerous internal tools and sites.\n\n---\n\n## Business Outcome & Strategic Impact\n\nThe successful delivery of this MLOps Model Training Flow provided the **semiconductor client** with:\n\n-   **Accelerated Defect Detection & Significant Cost Savings:** A semi-automated pipeline enabling faster, more accurate analysis over millions of images daily, directly contributing to quicker identification of manufacturing defects and leading to substantial operational cost savings.\n-   **Enhanced Data Science Productivity:** A standardized and efficient MLOps framework, reducing manual effort in managing image analysis models.\n-   **Scalable and Future-Proof AI Infrastructure:** Leveraging GCP's latest Vertex AI capabilities for current and future image analytics use cases.\n-   **Improved Model Governance & High-Performance Inference:** Systematic versioning, monitoring, and deployment capabilities, including meeting the stringent **~1-second latency target for real-time defect detection**.\n-   **Substantial Client Account Expansion:** The demonstrated success and strategic value of this engagement directly led to a **significant expansion of the client account, resulting in over $2.5 million in subsequent project value and services.**\n\nThis ~22-week project successfully established a critical component of the **semiconductor client's** Image Analytics Backbone, empowering them to harness advanced AI for their critical analysis processes more effectively and economically, and solidifying a strong, ongoing partnership.\n\n\n---",
   "tags": {
    "discipline": [
     "ML",
     "Ops"
    ],
    "industry": [
     "Semiconductor"
    ]
   }
  },
  {
   "slug": "sku-optimization",
   "position": "wns-global-services",
   "order": 1,
   "featured": true,
   "title": "SKU optimization for a leading US FMCG brand",
   "year": "2018",
   "description": "Shelf space rationalisation for a Fortune 100 FMCG brand's feminine care division across US big-box retailers, using three years of weekly Nielsen data.",
   "kpis": [
    {
     "value": "$5M+",
     "label": "annualised cost savings"
    },
    {
     "value": "3 yrs",
     "label": "of weekly Nielsen data analysed"
    }
   ],
   "chips": {
    "stack": [
     "Nielsen data",
     "SQL",
     "Excel"
    ],
    "domain": [
     "FMCG",
     "Retail",
     "Merchandising"
    ],
    "method": [
     "SKU rationalisation",
     "Custom Sales/ACV metric",
     "Decision frameworks"
    ]
   },
   "body": "This high-impact initiative focused on optimizing shelf space for a leading US FMCG brand's **feminine care division** across major big-box retailers. By identifying underperforming SKUs and providing data-driven rationalization strategies, the project delivered over **$10 million in annualized cost savings** and boosted prospective sales through an enhanced product assortment.\n\n---\n\n### The Imperative of SKU Optimization in Modern Retail\n\nIn the competitive landscape of Fast-Moving Consumer Goods (FMCG) and retail, maintaining an optimal product assortment is critical. Over time, product lines naturally expand due to innovation, line extensions, and changing consumer trends. Without periodic rationalization, this can lead to:\n\n-   **Shelf Clutter & Shopper Confusion:** Overwhelming consumers with too many choices, potentially leading to decision paralysis and lost sales.\n-   **Operational Inefficiencies:** Increased inventory holding costs, supply chain complexity, and higher handling expenses for a multitude of SKUs.\n-   **Diluted Brand Focus:** Spreading marketing and promotional resources too thinly across a vast portfolio.\n-   **Reduced Profitability:** Underperforming SKUs occupying valuable shelf space that could be allocated to higher-velocity, higher-margin items.\n\nIndustry best practices involve regular, data-driven SKU optimization exercises. This typically includes analyzing sales velocity, profitability, distribution efficiency, and strategic importance of each item to ensure the assortment meets consumer demand effectively while maximizing retailer and brand profitability. This project addressed precisely these challenges.\n\n---\n\n### The Business Challenge: Enhancing Our Client's Shelf Profitability\n\nOur client, a major consumer goods company, recognized the need to address growing assortment complexity within their key feminine care segments (Pads, Liners, Tampons). They aimed to:\n\n-   Gain a clear, data-backed understanding of individual SKU performance across top retail partners.\n-   Systematically identify and rationalize low-performing or redundant SKUs.\n-   Implement an effective delisting strategy to improve shelf space productivity and overall category profitability.\n\n---\n\n### Our Data-Driven Approach & Solution\n\nWe conducted a rigorous analysis of **3 years of weekly Nielsen retail sales data**, focusing on key performance indicators like sales volume, distribution strength (%ACV, TDP), and promotional impact. A crucial element was a **custom `Sales/ACV` metric** to assess SKU sales efficiency independent of its distribution footprint.\n\nBased on this multi-faceted analysis, SKUs were tiered by performance. A clear decision framework guided recommendations for delisting individual underperformers or, in some cases, entire sub-brands, while strategically protecting newly launched products (within 12 months).\n\nActionable, brand-specific roadmaps for delisting and shelf space reallocation were delivered and adopted by the client, leading to an **engagement expansion to three additional major retailers.**\n\n---\n\n### Transformative Business Impact\n\n-   **Annualized Cost Savings:** Over **$10 million** through optimized inventory and supply chain efficiencies.\n-   **Sales Optimization:** Strategic focus on higher ROI SKUs, enhancing overall category performance.\n-   **Strengthened Retailer Partnerships:** Enabled by data-driven, collaborative shelf planning.\n\nThis project provided a scalable framework for SKU rationalization, transforming shelf clutter into clarity and delivering significant financial and strategic wins.\n\n---",
   "tags": {
    "discipline": [
     "Data",
     "BI"
    ],
    "industry": [
     "FMCG"
    ]
   }
  },
  {
   "slug": "underwriting-modernization",
   "position": "qatar-insurance-group",
   "order": 3,
   "featured": false,
   "title": "Commercial underwriting modernization",
   "year": "2026",
   "description": "Ran the commercial insurance underwriting modernization initiative end to end across three cross-functional teams, owning business analysis, stakeholder facilitation and delivery coordination.",
   "kpis": [
    {
     "value": "3",
     "label": "cross-functional teams coordinated"
    },
    {
     "value": "End to end",
     "label": "business analysis through delivery"
    }
   ],
   "chips": {
    "domain": [
     "Insurance",
     "Commercial underwriting"
    ],
    "method": [
     "Business analysis",
     "Stakeholder facilitation",
     "Agile delivery"
    ]
   },
   "body": "> Placeholder body. Replace with the before-and-after of the underwriting workflow, where the three teams disagreed, and how that got resolved.",
   "tags": {
    "discipline": [
     "Ops",
     "Design"
    ],
    "industry": [
     "Insurance"
    ]
   }
  }
 ],
 "posts": [
  {
   "slug": "craft-hostel-north-goa",
   "title": "Finding your tribe: the charm of Craft Hostel, North Goa",
   "dateLabel": "3 April 2025",
   "sortKey": "2025-04-03",
   "readTime": "10 min read",
   "tags": [
    "Travel",
    "Goa",
    "Hostels",
    "Experiences"
   ],
   "description": "A stay at Craft Hostel in North Goa, and why the places that stay with you are usually about the people rather than the rooms.",
   "body": "North Goa. The name itself conjures images of sun-drenched beaches, vibrant parties, and a certain infectious energy. But beyond the usual tourist trails, there's a deeper charm, a sense of belonging waiting to be discovered. And sometimes, you find it in the most unexpected, yet perfect, places – like a quaint hostel that instantly feels like home. For me, that place was **Craft Hostel**.\n\nNestled in North Goa, Craft Hostel isn't just a place to crash; it's an experience. From the moment you step in, you're enveloped by a vibe that's hard to put into words – let's just call it *immaculate*. It’s welcoming, creative, and utterly genuine.\n\n![hostel](/images/blog/hostel.JPEG)\n\n## An Oasis of Green and Calm\n\nOne of the first things that strikes you is the open garden space. It's a little sanctuary dotted with comfy swings, natural rock features, and lush greenery. It's the kind of place where you can easily lose track of time, swinging gently with a book, chatting with new friends, or simply soaking in the Goan sunshine. It fosters connection, encourages relaxation, and sets the tone for the entire hostel.\n\n## The Heart of the Hostel: More Than Just a Caretaker\n\nWhat truly elevates Craft Hostel is the people. The caretaker isn't just staff; he's practically a local guru and your go-to guy for *everything*. Need the scoop on the coolest, lesser-known party spots? He knows. Craving authentic Goan food at a hidden gem? He's got recommendations. Need help arranging transport or figuring out logistics? Consider it done. His willingness to source anything and everything, coupled with genuine warmth, makes you feel incredibly looked after and truly part of the place.\n\n## Art, Soul, and Goa's Bygone Eras\n\nStep inside, and the hostel walls whisper stories. Dotted throughout are umpteen photographs, each resonating with the artistic nature of the founders. Particularly striking are the beautiful monochrome pictures capturing glimpses of Goa from the past. It feels less like a hostel and more like a curated gallery, adding a layer of depth and history to your stay. It’s clear that art and soul are woven into the very fabric of Craft Hostel.\n\n![photo](/images/blog/photowall.JPEG)\n\n## A Secret Trek to a Coastal Panorama\n\nBut the magic doesn't stop within the hostel grounds. Ask about the \"little trek,\" and you're in for a treat. Starting right from behind the hostel, a path winds its way up a small hill.\n\nThe journey itself is part of the adventure. The road gets a bit steep at times, you might hop over small, gentle water bodies, and navigate parts of the hillside. It’s not a strenuous hike, but it requires a little effort.\n\nAnd the reward? Absolutely breathtaking.\n\n![Coastline](/images/blog/northcoast.JPEG)\n\nAt the summit, you're greeted with a stunning, relatively untouched view overlooking the expansive northern coastline of Goa. The sea stretches out before you, the breeze is fresh, and the sense of accomplishment mixed with the sheer beauty is pure bliss. It's a perspective of Goa many miss, and it's literally right on Craft Hostel's doorstep.\n\n## More Than Just a Bed\n\nCraft Hostel encapsulates the best of North Goa's spirit – community, creativity, adventure, and genuine connection. It's a place where you arrive as a traveler and leave feeling like part of a tribe. If you're seeking more than just accommodation, if you're looking for a place with character, charm, and a touch of hidden magic, Craft Hostel is waiting.\n\n---\n\nCheck them out here 📸: [Craft Hostel](https://www.instagram.com/crafthostels/?hl=en)"
  },
  {
   "slug": "exploration-vs-exploitation-k-bandit",
   "title": "Mastering exploration vs. exploitation: an interactive K-bandit simulator",
   "dateLabel": "2 April 2025",
   "sortKey": "2025-04-02",
   "readTime": "10 min read",
   "tags": [
    "Reinforcement Learning",
    "AI",
    "ML"
   ],
   "description": "An interactive K-armed bandit simulator, and what it shows about deciding under uncertainty when you cannot afford to only explore or only exploit.",
   "body": "The **K-armed bandit problem** stands as a cornerstone in reinforcement learning and decision science. It encapsulates a scenario where an agent is confronted with _K_ distinct options—metaphorically, _K_ slot machines or \"bandits\"—each possessing an unknown probability distribution for its rewards. With each \"pull\" of an arm, a reward is received. The overarching objective is to devise a strategy that maximizes the total cumulative reward over a sequence of pulls.\n\nThis deceptively simple paradigm exposes a fundamental dilemma in intelligent decision-making:\n**Should one explore less familiar options that might yield superior long-term rewards, or exploit the currently best-known option for immediate gains?**\n\nThis interactive simulator, developed using HTML, CSS, and JavaScript, is designed to bring these concepts to life, allowing users to configure, run, and analyze K-bandit scenarios directly in their browser.\n\n![photo](/images/blog/K-bandit-screenshot.png)\n\n## The Significance of the K-Bandit Problem\n\nThe K-bandit problem is more than an academic exercise; it models numerous **real-world challenges** where sequential decisions must be made under uncertainty. Applications include:\n\n-   **Digital Marketing:** Optimizing which advertisement or content variation to display to maximize user engagement (e.g., click-through rates).\n-   **Clinical Trials:** Strategically selecting medical treatments to quickly identify the most effective option while minimizing patient exposure to less effective ones.\n-   **Resource Allocation:** Distributing limited resources across competing projects or initiatives with uncertain returns on investment.\n-   **Dynamic A/B/n Testing:** Continuously evaluating and adapting to new product features or website designs.\n\nIn these domains, learning and acting are intrinsically linked, and early choices profoundly impact future outcomes. The K-bandit framework provides a principled approach to designing intelligent systems that can **learn adaptively** without **prematurely committing** to suboptimal strategies or **excessively exploring** known inferior options.\n\n## Exploring with the K-Bandit Simulator\n\nThis interactive tool provides a hands-on environment to delve into the mechanics of the K-armed bandit problem. As depicted in the interface, users can:\n\n1.  **Configure Simulation Settings:**\n    *   Define the **Number of Bandits (K)** to be simulated.\n    *   Set the **Reward Standard Deviation (SD)** to control the stochasticity of rewards.\n    *   Select from various **Algorithms** for action selection, including:\n        *   **ε-Greedy:** Primarily exploits the best-known arm but explores randomly with probability ε. (The screenshot shows ε-Greedy with an Epsilon of 0.1).\n        *   **UCB (Upper Confidence Bound):** Balances estimated value with an uncertainty bonus to encourage exploration of less-pulled arms.\n        *   **Thompson Sampling (Gradient Bandit):** A Bayesian approach that samples parameters from posterior distributions to guide action selection. *(Adjust list based on actual implemented algorithms)*\n    *   Adjust algorithm-specific parameters, like **Epsilon (ε)** for the ε-Greedy strategy.\n\n2.  **Initialize and Run Simulations:**\n    *   **Initialize Bandits:** Set up the arms with their (initially unknown to the agent) true reward characteristics.\n    *   **Pull Arms Manually:** Step through the decision-making process one pull at a time for detailed observation.\n    *   **Auto-Run:** Execute a specified number of pulls (e.g., 100 pulls, as shown in the \"Total Pulls\" in the Bandit Selection Frequency chart) to observe longer-term behavior.\n    *   **Reset Simulation:** Clear current results and start a new experiment.\n\n3.  **Monitor and Analyze Performance:**\n    *   **Individual Bandit Statistics:** For each arm (Bandit 1 through Bandit 5 in the example), track the number of `Pulls`, `Avg Reward` received, and the agent's current `Est. Value`.\n    *   **Overall Simulation Results:**\n        *   `Total Reward`: The cumulative sum of rewards obtained.\n        *   `Avg Reward`: The average reward per pull.\n        *   `Optimal %`: The percentage of times the objectively best arm was pulled.\n        *   `Regret`: A measure of how much potential reward was lost by not always pulling the optimal arm.\n    *   **Action Log:** A detailed, time-stamped record of each pull, the arm chosen, the reward received, and the updated average reward for that arm (e.g., `[21:45:01] Pull 4: R= -0.358 (Avg: 0.839)`).\n    *   **Visualizations:**\n        *   **Average Reward Over Time:** A line graph illustrating how the agent's average reward evolves with each pull, providing insight into learning progress.\n        *   **Bandit Selection Frequency:** A bar chart showing how many times each bandit arm was pulled, highlighting the exploration/exploitation balance (the screenshot shows Bandit 4 being identified as the winning bandit with 67 pulls).\n\nThe simulator also implicitly supports observing average performance and regret across multiple runs by manually resetting and re-running, crucial for comparing strategies under stochastic conditions.\n\n## Educational Value and Insights\n\nBeyond understanding the algorithms, direct interaction with this simulator cultivates a deeper intuition for:\n\n-   The **exploration-exploitation trade-off**: Visibly witness how different strategies navigate this fundamental challenge.\n-   The **impact of early decisions**: Observe how initial exploratory pulls can significantly influence the agent's learning trajectory and eventual convergence.\n-   **Strategy robustness**: See how some algorithms recover more effectively from misleading early rewards than others.\n-   The **role of randomness and variance**: Appreciate that even optimal strategies can exhibit short-term underperformance due to stochasticity.\n\nThis hands-on approach transforms abstract theoretical concepts into **tangible, observable phenomena**, enabling users to build a more intuitive and practical understanding of decision-making under uncertainty.\n\n## Future Enhancements\n\nThe development of this simulator is an ongoing endeavor. Potential future enhancements include:\n\n-   **Contextual Bandits:** Incorporating side information (context) that influences arm rewards.\n-   **Non-Stationary Bandits:** Simulating environments where arm reward distributions change over time.\n-   **Advanced Algorithms:** Implementing a wider array of sophisticated bandit algorithms (e.g., Bayesian UCB, Gradient Bandit variations).\n-   **Hyperparameter Tuning Visualization:** Tools to explore the impact of varying algorithm parameters like ε or UCB's c.\n-   **Exportable Data/Logs:** Allowing users to save simulation results for offline analysis.\n\nThis K-Bandit Simulator aims to be a valuable educational resource for students, researchers, and practitioners in AI, machine learning, and data science.\n\n> A bandit problem teaches one crucial lesson: every decision is a wager against uncertainty, but the most effective agents are those that continually refine their knowledge, even as they play the game.\n\n---\n\n#### Try the simulator below\n[Simulator](https://rl-simulator.onrender.com/)"
  },
  {
   "slug": "framing-the-everyday",
   "title": "Photography: framing the everyday",
   "dateLabel": "April 2025",
   "sortKey": "2025-04-01",
   "readTime": "3 min read",
   "tags": [
    "Photography",
    "Street"
   ],
   "description": "Notes on street photography: finding the subject first, then deciding what part of the moment you are actually trying to keep.",
   "body": "For street photography, the goal is to look for **subjects first**.  \nThe street offers a mix of motion and stillness - and both can be equally compelling.  \nIt could be a moving cyclist, a stationary shopkeeper, or just the way shadows fall on a wall.\n\n---\n\n![Random Guy](/images/blog/vegseller.jpg)\n---\n### Framing a Stationary Subject\n\nFraming comes next.  \nWhat you see with your eyes and what your camera captures - those are different things.  \nYou’ve got to **lock in to what makes sense to *you***. You’re not in the business of pleasing someone else.  \n\nSay you spot a vegetable seller.  \nThat’s your subject. But what part of that moment are you trying to hold on to?\n\n- The act of selling?  \n- The seller’s expression?  \n- The vibrant display of vegetables?\n\nThere’s no right answer.  \nOnce your main subject is clear, explore the secondary elements. Maybe it's the edge of the cart, the signage behind, or a customer mid-bargain.\n\n---\n\n### What Are You Trying to Say?\n\nNow comes intention.  \nAsk yourself - *What do I want this image to convey?*  \nWhat should the viewer feel when they see it?\n\n- Stillness? Movement?  \n- Color and energy?  \n- Nostalgia? The beauty of routine?\n\nThe photograph can be loud or quiet, raw or composed - but it should reflect **what you felt** in that moment.\n\n---\n\n### The Everyday Is Enough\n\nYou don’t always need spectacle.  \nOften, it’s the mundane that speaks the loudest:  \nA tired vendor at the end of the day.  \nA child watching traffic go by.  \nTwo pigeons fighting over crumbs.\n\nThese frames don’t shout. But they stay.\n\n---\n\nPhotography isn't just about capturing what you see - it’s about making **the everyday matter**."
  }
 ],
 "photos": [
  {
   "span": 4,
   "alt": "Vegetable seller, morning market",
   "caption": "The subject found first, the frame decided after.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 35mm f/2",
   "focal": "35 mm",
   "aperture": "f/2.8",
   "shutter": "1/250 s",
   "iso": "400",
   "location": "Kolkata, India",
   "date": "Feb 2024"
  },
  {
   "span": 2,
   "alt": "Doorway, late light",
   "caption": "Waiting for someone to walk into the rectangle.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 23mm f/1.4",
   "focal": "23 mm",
   "aperture": "f/4",
   "shutter": "1/500 s",
   "iso": "200",
   "location": "Kolkata, India",
   "date": "Feb 2024"
  },
  {
   "span": 2,
   "alt": "Photo wall, Craft Hostel",
   "caption": "Monochrome Goa, hung by the founders.",
   "camera": "iPhone 14 Pro",
   "lens": "Main",
   "focal": "24 mm",
   "aperture": "f/1.8",
   "shutter": "1/120 s",
   "iso": "320",
   "location": "North Goa, India",
   "date": "Apr 2025"
  },
  {
   "span": 2,
   "alt": "Swing in the garden",
   "caption": "The kind of place where you lose an afternoon.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 35mm f/2",
   "focal": "35 mm",
   "aperture": "f/2",
   "shutter": "1/1000 s",
   "iso": "160",
   "location": "North Goa, India",
   "date": "Apr 2025"
  },
  {
   "span": 2,
   "alt": "Corniche at dusk",
   "caption": "Blue hour over the bay.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 55-200mm",
   "focal": "110 mm",
   "aperture": "f/5.6",
   "shutter": "1/60 s",
   "iso": "800",
   "location": "Doha, Qatar",
   "date": "Nov 2025"
  },
  {
   "span": 3,
   "alt": "Souq Waqif, alleyway",
   "caption": "Narrow, warm, and never empty.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 23mm f/1.4",
   "focal": "23 mm",
   "aperture": "f/2.8",
   "shutter": "1/125 s",
   "iso": "1600",
   "location": "Doha, Qatar",
   "date": "Jan 2026"
  },
  {
   "span": 3,
   "alt": "Cyclist, motion",
   "caption": "Motion and stillness, both compelling.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 35mm f/2",
   "focal": "35 mm",
   "aperture": "f/8",
   "shutter": "1/30 s",
   "iso": "200",
   "location": "Kolkata, India",
   "date": "Feb 2024"
  },
  {
   "span": 2,
   "alt": "Shadows on a wall",
   "caption": "Sometimes the subject is just the light.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 35mm f/2",
   "focal": "35 mm",
   "aperture": "f/5.6",
   "shutter": "1/750 s",
   "iso": "160",
   "location": "Kolkata, India",
   "date": "Mar 2024"
  },
  {
   "span": 4,
   "alt": "Rooftops, evening",
   "caption": "Everything above eye level is usually ignored.",
   "camera": "Fujifilm X-T4",
   "lens": "XF 55-200mm",
   "focal": "85 mm",
   "aperture": "f/4",
   "shutter": "1/200 s",
   "iso": "400",
   "location": "Doha, Qatar",
   "date": "Dec 2025"
  }
 ],
 "about": "Product and program leader in AI, machine learning and analytics, with more than eleven years leading cross-functional teams across data science, engineering and business. I currently lead enterprise AI at Qatar Insurance Group, combining AI strategy and governance with hands-on delivery.\n\nI am a designer at heart who happens to like statistics. Most of what I do is figuring out which lever actually moved the number, then designing the thing that moves it on purpose. That has looked like an enterprise AI register and a regulatory submission to the Qatar Central Bank, a risk operations tool spanning five departments, a claims platform for a Fortune 100 insurer, an MLOps pipeline for a semiconductor manufacturer, and shelf-space rationalisation for an FMCG giant.\n\nBetween March and October 2024 I stepped away from work to care for my mother through her terminal illness. I returned to my career after she passed.\n\nDomain experience spans insurance, FMCG, semiconductor and advertising. Open to conversations about senior product, program and AI strategy roles.\n\n## Education\n\nMSc Applied Econometrics and BSc Economics, both University of Calcutta.\n\n## Certifications\n\nProfessional Scrum Master (Scrum.org, March 2024). AI Product Management (Duke University via Coursera, February 2023)."
};

/* ================================================================ tokens */

const C = {
  white: "#FFFFFF",
  ink: "#0A0A0A",
  g1: "#F5F4F2",
  g2: "#E6E4E0",
  gt: "#56534E",
  blue: "#007AFF",
  blueDeep: "#0051D5",
  dark: "#0A0A0A",
};

/* data ramp — only ever used inside charts and modules */
const D = { blue: "#007AFF", amber: "#F0A202", teal: "#00A896", red: "#E4572E", grey: "#C4C1BC" };

const SANS = "'Archivo Variable','Archivo',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif";

/* ------ PLACEHOLDER COPY — overwrite these three blocks ------ */
const SITE_NAME = "Subh : Product, Risk and AI";
const POSITIONING = "I build AI products for decisions that carry risk.";
const SUBLINE = "AI strategy, product and delivery. Insurance, FMCG, semiconductor, adtech.";
const APPROACH = [
  { k: "Frame the decision", v: "Start from the call someone has to make, not the model someone wants to build. Most analytics work fails because nobody wrote down what the output was for." },
  { k: "Find the asymmetry", v: "Being wrong costs differently in each direction. Clearing a bad claim is not the same as delaying a good one. That asymmetry sets the threshold, not the accuracy score." },
  { k: "Ship it small and cheap to be wrong", v: "Rules before models when there is no data. A version that can be corrected on Monday beats a version that is right in six months." },
  { k: "Watch it in the wild", v: "Instrument the decision, not just the deploy. The interesting failures show up in how people route around the system." },
];
/* ------------------------------------------------------------ */

const NOW = new Date(2026, 8, 1);
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const toDate = (s) => (s === "present" ? NOW : new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, 1));
const label = (s) => (s === "present" ? "present" : MON[+s.slice(5, 7) - 1] + " " + s.slice(0, 4));
function tenure(p) {
  const a = toDate(p.start), b = toDate(p.end);
  const m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  const y = Math.floor(m / 12), r = m % 12;
  if (!y && !r) return "1 mo";
  return (y ? y + " yr" : "") + (y && r ? " " : "") + (r ? r + " mo" : "");
}
function makeRandom(seed) {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ================================================================ markdown */

function mdToHtml(src) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) =>
    esc(s)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/(^|\s)_([^_\n]+)_/g, "$1<em>$2</em>");
  const lines = src.replace(/\r/g, "").split("\n");
  const out = []; let para = [], list = null;
  const fp = () => { if (para.length) { out.push("<p>" + inline(para.join(" ").trim()) + "</p>"); para = []; } };
  const fl = () => { if (list) { out.push("<" + list.tag + ">" + list.items.map((i) => "<li>" + inline(i) + "</li>").join("") + "</" + list.tag + ">"); list = null; } };
  const flush = () => { fp(); fl(); };
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { flush(); continue; }
    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (img) { flush(); out.push('<figure class="imgph"><span class="ip-k">image</span><span class="ip-a">' + esc(img[1] || "untitled") + '</span><span class="ip-s">' + esc(img[2]) + "</span></figure>"); continue; }
    if (/^(---+|\*\*\*+|___+)$/.test(t)) { flush(); out.push('<div class="mdgap"></div>'); continue; }
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) { flush(); const lvl = Math.min(h[1].length + 1, 6); out.push("<h" + lvl + ">" + inline(h[2]) + "</h" + lvl + ">"); continue; }
    const ul = t.match(/^[-*]\s+(.*)$/);
    if (ul) { fp(); if (!list || list.tag !== "ul") { fl(); list = { tag: "ul", items: [] }; } list.items.push(ul[1]); continue; }
    const ol = t.match(/^\d+[.)]\s+(.*)$/);
    if (ol) { fp(); if (!list || list.tag !== "ol") { fl(); list = { tag: "ol", items: [] }; } list.items.push(ol[1]); continue; }
    fl(); para.push(t);
  }
  flush();
  return out.join("");
}
const Prose = ({ md, style }) => <div className="prose" style={style} dangerouslySetInnerHTML={{ __html: mdToHtml(md) }} />;

/* ================================================================ primitives */

const Meta = ({ children, style }) => <span style={{ fontStretch: "100%", fontSize: 14, color: C.gt, ...style }}>{children}</span>;

const Display = ({ children, style }) => (
  <h1 style={{ fontStretch: "122%", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", lineHeight: 0.92, letterSpacing: "-0.035em", margin: 0, ...style }}>{children}</h1>
);
const H2 = ({ children, style }) => (
  <h2 style={{ fontStretch: "118%", fontWeight: 700, fontSize: "clamp(24px,2.6vw,36px)", lineHeight: 0.98, letterSpacing: "-0.028em", margin: 0, ...style }}>{children}</h2>
);
function Crumbs({ items, dark }) {
  return (
    <nav className={"crumbs" + (dark ? " dark" : "")} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last ? (
              <span className="cr-now" aria-current="page">{it.label}</span>
            ) : (
              <button type="button" className="cr-link" onClick={it.to}>{it.label}</button>
            )}
            {!last && <span className="cr-sep">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

const SecLabel = ({ n, children }) => (
  <div className="seclabel"><span style={{ fontVariantNumeric: "tabular-nums" }}>{n}</span><span>{children}</span></div>
);

const Stat = ({ value, sub, tone, big }) => (
  <div style={{ minWidth: 100 }}>
    <div style={{ fontStretch: "124%", fontWeight: 800, fontSize: big ? "clamp(28px,3.2vw,40px)" : "clamp(22px,2.4vw,31px)", lineHeight: 0.9, letterSpacing: "-0.028em", fontVariantNumeric: "tabular-nums", color: tone || C.ink }}>{value}</div>
    <div style={{ fontStretch: "100%", fontSize: 14, color: C.gt, marginTop: 7, maxWidth: "18ch", lineHeight: 1.35 }}>{sub}</div>
  </div>
);

function Slider({ label, value, min, max, step, onChange, format, tone }) {
  return (
    <div style={{ marginBottom: 17 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontStretch: "100%", fontSize: 14 }}>{label}</span>
        <span style={{ fontWeight: 600, fontSize: 14, fontVariantNumeric: "tabular-nums", color: tone || D.blue }}>{format ? format(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: "100%", accentColor: tone || D.blue, color: tone || D.blue }} />
    </div>
  );
}

const Pill = ({ on, onClick, children, sm }) => (
  <button type="button" className={"pill" + (sm ? " sm" : "") + (on ? " on" : "")} onClick={onClick}>{children}</button>
);

function Chips({ chips, onPick }) {
  const entries = Object.entries(chips || {});
  if (!entries.length) return null;
  return (
    <div style={{ marginTop: 22, display: "grid", gap: 9 }}>
      {entries.map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
          <span style={{ flex: "0 0 78px", fontSize: 14, color: C.gt }}>{k}</span>
          <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {v.map((i) => <Pill key={i} sm onClick={onPick ? () => onPick(i) : undefined}>{i}</Pill>)}
          </span>
        </div>
      ))}
    </div>
  );
}

function ModuleFrame({ title, note, children }) {
  return (
    <section className="modbox">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}>
        <h3 style={{ fontStretch: "116%", fontWeight: 700, fontSize: "clamp(19px,2.2vw,26px)", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>{title}</h3>
        <span className="tagchip">synthetic data</span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: C.gt, marginTop: 10, maxWidth: "66ch" }}>{note}</p>
      <div style={{ marginTop: 22 }}>{children}</div>
    </section>
  );
}

/* ================================================================ modules */

const CLAIMS = (() => {
  const r = makeRandom(7); const rows = [];
  for (let i = 0; i < 4000; i++) {
    const clean = r() < 0.72;
    const s = clean ? 1 - Math.pow(r(), 2.6) * 0.72 : 0.12 + Math.pow(r(), 0.85) * 0.72;
    rows.push({ s: Math.max(0.02, Math.min(0.995, s)), clean });
  }
  return rows;
})();

function ClaimsThreshold() {
  const [t, setT] = useState(0.82);
  const m = useMemo(() => {
    let auto = 0, autoBad = 0, queue = 0;
    for (const c of CLAIMS) { if (c.s >= t) { auto++; if (!c.clean) autoBad++; } else queue++; }
    const n = CLAIMS.length;
    return { queue, autoPct: (auto / n) * 100, errPct: auto ? (autoBad / auto) * 100 : 0, avgMin: (auto * 4 + queue * 18 * 60) / n };
  }, [t]);
  const bins = useMemo(() => {
    const B = 44; const o = Array.from({ length: B }, () => ({ clean: 0, review: 0 }));
    for (const c of CLAIMS) { const i = Math.min(B - 1, Math.floor(c.s * B)); c.clean ? o[i].clean++ : o[i].review++; }
    return o;
  }, []);
  const maxBin = Math.max(...bins.map((b) => b.clean + b.review));
  const W = 620, H = 180, bw = W / bins.length;
  const fmt = (min) => (min >= 60 ? (min / 60).toFixed(1) + " hrs" : Math.round(min) + " min");
  return (
    <ModuleFrame title="Where do you set the auto-clear threshold?" note="Every claim gets a model confidence score. Above the line it clears automatically; below it goes to a human. Move the line and you trade throughput against error — the whole product decision in one control.">
      <div className="mgrid">
        <div>
          <svg viewBox={`0 0 ${W} ${H + 24}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {bins.map((b, i) => {
              const hC = ((b.clean + b.review) / maxBin) * H, hR = (b.review / maxBin) * H;
              const above = (i + 0.5) / bins.length >= t;
              return (
                <g key={i}>
                  <rect x={i * bw} y={H - hC} width={bw - 1.2} height={hC} fill={above ? D.blue : D.grey} opacity={above ? 0.32 : 0.55} />
                  <rect x={i * bw} y={H - hR} width={bw - 1.2} height={hR} fill={above ? D.red : D.grey} opacity={above ? 0.95 : 0.8} />
                </g>
              );
            })}
            <line x1={t * W} y1={0} x2={t * W} y2={H} stroke={C.ink} strokeWidth="2" />
            <text x={t * W - 6} y={13} textAnchor="end" fontSize="12" fill={C.ink} fontWeight="600">{t.toFixed(2)}</text>
            {[0, 0.5, 1].map((p) => <text key={p} x={p * W} y={H + 17} fontSize="12" fill={C.gt} textAnchor={p === 0 ? "start" : p === 1 ? "end" : "middle"}>{p.toFixed(2)}</text>)}
          </svg>
          <div className="legend">
            <span style={{ color: D.blue }}>■ genuinely clean</span>
            <span style={{ color: D.red }}>■ needs review, cleared in error</span>
            <span>model confidence →</span>
          </div>
        </div>
        <div>
          <Slider label="Auto-clear threshold" value={t} min={0.3} max={0.99} step={0.01} onChange={setT} format={(v) => v.toFixed(2)} />
          <div className="statrow"><Stat value={m.autoPct.toFixed(0) + "%"} sub="of claims clear without a human" tone={D.blue} /><Stat value={m.errPct.toFixed(1) + "%"} sub="of those were cleared in error" tone={m.errPct > 4 ? D.red : C.ink} /></div>
          <div className="statrow"><Stat value={m.queue.toLocaleString()} sub="claims still in the queue" /><Stat value={fmt(m.avgMin)} sub="average time to settle, blended" tone={D.teal} /></div>
          <p className="readout">{m.errPct > 6 ? "Too loose. Error volume outweighs the time saved, and adjudicators stop trusting the queue." : m.autoPct < 35 ? "Too tight. Safe, but you have barely automated anything." : "Roughly the band we shipped in: most volume cleared, error low enough that adjudicators kept trusting it."}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}

const SKUS = (() => {
  const r = makeRandom(21); const out = [];
  for (let i = 0; i < 150; i++) {
    const acv = 4 + Math.pow(r(), 0.7) * 92;
    const eff = 0.15 + Math.pow(r(), 1.9) * 2.6 + (acv / 100) * 0.35;
    out.push({ id: i, acv, eff, rev: eff * acv * (0.6 + r() * 0.9), isNew: r() < 0.12, seg: ["Pads", "Tampons", "Liners"][Math.floor(r() * 3)] });
  }
  return out;
})();

function SkuDelist() {
  const [cut, setCut] = useState(0.75);
  const [protectNew, setProtectNew] = useState(true);
  const [seg, setSeg] = useState("All");
  const pool = useMemo(() => (seg === "All" ? SKUS : SKUS.filter((s) => s.seg === seg)), [seg]);
  const m = useMemo(() => {
    let del = 0, revLost = 0, acvFreed = 0, saved = 0;
    for (const s of pool) if (s.eff < cut && !(protectNew && s.isNew)) { del++; revLost += s.rev; acvFreed += s.acv; saved += 78000 + s.acv * 900; }
    return { del, pct: pool.length ? (del / pool.length) * 100 : 0, revLost, acvFreed, saved };
  }, [cut, protectNew, pool]);
  const W = 600, H = 250, P = 32;
  const px = (v) => P + (v / 100) * (W - P - 12);
  const py = (v) => H - P - (v / 3.2) * (H - P - 14);
  return (
    <ModuleFrame title="Which SKUs come off the shelf?" note="Each dot is a SKU: horizontal is distribution reach in %ACV, vertical is the custom Sales/ACV efficiency metric — performance stripped of how widely the item is stocked. Drag the cut and the delist list rebuilds.">
      <div className="mgrid">
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <rect x={P} y={py(cut)} width={W - P - 12} height={H - P - py(cut)} fill={D.red} opacity="0.07" />
            <line x1={P} y1={py(cut)} x2={W - 12} y2={py(cut)} stroke={D.red} strokeWidth="2" strokeDasharray="5 4" />
            <text x={W - 14} y={py(cut) - 8} textAnchor="end" fontSize="12" fill={D.red} fontWeight="600">cut at {cut.toFixed(2)}</text>
            {pool.map((s) => {
              const prot = protectNew && s.isNew, del = s.eff < cut && !prot;
              return <circle key={s.id} cx={px(s.acv)} cy={py(Math.min(s.eff, 3.15))} r={3 + Math.sqrt(s.rev) / 5} fill={del ? D.red : prot ? "none" : D.blue} stroke={prot ? D.teal : "none"} strokeWidth="1.6" opacity={del ? 0.7 : 0.55} />;
            })}
            <line x1={P} y1={H - P} x2={W - 12} y2={H - P} stroke={C.g2} />
            <line x1={P} y1={12} x2={P} y2={H - P} stroke={C.g2} />
            <text x={P} y={H - 10} fontSize="12" fill={C.gt}>0% ACV</text>
            <text x={W - 12} y={H - 10} fontSize="12" fill={C.gt} textAnchor="end">100% ACV</text>
            <text x={2} y={20} fontSize="12" fill={C.gt}>Sales/ACV</text>
          </svg>
          <div className="legend"><span style={{ color: D.blue }}>● keep</span><span style={{ color: D.red }}>● delist</span><span style={{ color: D.teal }}>○ protected launch</span><span>dot size = revenue</span></div>
        </div>
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>{["All", "Pads", "Tampons", "Liners"].map((s) => <Pill key={s} on={seg === s} onClick={() => setSeg(s)}>{s}</Pill>)}</div>
          <Slider label="Efficiency cut-off" value={cut} min={0.2} max={1.9} step={0.01} onChange={setCut} format={(v) => v.toFixed(2)} tone={D.red} />
          <label className="toggle"><input type="checkbox" checked={protectNew} onChange={(e) => setProtectNew(e.target.checked)} /><span>Protect launches under 12 months</span></label>
          <div className="statrow"><Stat value={m.del} sub={`SKUs delisted — ${m.pct.toFixed(0)}% of assortment`} tone={D.red} /><Stat value={"$" + (m.saved / 1e6).toFixed(1) + "M"} sub="projected annualised saving" tone={D.teal} /></div>
          <div className="statrow"><Stat value={Math.round(m.acvFreed).toLocaleString()} sub="points of ACV freed" /><Stat value={"$" + (m.revLost / 1000).toFixed(0) + "K"} sub="revenue at risk" /></div>
          <p className="readout">{m.pct > 40 ? "Aggressive. Cuts this deep hit items that anchor a shopper's repertoire, and buyers push back." : m.pct < 8 ? "Barely moves the needle — the shelf clutter that started the project is still there." : "A defensible range. Enough to free real shelf space without gutting the repertoire."}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}

const ELAST = { Pads: { media: 0.11, price: -1.75, dist: 0.82, promo: 0.29 }, Tampons: { media: 0.16, price: -2.15, dist: 0.68, promo: 0.41 }, Liners: { media: 0.07, price: -1.32, dist: 0.91, promo: 0.22 } };
const BASE = { media: 100, price: 100, dist: 85, promo: 10 };

function SalesDrivers() {
  const [seg, setSeg] = useState("Pads");
  const [v, setV] = useState({ ...BASE });
  const e = ELAST[seg];
  const c = useMemo(() => {
    const o = { media: e.media * Math.log(v.media / BASE.media), price: e.price * Math.log(v.price / BASE.price), dist: e.dist * Math.log(v.dist / BASE.dist), promo: e.promo * Math.log((1 + v.promo / 100) / (1 + BASE.promo / 100)) };
    return { ...o, index: 100 * Math.exp(o.media + o.price + o.dist + o.promo) };
  }, [v, e]);
  const rows = [["Media spend", c.media, D.blue], ["Price", c.price, D.red], ["Distribution", c.dist, D.teal], ["Promotion", c.promo, D.amber]];
  const maxAbs = Math.max(0.05, ...rows.map((r) => Math.abs(r[1])));
  return (
    <ModuleFrame title="Which lever actually moves volume?" note="A log-log model fitted per segment per retailer. Pull the levers and watch the volume index respond — then switch segment and notice the elasticities change entirely. That is why one model for the whole portfolio would have been wrong.">
      <div className="mgrid">
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>{Object.keys(ELAST).map((s) => <Pill key={s} on={seg === s} onClick={() => setSeg(s)}>{s}</Pill>)}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
            <div style={{ fontStretch: "124%", fontWeight: 800, fontSize: "clamp(32px,3.6vw,48px)", lineHeight: 0.88, letterSpacing: "-0.032em", fontVariantNumeric: "tabular-nums", color: c.index >= 100 ? D.teal : D.red }}>{c.index.toFixed(1)}</div>
            <Meta style={{ maxWidth: "16ch", lineHeight: 1.4 }}>volume index, base = 100</Meta>
          </div>
          {rows.map(([name, val, tone]) => {
            const w = (Math.abs(val) / maxAbs) * 46;
            return (
              <div key={name} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.gt, marginBottom: 4 }}>
                  <span>{name}</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", color: val >= 0 ? D.teal : D.red }}>{val >= 0 ? "+" : ""}{(val * 100).toFixed(1)}%</span>
                </div>
                <div style={{ position: "relative", height: 12, background: C.g1, borderRadius: 3 }}>
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: C.g2 }} />
                  <div style={{ position: "absolute", top: 0, height: 12, background: tone, borderRadius: 3, left: val >= 0 ? "50%" : `${50 - w}%`, width: w + "%" }} />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Slider label="Media spend index" value={v.media} min={50} max={160} step={1} onChange={(x) => setV({ ...v, media: x })} tone={D.blue} />
          <Slider label="Price index" value={v.price} min={88} max={115} step={0.5} onChange={(x) => setV({ ...v, price: x })} tone={D.red} format={(x) => x.toFixed(1)} />
          <Slider label="Distribution, %ACV" value={v.dist} min={55} max={99} step={1} onChange={(x) => setV({ ...v, dist: x })} tone={D.teal} format={(x) => x + "%"} />
          <Slider label="Promotion depth" value={v.promo} min={0} max={35} step={1} onChange={(x) => setV({ ...v, promo: x })} tone={D.amber} format={(x) => x + "%"} />
          <Pill onClick={() => setV({ ...BASE })}>Reset to base</Pill>
          <p className="readout">Price elasticity for {seg} is {e.price}. A one percent price rise costs {Math.abs(e.price).toFixed(2)}% of volume, which is why &ldquo;should we promote harder?&rdquo; has a different answer per segment.</p>
        </div>
      </div>
    </ModuleFrame>
  );
}

const RULES = (() => {
  const r = makeRandom(99);
  const A = ["Pads regular", "Pads overnight", "Liners daily", "Tampons regular", "Tampons super", "Wipes", "Wash", "Heat patch"];
  const out = [];
  for (let i = 0; i < A.length; i++) for (let j = 0; j < A.length; j++) { if (i === j) continue; out.push({ a: A[i], b: A[j], sup: 0.004 + Math.pow(r(), 2.1) * 0.13, conf: 0.08 + Math.pow(r(), 1.4) * 0.72, lift: 0.6 + Math.pow(r(), 1.5) * 3.4 }); }
  return out;
})();

function BasketMiner() {
  const [sup, setSup] = useState(0.02), [conf, setConf] = useState(0.35), [lift, setLift] = useState(1.2);
  const kept = RULES.filter((x) => x.sup >= sup && x.conf >= conf && x.lift >= lift).sort((a, b) => b.lift - a.lift);
  return (
    <ModuleFrame title="Which product pairs survive the thresholds?" note="Association rule mining produces thousands of pairs, almost all of them noise. The work is choosing where support, confidence and lift have to sit before a rule earns a shelf change.">
      <div className="mgrid">
        <div className="ruletable">
          <div className="rt-head"><span>if basket contains</span><span>then also</span><span>lift</span></div>
          {kept.slice(0, 9).map((x, i) => (
            <div key={i} className="rt-row"><span>{x.a}</span><span>{x.b}</span><span style={{ fontVariantNumeric: "tabular-nums", color: x.lift > 2 ? D.teal : C.gt, fontWeight: 600 }}>{x.lift.toFixed(2)}</span></div>
          ))}
          {!kept.length && <div className="rt-row empty">No rules survive these thresholds.</div>}
          {kept.length > 9 && <div className="rt-row empty">+ {kept.length - 9} more</div>}
        </div>
        <div>
          <Slider label="Minimum support" value={sup} min={0.002} max={0.1} step={0.002} onChange={setSup} format={(v) => (v * 100).toFixed(1) + "%"} tone={D.blue} />
          <Slider label="Minimum confidence" value={conf} min={0.05} max={0.85} step={0.01} onChange={setConf} format={(v) => (v * 100).toFixed(0) + "%"} tone={D.amber} />
          <Slider label="Minimum lift" value={lift} min={0.8} max={3.5} step={0.05} onChange={setLift} format={(v) => v.toFixed(2)} tone={D.teal} />
          <div className="statrow"><Stat value={kept.length} sub={`rules survive, from ${RULES.length} candidates`} tone={D.blue} /></div>
          <p className="readout">{kept.length > 24 ? "Too permissive. You are handing the category team noise and asking them to sort it." : kept.length === 0 ? "Nothing survives. Loosen one threshold — usually support is set too high." : "A workable shortlist. Few enough to act on, strong enough that lift is not coming from one popular item."}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}

function BanditSim() {
  const K = 5;
  const [truth] = useState(() => { const r = makeRandom(5); return Array.from({ length: K }, () => 0.2 + r() * 0.6); });
  const [eps, setEps] = useState(0.1);
  const [st, setSt] = useState(() => ({ n: Array(K).fill(0), q: Array(K).fill(0), pulls: 0, reward: 0 }));
  const best = Math.max(...truth);
  const pull = (times) => setSt((prev) => {
    const n = [...prev.n], q = [...prev.q]; let pulls = prev.pulls, reward = prev.reward;
    for (let i = 0; i < times; i++) {
      let arm;
      if (Math.random() < eps) arm = Math.floor(Math.random() * K);
      else { let bi = 0; for (let k = 1; k < K; k++) if (q[k] > q[bi]) bi = k; arm = bi; }
      const rw = Math.random() < truth[arm] ? 1 : 0;
      n[arm]++; q[arm] += (rw - q[arm]) / n[arm]; pulls++; reward += rw;
    }
    return { n, q, pulls, reward };
  });
  const regret = st.pulls ? (best * st.pulls - st.reward).toFixed(1) : "0.0";
  const maxN = Math.max(1, ...st.n);
  return (
    <ModuleFrame title="K-armed bandit: explore or exploit?" note="Five arms, each with a hidden payout rate. Epsilon is how often the agent ignores its current best guess and tries something else. Pull a thousand times at epsilon 0, then reset and try 0.15.">
      <div className="mgrid">
        <div>
          {truth.map((tv, k) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.gt, marginBottom: 4 }}>
                <span>arm {k + 1}{tv === best && <span style={{ color: D.teal }}> · best</span>}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>est {st.n[k] ? st.q[k].toFixed(2) : "—"} · {st.n[k]} pulls</span>
              </div>
              <div style={{ position: "relative", height: 14, background: C.g1, borderRadius: 3 }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: 14, width: (st.n[k] / maxN) * 100 + "%", background: tv === best ? D.teal : D.blue, borderRadius: 3, opacity: 0.85 }} />
                <div style={{ position: "absolute", left: tv * 100 + "%", top: -3, width: 2, height: 20, background: C.ink }} />
              </div>
            </div>
          ))}
          <Meta style={{ display: "block", marginTop: 8 }}>bar = pull share · vertical mark = true payout rate</Meta>
        </div>
        <div>
          <Slider label="Epsilon, exploration rate" value={eps} min={0} max={0.5} step={0.01} onChange={setEps} format={(v) => v.toFixed(2)} />
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
            <Pill onClick={() => pull(1)}>Pull once</Pill><Pill onClick={() => pull(100)}>Pull 100</Pill><Pill onClick={() => pull(1000)}>Pull 1000</Pill>
            <Pill onClick={() => setSt({ n: Array(K).fill(0), q: Array(K).fill(0), pulls: 0, reward: 0 })}>Reset</Pill>
          </div>
          <div className="statrow"><Stat value={st.pulls.toLocaleString()} sub="total pulls" /><Stat value={st.reward} sub="cumulative reward" tone={D.blue} /></div>
          <div className="statrow"><Stat value={regret} sub="regret against always picking the best arm" tone={D.red} /></div>
          <p className="readout">{eps === 0 ? "Pure exploitation. The agent locks onto whichever arm looked good first and never checks the others." : eps > 0.3 ? "Mostly exploring. It finds the best arm quickly, then throws pulls away on arms it knows are worse." : "A sensible middle. Enough exploration to find the best arm, not so much that finding it stops paying off."}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}


/* ================================================================ module: risk ops */

const EVENTS = (() => {
  const r = makeRandom(41);
  const kinds = ["Conflict", "Catastrophe", "Disruption", "Cyber", "Political"];
  const out = [];
  for (let i = 0; i < 120; i++) {
    out.push({ id: i, sev: 0.05 + Math.pow(r(), 1.5) * 0.94, exp: 0.5 + Math.pow(r(), 2.2) * 42, kind: kinds[Math.floor(r() * kinds.length)],
      teams: 1 + Math.floor(r() * 5) });
  }
  return out;
})();

function RiskOps() {
  const [sev, setSev] = useState(0.55);
  const [exp, setExp] = useState(6);
  const flagged = EVENTS.filter((e) => e.sev >= sev && e.exp >= exp);
  const missed = EVENTS.filter((e) => e.sev >= 0.8 && !(e.sev >= sev && e.exp >= exp));
  const exposure = flagged.reduce((a, e) => a + e.exp, 0);
  const teams = new Set(flagged.flatMap((e) => Array.from({ length: e.teams }, (_, i) => i))).size;
  const W = 600, H = 250, P = 34;
  const px = (v) => P + (v / 1) * (W - P - 14);
  const py = (v) => H - P - (Math.min(v, 44) / 44) * (H - P - 14);
  return (
    <ModuleFrame title="Which events reach somebody's desk?" note="Every event carries a severity and an amount of live policy exposure behind it. Alert on everything and five departments stop reading; alert on too little and the tool is decorative the one time it matters. The thresholds are the product.">
      <div className="mgrid">
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <rect x={px(sev)} y={12} width={W - 14 - px(sev)} height={py(exp) - 12} fill={D.blue} opacity="0.07" />
            <line x1={px(sev)} y1={12} x2={px(sev)} y2={H - P} stroke={D.blue} strokeWidth="2" strokeDasharray="5 4" />
            <line x1={P} y1={py(exp)} x2={W - 14} y2={py(exp)} stroke={D.blue} strokeWidth="2" strokeDasharray="5 4" />
            {EVENTS.map((e) => {
              const on = e.sev >= sev && e.exp >= exp;
              const bad = e.sev >= 0.8 && !on;
              return <circle key={e.id} cx={px(e.sev)} cy={py(e.exp)} r={4} fill={on ? D.blue : bad ? D.red : D.grey} opacity={on ? 0.75 : bad ? 0.9 : 0.5} />;
            })}
            <line x1={P} y1={H - P} x2={W - 14} y2={H - P} stroke={C.g2} />
            <line x1={P} y1={12} x2={P} y2={H - P} stroke={C.g2} />
            <text x={P} y={H - 10} fontSize="12" fill={C.gt}>low severity</text>
            <text x={W - 14} y={H - 10} fontSize="12" fill={C.gt} textAnchor="end">high severity</text>
            <text x={2} y={20} fontSize="12" fill={C.gt}>exposure $m</text>
          </svg>
          <div className="legend">
            <span style={{ color: D.blue }}>● routed to a team</span>
            <span style={{ color: D.red }}>● severe but filtered out</span>
            <span>● below both thresholds</span>
          </div>
        </div>
        <div>
          <Slider label="Severity threshold" value={sev} min={0.05} max={0.95} step={0.01} onChange={setSev} format={(v) => v.toFixed(2)} tone={D.blue} />
          <Slider label="Minimum exposure" value={exp} min={0.5} max={40} step={0.5} onChange={setExp} format={(v) => "$" + v.toFixed(1) + "m"} tone={D.teal} />
          <div className="statrow">
            <Stat value={flagged.length} sub="events routed for action" tone={D.blue} />
            <Stat value={"$" + exposure.toFixed(0) + "m"} sub="live exposure covered" tone={D.teal} />
          </div>
          <div className="statrow">
            <Stat value={missed.length} sub="high-severity events nobody sees" tone={missed.length ? D.red : C.ink} />
          </div>
          <p className="readout">{flagged.length > 45 ? "Too noisy. Five departments will start ignoring the feed inside a fortnight, and then the tool is worse than nothing." : missed.length > 6 ? "Too tight. Severe events are falling through because the exposure floor is set above them." : "A workable window. Enough signal to act on, few enough that people still open it."}</p>
        </div>
      </div>
    </ModuleFrame>
  );
}

const WORK_MODULES = {
  "risk-operations-tool": RiskOps, "claims-adjudication": ClaimsThreshold, "sku-optimization": SkuDelist, "sales-driver-analysis": SalesDrivers, "market-basket-analysis": BasketMiner };
const POST_MODULES = { "exploration-vs-exploitation-k-bandit": BanditSim };

/* ================================================================ chrome */

function useDohaClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setT(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Qatar", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
      } catch { setT(""); }
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CopyEmail({ dark }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    const e = "subhabrata.nag@outlook.com";
    if (navigator.clipboard) navigator.clipboard.writeText(e).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => {});
    else { setDone(true); setTimeout(() => setDone(false), 1600); }
  };
  return (
    <button type="button" className={"copymail" + (dark ? " dark" : "")} onClick={copy}>
      {done ? "copied" : "subhabrata.nag@outlook.com"}
    </button>
  );
}

function Nav({ go, route, dark }) {
  const items = [["work", "Work"], ["writing", "Writing"], ["photography", "Photography"], ["about", "About"]];
  const active = { position: "work", workdetail: "work", career: "work", post: "writing", resume: "about" }[route.name] || route.name;
  return (
    <header className={"nav" + (dark ? " dark" : "")}>
      <button type="button" className="brand" onClick={() => go({ name: "home" })}>Subhabrata Nag</button>
      <nav className="navlinks">
        {items.map(([k, l]) => (
          <button key={k} type="button" className={"navlink" + (active === k ? " on" : "")} onClick={() => go({ name: k })}>{l}</button>
        ))}
      </nav>
      <CopyEmail dark={dark} />
    </header>
  );
}

/* ================================================================ home */

function Home({ go, scrollTo }) {
  const clock = useDohaClock();
  const ORDER = ["risk-operations-tool", "claims-adjudication", "sku-optimization"];
  const featured = ORDER.map((sl) => DATA.work.find((w) => w.slug === sl)).filter(Boolean);
  const approachRef = useRef(null), featRef = useRef(null);

  useEffect(() => {
    if (scrollTo === "featured" && featRef.current) featRef.current.scrollIntoView({ block: "start" });
  }, [scrollTo]);

  const ACC = [D.blue, D.amber, D.teal, D.red];

  return (
    <div>
      <section className="hero">
        <div className="heroleft">
          <Display style={{ fontSize: "clamp(36px,5.4vw,74px)", letterSpacing: "-0.032em" }}>{POSITIONING}</Display>
          <p className="subline">{SUBLINE}</p>
          <div className="statusline">
            <span className="dot" />
            <span>Doha, Qatar</span><span className="sep">·</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{clock || "--:--"} GMT+3</span><span className="sep">·</span>
            <span>open to conversations</span>
          </div>
          <button type="button" className="scrollcue" onClick={() => approachRef.current && approachRef.current.scrollIntoView({ behavior: "smooth" })}>
            Scroll for how I work ↓
          </button>
        </div>
        <div className="heroframe"><span>your photograph goes here</span></div>
      </section>

      <section ref={approachRef} className="band">
        <SecLabel n="01">Approach</SecLabel>
        <H2 style={{ maxWidth: "17ch", marginTop: 18 }}>Products that carry risk need a method, not a hunch.</H2>
        <span className="phtag">placeholder copy — overwrite</span>
        <div className="approachgrid">
          {APPROACH.map((a, i) => (
            <div key={a.k} className="approachitem" style={{ "--acc": ACC[i % 4] }}>
              <span className="accbar" />
              <span className="anum" style={{ color: ACC[i % 4] }}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{a.k}</h3>
              <p>{a.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={featRef} className="band grey">
        <div className="bandhead">
          <div><SecLabel n="02">Selected work</SecLabel><H2 style={{ marginTop: 16 }}>Three you can play with.</H2></div>
          <button type="button" className="btn" onClick={() => go({ name: "work" })}>All {DATA.work.length} projects →</button>
        </div>
        <div className="featgrid">
          {featured.map((w, i) => {
            const p = DATA.positions.find((q) => q.slug === w.position);
            const live = !!WORK_MODULES[w.slug];
            return (
              <button key={w.slug} type="button" className="featcard" onClick={() => go({ name: "workdetail", arg: w.slug, from: { name: "home", scrollTo: "featured" } })}>
                <span className="fnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="ftitle">{w.title}</span>
                <span className="fmeta">{p.company} · {w.year}</span>
                <span style={{ flex: 1 }} />
                <span className="fkpis">{w.kpis.map((k, j) => <span key={j}><b>{k.value}</b> {k.label}</span>)}</span>
                {live && <span className="livechip">● playable</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="band">
        <SecLabel n="03">Elsewhere</SecLabel>
        <div className="elsewhere">
          <button type="button" className="elcard" onClick={() => go({ name: "work" })}>
            <span className="eltitle">Professional timeline</span>
            <span className="elsub">{DATA.positions.filter((p) => p.type === "role").length} roles, eleven years, plotted to scale</span>
          </button>
          <button type="button" className="elcard" onClick={() => go({ name: "writing" })}>
            <span className="eltitle">Writing</span>
            <span className="elsub">{DATA.posts.length} pieces, one runs in your browser</span>
          </button>
          <button type="button" className="elcard" onClick={() => go({ name: "photography" })}>
            <span className="eltitle">Photography</span>
            <span className="elsub">{DATA.photos.length} frames — the other half of the practice</span>
          </button>
        </div>
      </section>

      <section className="band dark">
        <SecLabel n="04">Contact</SecLabel>
        <H2 style={{ maxWidth: "15ch", marginTop: 18, color: C.white }}>Let&rsquo;s talk about what you&rsquo;re trying to decide.</H2>
        <div className="contactrow">
          <CopyEmail dark />
          <span className="cmeta">+974 3154 9842</span>
          <span className="cmeta" style={{ fontVariantNumeric: "tabular-nums" }}>Doha — {clock || "--:--"} GMT+3</span>
          <button type="button" className="btn ghost" onClick={() => go({ name: "resume" })}>Résumé</button>
        </div>
      </section>

      <footer className="foot home">
        <span className="fname">{SITE_NAME}</span>
        <span>Subhabrata Nag</span>
        <span>Doha, Qatar</span>
      </footer>
    </div>
  );
}

/* ================================================================ work */

function lanes(items) {
  const out = [], ends = [];
  items.forEach((it) => {
    const st = toDate(it.start), e = toDate(it.end);
    let lane = 0;
    while (ends[lane] !== undefined && st < ends[lane]) lane++;
    ends[lane] = e; out.push(lane);
  });
  return out;
}

const DISCIPLINES = ["AI Strategy", "ML", "Data", "BI", "Ops", "Design"];
const INDUSTRIES = ["Insurance", "FMCG", "Semiconductor", "Advertising"];

function Work({ go, filter, setFilter }) {
  const [view, setView] = useState("timeline");
  const [hover, setHover] = useState(null);
  const roles = DATA.positions.filter((p) => p.type === "role");
  const breaks = DATA.positions.filter((p) => p.type === "break");
  const ordered = roles.slice().sort((a, b) => toDate(b.end) - toDate(a.end));
  const lane = lanes(ordered);
  const nLanes = Math.max(...lane) + 1;
  const START = toDate("2015-01"), TOTAL = NOW - START;
  const x = (d) => ((NOW - d) / TOTAL) * 100;
  const chron = DATA.positions.slice().sort((a, b) => toDate(b.end) - toDate(a.end));

  const tagged = (w, t) => (w.tags.discipline || []).includes(t) || (w.tags.industry || []).includes(t);
  const shown = filter ? DATA.work.filter((w) => tagged(w, filter)) : DATA.work;
  const byRecency = shown.slice().sort((a, b) => (b.year > a.year ? 1 : b.year < a.year ? -1 : 0));

  useEffect(() => { if (filter) setView("list"); }, [filter]);

  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "Work" }]} />
      <Display style={{ marginTop: 16 }}>Work.</Display>
      <p className="lede">Eleven years across insurance, FMCG, semiconductor and adtech. Five of the projects are playable.</p>

      <div className="segwrap">
        <div className="seg">
          <button type="button" className={view === "timeline" ? "on" : ""} onClick={() => { setView("timeline"); setFilter(null); }}>Timeline</button>
          <button type="button" className={view === "list" ? "on" : ""} onClick={() => setView("list")}>Projects</button>
        </div>
      </div>

      {view === "timeline" ? (
        <>
          <SecLabel n="—">Professional timeline</SecLabel>
          <div className="ribbon" style={{ height: nLanes * 38 + 46, marginTop: 16 }}>
            {ordered.map((r, i) => {
              const l = x(toDate(r.end)), w = x(toDate(r.start)) - l;
              return (
                <button key={r.slug} type="button" className="rib" onClick={() => go({ name: "position", arg: r.slug })}
                  onMouseEnter={() => setHover(r.slug)} onMouseLeave={() => setHover(null)}
                  style={{ left: l + "%", width: w + "%", top: lane[i] * 38 + 12, background: hover === r.slug ? C.blue : C.ink, color: C.white }}>
                  <span>{r.company}</span>
                </button>
              );
            })}
            {breaks.map((b) => (
              <div key={b.slug} className="rib brk" style={{ left: x(toDate(b.end)) + "%", width: x(toDate(b.start)) - x(toDate(b.end)) + "%", top: nLanes * 38 + 14 }}>
                <span>carer sabbatical</span>
              </div>
            ))}
            {[2026, 2023, 2020, 2017].map((y) => <span key={y} className="tick" style={{ left: x(new Date(y, 0, 1)) + "%" }}>{y}</span>)}
          </div>
          <div className="cardrow">
            {ordered.map((r, i) => {
              const n = DATA.work.filter((w) => w.position === r.slug).length;
              return (
                <button key={r.slug} type="button" className="rolecard" onClick={() => go({ name: "position", arg: r.slug })}
                  onMouseEnter={() => setHover(r.slug)} onMouseLeave={() => setHover(null)}>
                  <span className="rnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rco">{r.company}</span>
                  <span className="rrole">{r.role}</span>
                  <span style={{ flex: 1 }} />
                  <Meta style={{ marginTop: 14, fontVariantNumeric: "tabular-nums" }}>{label(r.start)} – {label(r.end)} · {tenure(r)}</Meta>
                  <span className="rlink">{n ? `${n} project${n === 1 ? "" : "s"} →` : "no case studies"}</span>
                </button>
              );
            })}
          </div>
          <div className="chron" style={{ marginTop: 28 }}>
            {chron.filter((p) => p.type === "break").map((p) => (
              <div key={p.slug} className="chrow break"><span style={{ fontSize: 15 }}>{p.company} — {p.summary}</span><Meta style={{ fontVariantNumeric: "tabular-nums" }}>{label(p.start)} – {label(p.end)}</Meta></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="filterbar">
            <span className="axis-k">discipline</span>
            <Pill sm on={!filter} onClick={() => setFilter(null)}>all</Pill>
            {DISCIPLINES.map((c) => <Pill key={c} sm on={filter === c} onClick={() => setFilter(c === filter ? null : c)}>{c}</Pill>)}
          </div>
          <div className="filterbar tight">
            <span className="axis-k">industry</span>
            {INDUSTRIES.map((c) => <Pill key={c} sm on={filter === c} onClick={() => setFilter(c === filter ? null : c)}>{c}</Pill>)}
            {filter && <span style={{ fontSize: 14, color: C.blue, marginLeft: 6 }}>{shown.length} of {DATA.work.length}</span>}
          </div>

          <div className="worklist">
            {byRecency.map((w, i) => {
              const p = DATA.positions.find((q) => q.slug === w.position);
              const live = !!WORK_MODULES[w.slug];
              return (
                <button key={w.slug} type="button" className="workrow" onClick={() => go({ name: "workdetail", arg: w.slug, from: { name: "work" } })}>
                  <span className="wnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wmain">
                    <span className="wtitle">{w.title}</span>
                    <span className="wdesc">{w.description}</span>
                  </span>
                  <span className="wside">
                    <Meta style={{ display: "block" }}>{p.company}</Meta>
                    <Meta style={{ display: "block", fontVariantNumeric: "tabular-nums" }}>{w.year}</Meta>
                    {live && <span className="livechip">● playable</span>}
                  </span>
                </button>
              );
            })}
            {!shown.length && <p className="empty">Nothing tagged {filter}. <button type="button" className="ul plain blue" onClick={() => setFilter(null)}>Clear the filter</button>.</p>}
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================================ position */

function Position({ slug, go, setFilter }) {
  const p = DATA.positions.find((q) => q.slug === slug);
  const items = useMemo(() => DATA.work.filter((w) => w.position === slug).sort((a, b) => a.order - b.order), [slug]);
  if (!p) return <div className="page">Not found</div>;
  const pickChip = (c) => { setFilter(c); go({ name: "work" }); };
  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "Work", to: () => go({ name: "work" }) }, { label: p.company }]} />
      <Display style={{ marginTop: 16 }}>{p.company}</Display>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 16 }}>
        <Meta>{p.role}</Meta>{p.industry && <Meta>{p.industry}</Meta>}
        <Meta style={{ fontVariantNumeric: "tabular-nums" }}>{label(p.start)} – {label(p.end)} · {tenure(p)}</Meta>
      </div>
      <p className="lede">{p.summary}</p>
      <Prose md={p.body} style={{ marginTop: 20, fontSize: 16 }} />
      {items.map((w) => {
        const Mod = WORK_MODULES[w.slug];
        return (
          <article key={w.slug} className="wcard">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", flexWrap: "wrap" }}>
              <h2 className="wcardtitle">{w.title}</h2>
              <span style={{ display: "flex", gap: 10, alignItems: "center" }}>{Mod && <span className="livechip">● playable</span>}<Meta style={{ fontVariantNumeric: "tabular-nums" }}>{w.year}</Meta></span>
            </div>
            <div className="statrow" style={{ marginTop: 20 }}>{w.kpis.map((k, j) => <Stat key={j} value={k.value} sub={k.label} big />)}</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 20, maxWidth: "58ch", color: C.gt }}>{w.description}</p>
            <Chips chips={w.chips} onPick={pickChip} />
            {Mod && <div style={{ marginTop: 24 }}><Mod /></div>}
            <button type="button" className="ul plain blue" onClick={() => go({ name: "workdetail", arg: w.slug, from: { name: "position", arg: slug } })} style={{ marginTop: 20, fontSize: 15 }}>Read the full case study →</button>
          </article>
        );
      })}
    </div>
  );
}

/* ================================================================ work detail */

function WorkDetail({ slug, go, setFilter, from }) {
  const w = DATA.work.find((q) => q.slug === slug);
  if (!w) return <div className="page">Not found</div>;
  const p = DATA.positions.find((q) => q.slug === w.position);
  const Mod = WORK_MODULES[w.slug];
  const pickChip = (c) => { setFilter(c); go({ name: "work" }); };
  return (
    <div className="page">
      <Crumbs
        items={[
          { label: "Home", to: () => go(from && from.name === "home" ? from : { name: "home" }) },
          { label: "Work", to: () => go({ name: "work" }) },
          { label: p.company, to: () => go({ name: "position", arg: w.position }) },
          { label: w.title },
        ]}
      />
      <Meta style={{ display: "block", marginTop: 16 }}>{p.company} · {w.year}</Meta>
      <Display style={{ marginTop: 10, maxWidth: "18ch" }}>{w.title}</Display>
      <div className="statrow" style={{ marginTop: 30 }}>{w.kpis.map((k, j) => <Stat key={j} value={k.value} sub={k.label} big />)}</div>
      <p style={{ fontSize: 19, lineHeight: 1.6, marginTop: 26, maxWidth: "56ch" }}>{w.description}</p>
      <Chips chips={w.chips} onPick={pickChip} />
      {Mod && <div style={{ marginTop: 30 }}><Mod /></div>}
      <Prose md={w.body} style={{ marginTop: 36 }} />
    </div>
  );
}

/* ================================================================ writing */

function Writing({ go }) {
  const [tag, setTag] = useState(null);
  const tags = useMemo(() => Array.from(new Set(DATA.posts.flatMap((p) => p.tags))).sort(), []);
  const shown = tag ? DATA.posts.filter((p) => p.tags.includes(tag)) : DATA.posts;
  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "Writing" }]} />
      <Display style={{ marginTop: 16 }}>Writing.</Display>
      <p className="lede">Machine learning, decision-making, photography, and the occasional hostel in Goa.</p>
      <div className="filterbar">
        <Meta style={{ marginRight: 3 }}>filter</Meta>
        <Pill sm on={tag === null} onClick={() => setTag(null)}>all</Pill>
        {tags.map((t) => <Pill key={t} sm on={tag === t} onClick={() => setTag(t === tag ? null : t)}>{t}</Pill>)}
      </div>
      <div className="worklist">
        {shown.map((p, i) => {
          const live = !!POST_MODULES[p.slug];
          return (
            <button key={p.slug} type="button" className="workrow" onClick={() => go({ name: "post", arg: p.slug })}>
              <span className="wnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="wmain"><span className="wtitle">{p.title}</span><span className="wdesc">{p.description}</span></span>
              <span className="wside">
                <Meta style={{ display: "block", fontVariantNumeric: "tabular-nums" }}>{p.dateLabel}</Meta>
                <Meta style={{ display: "block", fontVariantNumeric: "tabular-nums" }}>{p.readTime}</Meta>
                {live && <span className="livechip">● runs here</span>}
              </span>
            </button>
          );
        })}
        {!shown.length && <p className="empty">Nothing tagged {tag}. <button type="button" className="ul plain blue" onClick={() => setTag(null)}>Clear the filter</button>.</p>}
      </div>
    </div>
  );
}

function Post({ slug, go }) {
  const p = DATA.posts.find((q) => q.slug === slug);
  if (!p) return <div className="page">Not found</div>;
  const Mod = POST_MODULES[p.slug];
  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "Writing", to: () => go({ name: "writing" }) }, { label: p.title }]} />
      <Display style={{ marginTop: 16, maxWidth: "22ch" }}>{p.title}</Display>
      <Meta style={{ display: "block", marginTop: 18, fontVariantNumeric: "tabular-nums" }}>Doha · {p.dateLabel} · {p.readTime}</Meta>
      {Mod && <div style={{ marginTop: 30 }}><Mod /></div>}
      <Prose md={p.body} style={{ marginTop: 30, maxWidth: "66ch" }} />
    </div>
  );
}

/* ================================================================ photography */

function Photography({ go }) {
  const [open, setOpen] = useState(null);
  const frames = DATA.photos;
  const move = useCallback((d) => setOpen((i) => (i === null ? null : (i + d + frames.length) % frames.length)), [frames.length]);
  useEffect(() => {
    if (open === null) return;
    const h = (e) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, move]);
  const f = open === null ? null : frames[open];
  return (
    <div className="page dark">
      <Crumbs dark items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "Photography" }]} />
      <Display style={{ marginTop: 16, color: C.white }}>Photography.</Display>
      <p className="lede dark">The only room that goes dark. Some frames get more space, because editing is the job.</p>
      <div className="pgrid">
        {frames.map((ph, i) => <button key={i} type="button" className={"ph span-" + ph.span} onClick={() => setOpen(i)}><span>{ph.alt}</span></button>)}
      </div>
      <Meta style={{ display: "block", marginTop: 22, color: "#666" }}>Placeholder frames. Drop real images into public/images/photography/.</Meta>
      {f && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lb-img"><span>{f.alt}</span></div>
            <div className="lb-meta">
              <div style={{ fontStretch: "112%", fontWeight: 600, fontSize: 17, color: C.white }}>{f.alt}</div>
              <div style={{ fontStretch: "100%", fontSize: 14, color: "#8A8A8A", marginTop: 6 }}>{f.caption}</div>
              <div className="exif">
                {[["camera", f.camera], ["lens", f.lens], ["focal", f.focal], ["aperture", f.aperture], ["shutter", f.shutter], ["iso", f.iso], ["location", f.location], ["date", f.date]].map(([k, v]) => (
                  <div key={k} className="exif-row"><span>{k}</span><span style={{ fontVariantNumeric: "tabular-nums", color: "#C8C8C8" }}>{v}</span></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button type="button" className="darkbtn" onClick={() => move(-1)}>←</button>
                <button type="button" className="darkbtn" onClick={() => move(1)}>→</button>
                <button type="button" className="darkbtn" onClick={() => setOpen(null)} style={{ marginLeft: "auto" }}>close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================ about + resume */

function About({ go }) {
  const stats = [["11 yrs", "in analytics and product"], ["9", "case studies"], ["5", "industries"], ["$10M+", "value delivered"]];
  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "About" }]} />
      <Display style={{ marginTop: 16 }}>About.</Display>
      <div className="about-grid">
        <Prose md={DATA.about} style={{ marginTop: 26 }} />
        <div className="statcard">
          {stats.map(([n, k]) => <div key={k} className="statline"><span style={{ fontStretch: "120%", fontWeight: 700, fontSize: 22, fontVariantNumeric: "tabular-nums" }}>{n}</span><Meta>{k}</Meta></div>)}
          <button type="button" className="btn" style={{ margin: "14px 0 6px", width: "100%" }} onClick={() => go({ name: "resume" })}>Read the résumé</button>
        </div>
      </div>
    </div>
  );
}

function Resume({ go }) {
  const chron = DATA.positions.slice().sort((a, b) => toDate(b.end) - toDate(a.end));
  return (
    <div className="page">
      <Crumbs items={[{ label: "Home", to: () => go({ name: "home" }) }, { label: "About", to: () => go({ name: "about" }) }, { label: "Résumé" }]} />
      <Display style={{ marginTop: 16 }}>Résumé.</Display>
      <p className="lede">Deliberately plain semantic markup. This is the page ATS parsers and AI crawlers read.</p>
      <h2 className="rh">Experience</h2>
      {chron.map((p) => (
        <section key={p.slug} style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", flexWrap: "wrap" }}>
            <h3 style={{ fontStretch: "110%", fontWeight: 600, fontSize: 18, margin: 0 }}>{p.company} — {p.role}</h3>
            <Meta style={{ fontVariantNumeric: "tabular-nums" }}>{label(p.start)} – {label(p.end)}</Meta>
          </div>
          <p style={{ fontSize: 15, marginTop: 8, maxWidth: "68ch", color: C.gt }}>{p.summary}</p>
          <ul style={{ marginTop: 10, paddingLeft: 20 }}>
            {DATA.work.filter((w) => w.position === p.slug).sort((a, b) => a.order - b.order).map((w) => (
              <li key={w.slug} style={{ fontSize: 15, marginBottom: 6, maxWidth: "68ch" }}><strong style={{ fontWeight: 500 }}>{w.title}.</strong> {w.kpis.map((k) => k.value + " " + k.label).join("; ")}.</li>
            ))}
          </ul>
        </section>
      ))}
      <h2 className="rh">Education</h2>
      <p style={{ fontSize: 15 }}>MSc Applied Econometrics, University of Calcutta (2012–2014)</p>
      <p style={{ fontSize: 15 }}>BSc Economics, University of Calcutta (2009–2012)</p>
      <h2 className="rh">Certifications</h2>
      <p style={{ fontSize: 15 }}>Professional Scrum Master, Scrum.org (March 2024)</p>
      <p style={{ fontSize: 15 }}>AI Product Management, Duke University via Coursera (February 2023)</p>
      <h2 className="rh">Contact</h2>
      <p style={{ fontSize: 15 }}>subhabrata.nag@outlook.com · +974 3154 9842 · Doha, Qatar</p>
    </div>
  );
}

/* ================================================================ shell */

export default function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [filter, setFilter] = useState(null);
  const top = useRef(null);

  useEffect(() => {
    const id = "archivo-font";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const go = useCallback((r) => {
    setRoute(r);
    if (!r.scrollTo && top.current) top.current.scrollIntoView({ block: "start" });
  }, []);
  const dark = route.name === "photography";

  let view;
  if (route.name === "work") view = <Work go={go} filter={filter} setFilter={setFilter} />;
  else if (route.name === "position") view = <Position slug={route.arg} go={go} setFilter={setFilter} />;
  else if (route.name === "workdetail") view = <WorkDetail slug={route.arg} go={go} setFilter={setFilter} from={route.from} />;
  else if (route.name === "writing") view = <Writing go={go} />;
  else if (route.name === "post") view = <Post slug={route.arg} go={go} />;
  else if (route.name === "photography") view = <Photography go={go} />;
  else if (route.name === "about") view = <About go={go} />;
  else if (route.name === "resume") view = <Resume go={go} />;
  else view = <Home go={go} scrollTo={route.scrollTo} />;

  return (
    <div ref={top} style={{ fontFamily: SANS, background: dark ? C.dark : C.white, color: dark ? C.white : C.ink, minHeight: "100vh" }}>
      <style>{CSS}</style>
      <Nav go={go} route={route} dark={dark} />
      {view}
    </div>
  );
}

const CSS = `
*{box-sizing:border-box}
button{font-family:inherit;color:inherit}
:focus-visible{outline:2px solid ${C.blue};outline-offset:2px}

.nav{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:24px;flex-wrap:wrap;
  padding:14px clamp(18px,4vw,56px);background:rgba(255,255,255,.9);backdrop-filter:blur(10px)}
.nav.dark{background:rgba(10,10,10,.9)}
.brand{background:none;border:0;padding:0;cursor:pointer;font-stretch:118%;font-weight:700;font-size:15.5px;letter-spacing:-.015em}
.navlinks{display:flex;gap:4px;margin-left:auto;flex-wrap:wrap}
.navlink{background:none;border:0;padding:6px 12px;border-radius:16px;cursor:pointer;font-stretch:100%;font-size:14px;transition:background-color .13s}
.navlink:hover{background:${C.g1}}
.nav.dark .navlink:hover{background:#1C1C1C}
.navlink.on{background:${C.blue};color:#fff}
.copymail{background:none;border:0;padding:6px 0;cursor:pointer;font-stretch:100%;font-size:14px;color:${C.gt};border-bottom:1px solid transparent}
.copymail:hover{color:${C.blue};border-bottom-color:${C.blue}}
.copymail.dark{color:#9A9A9A}

.hero{display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(24px,4vw,56px);align-items:stretch;
  padding:clamp(28px,6vw,80px) clamp(18px,4vw,56px) clamp(40px,6vw,80px);min-height:76vh}
.subline{font-size:clamp(15px,1.3vw,19px);color:${C.gt};margin-top:26px;max-width:34ch}
.statusline{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-top:20px;font-stretch:100%;font-size:14px;color:${C.gt}}
.statusline .dot{width:7px;height:7px;border-radius:50%;background:${C.blue}}
.statusline{line-height:1.5}
.statusline .sep{color:${C.g2}}
.scrollcue{margin-top:34px;background:none;border:0;padding:0;cursor:pointer;font-stretch:100%;font-size:14px;color:${C.blue}}
.scrollcue:hover{text-decoration:underline}
.heroframe{background:${C.g1};border-radius:10px;align-self:stretch;min-height:340px;display:flex;align-items:flex-end;padding:16px}
.heroframe span{font-stretch:100%;font-size:14px;color:${C.gt}}

.band{padding:clamp(40px,6vw,96px) clamp(18px,4vw,56px)}
.band.grey{background:${C.g1}}
.band.dark{background:${C.dark};color:${C.white}}
.bandhead{display:flex;justify-content:space-between;gap:20px;align-items:flex-end;flex-wrap:wrap;margin-bottom:34px}
.seclabel{display:flex;gap:12px;align-items:baseline;font-stretch:100%;font-size:14px;color:${C.gt};text-transform:none}
.band.dark .seclabel{color:#8A8A8A}
.phtag{display:inline-block;margin-top:14px;font-stretch:100%;font-size:14px;color:${C.blue};background:#EAF3FF;padding:3px 9px;border-radius:12px}

.approachgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(232px,1fr));gap:14px;margin-top:40px}
.approachitem{background:${C.white};border-radius:10px;padding:20px;position:relative;overflow:hidden;
  transition:transform .18s ease,box-shadow .18s ease}
.approachitem:hover{transform:translateY(-5px);box-shadow:0 8px 26px rgba(0,0,0,.07)}
.approachitem .accbar{position:absolute;left:0;top:0;height:4px;width:34px;background:var(--acc);
  transition:width .28s cubic-bezier(.2,.7,.3,1)}
.approachitem:hover .accbar{width:100%}
.approachitem .anum{font-size:14px;font-variant-numeric:tabular-nums}
.approachitem h3{font-stretch:112%;font-weight:700;font-size:19px;letter-spacing:-.015em;margin:8px 0 10px;line-height:1.2}
.approachitem p{font-size:16.5px;line-height:1.62;color:${C.gt};margin:0}

.featgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(258px,1fr));gap:14px}
.featcard{background:${C.white};border:0;border-radius:12px;padding:22px;display:flex;flex-direction:column;
  min-height:270px;cursor:pointer;text-align:left;transition:transform .16s}
.featcard:hover{transform:translateY(-4px)}
.fnum{font-stretch:100%;font-size:14px;color:${C.blue};font-variant-numeric:tabular-nums}
.ftitle{font-stretch:114%;font-weight:700;font-size:21px;line-height:1.16;letter-spacing:-.02em;margin-top:10px}
.fmeta{font-stretch:100%;font-size:14px;color:${C.gt};margin-top:8px}
.fkpis{display:flex;flex-direction:column;gap:6px;margin-top:18px;font-stretch:100%;font-size:14px;color:${C.gt}}
.fkpis b{font-stretch:118%;font-weight:800;font-size:19px;color:${C.ink};font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.livechip{display:inline-block;margin-top:12px;font-stretch:100%;font-size:14px;font-weight:600;color:${C.blue};white-space:nowrap}

.elsewhere{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:32px}
.elcard{background:${C.g1};border:0;border-radius:12px;padding:24px;text-align:left;cursor:pointer;
  display:flex;flex-direction:column;min-height:132px;transition:background-color .14s}
.elcard:hover{background:${C.g2}}
.eltitle{font-stretch:116%;font-weight:700;font-size:24px;letter-spacing:-.02em}
.elsub{font-stretch:100%;font-size:14px;color:${C.gt};margin-top:10px;line-height:1.5}

.contactrow{display:flex;gap:22px;align-items:center;flex-wrap:wrap;margin-top:34px}
.cmeta{font-stretch:100%;font-size:14px;color:#8A8A8A}

.page{padding:clamp(26px,4vw,56px) clamp(18px,4vw,56px) 60px;max-width:1280px;margin:0 auto}
.page.dark{background:${C.dark};color:${C.white};min-height:100vh;max-width:none}
.lede{font-size:18px;max-width:56ch;margin-top:18px;line-height:1.55;color:${C.gt}}
.lede.dark{color:#9A9A9A}
.crumbs{display:flex;align-items:center;gap:9px;flex-wrap:wrap;font-size:14px;line-height:1.5;min-height:22px}
.cr-link{background:none;border:0;padding:0;cursor:pointer;font:inherit;color:${C.blue};border-bottom:1px solid transparent}
.cr-link:hover{border-bottom-color:${C.blue}}
.cr-sep{color:${C.g2}}
.cr-now{color:${C.gt};max-width:46ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.crumbs.dark .cr-sep{color:#3A3A3A}
.crumbs.dark .cr-now{color:#8E8E8E}
.ul{border-bottom:1px solid transparent;text-decoration:none}
.ul:hover{border-bottom-color:currentColor}
.ul.plain{background:none;border:0;padding:0;cursor:pointer;font:inherit}
.blue{color:${C.blue}}

.pill{background:${C.g1};border:0;border-radius:20px;padding:7px 14px;font-stretch:100%;font-size:14px;cursor:pointer;transition:background-color .13s,color .13s;display:inline-block}
.pill:hover{background:${C.g2}}
.pill.on{background:${C.blue};color:#fff}
.pill.sm{padding:5px 11px;font-size:14px}
.tagchip{font-stretch:100%;font-size:14px;color:${C.gt};background:${C.g1};padding:5px 10px;border-radius:20px;white-space:nowrap}
.btn{background:none;border:1.5px solid ${C.ink};border-radius:22px;padding:9px 18px;font-stretch:100%;font-size:14px;cursor:pointer;transition:background-color .13s,color .13s}
.btn:hover{background:${C.ink};color:${C.white}}
.btn.ghost{border-color:#3A3A3A;color:${C.white}}
.btn.ghost:hover{background:${C.white};color:${C.ink}}

.filterbar{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin:26px 0 10px}
.filterbar.tight{margin:0 0 24px}
.axis-k{font-size:14px;color:${C.gt};width:74px;flex:0 0 74px}
.worklist{display:grid;gap:8px}
.workrow{display:grid;grid-template-columns:44px 1fr 170px;gap:18px;align-items:start;text-align:left;
  background:${C.g1};border:0;border-radius:10px;padding:20px;cursor:pointer;transition:background-color .13s,transform .13s}
.workrow:hover{background:${C.g2};transform:translateX(3px)}
.wnum{font-stretch:100%;font-size:14px;color:${C.blue};font-variant-numeric:tabular-nums;padding-top:4px}
.wtitle{display:block;font-stretch:114%;font-weight:700;font-size:clamp(18px,1.9vw,23px);line-height:1.18;letter-spacing:-.02em;max-width:30ch}
.wdesc{display:block;font-size:15.5px;line-height:1.55;color:${C.gt};margin-top:8px;max-width:62ch}
.wside{text-align:right}
.empty{padding:26px 0;color:${C.gt};font-size:15px}

.segwrap{margin:26px 0 20px}
.seg{display:inline-flex;border-radius:20px;overflow:hidden;background:${C.g1}}
.seg button{background:none;border:0;padding:7px 16px;font-stretch:100%;font-size:14px;cursor:pointer}
.seg button.on{background:${C.ink};color:${C.white}}
.hide{display:none}

.ribbon{position:relative;background:${C.g1};border-radius:10px;margin-bottom:20px}
.rib{position:absolute;height:32px;border:0;border-radius:6px;display:flex;align-items:center;padding:0 11px;
  overflow:hidden;cursor:pointer;transition:background-color .15s,transform .15s;text-align:left}
.rib:hover{transform:translateY(-2px)}
.rib span{font-stretch:100%;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rib.brk{background:${C.g2};height:18px;border-radius:9px;cursor:default}
.rib.brk span{font-size:14px;color:${C.gt};line-height:18px}
.tick{position:absolute;bottom:6px;font-stretch:100%;font-size:14px;color:${C.gt};font-variant-numeric:tabular-nums}

.cardrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(176px,1fr));gap:10px}
.rolecard{background:${C.g1};border:0;border-radius:10px;padding:16px;display:flex;flex-direction:column;
  min-height:186px;cursor:pointer;text-align:left;transition:background-color .14s,transform .14s}
.rolecard:hover{background:${C.g2};transform:translateY(-3px)}
.rnum{font-stretch:100%;font-size:14px;color:${C.blue};font-variant-numeric:tabular-nums}
.rco{font-stretch:112%;font-weight:700;font-size:17px;line-height:1.15;margin-top:4px;letter-spacing:-.015em}
.rrole{font-stretch:100%;font-size:14px;color:${C.gt};margin-top:3px}
.rlink{font-stretch:100%;font-size:14px;color:${C.blue};margin-top:5px}

.chron{display:grid;gap:6px}
.chrow{display:flex;justify-content:space-between;gap:20px;align-items:baseline;width:100%;text-align:left;
  padding:14px 16px;background:${C.g1};border:0;border-radius:8px;cursor:pointer;transition:background-color .13s}
.chrow:hover{background:${C.g2}}
.chrow.break{background:transparent;cursor:default}

.wcard{background:${C.g1};border-radius:12px;padding:clamp(20px,3vw,34px);margin-top:26px}
.wcardtitle{font-stretch:114%;font-weight:700;font-size:clamp(20px,2.3vw,28px);line-height:1.15;letter-spacing:-.022em;margin:0;max-width:26ch}
.statrow{display:flex;gap:34px;flex-wrap:wrap;margin-top:20px}

.modbox{background:${C.white};border-radius:10px;padding:clamp(18px,2.6vw,26px)}
.mgrid{display:grid;grid-template-columns:1.3fr 1fr;gap:clamp(18px,3vw,38px);align-items:start}
.legend{display:flex;gap:18px;flex-wrap:wrap;margin-top:8px;font-size:14px;line-height:1.45;color:${C.gt}}
.readout{font-size:14px;color:${C.gt};margin-top:20px;line-height:1.55}
.toggle{display:flex;align-items:center;gap:9px;font-stretch:100%;font-size:14px;cursor:pointer}
.toggle input{accent-color:${D.teal};width:16px;height:16px;cursor:pointer}
input[type=range]{-webkit-appearance:none;appearance:none;height:4px;background:${C.g2};border-radius:2px;outline:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:19px;height:19px;border-radius:50%;background:currentColor;cursor:pointer;border:3px solid ${C.white};box-shadow:0 0 0 1px rgba(0,0,0,.12)}
input[type=range]::-moz-range-thumb{width:15px;height:15px;border-radius:50%;background:currentColor;cursor:pointer;border:3px solid ${C.white}}
.ruletable{background:${C.g1};border-radius:8px;overflow:hidden;align-self:start}
.rt-head,.rt-row{display:grid;grid-template-columns:1.2fr 1.2fr .5fr;gap:10px;padding:9px 12px;font-size:14px}
.rt-head{font-stretch:100%;font-size:14px;color:${C.gt};background:${C.g2}}
.rt-row.empty{color:${C.gt};font-size:14px;display:block;padding:12px}

.prose{font-size:17px;line-height:1.68;max-width:68ch;color:#2A2A2A}
.prose p{margin:0 0 18px}
.prose h2{font-stretch:114%;font-weight:700;font-size:25px;margin:38px 0 12px;letter-spacing:-.02em;line-height:1.2;color:${C.ink}}
.prose h3{font-stretch:110%;font-weight:600;font-size:19px;margin:28px 0 10px;color:${C.ink}}
.prose h4{font-weight:600;font-size:16px;margin:22px 0 8px;color:${C.ink}}
.prose ul,.prose ol{margin:0 0 18px 22px}
.prose li{margin-bottom:8px}
.prose strong{font-weight:600;color:${C.ink}}
.prose .mdgap{height:20px}
.prose code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:${C.g1};padding:1px 5px;border-radius:3px}
.prose a{color:${C.blue};border-bottom:1px solid ${C.blue}}
.imgph{display:flex;flex-direction:column;gap:3px;background:${C.g1};border-radius:8px;padding:16px;margin:24px 0}
.ip-k,.ip-s{font-stretch:100%;font-size:14px;color:${C.gt}}
.ip-a{font-size:14px;color:${C.ink}}

.pager{display:flex;justify-content:space-between;gap:20px;margin-top:52px}
.pager-btn{background:${C.g1};border:0;border-radius:10px;padding:15px 18px;text-align:left;cursor:pointer;max-width:46%;
  display:flex;flex-direction:column;gap:4px;font-stretch:106%;font-weight:500;font-size:15px;line-height:1.3;transition:background-color .13s}
.pager-btn.right{text-align:right;align-items:flex-end}
.pager-btn:hover{background:${C.g2}}

.pgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin-top:34px}
.ph{background:#181818;border:0;border-radius:8px;cursor:pointer;display:flex;align-items:flex-end;padding:12px;min-height:150px;text-align:left;transition:opacity .15s}
.ph:hover{opacity:.72}
.ph span{font-stretch:100%;font-size:14px;color:#666}
.span-4{grid-column:span 4;min-height:300px}
.span-3{grid-column:span 3;min-height:220px}
.span-2{grid-column:span 2;min-height:220px}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:60;display:flex;align-items:center;justify-content:center;padding:22px}
.lb-inner{display:grid;grid-template-columns:1fr 300px;max-width:1080px;width:100%;background:${C.dark};border-radius:10px;overflow:hidden}
.lb-img{background:#181818;min-height:430px;display:flex;align-items:center;justify-content:center}
.lb-img span{font-stretch:100%;font-size:14px;color:#555}
.lb-meta{padding:22px}
.exif{margin-top:18px}
.exif-row{display:flex;justify-content:space-between;gap:14px;padding:7px 0;font-stretch:100%;font-size:14px;color:#777}
.darkbtn{background:#1E1E1E;border:0;border-radius:6px;color:${C.white};padding:7px 13px;cursor:pointer;font-size:14px}
.darkbtn:hover{background:${C.blue}}

.about-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:clamp(24px,5vw,64px)}
.statcard{background:${C.g1};border-radius:10px;padding:10px 18px 18px;height:fit-content;margin-top:30px}
.statline{display:flex;justify-content:space-between;padding:12px 0;align-items:baseline}
.rh{font-stretch:100%;font-size:14px;color:${C.gt};margin:42px 0 14px;font-weight:400}

.foot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:30px clamp(18px,4vw,56px);
  font-size:14px;color:${C.gt};max-width:1280px;margin:0 auto}
.foot .fname{font-stretch:114%;font-weight:600;color:${C.ink}}

@media (max-width:1000px){
  .about-grid,.mgrid{grid-template-columns:1fr}
  .workrow{grid-template-columns:34px 1fr}
  .wside{grid-column:2;text-align:left;display:flex;gap:14px;flex-wrap:wrap;margin-top:10px}
}
@media (max-width:820px){
  .hero{grid-template-columns:1fr;min-height:auto}
  .heroframe{min-height:220px;order:-1}
  .axis-k{flex:0 0 100%;width:auto}
  .pgrid{grid-template-columns:repeat(2,1fr)}
  .span-4,.span-3,.span-2{grid-column:span 2;min-height:170px}
  .lb-inner{grid-template-columns:1fr}
  .lb-img{min-height:220px}
  .navlinks{margin-left:0;width:100%;order:3}
  .statrow{gap:22px}
}
@media (prefers-reduced-motion:reduce){*{transition:none !important}}
`;
