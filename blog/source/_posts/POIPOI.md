title: hexo 練習...
date: 2015-06-06 12:45:58
tags:
---

# hexo 練習中です

まだまだ練習中ですが。。。

 - shynx などに比べるとシンプル？
 - Markdowon はやっぱり楽
 - github に直接 deploy できるのがうれしい
 
# Image

source/images フォルダーを作り、そこに入れるのが簡単

<img src="/images/shirouma-ooike.jpg" />

# 数式

$a + b$ のように mathjax が使えます。

$$
\frac{\partial u}{\partial t} = h^2 \left( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)
$$

 - http://yukiyamashina.github.io/blog/2014/09/19/blog-at-github-using-hexo/ にのっていたプラグイン４つともインストール。

deploy すると mathjax が表示されない？
 - http://cdn.mathjax ... と生成されてしまうため
 - とりあえず http://xxx.github.io で見る

#シンタックス

[Qiita](http://qiita.com)のようにシンタックスハイライトされます。

 - http://tech.admax.ninja/2014/09/11/how-to-write-article-in-hexo/ 

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
 
```

\`\`\` の次に言語名を書けばOKだったが、file.js のような書き方ではハイライトされない？


# （ローカルの）　hexo server

なぜかすぐ落ちます。なにかおかしい？？

ほとんど hexo generate してブラウザで見るたびに毎回！
これなら hexo generate && hexo server したほうがましかも。

いっそ毎回 hexo d -g すればよい？

# Other Reference

 - [Git初心者でも大丈夫！完全無料でGithub PagesにWebページを公開する方法](http://liginc.co.jp/web/html-css/html/96453)
 - [所要時間3分!? Github PagesとHEXOで爆速ブログ構築してみよう！](http://liginc.co.jp/web/programming/server/104594)



