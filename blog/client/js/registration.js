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
            let userinfo = res?.udata?.tokens[res.udata.tokens.length -1].token.toString();
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

