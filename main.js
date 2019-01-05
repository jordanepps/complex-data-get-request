const apiKey = 'q2BDgq3rZ4q2JBYGpWqT8QZMEQomwPSGEjGyoWBB';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function createParkDiv(data) {
    return `<div class="park">
                <h2>${data.fullName}</h2>
                <p>${data.description}</p>
                <a href="${data.url}" target="_blank">More Info</a>
            </div>`
}

function loadParkResults(data) {
    console.log(data);
    $('#js-search-results').html(data.data.map(createParkDiv));
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkResults(state, limit) {
    const params = {
        limit,
        stateCode: state,
        api_key: apiKey,
    }
    const queryString = formatQueryParams(params);
    const url = `${searchURL}?${queryString}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(resJSON => loadParkResults(resJSON, limit))
        .catch(err => console.log(err))

}

function watchForm() {
    $('#js-park-search-form').submit(e => {
        e.preventDefault();
        const state = $('#js-select-state').val();
        const limit = $('#limit').val() || 10;
        //Decrementing limit by 1 because API returns 1 more than limit
        getParkResults(state, limit - 1);
    })
}
$(watchForm);