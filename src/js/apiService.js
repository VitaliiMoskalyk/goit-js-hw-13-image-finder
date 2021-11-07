


export const getImages = async (api) => {
    
    try {
        const response = await fetch(api);
        console.log(response.ok);
        const responseData = response.json();
        return responseData;
    } catch (err) {
        console.log(response.err)
        throw err;
    }
    
}


