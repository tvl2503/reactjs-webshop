
import './App.css';
import Navigation from './components/Navigation';
import "./scss/index.scss"
import SearchForm from './components/Search';
import { useState } from 'react';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import ProductViewModal from './components/ProductViewModal';
import Layout from './components/Layout';
import { modal } from './Context/Context';
function App() {
  const [productId, setProductId] = useState('')
  const handleSetProductID = (id) => {
    setProductId(id)
  }
  const handleRemoveProductID = () => {
    setProductId('')
  }
  const [searchIsShow, setSearchIsShow] = useState(false);
  const showSearchHandler = () => setSearchIsShow(true);
  const hideSearchHandler = () => setSearchIsShow(false);
  return (
    <div className="App"> 
     <ToastContainer autoClose={2000} />
      
      <modal.Provider value = {{productId, handleRemoveProductID, handleSetProductID}} >
      {searchIsShow && <SearchForm onclose = {hideSearchHandler} />}
      <Navigation onShowSearch = {showSearchHandler} />
        <Layout />
      <ProductViewModal />
      </modal.Provider>
      
      <Footer />
    </div>
  );
}

export default App;
