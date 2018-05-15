import {mainRoute} from "../config/apiRoutes";

let defaultHeader = {
    'Accept': `application/json`,
    'Content-Type': 'application/json',
}

export const
    fetcher = (route, method, successCallback, errorCallback, body={}, headers=defaultHeader) =>{
    let sendBody;
    if(body.token){
        headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + body.token
        };
    }
    else if(body.type){  //in case the body should be sent as formData
       sendBody  = body.payload;
       if(headers.token){
           headers = {
                'Accept': `application/json`,
                'content-type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
                'Authorization': 'JWT ' + headers.token
           }
       }
    }
    else if(headers.token){
        headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + headers.token
        };
        sendBody = JSON.stringify(body)
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