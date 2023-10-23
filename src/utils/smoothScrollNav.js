export function smoothScrollNav() {
document.addEventListener('DOMContentLoaded', function(){
    var contentSection = document.querySelectorAll('.content-section');
    var navigation = document.querySelector('nav');
    
    // When a nav link is clicked, smooth scroll to the section
    navigation.addEventListener('click', function(event){
        if(event.target.tagName.toLowerCase() === 'a') {
            event.preventDefault(); // Prevents previous event
            smoothScroll(event.target.hash);
        }
    });
    
    // Update navigation on scroll
    window.addEventListener('scroll', function(){
        updateNavigation();
    });
    
    // ...and when the page starts
    updateNavigation();
    
    /////FUNCTIONS
    function updateNavigation(){
        contentSection.forEach(function(section){
            var sectionName = section.getAttribute('id');
            var navigationMatch = document.querySelector('nav a[href="#' + sectionName + '"]');
            if( (section.offsetTop - window.innerHeight/2 < window.scrollY) &&
                (section.offsetTop + section.offsetHeight - window.innerHeight/2 > window.scrollY))
            {
                navigationMatch.classList.add('active-section');
            }
            else {
                navigationMatch.classList.remove('active-section');
            }
        });
    }
    function smoothScroll(target){
        var targetElement = document.querySelector(target);
        var topOffset = targetElement.offsetTop;
        window.scroll({
            top: topOffset,
            behavior: 'smooth'
        });
    }
});
}