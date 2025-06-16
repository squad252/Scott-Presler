type User = {
    id: string;
    name: string; // The senderId will act as the user's ID/name for display
    latestMessage: string;
    messageCount?: number;
    viewed: boolean;
    // messageCount?: number; // Uncomment if needed
};

interface ChatListSidebarProps {
    users: User[];
    onUserSelect: (user: User) => void;
    selectedUserId: string | number;
}

const ChatListSidebar: React.FC<ChatListSidebarProps> = ({ users, onUserSelect, selectedUserId }) => {
    return (
        <div className="h-full bg-white overflow-y-auto">
            <h2 className="p-4 font-bold text-lg border-b border-gray-200 text-[#777580]">User Conversations</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => onUserSelect(user)}
                            className={`flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUserId === user.id ? "bg-gray-100 font-semibold" : ""
                                }`}
                        >
                            <div>
                                <p className="text-gray-800 font-medium">{user.name}</p>
                                {/* <span className="text-sm text-gray-500 line-clamp-1">{user.latestMessage}</span> */}
                                <span className={`text-sm line-clamp-1 ${user.viewed ? "text-gray-500" : "text-gray-900 font-semibold"}`}>
                                    {user.latestMessage}
                                </span>

                            </div>
                            {/* {user.messageCount > 0 && (
                                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                    {user.messageCount}
                                </span>
                            )} */}
                        </li>
                    ))
                ) : (
                    <p className="p-4 text-center text-gray-500">No conversations found.</p>
                )}
            </ul>
        </div>
    );
};

export default ChatListSidebar;