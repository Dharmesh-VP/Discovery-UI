function renderCheckboxes(containerId, data) {
	const container = document.getElementById(containerId);
	container.innerHTML = ""; // clear old content

	data.forEach((item, index) => {
		const label = document.createElement("label");
		label.setAttribute("for", `${containerId}-${index}`);
		label.classList.add(
			"flex",
			"items-center",
			"gap-2",
			"cursor-pointer",
			"text-[#656565]",
		);

		const checkboxInput = document.createElement("input");
		checkboxInput.setAttribute("type", "checkbox");
		checkboxInput.setAttribute("id", `${containerId}-${index}`);
		checkboxInput.classList.add("hidden", "peer");
		if (item.checked) checkboxInput.checked = true;

		const uncheckedSpan = document.createElement("span");
		uncheckedSpan.classList.add(
			"w-4",
			"h-4",
			"rounded",
			"border",
			"border-[#D0D0D0]",
			"flex",
			"items-center",
			"justify-center",
		);
		uncheckedSpan.classList.add("peer-checked:hidden");
		uncheckedSpan.style.border = "1px solid #D0D0D0";

		const checkedSpan = document.createElement("span");
		checkedSpan.classList.add(
			"w-4",
			"h-4",
			"rounded",
			"hidden",
			"text-[#D22F27]",
			"items-center",
			"justify-center",
			"peer-checked:flex",
		);
		checkedSpan.style.border = "1px solid #E02424";
		const svg = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"svg",
		);
		svg.setAttribute("class", "w-3 h-4");
		svg.setAttribute("fill", "none");
		svg.setAttribute("stroke", "currentColor");
		svg.setAttribute("stroke-width", "3");
		svg.setAttribute("viewBox", "0 0 24 24");
		const path = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path",
		);
		path.setAttribute("d", "M5 13l4 4L19 7");
		svg.appendChild(path);
		checkedSpan.appendChild(svg);

		const textSpan = document.createElement("span");
		textSpan.classList.add("flex");
		textSpan.classList.add("peer-checked:text-[#191919]");
		textSpan.classList.add("text-[#656565]");
		textSpan.textContent = item.label;

		label.appendChild(checkboxInput);
		label.appendChild(uncheckedSpan);
		label.appendChild(checkedSpan);
		label.appendChild(textSpan);

		container.appendChild(label);
	});
}

function setupStatusCells() {
	const cells = document.querySelectorAll(".status-cell");

	if (!cells.length) return console.warn("⚠️ No .status-cell found");
	// Global close
	document.addEventListener("click", (e) => {
		cells.forEach((cell) => {
			const dd = cell.querySelector(".status-dropdown");
			if (dd && !cell.contains(e.target)) dd.classList.add("hidden");
		});
	});
	// Per-cell logic
	cells.forEach((cell) => {
		const toggle = cell.querySelector(".status-toggle");
		const dropdown = cell.querySelector(".status-dropdown");
		const disp = cell.querySelector(".status-display span");
		const badge = cell.querySelector(".status-display");
		const opts = cell.querySelectorAll(".status-option");
		if (!toggle || !dropdown || !disp || !badge || !opts.length) return;
		toggle.addEventListener("click", (e) => {
			e.stopPropagation();
			dropdown.classList.toggle("hidden");
		});
		opts.forEach((opt) => {
			opt.addEventListener("click", (e) => {
				e.stopPropagation();
				dropdown.classList.add("hidden");

				// Hide all check icons
				opts.forEach((o) => {
					const icon = o.querySelector(".check-icon");
					if (icon) {
						icon.classList.add("hidden");
						icon.querySelector("img")?.setAttribute(
							"src",
							"../../icons/Check.svg",
						);
					}
				});

				// Show selected check icon
				const selectedIcon = opt.querySelector(".check-icon");
				if (selectedIcon) {
					selectedIcon.classList.remove("hidden");
					selectedIcon
						.querySelector("img")
						?.setAttribute("src", "../../icons/Check.svg");
				}

				const s = opt.dataset.status;
				const c = opt.dataset.color;

				disp.textContent = s;
				badge.className = `status-display rounded-2xl bg-${c}-50 text-${c}-500 py-1 px-3 flex items-center`;
			});
		});
	});
}

const openDropdowns = new Set();

function closeAllDropdowns(except = null) {
	openDropdowns.forEach((dropdown) => {
		if (dropdown !== except) dropdown.classList.add("hidden");
	});
}

function setupDropdown(triggerId, menuId) {
	const btn = document.getElementById(triggerId);
	const menu = document.getElementById(menuId);
	if (!btn || !menu) {
		console.warn(`⚠️ Missing #${triggerId} or #${menuId}`);
		return;
	}

	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		const isHidden = menu.classList.contains("hidden");

		closeAllDropdowns(menu);
		if (isHidden) {
			menu.classList.remove("hidden");
			openDropdowns.add(menu);
		} else {
			menu.classList.add("hidden");
			openDropdowns.delete(menu);
		}
	});

	menu.addEventListener("click", (e) => e.stopPropagation());

	document.addEventListener("click", () => {
		menu.classList.add("hidden");
		openDropdowns.delete(menu);
	});
}

const COLOR_HEX = {
	blue: "#3b82f6",
	yellow: "#eab308",
	orange: "#f97316",
	green: "#22c55e",
	red: "#ef4444",
	purple: "#a855f7",
	pink: "#ec4899",
	indigo: "#6366f1",
	teal: "#14b8a6",
	cyan: "#06b6d4",
};

function getAvailableColor(dropdownId) {
	const pool = Object.keys(COLOR_HEX);
	const used = new Set(
		[
			...document
				.getElementById(dropdownId)
				.querySelectorAll("li[data-color]"),
		].map((li) => li.dataset.color),
	);
	return pool.find((c) => !used.has(c)) || pool[0];
}

function setupSearchableDropdown({
	wrapperId,
	toggleId,
	dropdownId,
	searchInputId,
	optionClass,
	addNewId,
	newTextId,
	onSelect,
}) {
	const wrapper = document.getElementById(wrapperId);
	const toggle = document.getElementById(toggleId);
	const dropdown = document.getElementById(dropdownId);
	const searchInput = document.getElementById(searchInputId);
	const optionsList = dropdown.querySelector("ul");
	const options = dropdown.querySelectorAll(`.${optionClass}`);
	const addNewDiv = document.getElementById(addNewId);
	const newStatusText = document.getElementById(newTextId);

	if (!wrapper || !toggle || !dropdown) {
		console.warn("⚠️ Missing dropdown elements for", wrapperId);
		return;
	}

	document.addEventListener("click", (e) => {
		if (!wrapper.contains(e.target)) {
			dropdown.classList.add("hidden");
			openDropdowns.delete(dropdown);
		}
	});

	toggle.addEventListener("click", (e) => {
		e.stopPropagation();
		const isHidden = dropdown.classList.contains("hidden");

		closeAllDropdowns(dropdown);
		if (isHidden) {
			dropdown.classList.remove("hidden");
			openDropdowns.add(dropdown);
			searchInput.value = "";
			filterOptions("");
		} else {
			dropdown.classList.add("hidden");
			openDropdowns.delete(dropdown);
		}
	});

	function bindOptionEvents(option) {
		option.addEventListener("click", (e) => {
			e.stopPropagation();
			dropdown.classList.add("hidden");
			openDropdowns.delete(dropdown);
			dropdown
				.querySelectorAll(`.${optionClass} .check-icon`)
				.forEach((icon) => icon.classList.add("hidden"));
			option.querySelector(".check-icon")?.classList.remove("hidden");
			onSelect?.(option.dataset.value);
		});
	}

	options.forEach(bindOptionEvents);

	function filterOptions(query) {
		let matchFound = false;
		options.forEach((opt) => {
			const value = opt.dataset.value.toLowerCase();
			const isVisible = value.includes(query);
			opt.style.display = isVisible ? "flex" : "none";
			if (isVisible) matchFound = true;
		});

		if (!matchFound && query.trim() !== "") {
			newStatusText.textContent = capitalizeFirstLetter(query.trim());
			addNewDiv.classList.remove("hidden");
		} else {
			addNewDiv.classList.add("hidden");
		}
	}

	searchInput.addEventListener("input", (e) => {
		filterOptions(e.target.value.toLowerCase());
	});

	addNewDiv.addEventListener("click", (e) => {
		e.stopPropagation();
		const newValue = capitalizeFirstLetter(searchInput.value.trim());
		if (!newValue) return;

		// 🔥 run AFTER previous items are in DOM, so colors are accurate
		const color = getAvailableColor(dropdownId);

		const li = document.createElement("li");
		li.className = `${optionClass} flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer`;
		li.dataset.value = newValue;

		if (dropdownId === "statusDropdownMenu") {
			li.dataset.status = newValue;
			li.dataset.color = color;

			li.innerHTML = `
                    <div class="flex items-center">
                        <span
                        class="relative w-3 h-3 rounded-full border-2 mr-2 flex items-center justify-center"
                        style="
                            border-color: ${COLOR_HEX[color]};
                        "
                        >
                        <span
                            class="w-1 h-1 rounded-full border-2"
                            style="border-color: ${COLOR_HEX[color]};"
                        ></span>
                        </span>
                        <span>${newValue}</span>
                    </div>
                    <span class="check-icon hidden">
                        <img src="../../icons/Check.svg" alt="Selected" class="w-4 h-4" />
                    </span>`;
		} else {
			li.innerHTML = `
			<div class="flex items-center">
				<span>${newValue}</span>
			</div>
			<span class="check-icon hidden">
				<img src="/icons/Check.svg" alt="Selected" class="w-4 h-4" />
			</span>
		`;
		}

		optionsList.appendChild(li); // ✅ append after we’ve gotten colors
		bindOptionEvents(li);

		dropdown.classList.add("hidden");
		searchInput.value = "";
		addNewDiv.classList.add("hidden");
	});

	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}

function openMessageDiv(triggerId, menuId) {
	const btn = document.getElementById(triggerId);
	const menu = document.getElementById(menuId);
	if (!btn || !menu)
		return console.warn(`⚠️ Missing #${triggerId} or #${menuId}`);
	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		menu.classList.toggle("hidden");
	});
	menu.addEventListener("click", (e) => e.stopPropagation());
	// document.addEventListener('click', () => menu.classList.add('hidden'));
}

function openSubMenu(menuId) {
	document.getElementById("mainMenu").classList.add("hidden");
	document.getElementById(menuId).classList.remove("hidden");
}

function goBack() {
	document.getElementById("mainMenu").classList.remove("hidden");
	document.getElementById("listMenu").classList.add("hidden");
	document.getElementById("planMenu").classList.add("hidden");
}

function setupModal({ overlayId, openBtnIds = [], closeBtnIds = [] }) {
	const overlay = document.getElementById(overlayId);
	if (!overlay) {
		console.error(`Overlay element with ID "${overlayId}" not found.`);
		return;
	}

	const openModal = () => {
		overlay.classList.remove("opacity-0", "pointer-events-none");
		overlay.classList.add("opacity-100");
	};

	const closeModal = () => {
		overlay.classList.remove("opacity-100");
		overlay.classList.add("opacity-0", "pointer-events-none");
	};

	openBtnIds.forEach((id) => {
		document.getElementById(id)?.addEventListener("click", openModal);
	});

	closeBtnIds.forEach((id) => {
		document.getElementById(id)?.addEventListener("click", closeModal);
	});

	// Close when clicking outside the modal (on the overlay)
	document.addEventListener("click", (e) => {
		if (e.target === overlay) closeModal();
	});

	// Return control functions if needed outside
	return { openModal, closeModal };
}

function influencerCost() {
	const overlayInfluencer = document.getElementById(
		"editInfluencerCostModalOverlay",
	);
	const closeBtnInfluencer = document.getElementById(
		"closeInfluencerCostModal",
	);
	const cancelBtnInfluencer = document.getElementById(
		"cancelInfluencerCostModal",
	);
	const saveBtnInfluencer = document.querySelector(".save-cost-btn");
	const totalElInfluencer = document.querySelector(".total-cost");
	const deliverablesContainer = document.getElementById(
		"deliverablesContainer",
	);
	const title = document.getElementById("influencerCostTitle");

	let currentCostTrigger = null;
	let currentRows = []; // holds {label, cost, inputEl} for each deliverable

	// helper: build one row in the modal
	function createDeliverableRow(label, initialCost) {
		const row = document.createElement("div");
		row.className = "flex justify-between items-center";

		// description
		const desc = document.createElement("span");
		// desc.className = "text-[#656565]";
		desc.textContent = label;

		// cost editor
		const editorWrapper = document.createElement("div");
		editorWrapper.className =
			"border rounded-md px-3 py-2 flex items-center space-x-2 text-sm";

		const select = document.createElement("select");
		select.innerHTML = `<option value="₹">₹</option>`;
		select.className = "outline-none flex-0";

		const input = document.createElement("input");
		input.type = "text";
		input.value = initialCost.toLocaleString();
		input.className = "cost-input flex-1 outline-none";
		input.addEventListener("input", updateInfluencerTotal);

		editorWrapper.append(select, input);
		row.append(desc, editorWrapper);

		return { row, input, label };
	}

	// recalc total
	function updateInfluencerTotal() {
		const sum = currentRows.reduce((acc, { input }) => {
			const n = Number(input.value.replace(/\D/g, "")) || 0;
			return acc + n;
		}, 0);
		totalElInfluencer.textContent = "₹ " + sum.toLocaleString();
	}

	function closeInfluencerModal() {
		overlayInfluencer.classList.remove("opacity-100");
		overlayInfluencer.classList.add("opacity-0");
		setTimeout(() => {
			overlayInfluencer.classList.add("pointer-events-none");
		}, 200);
	}

	// open modal & inject data
	document
		.querySelectorAll(".edit-influencer-cost-toggle")
		.forEach((toggle) => {
			toggle.addEventListener("click", (e) => {
				e.stopPropagation();
				currentCostTrigger = e.target
					.closest(".edit-cost")
					.querySelector(".cost-value");

				const data = JSON.parse(
					e.target.closest(".edit-cost").dataset.deliverables,
				);

				const name = e.target.closest(".edit-cost").dataset.name;

				// clear old
				deliverablesContainer.innerHTML = "";
				currentRows = [];

				title.innerHTML = `Influencer Cost for ${name}`;

				// build rows
				data.forEach((item) => {
					const { row, input, label } = createDeliverableRow(
						item.label,
						item.cost,
					);
					deliverablesContainer.appendChild(row);
					currentRows.push({ input, label });
				});

				updateInfluencerTotal();

				overlayInfluencer.classList.remove(
					"opacity-0",
					"pointer-events-none",
				);
				overlayInfluencer.classList.add("opacity-100");
			});
		});

	closeBtnInfluencer.addEventListener("click", closeInfluencerModal);
	cancelBtnInfluencer.addEventListener("click", closeInfluencerModal);
	overlayInfluencer.addEventListener("click", (e) => {
		if (e.target === overlayInfluencer) closeInfluencerModal();
	});

	// save & write back total cost to the table
	saveBtnInfluencer.addEventListener("click", () => {
		if (currentCostTrigger) {
			currentCostTrigger.textContent = totalElInfluencer.textContent;
		}
		closeInfluencerModal();
	});
}

function clientCost() {
	// Grab everything once
	const overlayClient = document.getElementById("editClientCostModalOverlay");
	const closeClientBtn = document.getElementById("closeClientCostModal");
	const cancelClientBtn = document.getElementById("cancelClientCostModal");
	const saveClientBtn = document.getElementById("saveClientCostBtn");

	const titleEl = document.getElementById("clientCostTitle");
	const subtitleEl = document.getElementById("clientCostSubtitle");
	const inputEl = document.getElementById("clientCostInput");
	const currencyEl = document.getElementById("clientCostCurrency");

	// We'll store a reference to the <span class="cost-value"> for saving
	let currentCostValueSpan = null;

	// 1️⃣ Open modal when any pencil is clicked
	document.querySelectorAll(".edit-client-cost-toggle").forEach((toggle) => {
		toggle.addEventListener("click", (e) => {
			e.stopPropagation();
			const costContainer = e.target.closest(".edit-cost");
			const name = costContainer.dataset.name;
			const cost = Number(costContainer.dataset.cost) || 0;
			currentCostValueSpan = costContainer.querySelector(".cost-value");

			// Fill the modal
			titleEl.textContent = `Client Cost For ${name}`;
			subtitleEl.textContent = `You can update the client cost, which will be displayed to shared recipients instead of the influencer’s original cost. The total influencer cost is ₹${cost.toLocaleString()}.`;
			inputEl.value = cost.toLocaleString();

			// Show overlay
			overlayClient.classList.remove("opacity-0", "pointer-events-none");
			overlayClient.classList.add("opacity-100");
		});
	});

	// 2️⃣ Close handlers
	function closeClientModal() {
		overlayClient.classList.remove("opacity-100");
		overlayClient.classList.add("opacity-0", "pointer-events-none");
	}

	closeClientBtn.addEventListener("click", closeClientModal);
	cancelClientBtn.addEventListener("click", closeClientModal);

	// 3️⃣ Click outside to close
	overlayClient.addEventListener("click", (e) => {
		if (e.target === overlayClient) closeClientModal();
	});

	// 4️⃣ Save button writes back into the table
	saveClientBtn.addEventListener("click", () => {
		const raw = inputEl.value.replace(/\D/g, "");
		const num = Number(raw) || 0;
		if (currentCostValueSpan) {
			currentCostValueSpan.textContent = `₹ ${num.toLocaleString()}`;
			// Also update the data-cost attribute for next time:
			currentCostValueSpan.closest(".edit-cost").dataset.cost = num;
		}
		closeClientModal();
	});
}

function addInfluencers() {
	const manualOverlay = document.getElementById("manualOverlay");
	const manualPanel = document.getElementById("manualPanel");
	const closeManual = document.getElementById("closeManual");

	// helper to show overlay+panel
	function openManualPanel() {
		manualOverlay.classList.remove("opacity-0", "pointer-events-none");
		manualPanel.classList.remove("translate-x-full");
	}

	// helper to hide panel+overlay
	function closeManualPanel() {
		manualOverlay.classList.add("opacity-0");
		manualPanel.classList.add("translate-x-full");
		// wait for fade‑out to finish before disabling clicks
		manualOverlay.addEventListener(
			"transitionend",
			() => {
				manualOverlay.classList.add("pointer-events-none");
			},
			{
				once: true,
			},
		);
	}

	// close button
	closeManual.addEventListener("click", closeManualPanel);
	// click outside panel
	manualOverlay.addEventListener("click", (e) => {
		if (e.target === manualOverlay) closeManualPanel();
	});

	document
		.querySelector("#openManualBtn")
		.addEventListener("click", openManualPanel);

	const platformButtons = document.querySelectorAll(
		".platform-buttons button",
	);

	platformButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			// Reset all platformButtons
			platformButtons.forEach((b) => {
				b.classList.remove("bg-[#FCE9E9]", "text-[#191919]");
				b.classList.add("text-[#656565]");
				b.style.border = "1px solid #D1D5DB"; // default border color
			});

			// Activate clicked button
			btn.classList.remove("text-[#656565]");
			btn.classList.add("bg-[#FCE9E9]", "text-[#191919]");
			btn.style.border = "1px solid #E02424";
		});
	});

	const uploadBtn = document.getElementById("addInfluencerUploadBtn");
	const fileInput = document.getElementById("addInfluencerFileInput");
	const fileStatus = document.getElementById("addInfluencerFileStatus");
	const fileName = document.getElementById("addInfluencerFileName");
	const fileSize = document.getElementById("addInfluencerFileSize");
	const progressBar = document.getElementById("addInfluencerProgressBar");
	const progressPercent = document.getElementById(
		"addInfluencerProgressPercent",
	);
	const closeFileStatus = document.getElementById(
		"addInfluencerCloseFileStatus",
	);

	uploadBtn.addEventListener("click", () => fileInput.click());

	fileInput.addEventListener("change", () => {
		const file = fileInput.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.readAsText(file);

		fileName.textContent = file.name;
		fileSize.textContent = `${Math.round(file.size / 1024)} kb`;
		fileStatus.classList.remove("hidden");

		let progress = 0;
		const fakeInterval = setInterval(() => {
			progress += 5;
			if (progress > 98) clearInterval(fakeInterval); // let FileReader finish the last bit
			progressBar.style.width = `${progress}%`;
			progressPercent.textContent = `${progress}%`;
		}, 100);

		reader.onload = () => {
			progress = 100;
			progressBar.style.width = `100%`;
			progressPercent.textContent = `100%`;
			clearInterval(fakeInterval);

			// maybe trigger next step here
			console.log("File read complete.");
		};
	});

	closeFileStatus.addEventListener("click", () => {
		fileStatus.classList.add("hidden");
		fileInput.value = "";
	});
}

function getPlatform(img) {
	if (img.src.includes("instagram")) return "instagram-icon";
	if (img.src.includes("youtube")) return "youtube";
	if (img.src.includes("tiktok")) return "tiktok";
	return null;
}

window.openContactModal = function (trigger) {
	const name = trigger.getAttribute("data-name");
	const emails = JSON.parse(trigger.getAttribute("data-emails"));
	const phones = JSON.parse(trigger.getAttribute("data-phones"));

	const overlay = document.getElementById("contactDetailsOverlay");
	const locked = document.getElementById("lockedState");
	const unlocked = document.getElementById("unlockedState");

	// Safety check
	if (!overlay || !locked || !unlocked) {
		console.error("Modal elements not found in the DOM.");
		return;
	}

	overlay.classList.remove("opacity-0", "pointer-events-none");
	overlay.classList.add("opacity-100");

	locked.classList.remove("hidden");
	// unlocked.classList.add("hidden");

	document.querySelectorAll(".contact-name").forEach((el) => {
		el.textContent = name;
	});

	window._contactData = { name, emails, phones };
};

document.addEventListener("DOMContentLoaded", async () => {
	setupDropdown("listNameDropdownButton", "listNameDropdownMenu");
	setupDropdown("btnMoreList", "ddMoreList");
	setupDropdown("messageDropdownBtn", "messageDropdownMenu");
	setupDropdown("listSelectBtn", "listDropdown");
	openMessageDiv("selectAll", "messageBtnDiv");
	setupModal({
		overlayId: "editDeliverablesModalOverlay",
		openBtnIds: ["editDeliverablesButton"],
		closeBtnIds: ["closeDeliverablesModal", "cancelDeliverablesModal"],
	});
	setupModal({
		overlayId: "ManageColumnOverlay",
		openBtnIds: ["openManageColumn"],
		closeBtnIds: ["closeManageColumn"],
	});
	setupModal({
		overlayId: "addNewListModalOverlay",
		openBtnIds: ["openAddList"],
		closeBtnIds: ["closeAddNewListModalButton", "cancelAddNewListButton"],
	});
	setupModal({
		overlayId: "editListModalOverlay",
		openBtnIds: ["editList"],
		closeBtnIds: ["closeEditListModalButton"],
	});

	// First Line .......................................................................................................................................

	const addMoreBtn = document.getElementById("addMoreEditDeliverable");
	const deliverableContainer = document.getElementById(
		"deliverableContainer",
	);
	const template = document.getElementById("deliverableTemplate");

	function createDeliverableRow() {
		const clone = template.content.firstElementChild.cloneNode(true);

		// Reset fields
		clone.querySelector("select").selectedIndex = 0;
		clone.querySelector("input").value = "";

		// Remove button logic
		clone.querySelector(".remove-btn").addEventListener("click", () => {
			clone.remove();
		});

		return clone;
	}

	addMoreBtn?.addEventListener("click", () => {
		const newRow = createDeliverableRow();
		deliverableContainer.appendChild(newRow);
	});

	if (deliverableContainer.children.length === 0) {
		deliverableContainer.appendChild(createDeliverableRow());
	}

	// Second Line........................................................................................................................................

	document.querySelectorAll(".tab-button").forEach((button) => {
		button.addEventListener("click", () => {
			// Remove active text color from all buttons
			document.querySelectorAll(".tab-button").forEach((btn) => {
				btn.classList.remove("text-[#191919]");
				btn.classList.add("text-[#656565]");
			});

			// Add active text color to clicked one
			button.classList.remove("text-[#656565]");
			button.classList.add("text-[#191919]");
		});
	});

	setupSearchableDropdown({
		wrapperId: "statusDropdownWrapper",
		toggleId: "statusDropdownToggle",
		dropdownId: "statusDropdownMenu",
		searchInputId: "statusSearchInput",
		optionClass: "status-option",
		addNewId: "addNewStatusOption",
		newTextId: "newStatusText",
		onSelect: (selectedStatus) => {
			console.log("Selected status:", selectedStatus);

			// Optional: update the toggle button with the selected status
			// document.getElementById("statusDropdownToggle").textContent = selectedStatus;
		},
	});

	setupStatusCells();

	// Influencer Costs...................................................................................................................................

	influencerCost();

	// Edit Client Cost.....................................................................................................................................

	clientCost();

	// Add Influencers.....................................................................................................................................
	
	addInfluencers();

	// Table Select........................................................................................................................................

	const selectAll = document.getElementById("selectAll");
	const rows = document.querySelectorAll("tbody tr");

	selectAll.addEventListener("change", function () {
		rows.forEach((row, index) => {
			const checkboxWrapper = row.querySelector(
				"td .relative.flex.flex-col",
			);
			const number = checkboxWrapper.querySelector("p");
			const checkbox = checkboxWrapper.querySelector(
				"input[type='checkbox']",
			);

			checkbox.checked = selectAll.checked;

			// Toggle visibility
			if (selectAll.checked) {
				number.classList.add("hidden");
				checkbox.classList.remove("hidden");
			} else {
				number.classList.remove("hidden");
				checkbox.classList.add("hidden");
			}
		});
	});
});
