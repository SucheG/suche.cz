var sectionBoxes = document.querySelectorAll('.section-box');
var duration = 3000;// při změně je potřeba změnit i class width100
var index = -1;
var width100 = 'width100';

for (var i=0; i<sectionBoxes.length; i++) {
  var box = sectionBoxes[i];
  box._activeImgIndex = 0;
  box._loader = box.querySelector('.loader');
}

sectionBoxes[0]._loader.classList.add(width100);

var interval = setInterval(function () {
  // zvýšení indexu o 1 = aktuální index
  index = index + 1 === sectionBoxes.length ? 0 : index + 1;
  var box = sectionBoxes[index];
  box._loader.classList.remove(width100);
  nextImg(box);

  // spouští animaci pro následující
  var nextIndex = index+1 === sectionBoxes.length ? 0 : index + 1;
  sectionBoxes[nextIndex]._loader.classList.add(width100);
}, duration);

function nextImg(box) {
  var imgs = box.querySelectorAll('img');
  imgs[box._activeImgIndex].classList.add('hidden');
  var nextIndex = box._activeImgIndex + 1;
  box._activeImgIndex = imgs[nextIndex] ? nextIndex : 0;
  imgs[box._activeImgIndex].classList.remove('hidden');
}
