import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Category() {
  const [data, setData] = new useState({
    company: [localStorage.getItem("company_id")],
    category: "",
  });
  const toastFields = { duration: 5000, position: "top-center" };
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
        .post("https://css-project.herokuapp.com/categories/", data)
        .then((res) => {
          if (res.data === "Added") {
            toast.success("Category Created", toastFields);
            setData({
              company: [localStorage.getItem("company_id")],
              maincat: "",
            });
          } else {
            toast.error("Category Already Exists", toastFields);
          }
        })
        .catch((err) => toast.error("Server Error", toastFields));
    } else {
      toast.error("Missing Fields", toastFields);
    }
  };
  return (
    <div className="modal fade" id="mainCategory">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Category</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="maincat">Main Category</label>
                <input
                  type="text"
                  name="category"
                  value={data.maincat}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Main Category"
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
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Category;
