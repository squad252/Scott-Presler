// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState } from 'react';

// // const tabs = [
// //   { id: 'dashboard', label: 'Dashboard' },
// //   { id: 'members', label: 'Members' },
// //   { id: 'payments', label: 'Payments' },
// //   { id: 'settings', label: 'Settings' },
// // ];

// // const SidebarWithContent = () => {
// //   const [activeTab, setActiveTab] = useState('dashboard');

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case 'messages':
// //         return <div>📊 Welcome to the Messaged</div>;
// //       case 'payments':
// //         return <div>👥 View and manage payments</div>;
// //       default:
// //         return <div>🚫 Unknown Tab</div>;
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen">
// //       {/* Sidebar */}
// //       <div className="w-64 bg-gray-900 text-white">
// //         <div className="p-6 text-xl font-bold border-b border-gray-700">Inbox</div>
// //         <ul className="mt-4">
// //           {tabs.map((tab) => (
// //             <li key={tab.id}>
// //               <button
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors ${
// //                   activeTab === tab.id ? 'bg-gray-700 font-semibold' : ''
// //                 }`}
// //               >
// //                 {tab.label}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Content */}
// //       <div className="flex-1 p-10">
// //         <h1 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h1>
// //         <div className="bg-white p-6 rounded shadow">{renderContent()}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SidebarWithContent;

// import { useEffect, useState } from 'react';
// import { Menu } from 'lucide-react'; // You can also use any icon lib or SVG
// import ChatApp from '@/components/dashboard/ChatApp.tsx';
// import { useAuth } from '@/context/AuthContext';
// import { getAllMessages, subscribeToMessages } from '@/services/databaseService.service';

// const tabs = [
//     { id: 'messages', label: 'Messages' },
//     { id: 'payments', label: 'Payments' },
// ];

// interface Message {
//     $id: string;
//     senderId: string;
//     userName: string;
//     isFromAdmin: boolean;
//     message: string;
//     timestamp?: string;
// }

// const SidebarWithContent = () => {
//     const { user, logout } = useAuth();
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//     const [reply, setReply] = useState("");
//     const [activeTab, setActiveTab] = useState('messages');
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     useEffect(() => {
//         if (user?.email !== "agananojoshua001@gmail.com") return;

//         const loadMessages = async () => {
//             const allMessagesResult = await getAllMessages();
//             setMessages(
//                 allMessagesResult.documents.map((doc: any) => ({
//                     $id: doc.$id,
//                     senderId: doc.senderId,
//                     isFromAdmin: doc.isFromAdmin,
//                     message: doc.message,
//                     timestamp: doc.timestamp,
//                 }))
//             );
//         };

//         loadMessages();

//         const unsubscribe = subscribeToMessages((newMessage: Message) => {
//             setMessages((prev) => [...prev, newMessage]);
//         });

//         return () => unsubscribe();
//     }, [user]);

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'messages':
//                 return <ChatApp />;
//             case 'payments':
//                 return <div>💳 View and manage payments</div>;
//             default:
//                 return <div>🚫 Unknown Tab</div>;
//         }
//     };

//     const handleReply = async (senderId: string) => {
//         if (!reply.trim()) return;

//         await updateMessage({
//             senderId: senderId,
//             message: reply,
//             isFromAdmin: true,
//         });

//         setReply("");
//     };

//     // 🔁 Group messages by senderId (excluding admin)
//     const latestMessagesBySender = Object.values(
//         messages
//             .filter((msg) => !msg.isFromAdmin)
//             .reduce<Record<string, Message>>((acc, msg) => {
//                 acc[msg.senderId] = msg; // will overwrite, keeping the last
//                 return acc;
//             }, {})
//     );

//     // 🔢 Count of messages per sender
//     const messageCountBySender = messages.reduce<Record<string, number>>((acc, msg) => {
//         if (!msg.isFromAdmin) {
//             acc[msg.senderId] = (acc[msg.senderId] || 0) + 1;
//         }
//         return acc;
//     }, {});

//     // 🧵 Conversation with selected user
//     const selectedUserMessages = messages.filter(
//         (msg) =>
//             msg.senderId === selectedUserId || (msg.isFromAdmin && msg.senderId === selectedUserId)
//     );

//     return (
//         <div className="flex h-screen overflow-hidden" style={{
//             fontFamily: "Inter"
//         }}>
//             {/* Sidebar */}
//             <div
//                 className={`fixed top-0 left-0 h-full border-r border-[#F3F3F3] w-40 bg-white text-black transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//                     } md:translate-x-0 md:static md:flex-shrink-0`}
//             >
//                 <div className="p-6 text-base text-[#777580]">Inbox</div>
//                 <ul className="mt-4 px-4">
//                     {tabs.map((tab) => (
//                         <li key={tab.id}>
//                             <button
//                                 onClick={() => {
//                                     setActiveTab(tab.id);
//                                     setSidebarOpen(false); // Close sidebar on mobile after click
//                                 }}
//                                 className={`w-full text-sm text-left px-2 py-2 transition-colors ${activeTab === tab.id ? 'bg-[#EDECF1] rounded font-semibold' : ''
//                                     }`}
//                             >
//                                 {tab.label}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Overlay on small screens */}
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}

//             {/* Main content */}
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 bg-white border-b md:hidden">
//                     <h1 className="text-xl font-bold">Inbox</h1>
//                     <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//                         <Menu className="w-6 h-6 text-gray-800" />
//                     </button>
//                 </div>

//                 {/* Page content */}
//                 <div className="p-6 flex-1 overflow-y-auto">
//                     <h1 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h1>
//                     <div className="bg-white p-6 rounded shadow">{renderContent()}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SidebarWithContent;


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
    const allowedEmails = ["agananojoshua001@gmail.com", "squadron0099@gmail.com"];
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
                // return (
                //     <div className="bg-white p-6 rounded shadow min-h-[300px] flex items-center justify-center">
                //         <p className="text-lg text-gray-700">💳 View and manage payments</p>
                //     </div>
                // );
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