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
    axios.post('http://3.36.250.80:3000/api/boards', postData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      alert('게시물이 성공적으로 업로드되었습니다.');
      // 성공 시 사용자가 볼 수 있도록 메시지를 표시한 후 페이지를 이동합니다.
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('게시물 업로드에 실패했습니다. 다시 시도해 주세요.');
      // 실패 시 에러 메시지를 표시합니다.
    });
  });
  