import React, { useState } from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const items = [
        { 
            label: 'Dashboard', 
            icon: 'pi pi-home', 
            url: '/'
        },
        {
            label: 'Employees',
            icon: 'pi pi-address-book',
            url: '/employees'
        },
        {
            label: 'New Employee',
            icon: 'pi pi-plus',
            url: '/newEmployee'
        },
    ];

    const handleTabChange = (event) => {
        const url = event.item?.url;
        setActiveItem(url);
        if (url) {
            navigate(url);
        }
    };
    

    return (
        <div className="card">
            <TabMenu model={items} activeItem={activeItem} onTabChange={handleTabChange} />
        </div>
    );
};