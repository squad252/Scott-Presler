import { useState } from 'react';
import { Menu } from 'lucide-react';
import ChatApp from '@/components/dashboard/ChatApp.tsx'; // Ensure this path is correct
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { PaymentsTable } from '@/components/dashboard/PaymentsTable';

const tabs = [
    { id: 'messages', label: 'Messages' },
    { id: 'payments', label: 'Payments' },
];

const SidebarWithContent = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('messages');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Only allow admin to access the dashboard
    const allowedEmails = ["squadron0099@gmail.com"];
    if (!allowedEmails.includes(user?.email ?? "")) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={logout}>
                    Go to Login
                </Button>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'messages':
                return <ChatApp />; // ChatApp will handle all message logic
            case 'payments':
                return <PaymentsTable/>
            default:
                return (
                    <div className="bg-white p-6 rounded shadow min-h-[300px] flex items-center justify-center">
                        <p className="text-lg text-gray-700">🚫 Unknown Tab</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen overflow-hidden" style={{ fontFamily: "Inter" }}>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full border-r border-[#F3F3F3] w-40 bg-white text-black transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:flex-shrink-0`}
            >
                <div className="p-6 text-base text-[#777580]">Inbox</div>
                <ul className="mt-4 px-4">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSidebarOpen(false); // Close sidebar on mobile after click
                                }}
                                className={`w-full text-sm text-left px-2 py-2 transition-colors ${activeTab === tab.id ? 'bg-[#EDECF1] rounded font-semibold' : ''
                                    }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 w-full p-4">
                    <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Overlay on small screens */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header for mobile */}
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b md:hidden">
                    <h1 className="text-xl font-bold">Inbox</h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="w-6 h-6 text-gray-800" />
                    </button>
                </div>

                {/* Page content */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h1>
                    <div className="bg-white p-6 rounded shadow">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarWithContent;