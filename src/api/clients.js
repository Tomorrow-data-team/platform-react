import axios from "axios"
import axiosInstance from "@/utils/axios"

const baseURL = 'https://platform-flask-production-28c4.up.railway.app/clients'
export const getBQDetails = async (id) =>{
    const res = await axios.get([baseURL, 'bqdetails', id].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getActiveClients = async () =>{
    const res = await axios.get([baseURL, 'all?active=true'].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getSingleClient = async (id) =>{
    const res = await axios.get([baseURL, 'client', id].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data[0] : [];
}

export const getAllClients = async () =>{
    const res = await axios.get([baseURL, 'all'].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getLookerDetails = async (id) =>{
    const res = await axios.get([baseURL, 'looker',id].join("/"))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}