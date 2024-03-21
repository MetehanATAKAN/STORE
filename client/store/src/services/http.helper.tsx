import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // API'nin ana URL'i
const token = sessionStorage.getItem('token');

const apiRequest = async (apiName :string, method:string, data = null) => {
  // API'nin tam URL'i
  const apiUrl = `${BASE_URL}/${apiName}`;

  // HTTP metodu kontrolü
  let response;
  if (method === 'GET') {
    response = await axios.get(apiUrl,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
  } else if (method === 'POST') {
    response = await axios.post(apiUrl, data,{
        headers:{
            Authorization : `${token}`
        }
    });
  } else if (method === 'PUT') {
    response = await axios.put(apiUrl, data,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
  } else if (method === 'DELETE') {
    response = await axios.delete(apiUrl,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
  } else {
    throw new Error('Geçersiz HTTP metodu');
  }

  // Axios'un HTTP hata durumlarına bak
  if (response.status >= 200 && response.status < 300) {
    // Başarılı cevap durumunda veriyi döndür
    return response.data;
  } else {
    // Hata durumunda uygun hata nesnesini oluştur ve fırlat
    throw new Error(`API isteği başarısız oldu: ${response.status} ${response.statusText}`);
  }
};

export default apiRequest;
