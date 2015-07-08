title: 遠くの山は青く霞むか？
date: 2015-07-09 20:10
tags:
---

## カシミール３Ｄ

お使いの方も多いと思いますが、[カシミール３Ｄ][kashimir]というフリーかつ超優秀な３Ｄ地図ナビゲータがあります。

[kashimir]:http://www.kashmir3d.com/index.html

ＤＡＮ杉本さんによる大変な労作で、わたしも以前から愛用しています。

このツールには単に３Ｄデータ地図を見るだけでなく、
地図データに基づいて **写真を撮影する** という素晴らしい機能があるのですが、
１つだけ計算がおかしいのでは、と思ったのでちょっと書いてみます。

なお、**わたしの使い方が悪いだけなのかもしれませんが。。。**

## 遠くを青く霞ませる

**青い山脈** というくらいで、たしかに遠くの山は青く霞んだように見えますね。

カシミールの撮影にも、この遠くを青く霞ませるという機能があるのですが、どうもこれがおかしい。

カシミールのこの機能を使うと、どうも遠くが青く霞むだけでなく、全体的に暗くなり、特に **雪の白も青くなってしまう** 気がします。

以下の上段がサンプル画像ですが、右端の写真のように、雪はやっぱり白く写るし、実際目で見てもそう感じます。

 - 写真は3月初めの11時頃、竜ヶ岳山頂付近（富士山の北西約15km）よりのもの
 - カシミールの撮影もそれに合わせてある

なお下段は後述の **自家製改良版:青く霞ませる** です。

<table>
<tr>
<td style="vertical-align:top;">
<b>カシミール:青く霞ませない</b>
<img src="https://kuh96.github.io/images/bluesky-off.jpg" width="300">
<b>自家製改良版:青く霞ませる</b>
<img src="https://kuh96.github.io/images/bluesky-conv01.jpg" width="300">
</td>

<td style="vertical-align:top;">
<b>カシミール:青く霞ませる</b>
<img src="https://kuh96.github.io/images/bluesky-on.jpg" width="300">
</td>

<td style="vertical-align:top;">
<b>写真</b>
<img src="https://kuh96.github.io/images/bluesky-photo.jpg" width="300">
</td>
</tr>
</table>

 - なおカシミールのこの機能には、「視程」と「変化率」というパラメータがあり、
  それで「青く霞む度合い」を変更できる
 - でもパラメータを変えても、やっぱりおかしい。。。


## 遠くの山が青く霞む理由

遠くの山が青く霞む理由について考えてみます。

青くなる原因は、空の青と同じく、大気による **レイリー散乱** によって、
光の青成分が赤成分より強く散乱されるため、と思われます。

まず直接光、すなわち雪山で反射された光が目に届く過程を考えてみます。

<img src="https://kuh96.github.io/images/blue-exp01.png" width="500">

でもこの場合は逆に **目に届く光は赤みがかるはず ** という結論になります。

そこで次に、日光が途中で大気によって散乱されて目に届く影響を考えてみます。

<img src="https://kuh96.github.io/images/blue-exp02.png" width="500">

目に届く大気による散乱光は、たしかに青みがかっているようです。
おおよそ以下と考えられます。

 - 青みがかかる程度は、山から目までの距離（大気の厚さ）に比例する。
   すなわち遠いほど青みがかる。

 - 直接光＋日光の散乱による青成分のバイアス、が目に届く

 - しかし直接光が強い＝明るい物体の場合（例えば雪の白）、この青成分バイアスは直接光に比べて小さく、あまり目立たない

 - 逆に直接光が弱い＝暗い物体（例えば低層の樹林帯）、この青成分のバイアスは無視できず、青みがかって見える

## 自家製改良版:青く霞ませる

というわけで、[ごくごく簡単な画像処理][sim]を作ってみました。

[sim]:https://kuh96.github.io/images/bluesky.html

 - 初体験の HTML5 Canvas を使用
 - 上のカシミール：青く霞ませない、を原画像として以下の変換
 - keep brightness オフの場合： RGB の入力値を単に各画素の RGB に加えるだけ
 - オンの場合： 同様だが明るさを変えないように、変換後の RGB値に
   元の明るさ／変換後の明るさ を乗じる
 （なお「明るさ」は単純に RGB値の和とした）

R=0, G=10, B=40, keep brightness=オン　で変換したのが上の画像（以下に再掲）です。

<img src="https://kuh96.github.io/images/bluesky-conv01.jpg" width="300">

多少もっともらしくなったような気が
