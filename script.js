const firebaseConfig = {
  apiKey: "AIzaSyCWEIdhKclhvm0DsPSmAL23rccWaMcVvLM",
  authDomain: "fybuzz-c99c4.firebaseapp.com",
  projectId: "fybuzz-c99c4",
  storageBucket: "fybuzz-c99c4.appspot.com",
  messagingSenderId: "272493928581",
  appId: "1:272493928581:web:ca25fd616dba23c74d49ec",
  measurementId: "G-BCH79Z4FZY"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

var code;

document.getElementById('sign-in-button1').addEventListener('click', submit1);
document.getElementById('confirm-code1').addEventListener('click', verify1);
var items=[];
      
var countryCode;
var phoneNumber;
    
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1',{
    'size':'invisible',
    'callback':response=>{
      console.log('Response :'+response);
    },
    'expired-callback':response=>{
      console.log(response);
      alert('Verify the Recaptcha Again!');
    }
});
function submit1(e){
  e.preventDefault();
  countryCode=document.getElementById('countryCode1').value;
  phoneNumber = document.getElementById('phoneNumber1').value;
  document.getElementById('otp1').style.display = 'block';
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(countryCode+phoneNumber, appVerifier)
        .then((confirmationResult) => {
          code='';
          window.confirmationResult = confirmationResult;
          alert('OTP Sent to '+countryCode+phoneNumber);
        }).catch((error) => {
          alert('Error '+ error.message);
        });
}

function verify1(e){
    e.preventDefault();
    code = document.getElementById('code1').value;
    confirmationResult.confirm(code).then((result) => { 
      let isNewUser=true;
      db.collection('numbers').onSnapshot((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
          items.push({
              id:doc.id,
              ...doc.data()
          });
      })
        for(let i=0;i<items.length;i++){
          console.log(items[i].Phone,(countryCode+phoneNumber));
            if(items[i].Phone==(countryCode+phoneNumber)){
            isNewUser=false;
              console.log('Matches :'+items[i].Phone,(countryCode+phoneNumber));
            break;
          }
        }
        setTimeout(()=>{
          console.log('isNewUser2 : '+isNewUser);
          if(isNewUser){
            firebase.auth().currentUser.delete();
            location.href='signup.html';
        }
        else{
          alert('Welcome Back '+countryCode+phoneNumber)
          code='';
        }
        },1500)
    })
  }).catch((error) => {
    alert('Error2 : '+error.message)
    //alert('Invalid OTP');
  });
}



/*
function isNewUser(fullNumber){
  isNewUser=false;
  db.collection('numbers').onSnapshot((snapshot)=>{
  snapshot.docs.forEach((doc)=>{
      items.push({
          id:doc.id,
          ...doc.data()
      });
  })
  for(let i=0;i<items.length;i++){
    phones.push(items[i].Phone);
    console.log(i+' : '+phones[i]);
    console.log(fullNumber);
  }
  for(let i=0;i<phones.length;i++){
    if(phones[i]==fullNumber){
      isNewUser=true;
      break;
    }
  }
})

return isNewUser;
}*/