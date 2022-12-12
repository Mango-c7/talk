const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
  //   const resp = await API.exists(val);
  //   if (resp.data) {
  //     return "该账号已被占用,请从新选择一个用户名";
  //   }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const form = $(".user-form");

form.onsubmit = async (e) => {
  e.preventDefault();
  const reslut = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!reslut) {
    reslut;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert("登录成功");
    location.href = "./index.html";
  } else {
    loginIdValidator.p.innerText = "账号或密码错误";
    loginPwdValidator.input.value = "";
  }
};
