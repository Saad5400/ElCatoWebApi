export default function FormControl(props) {
    return (
        <div className={"form-control w-full " + props.className}>
            <label className="label">
                <span className="label-text">
                    {props.label}
                </span>
            </label>
            {props.children}
        </div>
    );
}