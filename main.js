const apiKey = 'q2BDgq3rZ4q2JBYGpWqT8QZMEQomwPSGEjGyoWBB';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkResults(state, limit = 10) {
    //JS default param was not working while testing so I added this line to be safe
    limit = limit || 10;
    const params = {
        stateCode: state,
        limit: limit,
        api_key: apiKey,
    }
    const queryString = formatQueryParams(params);
    const url = `${searchURL}?${queryString}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(resJSON => console.log(resJSON))
        .catch(err => console.log(err))

}

function watchForm() {
    $('#js-park-search-form').submit(e => {
        e.preventDefault();
        const state = $('#js-select-state').val();
        const limit = $('#limit').val();
        getParkResults(state, limit);
    })
}
$(watchForm);