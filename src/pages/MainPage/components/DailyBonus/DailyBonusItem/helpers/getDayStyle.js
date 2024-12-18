export const getDayStyle = (isCollected, isCurrentDay) => ({
    backgroundColor: isCollected || !isCurrentDay ? '#223B37' : '#8CDB4E',
    color: isCollected || !isCurrentDay ? '#fff' : '#000',
});
