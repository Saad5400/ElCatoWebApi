import React from "react";
import AdminTable from "../../components/AdminTable";
import FormControl from "../../components/FormControl";
import { api } from "../../App";

export default function CardsTable() {

    const [card, setCard] = React.useState(null);
    const [cards, setCards] = React.useState(null);
    const [sections, setSections] = React.useState(null);

    React.useEffect(() => {
        api.get("/sections").then(res => {
            setSections(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    function sort(cards) {
        cards.sort((a, b) => {
            if (a.section?.order == b.section?.order) {
                return a.order - b.order;
            }
            return a.section?.order - b.section?.order;
        });
    }

    return (<AdminTable
        sort={sort}
        model={card}
        setModel={setCard}
        models={cards}
        setModels={setCards}
        title="Cards"
        apiPath="/cards"
        cols={[
            { name: "ID", selector: (c) => c.id },
            { name: "Title", selector: (c) => c.title },
            { name: "Order", selector: (c) => c.order },
            { name: "Section", selector: (c) => c.section?.title },
        ]}
    >
        <input type="hidden" name="id" value={card ? card.id : 0} />
        <FormControl label="Title">
            <input name="title" type="text" className="input input-bordered" value={card ? card.title : ""} onChange={e => {
                setCard({ ...card, title: e.target.value });
            }} />
        </FormControl>
        <FormControl label="Order">
            <input name="order" type="number" className="input input-bordered" value={card ? card.order : ""} onChange={e => {
                setCard({ ...card, order: e.target.value });
            }} />
        </FormControl>
        <FormControl label="Section">
            <select name="sectionId" className="select select-bordered w-full" value={card ? card.sectionId : ""} onChange={e => {
                setCard({ ...card, sectionId: e.target.value });
            }}>
                {
                    sections?.map((s, i) => <option key={i} value={s.id}>{s.title}</option>)
                }
            </select>
        </FormControl>
    </AdminTable>);
}