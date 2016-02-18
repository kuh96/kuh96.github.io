"use strict";

/**
 * 質量 M, バネ定数 K の振動子のラグランジュ関数 function(x,v) を作成
 */
function oscillator(M,K) {
    return function(x,v) {
	return 0.5*(M*v*v - K*x*x);
    };
}

/**
 * きざみ幅 dt で与えられた１変数関数を数値微分する微分演算子を作成
 */
function D_t(dt) {
    return function(func_t) {
	return function(t) {
	    return (func_t(t + 0.5*dt) - func_t(t - 0.5*dt)) / dt;
	};
    };
}

/**
 * t0 から dt ごとに t1 まで、順次値を返すイテレータ
 */
function* rangeGenerator(t0, t1, dt) {
    for(var t = t0; t 