export const formatNumber = (num) => {
    if (!num) return num
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}