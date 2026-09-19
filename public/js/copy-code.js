/*
 * コード枠に「コピー」ボタンを付ける。
 *
 * このファイルは配信されます。読む人に意味のないことは書きません。
 * 置き場を分けている理由と経緯は、このサイトのソース側の注記にあります。
 *
 * 依存は入れません。クリップボードが使えない環境では、ボタンを出しません。
 */
(function () {
  if (!(typeof navigator !== 'undefined' && navigator.clipboard)) return;

  var pres = document.querySelectorAll('.prose pre');
  for (var i = 0; i < pres.length; i += 1) {
    (function (pre) {
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = 'コピー';
      btn.setAttribute('aria-label', 'この内容をコピーする');
      wrap.appendChild(btn);

      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(pre.innerText).then(function () {
          btn.textContent = 'コピーしました';
          btn.classList.add('done');
        }).catch(function () {
          // 失敗したことを隠さない。手で選べるように伝える
          btn.textContent = 'コピーできません';
          btn.classList.add('failed');
        }).then(function () {
          setTimeout(function () {
            btn.textContent = 'コピー';
            btn.classList.remove('done', 'failed');
          }, 2000);
        });
      });
    }(pres[i]));
  }
}());
