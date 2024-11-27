export const getUserInfo = (data) => {
  const params = {}

  data.split('&').forEach(param => {
    const [key, value] = param.split('=')
    if (key === 'user') {
      params[key] = JSON.parse(decodeURIComponent(value))
    } else {
      params[key] = decodeURIComponent(value)
    }
  })  
  console.log(params);
   
  return params
}