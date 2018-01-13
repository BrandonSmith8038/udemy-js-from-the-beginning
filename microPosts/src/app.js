import { http } from './http';
import { ui } from './ui';

//Get Post On DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen For Submit Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen For Delete
document.querySelector('#posts').addEventListener('click', deletePost);

//List for edit state
document.querySelector('#posts').addEventListener('click', editPosts);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  };

  //Create Post
  http
    .post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    console.log(e.target.parentElement.dataset);
    const id = e.target.parentElement.dataset.id;
    console.log(id);
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(message => {
        ui.showAlert(message, 'alert alert-danger');
        getPosts();
      })
      .catch(err => console.log(err));
  }
}
function editPosts(e) {}
