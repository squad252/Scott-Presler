import { assets } from "@/assets";

interface ChatComponentProps {
    sender: boolean;
    message: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ sender, message }) => {
    return (
        <>
            <div className={`flex flex-row gap-2 ${sender ? 'justify-start' : 'justify-end'} mb-4 mr-4 ml-4`}>
                {sender ?
                    (
                        <div className='flex justify-end items-end'>
                            <div className='bg-[#06065C] rounded-[50%] p-2 h-10 w-10 flex justify-center items-center'>
                                <img src={assets.chatimage2} width={20} height={20} />
                            </div>
                        </div>
                    ) : null
                }
                <div className={`${sender ? 'bg-[#EEEEEE]' : 'bg-[#3369FF]'} ${sender ? 'rounded-br-4xl rounded-t-4xl' : 'rounded-bl-4xl rounded-t-4xl text-white'} p-4 font-semibold`} style={{ lineHeight: 1}}>
                    {message}
                </div>
            </div>
        </>
    )
}

export default ChatComponent