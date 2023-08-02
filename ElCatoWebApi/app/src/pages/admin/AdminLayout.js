import { Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { UserContext } from "../../App";
import React from "react";
import Container from "../../components/Container";
import CustomLink from "../../components/CustomLink";

function Navbar(props) {
    return (
        <div className={"navbar bg-base-100 " + props.className}>
            <div className="flex-none">
                <label htmlFor="main-drawer" className="btn btn-square btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">El Cato Admin</a>
            </div>
        </div>
    );
}

function DrawerLink(props) {

    const [isActive, setIsActive] = React.useState(false);

    const location = useLocation();

    React.useEffect(() => {
        setIsActive(location.pathname === props.to);
    }, [location.pathname]);

    if (props.isAllowed == undefined) {
        // add isAllowed to the props object
        props = JSON.parse(JSON.stringify(props));
        props.isAllowed = true;
    }

    return props.isAllowed ?
        (<li>
            <CustomLink className={isActive ? "active" : undefined} to={props.to}>{props.children}</CustomLink>
        </li>)
        : null;

}

export default function AdminLayout(props) {

    const { isAdmin } = React.useContext(UserContext);

    return (
        <div className="drawer lg:drawer-open">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start bg-base-200">
                <Navbar className="lg:hidden" />
                <Container>
                    <Outlet />
                </Container>
            </div>
            <div className="drawer-side">
                <label htmlFor="main-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
                    {/* Sidebar content here */}
                    <DrawerLink to="/">Back to Home</DrawerLink>
                    <DrawerLink to="/admin">Admin</DrawerLink>
                    <DrawerLink isAllowed={isAdmin} to="/admin/sections">Sections</DrawerLink>
                    <DrawerLink isAllowed={isAdmin} to="/admin/cards">Cards</DrawerLink>
                    <DrawerLink to="/admin/pages">Pages</DrawerLink>
                </ul>

            </div>
        </div>
    );
}