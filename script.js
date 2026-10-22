// 1. Show a placeholder when an image is missing from the /images folder
document.querySelectorAll('.card img').forEach(function (img) {
  function showPlaceholder() {
    var box = document.createElement('div');
    box.className = 'placeholder';
    box.innerHTML = '<span>Add your picture here:<code>' + img.getAttribute('src') + '</code></span>';
    img.replaceWith(box);
  }
  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  } else {
    img.addEventListener('error', showPlaceholder);
  }
});

// 2. Grow each branch and pop in its card when it scrolls into view
var projects = document.querySelectorAll('.project');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduceMotion) {
  projects.forEach(function (p) { p.classList.add('is-visible'); });
} else {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  projects.forEach(function (p) { observer.observe(p); });
}

// 3. Fill the main timeline line as you scroll
var timeline = document.getElementById('timeline');
var ticking = false;

function updateTrunk() {
  var rect = timeline.getBoundingClientRect();
  var progress = (window.innerHeight * 0.65 - rect.top) / rect.height;
  progress = Math.min(Math.max(progress, 0), 1);
  timeline.style.setProperty('--progress', progress);
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(updateTrunk);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateTrunk);
updateTrunk();
