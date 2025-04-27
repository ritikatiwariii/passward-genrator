let passwordfield=document.querySelector("[data-passwardDisplay]");
let lengthdisplay=document.querySelector("[data-lenght]");
let slider=document.querySelector("[data-lenghtslider]");
let uppercase=document.querySelector("[uppercasecheck]");
let lowercase=document.querySelector("[lowercasecheck]");
let number=document.querySelector("[checknumber]");
let symbols=document.querySelector("[checksymbols]");
let indicator=document.querySelector("[data-indicator]")
//defauls thing
let password="";
let checkcount=0;
let passwordlenght=10;
let sym='#,)(_+{}[]:>.,%$!`~/?<*^-'
handelsider();
function handelsider(){
    slider.value=passwordlenght;
  
    lengthdisplay.innerText=passwordlenght;
}
function setindicator(color){
   indicator.style.backgroundColor=color;
}
function getaRandomNumber(min,max){
  return Math.floor( Math.random()*(max-min))+min;
}
function generatenum(){
  return getaRandomNumber(0,9);
}
function generateupper(){
  return String.fromCharCode(getaRandomNumber(65,91))
}
function generatrlower(){
  return String.fromCharCode(getaRandomNumber(97,123));
}
function getsymbols(){
  const randnum=getaRandomNumber(0,sym.length);
  return sym.charAt(randnum);
}
function getstrenght(){
  let upper=false;
  let lower=false;
  let hassymbol=false;
  let hasnum=false;
  if(uppercase.checked)upper=true;
  if(lowercase.checked) lower=true;
  if(symbols.checked) hassymbol=true;
  if(number.checked) hasnum=true;
  if(upper && lower&& hasnum&& hasnum){
    setindicator("#0f0");
  }
  else if((upper || lower )&&(lower||hassymbol)&&(lower||hasnum)){
    setindicator("#f80");
  }
  else{
    setindicator("#f00")
  }
}
let copy=document.querySelector("[data-copyMessage]");
 async function copycontent(){
   try{
    await navigator.clipboard.writeText(passwordfield.value);
      copy.innerText="Copied";
   }catch(e){
     copy.innerText="failed";
   }
   copy.classList.add("active")
   setTimeout(() => {
     copy.classList.remove("active");
   }, 2000);
}
let copybtn=document.querySelector("[copy-butt]");
copybtn.addEventListener('click',()=>{
  if(passwordlenght > 0){
  copycontent();
  }
})
slider.addEventListener('change',(e)=>{
  passwordlenght=e.target.value;
  handelsider();
})
let allcheckbox=document.querySelectorAll("input[type=checkbox]")
function handlecheckboxchange(){
  checkcount=0;
  allcheckbox.forEach((e)=>{
   if(e.checked){
    checkcount++;
   }
  });
  
  
  if(passwordlenght<checkcount){
    passwordlenght=checkcount;
    handelsider();
  }
}

allcheckbox.forEach(e => {
  e.addEventListener('change',handlecheckboxchange);
});

function shufflepass(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
  }
  let str="";
  array.forEach((e)=>{
   str=str+e;
   
  })
  return str;
}

let genrate=document.querySelector(".generatepassward");



genrate.addEventListener('click',()=>{
  
  
 if(checkcount==0){
  return;
}
 
  if(passwordlenght<checkcount){
    passwordlenght=checkcount;
    handelsider();
  }
 
  
  // if(uppercase.checked){
  //   passward=passward+generateupper();
  // }

console.log("addition done")
  // create function array
   password="";
   let funarr=[];
   if(uppercase.checked){
    funarr.push(generateupper);
   }
   if(lowercase.checked){
    funarr.push(generatrlower);
   }
   if(number.checked){
    funarr.push(generatenum);
   }
   if(symbols.checked){
    funarr.push(getsymbols);
   }

 for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();
  
 }
 
 //remain
 for(let i=0;i<passwordlenght-funarr.length;i++){
  let ranindex=getaRandomNumber(0,funarr.length);
  password+=funarr[ranindex]();
 }
//convert string into pass
 password=shufflepass(Array.from(password));
 //show
 passwordfield.value=password;
 getstrenght();


});
