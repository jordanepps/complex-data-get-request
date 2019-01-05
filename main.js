const apiKey = 'q2BDgq3rZ4q2JBYGpWqT8QZMEQomwPSGEjGyoWBB';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function watchForm() {
    $('#js-park-search-form').submit(e => {
        e.preventDefault();
        const state = $('#js-select-state').val();
        const limit = $('#limit').val();
        console.log(state, limit);
    })
}
$(watchForm);