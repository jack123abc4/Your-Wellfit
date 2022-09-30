var removeFavoriteItemButtons = document.getElementsByClassName('btn-danger');
// console.log(removeFavoriteItemButtons);
for (var i = 0; i < removeFavoriteItemButtons.length; i++) {
    var button = removeFavoriteItemButtons[i];
    button.addEventListener('click', removeFavorite)
};

function  removeFavorite(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
};

