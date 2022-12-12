(async () => {
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert("登录已过期,请重新登录");
    location.href = "./login.html";
    return;
  }

  // 所有的dom对象
  doms = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    container: $(".chat-container"),
    colse: $(".close"),
    txtMsg: $("#txtMsg"),
    msgContainer: $(".msg-container"),
  };

  // 设置用户信息
  setUserInfo();
  function setUserInfo() {
    doms.aside.nickname.innerText = resp.data.nickname;
    doms.aside.loginId.innerText = resp.data.loginId;
  }

  // 加载历史记录
  lodingHistory();
  async function lodingHistory() {
    const resp = await API.getHistory();
    for (const msg of resp.data) {
      //   console.log(msg);
      addMsg(msg);
    }

    scrollBottom();
  }

  function addMsg(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }
    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

    const container = $$$("div");
    container.className = "chat-content";
    container.innerText = chatInfo.content;

    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(container);
    div.appendChild(date);

    doms.container.appendChild(div);
  }

  //让滚动跳到底
  function scrollBottom() {
    doms.container.scrollTop = doms.container.scrollHeight;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  //   发送消息
  doms.msgContainer.onsubmit = (e) => {
    e.preventDefault();
    sendMsg();
  };

  async function sendMsg() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    addMsg({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.txtMsg.value = "";
    scrollBottom();
    const resp = await API.sendChat(content);
    addMsg({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollBottom();
  }
  //   退出登录
  doms.colse.onclick = () => {
    API.loginOut(); // 退出登录
    location.href = "./login.html"; // 跳转到登录页
  };
})();
