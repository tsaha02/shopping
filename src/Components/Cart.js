import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../Context/context";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handleCheckout = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Your cart is empty.</h3>
        <p>Add some items to your cart and start shopping!</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col>
                  <span>Rs. {prod.price}</span>
                </Col>
                <Col>
                  <span>{prod.ratings}</span>
                </Col>
                <Col>
                  <Form.Select
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {console.log([...Array(prod.inStock).keys()])}
                    {[...Array(prod.inStock).keys()].map((val) => (
                      <option key={val + 1}>{val + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal {cart.length} items</span>
        <span>Total: Rs. {total}</span>
        <Link to="/success" onClick={handleCheckout}>
          <Button type="button">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
