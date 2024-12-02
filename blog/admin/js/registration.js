import navbar from "../helper/navbar.js";
import port from "../port.js";


let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
np.innerHTML = navbar();
document.querySelector(".navbar-nav").classList.add('d-none');
document.querySelector(".form-inline").classList.add('d-none');

//formdata handling

const userRegister = async (e) => {
    e.preventDefault();
    var response = grecaptcha.getResponse();
    let formData = new FormData(e.target);
    formData.append("response",response)
    console.log(formData.get("role"));
    
    // console.log(formData);
    // console.log(    formData.get("username"),
    // formData.get("email"),
    // formData.get("role"),
    // formData.get("password"));
    
    
    // Check if the response is empty
    if (response.length === 0) {
        return;
    }

    // Collect other form data
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        role : formData.get("role"),
        password: formData.get("password"),
        response: formData.get("response")  
    };
    // console.log(data);
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S)(?!.*\s).{8,}$/;
    if(passRegex.test(formData.get("password"))){
        const url = "http://localhost:8090/admin/signup";
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
            let userinfo = res?.udata?.tokens[res.udata.tokens.length -1].token.toString();
            console.log(userinfo);
            
            let seusecokkie = Cookies.set("ULD",userinfo,{expires : 1 , path: "/" ,SameSite: "Lax"});
            if(seusecokkie) {
                console.log("cookie is set");
                console.log(Cookies.get("ULD"));
            }
            
            setTimeout(()=>{
                window.location = `http://127.0.0.1:${port}/web/index.html`
            },1500)
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

document.querySelector(".fa-lock").addEventListener("click",(e)=> {
    e.preventDefault(); 
    document.querySelector(".passicon").classList.toggle("fa-unlock");
    
    let clarr = document.querySelector(".passicon").getAttribute("class").split(" ");
    if(clarr[clarr.length-1] == "fa-unlock"){
        document.querySelector("#password").setAttribute("type","text");
    }else{
        document.querySelector("#password").setAttribute("type","password");
    }
})


