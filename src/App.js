import "./App.css";
import { FaHome, FaStar,FaTh,FaServer } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import Home from "./Home/Home";
import Interest from "./Interests/Interest";
import Categories from "./Categories/Categories";
import Login from './Login Singup/Login';
import Signup from './Login Singup/Signup';
import Cart from "./Cart/Cart";
import Logo from './logo.jpeg'
import Search from "./Search/Search";
import Product from './Orders/Orders';


function App() {
  return (
    <>
      <Router>
        <div className = "nav">
          <div className="navLeft">
            <ul>
              <li>
                <NavLink className= "navLink" to="/" exact >
                 <img width="100px" src={Logo} alt="logo" /> 
                </NavLink>
              </li>
              <li>
                <NavLink className= "navLink" to="/" exact activeStyle={{ color: "#066D57", borderBottom: "2px solid #066D57" }}>
                  <FaHome />  Home
                </NavLink>
              </li>
              <li>
                <NavLink className= "navLink" to="/interests" exact activeStyle={{ color: "#066D57", borderBottom: "2px solid #066D57" }}>
                  <FaStar/> Interest
                </NavLink>
              </li>
              <li>
                <NavLink
                  className= "navLink"
                  to="/categories"
                  exact
                  activeStyle={{ color: "#066D57", borderBottom: "2px solid #066D57" }}
                >
                  <FaTh/> Categories
                </NavLink>
              </li>
              <li>
                <NavLink className= "navLink" to="/orders" exact activeStyle={{ color: "#066D57", borderBottom: "2px solid #066D57" }}>
                  <FaServer/> Orders
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="navCenter">
            <Search/>
          </div>

          <div className = "navRight">
          {
            localStorage.TOKEN? // if logged show first portion user if not logged show last portion
            <ul>
              <li>
                <NavLink className= "navLink" to="/cart" exact activeStyle={{ color: "magenta" }}>
                  Cart
                </NavLink>
              </li>
              <li style={{marginTop:"5px"}}>
                <button style= {{padding: "10px", fontSize: "20px", borderRadius:"50%", backgroundColor:"white"}}>User</button>
              </li>
            </ul>:
            <ul>
              <li>
                <NavLink className= "navLink" to="/cart" exact activeStyle={{ color: "magenta" }}>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink className= "navLink" to="/login" exact activeStyle={{ color: "magenta" }}>
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink className= "navLink" to="/signup" exact activeStyle={{ color: "magenta" }}>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          }
          </div>
        </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/interests" component={Interest} />
            <Route path="/categories" component={Categories} />
            <Route exact path="/product/:productId" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} /> 
          </Switch>
        
      </Router>
    </>
  );
}

export default App;
