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
    for(var t = t0; t <= t1; t+= dt) {
	yield t;
    }
}

/**
 * google chart 用のデータ行を作成。
 * funcs は１変数関数の配列。先頭は x 軸の値を順次返すイテレータであること。
 */
function chartRows(funcs) {
    var rows = [];
    for(var t of funcs[0]) {
	var row = [];
	row.push(t);
	for(var i=1; i < funcs.length; i++) {
	    var val = funcs[i](t);
	    row.push(val);
	}
	rows.push(row);
    }
    return rows;
}

/**
 * google chart を描画する。
 * labelfuncs: [ラベル, X値のイテレータ, ラベル,関数, ...]
 * options: chart options
 * elchart: チャートを作成する element
 */
function chartDraw(labelfuncs, options, elchart) {
    var labels = [];
    var funcs = [];
    for(var i=0; i < labelfuncs.length/2; i++) {
	labels[i] = labelfuncs[2*i];
	funcs[i] = labelfuncs[2*i + 1];
    }
    var data = new google.visualization.DataTable();
    for(var label of labels) {
	data.addColumn('number', label);
    }
    var rows = chartRows(funcs);
    data.addRows(rows);
    if(! options.hAxis ) options.hAxis = {};
    options.hAxis.title= labels[0];
    var chart = new google.visualization.ScatterChart(elchart);
    chart.draw(data, options);
}

/**
 * 上の D_t のテストを兼ねてプロットする
 */
function diffTest() {
    var d_t = D_t(0.0001);
    var rgen = rangeGenerator(0, 3*Math.PI, 3*Math.PI/50);
    var labelfuncs = ["t", rgen, 
		      "f(t)=Math.cos(t)", Math.cos, 
		      "f'(t)", d_t(Math.cos),
		      "f''(t)", d_t(d_t(Math.cos))
];
    chartDraw(labelfuncs, {title: "diff example", width:750, chartArea:{width:450}}, elchart);
}

/**
 * 区間 [t0,t1] を分割数 ndiv で数値積分する定積分演算子を作成.
 *  Int_t(t0,t1,ndiv)(function (t){...}) 
 */
function Int_t(t0, t1, ndiv) {
    var dt = (t1 - t0)/ndiv;
    return function(func_t) {
	var t = t0 + 0.5*dt;
	var s = 0.0;
	for (var i = 0; i < ndiv; i++) {
            s += func_t(t);
	    t += dt;
	}
	return s * dt;
    };
}

function tetInt_t() {
    var int_t = Int_t(Math.PI/2, 100);
    var f = Math.sin;
    var intf = int_t(f);
    console.log("f=" + f + ", intf=" + intf);
}

/**
 * ラグランジアン lagrangian(x,v) に対する作用積分汎関数 S[x(t)] を作成
 */
function ActionIntegral(int_t, d_t, lagrangian) {
    return function(xt) {
	var dxdt = d_t(xt);
        var func_t = function(t) {
	    return lagrangian(xt(t), dxdt(t));
	};
	return int_t(func_t);
    };
}

function createTrialAction(W, kmin, kmax, deltak) {
    var t0 = 0.0, t1 = 1.0, ndiv = 200, dt= 0.0001;
    var int_t = Int_t(t0, t1, ndiv);
    var d_t = D_t(dt);
    var lagrangian = oscillator(1.0, W*W);

    // S[x(t)] を作成
    var action = ActionIntegral(int_t, d_t, lagrangian);

    // 試行関数 x(t;k) での作用積分 S(k)=S[x(t,k)] を算出する関数
    var trialAction = function(k) {
	var xt = function(t) {
	    return Math.sin(k*t)/Math.sin(k*t1);
	};
	return action(xt);
    };
    return trialAction;
}

/**
 * 角周波数 W の振動子の作用積分 S[x(t)]  を x(t0=0) = 0, x(t1=1) = 1
 * となる試行関数 x(t) で行う。
 * ここでは角周波数 w をパラメータとし x(t) = sin(w*t)/sin(w*t1)
 */
function tryAndPlot(W, kmin, kmax, deltak) {
    var t0 = 0.0, t1 = 1.0, ndiv = 200, dt= 0.0001;
    var int_t = Int_t(t0, t1, ndiv);
    var d_t = D_t(dt);
    var lagrangian = oscillator(1.0, W*W);

    // S[x(t)] を作成
    var action = ActionIntegral(int_t, d_t, lagrangian);

    // 試行関数 x(t;k) での作用積分 S(k)=S[x(t,k)] を算出する関数
    var trialAction = function(k) {
	var xt = function(t) {
	    return Math.sin(k*t)/Math.sin(k*t1);
	};
	return action(xt);
    };

    var rgen = rangeGenerator(kmin, kmax, deltak);
    var labelfuncs = ["k", rgen, 'S(k)', trialAction];
    chartDraw(labelfuncs, {title: "S(k)", width:750, chartArea:{width:450}}, elchart2);
}

function plotDsDk(W, kmin, kmax, deltak) {
    var trialAction = createTrialAction(W, kmin, kmax, deltak) ;
    var d_t = D_t(0.0001);
    var dsdk = d_t(trialAction);
    var ddsdk = d_t(dsdk);
    var rgen = rangeGenerator(kmin, kmax, deltak);
    var labelfuncs = ["k", rgen, 
		      'dS(k)/dk', dsdk,
//		      'ddS(k)/dkdk', ddsdk,
		     ];
    chartDraw(labelfuncs, {title: "S'(K),S''(K)", width:750, chartArea:{width:450}}, elchart3);
}


function plotLagrangian(W, ks, el) {
    var t0 = 0.0, t1 = 1.0, ndiv = 200, dt= 0.0001;
    var int_t = Int_t(t0, t1, ndiv);
    var d_t = D_t(dt);
    var lagrangian = oscillator(1.0, W*W);

    var rgen = rangeGenerator(0, 1.001, 0.05);
    var labelfuncs = ["t", rgen];
    for(let k of ks) {
	let xt = function(t) {
	    return Math.sin(k*t)/Math.sin(k*t1);
	};
	let lag_t = function(t) {
	    return lagrangian(xt(t), d_t(xt)(t));
	};
	labelfuncs.push("k=" + k);
	labelfuncs.push(lag_t);
    };

    chartDraw(labelfuncs, {title:"L(x(t), x'(t))", width:750, chartArea:{width:450}}, el);
}

