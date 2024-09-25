"use client";
import { useState } from 'react';

type OtpPinPutProps = {
    otp: string[];
    setOtp: (otp: string[]) => void;
};

const OtpInput: React.FC<OtpPinPutProps> = ({ otp, setOtp }) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [inputTypes, setInputTypes] = useState<string[]>(new Array(otp.length).fill("text"));

    const handleFocus = (index: number) => {
        setFocusedIndex(index);
    };

    const handleBlur = () => {
        setFocusedIndex(null);
    };

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;

        if (!isNaN(Number(value)) && value.length <= 1) {
            if (value === "") {
                setTimeout(() => {
                    const newInputTypes = [...inputTypes];
                    newInputTypes[index] = "text";
                    setInputTypes(newInputTypes);
                }, 300);
            } else {
                
                setTimeout(() => {
                    if (newOtp[index]) {
                        const newInputTypes = [...inputTypes];
                        newInputTypes[index] = "password";
                        setInputTypes(newInputTypes);
                    }
                }, 300);
                // alert("-" + inputTypes[index]);
            }

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== "" && index < otp.length - 1) {
                const nextInput = element.nextSibling as HTMLInputElement;
                nextInput?.focus();
            }
        } else if (value === "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const { key } = e;
        if (key === "Backspace" && otp[index] === "" && index > 0) {
            const prevInput = e.currentTarget.previousSibling as HTMLInputElement;
            prevInput?.focus();
        }
    };

    return (
        <div className="input-field">
            {otp.map((data, index) => {
                const borderColor = focusedIndex === index ? "#4341CC" : "#D1D5E4";
                return (
                    <input
                        // type={inputTypes[index]} 
                        type='text'
                        key={index}
                        value={data}
                        required
                        autoFocus={index === 0}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        style={{
                            color: "#161E34",
                            height: "64px",
                            width: "64px",
                            borderRadius: "6px",
                            outline: "none",
                            borderColor: borderColor,
                            fontSize: "19px",
                            textAlign: "center",
                            border: "1px solid #D1D5E4",
                            marginRight: "8px",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default OtpInput;
