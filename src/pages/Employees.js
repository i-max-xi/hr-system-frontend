import React, { useEffect, useRef, useState } from "react";
import { _delete, _get, _post } from "../utils/functions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { NewEmployee } from "./NewEmployee";

export const Employees = () => {
  const toast = useRef(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await _get("employees");
      setEmployees(response);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to fetch employees data.",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setDisplayEditDialog(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDisplayDeleteDialog(true);
  };

  const handleEditDialogHide = () => {
    setDisplayEditDialog(false);
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const handleDeleteDialogHide = () => {
    setDisplayDeleteDialog(false);
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const handleEditSubmit = async () => {
    try {
      await _post("employees", selectedEmployee);
      toast.current.show({
        severity: "success",
        summary: "Employee information updated successfully.",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to update employee information.",
      });
    }
    handleEditDialogHide();
  };

  const handleDeleteSubmit = async () => {
    try {
      await _delete(`employees/${selectedEmployee}`);
      toast.current.show({
        severity: "success",
        summary: "Employee deleted successfully.",
      });

      // After successful delete, update the employee local list
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee));
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Failed to delete employee.",
      });
    }
    handleDeleteDialogHide();
  };

  return (
    <div>
      <Toast ref={toast} />

      <h1>Employee List</h1>

      <DataTable value={employees} paginator rows={10}>
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="email" header="Email" />
        <Column field="department" header="Department" />
        <Column field="startDate" header="Start Date" />

        <Column
          body={(rowData) => (
            <button
              className="btn btn-info text-white"
              onClick={() => handleEditClick(rowData.id)}
            >
              Edit
            </button>
          )}
        />

        <Column
          body={(rowData) => (
            <button
              className="btn btn-danger remove"
              onClick={() => handleDeleteClick(rowData.id)}
            >
              Delete
            </button>
          )}
        />
      </DataTable>
      <Dialog
        header="Edit Employee"
        visible={displayEditDialog}
        onHide={handleEditDialogHide}
        modal
        className="w-75"
      >
        <NewEmployee
          selectedEmployeeID={selectedEmployee}
          onSubmit={handleEditSubmit}
          title=" "
        />
      </Dialog>

      <Dialog
        header="Confirm Deletion"
        visible={displayDeleteDialog}
        onHide={handleDeleteDialogHide}
        modal
      >
        <div className="d-flex flex-column" style={{gap: "1rem"}}>
          <p>Are you sure you want to delete this employee?</p>
          <div className="d-flex" style={{gap: "1rem"}}>
            <Button
              label="Yes"
              onClick={handleDeleteSubmit}
              className="btn btn-danger"
            />
            <Button
              label="No"
              onClick={handleDeleteDialogHide}
              className="btn btn-info text-white"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
