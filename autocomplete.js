const createAutoComplete = ({ rootDiv, renderOption, onOptionSelect, onValueSelect }) => {
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
    const input = rootDiv.querySelector('input');
    const dropdown = rootDiv.querySelector(".dropdown");
    const wrapper = rootDiv.querySelector(".results");

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
        
            option.innerHTML = renderOption(movie);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = onValueSelect(movie);
                onOptionSelect(movie);
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
}