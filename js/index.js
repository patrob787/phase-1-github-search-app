let form = document.querySelector('#github-form');
let ulUser = document.getElementById('user-list');
let ulRepo = document.getElementById('repos-list');
let userArray = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let search = document.getElementById('search');
    let userName = e.target.search.value
    
    fetch(`https://api.github.com/search/users?q=${userName}`)
    .then(resp => resp.json())
    .then(data => {
        userArray = data.items
        handleUsers(userArray)
    })

    e.target.search.value = ""
});

function handleUsers(users) {
    ulUser.innerHTML = "";
    users.forEach((user) => {
        let li = document.createElement('li');
       
        li.textContent = `User Name: ${user.login}, Avatar: ${user.avatar_url}, Profile: ${user.html_url}`;

        li.addEventListener('click', (e) => {

            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(resp => resp.json())
            .then(data => handleRepos(data))
        })

        ulUser.appendChild(li);
    })
}

function handleRepos(repoArray){
    repoArray.forEach((repo) => {
        let li = document.createElement('li');
        li.textContent = repo.name;
        ulRepo.appendChild(li);
    })
};