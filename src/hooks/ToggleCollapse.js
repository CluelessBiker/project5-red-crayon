import React, { useEffect, useRef, useState } from "react";

/**
* Collapse toggle (burger menu) on mouseClick.
* Variables & function code provided in Moments walkthrough.
*/
const ToggleCollapse = () => {

    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            };
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);

    return { expanded, setExpanded, ref };

};

export default ToggleCollapse;