import { Link } from "react-router-dom";
import Dimmer from "../components/Dimmer";

export default function NotFound(props) {
    return (
        <div className="hero min-h-[80vh]">
            <div className="hero-content text-center">
                <Dimmer className="max-w-md text-center flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold mx-auto text-error">404</h1>
                    <p className="py-6 text-base-content">The page you requested does not exist</p>
                    <Link to={''} className="btn btn-primary">Homepage</Link>
                </Dimmer>
            </div>
        </div>
    );
}