
document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector("#signupForm");
  const idEl = document.querySelector("#signupId");
  const passwordEl = document.querySelector("#signupPassword");

  const checkResponse = (res) => {
    console.log(res);
  };

  const registerFetcher = async (userId, password) => {
    const payload = {
      userId,
      password,
    };

    try {
      const response = await axios.post("http://3.36.250.80:3000/api/auth/register", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      alert("회원가입 완료!")
      location.href = "./signin.html";
      return data;
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idValue = idEl.value;
    const passwordValue = passwordEl.value;

    const res = await registerFetcher(idValue, passwordValue);
    checkResponse(res);
  };

  formEl.addEventListener("submit", handleSubmit);
});