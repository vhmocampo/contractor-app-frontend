import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { ContractorsFilters } from "@/components/dashboard/contractor/contractors-filters";
import { ContractorsPagination } from "@/components/dashboard/contractor/contractors-pagination";
import { ContractorsSelectionProvider } from "@/components/dashboard/contractor/contractor-selection-context";
import { ContractorsTable } from "@/components/dashboard/contractor/contractors-table";
import { gql, useQuery } from "@apollo/client";

const metadata = { title: `List | Contractors | Dashboard | ${appConfig.name}` };

export function Page() {
	const { email, phone, firstName, lastName, sortDir, page } = useExtractSearchParams();
	// const sortedCustomers = applySort([], sortDir);

	const contractorsQuery = useQuery(gql`
		query ContractorQuery($firstName: String, $lastName: String, $email: String, $phone: String, $page: Int) {
			contractors(first_name: $firstName, last_name: $lastName, email: $email, phone: $phone, page: $page) {
				data {
					id
					first_name
					last_name
					email
					phone
					created_at
					skills {
						name
					}
				}
				paginatorInfo {
					total
					currentPage
				}
			}
		}
	`, {
		variables: {
			firstName: firstName ? "%"+firstName+"%" : null, 
			lastName: lastName ? "%"+lastName+"%" : null, 
			email: email ? "%"+email+"%" : null, 
			phone: phone ? "%"+phone+"%" : null, 
			page
		}
	});

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
							<Typography variant="h4">Contractors</Typography>
						</Box>
					</Stack>
					<ContractorsSelectionProvider contractors={contractorsQuery.loading ? [] : contractorsQuery.data?.contractors?.data}>
						<Card>
							<ContractorsFilters filters={{ email, phone, firstName, lastName }} />
							<Divider />
							<Box sx={{ overflowX: "auto" }}>
								<ContractorsTable rows={contractorsQuery.loading ? [] : contractorsQuery.data?.contractors?.data} />
							</Box>
							<Divider />
							<ContractorsPagination count={contractorsQuery.data?.contractors?.paginatorInfo?.total} page={page} />
						</Card>
					</ContractorsSelectionProvider>
				</Stack>
			</Box>
		</React.Fragment>
	);
}

function useExtractSearchParams() {
	const [searchParams] = useSearchParams();

	return {
		email: searchParams.get("email") || undefined,
		phone: searchParams.get("phone") || undefined,
		firstName: searchParams.get("firstName") || undefined,
		lastName: searchParams.get("lastName") || undefined,
		sortDir: searchParams.get("sortDir") || undefined,
		page: parseInt(searchParams.get("page")) || 1
	};
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
	return row.sort((a, b) => {
		if (sortDir === "asc") {
			return a.createdAt.getTime() - b.createdAt.getTime();
		}

		return b.createdAt.getTime() - a.createdAt.getTime();
	});
}
