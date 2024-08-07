import React from "react";
import Box from "@mui/material/Box";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Login />
      </Box>
    </div>
  );
};

export default App;
