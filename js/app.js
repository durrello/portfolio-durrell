/* Template Name: Cristino - Responsive Personal Template
   Author: Shreethemes
   Email: shreethemes@gmail.com
   Website: http://www.shreethemes.in
   Version: 1.9.0
   Created: May 2020
   File Description: Main JS file of the template
*/

/************************/
/*       INDEX          */
/*=======================
 *  01.  Loader         *
 *  02.  Menu           *
 *  03.  Scrollspy      *
 *  04.  Magnific Popup *
 *  05.  Owl Carousel   *
 *  06.  Back to top    *
 *  07.  Feather Icon   *
 =======================*/

// Preloader
window.onload = function loader() { 
    setTimeout(() => {
        document.getElementById('preloader').style.visibility = 'hidden';
        document.getElementById('preloader').style.opacity = '0';
        // Ensure Feather icons are replaced after all scripts/assets are loaded.
        // This fixes cases where `feather.replace()` was called before Feather finished loading.
        if (window.feather && typeof window.feather.replace === "function") {
            window.feather.replace();
        }
    }, 350);
} 


// Menu sticky
function windowScroll() {
    const navbar = document.getElementById("navbar");
    if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
    ) {
        navbar.classList.add("nav-sticky");
    } else {
        navbar.classList.remove("nav-sticky");
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})

// back-to-top
var mybutton = document.getElementById("back-to-top");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        console.log(document.body.scrollTop);
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Feather icon
// NOTE: `feather.replace()` must run after the Feather script is loaded.
// This file is included *before* the Feather script in `index.html`, so we retry.
(function initFeatherIcons() {
    var attempts = 0;
    var maxAttempts = 300; // ~30s (100ms interval)
    function tryReplace() {
        attempts++;
        try {
            var before = document.querySelectorAll('[data-feather]').length;
            if (window.feather && typeof window.feather.replace === "function") {
                window.feather.replace();
                var after = document.querySelectorAll('[data-feather]').length;
                // Feather should convert some [data-feather] elements into SVG.
                if (after < before) return;
            }
        } catch (e) {
            // Ignore and retry: icon rendering should never break the page.
        }
        if (attempts < maxAttempts) {
            setTimeout(tryReplace, 100);
        }
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", tryReplace);
    } else {
        tryReplace();
    }
})();

// Navbar Active Class
var spy = new Gumshoe('#navbar-navlist a', {
    // Active classes
    // navClass: 'active', // applied to the nav list item
    // contentClass: 'active', // applied to the content
    offset: 80
});
