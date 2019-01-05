const apiKey = 'q2BDgq3rZ4q2JBYGpWqT8QZMEQomwPSGEjGyoWBB';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function createParkDiv(data) {
    return `<div class="park">
                <h2>${data.fullName}</h2>
                <p>${data.description}</p>
                ${loadAddress(data.addresses[1])}
                <a href="${data.url}" target="_blank">More Info</a>
            </div>`
}

function loadAddress(address) {
    if (address) {
        const line1 = address.line1 ? `${address.line1}<br>` : '';
        const line2 = address.line2 ? `${address.line2}<br>` : '';
        const line3 = address.line3 ? `${address.line3}<br>` : '';
        const cityState = `${address.city}, ${address.stateCode} ${address.postalCode}`;
        return `<address>
                    ${line1}
                    ${line2}
                    ${line3}
                    ${cityState}
                </address>`;
    }
    return '';

}

function loadParkResults(data) {
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
        fields: 'addresses'
    }
    const queryString = formatQueryParams(params);
    const url = `${searchURL}?${queryString}`;
    fetch(url)
        .then(res => res.json())
        .then(loadParkResults)
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