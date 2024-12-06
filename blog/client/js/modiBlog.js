import navbar from "../helper/navbar.js";
import sibar from "../helper/sidebar.js";
import PORT from "../port.js";

const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams.get("modId"));
// let msg;
let np = document.querySelector(".navbar_place");
let sbp = document.querySelector(".sidebar_place");
// Geting Data From Server :

const url1 = `http://localhost:8090/blog/${urlParams.get("modId")}`;
const option1 = {
  method: "GET",
};
const req1 = await fetch(url1, option1);
const res1 = await req1.json();
console.log(res1);

document.querySelector("#title").value = res1?.data?.title;
document.querySelector("#content").value = res1?.data?.content;
document.querySelector("#ubimg").value = res1?.data?.image;
document.querySelector(
  "#usimg"
).src = `http://localhost:8090/blog/${res1?.data?.image}`;
let asImg = res1?.data?.image;
document.querySelector("#category").value = res1?.data?.category;

let usId;
let suer_msg = document.querySelector("#errorsuc_msg");
// let msg = `<p>Your Email is Not Verifed Then Fist Your Verify Your Email After Use Advance Services , Your Gmail <a href="https://mail.google.com/mail/${email}">${email}</a></p>`;
sbp.innerHTML = sibar();
np.innerHTML = navbar();

const uata = Cookies.get("ULD");

if (!uata) {
  location.href = "../web/index.html";
}

if (uata) {
  let udata = {
    data: uata,
  };
  if (udata.data !== undefined) {
    document.querySelector(".ulnav").classList.add("d-none");
    document.querySelector(".ulonav").classList.remove("d-none");
    const iifi = async () => {
      const url = "http://localhost:8090/user/decodedUser";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uata}`,
        },
        body: JSON.stringify(udata),
      };
      let req = await fetch(url, option);
      let res = req ? await req.json() : await console.log("no Response");
      console.log(res);
      if (res.error == "Please authenticate") {
        Cookies.remove();
        return (location.href = "http://127.0.0.1:5500/web/");
      }
      usId = res?.us_data?._id;

      document.querySelector(".uname").textContent = res?.us_data?.username;
    };
    iifi();
  }
}

const bloagGenr = async (e) => {
  e.preventDefault();
  var response = grecaptcha.getResponse();

  // Check if the response is empty
  if (response.length === 0) {
    let msg = "Pls Fill The Recaptcha.";
    $(document).ready(function () {
      $("#errorsuc_msg").removeClass("d-none");
      $("#errorsuc_msg").text(msg);
      $("#errorsuc_msg").fadeIn(1000, function () {
        $(this).fadeOut(4000);
      });
    });
    return;
  }

  // Collect other form data
  const formData = new FormData(document.querySelector("#regBloData"));
//   formData.append("author", usId);
//   console.log(formData.get("title"));

//   console.log(document.querySelector("#image").files[0]);
//   console.log(formData.get("image"));
  


// const data = {
//     title : document.querySelector("#title").value,
//     content : document.querySelector("#content").value,
//     image : formData.get("image").name,
//     category : document.querySelector("#category").value,
// }

  if (
    formData.get("title") == "" ||
    formData.get("content") == "" ||
    formData.get("ubimg") == "" ||
    formData.get("category") == "" ||
    formData.get("author") == ""
  ) {
    let msg = "Pls Fill The data.";
    return $(document).ready(function () {
      $("#errorsuc_msg").removeClass("d-none");
      $("#errorsuc_msg").text(msg);
      $("#errorsuc_msg").fadeIn(1000, function () {
        $(this).fadeOut(4000);
      });
    });
  }
  
  if (formData.get("image").name == "") {
      if (document.querySelector("#ubimg").value == asImg) {
          formData.append("image", asImg);
        }
    }
    
  const url0 = `http://localhost:8090/blog/edit/${urlParams.get("modId")}`;
  const option0 = {
    method: "PATCH",
    body: formData
  };

  const req0 = await fetch(url0, option0);
  const res0 = await req0.json();

  console.log(res0);
  let msg = res0?.msg;
  if(msg == "Bloag Genrated Time To Occured Error."){
      suer_msg.classList.remove("d-none");
      $(document).ready(function(){
          $("#errorsuc_msg").text(msg);
          $("#errorsuc_msg").fadeIn(1000,function(){
              $(this).fadeOut(4000);
          })
      })
  }
  if(msg == "Bloag Is Genrated."){
      suer_msg.classList.remove("d-none");
      suer_msg.classList.remove("alert-danger");
      suer_msg.classList.add("alert-success");
      $(document).ready(function(){
          $("#errorsuc_msg").text(msg);
          $("#errorsuc_msg").fadeIn(1000,function(){
              $(this).fadeOut(4000);
          })
      })

      setTimeout(()=>{
          window.location = `../web/logusrbl.html`
      },1500)
  }
  if(msg == "Blog Is Updated."){
      suer_msg.classList.remove("d-none");
      suer_msg.classList.remove("alert-danger");
      suer_msg.classList.add("alert-success");
      $(document).ready(function(){
          $("#errorsuc_msg").text(msg);
          $("#errorsuc_msg").fadeIn(1000,function(){
              $(this).fadeOut(4000);
          })
      })

      setTimeout(()=>{
          window.location = `../web/logusrbl.html`
      },1500)
  }
};

const regblogData = document.querySelector("#regBloData");
regblogData.addEventListener("submit", bloagGenr);

$(document).ready(function () {
  $(".dropdown-toggle").on("click", function () {
    if ($(this).hasClass("clicked")) {
      $(this).removeClass("clicked");
      $(".dropdown-menu").slideUp(150);
      $(this).css("margin-bottom", "0rem");
    } else {
      $(this).addClass("clicked");
      $(".dropdown-menu").slideDown(250);
      $(this).css("margin-bottom", "7rem");
    }
  });
});
