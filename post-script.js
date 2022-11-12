(function () {
  document.addEventListener('DOMContentLoaded', async function () {

    // Статья
    const heading = document.querySelector('.heading');
    const text = document.querySelector('.text');
    const commentsList = document.querySelector('.comments');
    const btnBack = document.getElementById('btn-home');

    let id = new URLSearchParams(window.location.search).get('id');
    let response = await fetch('https://gorest.co.in/public-api/posts/' + id);
    let data = (await response.json()).data;

    heading.textContent = data.title;
    text.textContent = data.body;

    // Комментарии
    let responseComments = await fetch('https://gorest.co.in/public-api/comments?post_id=' + id);
    let dataComments = (await responseComments.json()).data;

    function createCommentElement(name, text) {

      const commentsItem = document.createElement('li');
      const commentsName = document.createElement('div');
      const commentsText = document.createElement('p');

      commentsItem.classList.add('comments__item');
      commentsName.classList.add('comments__name');
      commentsText.classList.add('comments__text');

      commentsName.textContent = name;
      commentsText.textContent = text;

      commentsItem.append(commentsName, commentsText);

      return commentsItem;
    };

    dataComments.forEach(el => {
      commentsList.append(createCommentElement(el.name, el.body));
    })

    if (dataComments.length == 0) commentsList.textContent = 'Комментарии пока никто не оставлял';

    // Кнопка "Назад"
    btnBack.addEventListener('click', function (e) {
      e.preventDefault();
      window.history.back();
    })

  });
})();