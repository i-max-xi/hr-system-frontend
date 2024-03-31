import React, { useEffect, useState } from "react";
import { _get } from "../utils/functions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await _get("employees");
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
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
              // onClick={() => EditEmployee(rowData.id)}
            >
              Edit
            </button>
          )}
        />

        <Column
          body={(rowData) => (
            <button
              className="btn btn-danger remove"
              // onClick={() => deleteEmployee(rowData.id)}
            >
              Delete
            </button>
          )}
        />
      </DataTable>
    </div>
  );
};
