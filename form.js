$(document).ready(()=>{

class formValidation{
  formvalues={
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      conformPassword:'',
      checkBox:''
  }

  //   for error Values
errorValues={
    firstNameErr:'',
    lastNameErr:'',
    emailErr:'',
    passwordErr:'',
    conformPasswordErr:'',
    checKBoxErr:'eededede'
}

getInputs(){
    this.formvalues.firstName=document.getElementById('fname').value.trim();
    this.formvalues.lastName=document.getElementById('lname').value.trim();
    this.formvalues.email=document.getElementById('emailid').value.trim();
    this.formvalues.password=document.getElementById('pass').value.trim();
    this.formvalues.conformPassword=document.getElementById('cpass').value.trim();
    this.formvalues.checkBox=document.getElementById('checkbox');

}

showErrorMsg(index,msg){
    const formControl=document.getElementsByClassName('form_fields')[index];
       formControl.classList.remove('success');
       formControl.classList.add('error');
       const span=formControl.querySelector('span');
       span.innerText=msg;

}

showSuccessMsg(index){
    const formControl=document.getElementsByClassName('form_fields')[index];
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const span=formControl.querySelector('span');
    span.innerText="";
}

validateFirstName(){
    const firstName=this.formvalues.firstName;
       if(firstName==""){
           this.errorValues.firstNameErr="*invalid";
           this.showErrorMsg(0,this.errorValues.firstNameErr)
       }
       else if(firstName.length<3){
           this.errorValues.firstNameErr="*atleast 3 char"
           this.showErrorMsg(0,this.errorValues.firstNameErr);
       }
       else{
           this.showSuccessMsg(0);
       }

}

validateLastName(){
    const lasttName=this.formvalues.lastName;
       if(lasttName==""){
           this.errorValues.lastNameErr="*invalid";
           this.showErrorMsg(1,this.errorValues.lastNameErr)
       }
       else if(lasttName.length<3){
           this.errorValues.lastNameErr="*atleast 3 char"
           this.showErrorMsg(1,this.errorValues.lastNameErr);
       }
       else{
           this.showSuccessMsg(1);
       }

}

validateEmail(){
    const email=this.formvalues.email;
     if((RegExp=/^([a-z A-Z 0-9]+)@([a-z A-Z 0-9]{2,15})\.([a-z A-Z]{2,8})(a-z A-Z{2,6})?$/).test(email)){
         this.showSuccessMsg(2);

     }
    
    else if(email==""){
        this.errorValues.emailErr="invalid"
        this.showErrorMsg(2,this.errorValues.emailErr);
    }else{
        this.errorValues.emailErr="enter a valid email"
        this.showErrorMsg(2,this.errorValues.emailErr);
    }

}

validatePassword(){
    const password=this.formvalues.password;
    if(password==""){
        this.errorValues.passwordErr="*invalid";
        this.showErrorMsg(3,this.errorValues.passwordErr);
    }
    else if(password.length<5){
        this.errorValues.passwordErr="*must contain atleast 5 char";
         this.showErrorMsg(3,this.errorValues.passwordErr);
    }
    else if(password!=this.formvalues.conformPassword){
          this.errorValues.passwordErr='*password does\'t match';
          this.showErrorMsg(3,this.errorValues.passwordErr);
    }
    else{
        this.showSuccessMsg(3)
    }

}

validateConformPassword(){

    const conformPassword=this.formvalues.conformPassword;
    if(conformPassword==""){
        this.errorValues.conformPasswordErr="*invalid";
        this.showErrorMsg(4,this.errorValues.conformPasswordErr);
    }
    else if(conformPassword.length<5){
        this.errorValues.conformPasswordErr="*must contain atleast 5 char"
        this.showErrorMsg(4,this.errorValues.conformPasswordErr);
    }
    else if(conformPassword!=this.formvalues.password){
          this.errorValues.conformPasswordErr='*password does\'t match';
          this.showErrorMsg(4,this.errorValues.conformPasswordErr);
    }
    else{
        this.showSuccessMsg(4)
       
    }

 
    
}


alertMsg(){

     const fullName=this.formvalues.firstName+' '+this.formvalues.lastName;
     const {firstNameErr,lastNameErr,emailErr,passwordErr,conformPasswordErr,checKBoxErr
     }=this.errorValues;
     if(firstNameErr===''&& lastNameErr==='' && emailErr==='' 
     && passwordErr==='' && conformPasswordErr==='' && checKBoxErr===''){
      swal("Registeration succesfull","Thankyou"+'   '+fullName,"success");
      console.log(this.formvalues);
      this.removeInputs()
     }
     else{
        // removing error values
            this.errorValues.firstNameErr='';
            this.errorValues.lastNameErr='';
            this.errorValues.emailErr='';
            this.errorValues.passwordErr='';
            this.errorValues.conformPasswordErr='';
           console.log(this.errorValues);
        
        

         swal("give valid inputs","click ok to continue","error")
         console.log(this.errorValues);
     }
   
}
checK(){
    if(this.formvalues.checkBox.checked===false){
        alert('accept our terms and condition to proceed')
    }
}

removeInputs(){
    const formControl=document.getElementsByClassName('form_fields');
    Array.from(formControl).forEach((input)=>{
      input.getElementsByTagName('input')[0].value='';
      $(input).removeClass('success')
     
    });
        
   
   
}         


}
let validateInputs=new formValidation();
// for checkbox
$('#checkbox').on('click',()=>{
    let check=document.getElementById('checkbox');
    if(check.checked==true){
     validateInputs.errorValues.checKBoxErr='';   
    }
    else{
        validateInputs.errorValues.checKBoxErr=11;
        alert('accept our terms and condition to proceed')
    }
    
    
  
});

$('.form').on('submit',(e)=>{
      
    e.preventDefault();

    validateInputs.getInputs();
    validateInputs.validateFirstName();
    validateInputs.validateLastName();
    validateInputs.validateEmail()
    validateInputs.validatePassword()
    validateInputs.validateConformPassword();
    validateInputs.checK();
    validateInputs.alertMsg();
 
  

}); 

// for eye icons
const eyeopen=document.querySelectorAll('.eye_show')
const eyeClose=document.querySelectorAll('.eye_close');
$(eyeClose).on('click',(e)=>{
  let target=e.target;
  $(target).addClass('hide');
    const parent=target.parentElement;
    const show=parent.querySelector('.eye_show');
    $(show).removeClass('hide');

   // showing the password
      const input=parent.querySelector('input');
      input.setAttribute('type','text')


});

$(eyeopen).on('click',(e)=>{
 let target=e.target;
 $(target).addClass('hide');
 const parent=target.parentElement;
 const close=parent.querySelector('.eye_close');
$(close).removeClass('hide');
 
// hiding the password;
const input=parent.querySelector('input');
input.setAttribute('type','password');
});


});//end of jquery page rel

