function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function get_random_words(data, level, count) {
  data = data.filter(function (item) {
    return level.indexOf(item.level) > -1;
  });
  shuffleArray(data);
  return data.slice(0, count);
}

var LEVELS = {
  "level1": [1, 2],
  "level2": [2, 3],
  "level3": [3, 4]
};

function Karta(game, slovo, is_text, index) {
  this.game = game;
  this.slovo = slovo;
  this.is_text = is_text;
  this.index = index;
  this.scene = createElement('div', ['class=column is-4-mobile is-2-tablet scene']);
  this.card = createElement('div', ['class=pw-card'], this.scene);
  this.front = createElement('div', ['class=card__face card__face--front center-text'], this.card);
  this.back = createElement('div', ['class=card__face card__face--back center-text'], this.card);
  this.matched = false;
  this.actImage = null;

  this.card.addEventListener('click', function () {
    if (!this.matched && this.game.active) {
      this.flip();
      this.game.flip(this);
    }
  }.bind(this));

  if (this.is_text) {
    this.text = createElement('p', ['class=is-unselectable'], this.back);
    this.text.textContent = slovo.en;
    var columns2 = createElement('div', ['class=columns is-mobile is-gapless'], this.back);
    this.czText = createElement('div', ['class=column is-4 tag'], columns2);//
    this.czText.innerHTML = '<span class="icon"><i class="fas fa-globe-africa"></i></span>';
    this.czText.addEventListener('click', function (ev) {
      ev.stopPropagation();
      this.toggleLang();
    }.bind(this));
  } else {
    var columns = createElement('div', ['class=columns is-mobile is-gapless'], this.back);
    this.imgZoom = createElement('div', ['class=column is-4 tag'], columns);
    this.imgZoom.innerHTML = '<span class="icon"><i class="fas fa-expand"></i></span>';
    this.imgZoom.addEventListener('click', function (ev) {
      ev.stopPropagation();
      this.showImage();
    }.bind(this));

    createElement('div', ['class=column is-4'], columns); // mezi

    this.imgChange = createElement('div', ['class=column is-4 tag'], columns);
    this.imgChange.innerHTML = '<span class="icon"><i class="fas fa-redo"></i></span>';
    this.imgChange.addEventListener('click', function (ev) {
      ev.stopPropagation();
      this.nextImage();
    }.bind(this));
    this.images = [];
    this.image_index = 0;
    this.setImage();
  }
}

Karta.prototype.toggleLang = function () {
  if (this.text.textContent === this.slovo.en) {
    this.text.textContent = this.slovo.cz;
  } else {
    this.text.textContent = this.slovo.en;
  }
}

Karta.prototype.showImage = function () {
  var karta = this;
  showModal('puzzle-img-modal', function (modal) {
    var img = modal.querySelector('img');
    img.src = karta.actImage;
  });
}

Karta.prototype.setImage = function () {
  this.back.style.backgroundSize = "cover";
  this.back.style.backgroundPosition = "center";
  this.back.style.backgroundRepeat = "no-repeat";
  ['-0.jpg', '-1.jpg', '-2.jpg'].forEach(function (item) {
    this.images.push('/assets/img/puzzle-word/' + this.game.category + '/' + this.slovo['en'] + item);
  }, this);
  this.nextImage();
};

Karta.prototype.nextImage = function () {
  this.actImage = this.images[this.image_index];
  this.back.style.backgroundImage = "url('" + this.actImage + "')";
  if (this.image_index === this.images.length - 1) {
    this.image_index = 0;
  } else {
    this.image_index += 1;
  }
}

Karta.prototype.flip = function () {
  this.card.classList.toggle('is-flipped');
}

Karta.prototype.setMatch = function () {
  this.matched = true;
  this.scene.classList.add('match');
}

function PuzzleWord(id) {
  this.element = document.getElementById(id);
  this.karta1 = null;
  this.karta2 = null;
  this.category = null;
  this.active = true;
  this.renderedCount = 0;
  this.matchedCount = 0;
  this.karty = [];
  this.sounds = {
    winner: new Audio('/assets/sound/puzzle-word/winner.mp3'),
    yeay: new Audio('/assets/sound/puzzle-word/yeay.mp3')
  };
  this.level = null;
}

PuzzleWord.prototype.reset = function () {
  this.karta1 = null;
  this.karta2 = null;
  this.active = true;
  this.renderedCount = 0;
  this.matchedCount = 0;
  this.karty = [];
  this.element.innerHTML = '';
}

PuzzleWord.prototype.restart = function () {
  this.render(this.category, this.renderedCount, this.level);
};

PuzzleWord.prototype.render = function (category, count, level) {
  this.reset();
  this.renderedCount = count;
  this.category = category;
  this.level = level;
  var from_url = '/assets/data/puzzle-word/' + category + '.json'
  fetch(from_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      get_random_words(data, level, count).forEach(function (slovo, index) {
        this.karty.push(new Karta(this, slovo, true, index));
        this.karty.push(new Karta(this, slovo, false, index));
      }, this);
      shuffleArray(this.karty);
      this.karty.forEach(function (karta) {
        this.element.appendChild(karta.scene);
      }, this);
    }.bind(this));
}


PuzzleWord.prototype.flip = function (karta) {
  if (!this.karta1) {
    this.karta1 = karta;
  } else if (!this.karta2) {
    this.karta2 = karta;
    this.active = false;
    this.active = this.karta1 === this.karta2;
  }

  if (this.karta1 && this.karta2) {
    if (this.karta1 !== this.karta2 && this.karta1.slovo === this.karta2.slovo) {
      this.matchedCount += 1;
      this.sounds.yeay.play();
      this.karta1.setMatch();
      this.karta2.setMatch();

      if (this.matchedCount === this.renderedCount) {
        this.sounds.winner.play();
        showModal('puzzle-winner-modal');
      } else {
        this.active = true;
      }

    } else {
      var karta1 = this.karta1;
      var karta2 = this.karta2;
      setTimeout(function () {
        karta1.flip();
        karta2.flip();
        this.active = true;
      }.bind(this), 1500);

    }
    this.karta1 = null;
    this.karta2 = null;
  }
};

PuzzleWord.prototype.init = function () {
  var kategorie = document.getElementById('pw-kategorie');
  var level = document.getElementById('pw-level');
  puzzleWord.render(kategorie.value, 12, LEVELS[level.value]);
};

var puzzleWord = new PuzzleWord('main');

