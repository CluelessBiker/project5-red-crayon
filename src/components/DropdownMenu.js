import React from "react";
// import styles from "../styles/DropdownMenu.module.css";
import { Dropdown } from "react-bootstrap";

/**
* Position the menu correctly 
*/
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-solid fa-ellipsis-vertical"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

/**
* Dropdown menu component.
* Function code provided in Moments walkthrough.
*/
export const DropdownMenu = ({ handleEdit, handleDelete}) => {
    
    return (
        <Dropdown>
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item
                    onClick={handleEdit}
                    aria-label="edit"
                ><i className="fa-solid fa-pencil"></i></Dropdown.Item>

                <Dropdown.Item
                    onClick={handleDelete}
                    aria-label="delete"
                ><i className="fa-solid fa-ban"></i></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default DropdownMenu;