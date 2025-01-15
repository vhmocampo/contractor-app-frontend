"use client";

import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { paths } from "@/paths";

function noop() {
	// No operation
}

export function ContractorsPagination({ count, page }) {
	// You should implement the pagination using a similar logic as the filters.
	// Note that when page change, you should keep the filter search params.

	const navigate = useNavigate();

	const updateCurrentPage = React.useCallback(
		(e, page) => {
			const searchParams = new URLSearchParams();

			searchParams.set("page", page);

			navigate(`${paths.dashboard.contractors.list}?${searchParams.toString()}`);
		},
		[navigate]
	);

	return (
		<TablePagination
			component="div"
			count={count}
			onPageChange={updateCurrentPage}
			onRowsPerPageChange={noop}
			page={page}
			rowsPerPage={10}
			rowsPerPageOptions={[5, 10, 25]}
		/>
	);
}
