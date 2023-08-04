export default function FormControl(props) {
    return (
        <div className={"form-control w-full " + props.className}>
            <label className="label">
                <span className="label-text">
                    {props.label}
                </span>
                {props.hint && <span className="label-text-alt">
                    {props.hint}
                </span>}
            </label>
            {props.children}
        </div>
    );
}