import { api } from "../App";
import Alert from "./Alert";
import { UserContext } from "../App";
import MyDataTable from "./MyDataTable";
import { useContext, useEffect, useState } from "react";
import getFingerPrint from "../utils/getFingerPrint";

export default function AdminTable(props) {

    const { model, setModel, models, setModels, sort, defaultModel } = props;

    const userContext = useContext(UserContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const CREATE = "Create",
        EDIT = "Edit";
    const [state, setState] = useState(CREATE); // Create, Edit

    async function getModels() {
        const fp = await getFingerPrint();
        api.get(props.apiPath, {
            params: {
                fingerPrint: fp
            }
        }).then(res => {
            let data = res.data;
            sort(data);
            setModels(data);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (userContext.isAdmin) {
            api.get(props.apiPath).then(res => {
                let data = res.data;
                sort(data);
                setModels(data);
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            getModels();
        }
    }, []);

    function reset(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        // setState(CREATE);
        setModel(defaultModel);
        document.querySelector("form[id=mainForm]").reset();
        document.querySelectorAll("button").forEach(b => b.disabled = false);
        props.reset && props.reset(e);
    }

    function handleDelete(e) {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        reset(e);
        const id = e.target.value;
        api.delete(`${props.apiPath}/${id}`).then(res => {
            if (res.status.toString().startsWith("2")) {
                setModels(models.filter(m => m.id != id));
                setSuccess("Item deleted successfully");
            }
            else {
                setError(JSON.stringify(res));
            }
        }).catch(err => {
            setError(JSON.stringify(err.message));
        });
        props.handleDelete && props.handleDelete(e);
    }

    function handleEdit(e) {
        reset(e);
        e.target.disabled = true;
        setState(EDIT);
        const id = e.target.value;
        const model = models.find(s => s.id == id);
        setModel(model);
    }

    function handleCreate(e) {
        reset(e);
        setState(CREATE);
        props.handleCreate && props.handleCreate(e);
    }

    function submit(e) {
        document.querySelector("button[id=submit]").disabled = true;
        api.post(`${props.apiPath}/upsert`, model)
            .then(res => {
                if (res.status.toString().startsWith("2")) {
                    setModel(res.data);
                    let data;
                    if (state === CREATE) {
                        data = [...models, res.data];
                    } else {
                        data = models.map(s => s.id == res.data.id ? res.data : s);
                    }
                    sort(data);
                    setModels(data);
                    reset(e);
                    setSuccess("item was saved successfully");
                }
            })
            .catch(err => {
                console.log(err);
                setError(err.message + ": " + JSON.stringify(err.response?.data));
            })
            .finally(() => {
                document.querySelector("button[id=submit]").disabled = false;
            });
    }

    let columns = props.cols;
    if (userContext.isAdmin) {
        columns = [
            ...props.cols,
            {
                name: "Actions",
                cell: row => <div className="btn-group">
                    <button className="btn btn-primary" value={row.id} onClick={handleEdit}>Edit</button>
                    <button className="btn btn-error" value={row.id} onClick={handleDelete}>Delete</button>
                </div>
            },
            { name: "Created At", selector: (p) => p.createdAt },
        ];
    }

    return (<div className="w-full h-full tajawal lg:mt-5">
        <form id="mainForm">
            <h1 className="flex justify-between">
                <span className="text-2xl">
                    {state} {model ? model.title : props.title}
                </span>
                <button className="btn btn-primary" onClick={handleCreate}>
                    Load new
                </button>
            </h1>
            {props.children}
            <div className="mt-5">
                <button id="submit" className="btn btn-primary btn-block" onClick={submit}>{state}</button>
                {error && <Alert className="alert-error">
                    {error}
                </Alert>}
                {success && <Alert className="alert-success">
                    {success}
                </Alert>}
            </div>
        </form>
        <div className="mt-10">

        </div>
        <h1 className="text-2xl">Your {props.title}</h1>
        <div className="overflow-auto w-full">
            <MyDataTable
                title={props.title}
                data={models}
                columns={columns}
            />
        </div>
        <br />
        <br />
    </div>);
}