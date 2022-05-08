
// FOR APPEARING AND DISAPPEARING OF NAVBAR AND IMAGE BACKGROUND OF MAIN PAGE
var navbarOverlay = document.querySelector('#navbar-overlay');
var mainSectionOverlay=document.querySelector("#main-section-overlay");
var belowFooterSection=document.getElementById("below-footer-section");
window.onscroll = function() {
  // pageYOffset or scrollY
  if (window.scrollY > 70 && window.scrollY<120) {
    navbarOverlay.style.opacity="0.2"
    mainSectionOverlay.style.opacity="0.1"
    // belowFooterSection.style.display="none"
  } 
  else if (window.scrollY >119 && window.scrollY<=250) {
    navbarOverlay.style.opacity="0.3"
    mainSectionOverlay.style.opacity="0.25"
    // belowFooterSection.style.display="none"
  }
  else if (window.scrollY >250 && window.scrollY<=350) {
    navbarOverlay.style.opacity="0.4"  
    mainSectionOverlay.style.opacity="0.35"
    // belowFooterSection.style.display="none"
  }
  else if (window.scrollY >350 && window.scrollY<=450) {
    navbarOverlay.style.opacity="0.7"
    mainSectionOverlay.style.opacity="0.45"
    // belowFooterSection.style.display="none"  
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
    // belowFooterSection.style.display="flex"  
  }
  else if (window.scrollY >750 ) {
    navbarOverlay.style.opacity="1"
    mainSectionOverlay.style.opacity="0.6"
    // belowFooterSection.style.display="flex"
  }
  else {
    navbarOverlay.style.opacity="0"
    mainSectionOverlay.style.opacity="0"
  }
  screenHeight=(screen.height)/1.1;

  if(window.scrollY>screenHeight){
    belowFooterSection.style.display="flex"
  }else if(window.scrollY<screenHeight){
    belowFooterSection.style.display="none"
  }
}


let transporterSideBarsection=document.querySelector(".transporter-section");
// FOR NAVBAR BELOW 950PX and ABOVE 740PX WIDTH
if(screen.width>=741){
  function navbarBelow950px(x) {
    x.classList.toggle("change");
    x.classList.toggle("border");
    $(".navbar-section-below-950px").toggleClass("show-navbar-section-below-950px");
    $("#navbar").toggleClass("show-navbar-section-below-950px");
  }
}
else if(screen.width<740){
  // FOR SIDE-NAVBAR'S DISAPPEARANCE
  let bars=document.querySelector(".bars")
  let outermost2= document.getElementById("outermost2")
  let sidebar=document.querySelector(".sidebar-section")
  let changedCrossInsideNavbar=document.querySelector(".change")
  outermost2.addEventListener("click",(e)=>{
    e.preventDefault();
    bars.className="bars"
    sidebar.className="sidebar-section"
    outermost2.classList.remove("shadowing") 
    document.body.className=" "
  })
  // FOR SIDE-NAVBAR'S APPEARANCE
  function navbarBelow950px(x) {
    x.classList.toggle("change");
    x.classList.toggle("border");
    $(".sidebar-section").toggleClass("show");
    $("body").toggleClass("no-scrolling")
    $("#outermost2").toggleClass("shadowing")
  }

}


// FOR COLORING AND ROTATING THE ARROW DOWN OF MAIN FULL SCREEN NAVBAR AND ALSO DISPLAYING THE LIST ITEMS
let anchorTagOfMainNavbar=document.getElementsByClassName("main-anchor-tags-having-dropdown-links");
let arrowsOfMainNavbar=document.getElementsByClassName("arrows-in-main-navbar");
if(screen.width>1050){
  for(i=0;i<anchorTagOfMainNavbar.length;i++){
  
    arrowsOfMainNavbar[i].style['pointer-events'] ="none"
    anchorTagOfMainNavbar[i].addEventListener("mouseover",(event)=>{
      event.target.nextElementSibling.classList.add("visibility-class-in-main-navbar")
      event.target.children[0].classList.add("arrow-up-inside-main-navbar");
      event.target.classList.add("class-for-color-in-main-navbar")
      event.target.nextElementSibling.addEventListener("mouseenter",(e)=>{
        event.target.classList.add("class-for-color-in-main-navbar")
        event.target.nextElementSibling.classList.add("visibility-class-in-main-navbar")
        event.target.children[0].classList.add("arrow-up-inside-main-navbar");
      })
      event.target.nextElementSibling.addEventListener("mouseleave",(e)=>{
        event.target.classList.remove("class-for-color-in-main-navbar")
        event.target.children[0].classList.remove("arrow-up-inside-main-navbar");
        event.target.nextElementSibling.classList.remove("visibility-class-in-main-navbar")
      })
    })
  }
  for(i=0;i<anchorTagOfMainNavbar.length;i++){
    anchorTagOfMainNavbar[i].addEventListener("mouseout",(event)=>{
      event.target.classList.remove("class-for-color-in-main-navbar")
      event.target.nextElementSibling.classList.remove("visibility-class-in-main-navbar")
      event.target.children[0].classList.remove("arrow-up-inside-main-navbar");
    })
  }  
}

// FOR TABLETS NAVBAR DROPDOWN MENU
else if(screen.width<=1050){
  document.addEventListener("click",(e)=>{
    let currentForMainNavbar = document.getElementsByClassName("class-for-color-in-main-navbar");
    let rotatedForMainNavbar = document.getElementsByClassName("arrow-up-inside-main-navbar");
    if(e.target.classList.contains("arrows-in-main-navbar")){
      e.preventDefault()
      if(e.target.parentElement.classList.contains("class-for-color-in-main-navbar")){
        currentForMainNavbar[0].className = currentForMainNavbar[0].className.replace(" class-for-color-in-main-navbar", "");
        rotatedForMainNavbar[0].className = rotatedForMainNavbar[0].className.replace(" arrow-up-inside-main-navbar", "");
        e.target.parentElement.nextElementSibling.classList.remove("visibility-class-in-main-navbar")
      }  
      else if(currentForMainNavbar.length==0){
        e.target.parentElement.className += " class-for-color-in-main-navbar";
        e.target.className += " arrow-up-inside-main-navbar";
        e.target.parentElement.nextElementSibling.classList +=" visibility-class-in-main-navbar"
      }
      else{
        previousListInMainNavbar=currentForMainNavbar[0]
        previousListInMainNavbar.nextElementSibling.classList.remove("visibility-class-in-main-navbar");
        currentForMainNavbar[0].className =currentForMainNavbar[0].className.replace(" class-for-color-in-main-navbar", "");
        rotatedForMainNavbar[0].className = rotatedForMainNavbar[0].className.replace(" arrow-up-inside-main-navbar","");
        e.target.parentElement.className += " class-for-color-in-main-navbar";
        e.target.className += " arrow-up-inside-main-navbar";
        e.target.parentElement.nextElementSibling.classList +=" visibility-class-in-main-navbar"  
      }  
    }
    else{
      if(currentForMainNavbar.length==0 || rotatedForMainNavbar.length==0){

      }
      else{
        currentForMainNavbar[0].className =currentForMainNavbar[0].className.replace(" class-for-color-in-main-navbar", "");
        rotatedForMainNavbar[0].className = rotatedForMainNavbar[0].className.replace(" arrow-up-inside-main-navbar","");
        for (var i = 0; i < arrowsOfMainNavbar.length; i++) {
          arrowsOfMainNavbar[i].parentElement.nextElementSibling.classList.remove("visibility-class-in-main-navbar")
        }
      }
    }
  })
}

//  FOR ACTIVE LINK HIGHLIGHTING
// Get all buttons with class="btn" inside the container
// FOR SIDE-BAR NAVIGATION PANEL
var btns = document.getElementsByClassName("arrow-down");
document.addEventListener("click",(e)=>{
  let current = document.getElementsByClassName("active");
  let rotated = document.getElementsByClassName("rotation");
  if(e.target.classList.contains("arrow-down")){
        if(e.target.parentElement.classList.contains("active")){
          current[0].className = current[0].className.replace(" active", "");
          rotated[0].className = rotated[0].className.replace(" rotation", "");
          e.target.parentElement.nextElementSibling.classList.remove("visibility-class-in-sidebar")
        }
        else if(current.length==0){
          e.target.parentElement.className += " active";
          e.target.className += " rotation";
          e.target.parentElement.nextElementSibling.classList +=" visibility-class-in-sidebar"
        }
        else{
          previousList=current[0]
          previousList.nextElementSibling.classList.remove("visibility-class-in-sidebar")
          current[0].className = current[0].className.replace(" active", "");
          rotated[0].className = rotated[0].className.replace(" rotation", "");
          e.target.parentElement.className += " active";
          e.target.className += " rotation";
          e.target.parentElement.nextElementSibling.classList +=" visibility-class-in-sidebar"   
        }
  }
  else{
    if(current.length ==0 || rotated.length==0){
        console.log("nothing right now")
    }  
    else{
      console.log("clicked outside")
      current[0].className = current[0].className.replace(" active", "");
      rotated[0].className = rotated[0].className.replace(" rotation", "");
      for (var i = 0; i < btns.length; i++) {
        btns[i].parentElement.nextElementSibling.classList.remove("visibility-class-in-sidebar")
      }
    }
  }  
})



// FOR SUBSCRIBE US BUTTON 
let subscribeButton=document.querySelector("#subscribe-us-button")
function onsubmit(){
  // window.location.hash = "#subscribe-email-form";
  console.log("Subscribed button clicked")
  document.querySelector("#subscribe-email-form").scrollIntoView()
}

// FOR BIO OF OUR PEOPLE
let bioButton=document.getElementsByClassName("for-bio")
for(i=0;i<bioButton.length;i++){
  bioButton[i].addEventListener("click",(e)=>{
    if(e.target.children[1].classList.contains("bio-button-clicked")){
      e.target.nextElementSibling.classList.remove("bio-visible")
      e.target.children[1].classList.remove("bio-button-clicked")
    }
    else{
      console.log(e.target.nextElementSibling)
      e.target.children[1].classList+=" bio-button-clicked"
      e.target.nextElementSibling.classList+=" bio-visible"
    }
  })
}

// This prevents the page from scrolling down to where it was previously.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
window.scrollTo(0,0);

// FOR ERRORS 
let errorCross=document.querySelector(".error-cross");
let nameInput=document.getElementById("name");
errorCross.addEventListener("click",()=>{
    errorCross.parentElement.style.display="none"
    nameInput.focus()
    
})
