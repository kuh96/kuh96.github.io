title: JavaScript の正しい覚え方
date: 2015-06-23 22:45
tags:
---

## 万物は Map である

JavaScript の基本構造は　Map （連想配列）です。
もちろん他に、数値、配列、いくつかの組み込みクラス・モジュール（Mathなど）、
いくつかの組み込みオブジェクト (Stringなど）があります。
関数オブジェクトについては後述。

```javascript
 var map = {name: 'whoami'}; // Mapのリテラル表現
 console.log(map);
 
```


## グローバル Map

