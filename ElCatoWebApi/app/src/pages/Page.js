import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../App";
import Dimmer from "../components/Dimmer";
import { LayoutContext } from "./Layout";
import './Page.css';
import Prism from 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';

export default function Page(props) {

    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState(<></>)
    const layoutContext = useContext(LayoutContext);

    const contentRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        api.get("/pages/" + id).then(res => {
            setLoading(false);
            setTitle(`${res.data?.card?.section?.title} - ${res.data?.card?.title} - ${res.data?.title}`);
            let content = res.data?.content;
            let links = [];
            let h1s = content.match(/<h1.*?>.*?<\/h1>/g);
            if (h1s) {
                h1s.forEach(h1 => {
                    // add an id to each h1 that contains the h1's innerText
                    let h1Content = h1.match(/<h1.*?>(.*?)<\/h1>/)[1];
                    let h1InnerText = h1Content.replace(/<.*?>/g, "");
                    // limit inner text to 10 characters
                    const limit = 15;
                    if (h1InnerText.length > limit) {
                        h1InnerText = h1InnerText.substring(0, limit) + "...";
                    }
                    let h1Dir = h1.match(/<h1.*?dir="(.*?)".*?>/);
                    h1Dir = h1Dir ? h1Dir[1] : null;
                    let h1Id = h1InnerText.toLowerCase().replace(/ /g, "-");
                    content = content.replace(h1, `<h1 id="${h1Id}"${h1Dir ? ` dir="${h1Dir}"` : ""}>${h1Content}</h1>`);
                    links.push({
                        id: h1Id,
                        name: h1InnerText
                    });
                });
            }
            layoutContext.setLinks(links);
            setContent(
                <div ref={contentRef} dangerouslySetInnerHTML={{ __html: content }} />
            );
        }).catch(err => {
            // console.log(err);
        });
    }, [])

    useEffect(() => {
        if (contentRef?.current) {
            Prism.highlightAllUnder(contentRef.current);
        }
    }, [content])

    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <>
            <Dimmer>
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-5">
                        {loading ?
                            <div role="status" className="animate-pulse">
                                <div className="h-2.5 bg-base-content rounded-full w-full mb-4"></div>
                            </div>
                            : title}
                        <hr className="border-base-content" />
                    </h1>
                    <article id="content" className="mb-5 prose max-w-full
                                        prose-sm md:prose-md
                                        prose-td:text-sm md:prose-td:text-lg
                                        text-secondary-content
                                        tajawal
                                        prose-ul:list-inside
                                        prose-ol:list-inside
                                    "
                    >
                        {loading &&
                            <div role="status" className="max-w-3xl animate-pulse">
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[330px] mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[300px] mb-2.5"></div>
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[330px] mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[300px] mb-2.5"></div>
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[330px] mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[300px] mb-2.5"></div>
                                <div className="h-2 bg-base-content max-w-[360px]"></div>
                            </div>
                        }
                        {content}
                    </article>
                </div>
            </Dimmer>
        </>
    );
}