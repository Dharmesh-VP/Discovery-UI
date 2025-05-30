const items = document.querySelectorAll(".nav-item"); // select all nav items :contentReference[oaicite:3]{index=3}

items.forEach((item) => {
	item.addEventListener("click", () => {
		// hook click listener :contentReference[oaicite:4]{index=4}
		// reset all items
		items.forEach((i) => {
			i.classList.remove("bg-white/5", "text-[#e8e8e8]"); // remove active classes :contentReference[oaicite:5]{index=5}
			const img = i.querySelector("img");
			img.src = img.dataset.default; // restore default icon
		});

		// activate clicked item
		item.classList.add("bg-white/5", "text-white");
		const img = item.querySelector("img");
		img.src = img.dataset.active; // swap to clicked icon
	});
});

const tabs = document.querySelectorAll(".nav-tab");

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		// Reset all tabs
		tabs.forEach((t) => {
			t.classList.replace("border-[#191919]", "border-transparent");
			t.classList.replace("text-gray-900", "text-gray-500");
			if (t.dataset.hasIcon === "true") {
				const img = t.querySelector("img");
				img.src = t.dataset.defaultIcon;
			}
		});

		// Activate clicked tab
		tab.classList.replace("border-transparent", "border-[#191919]");
		tab.classList.replace("text-gray-500", "text-gray-900");
		if (tab.dataset.hasIcon === "true") {
			const img = tab.querySelector("img");
			img.src = tab.dataset.activeIcon;
		}
	});
});
