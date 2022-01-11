var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var getRepoIssues = function (repo) {
    console.log(repo);
    // create a Url to hold the Url 
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

                //check if the api has paginated issue
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            // request was un-succesful 
            alert("There was a problem with you're request!")
        }
    });
};

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    //loop over the given issues
    for (var i = 0; i < issues.length; i++) {
        // creat a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");


        // create a span to hold the issues title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to a container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //apened to container 
        issueEl.appendChild(typeEl);

        //append to the dom
        issueContainerEl.appendChild(issueEl);

    }
};

var displayWarning = function (repo) {
    // add text warning to the container
    limitWarningEl.textContent = "To see more then 30 issues, visit ";

    var linkEl = document.createElement("a")
    linkEl.textContent = "See More Issues On GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to the warning container
    limitWarningEl.appendChild(linkEl);

}

getRepoIssues("facebook/react");