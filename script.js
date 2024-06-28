// locomotive scrolltriger codepen code in locomotiveAnimation
function locomotiveAnimate() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    
}

//loading Animation 
function loaderAnimation() {

    let tl = gsap.timeline();

    tl.from(".line #count h5,h6",{
        opacity:0,
        duration:0.8,
        delay:0.6,
        onStart:function () {
            let count = document.querySelector("#count h5");
            let grow = 0;
            setInterval(() => {

                if (grow<100) {
                    count.innerHTML=grow++;
                    // console.log(grow++);      
                } else {
                    // console.log("100");
                    count.innerHTML=100;

                }
        
            }, 45);        
        }
        
    })

    tl.from(".line h1,h2",{
        y:150,
        stagger:0.25,
        duration:0.6,
        // delay:0.5

    })

    tl.to(".line h2",{
        onStart:function () {
            
            let now = document.querySelector(".line h2")
            let tmp =0;
            let x = setInterval(() => {
                // now.innerHTML= "font-family: 'silkserif-lightitalic';";
                // console.log(now);
                // how to change css----->>>>>>
                // now.style.color="pink";
                if (tmp%2==0) {
                    // now.style.fontFamily ="silkserif-lightitalic";
                    now.style.fontFamily ="MarquesfreeOutlineitalic";
                    now.style.fontWeight = 300;

                    tmp++; 
                    // console.log(tmp);  
                }
                else{
                    tmp++;
                    now.style.fontFamily ="plain-light";
                    // console.log(tmp);  


                }

                if (tmp==6) {
                    clearInterval(x);
                    // console.log(tmp);  

                }
                
            }, 1000);

            
        }
    })

    tl.to("#loader",{
        opacity:0,
        duration:0.2,
        delay:5.6
    })


    tl.from("#page1",{
        delay:0.2,
        y:1600,
        duration:0.4,
        opacity:0,
        ease:Power4.easeOut
    })

    tl.to("#loader",{
        display:"none"
    })

    tl.from("#nav",{
        opacity:0
    })

    tl.from("#hero1 h1, #hero2 h1 ,#hero3 h1, #hero4 h1 ",{
        y:120,
        stagger:0.2,
    })

    // #heor1 and page2 ki visiblity 0 se 1 hogi iss animation main  -=1.2 "itne time pehle 
    // hogi"
    tl.from("#hero1 ,#page2 ",{
        opacity:0,
    },"-=1.2")
    
}
loaderAnimation();


// cursorAnimation
function cursorAnimation() {
    // moving cursur

    // document.addEventListener("mousemove",function (detail) {
    //     // console.log("hello");
    //     // console.log(detail);
    //     gsap.to("#crsr",{
    //         left:detail.x,
    //         top:detail.y,
    //     }) 
    // })

    Shery.mouseFollower({
        skew:true,
        ease:"cubic-bezier(0.23, 1, 0.320, 1)",
        duration:1,
    })

    // magnet effect

    Shery.makeMagnet("#nav svg ,#nav-part2 h4",);
    // Shery.makeMagnet("#nav svg",);
    

    // video-container
    let videoContainer = document.querySelector("#video-container")
    let video = document.querySelector("#video-container video")
    videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0
                // display:"none"
            })

            gsap.to("#video-cursur",{
                left:dets.x - 570,
                y:dets.y - 300
            })
        })
    })
    
    videoContainer.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            opacity:1,
            // display: "initial",
        })

        gsap.to("#video-cursur",{
            left:"70%",
            top:"-15%"
            // bottom:"70%"
        })
        
    })

    let flag=0
    videoContainer.addEventListener("click",function(){
        if (flag==0) {
            // alert("heelo")
            video.play()
            video.style.opacity = 1  
            document.querySelector("#video-cursur").innerHTML='<i class="ri-pause-line"></i>'
            gsap.to("#video-cursur",{
                scale:0.5
            })    
            flag=1 
        } else {

            video.pause()
            video.style.opacity = 0  
            document.querySelector("#video-cursur").innerHTML='<i class="ri-play-fill"></i>'
            gsap.to("#video-cursur",{
                scale:1
            })    
            flag=0
        }  
    })
}
cursorAnimation();

// calling locomotiveAnimate
locomotiveAnimate();

// Shery Animation for page 3 images
function sheryAnimation() {
    Shery.imageEffect(".image-div",{
        style:6,
        // debug:true,
        // config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.79,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.68,"range":[0,10]},"metaball":{"value":0.46,"range":[0,2]},"discard_threshold":{"value":0.56,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.34,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}},
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8275852666356812},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.49,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.3,"range":[0,10]},"metaball":{"value":0.5,"range":[0,2]},"discard_threshold":{"value":0.77,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.61,"range":[0,2]},"noise_scale":{"value":6.87,"range":[0,100]}},
        gooey:true
    })
}
sheryAnimation();

document.addEventListener("mousemove",function(dets) {
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y
    })
})

let hero3 = document.querySelector("#hero3")
hero3.addEventListener("mouseenter",function() {
    gsap.to("#flag",{
        opacity:1
    })
})

hero3.addEventListener("mouseleave",function() {
    gsap.to("#flag",{
        opacity:0
    })
})
