const ENV_VARIABLES = process.env;

export function getStagingEnvironments() {
  let environments = [];
  for (let item in ENV_VARIABLES) {
    if (/OBSERVE_SERVER_/.test(item)) {
      let [name, url] = ENV_VARIABLES[item].split(',');
      environments.push({ name, url });
    }
  }
  return environments;
}
