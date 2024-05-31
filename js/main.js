const readBoards=async ()=>{
  try {
    const response = await axios.get("http://3.36.250.80:3000/api/boards", {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);

  }
}

const logout=async ()=>{
  try {
    const response = await axios.post("http://3.36.250.80:3000/api/auth/logout", {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);

  }
}





const init = async() => {
  const res =await readBoards();
  console.log(res)


  const displayBoard = (data) => {
    const boardContainer = document.getElementById('boardContainer');
  
    data.forEach(board => {
      const boardItem = document.createElement('tr');
      boardItem.className = 'board-item';
      boardItem.addEventListener('click', () => {
        window.location.href = `/board.html?contentId=${board.id}`;
      });
  
      const title = document.createElement('td');
      title.textContent = board.title;
      boardItem.appendChild(title);
  
      const content = document.createElement('td');
      content.textContent = board.content;
      boardItem.appendChild(content);
  
      const writerName = document.createElement('td');
      writerName.textContent = board.writerName;
      boardItem.appendChild(writerName);
  
      const productName = document.createElement('td');
      productName.textContent = board.productName
      boardItem.appendChild(productName);

      const tr = document.createElement('tr');
  
      boardContainer.appendChild(boardItem);
    });
  };
  
  displayBoard(res)
  
  const writeButton = document.getElementById('write-button');
  writeButton.addEventListener('click', () => {
    window.location.href = '/post.html';
  });

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener('click',()=>{
    logout()
  })

};



document.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", displayBoard(data));
