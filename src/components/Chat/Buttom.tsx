// // import { assets } from "@/assets"
// // import { Input } from "../ui/input"

// // const Buttom = () => {
// //   const sendMessage () => {

// //   }
// //   return (
// //     <div className='w-full absolute flex bottom-0 flex-row gap-4 justify-between items-center pr-6 bg-white rounded-4xl shadow-lg mb-3 focus:outline-none focus:border-none active:outline-none active:border-none' style={{ height: '60px' }}>
// //         <Input className="outline-none w-full h-full p-4 border-none"/>
// //         <div className='flex flex-row gap-4'>
// //             <img src={assets.micorphone} alt="" width={25} height={20}/>
// //             <img src={assets.send} alt="" width={25} height={20} onClick={sendMessage}/>
// //         </div>
// //     </div>
// //   )
// // }

// // export default Buttom

// import { assets } from "@/assets";
// import { Input } from "../ui/input";

// interface BottomProps {
//   value: string;
//   onChange: (value: string) => void;
//   onSend: () => void;
// }

// const Buttom = ({ value, onChange, onSend }: BottomProps) => {
//   return (
//     <div className='w-full absolute flex bottom-0 flex-row gap-4 justify-between items-center pr-6 bg-white rounded-4xl shadow-lg mb-3' style={{ height: '60px' }}>
//       <Input
//         className="outline-none w-full h-full p-4 border-none"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && onSend()}
//       />
//       <div className='flex flex-row gap-4'>
//         <img src={assets.micorphone} alt="" width={25} height={20} />
//         <img src={assets.send} alt="" width={25} height={20} onClick={onSend} className="cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default Buttom;


import { assets } from "@/assets";
import { Input } from "../ui/input";

interface BottomProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const Buttom = ({ value, onChange, onSend }: BottomProps) => {
  return (
    <div className="w-full flex flex-row gap-4 justify-between items-center p-2 bg-white border-t">
      <Input
        className="outline-none w-full h-[40px] p-4 border-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Type a message..."
      />
      <div className="flex flex-row gap-4">
        {/* <img src={assets.micorphone} alt="mic" width={25} height={20} /> */}
        <img src={assets.send} alt="send" width={25} height={20} onClick={onSend} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Buttom;
