// console.log('Hi there!');
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey : '1ea45fcc',
            s : searchTerm
        }
    })
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}


const rootDiv = document.querySelector(".auto-complete");
rootDiv.innerHTML = `
    <label><b>Select Movie-1:</b></label>
    <input type = "text" class = "input"/>
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results">
            </div>
        </div>
    </div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector(".dropdown");
const wrapper = document.querySelector(".results");

const onInput = async (event) => {
    let movies = await fetchData(event.target.value);
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    wrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (const movie of movies) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        const imgSrc = movie.Poster === 'N/A' ? "" : movie.Poster;
        option.innerHTML = `
            <img src = "${movie.Poster}"/>
            ${movie.Title}
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })
        wrapper.appendChild(option);
    }
}
input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', event => {
    if(!rootDiv.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params : {
            apikey : '1ea45fcc',
            i : movie.imdbID
        }
    })
    console.log(response.data);
}

