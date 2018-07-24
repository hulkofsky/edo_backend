const _ = require('lodash')

class Validation {

    validateText(someTextString) {
        //international text
        const regexp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

        if(_.isEmpty(someTextString)){
            return false
        }else if(regexp.test(someTextString)&&someTextString.length<30&&someTextString.length>2){
            return true
        }else{
            return false
        }
    }

    validatePhone(phone) {
        // (123) 456 7899
        // (123).456.7899
        // (123)-456-7899
        // 123-456-7899
        // 123 456 7899
        // 1234567899
        const regexp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

        if(_.isEmpty(phone)) {
            return false
        }else if(regexp.test(phone)){
            return true
        }else{
            return false
        }
    }

    validateVideoUrl(url){
        const regexp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/

        if(regexp.test(url)){
            return true
        }else{
            return false
        }
    }

    validateMoney(moneyNumber){
        const regexp = /^\d{1,10}$/

        if(_.isEmpty(moneyNumber)) {
            return false
        }else if(regexp.test(moneyNumber)){
            return true
        }else{
            return false
        }
    }

    validateVAT(VAT_number){
        const regexp = /^\d{9}$/

        if(_.isEmpty(VAT_number)) {
            return false
        }else if(regexp.test(VAT_number)){
            return true
        }else{
            return false
        }
    }

    validateAccountNum(accountNumber){
        const regexp = /^\d{20}$/

        if(_.isEmpty(accountNumber)) {
            return false
        }else if(regexp.test(accountNumber)){
            return true
        }else{
            return false
        }
    }

    validateEmail(email){
        const regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if(_.isEmpty(email)) {
            return false
        }else if(regexp.test(email)){
            return true
        }else{
            return false
        }
    }

    validatePass(password){
        //Minimum eight characters, at least one letter and one number:
        const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(_.isEmpty(password)){
            return false
        }else if(regexp.test(password)){
            return true
        }else{
            return false
        }

    }

}

module.exports = Validation