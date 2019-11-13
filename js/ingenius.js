// var xhttp = new XMLHttpRequest();
// xhttp.open("GET", "http://localhost:8080/teamcount", false);
// xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
// xhttp.setRequestHeader("Access-Control-Allow-Headers","*");
// xhttp.send();
// console.log(JSON.parse(xhttp.responseText));

// Your web app's Firebase configuration
var teamName;

var firebaseConfig = {
  apiKey: "AIzaSyC-emvUYmB4BRnrqv8odgvZHJtvWA_DELg",
  authDomain: "ingenius2k19-ff6bf.firebaseapp.com",
  databaseURL: "https://ingenius2k19-ff6bf.firebaseio.com",
  projectId: "ingenius2k19-ff6bf",
  storageBucket: "ingenius2k19-ff6bf.appspot.com",
  messagingSenderId: "1020101186370",
  appId: "1:1020101186370:web:c7f917c305d061596daedb",
  measurementId: "G-C0Z3VQ3VX7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addUserData(uid) {
  var database = firebase.database();
  var chapterlist = shuffle([0, 1, 2, 3, 4, 5]);
  var chapter1 = shuffle([0, 1, 2]);
  var chapter2 = shuffle([0, 1, 2]);
  var chapter3 = shuffle([0, 1, 2]);
  var chapter4 = shuffle([0, 1, 2]);
  var chapter5 = shuffle([0, 1, 2]);
  database.ref("/teams/" + uid).set({
    chapterlist: chapterlist,
    cluelist: [chapter1, chapter2, chapter3, chapter4, chapter5],
    chapter: 1,
    clue: 0
  });
}

function addUidTeamName(uid) {
  var database = firebase.database();

  database.ref("/uidteamname/" + uid).set({
    teamName: teamName
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    addUserData(user.uid);
    addUidTeamName(user.uid);
  } else {
    // User not logged in or has just logged out.
  }
});

async function registerUser() {
  var form = document.getElementById("register-form");
  var username = document.getElementById("username").value + "@ingenius.com";
  teamName = document.getElementById("team-name").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm-password").value;
  if (password === "" || confirm_password === "") {
    alert("Password fields cannot be empty");
  } else if (username === "") {
    alert("Username cannot be empty");
  } else if (password !== confirm_password) {
    alert("Passwords do not match");
  } else if (teamName === "") {
    alert("Team Name cannot be empty");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(val) {
        console.log("Done");
        firebase
          .auth()
          .signOut()
          .then(function() {
            console.log("Signed Out");
            // addUserData();
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR!!!!");
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

    console.log("All Done");
  }
}
