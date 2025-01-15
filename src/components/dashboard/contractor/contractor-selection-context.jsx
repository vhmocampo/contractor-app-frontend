"use client";

import * as React from "react";

import { useSelection } from "@/hooks/use-selection";

function noop() {
	// No operation
}

export const ContractorsSelectionContext = React.createContext({
	deselectAll: noop,
	deselectOne: noop,
	selectAll: noop,
	selectOne: noop,
	selected: new Set(),
	selectedAny: false,
	selectedAll: false,
});

export function ContractorsSelectionProvider({ children, contractors = [] }) {
	const contractorIds = React.useMemo(() => contractors.map((contractor) => contractor.id), [contractors]);
	const selection = useSelection(contractorIds);

	return <ContractorsSelectionContext.Provider value={{ ...selection }}>{children}</ContractorsSelectionContext.Provider>;
}

export function useContractorsSelection() {
	return React.useContext(ContractorsSelectionContext);
}
