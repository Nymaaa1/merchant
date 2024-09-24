"use client";
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

type DatePickerModel = {
    selectedDate: Date;
    setSelectedDate: (value: Date) => void;
}

const DatePickerWithRange: React.FC<DatePickerModel> = ({ selectedDate, setSelectedDate }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
    }

    return (
        <div style={styles.container}>
            <InputGroup style={styles.wrapper}>
                <Form.Control
                    required
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
                    type='date'
                    name="password"
                    className="tw-input tw-password"
                    placeholder={"t('password')"}
                    autoComplete="off"
                    onChange={handleChange}
                    style={styles.input}
                />
            </InputGroup>
        </div>

    );
}

export default DatePickerWithRange;

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'flex-start',
        // padding: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    wrapper: {
        display: 'flex',
        width: '100%',
        position: 'relative' as 'relative',
    },
    input: {
        fontFamily: 'Code Next',
        borderRadius: "10px",
        padding: "8px",
        height: "48px",
        fontSize: "13px",
        width: "100%",
        border: "1px solid #E8EDF5",
        transition: 'border-color 0.3s ease-in-out',
        color: "#161E34",
        // outline: 'none',
        // appearance: 'none',
    },
    icon: {
        backgroundColor: '#fff',
        border: 'none',
        padding: '0 5px',
        cursor: 'pointer',
    },
};