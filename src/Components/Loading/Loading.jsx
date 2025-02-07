import { useState, CSSProperties } from "react";
import { HashLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0aad0a");

  return (
    <div className="sweet-loading">

      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}