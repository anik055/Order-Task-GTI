import axios from "axios";

export function  ApiCall ({method, url, payload, params, setData, setError, callback}) {
    axios({
      method: method,
      url: url,
      data: payload,
      params: params,
    })
      .then((res) => {
        setData(res);
          callback && callback(res.data);
          setError('')
      })
      .catch((error) => {
        setData('');
        // callback && callback(res.data);
        setError(error);
      });
}

// export default ApiCall
