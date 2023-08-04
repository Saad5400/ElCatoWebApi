import { useContext } from "react"
import { LayoutContext } from "../pages/Layout"

export default function Dimmer(props) {
    const bgDim = useContext(LayoutContext).bgDim;
    
    return (
        <div className={"bg-base-100 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 " + props.className} style={{
            "--tw-bg-opacity": bgDim / 100,
            ...props.style
        }}>
            {props.children}
        </div>
    )
}