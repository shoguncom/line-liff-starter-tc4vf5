const bodyTag = document.getElementById('bodyTag');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnSend = document.getElementById('btnSend');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');
const pictureUrl = document.getElementById('pictureUrl');
const userId = document.getElementById('userId');
const statusMessage = document.getElementById('statusMessage');
const displayName = document.getElementById('displayName');
const email = document.getElementById('email');
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app
  await liff.init({ liffId: "1655965448-oG6bDY4y" })

  // Try a LIFF function
  switch (liff.getOS()) {
    case "android": bodyTag.style.backgroundColor = "#d1f5d3"; break
    case "ios": bodyTag.style.backgroundColor = "#eeeeee"; break
    case "web": bodyTag.style.backgroundColor = "#ff00ff"; break
  }
    
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnShare.style.display = "block"
      btnLogIn.style.display = "none"
      btnLogOut.style.display = "block"
      getUserProfile()
      getFriendship()
    } else {
      btnLogIn.style.display = "block"
      btnLogOut.style.display = "none"
    }
  } else {
    btnShare.style.display = "block"
    btnSend.style.display = "block"
    getUserProfile()
    getFriendship()
  }

  if (liff.isInClient() && liff.getOS() === "android") {
    btnScanCode.style.display = "block"
  }

  btnOpenWindow.style.display = "block"

}

async function getUserProfile() {
  const profile = await liff.getProfile()
  pictureUrl.src = profile.pictureUrl
  userId.innerHTML = "<b>userId:</b> " + profile.userId
  statusMessage.innerHTML = "<b>statusMessage:</b> " + profile.statusMessage
  displayName.innerHTML = "<b>displayName:</b> " + profile.displayName
  email.innerHTML = "<b>email:</b> " + liff.getDecodedIDToken().email
}

btnLogIn.onclick = () => {
  liff.login()
}

btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}

async function sendMsg() {
  if (liff.getContext().type !== "none" && liff.getContext().type !== "external") {
    await liff.sendMessages([
      {
        "type": "text",
        "text": "This message was sent by sendMessages()"
      }
    ])
    liff.closeWindow()
  }
}

btnSend.onclick = () => {
  sendMsg()
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: "image",
      originalContentUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg",
      previewImageUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg"
    }
  ])
}

btnShare.onclick = () => {
  shareMsg()
}

async function scanCode() {
  const result = await liff.scanCode()
  code.innerHTML = "<b>Code: </b>" + result.value
}

btnScanCode.onclick = () => {
  scanCode()
}

btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true
  })
}

async function getFriendship() {
  let msg = "Hooray! You and our chatbot are friend."
  const friend = await liff.getFriendship()
  if (!friend.friendFlag) {
     msg = "<a href=\"https://line.me/R/ti/p/@BOT-ID\">Follow our chatbot here!</a>"
  }
  friendShip.innerHTML = msg;
}