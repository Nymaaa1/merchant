// components/StyledDateRangePicker.js

import React, { useState } from 'react';
import { DateRangePicker as ReactDateRangePicker, DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Import date range picker styles
import 'react-date-range/dist/theme/default.css'; // Import default theme
import styles from './date.css';

const StyledDateRangePicker = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  });
  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = () => {
    setShowPicker(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
        readOnly
        onClick={handleButtonClick}
        className="date-item"
        placeholder="Select dates"
      />
      {showPicker && (
        <div className={styles.pickerContainer}>
          <ReactDateRangePicker
            ranges={[selectionRange]}
            onChange={item => setSelectionRange(item.selection)}
            moveRangeOnFirstSelection={false}
          />
        </div>
      )}
    </div>
  );
};

export default StyledDateRangePicker;
