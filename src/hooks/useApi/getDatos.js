
const getDatos = async (URL) => {
    const response = await fetch(URL, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk1NTgwNTAsInN1YiI6InRvYmlwcGFAZ21haWwuY29tIiwiYXVkIjoiR2VzdGlvblBlcnNvbmFsQVBJIiwiaXNzIjoiYXBpX3B5dGhvbiJ9.uWtgVOOLeI0AjOg_BBXlBSlgl9QMZCdiA5N1RX4U8ow',
        }
    })

    const data = await response.json()
    
    return data.results
};

export default getDatos;