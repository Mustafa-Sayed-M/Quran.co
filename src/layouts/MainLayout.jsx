import AudioPlayer from "@components/layout/AudioPlayer";
import Navbar from "@components/layout/Navbar";
import TafsirModal from "@components/modals/TafsirModal";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {

    const initialMainHeight = 48 * 3;

    const navbarRef = useRef(null);
    const playerRef = useRef(null);
    const [mainHeight, setMainHeight] = useState(initialMainHeight);

    useEffect(() => {
        const updateHeight = () => {
            const navbarHeight = navbarRef.current?.offsetHeight || 0;
            const playerHeight = playerRef.current?.offsetHeight || 0;
            const total = navbarHeight + playerHeight;
            setMainHeight(`calc(100vh - ${total}px)`);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <div className="main-layout h-screen max-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar ref={navbarRef} />
            {/* Main */}
            <main className="main-content bg-gray-300 sm:py-3 lg:py-5 flex-1 relative" style={{ height: mainHeight }}>
                <Outlet />
            </main>
            {/* Audio Player */}
            <AudioPlayer ref={playerRef} />
        </div>
    )
}

export default MainLayout;