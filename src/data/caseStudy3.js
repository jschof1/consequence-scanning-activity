let caseStudy3 = {
  "title": "The AI (Artificial Interviewer)",
  "objectives": "An organisation is planning to introduce an AI system to perform an initial filter on job applications made in order to reduce the amount of applications that require human interview. The purpose of the system is to perform an initial assessment of a candidate's application, including their CV. The application process will ask applicants to respond to scenario based questions to assess their skills and behaviours against the relevant person specification. Certain aspects of the CV will be anonymised in order to manage potential bias in the system. This includes suppression of personal details. Other information collected as part of the process, such as those related to Diversity and Inclusion are not collected and used as part of the algorithm. Objective: To enable a scalable and efficient job application process for the organisation to increase quality of the process, for the organisation and the applicant, as well as deliver cost and resource savings.",
  "stakeholders": [
    {"text":"HR Team", "type":"Internal"},
    {"text":"Hiring Manager", "type":"Internal"},
    {"text":"IT Team", "type":"Internal"},
    {"text": "Applicants", "type": "External"},
    {"text":"Application Portal", "type": "External"},
    {"text": "Recruitment Agency", "type":"External"}
  ],
  "dataBeingUsed": [
    "Job history (titles, organisation, length of service, etc)",
    "Previous salary",
    "Education history (qualification, awarder, etc)",
    "Hobbies and interests, where provided",
    "Responses to questions",
    "Job applied for",
    "Number of roles",
    "Salary offered"
  ],
  "intendedConsequences": [
    "Increase efficiency in the process, relieving pressure on resource and increase cost savings",
    "Maintain consistency in the assessment approach - no external impact or pressures on the assessors",
    "Reduce potential for personal bias from the panel of assessors",
    "Improve efficiency and effectiveness in feedback mechanisms to support candidates through the process",
    "Enable large scale recruitment drives for specific roles (e.g. temporary holiday roles)"
  ],
  "unintendedConsequences": [
    {
      "description": "Savings associated with recruitment are diminished if the right candidate is filtered out by the system prior to human assessment",
      "impact": ["High", "Medium", "Low"],
      "selectedImpact": "",
      "outcome": ["Positive", "Negative"],
      "selectedOutcome": "",
      "likelihood": ["High", "Medium", "Low"],
      "selectedLikelihood": "",
      "action": "Implement a review process for candidates who are filtered out of the system with a relevant outcome to assess system validity",
      "AIM": ["Act", "Influence", "Monitor"],
      "selectedAIM": "",
      "timeline": ["3 months", "6 months", "1 year", "2 years"],
      "selectedTimeline": "",
      "KPI": ""
    },
    {
      "description": "Data used to train the AI may reflect past bias in the process",
      "impact": ["High", "Medium", "Low"],
      "selectedImpact": "",
      "outcome": ["Positive", "Negative"],
      "selectedOutcome": "",
      "likelihood": ["High", "Medium", "Low"],
      "selectedLikelihood": "",
      "action": "",
      "AIM": ["Act", "Influence", "Monitor"],
      "selectedAIM": "",
      "timeline": ["3 months", "6 months", "1 year", "2 years"],
      "selectedTimeline": "",
      "KPI": ""
    },
    {
      "description": "Data reviewed from CVs might introduce elements of bias by profiling individuals based on the information received",
      "impact": ["High", "Medium", "Low"],
      "selectedImpact": "",
      "outcome": ["Positive", "Negative"],
      "selectedOutcome": "",
      "likelihood": ["High", "Medium", "Low"],
      "selectedLikelihood": "",
      "action": "Remove CV information from the algorithm and focus only on reviewing the responses to questions related to the role",
      "AIM": ["Act", "Influence", "Monitor"],
      "selectedAIM": "",
      "timeline": ["3 months", "6 months", "1 year", "2 years"],
      "selectedTimeline": "",
      "KPI": ""
    },
    {
      "description": "Potential discrimination against individuals who may need additional support through the process (e.g. those with dyslexia)",
      "impact": ["High", "Medium", "Low"],
      "selectedImpact": "",
      "outcome": ["Positive", "Negative"],
      "selectedOutcome": "",
      "likelihood": ["High", "Medium", "Low"],
      "selectedLikelihood": "",
      "actions": "Review training data and remove identifiers related to people",
      "AIM": ["Act", "Influence", "Monitor"],
      "selectedAIM": "",
      "timeline": ["3 months", "6 months", "1 year", "2 years"],
      "selectedTimeline": "",
      "KPI": ""
    }
  ]
}

export default caseStudy3;