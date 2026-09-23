---
title: "Fraud detection in auto insurance"
position: "auto-insurance-startup"
date: 2024-05
featured: false
order: 2
readTime: "10 min read"
description: >-
  A multi-model fraud layer for auto claims — supervised scoring for known patterns, anomaly detection for novel ones, and image analysis for staged damage.
cover: "/images/projects/fraud.jpg"
kpis:
  - value: "~40%"
    label: "projected reduction in fraudulent claims"
chips:
  stack: ["GCP", "Vertex AI", "BigQuery"]
  domain: ["Fraud", "Auto insurance"]
  method: ["Multi-model design", "Precision/recall trade-off"]
---

Fraudulent claims pose a significant challenge in the auto insurance industry, leading to financial losses and diminished customer trust. As part of an AI-driven MVP for an auto insurance startup, we designed a fraud detection framework to identify high-risk claims in near real-time.

**Strategic Approach & Core Architecture:**

-   **Cloud-Native Design (GCP):** Leveraged Google Cloud Platform's serverless and scalable services (GCS for storage, Firestore for real-time metadata, Dataflow for ETL) to ensure efficient, resilient processing of claim data.
-   **Integrated Workflow:** From claim submission via a mobile app, data (images, documents, metadata) flowed through an automated pipeline. This involved GCS for storage, Cloud Functions for triggering processes, Dataflow for data preparation, and Vertex AI for real-time fraud scoring.
-   **Actionable Insights:** High-risk claims triggered immediate notifications to insurance agents via an internal dashboard, enabling prompt investigation and intervention.

---

## Intelligent Fraud Detection: A Multi-Model Strategy

Our system employed a sophisticated, multi-layered approach to fraud detection, combining various machine learning techniques:

-   **Predictive Modelling for Known Fraud Patterns:**
    -   A primary supervised learning model (e.g., gradient boosting methods like XGBoost) was designed to identify claims exhibiting characteristics commonly associated with known fraudulent activities.
    -   Key feature categories included claim amount irregularities, unusual claim frequencies, geographic risk factors, and prior claim history.
-   **Anomaly Detection for Novel Fraud Schemes:**
    -   Unsupervised learning techniques (e.g., autoencoders, one-class SVMs) were utilised to detect outliers and novel or unusual claim patterns that deviate significantly from normal behaviour, helping to uncover emerging fraud tactics.
-   **Advanced Image Analysis for Visual Inconsistencies:**
    -   For claims involving vehicle damage, deep learning models (e.g., Convolutional Neural Networks like Faster R-CNN) were fine-tuned to analyse submitted images. These models identified inconsistencies in damage patterns, helping to flag potentially staged accidents or manipulated visual evidence.

**Model Training & Performance Focus:**

-   Training data was to be aggregated and prepared in BigQuery.
-   Model evaluation prioritised a balance between minimising false positives (incorrectly flagging legitimate claims) and false negatives (missing actual fraud), focusing on metrics like precision, recall, and F1-score.

---

## Operational Excellence: Monitoring, Retraining & Impact

-   **Continuous System Monitoring:** Designed robust monitoring (using Google Cloud Monitoring & Logging) for system latency, error rates, and model performance drift to ensure sustained effectiveness.
-   **Adaptive Learning & Retraining:** A regular retraining schedule (e.g., monthly) was designed to incorporate new claim data and adjudicator feedback, allowing models to adapt to evolving fraud patterns and improve accuracy over time via Vertex AI and Dataflow.

**Projected Business Impact:**

-   Projected up to **~40% reduction** in fraudulent claims on deployment.

---

## Key Learnings & Approach

-   Successfully addressed challenges like **data imbalance** in fraud datasets using appropriate mitigation techniques (e.g., over-sampling).
-   Ensured **model interpretability** using methods like SHAP to provide transparency and build stakeholder trust in AI-driven decisions.
-   Managed **integration complexity** by closely collaborating across business and engineering teams to seamlessly embed the fraud detection pipeline into core operational workflows.

---
