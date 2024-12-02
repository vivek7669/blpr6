const navbar = () => {
     return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="../web/index.html">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active ml-3 mr-2">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">Blogs</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link" href="#">BlogDescription</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link uname" href="#">Dashbord</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link ulnav" href="../web/login.html">Login</a>
        </li>
        <li class="nav-item mr-2">
          <a class="nav-link d-none ulonav" href="../web/login.html">Logout</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="box-shadow:none;">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
`;
}

export default navbar;