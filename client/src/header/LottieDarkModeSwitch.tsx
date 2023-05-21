import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setTheme } from "../redux/tictactoe";
import darkModeButton from "../assets/dark-mode-button1.json";
import switchSound from "../assets/switch-sound.mp3";

const LottieDarkModeSwitch = () => {
  const [timerID, setTimerID] = useState(-1);
  const lottieRef = useRef<any>();
  const theme = useAppSelector((state) => state.tictactoe.theme);
  const dispatch = useAppDispatch();
  const switchAudio = new Audio(switchSound);
  const animationSpeed = 10;
  const sunFrame = 30;
  const moonFrame = 180;

  const d = document.getElementsByTagName("body");
  d[0]?.classList.add(theme);
  d[0]?.classList.remove(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    let item = localStorage.getItem("theme");
    if (item !== null) {
      if (item === "dark") {
        lottieRef.current.goToAndStop(moonFrame, true);
        dispatch(setTheme("dark"));
      } else {
        lottieRef.current.goToAndStop(sunFrame, true);
        dispatch(setTheme("light"));
      }
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        lottieRef.current.goToAndStop(moonFrame, true);
        dispatch(setTheme("dark"));
        localStorage.setItem("theme", "dark");
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        lottieRef.current.goToAndStop(sunFrame, true);
        dispatch(setTheme("light"));
        localStorage.setItem("theme", "light");
      } else {
        lottieRef.current.goToAndStop(moonFrame, true);
        dispatch(setTheme("dark"));
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  const switchDarkMode = (
    animationSpeed: number,
    sunFrame: number,
    moonFrame: number,
    frameMultiplier: number,
    currentFrame: number,
    timerID: number,
    switchAudio: HTMLAudioElement
  ) => {
    const durationInFrames = moonFrame - sunFrame;
    lottieRef.current.setSpeed(animationSpeed);
    switchAudio.play();
    clearTimeout(timerID);

    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      lottieRef.current.setDirection(-1);
      lottieRef.current.goToAndPlay(currentFrame, true);
      const tempTimerID = setTimeout(() => {
        lottieRef.current.goToAndStop(sunFrame, true);
      }, durationInFrames / frameMultiplier / animationSpeed);
      setTimerID(tempTimerID);
      dispatch(setTheme("light"));
    } else {
      localStorage.setItem("theme", "dark");
      lottieRef.current.setDirection(1);
      lottieRef.current.goToAndPlay(currentFrame, true);
      const tempTimerID = setTimeout(() => {
        lottieRef.current.goToAndStop(moonFrame, true);
      }, durationInFrames / frameMultiplier / animationSpeed);
      setTimerID(tempTimerID);
      dispatch(setTheme("dark"));
    }
  };

  return (
    <div className="dark-mode-button-wrapper">
      <Lottie
        lottieRef={lottieRef}
        animationData={darkModeButton}
        autoplay={false}
        className={`dark-mode-button`}
        onClick={() =>
          switchDarkMode(
            animationSpeed,
            sunFrame,
            moonFrame,
            lottieRef.current.animationItem.frameMult,
            lottieRef.current.animationItem.currentFrame,
            timerID,
            switchAudio
          )
        }
        onKeyDown={(e) =>
          e.key.match(/(Enter)/g)
            ? switchDarkMode(
                animationSpeed,
                sunFrame,
                moonFrame,
                lottieRef.current.animationItem.frameMult,
                lottieRef.current.animationItem.currentFrame,
                timerID,
                switchAudio
              )
            : null
        }
        tabIndex={0}
      />
    </div>
  );
};

export default LottieDarkModeSwitch;
