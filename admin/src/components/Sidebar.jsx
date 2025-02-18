import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    return (
        <div className="min-h-screen w-64 bg-white border-l">
            {aToken && (
                <ul>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-l-4 border-primary' : ''
                            }`
                        }
                        to={'/admin-dashboard'}
                    >
                        <img src={assets.home_icon} alt="Home Icon" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-l-4 border-primary' : ''
                            }`
                        }
                        to={'/all-appointments'}
                    >
                        <img src={assets.appointment_icon} alt="Appointments Icon" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-l-4 border-primary' : ''
                            }`
                        }
                        to={'/add-doctor'}
                    >
                        <img src={assets.add_icon} alt="Add Doctor Icon" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-l-4 border-primary' : ''
                            }`
                        }
                        to={'/doctor-list'}
                    >
                        <img src={assets.people_icon} alt="Doctors List Icon" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};


export default Sidebar