"use strict";var m=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var x=(o,t)=>{for(var i in t)m(o,i,{get:t[i],enumerable:!0})},N=(o,t,i,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of E(t))!y.call(o,s)&&s!==i&&m(o,s,{get:()=>t[s],enumerable:!(e=w(t,s))||e.enumerable});return o};var C=o=>N(m({},"__esModule",{value:!0}),o);var D={};x(D,{Edge:()=>g,Graph:()=>d,InfiniteCanvas:()=>c,Node:()=>l,Serializer:()=>f});module.exports=C(D);var g=class{to;from;color="#fff";width=2;constructor(t,i){this.from=t,this.to=i}draw(t){let i=this.from.x+this.from.width,e=this.from.y+this.from.height/2,s=this.to.x,r=this.to.y+this.to.height/2;t.beginPath(),t.strokeStyle=this.color,t.lineWidth=this.width,t.moveTo(i,e);let a=s-i,h=r-e,n=Math.abs(h)*.5,u=i+a*.5,v=e+h*.5+(h>0?-n:n),p=i+a*.5,b=e+h*.5+(h>0?n:-n);t.bezierCurveTo(u,v,p,b,s,r),t.stroke()}};var d=class{nodes=[];edges=[];addNode(t){this.nodes.push(t)}getNode(t){return this.nodes.find(i=>i.id===t)}addEdge({from:t,to:i}){let e=new g(t,i);this.edges.push(e)}removeNode(t){this.nodes=this.nodes.filter(i=>i!==t),this.edges=this.edges.filter(i=>i.from!==t&&i.to!==t)}removeEdge(t){this.edges=this.edges.filter(i=>i!==t)}draw(t){this.edges.forEach(i=>{i.draw(t)}),this.nodes.forEach(i=>{i.draw(t)})}};var l=class{id;x;y;width;height;color;label;isHovered=!1;isDragging=!1;dragOffsetX=0;dragOffsetY=0;constructor({id:t,x:i,y:e,width:s=200,height:r=50,label:a="",color:h="#444"}){this.id=t,this.x=i,this.y=e,this.width=s,this.height=r,this.label=a,this.color=h}onDragStart(t,i){this.isDragging=!0,this.dragOffsetX=t-this.x,this.dragOffsetY=i-this.y}onDragEnd(){this.isDragging=!1,this.dragOffsetX=0,this.dragOffsetY=0}onDrag(t,i){this.x=t-this.dragOffsetX,this.y=i-this.dragOffsetY}hoverOn(){this.isHovered=!0}hoverOff(){this.isHovered=!1}static createId(){return Math.random().toString(36).substring(2)}containsPoint(t,i){return t>=this.x&&t<=this.x+this.width&&i>=this.y&&i<=this.y+this.height}draw(t){this.drawRectangle(t),this.drawLabel(t)}drawRectangle(t){t.shadowColor="rgba(0, 0, 0, 0.2)",t.shadowBlur=10,t.shadowOffsetX=5,t.shadowOffsetY=5;let i=5;t.fillStyle=this.color,t.beginPath(),t.moveTo(this.x+i,this.y),t.lineTo(this.x+this.width-i,this.y),t.quadraticCurveTo(this.x+this.width,this.y,this.x+this.width,this.y+i),t.lineTo(this.x+this.width,this.y+this.height-i),t.quadraticCurveTo(this.x+this.width,this.y+this.height,this.x+this.width-i,this.y+this.height),t.lineTo(this.x+i,this.y+this.height),t.quadraticCurveTo(this.x,this.y+this.height,this.x,this.y+this.height-i),t.lineTo(this.x,this.y+i),t.quadraticCurveTo(this.x,this.y,this.x+i,this.y),t.closePath(),t.fill(),t.strokeStyle="white",t.lineWidth=this.isHovered?2:1,t.stroke()}drawLabel(t){t.fillStyle="white",t.font="bold 20px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(this.label,this.x+this.width/2,this.y+this.height/2),t.shadowColor="rgba(0, 0, 0, 0.2)",t.shadowBlur=5,t.shadowOffsetX=2,t.shadowOffsetY=2}};var f=class{static serialize(t){let i=t.nodes.map(s=>({id:s.id,x:s.x,y:s.y,width:s.width,height:s.height,color:s.color})),e=t.edges.map(s=>({to:s.to.id,from:s.from.id}));return JSON.stringify({nodes:i,edges:e})}static deserialize(t){let{nodes:i,edges:e}=JSON.parse(t),s=new d;return i.forEach(r=>s.addNode(new l(r))),e.forEach(r=>{let a=s.nodes.find(n=>n.id===r.from),h=s.nodes.find(n=>n.id===r.to);if(a&&h)s.addEdge({from:a,to:h});else throw new Error(`Invalid edge: ${r.from} -> ${r.to}`)}),s}};var c=class{canvas;ctx;graph;background;scale=1;offsetX=0;offsetY=0;isPanning=!1;startX=0;startY=0;isDragging=!1;minZoom=.1;maxZoom=10;constructor({canvas:t,background:i="#333",minZoom:e=.1,maxZoom:s=10}){this.canvas=t,this.background=i,this.minZoom=e,this.maxZoom=s,this.ctx=t.getContext("2d"),this.graph=new d,this.canvas.addEventListener("wheel",this.zoom.bind(this)),this.canvas.addEventListener("mousedown",this.startPan.bind(this)),this.canvas.addEventListener("mousemove",this.pan.bind(this)),this.canvas.addEventListener("mouseup",this.endPan.bind(this)),this.canvas.addEventListener("mouseleave",this.endPan.bind(this)),this.canvas.addEventListener("mousemove",this.hover.bind(this)),this.canvas.addEventListener("mousedown",this.startDrag.bind(this)),this.canvas.addEventListener("mousemove",this.drag.bind(this)),this.canvas.addEventListener("mouseup",this.dragEnd.bind(this)),this.resizeCanvas()}setGraph(t){this.graph=t,this.draw()}addNode({node:t}){this.graph.addNode(t),this.draw()}removeNode({node:t}){this.graph.removeNode(t),this.draw()}addEdge({edge:t}){this.graph.addEdge(t),this.draw()}removeEdge({edge:t}){this.graph.removeEdge(t),this.draw()}getNode(t){return this.graph.getNode(t)}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()}hover(t){let{x:i,y:e}=this.getMouseCoordinates(t);this.graph.nodes.forEach(r=>{r.hoverOff()});let s=this.graph.nodes.findLast(r=>{if(r.containsPoint(i,e))return r});s&&(this.isDragging=!0,s.hoverOn()),this.draw()}drag(t){if(!this.isDragging)return;let{x:i,y:e}=this.getMouseCoordinates(t);this.graph.nodes.filter(s=>s.isDragging).forEach(s=>s.onDrag(i,e)),this.draw()}dragEnd(){this.isDragging=!1,this.graph.nodes.forEach(t=>t.onDragEnd()),this.draw()}startDrag(t){this.isDragging=!1;let{x:i,y:e}=this.getMouseCoordinates(t),s=this.graph.nodes.findLast(r=>{if(r.containsPoint(i,e))return r});s&&(this.isDragging=!0,s.onDragStart(i,e),this.draw())}startPan(t){this.isPanning=!0,this.startX=t.clientX-this.offsetX,this.startY=t.clientY-this.offsetY}pan(t){!this.isPanning||this.isDragging||(this.offsetX=t.clientX-this.startX,this.offsetY=t.clientY-this.startY,this.draw())}endPan(){this.isPanning=!1}getMouseCoordinates(t){let i=this.canvas.getBoundingClientRect(),e={x:(t.clientX-i.left)/(i.right-i.left)*this.canvas.width,y:(t.clientY-i.top)/(i.bottom-i.top)*this.canvas.height},s=(e.x-this.offsetX)/this.scale,r=(e.y-this.offsetY)/this.scale;return{x:s,y:r}}zoom(t){t.preventDefault();let i=1.1,e=this.canvas.getBoundingClientRect(),s=t.clientX-e.left,r=t.clientY-e.top,a=t.deltaY<0,h=(s-this.offsetX)/this.scale,n=(r-this.offsetY)/this.scale;this.scale*(a?i:1/i)<this.minZoom||this.scale*(a?i:1/i)>this.maxZoom||(this.scale*=a?i:1/i,this.offsetX=s-h*this.scale,this.offsetY=r-n*this.scale,this.draw())}drawBackground(){this.ctx.fillStyle=this.background,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="rgba(255, 255, 255, 0.1)";for(let i=-this.offsetX%25;i<this.canvas.width;i+=25)for(let e=-this.offsetY%25;e<this.canvas.height;e+=25)this.ctx.beginPath(),this.ctx.arc(i,e,1,0,2*Math.PI),this.ctx.fill()}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawBackground(),this.ctx.save(),this.ctx.translate(this.offsetX,this.offsetY),this.ctx.scale(this.scale,this.scale),this.graph.draw(this.ctx),this.ctx.restore()}};0&&(module.exports={Edge,Graph,InfiniteCanvas,Node,Serializer});
//# sourceMappingURL=index.js.map