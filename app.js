import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Player from '@vimeo/player';
import Splide, { RequestInterval } from "@splidejs/splide";


var Qe = gsap;
var Sc = ScrollTrigger;



(() => {
  
    var navinit = function () {
      const toggleBtn = document.querySelector(".dp-menu-toggle"),
        backdrop = document.querySelector(".dp-menu-backdrop"),
        menuFill = document.querySelector(".dp-menu-textdrop"),
        menuContent = document.querySelector(".dp-menu-content"),
        menuBox = document.querySelector(".dp-menu-box"),
        menu = document.querySelector(".dp-menu");
  
      var opened = false;
  
      
      var tlShow = Qe.timeline({ paused: true });
      tlShow.set(menuBox, { display: "block" }, 0);
      tlShow.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
      tlShow.fromTo(
        menuFill,
        { scaleX: 0 },
        { scaleX: 1, ease: "expo.out", duration: 1 },
        0
      );
      tlShow.fromTo(
        menuContent,
        { xPercent: 50 },
        { xPercent: 0, ease: "expo.out", duration: 1 },
        0
      );
      tlShow
        .fromTo(menuContent, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
        .reverse();
  
      var bindToggle = function () {
        toggleBtn.addEventListener("click", function () {
          toggle();
        });
  
        backdrop.addEventListener("click", function () {
          hide();
        });
      };
  
      var toggle = function () {
        opened ? hide() : show();
      };
  
      var show = function () {
        menu.classList.add("-open");
        tlShow.timeScale(1).play();
        document.body.classList.add("overflow-y-hidden");
        opened = true;
      };
  
      var hide = function () {
        menu.classList.remove("-open");
        tlShow.timeScale(1.1).reverse();
        document.body.classList.remove("overflow-y-hidden");
        opened = false;
      };
  
      bindToggle();
    };
  
    var vimeoModal = () => {
      const videoItems = document.querySelectorAll(".rp-video-item"),
        modalContainer = document.querySelector(".rp-video-modal"),
        iframe = document.querySelector("#rp-modal"),
        modalBackdrop = document.querySelector(".rp-modal-backdrop");
      let vplayer = null;
  
      if (videoItems.length === 0) {
        return;
      }
      videoItems.forEach((videoItem) => {
        videoItem.addEventListener("click", () => {
          const dataVideo = videoItem.getAttribute("data-player");
          iframe.src = `https://player.vimeo.com/video/${dataVideo}?autoplay=1&muted=0`;
  
          vplayer = new Player(iframe);
          vplayer.ready().then(() => {
            vplayer.play();
          });
  
          modalContainer.classList.add("-open");
          opened = true;
        });
      });
  
      modalBackdrop.onclick = function () {
        modalContainer.classList.remove("-open");
        opened = false;
        if (vplayer) {
          vplayer
            .pause()
            .then(() => {
              iframe.src = "";
            })
            .catch((error) => {
              console.error("Error pausing the video", error);
            });
        }
      };
    };

    var homeModal =  () => {

      const e = document.getElementById('player'),
        t = document.getElementById('play'),
        o = document.querySelector("[video-modal]"),
        a = document.getElementById("pause");


  if (!e || !t || !o || !a) {
    console.error("One or more elements not found");
    return;
  }

        var close = () => {
          e.pause(), Qe.to(o, {
            autoAlpha: 0,
            duration: .3,
            ease: "power2.out"
          })
        };

        t.addEventListener("click", function () {
          e.play(), Qe.to(o, {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power1.easeInOut"
          });
        });
        a.addEventListener("click", function () {
          close()}),
        e.addEventListener("webkitendfullscreen", function () {
          close();
        });
      }


      var splideInit = () => {
        const els = document.querySelectorAll(".splide");
        
        if (!els.length) {
          return;
        }

        els.forEach((t) => {

          new Splide( t, {
            start: 0,  
            perPage: "auto",
            perMove: 1,
            autoplay: !1,
            interval: 2500,
            type   : 'loop',
            focus  : 'left',
            flickPower: 450 ,
            pagination: false,
            autoHeight: !0,
            breakpoints: {
              767: {
                perPage: 1,
              }
            }
          } ).mount();

        })

        
      }
  
    document.addEventListener("DOMContentLoaded", () => {
      navinit(), vimeoModal(), homeModal(), splideInit();

      
      
      
      $('.fake-arrow').click(function() {
        $('.splide__arrow.splide__arrow--next').click();
      });
  
      

      $('.link_container').hover(function() {
        let textOne = $(this).find('.link_textt').eq(0).text();
        $(this).find('.link_textt.is--2').text(textOne);
      });
      
      $('.link_container').hover(function() {
          $(this).find('.li_circle').toggleClass('selected-toggle');
      });

      $('.li-btn').hover(function() {
        let textOne = $(this).find('.link_textt').eq(0).text();
        $(this).find('.link_textt.is--2').text(textOne);
      });
      
      $('.li-btn').hover(function() {
        $(this).closest('.li-btn').toggleClass('selected-toggle');
      });

    });
  
    
  
    var logoMarquee = function () {
      const item = document.querySelector(".rp-marquee-item");

      if (item ===0 ) {
        return;
      }

      let object = {
        value: 1,
      };
    
      let tlMarque = Qe.timeline({ repeat: -1 });
      tlMarque.fromTo(
        item,
        {
          xPercent: 0,
        },
        {
          xPercent: -50,
          duration: 60,
          ease: "none",
        }
      );
    
      $(".rp-marquee-item").on("mouseenter", function () {
        Qe.fromTo(
          object,
          {
            value: 1,
          },
          {
            value: 0,
            duration: 1.2,
            onUpdate: () => {
              tlMarque.timeScale(object.value);
            },
          }
        );
      });
    
      $(".rp-marquee-item").on("mouseleave", function () {
        Qe.fromTo(
          object,
          {
            value: 0,
          },
          {
            value: 1,
            duration: 1.2,
            onUpdate: () => {
              tlMarque.timeScale(object.value);
            },
          }
        );
      });
    }; 

    logoMarquee();

    window.addEventListener("pagehide", function () {
        return window.scrollTo(0, 0);
      });
  })();
  
