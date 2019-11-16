// var xhttp = new XMLHttpRequest();
// xhttp.open("GET", "http://localhost:8080/teamcount", false);
// xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
// xhttp.setRequestHeader("Access-Control-Allow-Headers","*");
// xhttp.send();
// console.log(JSON.parse(xhttp.responseText));

// Your web app's Firebase configuration
var teamName = "";
var allUsrs = {};
var ifTeamnameExist = false;
const form = document.getElementById("register-form");

form.addEventListener("submit", e => {
  e.preventDefault();
  registerUser();
});

// var firebaseConfig = {
//   apiKey: "AIzaSyC-emvUYmB4BRnrqv8odgvZHJtvWA_DELg",
//   authDomain: "ingenius2k19-ff6bf.firebaseapp.com",
//   databaseURL: "https://ingenius2k19-ff6bf.firebaseio.com",
//   projectId: "ingenius2k19-ff6bf",
//   storageBucket: "ingenius2k19-ff6bf.appspot.com",
//   messagingSenderId: "1020101186370",
//   appId: "1:1020101186370:web:c7f917c305d061596daedb",
//   measurementId: "G-C0Z3VQ3VX7"
// };

//Nw Confi
var firebaseConfig = {
  apiKey: "AIzaSyD0Kh6ym4zvwiQENhKznvyNYVfYnNJi2tw",
  authDomain: "arapp-9ebdf.firebaseapp.com",
  databaseURL: "https://arapp-9ebdf.firebaseio.com",
  projectId: "arapp-9ebdf",
  storageBucket: "arapp-9ebdf.appspot.com",
  messagingSenderId: "901355357527",
  appId: "1:901355357527:web:d229d72e2d7160a1b76a12",
  measurementId: "G-G1NLVL8TG2"
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
  var chapterlist = shuffle([0, 1, 2, 3, 4]);
  chapterlist.push(5);
  var chapter0 = shuffle([0]);
  var chapter1 = shuffle([0]);
  var chapter2 = shuffle([0]);
  var chapter3 = shuffle([0]);
  var chapter4 = shuffle([0]);
  database.ref("/teams/" + uid).set({
    chapterlist: chapterlist,
    cluelist: {
      c0: chapter0,
      c1: chapter1,
      c2: chapter2,
      c3: chapter3,
      c4: chapter4
    },
    chapter: -1,
    clue: 0
  });
}

function addUidTeamName(uid) {
  var database = firebase.database();
  console.log(teamName);
  database
    .ref("/uidteamname/" + uid)
    .set({
      teamName: teamName
    })
    .then(() => {
      alert("User details successfully added!!");
    });
}

// function checkTeamname(teamName) {
//   var database = firebase.database();
//   // console.log(teamName);
//   database
//     .ref("/uidteamname/")
//     .once("value")
//     .then(snapshot => {
//       // console.log(snapshot.val());
//       // Object.keys(snapshot.val()).forEach(value => {
//       //   // console.log(value);
//       //   checkifThere(value, teamName);
//       // });
//       console.log(JSON.stringify(snapshot.val()));
//       // allUsrs = JSON.stringify(snapshot.val());
//     });

//   // console.log(allUsrs);
// }

// function checkifThere(ui, teamName) {
//   // console.log(teamName);
//   var database = firebase.database();
//   database
//     .ref("/uidteamname/" + ui + "/teamName")
//     .once("value")
//     .then(snapshot => {
//       // console.log(snapshot.val());
//       if (teamName === snapshot.val()) {
//         ifTeamnameExist = true;
//       }
//       // Object.keys(snapshot.val()).forEach(value => {
//       //   // console.log(value);
//       //   checkifThere(value);
//       // });
//       // console.log(JSON.stringify(snapshot.val()));
//     });
// }

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
  var username = document.getElementById("username").value;
  teamName = document.getElementById("team-name").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm-password").value;
  if (username === "") {
    alert("Username cannot be empty");
  } else if (teamName === "") {
    alert("Team Name cannot be empty");
  } else if (password === "" || confirm_password === "") {
    alert("Password fields cannot be empty");
  } else if (password !== confirm_password) {
    alert("Passwords do not match");
  } else {
    // checkTeamname(teamName);
    // if (ifTeamnameExist === true) {
    //   alert("Username alredy exists");
    // } else {
    username += "@ingenius.com";
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(function(val) {
        console.log("Done");
        firebase
          .auth()
          .signOut()
          .then(function() {
            console.log("Signed Out");
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
  }

  console.log("All Done");
}
