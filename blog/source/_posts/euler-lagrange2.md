title: 補足：オイラー・ラグランジュ方程式の座標非依存性（クロメル著）
date: 2015-09-02 18:15
tags:
---

ここではオイラー・ラグランジュ方程式の座標非依存性（クロメル著）
http://hooktail.maxwell.jp/kagi/f3288afa475db3d1f07454c5b931ea03.html
の補足として、座標変換が時間に依存する場合でも成り立つことを示します。

####　変更履歴

- 2015-09-03 式番号と説明を追加

### 座標変換

元の座標系を ${q_i}$, 時間依存の新座標を ${r_k}$ とします。

$$
q_i = q_i(r_1, \cdots, r_n, t) \\ (i=1,\cdots, n)  \tag{1) (座標の変換} 
$$

いくつか計算しておきます。
以下変数を明示しませんが、関数としての $q_i, \dot{q_i}$ （偏微分の分子にくる場合）の独立変数は $(r_1,\dot{r_1}, \cdots, r_n, \dot{r_n}, t)$ です。 

また例の簡約記法で、同じ添字同士は和をとるものとして $\sum$ を省略します。

$$
\begin{eqnarray}
\dfrac{\partial q_i}{\partial \dot{r_j}} &=& 0 \tag{2)(座標変換は速度に非依存}\\\\
\dot{q_i}  &=&  \dfrac{d q_i}{dt}  \\\\
 &=& \dfrac{\partial q_i}{\partial r_k} \dot{r_k} +  \dfrac{\partial q_i}{\partial t}  \tag{3)(速度の変換} \\\\
\end{eqnarray}
$$

上の $\dot{q_i}\  の式を\  r_j, \dot{r_j} $ で偏微分すると

$$
\begin{eqnarray}
\dfrac{\partial \dot{q_i}}{\partial r_j} 
  &=& \dfrac{\partial^2 q_i}{\partial r_j \partial r_k} \dot{r_k} 
  \+ \dfrac{\partial^2 q_i}{\partial t \partial r_j} 
  \\\\
  &=& \dfrac{d}{dt} (\dfrac{\partial q_i}{\partial r_j}) \tag{速度の座標微分の変換}\\\\
\dfrac{\partial \dot{q_i}}{\partial \dot{r_j}} &=& \dfrac{\partial q_i}{\partial r_j} \tag{速度の速度微分の変換} \\\\
\end{eqnarray}
$$

### ラグランジアンの変換

元のラグランジアンを $L(q_1, \dot{q_1}, \cdots)$　とすると、
これを座標変換したラグランジアン $L'(r_1, \dot{r_1}, \cdots)$ は

$$
\begin{eqnarray}
L'(r_1,\dot{r_1},\cdots) &=& 
L(q_1(r_1,\dot{r_1},\cdots,t), \dot{q_1}(r_1,\dot{r_1},\cdots,t), \cdots) \\\\
\\\\
\dfrac{\partial L'}{\partial r_i} &=&
  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial r_i} +
  \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial \dot{q_k}}{\partial r_i} \\\\
 &=&  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial r_i}
  \+ \dfrac{\partial L}{\partial \dot{q_k}} 
  \dfrac{d}{dt} (\dfrac{\partial q_k}{\partial r_i}) \\\\
\dfrac{\partial L'}{\partial \dot{r_i}} &=&
  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial \dot{r_i}}
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial \dot{q_k}}{\partial \dot{r_i}} \\\\
 &=&  \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial q_k}{\partial r_i} \\\\
\end{eqnarray}
$$

### 作用積分の変分の変換

変分の変換は

$$
\begin{eqnarray}
\delta q_i(t) &=& 
  \dfrac{\partial q_i}{\partial r_k} \delta r_k(t) 
  \tag{時間の偏微分は入らないことに注意} \\\\
\delta \dot{q_i}(t) &=& \dfrac{d}{dt} \delta q_i(t) \\\\
 &=& \dfrac{d}{dt}(\dfrac{\partial q_i}{\partial r_k}) \delta r_k(t)+
  \dfrac{\partial q_i}{\partial r_k} \delta \dot{r_k}(t)
\end{eqnarray}
$$


作用積分とその変分の変換は

$$
\begin{eqnarray}
S'[r_1(t),\cdots,r_n(t)] = \int_A^B dt L'(r_1(t),\dot{r_1}(t),\cdots) \\\\
 （左辺は r_1(t),\cdots,r_n(t) の「汎関数」の意味） \\\\
\delta S' = \int_A^B dt (\dfrac{\partial L'}{\partial r_i} \delta r_i
  \+ \dfrac{\partial L'}{\partial \dot{r_i}} \delta \dot{r_i}) \\\\
\end{eqnarray}
$$

積分の中の2つ目の項は

$$
\begin{eqnarray}
 \dfrac{\partial L'}{\partial \dot{r_i}} \delta \dot{r_i} 
 &=&  \dfrac{\partial L}{\partial \dot{q_k}} 
  \dfrac{\partial q_k}{\partial r_i} \delta \dot{r_i} \\\\
\end{eqnarray}
$$

最初の項は

$$
\begin{eqnarray}
\dfrac{\partial L'}{\partial r_i} \delta r_i &=& 
  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial r_i} \delta r_i
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial \dot{q_k}}{\partial r_i} \delta r_i  \\\\
&=& \dfrac{\partial L}{\partial q_k} \delta q_k
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{d}{dt} (\dfrac{\partial q_k}{\partial r_i}) \delta r_i  \\\\
&=& \dfrac{\partial L}{\partial q_k} \delta q_k
  \+ \dfrac{\partial L}{\partial \dot{q_k}} (\delta \dot{q_k} - 
  \dfrac{\partial q_k}{\partial r_j} \delta \dot{r_j}) \\\\
&=& \dfrac{\partial L}{\partial q_k} \delta q_k
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \delta \dot{q_k} - 
  \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial q_k}{\partial r_j} \delta \dot{r_j}
\end{eqnarray}
$$

２つを加えて積分すると、元の座標でのオイラー・ラグランジュ方程式から

$$
\begin{eqnarray}
\delta S' 
&=& \int_A^B dt \delta q_k (\dfrac{\partial L}{\partial q_k} - 
      \dfrac{d}{dt}(\dfrac{\partial L}{\partial \dot{q_k}}))  \\\\
&=& 0  
\end{eqnarray}
$$

一方 $\delta S'$ を $\delta r_i$ で表すと

$$
\begin{eqnarray}
\delta S' &=& 
 \int_A^B dt \delta r_i (\dfrac{\partial L'}{\partial r_i}
   \- \dfrac{d}{dt}(\dfrac{\partial L'}{\partial \dot{r_i}}))
\end{eqnarray}
$$

上は $i$ についての和ですが、$\delta r_i$ は任意なので、

$$
\dfrac{d}{dt}(\dfrac{\partial L'}{\partial \dot{r_i}}) =
  \dfrac{\partial L'}{\partial r_i}
$$

結局、（時間依存の）座標変換後も同じ形の オイラー・ラグランジュ方程式が成り立つことがわかりました。

### オイラー・ラグランジュ方程式を直接変換

変分を使わずに、方程式を直接座標変換してももちろんできます。

$$
\begin{eqnarray}
\dfrac{d}{dt} ( \dfrac{\partial L'}{\partial \dot{r_i}} )  &=&
  \dfrac{d}{dt} (
  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial \dot{r_i}}
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial \dot{q_k}}{\partial \dot{r_i}}) \\\\
 &=& \dfrac{d}{dt} ( \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial q_k}{\partial r_i})  \\\\
 &=& \dfrac{d}{dt} ( \dfrac{\partial L}{\partial \dot{q_k}}) \dfrac{\partial q_k}{\partial r_i} 
  \+ \dfrac{\partial L}{\partial \dot{q_k}} 
     \dfrac{d}{dt} (\dfrac{\partial q_k}{\partial r_i}) \\\\
\end{eqnarray}
$$

一方

$$
\begin{eqnarray}
\dfrac{\partial L'}{\partial r_i} &=&
  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial r_i}
  \+ \dfrac{\partial L}{\partial \dot{q_k}} \dfrac{\partial \dot{q_k}}{\partial r_i} \\\\
&=&  \dfrac{\partial L}{\partial q_k} \dfrac{\partial q_k}{\partial r_i}
  \+ \dfrac{\partial L}{\partial \dot{q_k}} 
     \dfrac{d}{dt}(\dfrac{\partial q_k}{\partial r_i}) \\\\
\end{eqnarray}
$$

２つの差をとれば、

$$
\begin{eqnarray}
\dfrac{d}{dt} (\dfrac{\partial L'}{\partial \dot{r_i}} ) - 
    \dfrac{\partial L'}{\partial r_i} &=&
  (\dfrac{d}{dt} (\dfrac{\partial L}{\partial \dot{q_k}}) - 
    \dfrac{\partial L}{\partial q_k})
    \dfrac{\partial q_k}{\partial r_i}
&=& 0
\end{eqnarray}
$$

結局、時間依存の座標変換の場合でも

$$
\dfrac{\partial \dot{q_i}}{\partial r_j} 
  = \dfrac{d}{dt} (\dfrac{\partial q_i}{\partial r_j}) \tag{速度の座標微分の変換}\\\\
$$

が成り立ち、オイラー・ラグランジュ方程式は不変（共変的）となることが分かりました。

なお上の変換はラグランジアンの具体的な形には依存していないので、


### へんなこと？

上で説明した変分の場合、直接座標変換の場合いずれでも、
座標変換が１対１（逆変換を持つ）であることは、（表面的には）一切使っていません。

極端な場合、各座標の変数の数が違ってもよいことになります。

$$
q_i = q_i(r_1, \cdots, r_m, t) \\ (i=1,\cdots, n)  
$$

これはどういうことなんでしょうか？ それとも、単にわたしの勘違い？？

-----

ここでは変換後の変分 $\delta r_k$ から元の座標系での変分 $\delta q_i$ を導いていますが、
元のクロメルさんの記事では、逆に、元の座標系での変分 $\delta q_i$ から変換後の変分 $\delta \eta_k$ を導いています。

このためクロメルさんの (7) 式は、逆変換を持つことが前提になっています。
また (8) (9) 式は間違ってる気がしますが？

とりあえず以上です。疲れた～
