import { paths } from "@/paths";

export const dashboardConfig = {
	navItems: [
		{
			key: "dashboards",
			title: "Dashboard",
			items: [{ key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "house" }],
		},
		{
			key: "people_management",
			title: "People Management",
			items: [{
				key: "contractors",
				title: "Contractors",
				href: paths.dashboard.contractors,
				icon: "users",
				items: [
					{ key: "contractors", title: "List contractors", href: paths.dashboard.contractors.list },
					{ key: "contractors:create", title: "Create contractor", href: paths.dashboard.contractors.create },
					{ key: "contractors:details", title: "Contractor details", href: paths.dashboard.contractors.details("1") },
				],
			}],
		},
	],
};
