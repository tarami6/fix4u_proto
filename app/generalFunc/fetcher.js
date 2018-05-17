import {mainRoute} from "../config/apiRoutes";

let defaultHeader = {
    'Accept': `application/json`,
    'Content-Type': 'application/json',
}

let errCBActivated = false;

export const
    fetcher = (route, method, successCallback, errorCallback, body = {}, headers = defaultHeader) => {
        let sendBody;
        if (body.token) {
            headers = {
                'Accept': `application/json`,
                'content-type': 'application/json',
                'Authorization': 'JWT ' + body.token
            };
        }
        else if (body.type) {  //in case the body should be sent as formData
            sendBody = body.payload;
            if (headers.token) {
                headers = {
                    'Accept': `application/json`,
                    'content-type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
                    'Authorization': 'JWT ' + headers.token
                }
            }
        }
        else if (headers.token) {
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
        console.log('allSentInfo:', route, method, sendBody, headers)
        //     let fetchWaitTime = 10;
        //     setTimeout(()=>{
        //         console.log('too long');
        //         errCBActivated = true;
        //         errorCallback('too long, ' + fetchWaitTime + 'seconds has passed since fetch start')
        //     },10000);

        /**
         * One way to fetch and debug
         **/
        console.warn("start fetching");
        fetch(`${mainRoute}/${route}`, {
            method: method,
            headers: headers,
            body: sendBody
        })
            .then((response) => {
                console.warn("got response from server");
                if (response.status >= 200 && response.status < 300) {
                    response.json().then((responseJson) => successCallback(responseJson));
                } else {
                    response.json().then((err)=> console.log('fetcher got err :', err));
                    console.warn("fetcher err cb", response);
                    errorCallback(response)

                }
            });

        /**
         * another way to fetch and debug
         **/
        // fetch(`${mainRoute}/${route}`, {
        //     method: method,
        //     headers: headers,
        //     body: sendBody
        // })
        // .then(response => response.json())
        // .then(responseJson => {
        //     successCallback(responseJson);
        // })
        // .catch(error => {
        //     console.warn('err to route:', route)
        //     console.log('fetch error to route:', route, error);
        //     if(!errCBActivated) {
        //         errorCallback(error)
        //     }
        // });


    }