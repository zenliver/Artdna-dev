// Code by zenliver
// 项目名称

$(function () {

    // 全局变量
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // 给当前页的顶部导航项添加active样式
    var currentPagePath=location.pathname.slice(1);
    console.log(currentPagePath);
    var navbarHrefs=new Array();
    var navbarLinks=$(".nav.navbar-nav li a");
    for (var i = 0; i < navbarLinks.length; i++) {
        navbarHrefs[i]=navbarLinks.eq(i).attr("href");
        console.log(navbarHrefs);
    }
    for (var n = 0; n < navbarLinks.length; n++) {
        if (navbarHrefs[n].indexOf(currentPagePath)>=0) {
            // navbarHrefs[n].slice(0,-5)
            if (currentPagePath != "") {
                $(".nav.navbar-nav li").removeClass("active");
                $(".nav.navbar-nav li a").eq(n).parent().addClass("active");
                break;
            }
        }
        else {
            $(".nav.navbar-nav li").removeClass("active");
        }
    }

    // 手机下折叠菜单添加动画效果
    var navbarLis=$(".navbar-nav li");
    var animationDelay=0;
    for (var i = 0; i < navbarLis.length; i++) {
        navbarLis.eq(i).css("animation-delay",animationDelay+"s");
        animationDelay=animationDelay+0.05;
    }
    $(".navbar-toggle").click(function () {
        $(".navbar-nav li").toggleClass("animated fadeInUp");
        // $(".navbar-nav li").animateCss("fadeInUp");
    });

    // modal垂直居中
    $(window).load(function () {
        $(".modal-dialog").each(function () {
            var modalHeight = $(this).actual("height");
            console.log(modalHeight);
            $(this).css({
                "margin-bottom": "0",
                "margin-top": (screenHeight-modalHeight)/2+"px"
            });
        });
    });

    // 返回顶部
    $(window).load(function () {
        var elevator = new Elevator({
            element: document.querySelector(".footer-backtotop img"),
            duration: 600, // milliseconds
            endCallback: function () {
                // $("body").animateCss("bounce");
            }
        });
    });

    // 点击折叠菜单按钮的动画效果
    $("#header .navbar-toggle").click(function () {
        $(this).toggleClass("collapse_menu_close");
    });

    // 多语言切换active效果
    var pageUrl = window.location.href;
    if (pageUrl.indexOf("?lang=") < 0) {
        $(".lang_eng").addClass("active");
    } else if (pageUrl.indexOf("?lang=arb") >= 0) {
        // $(".navbar_lang_wrapper a").removeClass("active");
        $(".lang_arb").addClass("active");
    } else if (pageUrl.indexOf("?lang=ru") >= 0) {
        // $(".navbar_lang_wrapper a").removeClass("active");
        $(".lang_ru").addClass("active");
    } else if (pageUrl.indexOf("?lang=spn") >= 0) {
        // $(".navbar_lang_wrapper a").removeClass("active");
        $(".lang_spn").addClass("active");
    }

    // 删除当前语言项的链接
    $(".navbar_lang_wrapper a.active").removeAttr("href");

    // 移动当前语言项到第一个
    $(".navbar_lang_wrapper a.active").prependTo($(".navbar_lang_wrapper"));

    // Pad竖屏以下多语言切换效果
    if (screenWidth < 992) {
        $("#header .navbar_lang a.active").on("click",function () {
            $(this).siblings().toggleClass("show");
        });

        // 点击空白区域关闭其他语言
        $(document).click(function (e) {
            // console.log(e.target);
            // console.log($(".navbar_lang_wrapper a.active img")[0]);
            if (e.target != $(".navbar_lang_wrapper a.active img")[0]) {
                $(".navbar_lang_wrapper a.active").siblings().removeClass("show");
            }
        });

    }

    // 首页swiper
    var indexSlideSwiper = new Swiper ('#index_slides .swiper-container', {
        // direction: 'vertical',
        // slidesPerView: 4,
        // spaceBetween: 50,

        // pagination
        pagination: '#index_slides .swiper-pagination',
        paginationClickable: true,

        // navigation arrows
        nextButton: '#index_slides .swiper-button-next',
        prevButton: '#index_slides .swiper-button-prev',

        // slides play options
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 800

        // scrollbar
        // scrollbar: '.swiper-scrollbar'
    });

    // 首页底部newsletter区域宽度和高度自适应
    if (screenWidth >= 768) {
        $(window).load(function () {
            var indexMainItemImgWidth = $(".index_main_item a img").width();
            var indexMainItemImgHeight = $(".index_main_item a img").height();
            $(".index_main_newsletter").css({
                "width": indexMainItemImgWidth+"px",
                "height": indexMainItemImgHeight+"px"
            });
        });
    } else {
        $(window).load(function () {
            var indexMainItemImgWidth = $(".index_main_item a img").width();
            // var indexMainItemImgHeight = $(".index_main_item a img").height();
            $(".index_main_newsletter").css({
                "width": indexMainItemImgWidth+"px"
                // "height": indexMainItemImgHeight+"px"
            });
        });
    }

    // 首页底部newsletter input focus时自动切换后面的小图标
    $(".index_main_newsletter_form .form-group input.form-control").focus(function () {
        $(".index_main_newsletter_form .form-group .btn.btn-default").addClass("input_focus");
    });
    $(".index_main_newsletter_form .form-group input.form-control").blur(function () {
        $(".index_main_newsletter_form .form-group .btn.btn-default").removeClass("input_focus");
    });
    $(".index_main_newsletter_form .form-group .btn.btn-default").click(function () {
        // $(this).addClass("input_focus");
    });


    // sr动画

        // 启动sr
        window.sr = ScrollReveal({
            reset: true,
            mobile: true,
            easing: 'ease',
            distance: '30px',
            scale: 1
        });



});
