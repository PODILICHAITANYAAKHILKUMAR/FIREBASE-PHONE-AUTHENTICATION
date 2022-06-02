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
var items=[];
var countryCode,phoneNumber;
    
document.getElementById('sign-in-button2').addEventListener('click', submit2);
document.getElementById('confirm-code2').addEventListener('click', verify2);

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container2',{
    'size':'invisible',
    'callback':response=>{
        console.log('Response :'+response);
    },
    'expired-callback':response=>{
        console.log(response);
        alert('Verify the Recaptcha Again!');
    }
});
function submit2(e){
    e.preventDefault();
    countryCode=document.getElementById('countryCode2').value;
    phoneNumber = document.getElementById('phoneNumber2').value;
    document.getElementById('otp2').style.display = 'block';
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(countryCode+phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert('OTP Sent to '+countryCode+phoneNumber);
        }).catch((error) => {
            alert('Error '+ error.message);
        });
}


function verify2(e){
    e.preventDefault();
    let code1 = document.getElementById('code2').value;
    confirmationResult.confirm(code1).then((result) => {
        setItems();
        
    }).catch((error) => {
        alert('Error2 :'+error.message)
    });
}


function setItems(){
    let isNewUser=true;
        db.collection('numbers').onSnapshot((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            items.push({
                id:doc.id,
                ...doc.data()
            });
        })
            for(let i=0;i<items.length;i++){
                if(items[i].Phone==(countryCode+phoneNumber)){
                    isNewUser=false;
                    console.log('Matches :'+items[i].Phone,(countryCode+phoneNumber));
                    break;
                }
            }
            setTimeout(()=>{
            if(!isNewUser){
                location.href='index.html';
            }
            else{
                alert('Account Created Successfully');
                code='';
                db.collection('numbers').add({
                    Phone:(countryCode+phoneNumber)
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                console.error("Error adding document: ", error);
                });
            }
            },1500)
        })
    
    
}