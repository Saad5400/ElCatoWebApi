export default function Container(props) {

    return (
        <div className="w-full container flex flex-col items-center  min-h-screen pt-2 px-5 flex-none">
            {props.children}
        </div>
    );
}