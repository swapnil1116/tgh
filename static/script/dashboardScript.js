// FOR MENU BUTTON
let MenuButtonOfNavbar=document.querySelector("#menu")
let whenHoverOnMenuButton=document.querySelector("#hover-on-menu")
let arrowDownInsideMenuButtonOfNavbar=document.querySelector("#menu i")

MenuButtonOfNavbar.addEventListener("mouseover",()=>{
    console.log("on button")
  whenHoverOnMenuButton.style.display="block";
  arrowDownInsideMenuButtonOfNavbar.classList.remove("fa-angle-down")
  arrowDownInsideMenuButtonOfNavbar.classList+=(" fa-angle-up")
  whenHoverOnMenuButton.addEventListener("mouseover",()=>{
    whenHoverOnMenuButton.style.display="block";
    arrowDownInsideMenuButtonOfNavbar.classList.remove("fa-angle-down")
    arrowDownInsideMenuButtonOfNavbar.classList+=(" fa-angle-up")
    
  });
  whenHoverOnMenuButton.addEventListener("mouseout",()=>{
    whenHoverOnMenuButton.style.display="none";
   
    arrowDownInsideMenuButtonOfNavbar.classList.remove("fa-angle-up")
    arrowDownInsideMenuButtonOfNavbar.classList+=(" fa-angle-down")
    
  }) 
  
})
MenuButtonOfNavbar.addEventListener("mouseout",()=>{
  whenHoverOnMenuButton.style.display="none";
  arrowDownInsideMenuButtonOfNavbar.classList.remove("fa-angle-up")
  arrowDownInsideMenuButtonOfNavbar.classList+=(" fa-angle-down")
})


// DELETING AND CONFIRMING THE AUCTION
let deleteAuctionButton=document.getElementsByClassName("delete-auction");
let completeWrapperOfPage=document.getElementById("complete-wrapper-of-page")
// let deleteAuctionSection=document.querySelectorAll(".delete-auction-section")
let doNotDeleteAuction=document.querySelectorAll(".doNotDeleteAuction")


for(var i=0;i<deleteAuctionButton.length;i++){
  deleteAuctionButton[i].addEventListener("click",function (e){
    deleteAuctionSection=e.target.nextElementSibling;
    console.log(deleteAuctionSection)
    deleteAuctionSection.style.display="flex"
    completeWrapperOfPage.classList+=" shadowing"     
  })
}
for(i=0;i<deleteAuctionButton.length;i++){
    doNotDeleteAuction[i].addEventListener("click",(e)=>{
      for(var i=0;i<deleteAuctionButton.length;i++){
          doNotDeleteAuction[i].parentNode.parentNode.style.display="none"
          completeWrapperOfPage.className=" "
      }  
    })
}  