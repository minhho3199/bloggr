export function saveLoginData(data) {
	localStorage.setItem("userinfo", JSON.stringify(data));
}

export function getLoginData(){
  if ("userinfo" in localStorage) {
    return JSON.parse(localStorage.getItem("userinfo"));
  }
  return {};
}

