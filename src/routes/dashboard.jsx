import * as React from "react";
import { Outlet } from "react-router-dom";

import { Layout as DashboardLayout } from "@/components/dashboard/layout/layout";

export const route = {
	path: "dashboard",
	element: (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	),
	children: [
		{
			index: true,
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/overview");
				return { Component: Page };
			},
		},
		{
			path: "contractors",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/contractors/list");
						return { Component: Page };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/contractors/create");
						return { Component: Page };
					},
				},
				{
					path: ":contractorId",
					lazy: async () => {
						const { Page } = await import("@/pages/contractors/details");
						return { Component: Page };
					},
				},
			],
		},
	],
};
