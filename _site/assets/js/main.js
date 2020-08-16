// Facebook chat plugin

window.fbAsyncInit = function () {
  FB.init({
    xfbml: true,
    version: 'v8.0'
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/cs_CZ/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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