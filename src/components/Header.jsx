import { useEffect, useState } from "react";
import moment from "moment";

const Header = () => {
  const [date, setDate] = useState(moment());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="header">
        <h1 className="head text-center">TASK TRACKER</h1>
        <h2 className="date">Current Date & Time : </h2>
        <h3>{date.format("MMMM Do YYYY,dddd A h:mm:ss")}</h3>
      </div>
    </>
  );
};
export default Header;
