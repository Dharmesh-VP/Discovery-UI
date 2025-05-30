(() => {
	const openBtn = document.getElementById("openModalBtn");
	const closeBtn = document.getElementById("closeModalBtn");
	const overlay = document.getElementById("modalOverlay");

	const toggleModal = () => {
		overlay.classList.toggle("opacity-0");
		overlay.classList.toggle("pointer-events-none");
	};

	openBtn.addEventListener("click", toggleModal);
	closeBtn.addEventListener("click", toggleModal);
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) toggleModal();
	});

	const brands = ["Nivea", "Garnier", "Dot & Key", "The Ordinary"];
	const input = document.getElementById("brandInput");
	const list = document.getElementById("suggestions");

	function renderSuggestions(filter) {
		list.innerHTML = "";
		const filtered = brands.filter((b) =>
			b.toLowerCase().includes(filter.toLowerCase()),
		);

		// if there's anything matching, list them
		if (filtered.length) {
			filtered.forEach((name) => {
				const li = document.createElement("li");
				li.textContent = name;
				li.className = `
px-3 py-2 text-sm text-gray-700 hover:bg-[#FDEDED] rounded-md cursor-pointer 
`;
				li.addEventListener("click", () => {
					input.value = name;
					hideList();
				});
				list.append(li);
			});
		}

		// if no exact match, show the “+ Add …” item
		if (!brands.some((b) => b.toLowerCase() === filter.toLowerCase())) {
			const li = document.createElement("li");
			li.innerHTML = `<span class="text-red-500">+ Add ${filter}</span>`;
			li.className =
				"px-3 py-2 text-sm hover:bg-[#FDEDED] rounded-md cursor-pointer";
			li.addEventListener("click", () => {
				// add to array (optional) and select
				brands.push(filter);
				input.value = filter;
				hideList();
			});
			list.append(li);
		}

		if (list.children.length) {
			list.classList.remove("hidden");
		} else {
			hideList();
		}
	}

	function hideList() {
		list.classList.add("hidden");
	}

	input.addEventListener("input", (e) => {
		const val = e.target.value.trim();
		if (val) {
			renderSuggestions(val);
		} else {
			hideList();
		}
	});

	// close when clicking outside
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".relative")) {
			hideList();
		}
	});
})();
