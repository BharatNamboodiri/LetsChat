const firebaseConfig = {
  apiKey: "AIzaSyDy74y3XelUEpOS0nKZNbDoiV4I_S6dkdA",
  authDomain: "letschatweb-d5907.firebaseapp.com",
  databaseURL: "https://letschatweb-d5907-default-rtdb.firebaseio.com",
  projectId: "letschatweb-d5907",
  storageBucket: "letschatweb-d5907.appspot.com",
  messagingSenderId: "1069643562730",
  appId: "1:1069643562730:web:f506fc9eab239f01966193"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!" ; 

user_name   =   localStorage.getItem("user_name");

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
          purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "letschatpage.html";
}
function getData() {
  firebase.database().ref("/").on('value', function(snapshot) 
  { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
  { childKey = childSnapshot.key;
   Room_names = childKey;


   console.log("Room Name - " + Room_names);
   row = "<div class='room_name' id=" +Room_names + " onclick='redirectToRoomName(this.id)'> #"+ Room_names +"</div><hr>";       
   document.getElementById("output").innerHTML += row;


  });});}
getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "letschatpage.html";
}
function logout()
{
  localStorage.removeItem(user_name)
  localStorage.removeItem(room_name)
  window.location.replace("index.html");
}