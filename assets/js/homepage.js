var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function (user) {
    // format github user API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl).then(function (response) {
        // if the user entered exists
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            // if the user doesn't exist
            alert("Error: GitHub User Not Found");
        }
    })
        // alert if network error arises 
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });


};

getUserRepos();

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a Github username");
    }

    console.log(event);

}

var displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    //clear put the old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repositories found.";
        return;
    }

    //loop over the repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //creat a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to the container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        // append to the container
        repoEl.appendChild(statusEl);

        //append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);