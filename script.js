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
    
}

loaderAnimation();

// cursorAnimation

function cursorAnimation() {
    // moving cursur

    document.addEventListener("mousemove",function (detail) {
        // console.log("hello");
        // console.log(detail);
        gsap.to("#crsr",{
            left:detail.x,
            top:detail.y,
        }) 
    })

    // magnet effect

    Shery.makeMagnet("#nav svg ,#nav-part2 h4",);
    // Shery.makeMagnet("#nav svg",);
    
}

cursorAnimation();


