import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Unit() {
  const [data, setData] = new useState({
    company: [localStorage.getItem("company_id")],
    unit: "",
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
        .post("https://css-project.herokuapp.com/units/", data)
        .then((res) => {
          toast.dismiss();
          if (res.data === "Added") {
            toast.success("Unit Created", toastFields);
            setData({
              company: [localStorage.getItem("company_id")],
              unit: "",
            });
          } else {
            toast.error("Unit Already Exists", toastFields);
          }
        })
        .catch(() => {
          toast.dismiss();
          toast.error("Server Error", toastFields);
        });
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
  };
  return (
    <div className="modal fade" id="unitModal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Unit</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="unit">Unit</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={data.unit}
                  onChange={onChange}
                  className="form-control"
                  placeholder="please enter a unit for products"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Create Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Unit;
