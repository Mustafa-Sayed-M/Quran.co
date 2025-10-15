import { NavLink } from "react-router-dom";
import { IoMdCloseCircle, IoMdSettings } from "react-icons/io"
import { useSettingContext } from "@contexts/SettingContext";

const links = [
    {
        to: "/",
        label: "الرئيسية"
    },
    {
        to: "/bookmark",
        label: "المحفوظة"
    }
];

function Navbar({ ref }) {

    const { openSetting, setOpenSetting } = useSettingContext();

    return (
        <nav ref={ref} className="bg-slate-800 text-white py-3 lg:py-5">
            <div className="container flex items-center justify-between">
                {/* Links */}
                <div className="nav-links">
                    <ul className="flex items-center">
                        {
                            links.map((link, index) => (<li key={index}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => `block py-2 px-4 font-medium transition ${isActive ? "text-[#01ac52]" : "text-[#e6e6e6] sm:hover:text-[#01ac52]"}`}
                                >
                                    {link.label}
                                </NavLink>
                            </li>))
                        }
                    </ul>
                </div>
                {/* Setting */}
                <button
                    title="الأعدادات"
                    className="lg:hidden"
                    aria-label="Settings/الأعدادات"
                    onClick={() => setOpenSetting(prev => !prev)}
                >
                    {
                        openSetting ? (
                            <IoMdCloseCircle size={30} className="text-red-400" />
                        ) : (
                            <IoMdSettings size={30} />
                        )
                    }
                </button>
            </div>
        </nav>
    )
}

export default Navbar;