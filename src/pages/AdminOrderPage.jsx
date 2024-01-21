import NavBar from "../components/NavBar";
import AdminOrders from "../AdminFeature/components/AdminOrders";
function AdminOrderPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
     );
}

export default AdminOrderPage;