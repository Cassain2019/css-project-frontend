import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

export default function AccountClass() {
    const [data, setData] = new useState({
        company: [localStorage.getItem("company_id")],
        accountType: "",
        name: ""
    });
    const toastFields = { duration: 4000, position: 'top-center' };
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        toast.loading("...Loading");
        if (!Object.values(data).every((element) => element !== "") === false) {
            axios.post("http://localhost:4000/classes/", data)
                .then((res) => {
                    toast.dismiss();
                    if (res.data === "Added") {
                        toast.success("Class Created", toastFields)
                        setData({
                            company: [localStorage.getItem("company_id")],
                            accountType: "",
                            name: ""
                        })
                    }
                    else {
                        toast.error("Server Error", toastFields);
                    }
                }).catch((err) => { toast.dismiss(); toast.error("Server Error", toastFields) })
        } else {
            toast.dismiss();
            toast.error("Missing Fields", toastFields);

        }
    };
    return <div id="accountClass" className="modal fade" role="dialog">
        <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Account Class</h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Account Type</label>
                                <Select
                                    onChange={onChange}
                                    options={[
                                        { label: "Revenue", value: "Revenue", target: { name: 'accountType', value: "Revenue" } },
                                        { label: "Expenses", value: "Expenses", target: { name: 'accountType', value: "Expenses" } },
                                        { label: "Assets", value: "Assets", target: { name: 'accountType', value: "Assets" } },
                                        { label: "Liabilities", value: "Liabilities", target: { name: 'accountType', value: "Liabilities" } },
                                        { label: "Equity", value: "Equity", target: { name: 'accountType', value: "Equity" } }
                                    ]}
                                    value={{ label: data.accountType, value: data.accountType }}
                                />
                            </div>

                            <div className="form-group col-md-12">
                                <label>Class's Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={onChange}
                                    className="form-control"
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="col-12 text-center">
                                <button className="customBtn third pulse" type="submit">Create Class</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

}