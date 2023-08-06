import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const quotes = [
    '“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”',
    '“Experience is the name everyone gives to their mistakes.”',
    '“Java is to Javascript what car is to Carpet.”',
    '“Knowledge is power”',
    '“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.”',
    '“Code is like humor. When you have to explain it, it\'s bad.”',
    '“Never Gonna Give You Up”',
    '“Life is not a problem to be solved, but a reality to be experienced.”',
    '“Every saint has a past, and every sinner has a future.”',
    '“You will not be punished for your anger, you will be punished by your anger.”',
    '“Keep your face always toward the sunshine and shadows will fall behind you.”',
    '“Dead people receive more flowers than the living ones because regret is stronger than gratitude.”',
    '“Better a cruel truth than a comfortable delusion.”',
    '“Don\'t use yesterday\'s state of mind, to make today\'s decision.”',
    '“A ship in harbor is safe, but that is not what ships are built for.”',
    '“Once we accept our limits, we go beyond them.”',
    '“No.”'
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

export default function IntroVideo(props) {

    const vidRef = useRef(null);
    const mainDivRef = useRef(null);

    const [clicks, setClicks] = useState(0);
    const [videoStarted, setVideoStarted] = useState(false);

    useEffect(() => {

        function handleWindowClick(e) {
            setClicks((clicks) => {
                if (clicks >= 2) {
                    vidRef.current.currentTime = 10.7;
                }
                return clicks + 1;
            });
        }
        const vid = vidRef.current;
        vid?.addEventListener('click', handleWindowClick);
        vid?.addEventListener('timeupdate', handleVideoTime);

        return () => {
            vid?.removeEventListener('timeupdate', handleVideoTime);
            vid?.removeEventListener('click', handleWindowClick);
        }
    })

    const location = useLocation();

    useLayoutEffect(() => {
        if (location.pathname !== "/") {
            stopVideo();
        }
    });

    function stopVideo() {
        setVideoStarted(false);
        props.setIntroComplete(true);
        mainDivRef.current.hidden = true;

    }

    function handleVideoTime(e) {
        if (vidRef.current?.currentTime > 9.6) {
            stopVideo();
        }
    }

    return (
        <>
            <div ref={mainDivRef} className="fixed top-0 left-0 w-full h-full text-center bg-base-100 z-40">
                <div className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <button className="btn btn-lg btn-outline mt-12 px-12" onClick={(e) => {
                        setVideoStarted(true);
                        vidRef.current.play();
                        setTimeout(() => {
                            mainDivRef.current.hidden = true;
                        }, 100);
                    }}>
                        ENTER
                    </button>
                    <p className="mt-10 mx-auto !text-center">
                        {randomQuote}
                    </p>
                </div>
            </div>
            <p hidden={!videoStarted} className="fixed bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] text-warning">
                Click repeatedly to skip
            </p>
            <video
                ref={vidRef}
                hidden={!videoStarted}
                className="fixed right-0 bottom-0 w-full h-full object-fill z-[100]"
                preload="auto"
                playsInline>
                <source src="https://saad5400.github.io/UniProgramming/video/video.mp4" type="video/mp4" />
            </video>
        </>
    );
}