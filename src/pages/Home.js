import React, { useState, useEffect } from "react";
import { _get } from "../utils/functions";

export const Home = () => {
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
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <img
              src={employee.avatar}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <div>
              <p>Name: {`${employee.firstName} ${employee.lastName}`}</p>
              <p>Email: {employee.email}</p>
              <p>Position: {employee.position}</p>
              <p>Department: {employee.department}</p>
              <p>Start Date: {employee.startDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
