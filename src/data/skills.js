// src/data/skills.js
// Eight skill categories. No proficiency scores or ratings — skills listed reflect
// professional and academic experience as documented in work history and projects.

export const SKILLS = [
  {
    id: "programming",
    label: "Programming",
    items: ["Python", "SQL", "R", "C++", "Java", "JavaScript"],
  },
  {
    id: "ml",
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
    label: "Cloud & DevOps",
    items: ["GCP", "AWS", "Azure", "Docker", "Git", "GitHub"],
  },
];
