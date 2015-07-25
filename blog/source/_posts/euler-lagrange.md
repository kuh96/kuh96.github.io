title: 間違い報告： オイラー・ラグランジュ方程式の座標非依存性（クロメル著）
date: 2015-07-25 14:45
tags:
---

http://hooktail.sub.jp/analytic/coodindep/

**式の書き方だけの問題** と思いますが、いくつかへんです。

> $$
> q_i = f_i(\eta_j) \ \ \ (i,j = 1,2, \cdots n) \tag{2}
> $$

これでは $f_i$ は $\eta_j$ の１変数関数になってしまい、意味不明です。
以下の意味では？

$$
q_i = f_i(\eta_1, ..., \eta_n) \ \ \ (i = 1,2, \cdots n) \tag{2'}
$$

以下も同様です。

> $$
> S = \sum_{i=1}^n \int_A^B L(q_i , \dot{q}_i) dt \tag{3}
> $$

これでは以下のように、異なる座標間で何の相互作用もない、つまらないラグランジアンしか作れません。

$$
\int_A^B dt \\{ L(q_1 , \dot{q}_1) + ... + L(q_n , \dot{q}_n) \\}
$$

以下の意味では？

$$
\int_A^B dt L(q_1, \dot{q}_1, ...,  q_n , \dot{q}_n) 
$$

従って (4) 式は以下のような感じになると思います。
要は $\delta q_i, \delta \dot{q}_i$ を外に出してからでないと、$\sum$ の形にはなりません。

$$
\begin{eqnarray}
\delta S &=& \delta \int\_A^B L(q\_1 , \dot{q}\_1, ...) dt \\\\
 &=& \int\_A^B \left\\{ L(q\_1 + \delta q\_1, \dot{q}\_1+\delta \dot{q}\_1, ...) - L(q\_1 , \dot{q}\_1, ...) \right\\} dt \\\\
 &=& \sum\_{i=1}^n \int\_A^B \left( \dfrac{\partial L(q\_1, \dot{q}\_1, ...)}{\partial q\_i}  \delta q\_i + \dfrac{\partial L(q\_1, \dot{q}\_1, ...)}{\partial \dot{q}\_i} \delta \dot{q}\_i \right) dt \tag{4'} \\\\
 &=& ...
\end{eqnarray}
$$

とりあえず以上です。





