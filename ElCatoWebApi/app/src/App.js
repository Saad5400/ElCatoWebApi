import React, { Suspense } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const Home = React.lazy(() => import('./pages/Home'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const Index = React.lazy(() => import('./pages/admin/Index'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Layout = React.lazy(() => import('./pages/Layout'));
const Page = React.lazy(() => import('./pages/Page'));
const Empty = React.lazy(() => import('./components/Empty'));
const SectionsTable = React.lazy(() => import('./pages/admin/SectionsTable'));
const CardsTable = React.lazy(() => import('./pages/admin/CardsTable'));
const PagesTable = React.lazy(() => import('./pages/admin/PagesTable'));

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
			<Suspense fallback={Loading}>
				<UserContext.Provider value={{ token: token, setToken: setTokenWrapper, isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
					<div className="bg-transparent" ref={themeDivRef}>
						<Routes>
							<Route path="" element={<Layout />} >
								<Route index element={<Home />} />
								<Route path="refresh" element={<Empty />} />
								<Route path="page/:id" element={<Page />} />
							</Route>
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
						</Routes>
					</div>
				</UserContext.Provider>
			</Suspense>
		</>
	);
}

export default App;