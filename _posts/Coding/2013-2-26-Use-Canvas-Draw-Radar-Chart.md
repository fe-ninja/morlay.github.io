---
layout: post
title: 用 Canvas 绘制雷达图
category : Coding
tags: Canvas HTML5
---


偷懒 ……

效果：

![](/images/Coding/canvasRadarChart.png)

代码如下： 

<!-- break -->

html：

	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<canvas id="canvas" height="500" width="500"></canvas>
	</body>

	<script src="script.js"></script>
	</html>


script.js
	

	/* RadarChart 类 */
	var RadarChart = function(canvasId,data,size){
		this.ctx = document.getElementById(canvasId).getContext('2d');	
		this.data = data;
		this.num = this.data.length;
		this.dataForDraw = [];
		this.size=size;	
		this.center=size/2;	
	};
	RadarChart.prototype.draw=function(){
		/* 清除 */
		this.ctx.clearRect(0,0,this.size,this.size);
		/* 开始绘制 */
		this.getDataForDraw();		
		this.drawBackground();
		this.drawData();
	};
	RadarChart.prototype.getDataForDraw=function(){			
		var _phi = 2 * Math.PI / this.num;
		this.dataForDraw = this.data;
		for (var i = 0; i < this.num; i++) {
			this.dataForDraw[i].phi = Math.PI / 2 * 3 +_phi * i;
		};
	};
	RadarChart.prototype.drawBackground=function(){
		 /* 绘制背景 */
		var maxR= this.center - 20;

		this.ctx.beginPath();
		
		/* 设置线宽 */
		this.ctx.lineWidth = 2;
		/* 设置颜色 */
		this.ctx.strokeStyle = "#666";
		/* 设置字体样式 */
		this.ctx.font = "13px serif";


		/* 绘制射线及文字标注 */
		for (var i = 0,j; j = this.dataForDraw[i]; i++) {
		    this.ctx.moveTo(this.center, this.center);
		    this.ctx.lineTo(this.center + this.getX(maxR,j.phi), this.center + this.getY(maxR,j.phi));
		    this.ctx.fillText(j.title,
            this.center + this.getX(maxR + 14,j.phi) - 13,
            this.center + this.getY(maxR + 14,j.phi) + 5);

		}

		/* 绘制蜘蛛网 */
		var level=5;
		for (var k = 1; k <= level; k++) {
			this.ctx.moveTo(this.center + this.getX(maxR/level*k,this.dataForDraw[this.num-1].phi) , 
				this.center + this.getY(maxR/level*k,this.dataForDraw[this.num-1].phi));
			for (var i = 0, j; j = this.dataForDraw[i]; i++) {
		    this.ctx.lineTo(this.center + this.getX(maxR/level*k,j.phi) ,
		        this.center + this.getY(maxR/level*k,j.phi));		  
			}
		};

		this.ctx.closePath();
		this.ctx.stroke();	

	};

	RadarChart.prototype.drawData=function(){
		 /* 绘制数据 */
        /* 获取 最大 半径*/
		var scale = this.dataForDraw[0].value;
		for (var i = 1, j; j = this.dataForDraw[i]; i++) {
		    if (j.value > scale) {
		        scale = j.value;
		    }
		}
		scale =  (this.center - 20) / scale;

		this.ctx.beginPath();
		
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = "#F00";


		this.ctx.moveTo(this.center + Math.cos(this.dataForDraw[this.num-1].phi) * this.dataForDraw[this.num-1].value * scale, this.center + Math.sin(this.dataForDraw[this.num-1].phi) * this.dataForDraw[this.num-1].value * scale);
		for (var i = 0, j; j = this.dataForDraw[i]; i++) {
		    this.ctx.lineTo(this.center + Math.cos(j.phi) * j.value * scale, this.center + Math.sin(j.phi) * j.value * scale);
		}
		this.ctx.closePath();
		this.ctx.stroke();
	};
	RadarChart.prototype.getX=function(r,phi){
		return Math.cos(phi) * r;		
	};
	RadarChart.prototype.getY=function(r,phi){
		return Math.sin(phi) * r;		
	};


	/* 测试数据 */
	var data = [
		{"value":10,"title":"值1"},
		{"value":12,"title":"值2"},
		{"value":32,"title":"值3"},
		{"value":11,"title":"值4"},
		{"value":7,"title":"值5"},
		{"value":9,"title":"值6"}
	];
	/* 绘制 */
	var radarTest = new RadarChart('canvas', data , 200);
	radarTest.draw();
