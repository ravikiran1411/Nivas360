import {useRef} from "react";
import "./OtpInput.css";

const OtpInput=({otp,setOtp})=>{
  const inputsRef=useRef([]);

  const handleChange=(e,index)=>{
    const value=e.target.value;

    if (!/^[0-9]?$/.test(value)) {
        return;
    }

    const newOtp=[...otp];
    newOtp[index]=value;
    setOtp(newOtp);

    if (value && index < 5){
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown=(e,index)=>{
    if (e.key === "Backspace" && !otp[index] && index > 0){
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input key={index} ref={(el) => (inputsRef.current[index] = el)} type="text" 
        maxLength="1" value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="otp-box"
        />
      ))}
    </div>
  );
};

export default OtpInput;
