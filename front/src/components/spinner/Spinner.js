import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div style={containerStyle}>
      <TailSpin color="#0d1e2d" height={100} width={100} />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 60,
};

export default Spinner;
