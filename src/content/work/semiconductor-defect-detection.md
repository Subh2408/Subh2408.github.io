---
title: "Real-time defect detection in semiconductors"
position: "quantiphi"
date: 2021-06
featured: true
order: 2
readTime: "3 min read"
description: >-
  Built the model training flow of an image analytics backbone for a semiconductor manufacturer, so defect detection models could be retrained and deployed without hand-holding.
cover: "/images/projects/semiconductor.jpg"
kpis:
  - value: "~1 sec"
    label: "real-time prediction latency"
  - value: "$2.5M"
    label: "client account expansion"
chips:
  stack: ["GCP", "Vertex AI", "Dataflow", "TFX", "Cloud Composer", "TensorBoard"]
  domain: ["Semiconductor", "MLOps"]
  method: ["Pipeline design", "Experiment tracking"]
---

Engaged with a leading **semiconductor client** to architect and implement a critical **"Model Training Flow"** section of their broader Image Analytics Backbone project. The objective was to build a robust, semi-automated MLOps pipeline on Google Cloud Platform (GCP), specifically designed to handle the training, monitoring, and deployment of image analysis models. This initiative aimed to significantly accelerate analysis cycles, improve the speed and accuracy of defect detection in their manufacturing processes, contributing to **substantial cost savings** through early issue identification and optimized resource utilization.

---
![Silicon wafer under inspection](/images/projects/wafer.jpeg)

## Business Need & MLOps Vision

The **semiconductor client** required a sophisticated MLOps pipeline to empower their data science teams. The goal was a semi-automated system that could efficiently manage:

-   **Scalable Data Pipelining and Preprocessing** for large image datasets.
-   **Distributed ML Training and Retraining** utilizing GCP's modern AI infrastructure (transitioning to the newly introduced Vertex AI from Unified AI Platform).
-   **Comprehensive ML Pipeline Monitoring** with capabilities for tracking metrics, distributions, and model behavior (e.g., via TensorBoard).
-   **Streamlined Model Exporting, Deployment, and Inference** supporting both online (with **~1-second prediction latency for real-time defect detection**) and batch modes.

The solution needed to be developed using industry-best MLOps practices, with options for orchestration via **TensorFlow-Estimator with Cloud Composer** and **TensorFlow-Extended (TFX) with Vertex AI Pipelines (formerly Managed Pipelines)**, including support for experiment tracking.

---

## Core MLOps Pipeline Architecture & Deliverables

Our team focused on delivering the "Model Training Flow," encompassing the following key stages and deliverables on GCP:

1.  **Data Pipeline and Preprocessing:**
    -   Designed robust data ingestion and preprocessing pipelines using **Google Dataflow** and **Cloud Storage (GCS)** to handle large image datasets.
2.  **Model Training Orchestration:**
    -   Enabled distributed training on **Vertex AI** (incorporating AI Platform Training, AI Notebooks, and exploring AutoML).
    -   Facilitated hyperparameter optimization and configurable training runs.
3.  **Model Pipeline Monitoring & Development:**
    -   Integrated **TensorBoard** within Vertex AI for comprehensive monitoring of training runs.
4.  **Model Management & Deployment:**
    -   **Model Exporting & Deployment (Production):** Implemented strategies on Vertex AI for both online (targeting **~1-second real-time defect detection latency**) and batch modes.
    -   **Model Retraining & Validation:** Established processes for model retraining, validation, and versioning.
5.  **Orchestration & Operationalization:**
    -   Delivered **Managed Pipelines** leveraging TF-Estimator with Cloud Composer and TFX with Vertex AI Pipelines for robust, end-to-end MLOps orchestration.
    -   Ensured end-to-end testing, comprehensive documentation, and a formal handover.

---

## Key Success Criteria & Technical Performance

The project adhered to specific performance and operational criteria crucial for the **semiconductor client**:

-   **Data Handling:** Processing large image files (JPEGs, PNGs for training; Base64 for real-time prediction).
-   **Training Cadence & Scale:** Accommodating weekly ingestion of training data and extensive training runs.
-   **Model Versioning & Lifecycle:** Implementing robust model archiving and performance-based promotion.
-   **Deployment & Inference Performance:** Critical success factor was achieving **~1-second latency for real-time defect detection**, alongside support for batch prediction, across numerous internal tools and sites.

---

## Business Outcome & Strategic Impact

The successful delivery of this MLOps Model Training Flow provided the **semiconductor client** with:

-   **Accelerated Defect Detection & Significant Cost Savings:** A semi-automated pipeline enabling faster, more accurate analysis over millions of images daily, directly contributing to quicker identification of manufacturing defects and leading to substantial operational cost savings.
-   **Enhanced Data Science Productivity:** A standardized and efficient MLOps framework, reducing manual effort in managing image analysis models.
-   **Scalable and Future-Proof AI Infrastructure:** Leveraging GCP's latest Vertex AI capabilities for current and future image analytics use cases.
-   **Improved Model Governance & High-Performance Inference:** Systematic versioning, monitoring, and deployment capabilities, including meeting the stringent **~1-second latency target for real-time defect detection**.
-   **Substantial Client Account Expansion:** The demonstrated success and strategic value of this engagement directly led to a **significant expansion of the client account, resulting in over $2.5 million in subsequent project value and services.**

This ~22-week project successfully established a critical component of the **semiconductor client's** Image Analytics Backbone, empowering them to harness advanced AI for their critical analysis processes more effectively and economically, and solidifying a strong, ongoing partnership.


---
