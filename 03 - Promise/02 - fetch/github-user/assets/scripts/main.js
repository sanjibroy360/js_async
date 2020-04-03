// Your code goes here
let repoContainer = document.querySelector('.repo_card');
let followersContainer = document.querySelector('.follower_container');
let searchBtn = document.querySelector('.search_btn');
let input = document.querySelector('.input');
let userInfo = document.querySelector('.personal_details');


let accDetails = document.querySelector('.repo_follower_wrapper');

let allData = {};

function handleInput(event) {
    
    let url = 'https://api.github.com/users/';
    
    event.preventDefault();
    if(input.value.trim()) {
        
        document.querySelector('.follower_container').innerHTML = '';
        userInfo.innerHTML = '';
        document.querySelectorAll('.acc_heading').forEach(el => el.style.visibility = 'hidden');
        document.querySelector('.repo_card').innerHTML = '';

        let name = '';
        let follower = [];
        let location = '';
        let link = '';
        let company = '';
        let username = input.value.trim();
        let repos = [];
        let repo_num = 0;
        let following = 0;
        url += username ;
        
        input.value = '';

        let fetchData = fetch(url).then(res => res.json()).catch(error => alert("User Not Found!"));
        
        fetchData.then(data => {
            
            if(!data.login) {
                alert('User Not Found!');
                
            }
            
            name = data.name;
            location = data.location;
            link = data.blog;
            company = data.company;
            repo_num = data.public_repos;
            userImage = data;

            
            
            collectData({
                username : data.login, 
                name : data.name, 
                userImage : data.avatar_url, 
                bio : data.bio, 
                location: data.location, 
                link: data.blog, 
                noOfRepo : data.public_repos, 
                company: data.company,
                noOffollowers : data.followers,
                following : data.following
            });

            
            

            fetch(data.followers_url)
            .then(res => res.json())
            .then(followerData => {
                return followerData.map(el => follower.push({follower_name : el.login, follower_image : el.avatar_url}));
                
            }).then(el => collectData({followers : follower}));

            
            fetch(data.repos_url) 
            .then(res => res.json())
            .then(res => res)
            .then(repo => repo.forEach(eachRepo => {
                    
                    return repos.push({
                    repo_name : eachRepo.name, 
                    create_date : eachRepo.created_at, 
                    update_date : eachRepo.updated_at, 
                    fork : eachRepo.fork,
                    stars : eachRepo.stargazers_count,
                    forks : eachRepo.forks_count
                })
            })).then(obj => collectData({repos : repos}));
            
        }).then(x => createUI(allData));
        
        
    }
    

}

function collectData(obj) {
    
    for(let key in obj) {
        allData[key] = obj[key];
    }
   
    if(allData.repos && !document.querySelector('.repo_card').innerHTML.trim()) {

        let repo = allData.repos.sort((a, b) => Date.parse(b.create_date) - Date.parse(a.create_date));
        
       
        
        let repoCard = document.querySelector('.repo_card');
        

       
        for(let i = 0; i < 5; i++) {
               
                let repoLi = document.createElement('li');
                repoLi.classList.add('card');
                
                
                repoLi.innerHTML = `<p class="repo_name highlight">
                                        ${repo[i].repo_name}<span class="fork">${repo[i].fork ? '(fork)': ''}</span>
                                        </p>

                                        <p class="repo_desc">

                                        </p>
                                        <div class="repo_info">

                                            <ul class="repo_star_fork">

                                                <li class="stars">
                                                <i class="fas fa-star"></i>
                                                <span class="icon_text">${repo[i].stars}</span>
                                                </li>

                                                <li class="repo_fork">
                                                <i class="fas fa-code-branch"></i>
                                                <span class="icon_text">${repo[i].forks}</span>
                                                </li>

                                            </ul>

                                            <p class="history">
                                                last push ${Math.floor((Number(Date.now()) - Number(Date.parse(repo[i].update_date)))/(1000 * 60 * 60 * 24))} days ago
                                            </p>
                                        </div>`;
            repoCard.append(repoLi);
            

        }
        allData.repos = '';
    }
    // let followeSec = 
    
    if(obj.followers && !document.querySelector('.follower_container').innerHTML) {

        let ul = document.querySelector('.follower_container');
        let follower = obj.followers;
        
        document.querySelectorAll('.acc_heading').forEach(el => el.style.visibility = 'visible');
            
        

        
        for(let i = 0; i < 5; i++) {

            if(!allData.followers[i]) {
                break;
            }

            let followerLi = document.createElement('li');
            followerLi.className = 'followers_card';
            
            followerLi.innerHTML = `<div>
                                        <img src="${follower[i].follower_image}" alt="Follower's Image" class="follower_image">
                                    </div>

                                    <p class="follower_name">
                                        ${follower[i].follower_name}
                                    </p>`;

            ul.append(followerLi);
            
        }
       
        
    }
    
    


}

function createUI(user = {}) {
    
    
    
        

    if(user.username) {
        userInfo.innerHTML =  `<div class="dp">
                                <!-- Profile Picture -->
                                <img src="${user.userImage}" alt="Profile Picture" class="profile_pic">
                                </div>

                                <div class="info">
                                    <!-- User Info -->

                                    <h3 class="name">${user.name || ''}<span class="username highlight">${user.username}</span></h3>

                                    <p class="bio">${user.bio || ''}</p>

                                    <p class="working">
                                    <i class="fas fa-user-friends"></i> 
                                    <span class="icon_text">${user.company}</span>
                                    </p>

                                    <p class="location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span class="icon_text">${user.location}</span>
                                    </p>

                                    <p class="link highlight">
                                    <i class="fas fa-link"></i>
                                    <span class="icon_text">${user.link}</span>
                                    </p>
                                

                                    <div class="follow">
                                    
                                        <div class="follower">
                                            <p class="follow_no">${user.noOffollowers}</p>
                                            <p class="follow_label"> Follower</p>
                                        </div>

                                        <div class="following">
                                            <p class="follow_no">${user.following}</p>
                                            <p class="follow_label"> Following</p>
                                        </div>

                                        <div class="repos">
                                            <p class="follow_no">${user.noOfRepo}</p>
                                            <p class="follow_label">Repositories</p>
                                        </div>

                                    </div>

                                </div>`;
        

        if(!user.company) {
            document.querySelector('.working').style.visibility = 'hidden';
        }

        if(!user.location) {
            document.querySelector('.location').style.visibility = 'hidden';
        }
        
        if(!user.link) {
            document.querySelector('.link').style.visibility = 'hidden';
        }


    }
    
}


searchBtn.addEventListener('click', handleInput);
