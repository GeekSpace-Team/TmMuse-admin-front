export const logout = () => {
    localStorage.removeItem("TmMuseProfile");

  };
  
  export const isLogin = () => {
    if (localStorage.getItem("TmMuseProfile")) {
      var data = JSON.parse(localStorage.getItem("TmMuseProfile"));
      if (data.token) {
        console.log(true)
        return true;
      } else {
        console.log(true)
        localStorage.removeItem("TmMuseProfile");
      }
    }
    return false;
  };

  // {"id":1,
  // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9.5q0UgohNs_wIjB_xiORFhavphXzYfX3yaClnl7Yd2_4",
  // "type":"Admin"}