import Footer from "../common/Footer";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList"

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer />
        </div>
     );
}

export default Home;