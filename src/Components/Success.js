import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
let Success = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "25px" }}>
        Your Items are Successfully Added To The Cart
      </h3>
      <Link to="/home">
        <Button type="button">Return to Home</Button>
      </Link>
    </div>
  );
};
export default Success;
