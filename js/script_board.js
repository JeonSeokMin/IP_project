const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParams = url.searchParams;
  
document.addEventListener("DOMContentLoaded", function() {
    const postId = urlParams.get('contentId');
    const baseURL = "http://3.36.250.80:3000";
    
    const titleContainer = document.getElementById("title-container");
    const productNameContainer = document.getElementById("productName-container");
    const postContainer = document.getElementById("post-container");
    const commentsContainer = document.getElementById("comments-container");
    const postButton = document.getElementById("post-button");
    const commentInput = document.querySelector(".text_input");
            
    // 포스트 데이터 가져오기
    axios.get(`${baseURL}/api/boards/${postId}`, { withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const data = response.data;
        displayPost(data);
        displayComments(data.comments);
    })
    .catch(error => console.error('포스트 데이터를 가져오는 중 에러 발생:', error));


    // 포스트 표시하기
    function displayPost(post) {
        const titleHTML = `<h1>${post.title}</h1>`;
        titleContainer.innerHTML = titleHTML;

        const productNameHTML = `<h2>분실물: ${post.productName}</h2>`;
        productNameContainer.innerHTML = productNameHTML;

        const postHTML = `
        <div class="message">
            <div class="person_info_container">
                <div class="avatar">&#128100;</div>
                <p>${post.writerName}</p>
            </div>
            <div class="message-content">
                ${post.content}
            </div>
        </div>
        <div class="message-options">
            ${post.isMine ? '<button id="postDeleteBtn">삭제</button>' : ''}
        </div>
        `;
        postContainer.innerHTML = postHTML;

        if (post.isMine) {
            const postDeleteBtn = document.getElementById("postDeleteBtn");
            // 게시물 삭제 버튼 클릭 시
            postDeleteBtn.addEventListener("click", function() {
                deletePost();
            });
        }
    }

    // 댓글 표시하기
    function displayComments(comments) {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
        const commentHTML = `
            <div class="message">
            <div class="person_info_container">
                <div class="avatar">&#128100;</div>
                <p>${comment.commentWriter}</p>
            </div>
            <div class="comment-content">
                ${comment.commentContent}
            </div>
            ${comment.isMyComment ? '<div class="message-options"><button class="commentsDeleteBtn">삭제</button></div>' : ''}
            </div>
            <hr />
        `;
        commentsContainer.innerHTML += commentHTML;

        if(comment.isMyComment){
            document.querySelectorAll(".commentsDeleteBtn").forEach(button => {
                button.addEventListener("click", function() {
                    deleteComment(comment.commentId);
                });
            });    
        }
        });

        
        
    }

    // 새로운 댓글 작성하기
    postButton.addEventListener("click", function() {
        const content = commentInput.value.trim();
        if (content) {
            axios.post(`${baseURL}/api/boards/${postId}/comments`, { content }, { withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(response => {
                commentInput.value = '';
                window.location.reload();
            })
            .catch(error => console.error('댓글을 작성하는 중 에러 발생:', error));
        }
    });

    function deletePost() {
        const confirmDelete = confirm("게시물을 삭제하시겠습니까?");
        if (confirmDelete) {
            axios.delete(`${baseURL}/api/boards/${postId}`, { withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("게시물이 성공적으로 삭제되었습니다.");
                alert("게시물이 성공적으로 삭제되었습니다.");
                // 게시물 삭제 후 필요한 작업을 여기에 추가하세요
                window.location.href = '/';
            })
            .catch(error => console.error('게시물을 삭제하는 중 에러 발생:', error));
        }
    }

    function deleteComment(commentId) {
        const confirmDelete = confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
            axios.delete(`${baseURL}/api/boards/${postId}/comments/${commentId}`, { withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("댓글이 성공적으로 삭제되었습니다.");
                alert("댓글이 성공적으로 삭제되었습니다.");
                // 댓글 삭제 후 필요한 작업을 여기에 추가하세요
                window.location.reload();
            })
            .catch(error => console.error('댓글을 삭제하는 중 에러 발생:', error));
        }
    }
});