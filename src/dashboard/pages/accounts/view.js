import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select';
import { Toaster, toast } from "react-hot-toast";


// COMPONENTS
import AccountClass from './accountClass';
import AccountGroup from './accountGroup';

export default function View() {
    const [classes, setClasses] = new useState([]);
    const [accounts, setAccounts] = new useState([]);
    const [groups, setGroups] = new useState([]);
    const [classOptions, setclassOptions] = new useState([]);
    const [groupOptions, setgroupOptions] = new useState([]);
    const [data, setData] = new useState({
        company: [localStorage.getItem("company_id")],
        class: "",
        type: "",
        group: "",
        name: "",
        description: ''
    });
    const toastFields = { duration: 4000, position: 'top-center' };
    useEffect(() => {
        // Accounts
        axios
            .get("http://localhost:4000/accounts/company/" + localStorage.getItem("company_id"))
            .then((res) => setAccounts(res.data))
            .catch((err) => console.log("Error: " + err));

        // Classes
        axios
            .get("http://localhost:4000/classes/company/" + localStorage.getItem("company_id"))
            .then((res) => setClasses(res.data))
            .catch((err) => console.log("Error: " + err));

        // Groups
        axios
            .get("http://localhost:4000/groups/company/" + localStorage.getItem("company_id"))
            .then((res) => setGroups(res.data))
            .catch((err) => console.log("Error: " + err));
    }, [setAccounts, setClasses, setGroups]);
    //level1
    useEffect(() => {
        let options = classes.filter((arr) => arr.accountType === data.type)
        setclassOptions(options)

    }, [data.type])

    //level2
    useEffect(() => {
        let options = groups.filter((arr) => arr.accountClass === data.class)
        setgroupOptions(options)

    }, [data.class])

    const filter = (e) => {
        let value = e.target.value;
        $("#accounts tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1);
            return null;
        });
    };
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        toast.loading("...Loading");
        if (!Object.values(data).every((element) => element !== "") === false) {
            axios.post("http://localhost:4000/accounts/", data)
                .then((res) => {
                    toast.dismiss();
                    if (res.data === "Added") {
                        toast.success("Account Created", toastFields)
                        setData({
                            company: [localStorage.getItem("company_id")],
                            class: "",
                            type: "",
                            group: "",
                            name: "",
                            description: ''
                        })
                    } else {
                        toast.dismiss();
                        toast.error("Server Error", toastFields);
                    }
                }).catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) })
        } else {
            toast.dismiss();
            toast.error("Missing Fields", toastFields);

        }
    };
    return (
        <div className="content-body">
            <div className="container-fluid">
                <Toaster />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Accounts</h4>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={filter}
                                        placeholder="Search Accounts"
                                    />
                                    <div className="input-group-prepend">
                                        <Link
                                            type="button"
                                            to="/accounts"
                                            className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target="#form"
                                        >
                                            Create a Accounts
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                                            data-toggle="dropdown"
                                        >
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link
                                                className="dropdown-item"
                                                data-toggle="modal"
                                                data-target="#accountClass"
                                                to="/accounts"
                                            >
                                                Account's Classes
                                            </Link>
                                            <Link
                                                className="dropdown-item"
                                                data-toggle="modal"
                                                data-target="#accountGroup"
                                                to="/accounts"
                                            >
                                                Account's Groups
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <strong>Name</strong>
                                                </th>
                                                <th>
                                                    <strong>Account Code</strong>
                                                </th>
                                                <th>
                                                    <strong>Type</strong>
                                                </th>
                                                <th>
                                                    <strong>Class</strong>
                                                </th>
                                                <th>
                                                    <strong>Group</strong>
                                                </th>
                                                <th>
                                                    <strong>Description</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="accounts">
                                            {accounts.map((element, index) => {
                                                return (
                                                    <tr key={element._id}>
                                                        <td>
                                                            <strong>
                                                                {element.name}
                                                            </strong>
                                                        </td>
                                                        <td>{element.code}</td>
                                                        <td>{element.group.accountType}</td>
                                                        <td>{element.group.accountClass.name}</td>
                                                        <td>{element.group.name}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link
                                                                    to={`/accounts`}
                                                                    className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                    <i className="fa fa-pencil"></i>
                                                                </Link>
                                                                <Link
                                                                    to="#"
                                                                    className="btn btn-danger shadow btn-xs sharp"
                                                                >
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODALS */}
                <div id="form" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Create Accounts</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Account Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={onChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Account Type</label>
                                            <Select
                                                onChange={onChange}
                                                options={[
                                                    { label: "Revenue", value: "Revenue", target: { name: 'type', value: "Revenue" } },
                                                    { label: "Expenses", value: "Expenses", target: { name: 'type', value: "Expenses" } },
                                                    { label: "Assets", value: "Assets", target: { name: 'type', value: "Assets" } },
                                                    { label: "Liabilities", value: "Liabilities", target: { name: 'type', value: "Liabilities" } },
                                                    { label: "Equity", value: "Equity", target: { name: 'type', value: "Equity" } }
                                                ]}
                                                value={{ label: data.type, value: data.type }}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Account Class</label>
                                            <Select
                                                onChange={onChange}
                                                options={classOptions.map((e, index) => {
                                                    return { label: e.name, value: e._id, target: { name: 'class', value: e._id } }
                                                })}
                                                value={classOptions.map((e, index) => {
                                                    if (data.class === e._id) { return { label: e.name, value: e._id } }
                                                    return null;
                                                })}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Account Group</label>
                                            <Select
                                                onChange={onChange}
                                                options={groupOptions.map((e, index) => {
                                                    return { label: e.name, value: e._id, target: { name: 'group', value: e._id } }
                                                })}
                                                value={groupOptions.map((e, index) => {
                                                    if (data.group === e._id) { return { label: e.name, value: e._id } }
                                                    return null;
                                                })}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Description</label>
                                            <textarea
                                                className="form-control"
                                                rows='4'
                                                name="description"
                                                onChange={onChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="customBtn third pulse" type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
                <AccountClass />
                <AccountGroup />
                {/* END MODALS  */}
            </div>
        </div>
    );
}
