/**
 * コード枠に「コピー」ボタンを付ける。
 *
 * 2026-08-30に追加。記事「議事録をAIに書かせる」は、貼るための指示文を載せている。
 * **コピーできなければ記事が成立しない**のに、コピー手段が無かった。
 * スマートフォンでは、横スクロールする枠の中で25行を選択させることになっていた。
 *
 * **なぜ public/ に置くのか**
 *   このサイトは CSP（Content-Security-Policy）で `script-src 'self'` を出している。
 *   .astro の中に `<script>` を書くと Astro がインライン化し、**CSPに弾かれて動かない。**
 *   ローカルのプレビューではCSPヘッダが無いので気づけなかった（`INC-042`）。
 *   同一オリジンの外部ファイルなら 'self' で許可される。
 *
 * 依存は入れない。クリップボードが使えない環境では、ボタンを出さない。
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
          // **失敗したことを隠さない。** 手で選べるように伝える
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
