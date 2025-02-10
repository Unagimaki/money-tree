import axios from "axios";

export const checkStatus = async (initData) => {    
    const result = await axios.get(`https://mtree-wl-binding.extensi.one/wl_binding_status?initData=${encodeURIComponent(initData)}`);
    console.log(result);
    
    return result
}