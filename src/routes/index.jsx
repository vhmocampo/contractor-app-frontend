import * as React from "react";
import { Navigate } from "react-router-dom";

import { Page as NotFoundPage } from "@/pages/not-found";

import { route as dashboardRoute } from "./dashboard";

export const routes = [
	{ index: true, element: <Navigate to="/dashboard" /> },
	{
		path: "errors",
		children: [
			{
				path: "internal-server-error",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/internal-server-error");
					return { Component: Page };
				},
			},
			{
				path: "not-authorized",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-authorized");
					return { Component: Page };
				},
			},
			{
				path: "not-found",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-found");
					return { Component: Page };
				},
			},
		],
	},
	dashboardRoute,
	{ path: "*", element: <NotFoundPage /> },
];
