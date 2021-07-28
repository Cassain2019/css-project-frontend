import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import Select from "react-select";


export default function SubCategory() {
  //states
  const [category, setcategory] = new useState([]);
  const [data, setData] = new useState({
    company: [localStorage.getItem("company_id")],
    category: "",
    subcategory: "",
  });
  const toastFields = { duration: 4000, position: 'top-center' };

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories/company/" + localStorage.getItem("company_id"))
      .then((res) => setcategory(res.data))
      .catch((err) => console.log("Error: " + err));
  }, [setcategory]);
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
        .post("http://localhost:4000/subcategories/", data)
        .then((res) => {
          toast.dismiss();
          if (res.data === "Added") {
            toast.success("Sub Category Created", toastFields);
            setData({
              maincat: "",
              subcat: "",
            });
          } else {
            toast.error("Sub Category Already Exists", toastFields);
          }
        })
        .catch(() => { toast.dismiss(); toast.error("Server Error", toastFields) });
    } else {
      toast.dismiss();
      toast.error("Missing Fields", toastFields);
    }
  };
  return (
    <div className="modal fade" id="subCategory">

      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sub Category</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="maincat">Main Category</label>
                <Select
                  onChange={onChange}
                  options={category.map((cat, index) => {
                    return {
                      value: cat._id,
                      label: cat.category,
                      target: { name: "category", value: cat._id },
                    };
                  })}
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="subcat">Sub Category</label>
                <input
                  type="text"
                  name="subcategory"
                  value={data.subcat}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Sub Category"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Create Sub Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}