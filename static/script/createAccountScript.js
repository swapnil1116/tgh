let occupation=document.getElementById("occupation")
let truckOption=document.getElementById("truckOption")
let trucks=document.getElementById("trucks")

trucks.addEventListener("input",(e)=>{
    console.log(e.target.value)
})
occupation.addEventListener("input",(e)=>{
    console.log(e.target.value)
    if(e.target.value==="A Carrier"){
        truckOption.style.display="block"
    }
    else{
        truckOption.style.display="none"

    }
})

// FOR ERRORS 
let errorCross=document.querySelector(".error-cross");
let nameInput=document.getElementById("name");
errorCross.addEventListener("click",()=>{
    errorCross.parentElement.style.display="none";
    nameInput.focus()
})