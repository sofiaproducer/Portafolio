document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><div class="lightbox-content"></div>';
  document.body.appendChild(overlay);

  var content = overlay.querySelector('.lightbox-content');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function show() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    content.innerHTML = ''; // stops video playback when closed
  }

  function openImage(src, alt) {
    content.innerHTML = '';
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    content.appendChild(img);
    show();
  }

  function openVideo(src) {
    content.innerHTML = '';
    var video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    content.appendChild(video);
    show();
  }

  // Photos: click the image itself to enlarge
  document.querySelectorAll('.grid-placeholder img').forEach(function (img) {
    img.addEventListener('click', function () {
      openImage(img.currentSrc || img.src, img.alt);
    });
  });

  // Videos: click the dedicated expand button (keeps native play/pause/seek controls usable)
  document.querySelectorAll('.expand-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openVideo(btn.getAttribute('data-src'));
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
