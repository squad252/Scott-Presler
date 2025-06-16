import { assets } from "@/assets";

type HeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Header = ({ open, setOpen }: HeaderProps) => {
  const toggleOpen = () => setOpen(!open);

  return (
    <div className='flex flex-row justify-between items-center p-4 bg-white border-b-2 border-gray-200'>
      <div className='flex flex-row items-center gap-2'>
        <img
          src={assets.arrowback}
          alt="back"
          className='cursor-pointer'
          onClick={toggleOpen}
        />
        <img src={assets.chatimage} alt="logo" />
      </div>
      <div>
        <img
          src={assets.cancel}
          alt="cancel"
          className='cursor-pointer'
          onClick={toggleOpen}
        />
      </div>
    </div>
  );
};

export default Header;
