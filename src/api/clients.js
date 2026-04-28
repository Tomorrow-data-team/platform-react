import axios from "axios"
import axiosInstance from "@/utils/axios"

const baseURL = 'https://platform-flask-production-28c4.up.railway.app'
export const getBQDetails = async (id) =>{
    const res = await axios.get([baseURL, 'clients/bqdetails', id].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getActiveClients = async () =>{
    const res = await axios.get([baseURL, 'clients/all?active=true'].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getLookerDetails = async (id) =>{
    const res = await axios.get([baseURL, 'clients/looker',id].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}