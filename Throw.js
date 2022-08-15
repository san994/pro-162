AFRAME.registerComponent("bowling-ball",{
    init:function(){
     this.rollBall()
    },
    rollBall:function(){
        window.addEventListener("keydown",(e)=> {
           if(e.key === "z"){
             var ball = document.createElement("a-entity");
             ball.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.5
             });
             ball.setAttribute("material",{color:"black"});
             ball.setAttribute("visible",true);
             ball.setAttribute("dynamic-body",{shape:"sphere",mass:0});

             var camera = document.querySelector("#camera");
             pos = camera.getAttribute("position");
             ball.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});

             var camera3D = document.querySelector("#camera").object3D;
             var direction = new THREE.Vector3();

             camera3D.getWorldDirection(direction);
             ball.setAttribute("velocity",direction.multiplyScalar(-10));
             ball.addEventListener("collide",this.removeBall);
             var scene = document.querySelector("#scene");
             scene.appendChild(ball);
           }
        })  
    },
    removeBall:function(e){
       var element = e.detail.target.el;
       var elementHit = e.detail.body.el;

       if(elementHit.id.includes("box")){
          elementHit.setAttribute("materail",{opacity:0,transparent:true})
       }

       var impulse = new CANNON.Vec3(-2,2,1);
       var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));

       elementHit.body.applyImpulse(impulse,worldPoint);
       element.removeEventListener("collide",this.removeBall);

       var scene = document.querySelector("#scene");
       scene.removeChild(element);
    }
})