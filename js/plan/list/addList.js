const buttons = document.querySelectorAll(".platformIcons");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const clickedImg = button.querySelector("img");
		const clickedPlatform = getPlatform(clickedImg);

		buttons.forEach((btn) => {
			const img = btn.querySelector("img");
			const platform = getPlatform(img);

			// Reset background and border
			btn.classList.remove("bg-[#FCE9E9]");
			btn.classList.add("bg-white");
			btn.style.border = "1px solid #e8e8e8";
		});

		// Activate clicked one
		button.classList.remove("bg-white");
		button.classList.add("bg-[#FCE9E9]");
		button.style.border = "1px solid #E02424";
	});
});
