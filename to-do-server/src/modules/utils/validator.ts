export class Validator {
  static isEmpty(value) {
    return (!value || value.length === 0);
  }

  static isEmail(value) {
    const emailPattern = /^(?=.{5,254}$)(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{0,63}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailPattern.test(value);
  }

  static isPassword(value) {
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()\-_=+|{};:?.,~`]+$/u;
    return passwordPattern.test(value);
  }

  static minLength(value, name, min = 0) {
    return value?.length >= min;
  }

  static maxLength(value, name, max = Infinity) {
    return value?.length <= max;
  }

  static validate(obj) {
    if (obj?.isRequired && this.isEmpty(obj.value)) {
      return `The ${obj.name} field is required.`;
    }
    if (obj?.isEmail && !this.isEmail(obj.value)) {
      return `Invalid email!`;
    }
    if (obj?.minLength && !this.minLength(obj.value, obj.name, obj.minLength)) {
      return `The ${obj.name} must be at least ${obj.minLength} characters.`;
    }
    if (obj?.maxLength && !this.maxLength(obj.value, obj.name, obj.maxLength)) {
      return `The ${obj.name} must not be greater than ${obj.maxLength} characters.`;
    }
    if (!obj.name) {
      throw new Error('Validation error: Input name is required.');
    }
    return null;
  }
}
