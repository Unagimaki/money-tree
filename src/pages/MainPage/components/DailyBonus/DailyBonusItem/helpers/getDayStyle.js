export const getDayStyle = (isCollected, isCurrentDay) => ({
    backgroundColor: !isCurrentDay ? '#223B37' : '#8CDB4E',
    color: !isCurrentDay ? '#fff' : '#000',
});
