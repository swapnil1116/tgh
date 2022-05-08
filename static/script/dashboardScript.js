// FOR MENU BUTTON
let MenuButtonOfNavbar=document.querySelector("#menu")
let whenHoverOnMenuButton=document.querySelector("#hover-on-menu")
let arrowDownInsideMenuButtonOfNavbar=document.querySelector("#menu i")


// DELETING AND CONFIRMING THE AUCTION
let deleteAuctionButton=document.getElementsByClassName("delete-auction");
let completeWrapper1OfPage=document.getElementById("wrapper1")
// let deleteAuctionSection=document.querySelectorAll(".delete-auction-section")
let doNotDeleteAuction=document.querySelectorAll(".doNotDeleteAuction")


for(var i=0;i<deleteAuctionButton.length;i++){
  deleteAuctionButton[i].addEventListener("click",function (e){
    deleteAuctionSection=e.target.nextElementSibling;
    deleteAuctionSection.style.display="flex"
    completeWrapper1OfPage.classList+=" shadowing"     
    
  })
  
}
for(i=0;i<deleteAuctionButton.length;i++){
    doNotDeleteAuction[i].addEventListener("click",(e)=>{
      for(var i=0;i<deleteAuctionButton.length;i++){
          doNotDeleteAuction[i].parentNode.parentNode.style.display="none"
          completeWrapper1OfPage.classList.remove("shadowing")
      }  
    })
}  


// Get the container element
// var btnContainer = document.getElementById("myDIV");

// Get all buttons with class="btn" inside the container
var realLinksInSidebarDashboard = document.getElementsByClassName("real-links-in-sidebar");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < realLinksInSidebarDashboard.length; i++) {
  realLinksInSidebarDashboard[i].addEventListener("click", function(e) {
    console.log(e.target)
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    e.target.className += " active";
  });
}

// FOR SIDE PANEL'S APPEARANCE
if(screen.width<740){
  // FOR SIDE-NAVBAR'S DISAPPEARANCE
  let bars=document.querySelector(".bars")
  let outermost= document.getElementById("wrapper2")
  let sidebar=document.querySelector("#sidebar")
  
    outermost.addEventListener("click",(e)=>{
      e.preventDefault();
      bars.className="bars"
      sidebar.className="sidebar-section"
      outermost.classList.remove("shadowing")
    })
  // FOR SIDE-NAVBAR'S APPEARANCE
  function navbarBelow720px(x) {
    x.classList.toggle("change");
    x.classList.toggle("border");
    $("#sidebar").toggleClass("show");
    $("#wrapper2").toggleClass("shadowing")
  }
}