export const calcProcentFromNum = (targetNum, fromNum) => {    
    return (100 / (fromNum / targetNum)).toFixed(2)
}