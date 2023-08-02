import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import React from "react";
import { UserContext } from "../App";

const BinaryBackground = React.lazy(() => import('../components/BinaryBackground'));
const IntroVideo = React.lazy(() => import('../components/IntroVideo'));
const CustomLink = React.lazy(() => import('../components/CustomLink'));
const Toast = React.lazy(() => import('../components/Toast'));

const toasts = [
    'سبحان الله وبحمده، سبحان الله العظيم',
    'اللهم صل وسلم على محمد',
    'استغفرالله والحمدلله والله اكبر ولا اله الا الله',
    'اللهم اغفر لي ذنبي واحسن خاتمتي',
    'يا مقلب القلوب والابصار ثبت قلوبنا على دينك',
    'اللهم إنا نسالك الجنة وما قرب اليها من قول وعمل ونعوذ بك من النار وما قرب اليها من قول وعمل',
    'اللهم أنت ربي. لا إله إلا أنت، خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء لك بذنبي، فاغفر لي فإنه لا يغفر الذنوب إلا أنت',
    'حسبي الله لا اله الا هو عليه توكلت وهو رب العرش العظيم',
];
const randomToast = toasts[Math.floor(Math.random() * toasts.length)];

export const LayoutContext = createContext();

export default function Layout(props) {

    const [introComplete, setIntroComplete] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [bgDim, setBgDim] = useState(85);
    const [links, setLinks] = useState([]);
    const userContext = React.useContext(UserContext);

    function getLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}><button onClick={e => {
                    document.getElementById(link.id)?.scrollIntoView();
                    // scroll a little bit more to account for the navbar
                    window.scrollBy(0, -100);
                }}>{link.name}</button></li>
            )
        });
    }

    return (
        <>
            <Toast>
                {randomToast}
            </Toast>
            <LayoutContext.Provider value={{
                bgDim,
                setLoadingPage,
                setLinks
            }}>
                <div className="bg-transparent sdglitch-tajawal">
                    {loadingPage && <progress className="progress progress-primary w-=full"></progress>}
                    <div className="navbar justify-between bg-base-100 border-b-2 sticky top-0 z-[5]">
                        <div>
                            {links.length > 0 && <div className="dropdown">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                                    {getLinks()}
                                </ul>
                            </div>}
                            <CustomLink to={"/"}>
                                <div className="font-bold btn btn-ghost no-animation normal-case text-3xl">
                                    El Cato
                                </div>
                            </CustomLink>
                        </div>
                        <div className="navbar-center hidden lg:flex grow justify-start">
                            <ul className="menu menu-horizontal px-1">
                                {getLinks()}
                            </ul>
                        </div>
                        <div>
                            <div className="btn btn-ghost !px-0">

                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                                    <li>
                                        <CustomLink to={"/admin"}>
                                            Admin Panel
                                        </CustomLink>
                                    </li>
                                    <li>
                                        Background dimming
                                        <input type="range" min={0} max="100" className="range" step="10" onInput={e => setBgDim(e.target.value)} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {introComplete && <BinaryBackground speed={120} size={20} text="01" />}
                    <div className={"m-2 sm:m-3 md:m-4 lg:m-5 xl:m-6 !mt-0 text-primary"}>
                        <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 w-full">
                            <Outlet />
                        </div>
                    </div>
                    {<IntroVideo setIntroComplete={setIntroComplete} />}
                </div>
            </LayoutContext.Provider>
        </>
    );
}