import navbar from "../helper/navbar.js";


let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
np.innerHTML = navbar();
document.querySelector(".navbar-nav").classList.add('d-none');
document.querySelector(".form-inline").classList.add('d-none');

//formdata handling

const userRegister = async (e) => {
    e.preventDefault();
    const data = {
        username : document.querySelector("#username").value,
        email : document.querySelector("#email").value,
        password : document.querySelector("#password").value
    }
    // console.log(data);
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S)(?!.*\s).{8,}$/;
    if(passRegex.test(data.password)){
        const url = "http://localhost:8090/user/signup";
        const option = {
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(data)
        }

        const req = await fetch(url , option);
        const res = await req.json();
        
        console.log(res);
        let msg = res?.msg;
        if(msg == "User Already Exist"){
            suer_msg.classList.remove("d-none");
            $(document).ready(function(){
                $("#errorsuc_msg").text(msg);
                $("#errorsuc_msg").fadeIn(1000,function(){
                    $(this).fadeOut(4000);
                })
            })
        }
        if(msg == "User Successfully Registerd."){
            suer_msg.classList.remove("d-none");
            suer_msg.classList.remove("alert-danger");
            suer_msg.classList.add("alert-success");
            $(document).ready(function(){
                $("#errorsuc_msg").text(msg);
                $("#errorsuc_msg").fadeIn(1000,function(){
                    $(this).fadeOut(4000);
                })
            })
        }
    }
    else{
        suer_msg.classList.remove("d-none");
        $(document).ready(function(){
            $("#errorsuc_msg").text("Enter Valid data !");
            $("#errorsuc_msg").fadeIn(1000,function(){
                $(this).fadeOut(4000);
            })
        })
    }

}

const regUserData = document.querySelector("#regUserData");
regUserData.addEventListener("submit",userRegister)

