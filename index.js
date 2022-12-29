window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").classList.remove('init');
        document.getElementById("navbar").classList.add('scrolled');
    } else {
        document.getElementById("navbar").classList.remove('scrolled');
        document.getElementById("navbar").classList.add('init');
    }
    if (document.body.scrollTop > 1600 || document.documentElement.scrollTop > 1600) {
        document.getElementsByClassName("nav1")[0].classList.remove('scaled')
        document.getElementsByClassName("nav2")[0].classList.remove('scaled')
        document.getElementsByClassName("nav3")[0].classList.add('scaled')
    } else if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {
        document.getElementsByClassName("nav1")[0].classList.remove('scaled')
        document.getElementsByClassName("nav3")[0].classList.remove('scaled')
        document.getElementsByClassName("nav2")[0].classList.add('scaled')
    } else if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementsByClassName("nav2")[0].classList.remove('scaled')
        document.getElementsByClassName("nav3")[0].classList.remove('scaled')
        document.getElementsByClassName("nav1")[0].classList.add('scaled')
    }
}