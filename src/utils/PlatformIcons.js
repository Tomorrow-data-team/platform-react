import { yellow, red, green } from "@mui/material/colors"

function getPlatformInfo(platform){
  const platformUtils={'META':{'src':'/public/static/img/brands/meta.svg','colour': "#6e40f8"},
    'Google Ads':{src:'/public/static/img/brands/google.svg','colour':"#fb0000"},
    'TikTok':{src:'/public/static/img/brands/tiktok.svg','colour':"#171717"},
    'Bing':{src:'/public/static/img/brands/microsoft.svg','colour':"#003ffb"},
    'Snapchat':{src:'/public/static/img/brands/snapchat.svg','colour':yellow[500]},
    'UAC':{src:'/public/static/img/brands/app.svg','colour':"#ffffff"},
    'netflix':{src:'/public/static/img/brands/netflix.svg','colour':"#DB0000"},
    'dv360':{src:'/public/static/img/brands/dv360.svg','colour':"#1ab90c"},
    'youtube':{src:'/public/static/img/brands/youtube.svg','colour':"#cc181e"},
  }
    const str = platform.toLowerCase()
    if(str.indexOf('meta')!=-1){
      return platformUtils["META"]
    }
    else if(str.indexOf('google')!=-1){
      return platformUtils["Google Ads"]
    }
    else if(str.indexOf('bing')!=-1){
      return platformUtils["Bing"]
    }
    else if(str.indexOf('tiktok')!=-1){
      return platformUtils["TikTok"]
    }
    else if(str.indexOf('youtube')!=-1){
      return platformUtils["youtube"]
    }
    else if(str.indexOf('netflix')!=-1){
      return platformUtils["netflix"]
    }
    else if(str.indexOf('display')!=-1){
      return platformUtils["dv360"]
    }
    else if(str.indexOf('demand')!=-1){
      return platformUtils["Google Ads"]
    }
    else{
      return null
    }
}
export default getPlatformInfo