import React, { useEffect, useState } from "react";
import { FormHelperText } from "@mui/material";

const CreateOTP = ({
  setOpenOTP,
  formValueOTP,
  handleOTPChange,
  handleOTPClick,
  formOTPError,
}) => {
  const [counter, setCounter] = useState(60);
  console.log(formValueOTP, "formValueOTP");

  useEffect(() => {
    // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter > 0
      ? setTimeout(() => setCounter(counter - 1), 1000)
      : setOpenOTP(false);
  }, [counter, setOpenOTP]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="d-grid gap-2">
        <input
          className="form-control"
          onChange={handleOTPChange}
          value={
            formValueOTP?.verificationEmailCode
              ? formValueOTP?.verificationEmailCode
              : ""
          }
        />
        {formOTPError?.verificationEmailCode && (
          <FormHelperText error>
            {formOTPError?.verificationEmailCode}
          </FormHelperText>
        )}
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            handleOTPClick();
          }}
        >
          Send OTP
        </button>
        <div>Countdown: {counter}</div>
      </div>
    </div>
  );
};

export default CreateOTP;
