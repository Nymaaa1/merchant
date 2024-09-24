"use client";
import { useEffect, useState } from 'react';

type OtpPinPutProps = {
    type: string;
    otp: string[];
    setOtp: Function;
}
const OtpInput: React.FC<OtpPinPutProps> = ({ type, otp, setOtp }) => {
    // const [otp, setOtp] = useState(new Array(4).fill(""));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [inputType, setInputType] = useState(type);

    // useEffect(() => {
    //     let timer: NodeJS.Timeout | undefined;
    //     if (isPassword) {
    //         timer = setTimeout(() => {
    //             setIsPassword(false);
    //         }, 1000);
    //     }
    //     return () => clearTimeout(timer);
    // }, [isPassword]);

    const handleFocus = (index: number) => {
        setFocusedIndex(index);
    };


    const handleBlur = () => {
        setFocusedIndex(null);
    };

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (!isNaN(Number(value)) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < otp.length - 1) {
                const nextInput = element.nextSibling as HTMLInputElement;
                nextInput?.focus();
            }
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
                        type={inputType}
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
                )
            })}
        </div>
    );
};

export default OtpInput;
