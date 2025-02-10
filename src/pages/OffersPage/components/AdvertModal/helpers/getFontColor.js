export const getFontColor = (num) => {
    const red = Math.max(0, 100 + (num * 2.55));   
    const green = Math.min(150, num * 2.55);       
    const fontRed = Math.min(255, red + 150);   
    const fontGreen = Math.min(255, green + 150); 
    return `rgb(${fontRed}, ${fontGreen}, 0)`; 
}