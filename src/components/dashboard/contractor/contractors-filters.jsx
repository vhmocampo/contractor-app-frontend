"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { paths } from "@/paths";
import { FilterButton, FilterPopover, useFilterContext } from "@/components/core/filter-button";
import { Option } from "@/components/core/option";

import { useContractorsSelection } from "./contractor-selection-context";

// The tabs should be generated using API data.
const tabs = [
	{ label: "All", value: "", count: 5 },
];

export function ContractorsFilters({ filters = {}, sortDir = "desc" }) {
	const { email, phone, firstName, lastName } = filters;

	const navigate = useNavigate();

	const selection = useContractorsSelection();

	const updateSearchParams = React.useCallback(
		(newFilters, newSortDir) => {
			const searchParams = new URLSearchParams();

			if (newSortDir === "asc") {
				searchParams.set("sortDir", newSortDir);
			}

			if (newFilters.firstName) {
				searchParams.set("firstName", newFilters.firstName);
			}

			if (newFilters.lastName) {
				searchParams.set("lastName", newFilters.lastName);
			}

			if (newFilters.email) {
				searchParams.set("email", newFilters.email);
			}

			if (newFilters.phone) {
				searchParams.set("phone", newFilters.phone);
			}

			navigate(`${paths.dashboard.contractors.list}?${searchParams.toString()}`);
		},
		[navigate]
	);

	const handleClearFilters = React.useCallback(() => {
		updateSearchParams({}, sortDir);
	}, [updateSearchParams, sortDir]);

	const handleFirstNameChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, firstName: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleLastNameChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, lastName: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleEmailChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, email: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handlePhoneChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, phone: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleSortChange = React.useCallback(
		(event) => {
			updateSearchParams(filters, event.target.value);
		},
		[updateSearchParams, filters]
	);

	const hasFilters = firstName || lastName || email || phone;

	return (
		<div>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap", px: 3, py: 2 }}>
				<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto", flexWrap: "wrap" }}>
					<FilterButton
						displayValue={email}
						label="Email"
						onFilterApply={(value) => {
							handleEmailChange(value);
						}}
						onFilterDelete={() => {
							handleEmailChange();
						}}
						popover={<EmailFilterPopover />}
						value={email}
					/>
					<FilterButton
						displayValue={phone}
						label="Phone number"
						onFilterApply={(value) => {
							handlePhoneChange(value);
						}}
						onFilterDelete={() => {
							handlePhoneChange();
						}}
						popover={<PhoneFilterPopover />}
						value={phone}
					/>
					<FilterButton
						displayValue={firstName}
						label="First Name"
						onFilterApply={(value) => {
							handleFirstNameChange(value);
						}}
						onFilterDelete={() => {
							handleFirstNameChange();
						}}
						popover={<FirstNameFilterPopover />}
						value={firstName}
					/>
					<FilterButton
						displayValue={lastName}
						label="Last Name"
						onFilterApply={(value) => {
							handleLastNameChange(value);
						}}
						onFilterDelete={() => {
							handleLastNameChange();
						}}
						popover={<LastNameFilterPopover />}
						value={lastName}
					/>
					{hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
				</Stack>
				{selection.selectedAny ? (
					<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
						<Typography color="text.secondary" variant="body2">
							{selection.selected.size} selected
						</Typography>
						<Button color="error" variant="contained">
							Delete
						</Button>
					</Stack>
				) : null}
				<Select name="sort" onChange={handleSortChange} sx={{ maxWidth: "100%", width: "120px" }} value={sortDir}>
					<Option value="desc">Newest</Option>
					<Option value="asc">Oldest</Option>
				</Select>
			</Stack>
		</div>
	);
}

function EmailFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by email">
			<FormControl>
				<OutlinedInput
					onChange={(event) => {
						setValue(event.target.value);
					}}
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							onApply(value);
						}
					}}
					value={value}
				/>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}

function PhoneFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by phone number">
			<FormControl>
				<OutlinedInput
					onChange={(event) => {
						setValue(event.target.value);
					}}
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							onApply(value);
						}
					}}
					value={value}
				/>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}

function FirstNameFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by first name">
			<FormControl>
				<OutlinedInput
					onChange={(event) => {
						setValue(event.target.value);
					}}
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							onApply(value);
						}
					}}
					value={value}
				/>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}

function LastNameFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by last name">
			<FormControl>
				<OutlinedInput
					onChange={(event) => {
						setValue(event.target.value);
					}}
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							onApply(value);
						}
					}}
					value={value}
				/>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}
