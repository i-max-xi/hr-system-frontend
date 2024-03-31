import React from "react";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import "./pagesStyles.css";

export const Home = () => {
  const pages = [
    {
      title: "Employees",
      subTitle: "Access the list of all employees",
      route: "/employees",
      icon: 'pi pi-address-book',
    },
    {
      title: "New Employee",
      subTitle: "Register a new employee",
      route: "/newEmployee",
      icon: 'pi pi-plus',
    },
  ];

  return (
    <div className="container pb-5">
      <img
        className="rounded"
        src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/fb/f9/17/fbf917b6-046d-80f3-4a2b-81a73f090561/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg"
        alt="header"
      />
      <div className="routesContainer">
        {pages.map(({ title, route, icon, subTitle }, index) => (
          <Card
            key={index}
            title={title}
            header={<i style={{ fontSize: '2rem' }} className={icon}></i>}
            subTitle={subTitle}
            footer={
              <Link to={route}>
                <button className="btn btn-primary">Open</button>
              </Link>
            }
            className="col-6 col-sm-4"
          ></Card>

          // <div key={title} class="card" className="col-12 col-sm-6">
          //   <img class="card-img-top" src={icon} alt={title} />
          //   <div class="card-body">
          //     <h5 class="card-title">{title}</h5>
          //     <p class="card-text">{subTitle}</p>
          //     <Link to={route}>
          //       <button className="btn btn-primary">Go To</button>
          //     </Link>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};
