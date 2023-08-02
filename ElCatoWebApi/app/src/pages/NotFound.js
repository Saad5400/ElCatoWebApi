import { Link } from "react-router-dom";

export default function NotFound(props) {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md text-center flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold mx-auto">404</h1>
                    <p className="py-6">The page you requested does not exist</p>
                    <Link to={''} className="btn btn-primary">Homepage</Link>
                </div>
            </div>
        </div>
    );
}