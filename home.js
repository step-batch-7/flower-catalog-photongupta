const animateWaterJar = function() {
  const img = document.querySelector('.waterJar');
  img.style.display = 'none';
  setTimeout(() => (img.style.display = 'block'), 1000);
};
