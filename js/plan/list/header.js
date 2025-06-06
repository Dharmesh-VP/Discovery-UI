// Attach button listeners properly
["Add", "Share", "More"].forEach((name) => {
	setupDropdown(`btn${name}`, `dd${name}`);
});

// Modal setup (edit plan)
setupModal({
	overlayId: "editPlanModal",
	openBtnIds: ["editPlan"],
	closeBtnIds: ["closeEditPlanModal"],
});

// Searchable brand dropdown
setupSearchableDropdown({
	wrapperId: "brandDropdownWrapper",
	toggleId: "brandDropdownToggle",
	dropdownId: "brandDropdownMenu",
	searchInputId: "brandSearchInput",
	optionClass: "brand-option",
	addNewId: "addNewBrandOption",
	newTextId: "newBrandText",
	onSelect: (brand) => {
		console.log("Selected brand:", brand);
		document.getElementById("brandDropdownToggle").textContent = brand;
	},
});

document.querySelectorAll("#listDropdown li").forEach((item) => {
	item.addEventListener("click", () => {
		document.getElementById("selectedList").textContent =
			item.getAttribute("data-value");
		document.getElementById("listDropdown").classList.add("hidden");
		openDropdowns.delete(document.getElementById("listDropdown"));
	});
});
