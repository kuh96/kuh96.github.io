title: 練習：曲線と曲面の微分幾何
date: 2015-07-27 19:00
tags:
---

### 2. § 1空間内の曲面の概念

問1.1
(i) $x = au \cos v,\ y = bu \sin v,\ z = u^2$  回転放物面

$$
 \cos v = \frac{x}{au} \\\\
 \sin v = \frac{y}{bu} \\\\
 u^2 = \frac{x^2}{a^2} + \frac{y^2}{b^2} = z \\\\
$$

(iii) $x=a(u+v),\ y=b(u-v),\ z=4uv$  双曲放物面

$$
x/a + y/b = 2u \\\\
x/a - y/b = 2v \\\\
z = (x/a + y/b)(x/a - y/b) = x^2/a^2 - y^2/b^2
$$

--------
移動＋回転する座標系でのラグランジアン

基準座標系 $\boldsymbol{X}$
並進座標系 $\boldsymbol{x}$


中心  $\boldsymbol{\bar{X}}(t)$
振動子 $\boldsymbol{X}(t) = \boldsymbol{\bar{X}}(t) + \boldsymbol{x}(t)$

$$
\begin{eqnarray}
T &=& \boldsymbol{\dot{X}}(t)^2/2m \\\\
 &=& \boldsymbol{\dot{\bar{X}}}(t)^2/2m  + \boldsymbol{\dot{x}}(t)^2/2m  +  
 \boldsymbol{\dot{\bar{X}}}(t) \boldsymbol{\dot{x}}(t)/m  \\\\
U &=& k \boldsymbol{x}(t)^2/2 \\\\
\frac{d}{dt} \left(\frac{\partial T}{\partial \dot{x}} \right) &=& 
\ddot{x}/m + \ddot{\bar{X}}/m \\\\
\frac{\partial U}{\partial x} = k x(t) \\\\
\end{eqnarray}
$$
