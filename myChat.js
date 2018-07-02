function movetoChatPage(){
  var myname = document.getElementById("mynameInput").value;
  var yourname = document.getElementById("yournameInput").value;
  var roomname = document.getElementById("roomnameInput").value;
  var FullRoomName = myname + yourname + roomname;
  var roomsRef = databaseRef.child('rooms/' + FullRoomName);

  if (myname!="" && yourname!="" && roomname!=""){
    //OKならChatページにジャンプさせる
    location.href = "#sub";
  } else {
    alert("名前と宛先とルーム名を入力してください。");
  }
  // set
  roomsRef.set({
    user1: myname,
    user2: yourname,
    roomname: roomname
  });
}

function movetoTopPage(){
  location.href = "#top";
}

var username = document.getElementById("mynameInput").value;
var yourname = document.getElementById("yournameInput").value;
var roomname = document.getElementById("roomnameInput").value;
// データベースと接続する
var messagesRef = new Firebase('https://chatpractic.firebaseio.com/rooms/messages');

var messageField = $('#messageInput');
var messageList = $('#messages');

// ENTERキーを押した時に発動する
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    //フォームに入力された情報
    var myname = document.getElementById("mynameInput").value;
    var yourname = document.getElementById("yournameInput").value;
    var roomname = document.getElementById("roomnameInput").value;
    var FullRoomName = myname + yourname + roomname;
    var message = messageField.val();

    //データベースに保存する
    messagesRef.push({name:myname, Destination:yourname, text:message, roomname:roomname, FullRoomName:FullRoomName});
    messageField.val('');

    $('#scroller').scrollTop($('#messages').height());
  }
});

// データベースにデータが追加されたときに発動する
messagesRef.limitToLast(10).on('child_added', function (snapshot) {
  //取得したデータ
  var roomname = document.getElementById("roomnameInput").value;
  var myname = document.getElementById("mynameInput").value;
  var yourname = document.getElementById("yournameInput").value;
  var FullRoomName1 = myname + yourname + roomname;
  var FullRoomName2 = yourname + myname + roomname;
  // alert('messagesRef=' + messagesRef);
  var data = snapshot.val();
  // var username = data.name || "anonymous";
  var username = data.name;
  var message = data.text;

  //取得したデータの名前が自分の名前なら右側に吹き出しを出す
  if ( (data.FullRoomName == FullRoomName1) || (data.FullRoomName == FullRoomName2) ) {
    if ( username == myname ) {
      var messageElement = $("<il><p class='sender_name me'>" + username + "</p><p class='right_balloon'>" + message + "</p><p class='clear_balloon'></p></il>");
    } else {
      var messageElement = $("<il><p class='sender_name'>" + username + "</p><p class='left_balloon'>" + message + "</p><p class='clear_balloon'></p></il>");
    }
  }

  //HTMLに取得したデータを追加する
  messageList.append(messageElement)

  //一番下にスクロールする
  messageList[0].scrollTop = messageList[0].scrollHeight;
});
