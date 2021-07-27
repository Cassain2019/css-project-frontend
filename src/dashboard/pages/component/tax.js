import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Tax() {
  const [data, setData] = new useState({
    company: [localStorage.getItem("company_id")],
    name: "",
    percentage: "",
    details: "",
  });
  const toastFields = { duration: 4000, position: "top-center" };
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(data).every((element) => element !== "") === false) {
      axios
        .post("https://css-project.herokuapp.com/taxes/", data)
        .then((res) => {
          toast.dismiss();
          if (res.data === "Added") {
            toast.success("Tax Created", toastFields);
            setData({
              company: [localStorage.getItem("company_id")],
              name: "",
              percentage: "",
              details: "",
            });
          } else {
            toast.error("Tax Already Exists", toastFields);
          }
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Server Error", toastFields);
        });
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
  };
  return (
    <div className="modal fade" id="taxModal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tax Details</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Tax Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChange}
                  value={data.name}
                  className="form-control"
                  placeholder="Tax Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="percentage">Percentage</label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={data.percentage}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Percentage"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="details">Details</label>
                <textarea
                  id="details"
                  name="details"
                  value={data.details}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Tax Details"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Create Tax
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tax;
