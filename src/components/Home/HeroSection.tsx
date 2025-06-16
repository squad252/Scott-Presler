import MobileHeroSection from './MobileHeroSection'
import { assets } from '@/assets'
import SignUpPopUp from './SignUpPopUp';
import { useState } from 'react';
import LoginPopUp from './LoginPopUp';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/button';
import { SlideInDialog } from './SlideInDialog';
import SuccessDialog from './SuccessDialog';

const HeroSection = () => {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { user, logout } = useAuth();
    const hideSignUp = () => {
        setShowSuccess(true)
        setOpen(false)
    }

    const hideSucess = () => {
        setShowSuccess(false)
        setLoginOpen(true)
    }
    return (
        <>
            <div
                className="w-full min-h-screen overflow-hidden hidden lg:block"
                style={{
                    background: user
                        ? "linear-gradient(164.56deg, #74B4DA 8.05%, #74B4DA 51.61%, #0057FF 69.48%, #193FD5 98.67%)"
                        : "linear-gradient(208.71deg, #10367D 17.19%, #06065C 44.22%, #0F49B5 62.58%, #1D62E3 82.31%)",
                }}
            >
                {/* Navigation */}
                <nav className="flex justify-between items-center px-[2rem] py-6 absolute w-full">
                    <div className="logo-container">
                        <img src={assets.logo} alt="Logo" />
                    </div>
                    <div className="nav-links font-bold">
                        {["About", "Programs", "Memberships", "Contact"].map((label) => (
                            <a key={label} href="#" className="text-white px-6">
                                {label}
                            </a>
                        ))}
                    </div>
                    <div className="btn flex gap-5 flex-row">
                        {!user ? (
                            <button
                                className="auth-button font-bold text-white px-4 py-1.5"
                                style={{ border: 'solid', borderColor: 'white', borderWidth: '1px' }}
                                onClick={() => setLoginOpen(true)}
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                className="auth-button font-bold text-white px-4 py-1.5"
                                style={{ backgroundColor: '#cd0c0c', border: 'none' }}
                                onClick={logout}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </nav>
                {/* Hero Section */}
                <div className="flex w-full min-h-screen items-center text-white pt-20">
                    {/* Left Side - Image */}
                    <div className="w-1/2 flex">
                        <img
                            src={assets.hero}
                            alt="Scott Presler speaking"
                            className="w-full"
                        />
                    </div>
                    {/* Right Side - Text */}
                    <div className="w-1/2 flex flex-col justify-center pr-16 space-y-6">
                        <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight">
                            {user ? "Membership" : (
                                <>
                                    Welcome to The<br />
                                    Scott Presler<br />
                                    Foundation
                                </>
                            )}
                        </h1>
                        <p
                            className={`text-sm lg:text-base leading-relaxed ${
                                user ? "text-black" : "text-white/90"
                            }`}
                        >
                            {user ?
                                (<>
                                    The Scott Presler Foundation is a dynamic for-profit organization dedicated to driving innovative solutions that empower communities, enhance civic participation, and promote sustainable social impact. We combine business innovation with social responsibility to create meaningful, lasting change.
                                    <br /><br />
                                    Join us as we work to build stronger, healthier communities through entrepreneurship, advocacy, and leadership development.
                                </>) : (
                                    <>
                                        The Scott Presler Foundation is a dynamic for-profit organization dedicated to driving innovative solutions that empower communities, enhance civic participation, and promote sustainable social impact. We combine business innovation with social responsibility to create meaningful, lasting change.
                                        <br /><br />
                                        Join us as we work to build stronger, healthier communities through entrepreneurship, advocacy, and leadership development.                                </>
                                )}
                        </p>
                        {!user && (
                            <div className="pb-10">
                                <Button
                                    className="font-bold px-10 py-8 rounded-none text-lg text-white"
                                    style={{ backgroundColor: '#cd0c0c', border: 'none' }}
                                    onClick={() => setOpen(true)}
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <MobileHeroSection />
            {open && (
                <SlideInDialog open={open} setOpen={setOpen}>
                    <SignUpPopUp onSuccess={hideSignUp} />
                </SlideInDialog>
            )}
            {loginOpen && (
                <SlideInDialog open={loginOpen} setOpen={setLoginOpen}>
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

export default HeroSection