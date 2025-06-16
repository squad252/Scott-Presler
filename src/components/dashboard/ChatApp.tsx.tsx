/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ChatListSidebar from "./ChatListSidebar";
import ChatWindow from "./ChatWindow";
// import { useAuth } from "@/context/AuthContext";
import { getAllMessages, subscribeToMessages, updateMessage } from "@/services/databaseService.service"; // Ensure updateMessage is imported

interface Message {
    $id: string;
    senderId: string;
    userName?: string; // Optional, to store sender's name if available
    isFromAdmin: boolean;
    message: string;
    timestamp?: string;
    viewed: boolean;
}

interface UserSummary {
    id: string;
    name: string; // The senderId will act as the user's ID/name for display
    latestMessage: string;
    messageCount?: number;
    viewed: boolean;
}

const ChatApp = () => {
    // const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [reply, setReply] = useState("");

    // Fetch all messages on mount and subscribe to new messages
    useEffect(() => {
        // This component is only rendered if the user is admin, so no need for the user email check here

        const loadMessages = async () => {
            try {
                const allMessagesResult = await getAllMessages();
                setMessages(
                    allMessagesResult.documents.map((doc: any) => ({
                        $id: doc.$id,
                        senderId: doc.senderId,
                        userName: doc.userName || doc.senderId, // Assuming you might have a userName field in your DB
                        isFromAdmin: doc.isFromAdmin,
                        message: doc.message,
                        timestamp: doc.timestamp,
                        viewed: doc.viewed,
                    }))
                );
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        };

        loadMessages();

        const unsubscribe = subscribeToMessages((newMessage: Message) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => unsubscribe();
    }, []);

    const handleReply = async () => {
        if (!reply.trim() || !selectedUserId) return;

        try {
            await updateMessage({
                senderId: selectedUserId, // The message is sent TO the selected user
                message: reply,
                isFromAdmin: true,
                // You might need to add userName if your backend expects it for admin messages
                userName: currentSelectedUser?.name || "",
            });
            setReply("");

        } catch (error) {
            console.error("Failed to send reply:", error);
        }
    };

    // Group messages by senderId (excluding admin messages from the list of 'users' to reply to)
    const usersWithMessages = messages.reduce<Record<string, Message[]>>((acc, msg) => {
        if (!msg.isFromAdmin) {
            if (!acc[msg.senderId]) {
                acc[msg.senderId] = [];
            }
            acc[msg.senderId].push(msg);
        } else if (selectedUserId && msg.senderId === selectedUserId) {
            // Include admin replies in the selected user's conversation
            if (!acc[msg.senderId]) {
                acc[msg.senderId] = [];
            }
            acc[msg.senderId].push(msg);
        }
        return acc;
    }, {});

    // Prepare data for ChatListSidebar
    const chatUsers: UserSummary[] = Object.keys(usersWithMessages).map((senderId) => {
        const userMessages = messages.filter(
            (msg) => msg.senderId === senderId || (msg.isFromAdmin && msg.senderId === senderId)
        ).sort((a, b) => new Date(a.timestamp || "").getTime() - new Date(b.timestamp || "").getTime()); // Sort to get latest

        const latestMsg = userMessages[userMessages.length - 1]; // Get the actual latest message
        const count = userMessages.filter(msg => !msg.isFromAdmin).length; // Only count user sent messages for the badge

        return {
            id: senderId,
            name: latestMsg?.userName || senderId, // Use userName if available, otherwise senderId
            // latestMessage: latestMsg?.message || "",
            latestMessage: latestMsg?.message || "",
            viewed: latestMsg?.viewed ?? true, // assume true if undefined
            messageCount: count,
        };
    }).sort((a, b) => {
        // Sort users by the timestamp of their latest message
        const latestMsgA = messages.find(msg => msg.senderId === a.id && msg.message === a.latestMessage);
        const latestMsgB = messages.find(msg => msg.senderId === b.id && msg.message === b.latestMessage);
        return new Date(latestMsgB?.timestamp || "").getTime() - new Date(latestMsgA?.timestamp || "").getTime();
    });


    // Conversation with selected user (includes both user messages and admin replies to that user)
    const selectedUserMessages = messages
        .filter(
            (msg) =>
                msg.senderId === selectedUserId ||
                (msg.isFromAdmin && msg.senderId === selectedUserId)
        )
        .sort((a, b) => {
            const timeA = new Date(a.timestamp || "").getTime();
            const timeB = new Date(b.timestamp || "").getTime();
            return timeA - timeB; // Sort by timestamp
        });


    // Find the currently selected user's full details (name, etc.)
    const currentSelectedUser = chatUsers.find(user => user.id === selectedUserId);

    return (
        <div className="flex h-[80vh] border rounded-lg shadow-inner overflow-hidden">
            {/* Left Chat List Sidebar */}
            <div className={`w-full md:w-1/3 border-r border-gray-300 ${selectedUserId ? 'hidden md:block' : 'block'}`}>
                <ChatListSidebar
                    users={chatUsers}
                    onUserSelect={(user: UserSummary) => setSelectedUserId(user.id)}
                    selectedUserId={selectedUserId ?? ""} // Ensure it's never null
                />
            </div>

            {/* Chat Window */}
            <div className={`w-full md:w-2/3 ${selectedUserId ? 'block' : 'hidden md:block'}`}>
                {selectedUserId && currentSelectedUser ? (
                    <ChatWindow
                        user={currentSelectedUser} // Pass the full user object
                        messages={selectedUserMessages}
                        onBack={() => setSelectedUserId(null)}
                        reply={reply}
                        setReply={setReply}
                        handleReply={handleReply}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a user to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;