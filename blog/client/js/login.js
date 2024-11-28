import navbar from "../helper/navbar.js";


let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
np.innerHTML = navbar();
document.querySelector(".navbar-nav").classList.add('d-none');
document.querySelector(".form-inline").classList.add('d-none');