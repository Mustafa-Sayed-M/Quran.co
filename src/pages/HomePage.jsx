import Chapter from "@components/layout/Chapter";
import Sidebar from "@components/layout/Sidebar";
import TafsirModal from "@components/modals/TafsirModal";

function HomePage() {
    return (
        <div className="home-page h-full">
            <div className="sm:container flex flex-col lg:flex-row items-start gap-3 sm:gap-5 h-full">
                <Sidebar />
                <Chapter />
            </div>

            {/* Tafisr Modal */}
            <TafsirModal />
        </div>
    )
}

export default HomePage;