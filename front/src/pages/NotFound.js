import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={containerStyle}>
      <div>
        <h1 style={fontStyle}>
          <span style={spanStyle}>4</span>
          <span style={spanStyle}>0</span>
          <span style={spanStyle}>4</span>
        </h1>
      </div>
      <h2 style={contentStyle}>
        we are sorry, but the page you requested was not found
      </h2>
      <Link to="/" style={linkStyle}>
        GO BACK
      </Link>
    </div>
  );
};

const containerStyle = {
  width: "100%",
  lineHeight: 1.4,
  textAlign: "center",
};

const fontStyle = {
  color: "#262626",
  letterSpacing: "-40px",
  marginLeft: "-20px",
  fontSize: "250px",
  fontWeight: 900,
};

const spanStyle = {
  textShadow: "-8px 0px 0px #fff",
};

const contentStyle = {
  fontFamily: "Cabin",
  fontSize: "20px",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#000",
};

const linkStyle = {
  textDecoration: "underline",
  color: "#262626",
  fontSize: "40px",
  fontWeight: 700,
};

export default NotFound;
