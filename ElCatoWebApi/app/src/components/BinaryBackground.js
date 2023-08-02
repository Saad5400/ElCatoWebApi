import { useEffect, useRef, useState } from "react"

export default function BinaryBackground(props) {

    const canvasRef = useRef(null);
    const frColorRef = useRef(null);
    const bgColorRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.outerHeight);
    const [windowHeight, setWindowHeight] = useState(window.outerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const binary = props.text;
            const fontSize = props.size;
            const columns = canvas.width / fontSize;

            const drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
            let bgColor = window?.getComputedStyle(bgColorRef.current)?.color.toString();
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            function draw() {
                let bgColor;
                try {
                    bgColor = window?.getComputedStyle(bgColorRef.current)?.color.toString();
                }
                catch (err) {
                    bgColor = "#000000";
                }
                bgColor = bgColor.substring(bgColor.indexOf('(') + 1, bgColor.lastIndexOf(')')).split(/,\s*/);
                ctx.fillStyle = 'rgba(' + bgColor[0] + ', ' + bgColor[1] + ', ' + bgColor[2] + ', 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // ctx.fillStyle =  "#d4163c"
                ctx.fillStyle =  window?.getComputedStyle(frColorRef.current)?.color;
                ctx.font = fontSize + 'px Glitch Goblin';

                for (let i = 0; i < drops.length; i++) {
                    const text = binary[Math.floor(Math.random() * binary.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }

                    drops[i]++;
                }
            }
            const inter = setInterval(draw, props.speed);

            return () => clearInterval(inter);
        }
    }, [windowWidth, windowHeight, props.size, props.speed, props.text]);

    return (
        <>
            <canvas ref={canvasRef} id="canvas" className="fixed top-0 left-0 w-screen h-screen z-[-1]"></canvas>
            <div ref={frColorRef} className="text-base-content"></div>
            <div ref={bgColorRef} className="text-base-200"></div>
        </>
    )
}