---
title: "MVP for an AI auto insurance startup"
position: "auto-insurance-startup"
date: 2024-08
featured: true
order: 1
readTime: "10 min read"
description: >-
  The MVP for an AI-first auto insurer: a Flutter claims app feeding a computer vision damage assessment pipeline on GCP, with churn and fraud designed in from the start.
cover: "/images/projects/Auto.jpg"
kpis:
  - value: "30%"
    label: "cut in claims processing time"
  - value: "0 → 1"
    label: "product taken from blank page to MVP"
chips:
  stack: ["GCP", "Vertex AI", "Flutter", "Firestore", "Dataflow", "BigQuery"]
  domain: ["Auto insurance", "Computer vision"]
  method: ["Roadmapping", "Feature prioritisation", "Customer research"]
---

The Minimum Viable Product (MVP) for an AI auto insurance startup was architected to **streamline and innovate around the claims process**. Key objectives included **automating damage assessment via image analysis**, implementing **real-time fraud detection capabilities** (as a phased approach), and developing a **predictive model for customer churn**. This AI-driven solution aimed to significantly **reduce operational overhead, accelerate claim processing cycles, and elevate the overall customer experience**. The platform was built leveraging a scalable cloud infrastructure on Google Cloud Platform (GCP), designed for sustained growth and efficient handling of real-time data streams, such as claimant-submitted imagery.

## System Architecture and Operational Workflows

The platform integrates several key components to deliver a seamless and intelligent claims processing experience:

### 1. **User Experience & Data Ingress:**

-   A **Flutter-based mobile application** serves as the primary claimant interface. This allows users to intuitively submit claim images, input requisite details, and track claim progression in real-time.
-   **Firebase Firestore** underpins this interaction by managing real-time metadata, including upload statuses, processing timestamps, and secure file URIs. This ensures data integrity and transparency for both customers and the internal claims adjudication team.

### 2. **Automated Damage Assessment Pipeline:**

This high-throughput, cloud-native pipeline processes image-based claims with robust scalability:

1.  **Secure Image Ingestion**: Claimants upload images within the user interface, directly to **Google Cloud Storage (GCS)**, ensuring secure and durable storage.
2.  **Event-Driven ETL Initiation**: **Google Cloud Functions** are triggered upon new image arrival in GCS, initiating the Extract, Transform, Load (ETL) pipeline.
3.  **Scalable Image Preprocessing**: **Google Dataflow** executes distributed preprocessing tasks on the images. These include resizing, normalisation, and strategic data augmentation (e.g., flipping, cropping, rotation) to enhance dataset robustness for model training and inference.
4.  **AI-Powered Damage Analysis**: Preprocessed images are routed to **Google Vertex AI** for inference. Sophisticated, pre-trained computer vision models (e.g., YOLO, R-CNN architectures) perform object detection, identify areas of damage, and classify claim severity.
5.  **Real-Time Feedback Loop**: Inference results are propagated back, providing immediate insights to the customer via the Flutter app and to a dedicated adjudicator dashboard for review and action.

### 3. **Predictive Analytics Pipelines:**

-   **Customer Churn Prediction (Evolving Batch Processing):** Implemented through a pragmatic, phased approach suited to a startup's initial lack of proprietary data, the churn prediction model began with a rule-based foundation. This initial system leveraged internal business expertise and early operational data (from Firestore and GCS) to provide foundational churn insights and enable customer retention efforts from day one. As the customer base and data volume grew, particularly historical claim data and customer interaction patterns stored in **Google BigQuery**, the plan was to evolve this into a machine learning model. That model was planned and has not been deployed. It would periodically identify customers at high risk of attrition and give retention teams data-driven insights.
-   **Advanced Fraud Detection (Slated for Next Iteration)**: The platform architecture is primed for the seamless integration of an advanced fraud detection module. This future enhancement will employ machine learning to discern anomalous patterns in claim data, providing real-time risk scoring and alerting capabilities for potentially fraudulent submissions.

### 4. **Machine Learning Model Lifecycle Management:**

-   The **Dataflow pipeline** is central to the model training process, transforming raw image and metadata inputs. Augmented and curated data is then supplied to **Vertex AI** for model (re)training and fine-tuning.
-   **Transfer learning** techniques were strategically applied to accelerate development and reduce dependency on vast quantities of proprietary labelled data, leveraging foundational knowledge from established models like YOLO and R-CNN.

## Core Technology Stack

The technology selection prioritised scalability, reliability, operational efficiency, and seamless integration within the Google Cloud ecosystem:

-   **Frontend Application:** Flutter (for cross-platform mobile deployment)
-   **Backend & Real-Time Database:** Firebase Firestore (for dynamic metadata management)
-   **Object Storage:** Google Cloud Storage (GCS) (for claimant images and large data assets)
-   **Scalable Data Processing (ETL):** Google Dataflow
-   **ML Model Training & Serving:** Google Vertex AI
-   **Serverless Compute:** Google Cloud Functions (for event-driven automation)
-   **Data Warehousing & Analytics:** Google BigQuery (for historical data, churn analysis, and large-scale batch processing)
-   **System Monitoring & Observability:** Google Cloud Monitoring & Logging

![Base Architecture](/images/projects/arch.png)

## Key Technical Challenges and Strategic Solutions

Navigating the complexities of an AI-driven platform required addressing several critical challenges:

### 1. **Ensuring Real-Time Performance and Scalability:**

-   **Challenge:** Managing high-volume image uploads and concurrent metadata updates while maintaining low-latency user interactions.
-   **Solution:** A **bifurcated architectural approach** was adopted. Firestore handled real-time metadata and user-facing updates due to its low-latency capabilities. Simultaneously, GCS, Dataflow, and Vertex AI managed the computationally intensive backend processes (image storage, transformation, and model inference), allowing independent scaling based on specific load profiles.

### 2. **Orchestrating Diverse GCP Services:**

-   **Challenge:** Creating a cohesive and efficient workflow across multiple, specialised GCP services (Firestore, GCS, Dataflow, Vertex AI, BigQuery).
-   **Solution:** An **event-driven architecture** was implemented, with Cloud Functions doing two separate jobs. New images landing in GCS triggered the functions that start the ETL. Firestore triggers invoked the functions that orchestrate inference, directing data through Dataflow for transformation and then to Vertex AI. Results were cycled back to Firestore for end-user visibility, while BigQuery served as the central repository for batch analytics and historical data persistence.

### 3. **Addressing Scarcity of Labelled Training Data:**

-   **Challenge:** Insufficient labelled image data to effectively train or fine-tune sophisticated computer vision models from scratch.
-   **Solution:** This was mitigated through a two-pronged strategy: **comprehensive data augmentation** techniques (programmatic generation of diverse image variants) significantly expanded the effective training set size. Concurrently, **transfer learning** from pre-trained models (YOLO, R-CNN) enabled the system to achieve high accuracy with a comparatively smaller custom dataset.

### 4. **Optimising Model Serving Latency:**

-   **Challenge:** Minimising inference latency for large object detection models to ensure a responsive real-time user experience.
-   **Solution:** Models were deployed on **GPU-accelerated Vertex AI endpoints** configured with **auto-scaling** to dynamically adjust to inference demand. Further model optimisation techniques, such as **quantisation and pruning**, were explored and applied to reduce model size and computational footprint without significant degradation in predictive accuracy.

## Demonstrated Impact & Anticipated Value

The MVP successfully demonstrated the transformative potential of AI in the auto insurance domain:

-   **Accelerated Claim Processing:** Achieved an estimated **30% reduction** in average claim processing time, enhancing efficiency for both customers and adjudicators.
-   **Foundation for Enhanced Fraud Detection:** The architecture is designed to support a projected reduction of up to **~40%** in fraudulent claims once the fraud module is deployed.

## Strategic Roadmap and Future Enhancements

The platform is poised for continued evolution with several key enhancements planned:

-   **Implement Google Cloud Pub/Sub:** Introduce Pub/Sub for enhanced asynchronous processing and robust decoupling between GCS events, Dataflow jobs, and Vertex AI pipelines, further increasing system resilience and scalability.
-   **Expand BigQuery Utilisation:** Leverage BigQuery for more sophisticated analytics, including advanced cohort analysis, comprehensive training data versioning, and establishing automated model retraining and drift detection pipelines.
-   **Transition to Real-Time Churn Prediction:** Once the churn model is built, run it in real-time or near real-time, enabling more immediate and targeted customer retention interventions.
-   **Diversification into New Insurance Verticals:** Strategically adapt and extend the core AI platform to address claim processing needs in other insurance lines, such as property, casualty, or health insurance.

----
