import navbar from "../helper/navbar.js";

const urlParams = new URLSearchParams(window.location.search);

let np = document.querySelector(".navbar_place");
let suer_msg = document.querySelector("#errorsuc_msg");
// let msg = `<p>Your Email is Not Verifed Then Fist Your Verify Your Email After Use Advance Services , Your Gmail <a href="https://mail.google.com/mail/${email}">${email}</a></p>`;
np.innerHTML = navbar();

let uata = Cookies.get("ULD");

if(uata == undefined){
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

if (uata || uata !== null || uata !== undefined) {
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
      // console.log(res.us_data.activation); //!work in Progressive... 😦🤖👁
      document.querySelector(".uname").textContent = res?.us_data?.username;
      if (res?.us_data?.activation) {
        // user dashbord on show data and use all services
      } else if (
        res?.us_data?.activation == undefined ||
        res?.msg == "Not Valid Token !"
      ) {
        $(document).ready(function () {
          suer_msg.classList.remove("d-none");
          let msg = `<p>Please Login And Verify Your Account !</p>`;
          $("#errorsuc_msg").html(msg);
          $("#errorsuc_msg").fadeIn(1000, function () {
            $(this).fadeOut(19000);
          });
        });
        setTimeout(() => {
          Cookies.remove("ULD");
          location.reload(true);
        }, 1500);
      } else {
        $(document).ready(function () {
          suer_msg.classList.remove("d-none");
          let msg = `<p>Your Account Is Not Active Then You Account Verfiy Link Send On Your Email Just Verify to Click On <a href="https://mail.google.com/mail/${res?.us_data?.email}">${res?.us_data?.email}</a></p>`;
          $("#errorsuc_msg").html(msg);
          $("#errorsuc_msg").fadeIn(1000, function () {
            $(this).fadeOut(19000);
          });
        });
      }
    };
    iifi();
  }

  let url1 = "http://localhost:8090/blog/"
  let option1 = {
    method : "GET"
  }
  
  let req = await fetch(url1,option1);
  let res = await req.json();
  console.log(res);
  
  let blpace = document.querySelector(".bloag_list");
  blpace.innerHTML = '';
  res.data.map(({_id,author ,category ,content , image ,likedBy,title})=>{
    // console.log(likedBy.length);
    
    let blCard = document.createElement("a");
    blCard.href= `../web/singlePageBlog.html?sinBlId=${_id}`
    blCard.classList.add("card", "mx-2", "mb-3", "w-25" ,"text-decoration-none","text-dark");
    let imcont = document.createElement("div");
    imcont.style.height = "140px";
    imcont.style.overflow = "hidden";
    imcont.classList.add("w-100");
    let uimg = document.createElement("img");
    uimg.src = `http://localhost:8090/blog/${image}`;
    uimg.classList.add("align-self-center", "m-2");
    uimg.setAttribute("width", "250px");
  
    imcont.append(uimg);
  
    let cbody = document.createElement("div");
    cbody.classList.add("card-body");
  
    let ctitle = document.createElement("h5");
    ctitle.setAttribute("id", `ctit${_id}`);
    ctitle.classList.add("card-title");
    ctitle.textContent = title;

    let likeContainer = document.createElement("div");
    likeContainer.classList.add("d-flex","flex-column","justify-content-center","align-items-end"); 

    let likeNyUser = document.createElement("i");
    likeNyUser.classList.add("fa-regular","fa-heart","float-right","display-block");
    likeNyUser.style.fontSize= "1rem";
    let likeCount = document.createElement("h5");
    likeCount.classList.add("float-right","display-inline");
    likeCount.style.fontSize= "1rem";
    likeCount.style.margin= "0 0.2rem 0 0";
    likeCount.textContent = likedBy.length;

    likeContainer.append(likeNyUser,likeCount);

    let ctext = document.createElement("p");
    ctext.setAttribute("id", `ctxt${_id}`);
    ctext.classList.add("card-text");
    ctext.textContent = category;
  
    let conOfu = document.createElement("pre");
    conOfu.classList.add("card-text");
    conOfu.textContent = content;
    conOfu.style.textIndent = "1.5rem";
  
    let blAuth = document.createElement("pre");
    blAuth.style.fontWeight = "600";
    blAuth.classList.add("card-text","float-right");
    blAuth.textContent = `-${author?.username}`

    cbody.append(ctitle ,likeContainer, ctext, conOfu,blAuth);
    blCard.append(imcont, cbody);
  
    blpace.append(blCard);
  
    $(document).ready(function () {
      $(`.popup-btn_${_id}`).click(async function (e) {
        let data = `.popup-btn_${_id}`;
        let id = data.split("_");
        document.querySelector(".delTitle").textContent =
          document.querySelector(`#ctit${_id}`).textContent;
        document.querySelector(".delContent").textContent =
          document.querySelector(`#ctxt${_id}`).textContent;
        $(".popup-wrap").fadeIn(500);
        $(".popup-box")
          .removeClass("transform-out")
          .addClass("transform-in");
  
        e.preventDefault();
  
        document.querySelector(".delbtn").addEventListener("click",async(e)=>{
          e.preventDefault();
          const url2 = `http://localhost:8090/blog/delete/${id[1]}`;
          const option2 = {
            method: "DELETE",
          };
          let req = await fetch(url2 , option2);
          let res = await req.json();
          console.log(res.msg);
          location.reload();
        })
  
      });
  
      $(".popup-close").click(function (e) {
        $(".popup-wrap").fadeOut(500);
        $(".popup-box")
          .removeClass("transform-in")
          .addClass("transform-out");
  
        e.preventDefault();
      });
    });
  })
  




} else {
  if (urlParams || urlParams !== null) {
    const userToken = urlParams.get("user");
    let seusecokkie = Cookies.set("ULD", userToken, {
      expires: 1,
      path: "/",
      SameSite: "Lax",
    });
    console.log("Cookies Is set");
  }
  location.reload(true);
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

document.querySelector(".ulonav").addEventListener("click", () => {
  Cookies.remove("ULD");
});
