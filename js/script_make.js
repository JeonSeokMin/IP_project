document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
  
    const title = document.getElementById('title').value;
    const productName = document.getElementById('productName').value;
    const content = document.getElementById('content').value;
  
    const postData = {
      title: title,
      content: content,
      productName: productName
    };
  
    axios.post('https://3.36.250.80:3000/api/boards', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      // 성공 시 사용자가 볼 수 있도록 메시지를 표시하거나 다른 동작을 수행합니다.
    })
    .catch(error => {
      console.error('Error:', error);
      // 실패 시 사용자가 볼 수 있도록 에러 메시지를 표시합니다.
    });
  });
  