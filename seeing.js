function See(classy) {
    const heads = document.querySelectorAll(classy);
    heads.forEach(head => {head.style.opacity = 1;});}
function Unsee(classy) {
    const heads = document.querySelectorAll(classy);
    heads.forEach(head => {head.style.opacity = 0.4;});}