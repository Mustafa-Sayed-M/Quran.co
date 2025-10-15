import { useEffect, useState, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";

function SelectInput({
    label,
    placeholder,
    data = [],
    isLoading = true,
    valueKey = "id",
    labelKey = "name",
    defaultValue = null,
    onSelect,
    className,
    ...inputProps
}) {

    const [searchValue, setSearchValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const [filteredList, setFilteredList] = useState(data);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Sync data
    useEffect(() => {
        if (data.length > 0) {
            setFilteredList(data);

            if (!selectedValue) {
                setSelectedValue(defaultValue || data[0]);
            }
        }
    }, [data, defaultValue, selectedValue]);

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    // Filter when search changes
    useEffect(() => {
        if (!data.length) return;
        if (searchValue.trim()) {
            setFilteredList(
                data.filter((item) =>
                    item[labelKey].toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        } else {
            setFilteredList(data);
        }
    }, [searchValue, data, labelKey]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setSelectedValue(item);
        setSearchValue("");
        setOpen(false);
        onSelect?.(item);
    };

    const selectedLabel =
        isLoading
            ? "جارٍ التحميل..."
            : selectedValue?.[labelKey] || placeholder;

    return (
        <div ref={wrapperRef} className={`relative w-full ${className}`}>
            {label && <label htmlFor={inputProps.id} className="block mb-2 font-medium">{label}</label>}

            {/* Input */}
            <div className="relative">
                <IoSearchSharp className="absolute top-1/2 -translate-y-1/2 left-2" />
                <input
                    type="text"
                    value={searchValue}
                    {...inputProps}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={selectedLabel}
                    disabled={isLoading}
                    className="bg-gray-100 border border-gray-300 w-full h-[40px] leading-10 block rounded-sm px-3 pl-8 focus:outline-none focus:ring-2 focus:ring-[#01ac52]"
                />
            </div>

            {/* Dropdown */}
            <div
                className={`absolute z-10 max-sm:w-full sm:min-w-full sm:text-nowrap top-full right-0 mt-2 bg-white border border-gray-300 rounded-sm transition-all duration-200 max-h-[250px] overflow-y-auto ${open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
            >
                {isLoading ? (
                    <p className="text-gray-500 text-sm p-2 text-center">جاري التحميل...</p>
                ) : filteredList.length > 0 ? (
                    filteredList.map((item) => (
                        <div
                            key={item[valueKey]}
                            onClick={() => handleSelect(item)}
                            className={`p-2 cursor-pointer transition ${selectedValue?.[valueKey] === item[valueKey]
                                ? "bg-[#01ac52] text-white sticky top-0 bottom-0 z-10"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {item[labelKey]}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm p-2">لا يوجد نتائج</p>
                )}
            </div>
        </div>
    );
}

export default SelectInput;