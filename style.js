const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber");
const passwordDisplay=document.querySelector("[data-passwordDisplay");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols= '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();


// set strength circle color to grey
setIndicator("#ccc");

// set password length
function handleSlider(){
        inputSlider.value=passwordLength;
        lengthDisplay.innerText=passwordLength;
        const min=inputSlider.min;
        const max=inputSlider.max;
        // inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function  getRanInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
    // min=1,max=9 max-min=8 range(0-8)
    // math.random ek random number generate krega(0-1) k bich me usne generat kiya 0.5
    // 0.5*8=4 prr ye number float bhi aa skhta jomeko nhii chahiye issliye math flooor krenge
    // meko ragne chhaiye min to max to aab 0+min =1 or (max-min)+min=9 ho gya (1-9);

}

function generateRandomNumber(){
    return getRanInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRanInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRanInteger(65,91));
}
function  generateSymbol(){
    const randNum = getRanInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
 
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    let strengthText="";
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {

      setIndicator("#0f0");
       strengthText.innerText = "Hard";
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
      strengthText.innerText="middle"
    } else {
      setIndicator("#f00");
      strengthText.innerText="Easy";
    }
    strengthText.classList.add("active");

}


 async function copyContent(){
    // await mtlv jab function fullfillno ho tb tk aage na bdhe  or await tbhi kaam krtA H TB ASYNC fun me hum 
    // usko likhte h
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
     copyMsg.innerText="copied";    
}
   //navigator.clipborad.writeText iss mehtod k throught me clipboard pe copy krr skhta hu

    catch(e){
        copyMsg.innerText='Failed';
         
    
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
 }
 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


 function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
 }
 allCheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
    // jb bhi kuch chnange hoge handleCheckBoxChange fun call ho jayega
 })

 inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
 });

 copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
});
 generateBtn.addEventListener('click',()=>{
    // koi checkbox select nhiii h to
    if(checkCount===0){
        return;
    } 
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();}


        // lets start the journey tofind new password 
        console.log("Starting the journey");
        // remove old password
        password="";

        // // let  put the stiff mentioned by checkbox
        // if(uppercaseCheck.checked){
9        //     password=generateUpperCase();
        // }
        // if(lowercaseCheck.checked){
        //     password=generateLowerCase();
        // }
        // if(numbersCheck.checked){
        //     password=generateRandomNumber();
        // }
        // if(symbolsCheck.checked){
        //     password=generateSymbol();
        // }

        let funcArr=[];
        if(uppercaseCheck.checked)
            funcArr.push(generateUpperCase);
        if(lowercaseCheck.checked)
            funcArr.push(generateLowerCase);
        if(symbolsCheck.checked)
            funcArr.push(generateSymbol);
        if(numbersCheck.checked)
            funcArr.push(generateRandomNumber);

        // compulsary addition
        for(let i=0;i<funcArr.length;i++){
            password += funcArr[i]();
        }
       

        // remaining addition
        for(let i=0;i<passwordLength-funcArr.length;i++){
            let randIndex=getRanInteger(0,funcArr.length);
            password += funcArr[randIndex]();
        }
   

        //suffle password
        password=shufflePassword(Array.from(password));
       
        //show in Ui
        passwordDisplay.value=password;
        //calculate strength fun call
        calcStrength();
         });

