const filmForm = document.querySelector('form');
const filmInput = document.getElementById('film-input');
const filmListUL = document.getElementById('film-list');

const allFilms = [];

filmForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addFilm();
});

function addFilm() {
    const filmText = filmInput.value.trim();
    if (filmText.length > 0) {
        allFilms.push(filmText);
        updateFilmList();
        filmInput.value = ""; // Clear the input field
    }

    console.log("Film added", filmText);
}

function updateFilmList() {
    filmListUL.innerHTML = ""; // Clear the existing list
    allFilms.forEach((film, filmIndex) => {
        const filmItem = createFilmItem(film, filmIndex); // Pass filmIndex to createFilmItem
        filmListUL.appendChild(filmItem);
    });
}

function createFilmItem(film, filmIndex){
    const filmId = "film-" + filmIndex;
    const filmLI = document.createElement("li");
    filmLI.className = "film"; 
    
    filmLI.innerHTML = `
        <input type="checkbox" id="${filmId}">
        <label for="${filmId}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"/>
            </svg>
        </label>
        <label for="${filmId}" class="todo-text">
            ${film}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
                <path fill="#ff57e0" d="M50.592 2.291L32 20.884C25.803 14.689 19.604 8.488 13.406 2.291c-7.17-7.17-18.284 3.948-11.12 11.12c6.199 6.193 12.4 12.395 18.592 18.592A32589 32589 0 0 1 2.286 50.595c-7.164 7.168 3.951 18.283 11.12 11.12q9.297-9.3 18.593-18.594l18.592 18.594c7.17 7.168 18.287-3.951 11.12-11.12q-9.297-9.298-18.597-18.594q9.298-9.299 18.597-18.596c7.168-7.166-3.949-18.284-11.12-11.11"/>
            </svg>
        </button> `;
        
        const deleteButton = filmLI.querySelector(".delete-button"); 
            deleteButton.addEventListener('click', () => {  
            allFilms.splice(filmIndex,1);
            updateFilmList();
        });

        const checkbox = filmLI.querySelector(`#${filmId}`);
        checkbox.addEventListener('change', () => {
            filmLI.classList.toggle('completed', checkbox.checked);
        });

    return filmLI;   
}