
const getDatos = async (URL,token) => {
    const response = await fetch(URL, {
        headers: {
          'Authorization': `Bearer ${token}` , 
        }
      })
    const data = await response.json()

    return data.results
};

export default getDatos;