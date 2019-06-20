import axios from 'axios';

// const api_url = "http://rest.apizza.net/mock/6cb7c62e26511151e440b9ab9ea0c76a";
const api_url = "/api";

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(api_url + url, data)
                .then(res => res.data)
                .then(data => {
                    if (data.error !== 0)
                        reject(data.msg);
                    else
                        resolve(data)
                }).catch(e => reject(e))
        })
    }
}