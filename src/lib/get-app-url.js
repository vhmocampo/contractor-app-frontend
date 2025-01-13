export function getAppUrl() {
	// Set this to your app URL in production env.
	if (import.meta.env.VITE_APP_URL) {
		return new URL(import.meta.env.VITE_APP_URL);
	}

	// Fallback to localhost. Change this to your local dev URL.
	return new URL("http://localhost:3000");
}
