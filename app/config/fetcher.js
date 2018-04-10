import {mainRoute} from "./apiRoutes";

export const
    fetcher = (route, method, successCallback, errorCallback, body, Content_Type='application/json',) =>{
        fetch(`${mainRoute}/${route}`, {
            method: method,
            headers: {
                'Accept': `application/json`,
                'Content-Type': Content_Type
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                successCallback(responseJson);
                // this.props.authStore.setLoadingFalse();
                // //According to the response we can know the user next step/error with current step
                // //success means a messesge was sent to phone number
                // if (responseJson['success']) {
                //     this.props.authStore.updateUser({phone_number: this.state.text})
                //     this.props.authStore.updateStep('verify_code')
                // }
                // else {
                //     for (error in responseJson) {
                //         if (responseJson[error] === 'User with this Phone Number already exists.') {
                //             this.props.authStore.updateUser({phone_number: this.state.text})
                //             this.props.authStore.updateStep('login');
                //         }
                //         else if (responseJson[error] === 'Phone Number has already been Verified.') {
                //             this.props.authStore.updateUser({phone_number: this.state.text})
                //             this.props.authStore.updateStep('choose_user_type')
                //         }
                //         else if (responseJson[error] === 'Concurrent verifications to the same number are not allowed') {
                //             Alert.alert('please wait a few minutes to get the verify code again')
                //             this.props.authStore.updateUser({phone_number: this.state.text})
                //             this.props.authStore.updateStep('verify_code')
                //         }
                //         else {
                //             //handling the error message
                //             let dotIndex = responseJson[error][0].indexOf('.');
                //             let alertPartOne = responseJson[error][0].slice(0,dotIndex+1);
                //             let alertPartTwo = responseJson[error][0].slice(dotIndex+1);
                //             if(alertPartOne.length>0) {
                //                 Alert.alert(alertPartOne, alertPartTwo);
                //             }
                //             else{
                //                 Alert.alert('error', responseJson[error]);
                //             }
                //         }
                //     }
                // }
            })
            .catch(error => {
                console.log('fetch error to route:', route, error);
                errorCallback(error)
            });
    }