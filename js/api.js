// 2022/12/11

var API = (() => {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  //GET 请求
  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  // post 请求
  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  // 注册账号 post
  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  // 登录账号 post
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const reslut = await resp.json();
    if (reslut.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return reslut;
  }

  // 验证账号 get
  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  // 当前用户登录的信息 get
  async function profile() {
    const resp = await get("/api/user/profile");
    return resp.json();
  }

  // 发送聊天消息 post
  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  // 获取聊天消息 get
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  // 推出登录
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
