function createElement(tag, attrs, parent, textContent) {
  var element = document.createElement(tag);
  attrs.forEach(function (attr) {
    var name_val = attr.split('=');
    element.setAttribute(name_val[0], name_val[1]);
  });
  if (parent) parent.appendChild(element);
  if (textContent) element.textContent = textContent;
  return element;
}

// GIF animation //

function GIF(parent) {
  this.parent = parent;
  this.img = parent.querySelector('img');
  this.icon = parent.querySelector('.icon');
  this.icon_i = parent.querySelector('.icon i');
  this.isPlaying = false;
  this.gifLoaded = false;
  var T = this;

  GIF.ALL.push(this);

  this.parent.addEventListener('click', function (ev) {
    T.isPlaying ? T.stop() : T.play();
  });

  this.img.addEventListener('load', function (ev) {
    console.log('loaded', new Date());

    if (T.isPlaying && !T.gifLoaded) {
      T.gifLoaded = true;
    }

    if (T.isPlaying) {
      T.icon.classList.add('is-hidden');
    }
  });
}

GIF.ALL = [];

GIF.prototype.play = function () {
  if (!this.gifLoaded) {
    this.icon_i.classList = "fa-2x fas fa-spin fa-spinner";
  }

  this.isPlaying = true;
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
  this.icon_i.classList = "fa-2x fas fa-play-circle";
  this.icon.classList.remove('is-hidden');
  this.img.setAttribute('src', this.img.src.replace('.gif', '.img.gif'));
};

document.addEventListener('DOMContentLoaded', function () {
  // Images lazy load -> nevím zda to funguje
  new MiniLazyload({}, '.lazyload');

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


// Modals
function showModal(id, func) {
  var modal = document.querySelector('#' + id);
  modal.classList.add('is-active');
  if (func) func(modal);
}

function hideModal(id, func) {
  var modal = document.querySelector('#' + id);
  modal.classList.remove('is-active');
  if (func) func(modal);
}

// Modals init
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.querySelector('.modal-background').addEventListener('click', function () {
      hideModal(modal.id);
    });
    modal.querySelector('.modal-close').addEventListener('click', function () {
      hideModal(modal.id);
    });
  });
});

// close modal on ESC key
document.addEventListener("keyup", function (event) {
  var activeModal = document.querySelector('.modal.is-active');
  if (event.key === 'Escape' && activeModal) {
    hideModal(activeModal.id);
  }
});