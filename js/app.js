'use strict'
// declaring global variables
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

// Constructre for create product Array

function Product(Name, link) {
    this.Name = Name;
    this.link = link;
    this.votes = 0;
    this.timeDisplaed = 0;

    globalarr.push(this);
    nameOfProduct.push(this.Name);




}

// Declaring new objects

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg')
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');
console.log(globalarr);
console.log(nameOfProduct);
// Get all item from local Storage
if(localStorage.getItem('allProducts')){
    globalarr=[];
    globalarr = JSON.parse(localStorage.getItem('allProducts'));
}

// Function to pick random Numbers and compare them to make sure that there is no duplication and the pictures did not displayed in previous round
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

// Function to display Images
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
// Add Event Listner To indicate which picture was cliced and count dispalyed times and voting times and drawing chart
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
        document.getElementById('para').style.visibility = 'visible';



        localStorage.setItem('allProducts', JSON.stringify(globalarr));
    }

}