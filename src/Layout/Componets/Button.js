import React from "react";

const Button = ({
    btnStyle,
    extraStyle = "",
    icon,
    text,
    action = () => {},
}) => {
    return (
        <div clannName={extraStyle}>
            <button className={`btn btn-${btnStyle} m-2`} onClick={action}>
                <span className={`oi oi-${icon}`}/> {text}{" "}
            </button>
        </div>
    );
};
export default Button