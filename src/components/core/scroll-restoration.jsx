import * as React from "react";
import { useLocation } from "react-router-dom";

// ReactRouter doesn't handle scroll restoration by default.
// The component it exports doesn't work with BrowserRouter.
export function ScrollRestoration() {
	const { pathname } = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
