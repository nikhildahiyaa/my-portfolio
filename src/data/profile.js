// src/data/profile.js
// Central source of truth for all public-facing personal information.
// Update this file to propagate changes across the entire site.

export const PROFILE = {
  name: "Nikhil Dahiya",
  title: "Data Scientist | Credit Risk & Analytics",
  headline: "Turning complex data into intelligent solutions.",
  intro:
    "I specialize in transforming complex datasets into actionable insights through predictive modelling, credit risk analytics, scalable data pipelines, business intelligence and intelligent automation.",

  about: [
    "I am a Data Science graduate from Simon Fraser University with professional experience in financial services, credit risk analytics, machine learning, data engineering and business intelligence.",
    "My professional experience spans ATB Financial, Simon Fraser University, the University of British Columbia and Ernst & Young.",
    "I specialize in developing predictive models, scalable data pipelines, automated analytical workflows and business intelligence solutions. My work includes credit risk modelling, portfolio stress testing, labour demand forecasting, customer segmentation and computer vision.",
    "I enjoy solving complex business problems and translating analytical insights into practical business decisions. Beyond technical expertise, I value curiosity, collaboration, adaptability and continuous learning.",
  ],

  roleWords: [
    "Data Scientist",
    "Data Analyst",
    "Credit Risk Analyst",
    "Business Analyst",
    "Machine Learning",
    "Data Engineering",
    "Business Intelligence",
    "AI & Automation",
  ],

  // Update location here to change it site-wide
  location: "Vancouver, BC · Toronto, ON",

  email: "dahiya5166@gmail.com",

  socials: {
    github: "https://github.com/nikhildahiyaa",
    linkedin: "https://www.linkedin.com/in/nikhil-dahiya/",
    resume: "/nikhil-dahiya-resume.pdf",
  },

  heroStats: [
    { value: "2M+",   label: "Records Processed",   context: "BCMEA Labour Forecasting" },
    { value: "7.45%", label: "Forecast MAPE",        context: "vs ~40% legacy baseline" },
    { value: "95%",   label: "OCR Accuracy",         context: "EY Document Redaction" },
    { value: "5,176", label: "Research Participants", context: "UBC Clinical Cohort" },
  ],

  education: [
    {
      institution: "Simon Fraser University",
      degree: "BSc, Data Science",
      period: "Jan 2021 – Apr 2025",
      location: "Burnaby, BC",
      highlights: [
        "Statistics, Machine Learning, Data Mining, Algorithms",
        "Databases, Data Engineering, Cloud (AWS/GCP)",
        "Capstone: BCMEA Labour Demand Forecasting — 7.45% MAPE",
      ],
    },
  ],

  certifications: [
    {
      name: "IBM Data Science Professional Certificate",
      issuer: "IBM / Coursera",
      date: "Oct 2025",
    },
  ],

  leadership: [
    {
      role: "Executive",
      organization: "SFU Data Science Student Club",
      period: "Apr 2024 – Apr 2025",
      description: "Mentored 60+ students · Led Python, SQL, and ML workshops",
    },
  ],
};
