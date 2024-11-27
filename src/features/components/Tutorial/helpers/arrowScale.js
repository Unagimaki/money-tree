export const arrowScale = (currentStep) => {
  const scales = {
    3: "scaleY(-1)",
    5: "scaleY(-1)",
    6: "scaleY(-1)",
    7: "scale(-1)",
    8: "scaleY(-1)",
    9: "scale(-1)",
  };

  return scales[currentStep] || "";
};
