import { Route, Routes } from "react-router-dom";
import CustomerPage from "./CustomerPage";
import ItemPage from "./ItemPage";
import OrderList from "./OrderList";
import NavBarMain from "./navbarMain";


export default function StoreRouter(){


    return (<>

        <NavBarMain/>
        <Routes>
            <Route path="/" element={<OrderList/>} />
            <Route path="/customer" element={<CustomerPage/>}/>
            <Route path="/item" element={<ItemPage/>}/>
        </Routes>

    </>)
}


