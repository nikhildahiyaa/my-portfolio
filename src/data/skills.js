// src/data/skills.js
// Eight skill categories. No proficiency scores or ratings — skills listed reflect
// professional and academic experience as documented in work history and projects.
// `summary` is a short, neutral description of the category (presentation copy).

export const SKILLS = [
  {
    id: "programming",
    summary: "Core languages for analysis, modelling and tooling.",
    label: "Programming",
    items: ["Python", "SQL", "R", "C++", "Java", "JavaScript"],
  },
  {
    id: "ml",
    summary: "Supervised and unsupervised modelling for prediction and segmentation.",
    label: "Machine Learning",
    items: [
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "LightGBM",
      "TensorFlow",
      "Predictive Modelling",
      "Classification",
      "Clustering",
    ],
  },
  {
    id: "data-engineering",
    summary: "Pipelines, warehousing and transformation of large datasets.",
    label: "Data Engineering",
    items: [
      "Google BigQuery",
      "PostgreSQL",
      "Spark",
      "Airflow",
      "Databricks",
      "ETL/ELT",
      "Pandas",
      "NumPy",
    ],
  },
  {
    id: "bi",
    summary: "Dashboards and reporting that put analysis in front of decision makers.",
    label: "Business Intelligence",
    items: [
      "Power BI",
      "Tableau",
      "Excel",
      "DAX",
      "Power Query",
      "Dashboard Development",
    ],
  },
  {
    id: "credit-risk",
    summary: "IFRS 9 expected credit loss inputs, risk parameters and portfolio stress testing.",
    label: "Credit Risk Analytics",
    items: [
      "IFRS 9",
      "PD",
      "LGD",
      "EAD",
      "Expected Credit Loss",
      "Stress Testing",
      "Scenario Analysis",
      "Moody's Portfolio Studio",
    ],
  },
  {
    id: "stats",
    summary: "Inference, experimentation and time-series methods.",
    label: "Statistical Analytics",
    items: [
      "Regression",
      "Hypothesis Testing",
      "Time Series",
      "A/B Testing",
      "ANOVA",
      "Meta-Analysis",
    ],
  },
  {
    id: "ai-automation",
    summary: "Workflow orchestration, APIs and computer-vision automation.",
    label: "AI & Automation",
    items: [
      "n8n",
      "FastAPI",
      "REST APIs",
      "OpenCV",
      "OCR",
      "EasyOCR",
      "Streamlit",
    ],
  },
  {
    id: "cloud-devops",
    summary: "Cloud platforms, containers and version control.",
    label: "Cloud & DevOps",
    items: ["GCP", "AWS", "Azure", "Docker", "Git", "GitHub"],
  },
];
