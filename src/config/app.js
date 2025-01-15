import { AuthStrategy } from "@/lib/auth-strategy";
import { LogLevel } from "@/lib/logger";

export const appConfig = {
	name: "Contractor App Frontend",
	description: "",
	direction: "ltr",
	language: "en",
	theme: "light",
	themeColor: "#090a0b",
	primaryColor: "neonBlue",
	dashboardNavColor: "evident",
	dashboardLayout: "vertical",
	logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
	authStrategy: import.meta.env.VITE_AUTH_STRATEGY || AuthStrategy.NONE,
};
