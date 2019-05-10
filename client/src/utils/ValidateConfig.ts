const keys = ['name', 'width', 'height'];

const ValidateConfig = (config: object) => {
  for (let i = 0; i < keys.length; i++) {
    if (!config.hasOwnProperty(keys[i])) {
      return false;
    }
  }
  return true;
}

export default ValidateConfig;
