const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账号已被占用,请从新选择一个用户名";
  }
});

const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const loginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
    // if (!val) {
    //   return "请填写确认密码";
    // }
    if (val !== loginPwdValidator.input.value) {
      return "两次密码不正确";
    }
  }
);

const form = $(".user-form");

form.onsubmit = async (e) => {
  e.preventDefault();
  const reslut = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator
  );
  if (!reslut) {
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert("注册成功");
    location.href = "./login.html";
  }
};
