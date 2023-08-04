import React from "react";
import AdminTable from "../../components/AdminTable";
import FormControl from "../../components/FormControl";
import { api } from "../../App";
import BundledEditor from '../../components/BundledEditor';
import { UserContext } from "../../App";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Alert from "../../components/Alert";

export default function PagesTable(props) {

    const editorRef = React.useRef(null);
    const defaultPage = { card: {} };
    const [page, setPage] = React.useState(defaultPage);
    const [pages, setPages] = React.useState(null);
    const [sections, setSections] = React.useState(null);
    const [sectionId, setSectionId] = React.useState(null);
    const [availableCards, setAvailableCards] = React.useState(null);
    const userContext = React.useContext(UserContext);
    const [fingerPrint, setFingerPrint] = React.useState(null);
    const [editorError, setEditorError] = React.useState(null);


    React.useEffect(() => {
        api.get("/sections").then(res => {
            setSections(res.data);
            setSectionId(res.data[0].id);
            setAvailableCards(res.data[0].cards);
        }).catch(err => {
            console.log(err);
        });

        const setFp = async () => {
            const fp = await FingerprintJS.load();
            const { visitorId } = await fp.get();
            setFingerPrint(visitorId);
        };
        setFp();
    }, []);

    React.useEffect(() => {
        if (userContext?.isAdmin == false) {
            setPage({ ...page, fingerPrint: fingerPrint });
        }
    }, [fingerPrint]);

    React.useEffect(() => {
        if (sectionId) {
            const cards = sections.find(s => s.id == sectionId).cards;
            setAvailableCards(cards);
            setPage({ ...page, cardId: cards[0]?.id });
        }
    }, [sectionId]);

    React.useEffect(() => {
        setSectionId(page?.card?.section?.id);
        setPage(page);

        // if the editor is not focused
        if (editorRef.current?.hasFocus() == false) {
            if (page?.content) {
                editorRef.current?.setContent(page?.content);
            }
            else {
                editorRef.current?.setContent("");
            }
        }
    }, [page]);

    function sort(pages) {
        pages.sort((a, b) => {
            if (a.card?.section?.order == b.card?.section?.order) {
                if (a.card?.order == b.card?.order) {
                    return a.order - b.order;
                }
                return a.card?.order - b.card?.order;
            }
            return a.card?.section?.order - b.card?.section?.order;
        });
    }

    let cols = [
        { name: "Views Count", selector: (p) => p.viewCount },
        { name: "Title", selector: (p) => p.title },
        { name: "Order", selector: (p) => p.order },
        { name: "Section", selector: (p) => p.card?.section?.title },
        { name: "Card", selector: (p) => p.card?.title },
        { name: "Approved", selector: (p) => p.accepted ? "Yes" : "No" },
    ];

    function reset(e) {
        document.querySelector("textarea").value = "";
        setSectionId(sections[0].id);
        console.log(props.fingerPrint);
        setPage((prev) => {
            if (userContext.isAdmin == false) {
                return {
                    ...prev,
                    cardId: sections[0].cards[0].id,
                    fingerPrint: fingerPrint
                };
            }
            return {
                ...prev,
                cardId: sections[0].cards[0].id
            };
        });
    }

    const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

    return (<AdminTable
        reset={reset}
        sort={sort}
        defaultModel={defaultPage}
        model={page}
        setModel={setPage}
        models={pages}
        setModels={setPages}
        title="Pages"
        apiPath="/pages"
        cols={cols}
    >
        <div>
            <input type="hidden" name="id" value={page ? page.id : 0} />
            <FormControl label="Title" hint="عنوان الصفحة">
                <input name="title" type="text" className="input input-bordered" value={page ? page.title : ""} onChange={e => {
                    setPage({ ...page, title: e.target.value });
                }} />
            </FormControl>
            {userContext.isAdmin && <FormControl label="Finger Print">
                <input name="fingerPrint" type="text" className="input input-bordered" value={page ? page.fingerPrint : ""} onChange={e => {
                    setPage({ ...page, fingerPrint: e.target.value });
                }} />
            </FormControl>}
            {userContext.isAdmin && <FormControl label="Views Count">
                <input name="viewCount" type="number" className="input input-bordered" value={page ? page.viewCount : ""} onChange={e => {
                    setPage({ ...page, viewCount: e.target.value });
                }} />
            </FormControl>}
            <FormControl label="Order" hint="ترتيب الصفحة">
                <input name="order" type="number" className="input input-bordered" value={page ? page.order : ""} onChange={e => {
                    setPage({ ...page, order: e.target.value });
                }} />
            </FormControl>
            <FormControl label="Section" hint="القسم">
                <select name="sectionId" className="select select-bordered w-full" value={sectionId} onChange={e => {
                    setSectionId(e.target.value);
                }}>
                    {
                        sections?.map((s, i) => <option key={i} value={s.id}>{s.title}</option>)
                    }
                </select>
            </FormControl>
            <FormControl label="Card" hint="الفئة">
                <select name="cardId" className="select select-bordered w-full" value={page ? page.cardId : availableCards ? availableCards[0]?.id : ""} onChange={e => {
                    setPage({ ...page, cardId: e.target.value });
                }}>
                    {
                        availableCards?.map((c, i) => <option key={i} value={c.id}>{c.title}</option>)
                    }
                </select>
            </FormControl>
            {userContext.isAdmin && <FormControl label="Approved">
                <input type="checkbox" className="checkbox" checked={page ? page.accepted : false} onChange={e => {
                    setPage({ ...page, accepted: e.target.checked });
                }} />
            </FormControl>}
            <FormControl label="Content" hint="محتوى الصفحة" />
            {editorError && <Alert className="alert-error">
                {editorError}
            </Alert>}
            <div className="">
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        height: 600,

                        menubar: 'edit view insert format tools table',

                        plugins: 'preview searchreplace autolink directionality code visualchars fullscreen image link media codesample table insertdatetime advlist lists wordcount',

                        toolbar: 'undo redo | bold italic | fontsize blocks | ltr rtl alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor removeformat | fullscreen | image media link codesample',

                        image_caption: true,
                        toolbar_mode: 'sliding',

                        content_style: `body { font-family: Tahoma; font-size: 14px; background-color: #000; color: #c7c7c7; }`,

                        codesample_languages: [
                            { text: 'HTML/XML', value: 'markup' },
                            { text: 'JavaScript', value: 'javascript' },
                            { text: 'CSS', value: 'css' },
                            { text: 'Python', value: 'python' },
                            { text: 'Java', value: 'java' },
                            { text: 'C#', value: 'csharp' },
                            { text: 'SQL', value: 'sql' },
                            { text: 'Bash', value: 'bash' },
                        ],
                        relative_urls : false,
                        promotion: false,
                        mobile: {
                            menubar: 'edit view insert format tools table',
                            toolbar_mode: 'sliding',
                        },
                    }}
                    onEditorChange={(content, editor) => {
                        if (content.length < 102400) {
                            setPage({ ...page, content });
                            setEditorError(null);
                        }
                        else {
                            editorRef.current.setContent(content.substring(0, 102100));
                            setEditorError("Content is too large");
                        }
                    }}
                />
            </div>
        </div>
    </AdminTable>);
}