const form = document.getElementById("register-form");
const usn = document.getElementById("usn");
const email = document.getElementById("email");
const name = document.getElementById("name");
const usn = document.getElementById("usn");

let config = {
  apiKey: "AIzaSyC-emvUYmB4BRnrqv8odgvZHJtvWA_DELg",
  authDomain: "ingenius2k19-ff6bf.firebaseapp.com",
  projectId: "ingenius2k19-ff6bf",
  databaseURL: "https://ingenius2k19-ff6bf.firebaseio.com"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
this.database = firebase.database();

form.addEventListener("submit", e => {
  e.preventDefault();
  let userRef = this.database.ref("users/" + userId);
  userRef.child("mike").set({
    firstName: value.firstName,
    lastName: value.lastName,
    gender: value.gender.toLowerCase(),
    dateOfBirth: moment(value.dateOfBirth)
      .toDate()
      .getTime()
  });
});
