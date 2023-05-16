import React, { useEffect, useState } from "react";

const OptionSelection = ({ options, oldOptions, type, onSelectionChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (oldOptions) setSelectedOptions(oldOptions);
    }, []);

    const handleOptionToggle = (option) => {
        const isSelected = selectedOptions.includes(option);
        isSelected
            ? setSelectedOptions(selectedOptions.filter((o) => o !== option))
            : setSelectedOptions([...selectedOptions, option]);

        if (onSelectionChange) {
            onSelectionChange(option, !isSelected);
        }
    };

    const sortedOptions = [...options].sort((a, b) => {
        const isSelectedA = selectedOptions.includes(a);
        const isSelectedB = selectedOptions.includes(b);

        if (isSelectedA && !isSelectedB) {
            return -1;
        } else if (!isSelectedA && isSelectedB) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <div className="my-4">
            <h2 className="text-indigo-500 text-2xl font-bold pb-4">
                Your preferred {type}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                {sortedOptions.map((option) => (
                    <label
                        key={option}
                        className="flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleOptionToggle(option)}
                        />
                        <span className="ml-2 text-sm">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default OptionSelection;
