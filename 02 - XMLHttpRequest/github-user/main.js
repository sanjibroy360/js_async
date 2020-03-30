// Your code goes here
let input = document.querySelector('.input');
let submit = document.querySelector('.submit_btn');
let cardWrapper = document.querySelector('.card');
let url = 'https://api.github.com/users/';
let username = '';
let userDetail = {};

function handleInput(event) {
    event.preventDefault();

    if(input.value.trim()) {
        username = input.value;
        fetchInfo(username,url);
        input.value = '';
        username = '';
    }
}

function fetchInfo(username,url) {
    url += username; 
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    
    xhr.onload = function() {
        if(xhr.status == 200) {
            userDetail = JSON.parse(xhr.response);
            createUI(userDetail);
        }
    }

    // xhr.onerror()
    xhr.send();
}

function createUI(user) {
   
    let code = `<div class="user_icon">
                    <img src="${user.avatar_url}" alt="">
                </div>

                <div class="user_info">
                    <p>Name : ${user.name || user.login}</p>
                    <p>Id : ${user.id}</p>
                    <p>Bio : ${user.bio|| ''}</p> 
                </div>`;
    
    cardWrapper.innerHTML = code;

}
submit.addEventListener('click',handleInput);