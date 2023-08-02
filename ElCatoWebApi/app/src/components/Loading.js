import Dimmer from "./Dimmer";

export default function Loading(props) {
    return (
        <Dimmer>
            <div className="w-full h-[80vh] flex justify-center" >
                <span className="loading loading-bars text-base-content"></span>
            </div>
        </Dimmer>
    );
}