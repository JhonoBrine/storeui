
import axios from "axios";
import { useEffect, useState } from "react";

import '../style/OrderList.css';
export default function OrderList(){

    const [orderList, setOrderList] = useState([{}])

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customer-order');
            setOrderList(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        };
    
        fetchOrders();
    
        const intervalId = setInterval(fetchOrders, 5000);
    
        return () => clearInterval(intervalId);
    }, []);
    
    return (
    <>
        <div className="order-container">
            <h2>Orders List</h2>
            <table>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Member</th>
                    <th>Item Name</th>
                    <th>Order Quantity</th>
                    <th>Order Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {orderList.map((order, index) => (
                    <tr key={index}>
                        <td>{order.orderID}</td>
                        <td>{order.custID}</td>
                        <td>{order.custFname}</td>
                        <td>{order.custLName}</td>
                        <td>{order.isMember ? 'Yes' : 'No'}</td>
                        <td>{order.itemName}</td>
                        <td>{order.orderQuantity}</td>
                        <td>{order.orderTotalPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
    );
    }