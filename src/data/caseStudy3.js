let caseStudy3 = {
  title: "The AI (Artificial Interviewer)",
  objectives:
    "An organisation is planning to introduce an AI system to perform an initial filter on job applications made in order to reduce the amount of applications that require human interview. The purpose of the system is to perform an initial assessment of a candidate's application, including their CV. The application process will ask applicants to respond to scenario based questions to assess their skills and behaviours against the relevant person specification. Certain aspects of the CV will be anonymised in order to manage potential bias in the system. This includes suppression of personal details. Other information collected as part of the process, such as those related to Diversity and Inclusion are not collected and used as part of the algorithm.\n\nObjective: To enable a scalable and efficient job application process for the organisation to increase quality of the process, for the organisation and the applicant, as well as deliver cost and resource savings.",
  stakeholders: [
    { text: "HR Team", type: "Internal" },
    { text: "Hiring Manager", type: "Internal" },
    { text: "IT Team", type: "Internal" },
    { text: "Applicants", type: "External" },
    { text: "Application Portal", type: "External" },
    { text: "Recruitment Agency", type: "External" },
  ],
  dataUsed:
    "- Job history (titles, organisation, length of service, etc)\n- Previous salary\n- Education history (qualification, awarder, etc)\n- Hobbies and interests, where provided\n- Responses to questions\n- Job applied for\n- Number of roles\n- Salary offered",
  intendedConsequences: [
    { description: "Increase efficiency in the process, relieving pressure on resource and increase cost savings"},
    { description: "Maintain consistency in the assessment approach - no external impact or pressures on the assessors"},
    { description: "Reduce potential for personal bias from the panel of assessors"},
    { description: "Improve efficiency and effectiveness in feedback mechanisms to support candidates through the process"},
    { description: "Enable large scale recruitment drives for specific roles (e.g. temporary holiday roles)"},
  ],
  unintendedConsequences: [
    {
      description:
        "Savings associated with recruitment are diminished if the right candidate is filtered out by the system prior to human assessment",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement a review process for candidates who are filtered out of the system with a relevant outcome to assess system validity",
        date: "",
        stakeholder: "HR Team",
        selectedDate: "14/01/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Data used to train the AI may reflect past bias in the process",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description: "",
        date: "",
        stakeholder: "",
        selectedDate: "",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Data reviewed from CVs might introduce elements of bias by profiling individuals based on the information received",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Remove CV information from the algorithm and focus only on reviewing the responses to questions related to the role",
        date: "",
        stakeholder: "HR Team",
        selectedDate: "01/02/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Potential discrimination against individuals who may need additional support through the process (e.g. those with dyslexia)",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Review training data and remove identifiers related to people",
        date: "",
        stakeholder: "IT Team",
        selectedDate: "01/06/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
  ],
};

export default caseStudy3;
