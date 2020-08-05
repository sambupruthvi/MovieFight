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

const onInput = (event) => {
    fetchData(event.target.value);
}
input.addEventListener('input', debounce(onInput, 500));

