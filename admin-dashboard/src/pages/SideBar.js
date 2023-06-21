import React, { useState, useEffect } from "react";
import Link from "next/link";

const Sidebar = () => {
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem("admin")));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin");
    };
    return (
        <aside className="w-1/6 bg-gray-800">
            <div className="h-screen flex flex-col justify-between py-6 px-2">
                <div>
                    <h1 className="text-white text-2xl font-bold mb-6">
                        Hello {admin.name}
                    </h1>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/Home">
                                <p className="text-white">Dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/users">
                                <p className="text-white">Users</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/appointments">
                                <p className="text-white">Appointments</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" onClick={handleLogout}>
                                <p className="text-white">Log Out</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
