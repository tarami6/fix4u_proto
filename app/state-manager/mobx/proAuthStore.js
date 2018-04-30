import {observable, action} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class ProAuthStore {
    //local image for displaying before saving the image on the aws
    @observable localImage = '';

    @action setLocalImage(image){
        this.localImage = image
    }


    //pro user registration stat manager:
    @observable proUser = {
        //step 1
        name: '',
        phone_number: '',
        company_name: '',
        company_id: '',
        //middle verifyPhone module:
        uid: '',
        //step 2
        company_address: '',
        //step 3
        services: [],
        //step 4:
        company_description: '',
        //and profile_pic which will be of type formData


    }

    @action updatePro(data: Object) {
        //    basic info: name, phone, businness name and bussinnes number
        if (data.name) {
            this.proUser.name = data.name;
        }
        if (data.phone_number) {
            this.proUser.phone_number = data.phone_number;
        }
        if (data.company_name) {
            this.proUser.company_name = data.company_name;
        }
        if (data.company_id) {
            this.proUser.company_id = data.company_id;
        }
        //    codeInput response
        if (data.uid) {
            this.proUser.uid = data.uid
        }
        //    Address info:
        if (data.company_address) {
            this.proUser.company_address = data.company_address;
        }
        //    choose services:
        if (data.services) {
            this.proUser.services = data.services
        }
        //    explain the job:
        if (data.company_description) {
            this.proUser.company_description = data.company_description
        }
        if (data.profile_pic) {
            this.proUser.profile_pic = data.profile_pic
        }
    }

    @action saveToAsync(){
        AsyncStorage.setItem('GetServiceUser', JSON.stringify({
            phone_number: this.proUser.phone_number,
            uid: this.proUser.uid
        }))
    }

    @action getSendObj() {
        if (this.proUser.profile_pic) {
            let formDataObj = this.proUser.profile_pic;
            for (let item in this.proUser) {
                if (item !== 'profile_pic' && item !== 'uid') {
                    if (item === 'phone_number') {    //For the django server and db, mosh wants the uid inside phone_number
                        formDataObj.append('phone_number', this.proUser['uid'])
                    }
                    else if(item === 'services'){
                        let servicesArr = this.proUser.services.slice(0);
                        for(let i = 0; i <servicesArr.length; i++ ){
                            console.warn("services[" + i + "]", servicesArr[i]);
                            formDataObj.append("services", servicesArr[i])
                        }
                    }
                    else {
                        formDataObj.append(item, this.proUser[item])
                    }
                }
            }
            console.log('formDataObj', formDataObj);
            return formDataObj;
        }
        else {
            let sendObj = Object.assign({}, this.proUser);
            sendObj.phone_number = this.proUser['uid'];
            return sendObj
        }
    }
}