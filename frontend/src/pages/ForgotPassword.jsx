import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import OtpInput from "../components/OtpInput";
import ResetPassword from "./ResetPassword";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const { backendUrl } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [step, setStep] = useState(1);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(backendUrl + "/api/user/forgot-password",{email});

      if (res.data.success) {
        setStep(2);
        toast.success("OTP sent to your email");
      } 
      else {
        toast.error(res.data.message);
      }
    } 
    catch (err) {
      toast.error("Failed to send OTP");
    } 
    finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setOtpError(false);

      const otpValue = otp.join("");
      const res = await axios.post(backendUrl + "/api/user/verify-otp",{email,otp:otpValue});

      if (res.data.success) {
        setStep(3);
      } 
      else {
        setOtpError(true);
        toast.error(res.data.message);
      }
    } 
    catch (err) {
      setOtpError(true);
      toast.error("OTP verification failed");
    } 
    finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(backendUrl + "/api/user/forgot-password",{email});

      toast.success("New OTP sent");
      setOtp(Array(6).fill(""));
      setOtpError(false);
    } 
    catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 pt-24 sm:pt-28">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-5 sm:p-6 shadow-sm">
        <p className="prata-regular text-xl sm:text-2xl text-center mb-6">
          Forgot Password
        </p>

        {step === 1 && (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
              required
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-800 rounded-md mb-4"
            />

            <button onClick={sendOtp} disabled={loading}
              className="w-full cursor-pointer bg-black text-white py-2 rounded-md text-sm sm:text-base"
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 text-center">
              Enter the 6-digit OTP sent to your email
            </p>

            <div className="flex justify-center mb-4">
              <OtpInput otp={otp} setOtp={setOtp} />
            </div>

            <button onClick={verifyOtp} disabled={loading}
              className="w-full cursor-pointer bg-black text-white py-2 rounded-md text-sm sm:text-base"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {otpError && (
              <div className="mt-4 flex justify-between px-2">
                <button onClick={resendOtp} className="text-sm text-blue-600 underline cursor-pointer">
                  Resend OTP
                </button>

                <button className="text-sm text-gray-600 underline cursor-pointer"
                  onClick={() => {
                    setStep(1);
                    setOtp(Array(6).fill(""));
                  }}>
                  Change Email
                </button>
              </div>
            )}
          </>
        )}

        {step === 3 && <ResetPassword email={email} />}

      </div>
    </div>
  );
};

export default ForgotPassword;