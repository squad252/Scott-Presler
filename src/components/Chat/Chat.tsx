/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Buttom from './Buttom';
import Header from './Header';
import ChatView from './ChatView';
import { sendMessage } from '@/services/databaseService.service';
import { account, client } from '@/config/appwrite';
import { generateUniqueId } from '@/lib/uniqueId';
import { useAuth } from '@/context/AuthContext';

interface ChatProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface Message {
    id?: string; // real Appwrite ID or temp ID
    senderId: string;
    isFromAdmin: boolean;
    message: string;
    userName?: string;
    temp?: boolean;
}


const Chat = ({ open, setOpen }: ChatProps) => {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const { user } = useAuth();
    // const bottomRef = useRef<HTMLDivElement>(null);

    const messageCollection = import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGE;
    const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const [sessionReady, setSessionReady] = useState(false);


    // const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open) {
            setVisible(true);
        } else {
            setTimeout(() => setVisible(false), 300);
        }
    }, [open]);

    const loginAnonymously = async () => {
        try {
            await account.createAnonymousSession();
            console.log("Logged in anonymously.");
        } catch (err) {
            console.error("Anonymous login failed:", err);
        }
    };

    // useEffect(() => {
    //     const initUser = async () => {
    //         try {
    //             const user = await account.get();
    //             localStorage.setItem('user_id', user.$id);
    //         } catch {
    //             await loginAnonymously();
    //             const user = await account.get();
    //             localStorage.setItem('user_id', user.$id);
    //         }
    //     };

    //     initUser();
    // }, []);

    useEffect(() => {
        const initUser = async () => {
            try {
                const user = await account.get();
                localStorage.setItem('user_id', user.$id);
            } catch {
                await loginAnonymously();
                const user = await account.get();
                localStorage.setItem('user_id', user.$id);
            } finally {
                setSessionReady(true); // ✅ Mark session as ready
            }
        };

        initUser();
    }, []);


    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const user_id = localStorage.getItem('user_id') || generateUniqueId();
        const tempId = `temp-${generateUniqueId()}`;
        const content = inputValue.trim();

        // const newMessage: Message = {
        //     id: tempId,
        //     senderId: user_id,
        //     isFromAdmin: false,
        //     message: content,
        //     userName: user?.name,
        //     temp: true
        // };

        // Optimistically add message
        // setMessages((prev) => [...prev, newMessage]);
        // scrollToBottom();

        try {
            await sendMessage({
                senderId: user_id,
                message: content,
                isFromAdmin: false,
                userName: user?.name
            });
            setInputValue('');
        } catch (err) {
            console.error("Failed to send message:", err);
            // Could show a toast here
        }

        // Remove if not replaced within 5 seconds
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== tempId));
        }, 5000);
    };

    // useEffect(() => {
    //     const user_id = localStorage.getItem('user_id');

    //     if (!user_id || !databaseId || !messageCollection) return;

    //     const unsubscribe = client.subscribe(
    //         `databases.${databaseId}.collections.${messageCollection}.documents`,
    //         (response: any) => {
    //             const msg = response.payload as Message;
    //             if (msg.senderId === user_id) {
    //                 setMessages(prev => [...prev, msg]);
    //             }
    //         }
    //     );

    //     // bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    //     return () => {
    //         unsubscribe(); // Clean up subscription on unmount
    //     };
    // }, [databaseId, messageCollection]);

    useEffect(() => {
        if (!sessionReady || !databaseId || !messageCollection) return;

        const user_id = localStorage.getItem('user_id');
        if (!user_id) return;

        const unsubscribe = client.subscribe(
            `databases.${databaseId}.collections.${messageCollection}.documents`,
            (response: any) => {
                const msg = response.payload as Message;
                if (msg.senderId === user_id) {
                    setMessages(prev => [...prev, msg]);
                }
            }
        );

        return () => {
            unsubscribe(); // Clean up
        };
    }, [sessionReady, databaseId, messageCollection]);




    return visible ? (
        <div
            className={`fixed bottom-6 w-[300px] right-2 bg-white rounded-xl shadow-2xl z-50 overflow-hidden 
        transition-all duration-300 ease-in-out transform
        ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
        >
            <Header setOpen={setOpen} open={open} />
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                    <ChatView messages={messages} />
                </div>
            </div>
            <Buttom
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
            />
        </div>
    ) : null;
};

export default Chat;
