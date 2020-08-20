// Anchor highlight
let prevAnchor = null;

function setActiveAnchor() {
  if (location.hash) {
    let el = document.querySelector(location.hash);
    if (el) {
      if (prevAnchor) {
        prevAnchor.classList.remove('is-active');
      }

      el.classList.add('is-active');
      prevAnchor = el;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setActiveAnchor();
});

window.addEventListener("hashchange", function (ev) {
  setActiveAnchor();
});

// GIF animation

function GIF(parent) {
  this.parent = parent;
  this.img = parent.querySelector('img');
  this.icon = parent.querySelector('.icon');
  this.isPlaying = false;
  let T = this;

  GIF.ALL.push(this);

  parent.addEventListener('click', function () {
    T.isPlaying ? T.stop() : T.play();
  });
}

GIF.ALL = [];

GIF.prototype.play = function () {
  this.isPlaying = true;
  this.icon.classList.add('is-hidden');
  this.img.setAttribute('src', this.img.src.replace('.img.gif', '.gif'));

  // stopne ostatní, pokud hrají
  GIF.ALL.forEach(function (gif) {
    if (gif !== this && gif.isPlaying) {
      gif.stop();
    }
  }, this);
};

GIF.prototype.stop = function () {
  this.isPlaying = false;
  this.icon.classList.remove('is-hidden');
  this.img.setAttribute('src', this.img.src.replace('.gif', '.img.gif'));
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.is-gif').forEach(function (gifParent) {
    new GIF(gifParent);
  });
});


/*
TabContents = Prvek pro přepínání tabů a jeho obsahu
el: div element obsahující .tabs a .contents
tabs jsou <li> v .tabs
contenct jsou div
provázané pomocí pořadí
*/
function TabContents(el) {
  this.el = el;
  this.tabItems = el.querySelectorAll('.tabs li');
  this.contents = el.querySelectorAll('.contents > div');
  if (this.tabItems.length !== this.contents.length) {
    console.error(el, 'has differenct count of tabs and contents');
  }

  var T = this;

  this.tabItems.forEach(function (tabItem, index) {
    tabItem.addEventListener('click', function () {
      T.show(index);
    });
  })
}

TabContents.prototype.show = function (index) {
  var oldTab = this.el.querySelector('li.is-active');
  if (oldTab) {
    oldTab.classList.remove('is-active');
  }
  var oldContent = this.el.querySelector('.contents div.is-active');
  if (oldContent) {
    oldContent.classList.remove('is-active');
  }
  this.tabItems[index].classList.add('is-active');
  this.contents[index].classList.add('is-active');
};

document.querySelectorAll('.tab-contents').forEach(function (el) {
  new TabContents(el);
});


// for touch devices
if (window.addEventListener) {
  var once = false;
  window.addEventListener('touchstart', function () {
    if (!once) {
      once = true;
      // Do what you need for touch-screens only
      document.getElementById('kali-link').classList.add('is-hidden');
    }
  });
}