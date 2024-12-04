import navbar from "../helper/navbar.js";
import port from "../port.js";


let np = document.querySelector(".navbar_place");
np.innerHTML = navbar();

let uata = Cookies.get("ULD");

if (uata || uata !== null || uata !== undefined) {
    let udata = {
      data: uata,
    };
    let msg = `<p>Please log in to continue.</p>`;
    // suer_msg.classList.remove("d-none");
    $(document).ready(function () {
      $("#errorsuc_msg").html(msg);
      $("#errorsuc_msg").fadeIn(1000, function () {
        $(this).fadeOut(19000);
      });
    });
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
        document.querySelector(".username").textContent = res?.us_data?.username;
        document.querySelector(".email").textContent = res?.us_data?.email;
        document.querySelector(".role").textContent = res?.us_data?.role;
        document.querySelector(".activation").textContent = res?.us_data?.activation;
        
        const url0 = "http://localhost:8090/user/adm";
        const option0 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        let req0 = await fetch(url0, option0);
        let res0 = req ? await req0.json() : await console.log("no Response");
        console.log(res0);

        let admdisplay = document.createElement('div');
        admdisplay.classList.add("container","adminDisplay","d-flex","flex-column","justify-content-center","align-items-center","mt-1");
        
        res0.data.map((elm)=>{
          let acard = document.createElement("div");
          acard.classList.add("card","w-75","mb-1") 
          acard.setAttribute("id",elm._id)
          let acardhead = document.createElement("div");
          acardhead.classList.add("card-header") 
          acardhead.textContent = "Admin Profile"
  
          let acardbody = document.createElement("div");
          acardbody.classList.add("card-body","d-flex","justify-content-center","align-items-center","p-2") 
  
          let ainfo = document.createElement("div");
          ainfo.classList.add("infoContainer","w-75") 
          
          let carcon1 = document.createElement("div");
          carcon1.classList.add("carcon-1","mb-1","mr-4");
          let nameattr = document.createElement("h5");
          nameattr.classList.add("d-inline","mr-2")
          nameattr.textContent = "Name : "
          let aname = document.createElement("h5");
          aname.classList.add("card-title","d-inline","adname")
          aname.textContent = elm?.username ;
          carcon1.append(nameattr,aname)
  
          let carcon2 = document.createElement("div");
          carcon2.classList.add("carcon-1","mb-1");
          let Emailattr = document.createElement("h5");
          Emailattr.classList.add("d-inline","mr-2")
          Emailattr.textContent = "Email : "
          let aemail = document.createElement("h5");
          aemail.classList.add("card-title","d-inline")
          aemail.textContent = elm?.email ;
          carcon2.append(Emailattr,aemail)
  
          let carcon3 = document.createElement("div");
          carcon3.classList.add("carcon-1","mb-1");
          let roleattr = document.createElement("h5");
          roleattr.classList.add("d-inline","mr-2")
          roleattr.textContent = "Role : "
          let arole = document.createElement("h5");
          arole.classList.add("card-title","d-inline")
          arole.textContent = elm?.role ;
          carcon3.append(roleattr,arole)
  
          let carcon4 = document.createElement("div");
          carcon4.classList.add("carcon-1","mb-1");
          let actattr = document.createElement("h5");
          actattr.classList.add("d-inline","mr-2")
          actattr.textContent = "Activation : "
          let aactive = document.createElement("h5");

          aactive.classList.add("card-title","d-inline")
          aactive.textContent = elm?.verify;
          carcon4.append(actattr,aactive)
  
          let modadm = document.createElement("button");
          modadm.classList.add("btn","btn-outline-dark","float-right");
          modadm.textContent = "Modify Profile" 

          let Accept = document.createElement("button");
          if(elm?.verify){
            Accept.classList.add("d-none")
          }
          Accept.classList.add("btn","btn-success","float-right","ml-4","mr-3");
          Accept.textContent = "Accept" 
          Accept.setAttribute("id",`${elm._id}_acpt`)

          let Reject = document.createElement("button");
          Reject.classList.add("btn","btn-danger","float-right","mr-2");
          Reject.textContent = "Reject" 
          Reject.setAttribute("id",`${elm._id}rejt`)
  
          ainfo.append(carcon1,carcon2,carcon3,carcon4,modadm,Accept,Reject);
  
          let admimgcont = document.createElement('div');
          admimgcont.classList.add("imageContainer","ml-5","h-100","border","d-flex","justify-content-center");
  
          let admimg = document.createElement("img");
          admimg.setAttribute("src","../image/images-removebg-preview (1).png")
          admimg.setAttribute("width",150)
  
          admimgcont.append(admimg)
  
          acardbody.append(ainfo , admimgcont)
  
          acard.append(acardhead , acardbody)
          admdisplay.append(acard)

          Accept.addEventListener("click",async()=> {
            const id = elm._id
            console.log(id);
            
            let url = "http://localhost:8090/user/adm/verify";
            let option = {
                method : "POST",
                headers : {"content-type":"application/json"},
                body : JSON.stringify({id})
            };

            let req = await fetch(url,option);
            let res = await req.json();
            console.log(res);
          })

        })
        document.querySelector(".admdis").append(admdisplay)
        

        if (res?.us_data?.activation) {
          // user dashbord on show data and use all services
        } else if (
          res?.us_data?.activation == undefined ||
          res?.msg == "Not Valid Token !"
        ) {
          $(document).ready(function () {
            // suer_msg.classList.remove("d-none");
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
            // suer_msg.classList.remove("d-none");
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