import React from "react";
import styles from "../styles/DropdownMenu.module.css";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

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
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu popperConfig={{ strategy: "fixed" }} >
                <Dropdown.Item
                    onClick={handleEdit}
                    aria-label="edit"
                ><i className="fa-solid fa-pencil" /></Dropdown.Item>

                <Dropdown.Item
                    onClick={handleDelete}
                    aria-label="delete"
                ><i className="fa-solid fa-ban" /></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

/**
* Add edit button to each profile element.
*/
export const EditProfileDropdown = ({ id }) => {
    const history = useHistory();

    return (
        <Dropdown drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item>Edit:</Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >profile <i className="fa-solid fa-pencil" /></Dropdown.Item>

                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >username <i className="fa-solid fa-pencil" /></Dropdown.Item>

                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >password <i className="fa-solid fa-pencil" /></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;