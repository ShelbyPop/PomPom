// src/Timer.js
import React, { useState, useEffect } from 'react';
import './TimerMessage.css';
import { addPoints } from './PointsRequests';
import { showNotification } from '@mantine/notifications';
import timerDoneSound from './Assets/timerdone.mp3';
import useSound from 'use-sound';


const Timer = ({ timerLength}) => {
  const [seconds, setSeconds] = useState(timerLength);
  // const [breakSeconds, setBreakSeconds] = useState(5 * 60);
  const [cyclesCompleted, setCyclesCompleted] = useState(0); // use for tracking which cycle we are on
  const [isNewTimerInput, setIsNewTimerInput] = useState(false); // use for tracking if there is new timer input



  useEffect(() => {
    setSeconds(timerLength);
    setIsNewTimerInput(true);
  }, [timerLength]);

  useEffect(() => {
    if(cyclesCompleted > 7 && isNewTimerInput) { // RETURN once we have reached 4 cycles
      // will change once we set up the user database
      // for now, we will just RETURN
      setCyclesCompleted(0);
    }
    const intervalId = setInterval(() => {

      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {

          return prevSeconds - 1;
        }


        else if (prevSeconds === 0 && cyclesCompleted % 2 === 0) {
          setSeconds(5);
          setCyclesCompleted(cyclesCompleted + 1);
          // return 0;

        }

        else {

          clearInterval(intervalId);
          setCyclesCompleted(cyclesCompleted + 1); // update cycle
          setIsNewTimerInput(false);
          // setBreakSeconds(5 * 60);
          return 0;
        }

      });
    }, 1000);


    return () => clearInterval(intervalId);
  }, [seconds], timerLength);




  // Format seconds into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const progress = (timerLength - seconds) / timerLength;


  // filling the quarters according to which cycle we are on
  const getQuadrantFill = (quadrantIndex) => {



    if (cyclesCompleted === 0) {
      if (quadrantIndex === 1 && isNewTimerInput) { // check if there is new time input
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 1) {
      if (quadrantIndex === 1 ) { // make sure previous fillings present during break
        return `rgba(200, 162, 200)`;
      }

      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 2) {
      if (quadrantIndex === 1 ) { // make sure previous fillings do not get reset
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 && isNewTimerInput) { // check if there is new time input
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 3) {
      if (quadrantIndex === 1 ) { // make sure previous fillings present during break
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }

      else {
        return 'transparent';
      }

    }

    if (cyclesCompleted === 4) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 && isNewTimerInput ) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 5) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 ) {
        return `rgba(200, 162, 200)`;
      }
      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 6 ) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 4 && isNewTimerInput) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 7 ) {
      if (quadrantIndex === 1) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 4) {
        return `rgba(200, 162, 200)`;
      }
      else {
        return 'transparent';
      }
    }

    else {
      return 'transparent';
    }
  };


// did some clock reformatting!
  return (
      <div>
        <div className="circular-timer">
          <svg className="circular-timer-svg" width="300" height="300">
            <g transform="rotate(-90, 150, 150)">
              <path
                  d="M 150 150 L 265 150 A 110 200 0 0 1 150 260 Z" // manually drew quadrants
                  fill={getQuadrantFill(1)}
              ></path>
              <path
                  d="M 150 150 L 47 150 A 90 90 0 0 0 150 260 Z"
                  fill={getQuadrantFill(2)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 90 0 0 0 45 150 Z"
                  fill={getQuadrantFill(3)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 100 0 0 1 260 150 Z"
                  fill={getQuadrantFill(4)}
              ></path>
              <circle
                  cx="150"       // create outer white ring
                  cy="150"
                  r="110"
                  stroke="white"
                  strokeWidth="14"
                  fill="none"
              ></circle>
              <circle
                  className="circular-timer-progress"
                  cx="150"   // create pink fill-up ring
                  cy="150"
                  r="110"
                  strokeDasharray={`${progress * 691} 691`}
                  stroke="pink"
                  strokeWidth="14"
                  fill="transparent"
              ></circle>
            </g>
            <text className="circular-timer-text custom-timer" x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="cornsilk">
              {formatTime(seconds)}
            </text>
          </svg>
        </div>
      </div>
  );
};

export default Timer;
