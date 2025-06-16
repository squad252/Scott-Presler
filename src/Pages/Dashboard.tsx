// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useAuth } from "@/context/AuthContext";
// import {
//   subscribeToMessages,
//   updateMessage,
//   getAllMessages,
// } from "@/services/databaseService.service";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Message {
//   $id: string;
//   senderId: string;
//   isFromAdmin: boolean;
//   message: string;
//   timestamp?: string;
// }

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [reply, setReply] = useState("");

//   // 🧠 Fetch all messages on mount
//   useEffect(() => {
//     if (user?.email !== "agananojoshua001@gmail.com") return;

//     const loadMessages = async () => {
//       const allMessagesResult = await getAllMessages();
//       setMessages(
//         allMessagesResult.documents.map((doc: any) => ({
//           $id: doc.$id,
//           senderId: doc.senderId,
//           isFromAdmin: doc.isFromAdmin,
//           message: doc.message,
//           timestamp: doc.timestamp,
//         }))
//       );
//     };

//     loadMessages();

//     const unsubscribe = subscribeToMessages((newMessage: Message) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const handleReply = async (senderId: string) => {
//     if (!reply.trim()) return;

//     await updateMessage({
//       senderId: senderId,
//       message: reply,
//       isFromAdmin: true,
//     });

//     setReply("");
//   };

//   // 🔁 Group messages by senderId (excluding admin)
//   const latestMessagesBySender = Object.values(
//     messages
//       .filter((msg) => !msg.isFromAdmin)
//       .reduce<Record<string, Message>>((acc, msg) => {
//         acc[msg.senderId] = msg; // will overwrite, keeping the last
//         return acc;
//       }, {})
//   );

//   // 🔢 Count of messages per sender
//   const messageCountBySender = messages.reduce<Record<string, number>>((acc, msg) => {
//     if (!msg.isFromAdmin) {
//       acc[msg.senderId] = (acc[msg.senderId] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   // 🧵 Conversation with selected user
//   const selectedUserMessages = messages.filter(
//     (msg) =>
//       msg.senderId === selectedUserId || (msg.isFromAdmin && msg.senderId === selectedUserId)
//   );

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">
//         Welcome, {user?.name} 👋
//       </h1>
//       <p className="text-gray-600 mb-6">You're logged in successfully.</p>

//       <Button className="mb-6 bg-red-600 hover:bg-red-700 text-white" onClick={logout}>
//         Logout
//       </Button>

//       {user?.email === "agananojoshua001@gmail.com" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* 📥 Message Summary List */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">User Messages</h2>
//             <div className="bg-white rounded shadow p-4 max-h-[400px] overflow-y-auto">
//               {latestMessagesBySender.length > 0 ? (
//                 latestMessagesBySender.map((msg) => (
//                   <div
//                     key={msg.$id}
//                     className="flex justify-between items-center border-b py-2 cursor-pointer hover:bg-gray-50"
//                     onClick={() => setSelectedUserId(msg.senderId)}
//                   >
//                     <div>
//                       <p className="text-gray-800">{msg.message}</p>
//                       <span className="text-xs text-gray-500">
//                         From: {msg.senderId}
//                       </span>
//                     </div>
//                     <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
//                       {messageCountBySender[msg.senderId]}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <p>No messages found.</p>
//               )}
//             </div>
//           </div>

//           {/* 💬 Conversation View & Reply */}
//           {selectedUserId && (
//             <div className="bg-white p-4 rounded shadow max-h-[500px] flex flex-col">
//               <h2 className="text-xl font-semibold mb-2">Conversation</h2>
//               <div className="flex flex-col gap-2 mb-4 overflow-y-auto max-h-[300px] pr-2">
//                 {selectedUserMessages.map((msg) => (
//                   <div
//                     key={msg.$id}
//                     className={`p-2 rounded max-w-xs ${
//                       msg.isFromAdmin ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
//                     }`}
//                   >
//                     <p className="text-sm text-gray-800">{msg.message}</p>
//                   </div>
//                 ))}
//               </div>
//               <Input
//                 placeholder="Type your reply here..."
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 className="mb-4"
//               />
//               <div className="flex gap-2">
//                 <Button
//                   onClick={() => handleReply(selectedUserId)}
//                   className="bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   Send Reply
//                 </Button>
//                 <Button variant="secondary" onClick={() => setSelectedUserId(null)}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
