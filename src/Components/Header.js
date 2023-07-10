import React from "react";
import { Link } from "react-router-dom";
import { CartState } from "../Context/context";
import {
  Navbar,
  Container,
  FormControl,
  Dropdown,
  Nav,
  Badge,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const handleLogout = () => {
    firebase.auth().signOut();
    window.location.href = "/login";
  };

  return (
    <Navbar bg="primary" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link
            to="/home"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Shopping Site
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Nav.Link as={Link} to="/profile" style={{ color: "white" }}>
            <button type="button" class="btn btn-light">
              Profile
            </button>
          </Nav.Link>
          <Nav.Link onClick={handleLogout} style={{ color: "white" }}>
            <button type="button" class="btn btn-danger">
              Logout
            </button>
          </Nav.Link>
          <Dropdown drop="start">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.map((prod) => (
                <span key={prod.id} className="cartItem">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="cartItemImg"
                  />
                  <div className="cartItemDetail">
                    <span>{prod.name}</span>
                    <span>{prod.price}</span>
                  </div>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  />
                </span>
              ))}
              <Link to="/cart">
                <Button style={{ width: "95%", margin: "0 10px" }}>
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
