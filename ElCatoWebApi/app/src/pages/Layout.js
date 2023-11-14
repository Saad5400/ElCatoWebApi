import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import loadable from '@loadable/component'
import IntroVideo from '../components/IntroVideo';

const LayoutContent = loadable(() => import('../components/LayoutContent'));

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

    useEffect(() => {
        LayoutContent.preload();
    }, []);

    const [introComplete, setIntroComplete] = useState(false);
    const [bgDim, setBgDim] = useState(90);
    const [links, setLinks] = useState([]);

    return (
        <>
            <LayoutContext.Provider value={{
                bgDim,
                setLinks
            }}>
                <LayoutContent hidden={!introComplete} links={links} randomToast={randomToast} setBgDim={setBgDim} introComplete={introComplete}>
                    <Outlet />
                </LayoutContent>
                {<IntroVideo setIntroComplete={setIntroComplete} />}
            </LayoutContext.Provider>
        </>
    );
}