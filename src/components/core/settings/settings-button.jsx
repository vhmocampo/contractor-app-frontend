"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";

import { appConfig } from "@/config/app";
import { setSettings as setPersistedSettings } from "@/lib/settings";
import { useSettings } from "@/components/core/settings/settings-context";

import { SettingsDrawer } from "./settings-drawer";

export function SettingsButton() {
	const { settings, setSettings } = useSettings();
	const { mode, setMode } = useColorScheme();

	const [openDrawer, setOpenDrawer] = React.useState(false);

	const handleUpdate = async (values) => {
		const { theme, ...other } = values;

		if (theme) {
			setMode(theme);
		}

		const updatedSettings = { ...settings, ...other };

		setPersistedSettings(updatedSettings);
		setSettings(updatedSettings);
	};

	const handleReset = async () => {
		setMode(null);
		setPersistedSettings({});
		setSettings({});
	};

	return (
		<React.Fragment>
			<Tooltip title="Settings">
				<Box
					component="button"
					onClick={() => {
						setOpenDrawer(true);
					}}
					sx={{
						animation: "spin 4s linear infinite",
						background: "var(--mui-palette-neutral-900)",
						border: "none",
						borderRadius: "50%",
						bottom: 0,
						color: "var(--mui-palette-common-white)",
						cursor: "pointer",
						display: "inline-flex",
						height: "40px",
						m: 4,
						p: "10px",
						position: "fixed",
						right: 0,
						width: "40px",
						zIndex: "var(--mui-zIndex-speedDial)",
						"&:hover": { bgcolor: "var(--mui-palette-neutral-700)" },
						"@keyframes spin": { "0%": { rotate: "0" }, "100%": { rotate: "360deg" } },
					}}
				>
					<GearSixIcon fontSize="var(--icon-fontSize-md)" />
				</Box>
			</Tooltip>
			<SettingsDrawer
				onClose={() => {
					setOpenDrawer(false);
				}}
				onReset={handleReset}
				onUpdate={handleUpdate}
				open={openDrawer}
				values={{
					direction: settings.direction ?? appConfig.direction,
					theme: mode,
					primaryColor: settings.primaryColor ?? appConfig.primaryColor,
					dashboardLayout: settings.dashboardLayout ?? appConfig.dashboardLayout,
					dashboardNavColor: settings.dashboardNavColor ?? appConfig.dashboardNavColor,
				}}
			/>
		</React.Fragment>
	);
}
