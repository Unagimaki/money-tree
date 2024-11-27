export const updatedUrl = (url, param, value) => `${url.split('?')[0]}?${new URLSearchParams({...Object.fromEntries(new URL(url).searchParams), [param]: value})}`;
