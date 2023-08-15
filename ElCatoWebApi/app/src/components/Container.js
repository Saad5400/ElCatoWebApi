export default function Container(props) {

    return (
        <div className="w-full container flex flex-col items-center min-h-screen pt-2 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6 flex-none">
            {props.children}
        </div>
    );
}