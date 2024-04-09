import React, { useState } from "react";

const MonthSelector = ({ setMonthYear }) => {
  const [selectedMonth, setSelectedMonth] = useState("");

  // Handler function to update selected month
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setMonthYear(e.target.value);
  };

  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <label htmlFor="monthSelect">Select a Month:</label>

      <select
        className="px-4 py-4 rounded-md border border-slate-500 outline-none w-full"
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="">Select Month</option>
        <option value={`January ${currentYear}`}>January {currentYear}</option>
        <option value={`February ${currentYear}`}>
          February {currentYear}
        </option>
        <option value={`March ${currentYear}`}>March {currentYear}</option>
        <option value={`April ${currentYear}`}>April {currentYear}</option>
        <option value={`May ${currentYear}`}>May {currentYear}</option>
        <option value={`June ${currentYear}`}>June {currentYear}</option>
        <option value={`July ${currentYear}`}>July {currentYear}</option>
        <option value={`August ${currentYear}`}>August {currentYear}</option>
        <option value={`September ${currentYear}`}>
          September {currentYear}
        </option>
        <option value={`October ${currentYear}`}>October {currentYear}</option>
        <option value={`November ${currentYear}`}>
          November {currentYear}
        </option>
        <option value={`December ${currentYear}`}>
          December {currentYear}
        </option>
      </select>
      {selectedMonth && <p>You selected: {selectedMonth}</p>}
    </div>
  );
};

export default MonthSelector;
