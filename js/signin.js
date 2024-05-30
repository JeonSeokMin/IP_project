document.addEventListener("DOMContentLoaded", () => {
    const formEl = document.querySelector("#loginForm");
    const idEl = document.querySelector("#idInput");
    const passwordEl = document.querySelector("#passwordInput");
    const loginButton = document.querySelector("#loginButton");
  
    const loginFetcher = async (userId, password) => {
    const payload = {
      userId,
      password,
    };

    try {
      const response = await axios.post("http://3.36.250.80:3000/api/auth/login", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
  
    }
  };
  
    const validateInputs = () => {
      let isValid = true;
      
      if (!idEl.value.trim()) {
        idEl.classList.add("error");
        isValid = false;
      } else {
        idEl.classList.remove("error");
      }
    
      if (!passwordEl.value.trim()) {
        passwordEl.classList.add("error");
        isValid = false;
      } else {
        passwordEl.classList.remove("error");
      }
    
      return isValid;
    };
  
    const moveButton = () => {
        const formRect = formEl.getBoundingClientRect();
        const buttonRect = loginButton.getBoundingClientRect();
    
        const maxLeft = formRect.width - buttonRect.width;
        const maxTop = formRect.height - buttonRect.height;
    
        const newLeft = Math.random() * maxLeft;
        const newTop = Math.random() * maxTop;
    
        loginButton.style.position = "absolute";
        loginButton.style.left = `${newLeft}px`;
        loginButton.style.top = `${newTop}px`;
      };
    
  
    loginButton.addEventListener("mouseenter", () => {
      if (!validateInputs()) {
        moveButton();
      }
    });
  
    const init = () => {  
      formEl.addEventListener("submit", async (e) => {
        e.preventDefault();  
        const data =  await loginFetcher(idEl.value, passwordEl.value);
        if (data) {
          alert("로그인 성공!");
          console.log(data);
          // location.href = "./main.html";
        } else {
          alert("로그인 실패");
          idEl.value = "";
          passwordEl.value = "";
        }
      });
    };
  
    init();
  });
  