import axios from 'axios';

/* ************************************************ */
const url = "https://api.aiforthai.in.th/vaja";
const apiKey = "??????";
export default async function axios_pm(text) {

    let config = {
        headers: {
          'Apikey': apiKey,
        }
      }
    const params = {
        'text': text,
        'mode':'pm'
    }
    const resJson = await axios.get(url+'?text='+text+'&mode=pm',config);
    console.log(JSON.stringify(resJson));
    return resJson;

}
export async function axios_syn(text) {

  let config = {
      headers: {
        'Apikey': apiKey,
      }
    }
  const params = {
      'text': text,
      'mode':'syn'
  }
  const resJson = await axios.get(url+'?text='+text+'&mode=st',config);
  // console.log(JSON.stringify(resJson));
  return resJson;

}
/* ************************************************ */
