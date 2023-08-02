import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutContext } from "../pages/Layout";
import { useContext } from "react";

export default function CustomLink(props) {

    const layoutContext = useContext(LayoutContext);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Link to={props.to} className={props.className} onClick={e => {
                e.preventDefault();
                layoutContext?.setLoadingPage(true);
                setTimeout(() => {
                    layoutContext?.setLoadingPage(false);
                }, 250);
                if (location.pathname === props.to) {
                    navigate('refresh');
                    setTimeout(() => {
                        navigate(props.to);
                    }, 100);
                }
                else {
                    navigate(props.to);
                }
            }}>
                {props.children}
            </Link>
        </>
    );
}