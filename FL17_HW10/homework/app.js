
const root = document.getElementById('root');
const divTweetItems = document.getElementById('tweetItems');
const divNavigationButtons = document.getElementById('navigationButtons');
const btnLiked = document.createElement('button');
const divModifyItem = document.getElementById('modifyItem');
const divLikedItems = document.createElement('div');
const ulLiked = document.createElement('ul');
const divAddItem = document.createElement('div');
const btnAddTweet = document.getElementsByClassName('addTweet')[0];
const btnCancelModification = document.getElementById('cancelModification');
const divAlertMessage = document.getElementById('alertMessage');
const divAlertMessageText = document.getElementById('alertMessageText');
const btnSaveModifiedItem = document.getElementById('saveModifiedItem');
const inputModifyItem = document.getElementById('modifyItemInput');
const inputAddItem = document.createElement('textarea');
const tweetsList = document.getElementById('list');
let editedTweet = '';




btnAddTweet.addEventListener('click', function () {
    navigateTo('add');
});

btnCancelModification.addEventListener('click', function () {
    navigateTo('main');
});

btnSaveModifiedItem.addEventListener('click', function () {
    editTweet();
});


function createMissingSections() {
    let h1 = document.createElement('h1');
    let h1Liked = document.createElement('h1');
    let buttonCancel = document.createElement('button');
    let buttonAdd = document.createElement('button');
    let buttonBack = document.createElement('button');

    divAddItem.setAttribute('id', 'addItem');
    h1.innerText = 'Add tweet';
    buttonCancel.innerText = 'Cancel';
    buttonCancel.addEventListener('click', function () {
        navigateTo('main');
    });
    buttonAdd.innerText = 'Save changes';
    buttonAdd.addEventListener('click', function () {
        let newTweet = inputAddItem.value;
        addTweet(newTweet);
    });
    btnLiked.innerText = 'Show liked';
    btnLiked.addEventListener('click', function () {
        navigateTo('liked');
    });
    hideElement(btnLiked);


    divLikedItems.setAttribute('id', 'likedItems');
    h1Liked.innerText = 'Liked Tweets';
    buttonBack.innerText = 'back';
    buttonBack.addEventListener('click', function () {
        navigateTo('main');
    });


    divAddItem.appendChild(h1);
    divAddItem.appendChild(inputAddItem);
    divAddItem.appendChild(buttonCancel);
    divAddItem.appendChild(buttonAdd);
    divAddItem.classList.add('hidden');
    divLikedItems.appendChild(h1Liked);
    divLikedItems.appendChild(buttonBack);
    divLikedItems.appendChild(ulLiked);
    divNavigationButtons.appendChild(btnLiked);
    root.appendChild(divAddItem);
    root.appendChild(divLikedItems);
}

function showElement(element) {
    element.classList.remove('hidden');
}

function hideElement(element) {
    element.classList.add('hidden');
}

function showAlert(text) {
    divAlertMessageText.innerText = text;
    showElement(divAlertMessage)
    setTimeout(function () {
        hideElement(divAlertMessage);
    }, 5000)
}

function validateTweet(text, isEdit) {
    if (!text) {
        return false;
    } else if(text.length > 140) {
        return false;
    } else if (!isEdit) {
        let existsTweets = localStorage.getItem('tweets');

        if (existsTweets) {
            let tweets = JSON.parse(existsTweets);
            for (let i = 0; i < tweets.length; i++) {
                if (text === tweets[i].text) {
                    return false;
                }
            }
        }
    }
    return true;
}

function addTweet(newTweet) {
    if (!validateTweet(newTweet, false)) {
        showAlert('Error! You can\'t tweet about that!');
        return;
    }
    let existsTweets = localStorage.getItem('tweets');
    let tweet = {
        id: null,
        text: newTweet,
        liked: false
    };
    if (existsTweets !== null) {
        let tweets = JSON.parse(existsTweets);
        if (tweets.length) {
            let latestTweet = tweets[tweets.length - 1];
            tweet.id = latestTweet.id + 1;
        } else {
            tweet.id = 1;
        }
        tweets.push(tweet);
        localStorage.setItem('tweets', JSON.stringify(tweets))
    } else {
        let tweets = []
        tweet.id = 1;
        tweets.push(tweet);
        localStorage.setItem('tweets', JSON.stringify(tweets))
    }

    inputAddItem.value = '';
    navigateTo('main');
}

function editTweet() {
    let tweet = inputModifyItem.value;
    if (!validateTweet(tweet)) {
        showAlert('Error! You can\'t tweet about that!');
        return;
    }
    let existsTweets = localStorage.getItem('tweets');
    let tweets = JSON.parse(existsTweets);
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].text === editedTweet) {
            tweets[i].text = tweet;
            localStorage.setItem('tweets', JSON.stringify(tweets));
            updateTweetList();
            inputModifyItem.value = '';
            navigateTo('main');
            return;
        }
    }
}

function createListElement(tweetText, tweetLike) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let buttonRemove = document.createElement('button');
    let buttonLike = document.createElement('button');
    a.innerText = tweetText;
    a.addEventListener('click', function () {
        editedTweet = tweetText;
        inputModifyItem.value = tweetText;
        navigateTo('edit');
    });
    buttonRemove.innerText = 'remove';
    buttonRemove.addEventListener('click', function () {
        removeTweet(tweetText);
    });
    if (tweetLike) {
        buttonLike.innerText = 'unlike';
        buttonLike.addEventListener('click', function () {
            likeTweet(tweetText, false);
        });
    } else {
        buttonLike.innerText = 'like';
        buttonLike.addEventListener('click', function () {
            likeTweet(tweetText, true);
        });
    }

    li.append(a);
    li.append(buttonRemove);
    li.append(buttonLike);
    return li;
}

function updateTweetList() {
    let existsTweets = localStorage.getItem('tweets');
    tweetsList.innerHTML = '';
    ulLiked.innerHTML = '';
    let likes = 0;
    if (existsTweets) {
        let tweets = JSON.parse(existsTweets);
        for (let i = 0; i < tweets.length; i++) {
            let tweetText = tweets[i].text;
            let tweetLike = tweets[i].like;

            if (tweetLike) {
                likes++;
            }

            let li = createListElement(tweetText, tweetLike);
            tweetsList.appendChild(li);

            if (tweetLike) {
                let liLiked = createListElement(tweetText, tweetLike);
                ulLiked.appendChild(liLiked);
            }
        }

        if (likes > 0) {
            showElement(btnLiked);
        } else {
            hideElement(btnLiked);
        }
    }
}

function likeTweet(text, like) {
    let existsTweets = localStorage.getItem('tweets');
    let tweets = JSON.parse(existsTweets);
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].text === text) {
            tweets[i].like = like;
            localStorage.setItem('tweets', JSON.stringify(tweets));
            if (like) {
                showAlert('Hoooray! You liked tweet with id ' + tweets[i].id);
            }

            updateTweetList();
            return;
        }
    }
}

function removeTweet(text) {
    let existsTweets = localStorage.getItem('tweets');
    let tweets = JSON.parse(existsTweets);
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].text === text) {
            tweets.splice(i, 1);
            localStorage.setItem('tweets', JSON.stringify(tweets));
            updateTweetList();
            return;
        }
    }
}


// ROUTING
function navigateTo(to) {
    history.pushState({
        to
    }, '', '#/' + to);
    showPage(to);
}

function showPage(page) {
    switch (page) {
        case "main":
            hideElement(divModifyItem);
            hideElement(divAddItem);
            showElement(divTweetItems);
            hideElement(divModifyItem);
            hideElement(divLikedItems);
            updateTweetList();
            break;
        case "add":
            showElement(divAddItem);
            hideElement(divModifyItem);
            hideElement(divTweetItems);
            hideElement(divLikedItems);
            hideElement(divModifyItem);
            break;
        case "edit":
            hideElement(divAddItem);
            hideElement(divModifyItem);
            hideElement(divTweetItems);
            hideElement(divLikedItems);
            showElement(divModifyItem);
            break;
        case "liked":
            hideElement(divAddItem);
            hideElement(divModifyItem);
            hideElement(divTweetItems);
            hideElement(divModifyItem);
            showElement(divLikedItems);
            updateTweetList();
    }
}


window.addEventListener('popstate', function (args) {
    let state = args.state;
    if (state) {
        showPage(state.to);
    } else {
        showPage('main');
    }
});
// END ROUTING


function init() {
    createMissingSections();
    showPage('main');
}

init();