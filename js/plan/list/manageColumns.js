const audienceMetrics = [
	{
		label: "Audience age group",
		checked: true,
	},
	{
		label: "Audience cities",
		checked: true,
	},
	{
		label: "Audience countries",
		checked: true,
	},
	{
		label: "Audience gender",
		checked: false,
	},
	{
		label: "Audience states",
		checked: false,
	},
	{
		label: "Confirmation mail",
		checked: false,
	},
];

const planMetrics = [
	{
		label: "Deliverables",
		checked: true,
	},
	{
		label: "First internal cost",
		checked: true,
	},
	{
		label: "Commercial",
		checked: false,
	},
	{
		label: "Avg views",
		checked: false,
	},
	{
		label: "Avg likes",
		checked: false,
	},
	{
		label: "User profile",
		checked: false,
	},
	{
		label: "Shortlisted",
		checked: false,
	},
	{
		label: "Keyword analysis",
		checked: false,
	},
	{
		label: "Category name",
		checked: false,
	},
	{
		label: "Final margin",
		checked: false,
	},
];

const platformMetrics = [
	{
		label: "Deliverables",
		checked: true,
	},
	{
		label: "First internal cost",
		checked: true,
	},
	{
		label: "Commercial",
		checked: true,
	},
	{
		label: "Avg views",
		checked: false,
	},
	{
		label: "Avg likes",
		checked: false,
	},
	{
		label: "User profile",
		checked: false,
	},
	{
		label: "Shortlisted",
		checked: false,
	},
	{
		label: "Keyword analysis",
		checked: false,
	},
	{
		label: "Category name",
		checked: false,
	},
	{
		label: "Final margin",
		checked: false,
	},
];

// Fire up the engine 🚀
renderCheckboxes("audience-metrics", audienceMetrics);
renderCheckboxes("plan-metrics", planMetrics);
renderCheckboxes("platform-metrics", platformMetrics);
