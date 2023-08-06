import { useState } from "react";
import AdminTable from "../../components/AdminTable";
import FormControl from "../../components/FormControl";

export default function SectionsTable(props) {

    const [section, setSection] = useState(null);
    const [sections, setSections] = useState(null);

    function sort(sections) {
        sections.sort((a, b) => a.order - b.order);
    }

    return (<AdminTable
        sort={sort}
        model={section}
        setModel={setSection}
        models={sections}
        setModels={setSections}
        title="Sections"
        apiPath="/sections"
        cols={[
            { name: "ID", selector: (s, i) => s.id },
            { name: "Title", selector: (s, i) => s.title },
            { name: "Order", selector: (s, i) => s.order },
        ]}
    >
        <input type="hidden" name="id" value={section ? section.id : 0} />
        <FormControl label="Title">
            <input name="title" type="text" className="input input-bordered" value={section ? section.title : ""} onChange={e => {
                setSection({ ...section, title: e.target.value });
            }} />
        </FormControl>
        <FormControl label="Order">
            <input name="order" type="number" className="input input-bordered" value={section ? section.order : ""} onChange={e => {
                setSection({ ...section, order: e.target.value });
            }} />
        </FormControl>
    </AdminTable>);
}