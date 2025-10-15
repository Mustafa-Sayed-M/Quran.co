import React from "react";

function VerseAction({ icon, label, className, ...props }) {
    return (
        <div className="verse-action relative group" >
            {/* Tooltip */}
            <div className="py-1 px-1.5 rounded-xs border border-gray-300 bg-gray-100 text-xs text-nowrap left-1/2 -translate-x-1/2 -top-full -mt-2 absolute z-10 transition opacity-0 pointer-events-none group-hover:opacity-100">{label}</div>
            {/* Action BTN */}
            <button
                {...props}
                type="button"
                className={`${className} sm:hover:text-[#01ac52] transition w-9 h-9 flex items-center justify-center rounded-full sm:hover:bg-gray-200`}
            >
                {icon}
                <span className="sr-only">{label}</span>
            </button>
        </div>
    )
}

export default VerseAction;