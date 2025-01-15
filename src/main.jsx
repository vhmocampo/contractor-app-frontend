import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { routes } from "@/routes";
import { Root } from "@/root";
import { ScrollRestoration } from "@/components/core/scroll-restoration";

const client = new ApolloClient({
	uri: 'http://localhost/graphql',
	cache: new InMemoryCache(),
});

const root = createRoot(document.querySelector("#root"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Root>
				<ScrollRestoration />
				<Outlet />
			</Root>
		),
		children: [...routes],
	},
]);

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);
