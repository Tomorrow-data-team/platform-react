import axios from "axios"

const baseURL = 'https://platform-flask-production-28c4.up.railway.app/'

export const getTotal = async (id, date) =>{
    const res = await axios.get([baseURL, 'bq/total/',id, '?daterange=',date].join(""))
    console.log(res)
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getDaily = async (id, date) =>{
    const res = await axios.get([baseURL, 'bq/daily/',id, '?daterange=',date].join(""))
    console.log(res)
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getByChannel = async (id, date) =>{
    const res = await axios.get([baseURL, 'bq/channel/',id, '?daterange=',date].join(""))
    console.log(res)
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getByCampaign = async (id, date) =>{
    const res = await axios.get([baseURL, 'bq/campaign/',id, '?daterange=',date].join(""))
    console.log(res)
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getUCID = async (id) =>{
    const res = await axios.get([baseURL, 'ucid/all/',id].join(""))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}

export const getSingleUCID = async (id) =>{
    const res = await axios.get([baseURL, 'ucid/single/',id].join(""))
    const data = res.data ?? [];

    return Array.isArray(data) ? data : [];
}