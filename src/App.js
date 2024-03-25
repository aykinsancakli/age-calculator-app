import { useState, useRef } from "react";

export default function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState({});

  const [isValid, setIsValid] = useState(true);
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  // Refs for input elements
  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  // Date Calculations
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth() + 1;
  const curDay = curDate.getDate();
  // console.log(curYear, curMonth, curDay);

  // CONTROLLED ELEMENTS
  function handleDayChange(e) {
    setDay(Number(e.target.value));
  }

  function handleMonthChange(e) {
    setMonth(Number(e.target.value));
  }

  function handleYearChange(e) {
    setYear(Number(e.target.value));
  }

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    // Unfocus input fields
    dayInputRef.current.blur();
    monthInputRef.current.blur();
    yearInputRef.current.blur();

    // Reset validation errors and isValid state
    setDayError("");
    setMonthError("");
    setYearError("");
    setIsValid(true);

    // The day number is not between 1-31
    if (day > 31) {
      setDayError("Must be a valid day");
      setIsValid(false);
    }

    // The month number is not between 1-12
    if (month > 12) {
      setMonthError("Must be a valid month");
      setIsValid(false);
    }

    // The date is in the future
    if (Number(curYear) <= Number(year)) {
      setYearError("Must be in the past");
      setIsValid(false);
    }

    // Any field is empty when the form is submitted
    if (!day && !month && !year) {
      setDayError("This field is required");
      setMonthError("This field is required");
      setYearError("This field is required");
      setIsValid(false);
    }

    if (day && !month && !year) {
      setMonthError("This field is required");
      setYearError("This field is required");
      setIsValid(false);
    }

    if (month && !day && !year) {
      setDayError("This field is required");
      setYearError("This field is required");
      setIsValid(false);
    }

    if (year && !month && !day) {
      setDayError("This field is required");
      setMonthError("This field is required");
      setIsValid(false);
    }

    if (day && month && !year) {
      setYearError("This field is required");
      setIsValid(false);
    }

    if (month && year && !day) {
      setDayError("This field is required");
      setIsValid(false);
    }

    if (day && year && !month) {
      setMonthError("This field is required");
      setIsValid(false);
    }

    // Validate the number of days in the selected month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
      setDayError(`Only ${lastDayOfMonth} days`);
      setIsValid(false);
    }

    if (
      !day ||
      !month ||
      !year ||
      year > curYear ||
      month > 12 ||
      day > 31 ||
      day > lastDayOfMonth
    )
      return;

    const yearResult = curYear - year - 1;
    const monthResult = Math.abs(curMonth - month);
    const dayResult = Math.abs(curDay - day);
    // console.log(yearResult, monthResult, dayResult);

    // Create an object to store the result
    setResult({ year: yearResult, month: monthResult, day: dayResult });
  }

  return (
    <>
      <div className="container">
        <Form
          day={day}
          onDayChange={handleDayChange}
          month={month}
          onMonthChange={handleMonthChange}
          year={year}
          onYearChange={handleYearChange}
          onSubmit={handleSubmit}
          dayError={dayError}
          monthError={monthError}
          yearError={yearError}
          isValid={isValid}
          dayInputRef={dayInputRef}
          monthInputRef={monthInputRef}
          yearInputRef={yearInputRef}
        />
        <Result result={result} />
      </div>
    </>
  );
}

function Form({
  day,
  onDayChange,
  month,
  onMonthChange,
  year,
  onYearChange,
  onSubmit,
  dayError,
  monthError,
  yearError,
  isValid,
  dayInputRef,
  monthInputRef,
  yearInputRef,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-top">
        {/* DAY */}
        <div className="form-group">
          <label className={!isValid ? `form-label invalid` : `form-label`}>
            Day
          </label>
          <input
            ref={dayInputRef}
            type="text"
            placeholder="DD"
            value={day}
            onChange={(e) => onDayChange(e)}
            className={!isValid ? `invalid-border` : ``}
          ></input>
          <span
            className={!isValid ? `warning-label invalid` : `warning-label`}
          >
            {dayError}
          </span>
        </div>

        {/* MONTH */}
        <div className="form-group">
          <label className={!isValid ? `form-label invalid` : `form-label`}>
            Month
          </label>
          <input
            ref={monthInputRef}
            type="text"
            placeholder="MM"
            value={month}
            onChange={(e) => onMonthChange(e)}
            className={!isValid ? `invalid-border` : ``}
          ></input>
          <span
            className={!isValid ? `warning-label invalid` : `warning-label`}
          >
            {monthError}
          </span>
        </div>

        {/* YEAR */}
        <div className="form-group">
          <label className={!isValid ? `form-label invalid` : `form-label`}>
            Year
          </label>
          <input
            ref={yearInputRef}
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={(e) => onYearChange(e)}
            className={!isValid ? `invalid-border` : ``}
          ></input>
          <span
            className={!isValid ? `warning-label invalid` : `warning-label`}
          >
            {yearError}
          </span>
        </div>
      </div>

      <div className="form-bottom">
        <div className="line"></div>

        <button className="submit-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
            className="submit-icon"
          >
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>

        <div className="line-second"></div>
      </div>
    </form>
  );
}

function Result({ result }) {
  return (
    <div className="results">
      <p>
        <span className="expected">
          {result.year !== undefined ? result.year : `--`}
        </span>{" "}
        <span className="result">years</span>
      </p>

      <p>
        <span className="expected">
          {result.month !== undefined ? result.month : `--`}
        </span>{" "}
        <span className="result">months</span>
      </p>

      <p>
        <span className="expected">
          {result.day !== undefined ? result.day : `--`}
        </span>{" "}
        <span className="result">days</span>
      </p>
    </div>
  );
}
