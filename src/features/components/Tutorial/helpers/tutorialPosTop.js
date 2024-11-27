export const tutorialPosTop = (currentStep) => {
  const positions = {
    1: "min(37.68vh, 306px)",
    2: "min(28.94vh, 235px)",
    3: "min(52.96vh, 430px)",
    5: "min(52.963vh, 430px)",
    4: "min(52.96vh, 430px)",
    6: "min(52.96vh, 430px)",
    7: "min(52.96vh, 430px)",
    8: "min(52.96vh, 430px)",
    9: "min(52.96vh, 430px)",
  };

  return positions[currentStep] || "";
};
