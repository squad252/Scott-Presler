import { assets } from "@/assets";
import { useState } from "react";
import SignUpPopUp from "./SignUpPopUp";
import LoginPopUp from "./LoginPopUp";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { SlideInDialog } from "./SlideInDialog";
import SuccessDialog from "./SuccessDialog";

const MobileHeroSection = () => {
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const { user, logout } = useAuth();

    const hideSignUp = () => {
        setShowSuccess(true)
        setOpen(false)
    }

    const hideSucess = () => {
        setShowSuccess(false)
        setOpenTwo(true)
    }
    return (
        <>
            <nav className="lg:hidden flex justify-between items-center px-[2rem] py-6 absolute w-full">
                <div className="logo-container">
                    <div>
                        <img src={assets.logo} alt="" />
                    </div>
                </div>

                <div className="btn flex gap-5 flex-row">
                    {/* {!user ? (
                        <button className="font-bold px-2 py-1 text-white" style={{ backgroundColor: '#cd0c0c', border: 'none' }} onClick={() => setOpen(!open)}>Register</button>
                        ) : (
                        null
                        )} */}

                    {!user ? (
                        <button className="text-white px-2 py-1 text-sm font-semibold" style={{ border: 'solid', borderColor: 'white', borderWidth: '1px' }} onClick={() => setOpenTwo(!openTwo)}>Login</button>
                    ) : (
                        <button
                            className={`text-white px-2 py-1 text-sm font-semibold ${isLoggingOut ? 'bg-gray-400' : ''}`}
                            style={{
                                backgroundColor: isLoggingOut ? '#a1a1aa' : '#cd0c0c',
                                border: 'none',
                                cursor: isLoggingOut ? 'not-allowed' : 'pointer'
                            }}
                            onClick={async () => {
                                setIsLoggingOut(true);
                                await logout();
                                setIsLoggingOut(false);
                            }}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    )}
                </div>
            </nav>
            <div
                className="flex lg:hidden flex-col items-center justify-start min-h-screen bg-[#001C54] text-white px-4 pt-30"
                style={{
                    background: user
                        ? "linear-gradient(164.56deg, #74B4DA 8.05%, #74B4DA 51.61%, #0057FF 69.48%, #193FD5 98.67%)"
                        : "linear-gradient(208.71deg, #10367D 17.19%, #06065C 44.22%, #0F49B5 62.58%, #1D62E3 82.31%)",
                }}
            >

                {/* Text Section */}
                <div className="max-w-xl text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                        {user ? "Membership" : (
                            <>
                                Welcome to The<br />
                                Scott Presler<br />
                                Foundation
                            </>
                        )}
                    </h1>
                    <p className={`text-sm sm:text-base leading-relaxed ${user ? "text-black" : "text-white/90"}`}>
                        {user ?
                            (<>
                                The Scott Presler Foundation is a dynamic for-profit organization dedicated to driving innovative solutions that empower communities, enhance civic participation, and promote sustainable social impact. We combine business innovation with social responsibility to create meaningful, lasting change.
                                <br /><br />
                                Join us as we work to build stronger, healthier communities through entrepreneurship, advocacy, and leadership development.
                            </>) : (
                                <>
                                    Join us as we work to build stronger, healthier communities through entrepreneurship, advocacy, and leadership development.
                                </>
                            )}
                    </p>
                    {!user ? (
                        <div className="pt-10">
                            <Button className="font-bold px-10 py-8 rounded-none text-lg text-white" style={{ backgroundColor: '#cd0c0c', border: 'none' }} onClick={() => setOpen(!open)}>Register</Button>
                        </div>) : null}
                </div>

                {/* Image Section */}
                <div className="w-full max-w-md mt-auto">
                    <img
                        src={assets.herosmall}
                        alt="Scott Presler speaking"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
            {/* {open && (<SignUpPopUp />)} */}
            {open && (
                <SlideInDialog open={open} setOpen={setOpen}>
                    <SignUpPopUp onSuccess={hideSignUp} />
                </SlideInDialog>
            )}
            {openTwo && (
                <SlideInDialog open={openTwo} setOpen={setOpenTwo}>
                    <LoginPopUp />
                </SlideInDialog>
            )}

            {/* Success Dialog */}
            {showSuccess && (
                <SlideInDialog open={showSuccess} setOpen={setShowSuccess}>
                    <SuccessDialog onSucess={hideSucess} />
                </SlideInDialog>
            )}
        </>
    )
}

export default MobileHeroSection