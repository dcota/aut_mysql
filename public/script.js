function logout() {
  localStorage.removeItem("token", "");
  localStorage.removeItem("level", "");
  fetch("http://localhost:3000")
    .then((res) => {
      console.log(res);
      window.location.replace(res.url);
    })
    .catch((error) => console.log(error));
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let loginObj = {
    username: username,
    password: password,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginObj),
  };
  fetch("http://localhost:3000/login", options)
    .then((res) => {
      if(res.status===406){
        alert(res.json().msg)
        return
      }       
      let token = res.headers.get("Authorization");
      localStorage.setItem("token", token);
      return res.json();
    })
    .then((data) => {
      getPage(data)
    })
    .catch((error) => console.log(error));
}

function getPage(data){
        localStorage.setItem("level", data.level); 
        const obj = {
            level: localStorage.getItem('level')
        }
        let options = {
            method:"POST",
            headers: {
                'Content-type': "application/json",
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        };
        fetch("http://localhost:3000/page", options)
          .then((res) => {
            console.log(res);
            window.location.replace(res.url);
          })
          .catch((error) => console.log(error));
}
