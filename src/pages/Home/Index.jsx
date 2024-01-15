// import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./style.module.scss";

const Index = () => {
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search);

  const targetTime = new Date(
    params.get("date") || new Date("2024-07-17:00:00")
  );

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownOver, setCountdownOver] = useState(false);

  const setNewTime = () => {
    if (targetTime) {
      const currentTime = new Date().getTime();
      const distanceToDate = targetTime - currentTime;

      if (distanceToDate <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setCountdownOver(true);
      }

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));

      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      if (days < 10) {
        days = `0${days}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      setTime({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);

    if (time.seconds < 0) {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className={classes.background}>
      <h3 className={classes.title}>WE&lsquo;RE LAUNCHING SOON</h3>
      {countdownOver ? (
        <div className={classes.timeOver}> Time is Up! </div>
      ) : (
        <div className={classes.countdownContainer}>
          <div className={classes.timeBox}>
            <div className={classes.countdownBox}>
              <h3 className={classes.time}>{time.days || "00"}</h3>
            </div>
            <p className={classes.textTime}>DAYS</p>
          </div>

          <div className={classes.timeBox}>
            <div className={classes.countdownBox}>
              <h3 className={classes.time}>{time.hours || "00"}</h3>
            </div>
            <p className={classes.textTime}>HOURS</p>
          </div>

          <div className={classes.timeBox}>
            <div className={classes.countdownBox}>
              <h3 className={classes.time}>{time.minutes || "00"}</h3>
            </div>
            <p className={classes.textTime}>MINUTES</p>
          </div>

          <div className={classes.timeBox}>
            <div className={classes.countdownBox}>
              <h3 className={classes.time}>{time.seconds || "00"}</h3>
            </div>
            <p className={classes.textTime}>SECONDS</p>
          </div>
        </div>
      )}

      <footer className={classes.footer}>
        <div className={classes.socmedContainer}>
          <img
            className={classes.socmedIcon}
            src={"/icon-facebook.svg"}
            alt=""
          />
          <img
            className={classes.socmedIcon}
            src={"/icon-pinterest.svg"}
            alt=""
          />
          <img
            className={classes.socmedIcon}
            src={"/icon-instagram.svg"}
            alt=""
          />
        </div>
        <img className={classes.footerBg} alt="" />
      </footer>
    </div>
  );
};

export default Index;
