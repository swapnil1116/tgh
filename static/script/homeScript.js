

// FOR APPEARING AND DISAPPEARING OF NAVBAR AND IMAGE BACKGROUND OF MAIN PAGE
var navbarOverlay = document.querySelector('#navbar-overlay');
var mainSectionOverlay=document.querySelector("#main-section-overlay");
var belowFooterSection=document.getElementById("below-footer-section");
window.onscroll = function() {
  // pageYOffset or scrollY
  if (window.scrollY > 70 && window.scrollY<120) {
    navbarOverlay.style.opacity="0.2"
    mainSectionOverlay.style.opacity="0.1"
    belowFooterSection.style.display="none"
  } 
  else if (window.scrollY >119 && window.scrollY<=250) {
    navbarOverlay.style.opacity="0.3"
    mainSectionOverlay.style.opacity="0.25"
    belowFooterSection.style.display="none"
  }
  else if (window.scrollY >250 && window.scrollY<=350) {
    navbarOverlay.style.opacity="0.4"  
    mainSectionOverlay.style.opacity="0.35"
    belowFooterSection.style.display="none"
  }
  else if (window.scrollY >350 && window.scrollY<=450) {
    navbarOverlay.style.opacity="0.7"
    mainSectionOverlay.style.opacity="0.45"
    belowFooterSection.style.display="flex"  
  }
  else if (window.scrollY >450 && window.scrollY<=500) {
    navbarOverlay.style.opacity="1"
    mainSectionOverlay.style.opacity="0.55" 
  }
  else if (window.scrollY >500 && window.scrollY<=550) {
    navbarOverlay.style.opacity="1"
    mainSectionOverlay.style.opacity="0.6"
  }
  else if (window.scrollY >550 && window.scrollY<=600) {
    navbarOverlay.style.opacity="1"  
    mainSectionOverlay.style.opacity="0.6"
  }
  else if (window.scrollY >600 && window.scrollY<=650) {
    navbarOverlay.style.opacity="1"  
    mainSectionOverlay.style.opacity="0.6"
  }
  else if (window.scrollY >650 && window.scrollY<=750) {
    navbarOverlay.style.opacity="1"  
    mainSectionOverlay.style.opacity="0.6"
  }
  else if (window.scrollY >750 ) {
    navbarOverlay.style.opacity="1"
    mainSectionOverlay.style.opacity="0.6"
    belowFooterSection.style.display="flex"
  }
  else {
    navbarOverlay.style.opacity="0"
    mainSectionOverlay.style.opacity="0"
  }
}


// CLICKING ON SEARCH ICON INSIDE NAVBAR
let searchIcon=document.getElementById("search-icon-navbar")
let divForSearch=document.getElementById("div-for-search")
let searchInput=document.getElementById("navbar-search");
let crossForSearch=document.getElementById("cross-navbar-search")
let outermost=document.getElementById("outermost");
searchIcon.addEventListener("click",(e)=>{
  e.preventDefault();
  divForSearch.style.display="flex";
  outermost.className="shadowing";
  outermost.style.backgroundColor="transparent"
  outermost.style.height=`${document.body.clientHeight}px`;
  searchInput.focus()
})
crossForSearch.addEventListener("click",()=>{
  divForSearch.style.display="none"
  outermost.className=" "
  outermost.style.backgroundColor="black"
})
outermost.addEventListener("click",(e)=>{
  outermost.className=" "
  outermost.style.backgroundColor="black"
  divForSearch.style.display="none"
})

// WHEN HOVERING ON NAVBAR LINKS
// FIRST LETS DO IT FOR HOME LINK
let HomeButtonOfNavbar=document.querySelector("#home")
let whenHoverOnHomeButton=document.querySelector("#hover-on-home")
let arrowDownInsideHomeButtonOfNavbar=document.querySelector("#home i")

console.log(HomeButtonOfNavbar)
HomeButtonOfNavbar.addEventListener("mouseover",()=>{

  whenHoverOnHomeButton.style.display="block";
  arrowDownInsideHomeButtonOfNavbar.classList.remove("fa-angle-down")
  arrowDownInsideHomeButtonOfNavbar.classList+=(" fa-angle-up")
  whenHoverOnHomeButton.addEventListener("mouseover",()=>{
    whenHoverOnHomeButton.style.display="block";
    arrowDownInsideHomeButtonOfNavbar.classList.remove("fa-angle-down")
    arrowDownInsideHomeButtonOfNavbar.classList+=(" fa-angle-up")
    
  });
  whenHoverOnHomeButton.addEventListener("mouseout",()=>{
    whenHoverOnHomeButton.style.display="none";
   
    arrowDownInsideHomeButtonOfNavbar.classList.remove("fa-angle-up")
    arrowDownInsideHomeButtonOfNavbar.classList+=(" fa-angle-down")
    
  }) 
  
})
HomeButtonOfNavbar.addEventListener("mouseout",()=>{
  whenHoverOnHomeButton.style.display="none";
  arrowDownInsideHomeButtonOfNavbar.classList.remove("fa-angle-up")
  arrowDownInsideHomeButtonOfNavbar.classList+=(" fa-angle-down")
})

// FOR OUR COMPANY
let CompanyButtonOfNavbar=document.querySelector("#company")
let whenHoverOnCompanyButton=document.querySelector("#hover-on-company")
let arrowDownInsideCompanyButtonOfNavbar=document.querySelector("#company i")

console.log(HomeButtonOfNavbar)

CompanyButtonOfNavbar.addEventListener("mouseover",()=>{

  whenHoverOnCompanyButton.style.display="block";
  arrowDownInsideCompanyButtonOfNavbar.classList.remove("fa-angle-down")
  arrowDownInsideCompanyButtonOfNavbar.classList+=(" fa-angle-up")
  whenHoverOnCompanyButton.addEventListener("mouseover",()=>{
    whenHoverOnCompanyButton.style.display="block";
    arrowDownInsideCompanyButtonOfNavbar.classList.remove("fa-angle-down")
    arrowDownInsideCompanyButtonOfNavbar.classList+=(" fa-angle-up")
    
  });
  whenHoverOnCompanyButton.addEventListener("mouseout",()=>{
    whenHoverOnCompanyButton.style.display="none";
   
    arrowDownInsideCompanyButtonOfNavbar.classList.remove("fa-angle-up")
    arrowDownInsideCompanyButtonOfNavbar.classList+=(" fa-angle-down")
    
  }) 
  
})
CompanyButtonOfNavbar.addEventListener("mouseout",()=>{
  whenHoverOnCompanyButton.style.display="none";
  arrowDownInsideCompanyButtonOfNavbar.classList.remove("fa-angle-up")
  arrowDownInsideCompanyButtonOfNavbar.classList+=(" fa-angle-down")
})


// JAVASCRIPT FOR TRANSFERER FORM HERE
let transfererButtonInMainSection=document.getElementById("transferer");
let navbar=document.getElementById("navbar");
outermost=document.getElementById("outermost");
let transfererSideBarsection=document.querySelector(".transferer-section");
let crossTransferer=document.querySelector("#cross-transferer");
transfererButtonInMainSection.addEventListener("click",transfererSideBarClick);
crossTransferer.addEventListener("click",crossTransfererClick);
outermost.addEventListener("click",outermostTransfererClick)
function transfererSideBarClick(e){
    e.preventDefault()
    crossTransferer.style.display="block"
    transfererSideBarsection.classList +=" show-transferer"
    outermost.className="shadowing";
    outermost.style.height=`${document.body.clientHeight}px`;
    document.body.style.overflowY="hidden";
  };
  
function crossTransfererClick(e){
  e.preventDefault();
    transfererSideBarsection.classList.remove("show-transferer")
    transfererButtonInMainSection.style.display="inline"
    crossTransferer.style.display="none"
    navbar.style.opacity="1"
    document.body.style.overflowY="scroll";
    outermost.className=" "
  };
  function outermostTransfererClick(e){
  e.preventDefault();
  transfererSideBarsection.classList.remove("show-transferer")
  transfererButtonInMainSection.style.display="inline"
  crossTransferer.style.display="none";
  document.body.style.overflowY="scroll";
  navbar.style.opacity="1"
  outermost.className=" "
  divForSearch.style.display="none"
}; 


// JAVASCRIPT FOR TRASNPORTER SIDEBAR
let transporterButtonInMainSection=document.getElementById("transporter");
navbar=document.getElementById("navbar");
outermost=document.getElementById("outermost");
let transporterSideBarsection=document.querySelector(".transporter-section");
let crossTransporter=document.querySelector("#cross-transporter");
transporterButtonInMainSection.addEventListener("click",transporterSideBarClick);
crossTransporter.addEventListener("click",crossTransporterClick);
outermost.addEventListener("click",outermostTransporterClick)
function transporterSideBarClick(e){
    e.preventDefault()
    crossTransporter.style.display="block"
    transporterSideBarsection.classList +=" show-transporter"
    outermost.className="shadowing";
    outermost.style.height=`${document.body.clientHeight}px`;
    document.body.style.overflowY="hidden";
  };
  
function crossTransporterClick(e){
  e.preventDefault();
    transporterSideBarsection.classList.remove("show-transporter")
    transporterButtonInMainSection.style.display="inline"
    crossTransporter.style.display="none"
    navbar.style.opacity="1"
    document.body.style.overflowY="scroll";
    outermost.className=" "
  };
  function outermostTransporterClick(e){
  e.preventDefault();
  
  transporterSideBarsection.classList.remove("show-transporter")
  transporterButtonInMainSection.style.display="inline"
  crossTransporter.style.display="none"
  document.body.style.overflowY="scroll";
  navbar.style.opacity="1"
  outermost.className=" "
}; 

// FOR SUBSCRIBE US BUTTON 
let subscribeButton=document.querySelector("#subscribe-us-button")
function onsubmit(){
  // window.location.hash = "#subscribe-email-form";
  console.log("Subscribed button clicked")
  document.querySelector("#subscribe-email-form").scrollIntoView()
}





// FOR ERRORS 
let errorCross=document.querySelector(".error-cross");
let nameInput=document.getElementById("name");
errorCross.addEventListener("click",()=>{
    errorCross.parentElement.style.display="none"
    nameInput.focus()
    
})
