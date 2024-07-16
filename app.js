import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { Vimeo } from "vimeo";


var Qe = gsap;
var Sc = ScrollTrigger;


// alert("loaded"); //

(() => {
    var navinit = function () {
      const toggleBtn = document.querySelector(".dp-menu-toggle"),
        backdrop = document.querySelector(".dp-menu-backdrop"),
        menuFill = document.querySelector(".dp-menu-textdrop"),
        menuContent = document.querySelector(".dp-menu-content"),
        menuBox = document.querySelector(".dp-menu-box"),
        menu = document.querySelector(".dp-menu");
  
      var opened = false;
  
      // Timeline for showing the menu
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
  
          vplayer = new Vimeo.Player(iframe);
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
  
    document.addEventListener("DOMContentLoaded", () => {
      navinit(), vimeoModal();
  
      Webflow.push(function () {
        $(".rp-video-item").click(function (e) {
          e.preventDefault();
          $("body").css("overflow", "hidden");
        });
  
        $(".rp-modal-backdrop").click(function (e) {
          e.preventDefault();
          $("body").css("overflow", "auto");
        });
  
        // New code starts here
        $("#play").on("click", function () {
          let videoPop = $("[video-modal]");
          Qe.to(videoPop, {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power1.easeInOut",
          });
        });
  
        $("#pause").on("click", function () {
          let videoPop = $("[video-modal]");
          Qe.to(videoPop, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power1.easeInOut",
          });
        });
  
        Webflow.push(function () {
          $("#play").click(function (e) {
            e.preventDefault();
            $("body").css("overflow", "hidden");
          });
  
          $("#pause").click(function (e) {
            e.preventDefault();
            $("body").css("overflow", "auto");
          });
        });
  
        let e = document.getElementById("player"),
          t = document.getElementById("play"),
          o = $("[video-modal]"),
          a = document.getElementById("pause");
        t.addEventListener("click", function () {
          e.play();
        }),
          a.addEventListener("click", function () {
            e.pause(), (e.currentTime = 0);
          }),
          e.addEventListener("webkitendfullscreen", function () {
            e.pause(),
              (e.currentTime = 0),
              Qe.to(o, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power1.easeInOut",
              });
          });
        // New code ends here
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
  
    
  
    let object = {
      value: 1,
    };
  
    let tlMarque = Qe.timeline({ repeat: -1 });
    tlMarque.fromTo(
      ".rp-marquee-item",
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

    window.addEventListener("pagehide", function () {
        return window.scrollTo(0, 0);
      });
  })();
  
