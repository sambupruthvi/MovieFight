// console.log('Hi there!');
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey : '1ea45fcc',
            s : searchTerm
        }
    })
    console.log(response.data);
}

const input = document.querySelector('input');
let timeoutId;
const output = (event) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value)
    }, 500);
    
}
input.addEventListener('input', output)

