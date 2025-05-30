const lists = [
	{
		label: "Nivea List 1 (4)",
		checked: true,
	},
	{
		label: "Nivea List 2 (14)",
		checked: true,
	},
	{
		label: "Nivea List 3 (2)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
	{
		label: "Nivea List 4 (10)",
		checked: false,
	},
];

const columns = [
	{
		label: "Audience age group",
		checked: true,
	},
	{
		label: "Engagement rate",
		checked: false,
	},
	{
		label: "Platform",
		checked: false,
	},
	{
		label: "Gender split",
		checked: true,
	},
	{
		label: "Reach",
		checked: false,
	},
];

// Usage:
renderCheckboxes("listCheckboxes", lists);
renderCheckboxes("columnCheckboxes", columns);

function closeShare(e) {
	e.preventDefault();
	document.getElementById("ddShare").classList.add("hidden");
}
