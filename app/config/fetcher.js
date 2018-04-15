import {mainRoute} from "./apiRoutes";

let defaultHeader = {
    'Accept': `application/json`,
    'Content-Type': 'application/json',
}

export const
    fetcher = (route, method, successCallback, errorCallback, body, headers=defaultHeader) =>{
    console.log('allSentInfo:', route, method, successCallback, errorCallback, body, headers)
        fetch(`${mainRoute}/${route}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                successCallback(responseJson);
            })
            .catch(error => {
                console.log('fetch error to route:', route, error);
                errorCallback(error)
            });
    }