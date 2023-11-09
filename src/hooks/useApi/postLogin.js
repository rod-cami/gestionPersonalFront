

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
}

export default login