
export const getImages = async (Value,Number,key) => {
    const API = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${Value}&page=${Number}&per_page=12&key=${key}`;
    try {
        const response = await fetch(API);
        const responseData = response.json();
            return responseData;

    } catch (err) {
        console.log(response.err)
        throw err;
    }
}


