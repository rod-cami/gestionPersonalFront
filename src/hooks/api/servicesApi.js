const putData = async (URL,data,token) => {
  const response = await fetch(URL,{
    method: 'PUT',
    body: JSON.stringify(data),
    headers:{
      "Content-Type" : "application/json",
      'Authorization': `Bearer ${token}` ,
    }
  })
  
  return response
};

const login = async (URL, data) => {
  const response = await fetch(URL,{
    method: 'POST',
    body: data,
    headers:{
      "Content-Type" : "application/x-www-form-urlencoded"
    }
  })
  const access = await response.json()
  return access
};

const postData = async (URL,data,token) => {
  const response = await fetch(URL,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      "Content-Type" : "application/json",
      'Authorization': `Bearer ${token}` ,
    }
  })
  
  return response
};

const getData = async (URL,token) => {
  try {
    const response = await fetch(URL, {
      headers: {
        'Authorization': `Bearer ${token}` , 
      }
    })

    if (!response.ok) {
      if (response.status === 401){
        return response.status
      }
      return null;
    }

    const data = await response.json().catch(() => null);
    return data ? data.results : null;

  } catch (error) {
    return null
  }
};

const deleteData = async (URL, token) =>{

  const response = await fetch(URL,{
    method: 'DELETE',
    headers:{
      "Content-Type" : "application/json",
      'Authorization': `Bearer ${token}` ,
    }
  })
  
  return response
}

export {deleteData, putData, postData, login, getData}