const form = document.getElementById('form');
const password = document.getElementById('password');
const email = document.getElementById('email');

// Defining the setErrorMsg
function setErrorMsg(input, errormsgs){
    const formcontrol = input.parentElement;
    const small = formcontrol.querySelector('small');
    const inp = formcontrol.querySelector('input');
    inp.style.borderColor = 'red';
    small.innerText = errormsgs;
}
// Defining the setSuccessMsg
function setSuccessMsg(input){
    const formcontrol = input.parentElement;
    const small = formcontrol.querySelector('small');
    const inp = formcontrol.querySelector('input');
    inp.style.borderColor = 'green';
    small.style.display = 'none';
    formcontrol.className = "form-control success";
}
// More validate email
const isEmail = (emailval)=>{
    var atSymbol = emailval.indexOf("@"); 
    if(atSymbol<1) return false;
    var dot = emailval.lastIndexOf('.');
    if(dot <= atSymbol + 2) return false;
    if(dot===emailval.length-1) return false;
    return true;
}

// Defining the validate function 
const validate = ()=>{
    const emailval = email.value.trim();
    const passwordval = password.value.trim();

    // Validate email
    if(emailval === ""){
        setErrorMsg(email, 'email can not be blank');
        return false;
    }
    else if(!isEmail(emailval)){
        setErrorMsg(email,'Email is not valid');
        return false;
    }
    else{
        setSuccessMsg(email);
    }

    // Validate password
    if(passwordval === ""){
        setErrorMsg(password, 'Password can not be blank');
        return false;
    }
    else if(passwordval.length <= 5){
        setErrorMsg(password, 'Password must be more than 5 char');
        return false;
    }
    else{
        setSuccessMsg(password);
    }
}    