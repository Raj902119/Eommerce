import NavBar from "../components/NavBar";
import AdminProductList from "../AdminFeature/components/AdminProductList";

function AdminHome() {
    return ( 
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
     );
}

export default AdminHome;