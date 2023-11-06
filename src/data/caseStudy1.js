let caseStudy1 = {
  title: "A Charitable Transformation",
  selectedFile: null,
  selectedStudy: null,
  objectives:
    "An animal charity is going through a digital transformation process. This charity supports animal care and rehoming. Therefore it holds data on the animals, the users of the service such as those who hand over animals, and those who foster or adopt, as well as data associated with volunteers, donors and broader stakeholders. As part of this transformation the charity wants to retire redundant platforms and consolidate all data and data processes into a single platform. This includes employee record systems, Customer Relationship Management (CRM) platforms, Volunteer Management Systems (VMS) as well as donations, animal welfare data, data supplied by local authorities and information related to internal processes and practices.\n\nObjective: To reduce costs and increase efficiencies by simplifying the digital estate of the charity and reduce the redundancies in existing processes to mitigate risks. The digital transformation should maintain stakeholder privacy and maintain performance in relation to animal care.",
  stakeholders: [
    { text: "Charity Digital Team", type: "Internal" },
    { text: "CFO", type: "Internal" },
    { text: "CTO", type: "Internal" },
    { text: "Board Members", type: "Internal" },
    { text: "Volunteers", type: "Internal" },
    { text: "L&D Team", type: "Internal" },
    { text: "Animal Team", type: "Internal" },
    { text: "Adopters", type: "External" },
    { text: "Donors", type: "External" },
    { text: "Charity Partners)", type: "External" },
    { text: "IT Team", type: "External" },
  ],
  dataUsed:
    "The data the charity holds includes (amongst others): Financial Donors: personal details, level of involvement, etc; Volunteers: personal details, experience, etc; Adopters: potential, previous and existing. Including details of refusals and returns; Users: individuals who have previously handed an animal to the charity.",
  intendedConsequences: [
    {
      description:
        "Reduction of risk from old systems, including privacy, leaks and disparities in data organisation and structure",
    },
    { description: "More effect analysis and reporting across the charity" },
    {
      description:
        "Consolidation of datasets that support more effective and efficient analysis with the potential to increase the performance of charity outputs",
    },
    {
      description:
        "Simplification of workloads and data practices for all employees, with significant benefits for volunteer stakeholders",
    },
    {
      description:
        "Simplification of training and feedback across user groups which reduces the amount of time and resource spent on training and support",
    },
    {
      description:
        "More effective animal support and animal placement into safe homes",
    },
    { description: "Reduction of misplacements of animals" },
  ],
  unintendedConsequences: [
    {
      description:
        "Users of the service are incorrectly profiled and unable to home an animal",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Reduce profiling activities of service users to and research additional approaches to reviewing suitability of animal adoption.",
          date: "NO DATE GIVEN",
          stakeholder: "STAKEHOLDER GIVEN",
          selectedDate: "",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Diverse range of internal users increases the number of data quality issues where data is manually created and input",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement new/improved data schemas once data is consolidated to ensure that data is managed effectively and sustainably maintained in the longer term.",
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
        "Simplified processes and storage leads to overly complex permissions set up and provides disparate or inappropriate access to volunteer staff",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Define clear permissions and user groups to ensure that any access to systems by stakeholders is managed and that only relevant data can be accessed, used or shared.",
          date: "",
          stakeholder: "Charity Digital Team",
          selectedDate: "01/02/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Increased data breaches due to increase of activities undertaken on a single system",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Improve IT security resources to ensure appropriate backup systems to reduce risk of data loss and/or breach.",
          date: "",
          stakeholder: "IT Team",
          selectedDate: "01/06/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Reduced staff resource as efficiencies in practice have negative effect on individual workloads",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Design and implement communication and training plans as a process of change management. The focus points should be on transparency and clarity of purpose to ensure that stakeholders understand the what, why and how of the programme and be sufficiently supported in developing new skills.",
          date: "",
          stakeholder: "L&D Team",
          selectedDate: "01/03/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Risk of data deletion of duplication of errors in transferring and interacting with data on a single system",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Improve IT security resources to ensure appropriate backup systems to reduce risk of data loss and/or breach.",
          date: "",
          stakeholder: "IT Team",
          selectedDate: "01/06/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Data held about individuals (personal or otherwise) is used to create profiles that are biassed",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Reduce profiling activities of service users to and research additional approaches to reviewing suitability of animal adoption.",
          date: "",
          stakeholder: "Animal Team",
          selectedDate: "01/03/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Increase in digital divide for colleagues who are not appropriately supported through large scale digital transformation",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Design and implement communication and training plans as a process of change management. The focus points should be on transparency and clarity of purpose to ensure that stakeholders understand the what, why and how of the programme and be sufficiently supported in developing new skills.",
          date: "",
          stakeholder: "",
          selectedDate: "",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
  ],
};

export default caseStudy1;
