(() => {
  const cnv = document.getElementById('canvas');
  const ctx = cnv.getContext('2d');

  function init() {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
  }
  init();

  window.addEventListener('resize', init);

})();