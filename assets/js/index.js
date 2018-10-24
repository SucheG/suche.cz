var sectionBoxes = document.querySelectorAll('.section-box');
var tOut;
var duration = 2000;

function nextImg(box) {
  var imgs = box.querySelectorAll('img');
  imgs[box._activeImgIndex].classList.add('hidden');
  var nextIndex = box._activeImgIndex + 1;
  box._activeImgIndex = imgs[nextIndex] ? nextIndex : 0;
  imgs[box._activeImgIndex].classList.remove('hidden');

  box._loader.classList.remove('width100');
  setTimeout(function () {
    box._loader.classList.add('width100');
  }, 100);

  // rekurzivní volání :)
  tOut = setTimeout(function () {
    nextImg(box);
  }, duration)
}

for (var i = 0; i < sectionBoxes.length; i++) {

  var box = sectionBoxes[i];
  box._activeImgIndex = 0;
  box._loader = box.querySelector('.loader');
  box.addEventListener('mouseenter', function (event) {
    event.target._loader.classList.add('width100');

    tOut = setTimeout(function () {
      nextImg(event.target);
    }, duration)
  });

  box.addEventListener('mouseleave', function (event) {
    event.target._loader.classList.remove('width100');
    clearTimeout(tOut);
  })

}
