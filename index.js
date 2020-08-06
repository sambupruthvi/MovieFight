// console.log('Hi there!');
const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? "" : movie.Poster;
        return `
            <img src = "${movie.Poster}"/>
            ${movie.Title} (${movie.Year})
        `;
    },
    onValueSelect(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
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
};

createAutoComplete({ 
    ...autoCompleteConfig,
    rootDiv : document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'));
    }
})

createAutoComplete({
    ...autoCompleteConfig,
    rootDiv : document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'));
    }
})

const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params : {
            apikey : '1ea45fcc',
            i : movie.imdbID
        }
    })
    summaryElement.innerHTML = movieTemplate(response.data);
}

const movieTemplate = movieDetail => {
    return `
        <article class = 'media'>
            <figure class = 'media-left'>
                <p class = 'image'>
                    <img src = "${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class = "media-content">
                <div class = "content">
                    <h2>${movieDetail.Title}</h2>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class = "notification is-info">
            <p class = "title">${movieDetail.Awards}</p>
            <p class = "subtitle">Awards</p>
        </article>
        <article class = "notification is-info">
            <p class = "title">${movieDetail.BoxOffice}</p>
            <p class = "subtitle">Box Office</p>
        </article>
        <article class = "notification is-info">
            <p class = "title">${movieDetail.Metascore}</p>
            <p class = "subtitle">MetaScore</p>
        </article>
        <article class = "notification is-info">
            <p class = "title">${movieDetail.imdbRating}</p>
            <p class = "subtitle">IMDB Rating</p>
        </article>
        <article class = "notification is-info">
            <p class = "title">${movieDetail.imdbVotes}</p>
            <p class = "subtitle">IMDB Votes</p>
        </article>
    `;
}

