import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { _post } from "../utils/functions";
import { Toast } from "primereact/toast";

export const NewEmployee = ({ selectedEmployee, onSubmit, title }) => {
  const toastRef = useRef();
  const [employee, setEmployee] = useState(
    selectedEmployee || {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      startDate: null,
    }
  );

  const departments = [
    { label: "Engineering", value: "Engineering" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
    { label: "Operations", value: "Operations" },
  ];

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setEmployee((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (e) => {
    const value = e.value;
    setEmployee((prevState) => ({
      ...prevState,
      startDate: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await _post("employees", employee);

      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        startDate: null,
      });
      toastRef.current.show({
        severity: "success",
        summary: "Successfully added employee.",
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Could not add employee",
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center pt-5">
      <Toast ref={toastRef} />
      <div className="w-50">
        <div className="card card-w-title p-3">
          <h1>{title || "Add New Employee"}</h1>
          <div className="p-fluid d-flex flex-column" style={{ gap: "1rem" }}>
            <div className="p-col-12 p-md-6">
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  value={employee.firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                />
                <label htmlFor="firstName">First Name</label>
              </span>
            </div>
            <div className="">
              <span className="p-float-label">
                <InputText
                  id="lastName"
                  value={employee.lastName}
                  onChange={(e) => handleInputChange(e, "lastName")}
                />
                <label htmlFor="lastName">Last Name</label>
              </span>
            </div>
            <div className="">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={employee.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className="">
              <span className="p-float-label">
                <Dropdown
                  id="department"
                  value={employee.department}
                  options={departments}
                  onChange={(e) => handleInputChange(e, "department")}
                  placeholder="Select Department"
                />
              </span>
            </div>
            <div className="">
              <span className="p-float-label">
                <Calendar
                  id="startDate"
                  value={employee.startDate}
                  onChange={handleDateChange}
                  dateFormat="yy-mm-dd"
                  showIcon={true}
                />
                <label htmlFor="startDate">Start Date</label>
              </span>
            </div>
            <Button
              className="btn btn-primary"
              label="Submit"
              onClick={onSubmit || handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
