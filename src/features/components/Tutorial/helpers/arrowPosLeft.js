export const arrowPosLeft = (currentStep) => {
  const positions = {
    1: "67%",
    2: "70%",
    3: "60%",
    5: "60%",
    6: "11%",
    7: "17%",
    8: "75%",
    9: "80%",
  };
  return positions[currentStep] || "";
};
