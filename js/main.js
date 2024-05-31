const readBoards = async () => {
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
};

const logout = async () => {
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
};

const displayBoard = (data) => {
  const boardContainer = document.getElementById('boardContainer');
  boardContainer.innerHTML = ''; // 기존 내용을 비웁니다.

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


    const productName = document.createElement('td');
    productName.textContent = board.productName;
    boardItem.appendChild(productName);

    const writerName = document.createElement('td');
    writerName.textContent = board.writerName;
    boardItem.appendChild(writerName);

    boardContainer.appendChild(boardItem);
  });
};

const init = async () => {
  let boards = await readBoards();
  console.log(boards);

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  

  const filterBoards = () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
      displayBoard(boards); // 검색어가 비어 있으면 전체 게시판 데이터를 표시합니다.
    } else {
      const filteredBoards = boards.filter(board => 
        board.title.toLowerCase().includes(searchTerm) ||
        board.content.toLowerCase().includes(searchTerm) ||
        board.writerName.toLowerCase().includes(searchTerm) ||
        board.productName.toLowerCase().includes(searchTerm)
      );
      displayBoard(filteredBoards);
    }
  };

  searchButton.addEventListener('click', filterBoards);
  searchInput.addEventListener('submit', filterBoards); // 검색어 입력란에서 입력이 변경될 때마다 필터링합니다.

  displayBoard(boards);

  const writeButton = document.getElementById('write-button');
  writeButton.addEventListener('click', () => {
    window.location.href = '/post.html';
  });

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener('click', () => {
    logout();
  });
};

document.addEventListener("DOMContentLoaded", init);
