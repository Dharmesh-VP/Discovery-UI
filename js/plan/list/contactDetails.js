const unlockBtn = document.getElementById("unlockBtn");
const contactOverlay = document.getElementById("contactDetailsOverlay");
const unlockedState = document.getElementById("unlockedState");
const lockedState = document.getElementById("lockedState");
const closeBtn = document.getElementById("closeContactDetails");
const saveBtn = document.getElementById("saveContactDetails");
const cancelBtn = document.getElementById("cancelContactDetails");
const emailContainer = document.getElementById("emailContainer");
const phoneContainer = document.getElementById("phoneContainer");

function renderEmailFields(emails = []) {
	emailContainer.innerHTML = "";
	if (emails.length === 0) emails = ["NA"];

	emails.forEach((email, i) => {
		const isLast = i === emails.length - 1;

		// wrapper with fixed total width
		const wrapper = document.createElement("div");
		wrapper.className = [
			"flex",
			"space-x-2",
			isLast ? "w-[234px]" : "w-[234px]",
		].join(" ");

		// input flexes to fill wrapper
		const input = document.createElement("input");
		input.type = "email";
		input.value = email;
		input.className = "flex-1 w-0 border px-3 py-2 rounded-md";

		wrapper.appendChild(input);

		if (isLast) {
			const addBtn = document.createElement("button");
			addBtn.innerHTML = `<img src="../../icons/PlusBlack.svg" alt="Add Email" />`;
			addBtn.className =
				"px-3 py-2 border rounded-md hover:bg-gray-50 transition";
			addBtn.onclick = () => renderEmailFields([...emails, ""]);
			wrapper.appendChild(addBtn);
		}

		emailContainer.appendChild(wrapper);
	});
}

function renderPhoneFields(phones = []) {
	phoneContainer.innerHTML = "";
	if (phones.length === 0) phones = ["+91 NA"];

	phones.forEach((phone, i) => {
		const isLast = i === phones.length - 1;
		const [code, num] = phone.split(" ");

		// wrapper with fixed total width
		const wrapper = document.createElement("div");
		wrapper.className = [
			"flex",
			"items-center",
			"space-x-2",
			isLast ? "w-[234px]" : "w-[234px]",
		].join(" ");

		// inner flex to hold select + input
		const phoneInner = document.createElement("div");
		phoneInner.className =
			"flex flex-1 w-0 border rounded-md overflow-hidden";

		// country code dropdown
		const select = document.createElement("select");
		select.className = "px-2 py-2 outline-none text-sm";
		select.style.width = "60px";
		const opt = document.createElement("option");
		opt.value = code || "+91";
		opt.textContent = code || "+91";
		select.appendChild(opt);

		// phone number input
		const input = document.createElement("input");
		input.type = "text";
		input.value = num || "";
		input.className = "flex-1 px-3 py-2 outline-none";

		phoneInner.appendChild(select);
		phoneInner.appendChild(input);
		wrapper.appendChild(phoneInner);

		if (isLast) {
			const addBtn = document.createElement("button");
			addBtn.innerHTML = `<img src="../../icons/PlusBlack.svg" alt="Add Phone" />`;
			addBtn.className =
				"px-3 py-2 border rounded-md hover:bg-gray-50 transition";
			addBtn.onclick = () => renderPhoneFields([...phones, "+91 "]);
			wrapper.appendChild(addBtn);
		}

		phoneContainer.appendChild(wrapper);
	});
}
// Unlock logic
document.getElementById("unlockBtn")?.addEventListener("click", () => {
	const { emails = [], phones = [] } = window._contactData || {};

	document.getElementById("lockedState").classList.add("hidden");
	document.getElementById("unlockedState").classList.remove("blur-sm");

	renderEmailFields(emails);
	renderPhoneFields(phones);
});

// 🧹 Close Overlay Function
function closeContactDetailsOverlay() {
	// Hide overlay
	contactOverlay.classList.remove("opacity-100");
	contactOverlay.classList.add("opacity-0", "pointer-events-none");

	// Clear input containers
	emailContainer.innerHTML = "";
	phoneContainer.innerHTML = "";
}

// ❌ Close Button & Cancel
closeBtn?.addEventListener("click", closeContactDetailsOverlay);
cancelBtn?.addEventListener("click", closeContactDetailsOverlay);

// 🪄 Click Outside to Close
contactOverlay?.addEventListener("click", (e) => {
	if (e.target === contactOverlay) {
		closeContactDetailsOverlay();
	}
});

saveBtn?.addEventListener("click", () => {
	// You’d typically handle saving data here first
	// e.g. send to backend or update global state

	// Then reset the modal
	closeContactDetailsOverlay();
});

