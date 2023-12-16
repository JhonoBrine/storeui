import axios from "axios";
import { useEffect, useState } from "react";

import '../style/CustomerPage.css';
export default function CustomerPage() {
const [custData, setCustData] = useState([]);
const [custID, setCustID] = useState(null);
const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
const [isCreateSuccess, setIsCreateSuccess] = useState(null);

const [isMember, setIsMember] = useState(false);
const [fname, setFname] = useState("");
const [lname, setLname] = useState("");

const [custUpdateData, setUpdateCustData] = useState({});
const [updateMember, setUpdateMember] = useState(false);
const [updateFname, setUpdateFname] = useState("");
const [updateLname, setUpdateLname] = useState("");
const [isModalOpen, setModalOpen] = useState(false);

useEffect(() => {
    fetchData();
}, []);

const fetchData = () => {
    axios
    .get("http://localhost:5000/customers")
    .then((response) => {
        setCustData(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching customer data:", error);
    });
};

const handleDeleteClick = (id) => {
    setCustID(id);
    setIsDeleteConfirmationOpen(true);
};

const handleDeleteConfirmation = (confirm) => {
    setIsDeleteConfirmationOpen(false);
    if (confirm) {
    axios
        .delete(`http://localhost:5000/customers/${custID}`)
        .then((response) => {
        console.log("Customer deleted successfully");
            fetchData();
        })
        .catch((error) => {
        console.error("Error deleting customer:", error);
        });
    }
};

const handleCreateSubmit = () => {

    const customerData = {
        custFname: fname,
        custLName: lname,
        isMember: isMember
    }

    axios.post("http://localhost:5000/customers", customerData)
    .then((response) => {
        console.log("Customer created successfully");
        setIsCreateSuccess(true);
        fetchData();
    })
    .catch((error) => {
        console.error("Error creating customer:", error);
        setIsCreateSuccess(false);
    })
    .finally(() =>{
        setFname("");
        setLname("");
        setIsMember(false);
    })

};

const openModal = (prop) => {
    setCustID(prop.custID);
    setUpdateCustData(prop);
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
};

const handleUpdateSubmit = () => {

    const customerData = {
        custFname: updateFname,
        custLName: updateLname,
        isMember: updateMember
    }

    axios.put(`http://localhost:5000/customers/${custID}`, customerData)
    .then((response) => {
        console.log("Customer updated successfully");
        fetchData();
    })
    .catch((error) => {
        console.error("Error updating customer:", error);
    })
    .finally(() => {
        setUpdateFname("");
        setUpdateLname("");
        setUpdateMember(false);
        closeModal();
    })

};

return (
    <>
    <div className="customer-page-container">

    <div className="customer-tab">
        <h1>Customers List</h1>
        <table>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Is Member?</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {custData.map((customer) => (
                    <tr key={customer.custID}>
                        <td>{customer.custID}</td>
                        <td>{customer.custFname}</td>
                        <td>{customer.custLName}</td>
                        <td>{customer.isMember ? "Member" : "Non-member"}</td>
                        <td>
                            <button onClick={() =>{ openModal(customer);}}>Detail</button>
                            <button onClick={() => handleDeleteClick(customer.custID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div className="customer-tab">
        <h1>Create New Customer</h1>
        <label>
        First Name:
        <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
        />
        </label>
        <br />
        <label>
        Last Name:
        <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
        />
        </label>
        <br />
        <label>
        Member:
        <input
            type="checkbox"
            checked={isMember}
            onChange={(e) => setIsMember(e.target.checked)}
        />
        </label>

        <br />
        <button onClick={handleCreateSubmit}>Create</button>
        {isCreateSuccess !== null && (
        <div>
            {isCreateSuccess
            ? "Customer successfully created"
            : "Failed to create customer"}
        </div>
        )}
    </div>

    <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Edit Customer</h2>
        <label>
        First Name:
            <input
                type="text"
                value={updateFname}
                onChange={(e) => setUpdateFname(e.target.value)}
            />
        </label>
        <br />
        <label>
        Last Name:
            <input
                type="text"
                value={updateLname}
                onChange={(e) => setUpdateLname(e.target.value)}
            />
        </label>
        <br />
        <label>
        Member:
            <input
                type="checkbox"
                checked={updateMember}
                onChange={(e) => setUpdateMember(e.target.checked)}
            />
        </label>
        <button onClick={handleUpdateSubmit}>Update</button>
        </Modal>
    </div>

        {isDeleteConfirmationOpen && (
            <div>
                {window.confirm("Are you sure you want to delete this user?")
                ? handleDeleteConfirmation(true)
                : handleDeleteConfirmation(false)}
            </div>
        )}
    </div>
    </>
);
}

const Modal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        display: isOpen ? 'block' : 'none',
    };

    return (
    <div className="modal" style={modalStyle}>
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            {children}
        </div>
    </div>
    );
};
