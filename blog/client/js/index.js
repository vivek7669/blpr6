import navbar from "../helper/navbar.js";

let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
let email = "chauhanvivek0918@gmail.com";
let msg = `<p>Your Email is Not Verifed Then Fist Your Verify Your Email After Use Advance Services , Your Gmail <a href="https://mail.google.com/mail/${email}">${email}</a></p>`;
np.innerHTML = navbar();

let uata = Cookies.get("ULD");
let udata = {
    data : uata
}

if (uata) {
  const iifi = async () => {
    const url = "http://localhost:8090/user/decodedUser";
    const option = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(udata)  
    };
    let req = await fetch(url , option);
    let res = req ? await req.json() : await console.log("no Response");
    console.log(res); //!work in Progressive... 😦🤖👁 
  };
  iifi();
} else {
  //? email verfication code
  // $(document).ready(function(){
  //     $("#errorsuc_msg").html(msg);
  //     $("#errorsuc_msg").fadeIn(1000,function(){
  //         $(this).fadeOut(19000);
  //     })
  // })
  let msg = `<p>Please log in to continue.</p>`;
  suer_msg.classList.remove("d-none");
  //? login not or registerd
  $(document).ready(function () {
    $("#errorsuc_msg").html(msg);
    $("#errorsuc_msg").fadeIn(1000, function () {
      $(this).fadeOut(19000);
    });
  });
}
