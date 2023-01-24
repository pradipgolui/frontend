import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
      <Routes>
      <Route element ={<PrivateComponent></PrivateComponent>}>
        <Route path='/' element={<ProductList></ProductList>} />
        <Route path='/add' element={<AddProduct></AddProduct>} />
        <Route path='/update/:id' element={<UpdateProduct></UpdateProduct>} />
        <Route path='/logout' element={<h1>Logout Component</h1>} />
        <Route path='/profile' element={<h1>Profile Component</h1>} />
      </Route>

        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/login' element={<Login></Login>} />
      </Routes>
     </BrowserRouter>
     <Footer></Footer>
      
    </div>
  );
}

export default App;
