import { useEffect, useState, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  addDays,
  differenceInDays,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Dropdown from "./Dropdown";

const Selector = () => {
  const [asOfDate, setAsOFDate] = useState(new Date());
  const [dRange, setDRange] = useState({
    startDate: startOfMonth(new Date(asOfDate)),
    endDate: endOfMonth(new Date(asOfDate)),
  });
  const [lrCount, setLRCount] = useState({
    count: 0,
    tab: "Range",
    dateRange: "current_month",
  });
  const [isOpen, setOpen] = useState(false);
  const refOne = useRef(null);

  const rangeMoveToLeft = () => {
    setLRCount({
      count: -1,
      tab: lrCount.tab,
      dateRange: lrCount.dateRange,
    });
  };
  const rangeMoveToRight = () => {
    setLRCount({
      count: 1,
      tab: lrCount.tab,
      dateRange: lrCount.dateRange,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutSide, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutSide = (e) => {
    console.log(refOne.current);
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const result =
      differenceInDays(new Date(dRange.endDate), new Date(dRange.startDate)) +
      1;

    if (lrCount.tab === "Range") {
      if (lrCount.dateRange === "current_month") {
        setDRange({
          startDate: startOfMonth(
            addMonths(new Date(dRange.startDate), lrCount.count)
          ),
          endDate: endOfMonth(
            addMonths(new Date(dRange.endDate), lrCount.count)
          ),
        });
      }
      if (lrCount.dateRange === "next_30_days") {
        setDRange({
          startDate: addDays(dRange.startDate, 30 * lrCount.count),
          endDate: addDays(dRange.endDate, 30 * lrCount.count),
        });
      }
      if (lrCount.dateRange === "next_60_days") {
        setDRange({
          startDate: addDays(dRange.startDate, 60 * lrCount.count),
          endDate: addDays(dRange.endDate, 60 * lrCount.count),
        });
      }
      if (lrCount.dateRange === "next_90_days") {
        setDRange({
          startDate: addDays(dRange.startDate, 90 * lrCount.count),
          endDate: addDays(dRange.endDate, 90 * lrCount.count),
        });
      }

      if (lrCount.dateRange === "custom") {
        setDRange({
          startDate: addDays(dRange.startDate, result * lrCount.count),
          endDate: addDays(dRange.endDate, result * lrCount.count),
        });
      }
    } else {
      if (lrCount.tab === "Months") {
        setDRange({
          startDate: startOfMonth(
            addMonths(new Date(dRange.startDate), lrCount.count)
          ),
          endDate: endOfMonth(
            addMonths(new Date(dRange.endDate), lrCount.count)
          ),
        });
      } else {
        setDRange({
          startDate: addDays(dRange.startDate, result * lrCount.count),
          endDate: addDays(dRange.endDate, result * lrCount.count),
        });
      }
    }
  }, [lrCount]);
  return (
    <div className="selector">
      <div className="stay_date">
        <span className="colordim">Stay Dates - As Of</span>{" "}
        {format(asOfDate, "eee, PP")}{" "}
      </div>
      <div className="date_row">
        <FiChevronLeft
          onClick={() => rangeMoveToLeft()}
          className="nav_btn"
          size={"24px"}
          color={"#1679c7"}
        />{" "}
        <div className="dropdown_outer" ref={refOne}>
          <Dropdown
            target={
              <div className="date_range_div" onClick={() => setOpen(!isOpen)}>
                {format(dRange.startDate, "eee, MMM dd")} -{" "}
                {format(dRange.endDate, "eee, PP")}
              </div>
            }
            handleOpen={() => setOpen(!isOpen)}
            isOpen={isOpen}
            asOfDate={asOfDate}
            handleAsOfDate={setAsOFDate}
            handleRange={setDRange}
            handleLRCount={setLRCount}
          />
        </div>
        <FiChevronRight
          onClick={rangeMoveToRight}
          className="nav_btn"
          size={"24px"}
          color={"#1679c7"}
        />
      </div>
    </div>
  );
};

export default Selector;
