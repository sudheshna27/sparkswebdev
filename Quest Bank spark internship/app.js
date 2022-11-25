class FormValidation{
    formValues = {
       accountname : "",
       amount : "",
    }
    errorValues = {
        accountnameErr : "",
        amountErr : "",
    }
    showErrorMsg(index,msg){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('span')[0].textContent = msg   
    }
    showSuccessMsg(index){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')
    }
    getInputs(){
        this.formValues.accountname = document.getElementById('accountname').value.trim()
        this.formValues.amount = document.getElementById('amount').value.trim()
    }
    validateAccountname(){
        if(this.formValues.accountname === ""){
            this.errorValues.accountnameErr = "* Please Enter Your Name"
            this.showErrorMsg(0,this.errorValues.accountnameErr)
        } else {
            this.errorValues.accountnameErr = ""
            this.showSuccessMsg(0)
        }
    }
    validateAmount(){
        if(this.formValues.amount === ""){
            this.errorValues.amountErr = "* Please Enter the Amount"
            this.showErrorMsg(1,this.errorValues.amountErr)
        } else if(this.formValues.amount.length >5){
            this.errorValues.amountErr = "* Limit Exceeds"
            this.showErrorMsg(1,this.errorValues.amountErr)
        }  else {
            this.errorValues.amountErr = ""
            this.showSuccessMsg(1)
        }
    }
   
    alertMessage(){
        const {accountnameErr , amountErr}= this.errorValues
        if(accountnameErr === "" && amountErr === "" ){
            swal("Money transferred to, "+this.formValues.accountname ,"successfully").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        } else {
            swal("Give Valid Inputs","Click ok to Continue" ,"error")
        }
    }

    removeInputs(){
        const form_groups = document.getElementsByClassName('form-group')
        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent = ""
            element.classList.remove('success')
        })
    }
} 

const ValidateUserInputs = new FormValidation()

document.getElementsByClassName('form')[0].addEventListener('submit' , event => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateAccountname()
    ValidateUserInputs.validateAmount()
    ValidateUserInputs.alertMessage()
})
