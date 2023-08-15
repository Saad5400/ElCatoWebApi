import { useContext } from "react"
import { LayoutContext } from "../pages/Layout"

export default function Dimmer(props) {
    const bgDim = useContext(LayoutContext).bgDim;
    
    return (
        <div className={"bg-base-100 p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 " + props.className} style={{
            "--tw-bg-opacity": bgDim / 100,
            ...props.style
        }}>
            {props.children}
        </div>
    )
}