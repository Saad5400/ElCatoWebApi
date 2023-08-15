import Toast from "./Toast";
import CustomLink from "./CustomLink";
import BinaryBackground from "./BinaryBackground";

export default function LayoutContent(props) {

    function getLinks() {
        return props.links?.map((link, index) => {
            if (link.id) {
                return (<li key={index}>
                    <button onClick={e => {
                        document.getElementById(link.id)?.scrollIntoView();
                        // scroll a little bit more to account for the navbar
                        window.scrollBy(0, -100);
                    }}>{link.name}</button>
                </li>);
            }
            else if (link.isAllowed && link.to) {
                return (<li key={index}>
                    <CustomLink to={link.to}>{link.name}</CustomLink>
                </li>);
            }
            return (null);
        });
    }

    return (
        <div className={props.className} hidden={props.hidden}>
            <Toast>
                {props.randomToast}
            </Toast>
            <div className="bg-transparent sdglitch-tajawal">
                {/* {loadingPage && <progress className="progress progress-primary w-full"></progress>} */}
                <div className="navbar justify-between bg-base-100 border-b-2 sticky top-0 z-[5]">
                    <div>
                        {props.links?.length > 0 && <div className="dropdown">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                        </svg>
                                        Admin Panel
                                    </CustomLink>
                                </li>
                                <li>
                                    Background dimming
                                    <input type="range" min={0} max="100" className="range" step="10" onInput={e => props.setBgDim(e.target.value)} />
                                </li>
                                <div className="divider my-2"></div>
                                <li>
                                    <a href="https://api.whatsapp.com/send/?phone=16892890124&text&type=phone_number" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                    </svg>
                                        WhatsApp</a>
                                </li>
                                <li>
                                    <a href="mailto:ElCato5400@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                        Email</a>
                                </li>
                                <li>
                                    <a href="https://bmc.link/ElCato" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                                    </svg>
                                        Buy me a server</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {props.introComplete && <BinaryBackground speed={120} size={20} text="01" />}
                <div className={"m-2 sm:m-3 md:m-4 lg:m-5 xl:m-6 !mt-0 text-primary"}>
                    <div className="p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}