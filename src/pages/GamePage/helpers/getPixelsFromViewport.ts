export const getPixelsFromViewport = (vw: number) => {
    const windowWidth = window.innerWidth;
    const pixel = 100 / (windowWidth / vw)   
    return pixel
}