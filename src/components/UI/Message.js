import React from "react";

const Message = ({ type, text }) => {
    const getMessageClassName = () => {
        if (type === "success") {
            return "bg-green-500";
        } else if (type === "failure") {
            return "bg-red-500";
        } else {
            return "bg-gray-500";
        }
    };

    return (
        <div
            className={`my-4 py-2 px-4 rounded text-white ${getMessageClassName()}`}
        >
            {text}
        </div>
    );
};

export default Message;
