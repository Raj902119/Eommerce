import Navbar from "../components/NavBar"
import ProductDetail from "../components/ProductDetails";
import Footer from "../common/Footer";
function ProductDetailPage() {
    return ( 
        <div>
            <Navbar>
                <ProductDetail></ProductDetail>
            </Navbar>
            <Footer />
        </div>
     );
}

export default ProductDetailPage;