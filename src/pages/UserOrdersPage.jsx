import NavBar from "../components/NavBar"
import UserOrders from "../components/UserOrders"
const UserOrdersPage = () => {

  return (
    <div>
      <NavBar>
        <h1 className="text-3xl leading-7 text-center font-bold text-gray-900">My Orders</h1>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  )
}

export default UserOrdersPage
