document.addEventListener("DOMContentLoaded", async () => {
	// 3️⃣ Tab switcher for Active / Archived
	const switchTab = (onBtn, offBtn, showEl, hideEl) => {
		onBtn.classList.replace("bg-white", "bg-black");
		onBtn.classList.replace("text-gray-700", "text-white");
		offBtn.classList.replace("bg-black", "bg-white");
		offBtn.classList.replace("text-white", "text-gray-700");
		showEl.classList.remove("hidden");
		hideEl.classList.add("hidden");
	};
	const Abtn = (id) => document.getElementById(id);
	const [actBtn, arcBtn] = ["activeBtn", "archivedBtn"].map(Abtn);
	const [actTbl, arcTbl] = ["activeTable", "archivedTable"].map(Abtn);
	actBtn.onclick = () => switchTab(actBtn, arcBtn, actTbl, arcTbl);
	arcBtn.onclick = () => switchTab(arcBtn, actBtn, arcTbl, actTbl);

	// 4️⃣ Generic dropdown initializer
	const initDropdown = (btnId, menuId, arrowId) => {
		const btn = Abtn(btnId);
		const menu = Abtn(menuId);
		const arrow = Abtn(arrowId);
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			menu.classList.toggle("hidden");
			arrow.classList.toggle("rotate-180");
		});
		document.addEventListener("click", () => {
			if (!menu.classList.contains("hidden")) {
				menu.classList.add("hidden");
				arrow.classList.remove("rotate-180");
			}
		});
	};
	initDropdown("planDropdownToggle", "planDropdownMenu", "planDropdownArrow");
});
