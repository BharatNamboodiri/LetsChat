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

  room_name = localStorage.getItem("room_name");
  user_name = localStorage.getItem("user_name");

  function send()
  {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });
    document.getElementById("msg").value = "";
  }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
Name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

name_with_tag = "<h4 style='color:white;'> "+ Name +"<h4>";

message_with_tag = "<h4 class='message_h4'>" + message +"</h4>";
like_button ="<button class = 'btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'> Likes :"+ like +"</button>";

row = name_with_tag + message_with_tag +like_button;
document.getElementById("output").innerHTML += row;
} });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes
    });
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}



