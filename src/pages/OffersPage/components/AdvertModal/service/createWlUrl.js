import axios from "axios";

export const createWlUrl = async (initData) => {            
    const result = await axios.get(`https://mtree-wl-binding.extensi.one/create_wl_url?initData=${encodeURIComponent(initData)}`);
    return result
};