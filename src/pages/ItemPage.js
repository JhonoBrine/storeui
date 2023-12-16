import axios from "axios";
import { useEffect, useState } from "react";

import '../style/CustomerPage.css';
export default function ItemPage() {
const [custData, setCustData] = useState([]);
const [custID, setCustID] = useState(null);
const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
const [isCreateSuccess, setIsCreateSuccess] = useState(null);

const [itemPrice, setItemPrice] = useState(false);
const [itemName, setItemName] = useState("");
const [itemQuantity, setItemQuantity] = useState("");

const [custUpdateData, setUpdateCustData] = useState({});
const [updateItemPrice, setUpdateItemPrice] = useState(false);
const [updateName, setUpdateName] = useState("");
const [updateQuantity, setUpdateQuantity] = useState("");
const [isModalOpen, setModalOpen] = useState(false);

useEffect(() => {
    fetchData();
}, []);

const fetchData = () => {
    axios
    .get("http://localhost:5000/items")
    .then((response) => {
        setCustData(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching item data:", error);
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
        .delete(`http://localhost:5000/items/${custID}`)
        .then((response) => {
        console.log("Item deleted successfully");
            fetchData();
        })
        .catch((error) => {
        console.error("Error deleting Item:", error);
        });
    }
};

const handleCreateSubmit = () => {

    const customerData = {
        itemName: itemName,
        itemQuantity: itemQuantity,
        itemPrice: itemPrice
    }

    axios.post("http://localhost:5000/items", customerData)
    .then((response) => {
        console.log("Item created successfully");
        setIsCreateSuccess(true);
        fetchData();
    })
    .catch((error) => {
        console.error("Error creating Item:", error);
        setIsCreateSuccess(false);
    })
    .finally(() =>{
        setItemName("");
        setItemPrice("");
        setItemQuantity("");
    })

};

const openModal = (prop) => {
    setCustID(prop.itemID);
    setUpdateCustData(prop);
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
};

const handleUpdateSubmit = () => {

    const customerData = {
        itemName: updateName,
        itemQuantity: updateQuantity,
        itemPrice: updateItemPrice
    }

    axios.put(`http://localhost:5000/items/${custID}`, customerData)
    .then((response) => {
        console.log("Item updated successfully");
        fetchData();
    })
    .catch((error) => {
        console.error("Error updating item:", error);
    })
    .finally(() => {
        setUpdateName("");
        setUpdateItemPrice("");
        setUpdateQuantity("");
        closeModal();
    })

};

return (
    <>
    <div className="customer-page-container">

    <div className="customer-tab">
        <h1>Items List</h1>
        <table>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {custData.map((item) => (
                    <tr key={item.itemID}>
                        <td>{item.itemID}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemQuantity}</td>
                        <td>
                            <button onClick={() =>{ openModal(item);}}>Detail</button>
                            <button onClick={() => handleDeleteClick(item.itemID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div className="customer-tab">
        <h1>Create New Item</h1>
        <label>
        Item Name
        <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
        />
        </label>
        <br />
        <label>
        Item Quantity
        <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
        />
        </label>
        <br />
        <label>
        Item Price
        <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
        />
        </label>

        <br />
        <button onClick={handleCreateSubmit}>Create</button>
        {isCreateSuccess !== null && (
        <div>
            {isCreateSuccess
            ? "Item successfully created"
            : "Failed to create item"}
        </div>
        )}
    </div>

    <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Edit Item</h2>
        <label>
        Item Name
        <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
        />
        </label>
        <br />
        <label>
        Item Quantity
        <input
            type="number"
            value={updateQuantity}
            onChange={(e) => setUpdateQuantity(e.target.value)}
        />
        </label>
        <br />
        <label>
        Item Price
        <input
            type="number"
            value={updateItemPrice}
            onChange={(e) => setUpdateItemPrice(e.target.value)}
        />
        </label>
        <button onClick={handleUpdateSubmit}>Update</button>
        </Modal>
    </div>

        {isDeleteConfirmationOpen && (
            <div>
                {window.confirm("Are you sure you want to delete this item?")
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
