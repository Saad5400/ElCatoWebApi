import { Outlet, useLocation } from "react-router-dom";
import { UserContext, SectionsTable, CardsTable, PagesTable } from "../../App";
import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomLink from "../../components/CustomLink";
import { LayoutContext } from "../Layout";
import Dimmer from "../../components/Dimmer";

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

    const isAdmin = React.useContext(UserContext).isAdmin;
    const layoutContext = React.useContext(LayoutContext);

    useEffect(() => {

        PagesTable.preload();
        if (isAdmin) {
            SectionsTable.preload();
            CardsTable.preload();
        }

        layoutContext.setLinks([
            { to: "/admin/sections", name: "Sections", isAllowed: isAdmin },
            { to: "/admin/cards", name: "Cards", isAllowed: isAdmin },
            { to: "/admin/pages", name: "Pages", isAllowed: true },
        ])

        document.title = "El Cato - Admin";
    }, []);

    return (
        <Dimmer className="text-base-content flex flex-col items-center justify-center">
            <Container>
                <Outlet />
            </Container>
        </Dimmer>
    );
}