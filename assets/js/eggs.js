document.addEventListener('DOMContentLoaded', function () {
  console.log('easter eggy:');
  console.log('uložit do localStorage');

  let count = 0;
  document.querySelector('.hero .image').addEventListener('click', function () {
    count += 1;
    if (count > 9) {
      alert('10 clicks --> změna obrázku');
      count = 0;
    }
  });

  document.addEventListener('mouseup', function () {
    if (getSelectedText() === 'Ganbaatar') {
      alert('selected Ganbaatar');
    }
  });

  document.querySelector('.hero h2.subtitle span').addEventListener('click', function (ev) {
    alert('Click člověk');
    ev.target.textContent = 'Superman';
  });

  let arr = [];
  document.querySelectorAll('.hero .tags .tag').forEach(function (item, index) {
    item.addEventListener('click', function (ev) {
      arr.push(index);
      if (arr.length > 3) {
        arr.shift();
      }

      if (arr[0] === 1 && arr[1] === 2 && arr[2] === 0) {
        alert('nice 231');
      }
    });
  });

  console.log('adresní řádek -> stránka /egg/, kde se zobrazí progres easter eggů');
  console.log('zakomentovaný text');
  console.log('skryté tlačítko s volbou barvy');
});

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return '';
}

function egg() {
  alert('function egg');
}

setTimeout(function () {
  alert('60 minut na stránce');
}, 1000 * 60 * 60)