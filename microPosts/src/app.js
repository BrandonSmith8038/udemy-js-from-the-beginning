import { http } from './http';
import { ui } from './ui';

//Get Post On DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen For Submit Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen For Delete
document.querySelector('#posts').addEventListener('click', deletePost);

//List for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Submit Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = { title, body };
  //Validate input for empty fields
  if (title === '' || body === '') {
    ui.showAlert('Please Fill In All Fields', 'alert alert-danger');
  } else {
    //Check for id
    if (id === '') {
      //Create Post
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post Added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      //update post
      //Create Post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post Updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
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

//Enable Edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    //Fill Form With Current Post
    ui.fillForm(data);
  }

  e.preventDefault();
}
//Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}
