// src/data/projects.js
// All verified project information. Do not invent metrics, URLs, or demo links.
// Visual covers are original illustrations rendered by src/components/visuals
// (keyed by project id) — they are conceptual, not screenshots or model output.

// Filter categories derived from project tags (curated for the filter bar)
export const CATEGORIES = [
  "All",
  "AI & Automation",
  "Data Engineering",
  "Forecasting",
  "Classification",
  "Clustering",
  "Computer Vision",
  "Regression",
  "Algorithms",
  "ETL",
];

// --- Featured projects (displayed in the Featured section, in order) ---
export const FEATURED_PROJECTS = [
  {
    id: "dataguard-ai",
    title: "DataGuard AI",
    fullTitle: "DataGuard AI — Automated Credit Risk Data Quality Monitoring",
    summary:
      "Automated data quality monitoring system for credit risk datasets, detecting anomalies in PD, LGD and EAD metrics with orchestrated validation workflows and an interactive monitoring dashboard.",
    details:
      "Containerized Python pipeline (FastAPI + PostgreSQL + n8n) that validates synthetic credit risk records, classifies anomaly severity, stores historical results and surfaces findings in a Streamlit dashboard.",
    metric: "1,001 Records",
    tags: ["AI & Automation", "Data Engineering", "Python"],
    featured: true,
    links: {
      code: "https://github.com/nikhildahiyaa/dataguard-ai-n8n",
      demo: null,
    },
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "n8n",
      "Streamlit",
      "Docker",
      "Docker Compose",
      "SQL",
      "REST APIs",
      "Pytest",
    ],
    // Case study data — rendered by CaseStudySheet
    caseStudy: {
      businessProblem:
        "Credit risk portfolios require consistent, validated data inputs for accurate risk measurement. Manual data quality checks are time-consuming, error-prone and difficult to scale across large datasets with multiple interrelated validation rules.",
      objective:
        "Build an automated data quality monitoring system that identifies anomalies in synthetic credit risk datasets, validates financial risk metrics, orchestrates validation workflows and provides an interactive monitoring dashboard.",
      architecture: [
        { step: 1, name: "Synthetic Data", description: "Credit risk test dataset with deliberately introduced anomalies covering PD, LGD, EAD and credit rating fields." },
        { step: 2, name: "PostgreSQL", description: "Data storage and retrieval for raw credit risk records and anomaly output." },
        { step: 3, name: "n8n Workflow", description: "Automated orchestration of validation pipeline execution without manual intervention." },
        { step: 4, name: "FastAPI Engine", description: "Validation API endpoints performing all data quality checks against configurable thresholds." },
        { step: 5, name: "PostgreSQL Anomaly Storage", description: "Anomaly results persisted for historical tracking and trend analysis." },
        { step: 6, name: "Streamlit Dashboard", description: "Interactive monitoring UI for anomaly review, severity filtering and historical analysis." },
      ],
      validationRules: [
        "Missing and invalid probability of default (PD) values",
        "Invalid loss given default (LGD) values outside the [0, 1] range",
        "Negative exposure at default (EAD) detection",
        "Duplicate borrower identification",
        "Invalid credit rating classification",
        "Configurable validation thresholds per rule type",
        "Anomaly severity classification (critical, warning, informational)",
      ],
      dataset:
        "Synthetic financial data containing approximately 1,001 records with deliberately introduced data quality anomalies. The system does not contain confidential employer or customer information.",
      results: [
        "Automated validation of synthetic credit risk datasets containing approximately 1,001 records",
        "Successfully detected multiple deliberately introduced data quality anomalies across all validation categories",
        "Containerized deployment via Docker Compose enabling consistent, reproducible execution",
        "Historical anomaly storage enabling trend analysis and audit trails",
        "Interactive Streamlit dashboard providing real-time visibility into data quality status",
        "Automated Pytest suite validating core validation logic",
      ],
      limitations: [
        "Built on synthetic data only — not validated against proprietary or production datasets",
        "Validation thresholds require domain expertise to configure appropriately",
        "Designed for batch validation rather than real-time streaming ingestion",
        "Dashboard is locally deployed; not currently hosted on a public endpoint",
      ],
      futureEnhancements: [
        "Integration with real-time data streaming pipelines",
        "Machine learning-based anomaly detection to complement rule-based validation",
        "Alerting and notification system for critical anomaly thresholds",
        "Support for additional credit risk metrics and regulatory frameworks",
        "Cloud deployment for production scalability",
        "Role-based access control for multi-user monitoring environments",
      ],
    },
  },
  {
    id: "bcmea-forecasting",
    title: "BCMEA Labour Demand Forecasting",
    fullTitle: "BCMEA Labour Demand Forecasting",
    summary:
      "Reduced forecast error from approximately 40% MAPE to 7.45% across dock and vessel workstreams by integrating 2M+ payroll records, 60K+ gang allocations and 4K+ vessel logs.",
    details:
      "Merged multi-source payroll and operational data; engineered holiday and vessel-cluster features; backtested models and automated reporting pipeline.",
    metric: "7.45% MAPE",
    tags: ["Forecasting", "Python", "Time Series"],
    featured: true,
    links: {
      code: "https://github.com/nikhildahiyaa/BCMEA-Labor-Forecast",
      demo: null,
    },
    technologies: ["Python", "Prophet", "Scikit-learn", "Pandas", "NumPy", "SQL", "Jupyter"],
    caseStudy: {
      businessProblem:
        "The BC Maritime Employers Association needed accurate labour demand forecasts for dock and vessel workstreams. Legacy forecasting methods produced approximately 40% MAPE, making operational planning unreliable and costly.",
      objective:
        "Develop a machine learning-based forecasting system integrating multiple operational data sources to substantially reduce forecast error.",
      dataset:
        "2M+ payroll records, 60K+ gang allocations and 4K+ vessel logs merged into a unified analytical dataset.",
      methodology: [
        "Data integration: merged payroll, gang allocation and vessel log datasets",
        "Feature engineering: holiday effects, vessel cluster features, lag variables",
        "Model development: time series modelling with Prophet and statistical models",
        "Backtesting framework for model validation and error measurement",
        "Automated reporting pipeline for operational use",
      ],
      results: [
        "Reduced forecast MAPE from approximately 40% to 7.45% across dock and vessel workstreams",
        "Integrated 2M+ payroll records, 60K+ gang allocations and 4K+ vessel logs into a unified dataset",
        "Developed holiday and vessel-cluster features that improved model accuracy",
        "Implemented backtesting framework and automated reporting",
      ],
      limitations: [
        "Model performance is specific to BCMEA operational patterns and data characteristics",
        "Forecast accuracy depends on data quality and completeness of input sources",
      ],
      futureEnhancements: [
        "Real-time data integration for more frequent forecasting cycles",
        "Ensemble methods combining multiple model outputs",
        "Automated anomaly detection for data quality monitoring",
      ],
    },
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation (RFM + K-Means)",
    fullTitle: "Customer Segmentation Using RFM and K-Means Clustering",
    summary:
      "Identified 21% 'Best Customers' contributing 50%+ of revenue using RFM feature engineering and K-Means clustering across 135K+ transaction records.",
    details:
      "Cleaned 135K+ incomplete rows; built Recency, Frequency and Monetary features; applied K-Means clustering to generate actionable customer cohorts for targeted campaigns.",
    metric: "50%+ Revenue Concentration",
    tags: ["Clustering", "Python", "Marketing"],
    featured: true,
    links: {
      code: "https://github.com/nikhildahiyaa/Customer-Segmentation-Using-RFM-and-K-Means-Clustering",
      demo: null,
    },
    technologies: ["Python", "Scikit-learn", "K-Means", "Pandas", "Matplotlib", "Seaborn"],
    caseStudy: {
      businessProblem:
        "Without structured customer segmentation, marketing resources are allocated uniformly across the customer base, leading to inefficient spend and missed opportunities to retain high-value customers.",
      objective:
        "Segment customers by purchasing behaviour using RFM analysis and K-Means clustering to identify high-value cohorts and inform targeted marketing strategies.",
      dataset:
        "Retail transaction dataset with 135K+ records. Data cleaning addressed incomplete rows, duplicate transactions and inconsistent formats.",
      methodology: [
        "Data cleaning: removed incomplete and duplicate records across 135K+ rows",
        "Feature engineering: computed Recency, Frequency and Monetary (RFM) scores per customer",
        "Clustering: applied K-Means with elbow method for optimal k selection",
        "Visualisation: segment profiles and revenue contribution analysis",
      ],
      results: [
        "Identified 21% of customers as 'Best Customers' contributing 50%+ of total revenue",
        "Generated actionable customer cohorts for targeted marketing campaigns",
        "Provided clear segment profiles enabling differential marketing strategies",
      ],
      limitations: [
        "RFM model does not capture product category preferences or return behaviour",
        "Cluster assignments are static; real-time re-scoring requires pipeline automation",
      ],
      futureEnhancements: [
        "Dynamic RFM re-scoring pipeline for continuous segmentation",
        "Integration with CRM systems for automated campaign targeting",
        "Churn prediction model layered on top of segment profiles",
      ],
    },
  },
  {
    id: "airbnb-prediction",
    title: "Airbnb Booking Prediction",
    fullTitle: "Airbnb Booking Prediction",
    summary:
      "Built a booking prediction model across 213K users achieving 69% accuracy (AUC 0.735); identified that desktop users are 30% more likely to book.",
    details:
      "Engineered behavioural features; evaluated logistic regression and random forest classifiers; surfaced device-type and seasonal drivers for marketing and UX optimisation.",
    metric: "AUC 0.735",
    tags: ["Classification", "Python", "Product Analytics"],
    featured: true,
    links: {
      code: "https://github.com/nikhildahiyaa/Airbnb-Booking-Prediction",
      demo: null,
    },
    technologies: ["Python", "Scikit-learn", "Logistic Regression", "Random Forest", "Pandas"],
    caseStudy: {
      businessProblem:
        "Understanding which users are likely to complete a booking enables targeted interventions, optimised marketing spend and improved user experience design.",
      objective:
        "Develop a classification model to predict Airbnb booking completion and identify the key behavioural and demographic drivers of conversion.",
      dataset:
        "213K user records including session behaviour, device type, search patterns and demographic information.",
      methodology: [
        "Feature engineering: session behaviour, device type, temporal and demographic features",
        "Model evaluation: logistic regression and random forest classifiers",
        "Model selection: AUC-based evaluation with cross-validation",
        "Interpretability: feature importance analysis to surface conversion drivers",
      ],
      results: [
        "Achieved 69% accuracy with AUC of 0.735 on a 213K user dataset",
        "Identified desktop users as 30% more likely to complete a booking",
        "Surfaced device type and seasonal patterns as key conversion drivers",
        "Provided actionable insights for marketing targeting and UX optimisation",
      ],
      limitations: [
        "Model trained on historical data; performance may degrade with behavioural shifts",
        "Class imbalance in booking outcomes may affect recall for minority class",
      ],
      futureEnhancements: [
        "Gradient boosting models (XGBoost, LightGBM) for improved accuracy",
        "Real-time scoring pipeline for in-session conversion optimisation",
        "A/B testing framework to validate model-driven interventions",
      ],
    },
  },
  {
    id: "image-redaction",
    title: "Intelligent Image Redaction",
    fullTitle: "Intelligent Image Redaction Tool",
    summary:
      "OpenCV and EasyOCR pipeline achieving approximately 95% ID detection accuracy with approximately 40% reduction in manual processing time.",
    details:
      "Regex-enhanced OCR, automated redaction overlays, batch processing pipeline and simple GUI built for compliance document workflows.",
    metric: "95% Accuracy",
    tags: ["Computer Vision", "Python", "OCR"],
    featured: true,
    links: {
      code: "https://github.com/nikhildahiyaa/Image-Redaction-Project",
      demo: null,
    },
    technologies: ["Python", "OpenCV", "EasyOCR", "Regular Expressions", "Tkinter"],
    caseStudy: {
      businessProblem:
        "Manual redaction of sensitive identifiers in document images is time-consuming, inconsistent and difficult to scale in compliance-driven workflows.",
      objective:
        "Develop an automated image redaction pipeline using computer vision and OCR to detect and redact sensitive identifiers with high accuracy.",
      dataset:
        "Document images containing personal identifiers. The system processes images through a preprocessing, detection and redaction pipeline.",
      methodology: [
        "Image preprocessing: normalisation, contrast enhancement and noise reduction using OpenCV",
        "Text detection: EasyOCR for robust multi-format text extraction",
        "Pattern matching: regex-based identification of sensitive identifier patterns",
        "Redaction: automated overlay generation to obscure detected sensitive regions",
        "Batch pipeline: processing multiple documents with a simple GUI interface",
      ],
      results: [
        "Achieved approximately 95% detection accuracy across test document set",
        "Reduced manual review processing time by approximately 40%",
        "Supported privacy compliance through automated document processing",
        "Developed batch processing capability for high-volume document workflows",
      ],
      limitations: [
        "OCR accuracy may degrade on low-quality or non-standard document scans",
        "Regex pattern library requires updates for new identifier formats",
        "GUI is designed for local use; not built for web deployment",
      ],
      futureEnhancements: [
        "Deep learning-based detection for improved accuracy on varied document types",
        "Support for PDF and multi-page document processing",
        "Cloud-based API endpoint for integration with document management systems",
      ],
    },
  },
];

// --- Remaining projects (displayed in the All Projects grid) ---
export const OTHER_PROJECTS = [
  {
    id: "box-office",
    title: "Box Office Revenue Prediction",
    summary:
      "Linear regression with feature engineering; early-week advertising shows approximately 15% stronger weekend ticket sales impact.",
    details:
      "Scraped and cleaned movie features; explored lagged advertising effects; regression with diagnostic analysis.",
    metric: "~15% Ad Lift",
    tags: ["Regression", "Python"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/Box-Office-Revenue-Prediction-Using-Linear-Regression-in-ML",
      demo: null,
    },
    technologies: ["Python", "Scikit-learn", "Pandas", "Regression", "Feature Engineering"],
  },
  {
    id: "yaip",
    title: "YAIP — Yet Another Image Processor",
    summary:
      "CLI tool for common image transforms; speed and developer-experience focused with 40% processing time reduction.",
    details: "OpenCV wrapper with resize, filters, format conversions and simple command-line flags.",
    metric: "40% Faster",
    tags: ["Computer Vision", "Python"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/Yet-Another-Image-Processor-YAIP-",
      demo: null,
    },
    technologies: ["Python", "OpenCV", "CLI"],
  },
  {
    id: "data-compression",
    title: "Data Compression Performance Analysis",
    summary:
      "Benchmarked compression codecs on an organisational dataset; analysed speed vs. size trade-offs with a repeatable test suite.",
    details:
      "Repeatable benchmark tests, comparison plots and codec recommendation based on performance profile.",
    metric: "Benchmark Study",
    tags: ["Data Engineering", "Python"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/Data-Compression-Performance-Analysis-for-Organizations-Dataset-",
      demo: null,
    },
    technologies: ["Python", "Pandas", "Performance Analysis"],
  },
  {
    id: "tsp-solver",
    title: "Traveling Salesperson Problem Solver",
    summary:
      "Heuristic solvers for TSP using nearest-neighbour and 2-opt algorithms, comparing tour quality against compute time.",
    details: "Implemented and compared heuristic approaches with route plotting and performance analysis.",
    metric: "2-opt Heuristic",
    tags: ["Algorithms", "Optimization"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/Traveling-Salesperson-Problem-TSP-Solver",
      demo: null,
    },
    technologies: ["C++", "Algorithms", "Graph Theory"],
  },
  {
    id: "fifteen-puzzle",
    title: "Fifteen Puzzle Solver",
    summary:
      "Classic state-space search with A* and IDA* heuristics; Manhattan distance analysis of branching and memory trade-offs.",
    details: "Implemented A* and IDA* search with Manhattan distance; analysed branching factor and memory consumption.",
    metric: "A* / IDA*",
    tags: ["Algorithms"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/Fifteen-Puzzle-Solver",
      demo: null,
    },
    technologies: ["Java", "A* Search", "Heuristics"],
  },
  {
    id: "web-scraping-r",
    title: "Web Scraping with R",
    summary:
      "Tidyverse and rvest pipelines for clean, repeatable multi-page web scrapes with CSV and Parquet output.",
    details: "Multi-page scraping with tidy ETL transformations and structured data export.",
    metric: "ETL Pipeline",
    tags: ["ETL", "R"],
    featured: false,
    links: {
      code: "https://github.com/nikhildahiyaa/-Web-Scraping-with-R",
      demo: null,
    },
    technologies: ["R", "rvest", "Tidyverse", "ETL"],
  },
];

// Combined list for components that iterate all projects
export const ALL_PROJECTS = [...FEATURED_PROJECTS, ...OTHER_PROJECTS];

