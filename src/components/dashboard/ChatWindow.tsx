// import { ArrowLeft } from "lucide-react"; // or your own back icon

// const ChatWindow = ({ user, onBack }) => {
//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-gray-200 border-b">
//         {/* Back button for mobile only */}
//         <div className="block md:hidden">
//           <button onClick={onBack}>
//             <ArrowLeft className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//         <div className="text-lg font-bold mx-auto md:mx-0">{user.name}</div>
//         <div className="w-6 h-6" /> {/* Dummy div to balance layout */}
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {user.messages.map((msg, i) => (
//           <div key={i} className="mb-2">
//             <div className="inline-block bg-white shadow px-4 py-2 rounded-lg">
//               {msg}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-4 border-t">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="w-full border px-4 py-2 rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useEffect, useRef } from "react";

type Message = {
    $id: string;
    message: string;
    isFromAdmin: boolean;
    timestamp?: string | number | Date;
};

type User = {
    id: string;
    name: string; // The senderId will act as the user's ID/name for display
    latestMessage: string;
    messageCount?: number;
    viewed: boolean;
    // Add other user fields if needed
};

type ChatWindowProps = {
    user: User;
    messages: Message[];
    onBack: () => void;
    reply: string;
    setReply: (value: string) => void;
    handleReply: () => void;
};

const ChatWindow = ({ user, messages, onBack, reply, setReply, handleReply }: ChatWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom of the messages when they update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No user selected.
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-200 border-b border-gray-300">
                {/* Back button for mobile only */}
                <div className="block md:hidden">
                    <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-300 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <div className="text-lg font-bold text-gray-800 mx-auto md:mx-0">
                    {user.name || "Unknown User"}
                </div>
                <div className="w-6 h-6" /> {/* Dummy div to balance layout */}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div
                            key={msg.$id}
                            className={`flex mb-3 ${
                                msg.isFromAdmin ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                                    msg.isFromAdmin
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                <p className="text-sm">{msg.message}</p>
                                {msg.timestamp && (
                                    <span className="text-xs text-right opacity-75 mt-1 block">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No messages in this conversation yet.</p>
                )}
                <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-300 bg-white flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Type a message..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleReply();
                        }
                    }}
                    className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button onClick={handleReply} className="bg-blue-600 text-white hover:bg-blue-700">
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;