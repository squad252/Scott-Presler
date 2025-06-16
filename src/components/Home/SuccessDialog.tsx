import { assets } from '@/assets'
// import React from 'react'
// import { SlideInDialog } from './SlideInDialog'
// import LoginPopUp from './LoginPopUp'
import { Button } from '../ui/button'

type SuccessDialogPopUpProps = {
    onSucess: () => void;
};

const SuccessDialog = ( { onSucess }: SuccessDialogPopUpProps) => {
    // const [openTwo, setOpenTwo] = React.useState(false);
    return (
        <>
            <div className='flex flex-col items-center justify-center gap-20 bg-white text-white py-6'>
                <div className='flexl flex-col items-center justify-center gap-2'>
                    <h1 className='text-[#05AC23]'>Registration</h1>
                    <h1 className='text-[#07731B] font-bold text-2xl'>Succesful</h1>
                </div>
                <div>
                    <img src={assets.success} alt="" />
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <p className='text-black text-[1.2rem] font-semibold'>Login to signup for a membership</p>
                    <Button className="font-bold px-10 py-8 rounded-none text-lg text-white" style={{ backgroundColor: '#cd0c0c', border: 'none' }} onClick={() => onSucess()}>Login</Button>

                </div>
            </div>
            {/* {openTwo && (
                <SlideInDialog open={openTwo} setOpen={setOpenTwo}>
                    <LoginPopUp />
                </SlideInDialog>
            )} */}
        </>
    )
}

export default SuccessDialog