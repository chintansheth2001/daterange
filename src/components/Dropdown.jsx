import { useState, useEffect } from "react";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";
import "./Dropdown.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";

const Dropdown = ({
  target,
  isOpen,
  handleOpen,
  asOfDate,
  handleAsOfDate,
  handleRange,
  handleLRCount,
}) => {
  const [dateRange, setDateRange] = useState("current_month");

  const [tab, setTab] = useState("Range");
  const [asOfDateInput, setAsOFDateInput] = useState(asOfDate);
  const [state, setState] = useState([
    {
      startDate: new Date(asOfDate),
      endDate: addDays(new Date(asOfDate), 5),
      key: "selection",
    },
  ]);

  const handleAsOfDateInput = (e) => {
    setAsOFDateInput(new Date(e.target.value));
  };

  const handleApplyAsOfDate = () => {
    handleAsOfDate(new Date(asOfDateInput));
    handleOpen();
  };

  const handleTab = (v) => {
    setTab(v);
  };

  const handleApplyDateRange = () => {
    if (tab === "Range") {
      if (dateRange === "current_month") {
        handleRange({
          startDate: startOfMonth(new Date(asOfDate)),
          endDate: endOfMonth(new Date(asOfDate)),
        });
      }
      if (dateRange === "next_30_days") {
        handleRange({
          startDate: new Date(asOfDate),
          endDate: addDays(new Date(), 30),
        });
      }
      if (dateRange === "next_60_days") {
        handleRange({
          startDate: new Date(asOfDate),
          endDate: addDays(new Date(), 60),
        });
      }
      if (dateRange === "next_90_days") {
        handleRange({
          startDate: new Date(asOfDate),
          endDate: addDays(new Date(), 90),
        });
      }

      if (dateRange === "custom") {
        handleRange({
          startDate: new Date(state[0].startDate),
          endDate: new Date(state[0].endDate),
        });
      }
    } else {
      handleRange({
        startDate: new Date(state[0].startDate),
        endDate: new Date(state[0].endDate),
      });
    }
    handleLRCount({
      count: 0,
      tab: tab,
      dateRange: dateRange,
    });
    handleOpen();
  };

  const handleDateRange = (e) => {
    setDateRange(e.target.value);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    if (tab === "Weeks") {
      setState(() => [
        {
          startDate: startOfWeek(new Date(startDate)),
          endDate: endOfWeek(new Date(startDate)),
          key: "selection",
        },
      ]);
    }
    if (tab === "Months") {
      setState(() => [
        {
          startDate: startOfMonth(new Date(startDate)),
          endDate: endOfMonth(new Date(startDate)),
          key: "selection",
        },
      ]);
    }
    if (tab === "Date") {
      setState(() => [
        {
          startDate: startOfDay(new Date(startDate)),
          endDate: endOfDay(new Date(startDate)),
          key: "selection",
        },
      ]);
    }
    if (tab === "Range") {
      setState(() => [
        {
          startDate: startOfDay(new Date(startDate)),
          endDate: endOfDay(new Date(endDate)),
          key: "selection",
        },
      ]);
    }
  };

  useEffect(() => {
    handleDateRangeChange(asOfDate, asOfDate);
  }, [tab]);
  return (
    <div className="dropdown_outer">
      {target}
      {isOpen && (
        <div className="dropdown arrow-top">
          <div>
            <div className="tabs">
              <div
                onClick={() => handleTab("Date")}
                className={`${tab === "Date" ? "active" : ""}`}
              >
                Date
              </div>
              <div
                onClick={() => handleTab("Range")}
                className={`${tab === "Range" ? "active" : ""}`}
              >
                Range
              </div>
              <div
                onClick={() => handleTab("Weeks")}
                className={`${tab === "Weeks" ? "active" : ""}`}
              >
                Weeks
              </div>
              <div
                onClick={() => handleTab("Months")}
                className={`${tab === "Months" ? "active" : ""}`}
              >
                Months
              </div>
            </div>
          </div>
          <div className="other_options">
            {tab === "Range" && (
              <>
                <div>
                  <input
                    type="radio"
                    id="current_month"
                    name="range"
                    value="current_month"
                    checked={dateRange === "current_month"}
                    onChange={handleDateRange}
                  />
                  <label htmlFor="current_month">Current Month</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="next_30_days"
                    name="range"
                    value="next_30_days"
                    checked={dateRange === "next_30_days"}
                    onChange={handleDateRange}
                  />
                  <label htmlFor="next_30_days">Next 30 Days</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="next_60_days"
                    name="range"
                    value="next_60_days"
                    checked={dateRange === "next_60_days"}
                    onChange={handleDateRange}
                  />
                  <label htmlFor="next_60_days">Next 60 Days</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="next_90_days"
                    name="range"
                    value="next_90_days"
                    checked={dateRange === "next_90_days"}
                    onChange={handleDateRange}
                  />
                  <label htmlFor="next_90_days">Next 90 Days</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="custom"
                    name="range"
                    value="custom"
                    checked={dateRange === "custom"}
                    onChange={handleDateRange}
                  />
                  <label htmlFor="custom">Custom</label>
                </div>
              </>
            )}
            {/* <div className="from_to">
              <input className="input_text" type="text" id="from" name="from" />
              <input className="input_text" type="text" id="to" name="to" />
            </div> */}
            {(dateRange === "custom" && tab == "Range") || tab !== "Range" ? (
              <div>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) =>
                    handleDateRangeChange(
                      item.selection.startDate,
                      item.selection.endDate
                    )
                  }
                  moveRangeOnFirstSelection={true}
                  ranges={state}
                  showMonthAndYearPickers={true}
                  showDateDisplay={true}
                  minDate={new Date(asOfDate)}
                  showPreview={false}
                />
              </div>
            ) : null}

            <button className="button" onClick={handleApplyDateRange}>
              Apply
            </button>
          </div>
          <div className="as_of">
            <label htmlFor="current_month">
              <strong>As Of Date</strong>
            </label>
            <input
              className="input_text"
              type="date"
              id="as_of_date"
              name="as_of_date"
              value={format(asOfDateInput, "yyyy-MM-dd")}
              onChange={handleAsOfDateInput}
            />
            <button className="button" onClick={handleApplyAsOfDate}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
