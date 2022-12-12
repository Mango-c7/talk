// 用户登录和注册的表单项验证通用代码

class FieldValidator {
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  static async validate(...validates) {
    const proms = validates.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
