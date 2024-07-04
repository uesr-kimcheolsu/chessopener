function See(classy) {
    const heads = document.querySelectorAll(classy);
    heads.forEach(head => {
        head.style.opacity = 1;
        head.style.zIndex = 2;
    });}
function Unsee(classy) {
    const heads = document.querySelectorAll(classy);
    heads.forEach(head => {
        head.style.opacity = 0.4;
        head.style.zIndex = 1;
    });}