export default function Toast(props) {

    return (
        <div className="toast z-[10] transition-opacity">
            <div className="indicator">
                <span className="indicator-item indicator-end badge badge-secondary me-2 mt-2 cursor-pointer" onClick={e => {
                    const main = e.target.parentElement.parentElement;
                    main.style.opacity = 0;
                    setTimeout(() => {
                        main.style.display = "none";
                    }, 500)
                }}>
                    X
                </span>
                <div className="alert alert-info">
                    <span className="max-w-lg whitespace-pre-wrap">
                        {props.children}
                    </span>
                </div>
            </div>
        </div>
    );
}