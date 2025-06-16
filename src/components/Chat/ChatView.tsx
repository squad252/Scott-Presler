// // import ChatComponent from './ChatComponent';

// // interface ChatViewProps {
// //   messages: { senderId: string; isFromAdmin: boolean; message: string, userName?: string }[];
// // }

// // const ChatView = ({ messages }: ChatViewProps) => {
// //   return (
// //     <div className="flex flex-col">
// //       <div className="overflow-y-auto px-4 space-y-3 max-h-[70vh] md:max-h-[50vh] lg:max-h-[50vh] mb-40">
// //         <div className='flex flex-col items-center justify-center p-4'>
// //           {/* Optional avatar at top */}
// //         </div>
// //         {messages.map((msg, index) => (
// //           // <div className=''>
// //             <ChatComponent key={index} sender={msg.isFromAdmin} message={msg.message} />
// //           // </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatView;

// import ChatComponent from './ChatComponent';

// interface ChatViewProps {
//   messages: { senderId: string; isFromAdmin: boolean; message: string; userName?: string }[];
//   endRef: React.RefObject<HTMLDivElement>;
// }

// const ChatView = ({ messages, endRef }: ChatViewProps) => {
//   return (
//     <div className="flex flex-col">
//       <div className="overflow-y-auto px-4 space-y-3">
//         <div className="flex flex-col items-center justify-center p-4" />
//         {messages.map((msg, index) => (
//           <ChatComponent key={index} sender={msg.isFromAdmin} message={msg.message} />
//         ))}
//         <div ref={endRef} />
//       </div>
//     </div>
//   );
// };

// export default ChatView;

import { useRef } from 'react';
import ChatComponent from './ChatComponent';

interface ChatViewProps {
  messages: { senderId: string; isFromAdmin: boolean; message: string; userName?: string }[];
  // endRef: React.RefObject<HTMLDivElement>;
}

const ChatView = ({ messages }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatComponent key={index} sender={msg.isFromAdmin} message={msg.message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatView;
