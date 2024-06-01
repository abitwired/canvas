var d=class{to;from;constructor(t,i){this.from=t,this.to=i}draw(t){t.beginPath(),t.moveTo(this.from.x,this.from.y),t.lineTo(this.to.x,this.to.y),t.stroke()}};var o=class{nodes=[];edges=[];addNode(t){this.nodes.push(t)}addEdge({from:t,to:i}){let h=new d(t,i);this.edges.push(h)}removeNode(t){this.nodes=this.nodes.filter(i=>i!==t),this.edges=this.edges.filter(i=>i.from!==t&&i.to!==t)}removeEdge(t){this.edges=this.edges.filter(i=>i!==t)}draw(t){this.nodes.forEach(i=>{i.draw(t)}),this.edges.forEach(i=>{i.draw(t)})}};var n=class{id;x;y;width;height;color;constructor({id:t,x:i,y:h,width:s=200,height:e=50,color:r="#444"}){this.id=t,this.x=i,this.y=h,this.width=s,this.height=e,this.color=r}static createId(){return Math.random().toString(36).substring(2)}draw(t){t.shadowColor="rgba(0, 0, 0, 0.2)",t.shadowBlur=10,t.shadowOffsetX=5,t.shadowOffsetY=5;let i=5;t.fillStyle=this.color,t.beginPath(),t.moveTo(this.x+i,this.y),t.lineTo(this.x+this.width-i,this.y),t.quadraticCurveTo(this.x+this.width,this.y,this.x+this.width,this.y+i),t.lineTo(this.x+this.width,this.y+this.height-i),t.quadraticCurveTo(this.x+this.width,this.y+this.height,this.x+this.width-i,this.y+this.height),t.lineTo(this.x+i,this.y+this.height),t.quadraticCurveTo(this.x,this.y+this.height,this.x,this.y+this.height-i),t.lineTo(this.x,this.y+i),t.quadraticCurveTo(this.x,this.y,this.x+i,this.y),t.closePath(),t.fill(),t.strokeStyle="white",t.lineWidth=1,t.stroke()}};var l=class{static serialize(t){let i=t.nodes.map(s=>({id:s.id,x:s.x,y:s.y,width:s.width,height:s.height,color:s.color})),h=t.edges.map(s=>({to:s.to.id,from:s.from.id}));return JSON.stringify({nodes:i,edges:h})}static deserialize(t){let{nodes:i,edges:h}=JSON.parse(t),s=new o;return i.forEach(e=>{s.addNode(new n({id:e.id,x:e.x,y:e.y,width:e.width,height:e.height,color:e.color}))}),h.forEach(e=>{let r=s.nodes.find(a=>a.id===e.from),g=s.nodes.find(a=>a.id===e.to);if(r&&g)s.addEdge({from:r,to:g});else throw new Error(`Invalid edge: ${e.from} -> ${e.to}`)}),s}};var f=class{canvas;ctx;graph;background;scale=1;offsetX=0;offsetY=0;isPanning=!1;startX=0;startY=0;constructor({canvas:t,background:i="#333"}){this.canvas=t,this.background=i,this.ctx=t.getContext("2d"),this.graph=new o,this.canvas.addEventListener("wheel",this.zoom.bind(this),{passive:!1}),this.canvas.addEventListener("mousedown",this.startPan.bind(this)),this.canvas.addEventListener("mousemove",this.pan.bind(this)),this.canvas.addEventListener("mouseup",this.endPan.bind(this)),this.canvas.addEventListener("mouseleave",this.endPan.bind(this)),this.resizeCanvas()}setGraph(t){this.graph=t,this.draw()}addNode({node:t}){this.graph.addNode(t),this.draw()}removeNode({node:t}){this.graph.removeNode(t),this.draw()}addEdge({edge:t}){this.graph.addEdge(t),this.draw()}removeEdge({edge:t}){this.graph.removeEdge(t),this.draw()}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()}startPan(t){this.isPanning=!0,this.startX=t.clientX-this.offsetX,this.startY=t.clientY-this.offsetY}pan(t){this.isPanning&&(this.offsetX=t.clientX-this.startX,this.offsetY=t.clientY-this.startY,this.draw())}endPan(){this.isPanning=!1}zoom(t){t.preventDefault();let i=1.1,h=this.canvas.getBoundingClientRect(),s=t.clientX-h.left,e=t.clientY-h.top,r=t.deltaY<0,g=(s-this.offsetX)/this.scale,a=(e-this.offsetY)/this.scale;this.scale*=r?i:1/i,this.offsetX=s-g*this.scale,this.offsetY=e-a*this.scale,this.draw()}drawBackground(){this.ctx.fillStyle=this.background,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="rgba(255, 255, 255, 0.1)";for(let i=-this.offsetX%25;i<this.canvas.width;i+=25)for(let h=-this.offsetY%25;h<this.canvas.height;h+=25)this.ctx.beginPath(),this.ctx.arc(i,h,1,0,2*Math.PI),this.ctx.fill()}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawBackground(),this.ctx.save(),this.ctx.translate(this.offsetX,this.offsetY),this.ctx.scale(this.scale,this.scale),this.graph.draw(this.ctx),this.ctx.restore()}};export{d as Edge,o as Graph,f as InfiniteCanvas,n as Node,l as Serializer};
//# sourceMappingURL=index.mjs.map