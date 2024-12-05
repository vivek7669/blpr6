const sibar = () =>{
 let udata = Cookies.get("ULD")
  if(udata){
    return `    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a class="btn btn-link active" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Profile</a>
      <div class="dropdown">
        <a class="btn dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Blog
        </a>
        <div class="dropdown-menu ml-5" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="../web/crBlopage.html">Add</a>
          <a class="dropdown-item" href="../web/logusrbl.html">Blogs</a>
        </div>
      </div>
      <a class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Setting</a>
      <a class="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">About</a>
      <!-- <a href="#">Contact</a> -->
    </div>
  
  
    <div id="main">
      <span style="font-size:30px;cursor:pointer" onclick="openNav()"><i class="fa-solid fa-ellipsis text-light px-2 rounded-pill"></i></span>
    </div>`
  }
  else{
    return ``
  }

}
export default sibar;