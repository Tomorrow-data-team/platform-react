import axios from "axios"

export const youtubeSearch = async (search_term, start_date, end_date) =>{
    var str = `https://platform-flask-production-28c4.up.railway.app/youtube/search/`
    if(search_term){
        str+=search_term
    }
    if(start_date){
        str+='?start_date='+start_date
    }
    if(end_date){
        str+='&end_date='+end_date
    }
    console.log(str)
    const res = await axios.get(str)
    console.log(res.data)
    const data = res.data ?? [];

    return data;
}
