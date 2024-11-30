import navbar from "../helper/navbar.js";

let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
// let msg = `<p>Your Email is Not Verifed Then Fist Your Verify Your Email After Use Advance Services , Your Gmail <a href="https://mail.google.com/mail/${email}">${email}</a></p>`;
np.innerHTML = navbar();

let uata = Cookies.get("ULD");
let udata = {
  data: uata,
};

if (uata) {
  document.querySelector(".ulnav").classList.add("d-none");
  document.querySelector(".ulonav").classList.remove("d-none");
  const iifi = async () => {
    const url = "http://localhost:8090/user/decodedUser";
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json",
                'Authorization': `Bearer ${uata}`
       },
      body: JSON.stringify(udata),
    };
    let req = await fetch(url, option);
    let res = req ? await req.json() : await console.log("no Response");
    console.log(res);
    // console.log(res.us_data.activation); //!work in Progressive... 😦🤖👁
    document.querySelector(".uname").textContent = res?.us_data?.username
    if (res?.us_data?.activation) {
      // user dashbord on show data and use all services 
    }
    else if(res?.us_data?.activation == undefined || res?.msg == "Not Valid Token !"){
      $(document).ready(function(){
        suer_msg.classList.remove("d-none")
        let msg = `<p>Please Login And Verify Your Account !</p>`
          $("#errorsuc_msg").html(msg);
          $("#errorsuc_msg").fadeIn(1000,function(){
              $(this).fadeOut(19000);
          })
      })
      setTimeout(()=>{
          Cookies.remove("ULD");
          location.reload(true);
      },1500)
    }
    else {
      $(document).ready(function(){
        suer_msg.classList.remove("d-none")
        let msg = `<p>Your Account Is Not Active Then You Account Verfiy Link Send On Your Email Just Verify to Click On <a href="https://mail.google.com/mail/${res?.us_data?.email}">${res?.us_data?.email}</a></p>`
          $("#errorsuc_msg").html(msg);
          $("#errorsuc_msg").fadeIn(1000,function(){
              $(this).fadeOut(19000);
          })
      })
    }
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

document.querySelector(".ulonav").addEventListener("click",()=>{
   Cookies.remove("ULD");
});
