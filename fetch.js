const fetch = require('node-fetch');

module.exports = () => {
    // The Fetch API provides an interface for fetching resources
    // It provides a generic definition of Request and Response objects
    // The fetch() method takes one mandatory argument, the path of the resource, and returns a Promise
    // The promise resolves to the Response to that request, whether it is successful or not
    // You can also optionally pass an `init` ooptions object as second argument

    // The `fetch` specification differs from jQuery.ajax in two main ways:
    // 1. the Promise returned from fetch won't reject on HTTP error status even if the response is an HTTP 404 ot 500
    // 2. By default, `fetch` won't send or receive any cookies from the server, resulting in un-authed requests if the site relies on maintaining user session
    // to send cookies, the `credentials` init option must be set

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options

    const searchStarWarsChar = name => {
        return fetch(`https://swapi.co/api/people/?search=${ name.trim() }`);
        // return fetch('https://swapi.co/api/people/', {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //         // "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: JSON.stringify({ search: name.trim() })
        // });
    };

    searchStarWarsChar('chewbacca')
        .then(res => res.json())
        .then(console.log)
    ;
};