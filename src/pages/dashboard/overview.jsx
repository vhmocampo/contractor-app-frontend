import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Briefcase as BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { ListChecks as ListChecksIcon } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { Helmet } from "react-helmet-async";
import { useQuery, gql } from '@apollo/client';

import { appConfig } from "@/config/app";
import { AppLimits } from "@/components/dashboard/overview/app-limits";
import { HelperWidget } from "@/components/dashboard/overview/helper-widget";
import { Summary } from "@/components/dashboard/overview/summary";

const metadata = { title: `Overview | Dashboard | ${appConfig.name}` };

export function Page() {

	const contractorQuery = useQuery(gql `
		query GetContractors {
			contractors {
				paginatorInfo {
					total
				}
			}
		}
	`);

	const contractsQuery = useQuery(gql `
		query GetContracts {
			contracts {
				paginatorInfo {
					total
				}
			}
		}
	`);

	const jobsQuery = useQuery(gql `
		query GetJobs{
			jobs {
				paginatorInfo {
					total
				}
			}
		}
	`);

	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				sx={{
					maxWidth: "var(--Content-maxWidth)",
					m: "var(--Content-margin)",
					p: "var(--Content-padding)",
					width: "var(--Content-width)",
				}}
			>
				<Stack spacing={4}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h4">Overview</Typography>
						</Box>
					</Stack>
					<Grid container spacing={4}>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={contractsQuery.loading ? 0 : contractsQuery.data?.contracts?.paginatorInfo?.total} icon={ListChecksIcon} title="Assigned Contracts" />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={contractorQuery.loading ? 0 : contractorQuery.data?.contractors?.paginatorInfo?.total} icon={UsersIcon} title="Contractors" />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={jobsQuery.loading ? 0 : jobsQuery.data?.jobs?.paginatorInfo?.total} icon={WarningIcon} title="Open Jobs" />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<AppLimits usage={80} />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<HelperWidget
								action={
									<Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
										Search jobs
									</Button>
								}
								description="Look through open jobs and assign contractors based on skill."
								icon={BriefcaseIcon}
								label="Jobs"
								title="Assign open jobs to contractors"
							/>
						</Grid>
					</Grid>
				</Stack>
			</Box>
		</React.Fragment>
	);
}
