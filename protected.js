(function () {
	try {
		if (localStorage.getItem("access_granted") !== "yes") {
			window.location.href = "/protected.html";
		}
	} catch (e) {
		console.error("Auth redirect error:", e);
		window.location.href = "/protected.html";
	}
})();
