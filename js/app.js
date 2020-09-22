'use strict'

var globalarr = [];

var leftImage = document.getElementById('pic1-300');
var midImage = document.getElementById('pic2-300');
var rightImage = document.getElementById('pic3-300');
var imagesSection = document.getElementById('product-pictures')
var listOfItem = document.getElementById('result-list');
var currentLeftImage;
var currentRightImage;
var currentMidImage;
var totalClicks = 0;
var maxNumberOfTrials = 25;

var testarr = [-1, -1, -1];
var nameOfProduct = [];
var votesarray = [];
var timesDiplayed = [];

function product(Name, link) {
    this.Name = Name;
    this.link = link;
    this.votes = 0;
    this.timeDisplaed = 0;

    globalarr.push(this);
    nameOfProduct.push(this.Name);




}



new product('bag', 'img/bag.jpg');
new product('banana', 'img/banana.jpg');
new product('bathroom', 'img/bathroom.jpg');
new product('boots', 'img/boots.jpg');
new product('breakfast', 'img/breakfast.jpg');
new product('bubblegum', 'img/bubblegum.jpg');
new product('chair', 'img/chair.jpg');
new product('cthulhu', 'img/cthulhu.jpg');
new product('dog-duck', 'img/dog-duck.jpg');
new product('dragon', 'img/dragon.jpg');
new product('pen', 'img/pen.jpg');
new product('pet-sweep', 'img/pet-sweep.jpg')
new product('scissors', 'img/scissors.jpg');
new product('shark', 'img/shark.jpg');
new product('sweep', 'img/sweep.png');
new product('tauntaun', 'img/tauntaun.jpg');
new product('unicorn', 'img/unicorn.jpg');
new product('usb', 'img/usb.gif');
new product('water-can', 'img/water-can.jpg');
new product('wine-glass', 'img/wine-glass.jpg');
console.log(globalarr);
console.log(nameOfProduct);

if(localStorage.getItem('allProducts')){
    globalarr=[];
    globalarr = JSON.parse(localStorage.getItem('allProducts'));
}


function pickRandomNumber() {
    do {

        var leftImageIndex = Math.floor(Math.random() * globalarr.length);

    } while (leftImageIndex === testarr[0] || leftImageIndex === testarr[1] || leftImageIndex === testarr[2]);

    do {
        var midImageIndex = Math.floor((Math.random() * globalarr.length));

    } while (leftImageIndex === midImageIndex || midImageIndex === testarr[0] || midImageIndex === testarr[1] || midImageIndex === testarr[2]);

    do {
        var rightImageIndex = Math.floor((Math.random() * globalarr.length));


    } while (leftImageIndex === rightImageIndex || midImageIndex === rightImageIndex || rightImageIndex === testarr[0] || rightImageIndex === testarr[1] || rightImageIndex === testarr[2]);

    testarr = [];
    testarr.push(leftImageIndex);
    testarr.push(midImageIndex);
    testarr.push(rightImageIndex);






    displayImages(leftImageIndex, midImageIndex, rightImageIndex);
}


function displayImages(leftIndex, midIndex, rightIndex) {
    currentLeftImage = globalarr[leftIndex];
    currentMidImage = globalarr[midIndex];
    currentRightImage = globalarr[rightIndex];

    currentLeftImage.timeDisplaed++;
    currentMidImage.timeDisplaed++;
    currentRightImage.timeDisplaed++;
    leftImage.setAttribute('src', currentLeftImage.link);
    midImage.setAttribute('src', currentMidImage.link);
    rightImage.setAttribute('src', currentRightImage.link);


}
pickRandomNumber();

imagesSection.addEventListener('click', voting);
function displayList() {
    var list;
    for (var i = 0; i < globalarr.length; i++) {
        list = document.createElement('li');
        list.textContent = globalarr[i].Name + ' had ' + globalarr[i].votes + ' votes and was shown ' + globalarr[i].timeDisplaed;
        listOfItem.appendChild(list);
    }
}

function voting(event) {
    
    var clickedImage;

    if (event.target.id === 'pic1-300') {
        clickedImage = currentLeftImage;

    } else if (event.target.id === 'pic2-300') {
        clickedImage = currentMidImage;
    } else if (event.target.id === 'pic3-300') {
        clickedImage = currentRightImage;
    }

    clickedImage.votes++;
    pickRandomNumber();
    totalClicks++;

    listOfItem.textContent = '';


    if (totalClicks >= maxNumberOfTrials) {
        imagesSection.removeEventListener('click', voting);
        for (var i = 0; i < globalarr.length; i++) {

            votesarray.push(globalarr[i].votes);
            timesDiplayed.push(globalarr[i].timeDisplaed)

        }
        // console.log('number of votes' + votesarray);
        // console.log('number of displayed' + timesDiplayed);
        displayList();

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: nameOfProduct,
                datasets: [{
                    label: 'Number of votes',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: votesarray
                }, {
                    label: 'Number of Displayed',
                    backgroundColor: 'rgb(47,79,79)',
                    borderColor: 'rgb(47,79,79)',
                    data: timesDiplayed
                }]
            },

            // Configuration options go here
            options: {}
        });


        document.getElementById('button').style.visibility = 'visible';



        localStorage.setItem('allProducts', JSON.stringify(globalarr));
    }

}