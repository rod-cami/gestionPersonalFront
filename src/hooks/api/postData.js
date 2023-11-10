const postData = async (URL,data) => {
  const response = await fetch(URL,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      "Content-Type" : "application/json"
    }
  })
  
  return response
};

export default postData;