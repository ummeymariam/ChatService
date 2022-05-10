var socket;
$(document).ready(function () {

    socket = io.connect("http://localhost:3000");
    socket.on("connect", connectObject);
    socket.on("updatechat", processMessageObject);
    socket.on("updateusers", updateUserList);
    $("#sendBtn").click(sendBtnFunc);


});

function connectObject() {

    socket.emit("adduser", prompt("what is your name"));
}

function  processMessageObject (username, data) {

    console.log("username" + username + ">>>> data : " + data);
    $("#conversation").append("<br/>"+username + " : " + data);
}
function updateUserList(users) {
    $("#user").empty();
    $.each(users, function (key, value) {
        $("#user").append("<b>" + key + "</b> <br/>");
    });
   

    console.log("users" + users);


}

function sendBtnFunc() {

    var message = $("#data").val();
    $("#data").val('');
   
    socket.emit("sendchat", message);

}