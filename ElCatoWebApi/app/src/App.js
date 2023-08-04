import React, { Suspense } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import Layout from "./pages/Layout";

const Home = lazyWithPreload(() => import('./pages/Home'));
const Page = lazyWithPreload(() => import('./pages/Page'));
const Empty = lazyWithPreload(() => import('./components/Empty'));
const AdminLayout = lazyWithPreload(() => import('./pages/admin/AdminLayout'));
export const Index = lazyWithPreload(() => import('./pages/admin/Index'));
export const NotFound = lazyWithPreload(() => import('./pages/NotFound'));
export const SectionsTable = lazyWithPreload(() => import('./pages/admin/SectionsTable'));
export const CardsTable = lazyWithPreload(() => import('./pages/admin/CardsTable'));
export const PagesTable = lazyWithPreload(() => import('./pages/admin/PagesTable'));

// create an axios instance
export const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});
export const UserContext = React.createContext(null);

function App(props) {

	const [token, setToken] = React.useState("");
	const [isAdmin, setIsAdmin] = React.useState(false);

	React.useLayoutEffect(() => {
		Home.preload();
		Page.preload();
		Empty.preload();
		AdminLayout.preload();
		Index.preload();
	}, []);

	React.useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setToken(token);
		}
	}, []);

	React.useEffect(() => {
		if (token) {
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			localStorage.setItem('token', token);

			if (!isAdmin) {
				api.post('/users/admin', {})
					.then(res => {
						if (res.status === 200) {
							setIsAdmin(true);
							api.defaults.headers.common['Cache-Control'] = 'no-cache';
						}
					}).catch(err => {
						// console.log(err);
					});
			}
		}
	}, [token, isAdmin]);

	function setTokenWrapper(e) {
		setToken(e.target.value);
	}

	const themeDivRef = React.useRef(null);

	return (
		<>
			<Suspense fallback={<Loading />}>
				<UserContext.Provider value={{ token: token, setToken: setTokenWrapper, isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
					<div className="bg-transparent" ref={themeDivRef}>
						<Routes>
							<Route path="" element={<Layout />} >
								<Route index element={<Home />} />
								<Route path="refresh" element={<Empty />} />
								<Route path="page/:id" element={<Page />} />
								<Route path="admin" element={<AdminLayout />} >
									<Route index element={<Index />} />
									<Route path="refresh" element={<Empty />} />
									{isAdmin ? <>
										<Route path="sections" element={<SectionsTable />} />
										<Route path="cards" element={<CardsTable />} />
									</> : null}
									<Route path="pages" element={<PagesTable />} />
								</Route>
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</div>
				</UserContext.Provider>
			</Suspense>
		</>
	);
}

export default App;