function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


  const getVerificationCode=()=>{
   
    return String(randomInteger(0, 9))+String(randomInteger(0, 9))+String(randomInteger(0, 9))+String(randomInteger(0, 9))+String(randomInteger(0, 9))+String(randomInteger(0, 9))
    
    
  }

  module.exports=getVerificationCode