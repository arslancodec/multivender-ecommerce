import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
          console.log(res);
          setSuccess(true);
        } catch (err) {
          console.error(err);
          setError(err.response ? err.response.data.message : "Token expired or invalid");
        } finally {
          setLoading(false);
        }
      };
      sendRequest();
    }
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : success ? (
        <p>Your account has been created successfully!</p>
      ) : null}
    </div>
  );
};

export default ActivationPage;