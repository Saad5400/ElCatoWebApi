import React from "react";
import { api } from "../App";
import Alert from "./Alert";
import { UserContext } from "../App";
import MyDataTable from "./MyDataTable";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function AdminTable(props) {

    const { model, setModel, models, setModels, sort, defaultModel } = props;

    const userContext = React.useContext(UserContext);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const CREATE = "Create",
        EDIT = "Edit";
    const [state, setState] = React.useState(CREATE); // Create, Edit

    React.useEffect(() => {
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
            const setFp = async () => {
                const fp = await FingerprintJS.load();
                const { visitorId } = await fp.get();
                api.get(props.apiPath, {
                    params: {
                        fingerPrint: visitorId
                    }
                }).then(res => {
                    let data = res.data;
                    sort(data);
                    setModels(data);
                }).catch(err => {
                    console.log(err);
                });
            };
            setFp();
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
                    setSuccess("model saved successfully");
                }
                else {
                    setError(JSON.stringify(res));
                }
            })
            .catch(err => {
                setError(JSON.stringify(err.message));
            })
            .finally(() => {
                document.querySelector("button[id=submit]").disabled = false;
            });
    }

    let columns = props.cols;
    if (userContext.isAdmin) {
        columns = [...props.cols, {
            name: "Actions",
            cell: row => <div className="flex justify-between">
                <button className="btn btn-primary" value={row.id} onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" value={row.id} onClick={handleDelete}>Delete</button>
            </div>
        }];
    }

    return (<div className="w-full max-w-md sm:max-w-none h-full tajawal lg:mt-5">
        <form id="mainForm">
            <h1 className="flex justify-between">
                <span className="text-2xl">
                    {state} {model ? model.title : props.title}
                </span>
                <button className="btn btn-primary" onClick={handleCreate}>
                    New
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