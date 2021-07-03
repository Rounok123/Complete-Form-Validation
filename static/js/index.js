//Fetching the input tags by their 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const conpassword = document.getElementById('conpassword');

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
    const usernameval = username.value.trim();
    const emailval = email.value.trim();
    const numberval = number.value.trim();
    const passwordval = password.value.trim();
    const conpasswordval = conpassword.value.trim();
    
    // Validate username
    if(usernameval === ""){
        setErrorMsg(username, 'User name can not be blank');
        return false;
    }
    else if(usernameval.length<=2){
        setErrorMsg(username, 'User name can not be less than 3');
        return false;
    }
    else{
        setSuccessMsg(username);
    }

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

    // Validate phone
    if(numberval === ""){
        setErrorMsg(number, 'Phone number can not be blank');
        return false;
    }
    else if(numberval.length != 10){
        setErrorMsg(number,'Phone number is not valid');
        return false;
    }
    else{
        setSuccessMsg(number);
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

    // Validate confirm password
    if(conpasswordval === ""){
        setErrorMsg(conpassword, 'Password can not be blank');
        return false;
    }
    else if(conpasswordval !== passwordval){
        setErrorMsg(conpassword, 'Password does not match');
        return false;
    }
    else{
        setSuccessMsg(conpassword);
    }
}
