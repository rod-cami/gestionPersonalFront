
const getDatos = async (URL,token) => {
  try {
    const response = await fetch(URL, {
      headers: {
        'Authorization': `Bearer ${token}` , 
      }
    })
    
    if (response.statusText == "Unauthorized") {
      localStorage.removeItem('user')
    }
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.results

  } catch (error) {
    return null
  }
};

export default getDatos;