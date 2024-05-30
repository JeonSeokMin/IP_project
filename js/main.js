const readBoards=async ()=>{
  try {
    const response = await axios.get("http://3.36.250.80:3000/api/boards", {
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
  
  
  const data = {
    boards: [
      {
        id: 1,
        title: "게시글 제목 1",
        content: "게시글 내용 1",
        writerName: "작성자 1",
        productName: "상품명 1"
      },
      {
        id: 2,
        title: "게시글 제목 2",
        content: "게시글 내용 2",
        writerName: "작성자 2",
        productName: "상품명 2"
      },
    ]
  };


  const displayBoard = (data) => {
    const boardContainer = document.getElementById('boardContainer');
  
    data.boards.forEach(board => {
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
  
  displayBoard(data)
  
  const writeButton = document.getElementById('write-button');
  writeButton.addEventListener('click', () => {
    window.location.href = '/post.html';
  });

};



document.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", displayBoard(data));
