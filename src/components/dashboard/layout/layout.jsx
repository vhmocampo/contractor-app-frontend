"use client";

import * as React from "react";

import { appConfig } from "@/config/app";
import { useSettings } from "@/components/core/settings/settings-context";

import { HorizontalLayout } from "./horizontal/horizontal-layout";
import { VerticalLayout } from "./vertical/vertical-layout";

export function Layout(props) {
	const { settings } = useSettings();
	const layout = settings.dashboardLayout ?? appConfig.dashboardLayout;

	if (layout === "horizontal") {
		return <HorizontalLayout {...props} />;
	}

	return <VerticalLayout {...props} />;
}
