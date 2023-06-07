import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setDarkMode, setAdditionalDarkModeClass } from "../redux/tictactoe";
import darkModeButton from "../assets/dark-mode-button1.json";
import switchSound from "../assets/switch-sound.mp3";

const LottieDarkModeSwitch = () => {
  const [timerID, setTimerID] = useState(-1);
  const lottieRef = useRef<any>();
  const darkMode = useAppSelector((state) => state.tictactoe.darkMode);
  const dispatch = useAppDispatch();
  const switchAudio = new Audio(switchSound);
  const animationSpeed = 8;
  const sunFrame = 30;
  const moonFrame = 180;
  const durationInFrames = moonFrame - sunFrame;

  useEffect(() => {
    let isDarkMode = sessionStorage.getItem("darkMode");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => switchDarkMode(e.matches));
    if (isDarkMode) {
      if (isDarkMode === "true") {
        lottieRef.current.goToAndStop(moonFrame, true);
        dispatch(setDarkMode(true));
      } else {
        lottieRef.current.goToAndStop(sunFrame, true);
        dispatch(setDarkMode(false));
      }
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      handleInitialColorScheme(isDarkMode);
    }
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", (e) => switchDarkMode(e.matches));
    };
  }, []);

  function handleInitialColorScheme(isDarkMode: boolean) {
    dispatch(setDarkMode(isDarkMode));
    lottieRef.current.goToAndStop(isDarkMode ? moonFrame : sunFrame, true);
    sessionStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }

  function handleLottieThemeAnimation(isDarkMode: boolean) {
    lottieRef.current.setSpeed(animationSpeed);
    lottieRef.current.setDirection(isDarkMode ? 1 : -1);
    lottieRef.current.goToAndPlay(
      lottieRef.current.animationItem.currentFrame,
      true
    );
    const tempTimerID = setTimeout(() => {
      lottieRef.current.goToAndStop(isDarkMode ? moonFrame : sunFrame, true);
    }, durationInFrames / lottieRef.current.animationItem.frameMult / animationSpeed);
    setTimerID(tempTimerID);
  }

  const switchDarkMode = (isDarkMode: boolean) => {
    switchAudio.play();
    clearTimeout(timerID);
    dispatch(setDarkMode(isDarkMode));
    dispatch(setAdditionalDarkModeClass(true));
    sessionStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    handleLottieThemeAnimation(isDarkMode);
  };

  return (
    <div className="dark-mode-button-wrapper">
      <Lottie
        lottieRef={lottieRef}
        animationData={darkModeButton}
        autoplay={false}
        className="dark-mode-button"
        onClick={() => switchDarkMode(!darkMode)}
        onKeyDown={(e) =>
          e.key.match(/(Enter)/g) ? switchDarkMode(!darkMode) : null
        }
        tabIndex={0}
      />
    </div>
  );
};

export default LottieDarkModeSwitch;
