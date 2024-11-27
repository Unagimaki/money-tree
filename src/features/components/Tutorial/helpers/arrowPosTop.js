export const arrowPosTop = (currentStep) => {
  const positions = {
    1: "-100%",
    2: "-95%",
  };
  return (
    positions[currentStep] || (currentStep >= 3 ? "105%" : "")
  );
};
