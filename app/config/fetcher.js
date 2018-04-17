import {mainRoute} from "./apiRoutes";

let defaultHeader = {
    'Accept': `application/json`,
    'Content-Type': 'application/json',
}

export const
    fetcher = (route, method, successCallback, errorCallback, body, headers=defaultHeader) =>{
    let sendBody;
    if(body.type){  //in case the body should be sent as formData
       sendBody  = body.payload
    }
    else {
        sendBody = JSON.stringify(body)
    }

    console.log('allSentInfo:', route, method, successCallback, errorCallback, body, headers)
        fetch(`${mainRoute}/${route}`, {
            method: method,
            headers: headers,
            body: sendBody
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