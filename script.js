(function () {
  document.addEventListener('DOMContentLoaded', async function () {

    // СПИСОК СТАТЕЙ
    const list = document.querySelector('.list');

    function createLiElement(title, id) {
      const item = document.createElement('li');
      const a = document.createElement('a');

      item.classList.add('list__item');
      a.classList.add('list__link');
      a.href = 'post.html?id=' + id;
      a.textContent = title;

      item.append(a);

      return item;
    }

    let response = await fetch('https://gorest.co.in/public-api/posts' + window.location.search);
    let { data, meta } = await response.json();

    // выводим список статей
    data.forEach(element => {
      list.append(createLiElement(element.title, element.id));
    });

    // НАВИГАЦИЯ
    const btnFirst = document.getElementById('btn-first');
    const btnPrev = document.getElementById('btn-pref');
    const btnNext = document.getElementById('btn-next');
    const btnLast = document.getElementById('btn-last');
    const currentPage = document.querySelector('.nav__current-page');

    btnFirst.href = 'index.html';
    btnPrev.href = 'index.html?page=' + (meta.pagination.page - 1);
    btnNext.href = 'index.html?page=' + (meta.pagination.page + 1);
    btnLast.href = 'index.html?page=' + meta.pagination.pages;
    currentPage.textContent = meta.pagination.page + ' / ' + meta.pagination.pages;

    if (meta.pagination.page === 1) {
      btnFirst.classList.add('disabled');
      btnPrev.classList.add('disabled');
    }
    if (meta.pagination.page === meta.pagination.pages) {
      btnNext.classList.add('disabled');
      btnLast.classList.add('disabled');
    }

  });
})();