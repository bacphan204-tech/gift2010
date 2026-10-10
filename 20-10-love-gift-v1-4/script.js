/* Love Gift 20/10 — vanilla JavaScript, no external dependencies */
(() => {
  'use strict';
  const config = window.GIFT_CONFIG;
  const $ = (id) => document.getElementById(id);
  if (!config) { console.error('Thiếu config.js'); return; }

  const welcome = $('welcome');
  const giftSite = $('gift-site');
  const musicWidget = $('music-widget');
  const noButton = $('no-button');
  const noZone = $('no-zone');
  const noMessage = $('no-message');
  let giftOpened = false;
  let noMoves = 0;
  let lastNoPosition = -1;

  const toastElement = $('toast');
  let toastTimer;
  function toast(message) {
    toastElement.textContent = message;
    toastElement.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastElement.classList.remove('show'), 2700);
  }

  // Nút KHÔNG chạy tránh chuột + tránh tay trên mobile.
  function evadeNo(event) {
    if (giftOpened) return;
    if (event && event.type === 'touchstart') event.preventDefault();
    const zone = noZone.getBoundingClientRect();
    const btn = noButton.getBoundingClientRect();
    const availableX = Math.max(4, zone.width - btn.width - 6);
    const availableY = Math.max(4, zone.height - btn.height - 6);
    const anchors = [[.02, .18], [.86, .04], [.33, .7], [.63, .56], [.08, .57], [.78, .4]];
    let nextIndex = noMoves % anchors.length;
    if (nextIndex === lastNoPosition) nextIndex = (nextIndex + 1) % anchors.length;
    lastNoPosition = nextIndex;
    const [x, y] = anchors[nextIndex];
    noButton.style.transform = 'none';
    noButton.style.left = `${Math.max(0, Math.min(availableX, availableX * x))}px`;
    noButton.style.top = `${Math.max(0, Math.min(availableY, availableY * y))}px`;
    noMoves++;
    noMessage.classList.add('show');
    if (noMoves === 1) toast('👀 Cậu đang định bấm cái gì đấy?!');
    else if (noMoves === 3) toast('Ơ kìa, nghĩ lại đi chứ =)))');
    else if (noMoves === 6) toast('Hehe nút này không bấm được đâu ♡');
  }
  noButton.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') evadeNo(event); });
  noButton.addEventListener('touchstart', evadeNo, { passive: false });
  noButton.addEventListener('click', (e) => { e.preventDefault(); evadeNo(e); });
  noButton.addEventListener('focus', () => { noMessage.classList.add('show'); });
  $('yes-button').addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;
    // Gọi play() ngay trong lượt click để được trình duyệt cho phép phát có tiếng.
    startMusic();
    burstHearts(38);
    welcome.classList.add('exit');
    setTimeout(() => {
      welcome.classList.add('is-hidden');
      giftSite.classList.remove('is-hidden');
      musicWidget.classList.remove('is-hidden');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setupReveal();
    }, 650);
  });

  // Album ảnh thật. Không dùng API hay đăng ảnh ra dịch vụ ngoài.
  const photos = config.photos || [];
  const photoWall = $('photo-wall');
  let selectedPhotoIndex = 0;
  photos.forEach((photo, index) => {
    const btn = document.createElement('button');
    btn.className = 'memory-card reveal';
    btn.style.setProperty('--angle', `${[-3, 2, -2, 4, 3, -4][index % 6]}deg`);
    btn.type = 'button';
    btn.setAttribute('aria-label', `Xem ảnh ${index + 1}: ${photo.caption}`);
    const img = document.createElement('img');
    img.className = 'memory-photo';
    img.src = photo.src;
    img.loading = 'lazy';
    img.alt = photo.caption;
    const sticker = document.createElement('span');
    sticker.className = 'memory-sticker';
    sticker.setAttribute('aria-hidden', 'true');
    const cap = document.createElement('span');
    cap.className = 'memory-caption handwriting';
    cap.textContent = photo.caption;
    btn.append(sticker, img, cap);
    btn.addEventListener('click', () => showPhoto(index));
    photoWall.append(btn);
  });

  function setupReveal() {
    const elements = [...document.querySelectorAll('.reveal:not(.visible)')];
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .07, rootMargin: '0px 0px 40px 0px' });
    elements.forEach(el => observer.observe(el));
  }

  let previousFocus = null;
  function showPhoto(index) {
    if (!photos.length) return;
    selectedPhotoIndex = (index + photos.length) % photos.length;
    const photo = photos[selectedPhotoIndex];
    $('photo-full').src = photo.src;
    $('photo-full').alt = photo.caption;
    $('photo-caption').textContent = photo.caption;
    $('photo-counter').textContent = `${selectedPhotoIndex + 1} / ${photos.length}`;
    previousFocus = document.activeElement;
    $('photo-modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('photo-close').focus();
  }
  function closePhoto() {
    $('photo-modal').hidden = true;
    document.body.style.overflow = '';
    previousFocus?.focus?.();
  }
  $('photo-close').addEventListener('click', closePhoto);
  $('photo-prev').addEventListener('click', () => showPhoto(selectedPhotoIndex - 1));
  $('photo-next').addEventListener('click', () => showPhoto(selectedPhotoIndex + 1));
  $('photo-modal').addEventListener('click', (event) => { if (event.target === $('photo-modal')) closePhoto(); });

  // Lá thư: toàn bộ lời nhắn có thể thay trong config.js.
  $('letter-dear').textContent = config.letter?.greeting || 'Gửi cậu ♡';
  $('letter-signature').textContent = config.letter?.signature || '— tớ ♡';
  (config.letter?.paragraphs || []).forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    $('letter-body').append(p);
  });
  function toggleLetter(open) {
    const stage = document.querySelector('.letter-stage');
    stage.classList.toggle('open', open);
    $('letter-paper').setAttribute('aria-hidden', String(!open));
    $('envelope').setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => $('letter-paper').scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  }
  $('envelope').addEventListener('click', () => toggleLetter(true));
  $('letter-close').addEventListener('click', () => toggleLetter(false));

  // MINI GAME: viết câu hỏi/đáp án/nội dung quà ở config.js.
  const memoryGame = config.memoryGame || {};
  const memoryGameForm = $('memory-game-form');
  const memoryGameAnswer = $('memory-game-answer');
  const memoryGameFeedback = $('memory-game-feedback');
  const memoryGameCard = $('memory-game-card');
  let memoryGameUnlocked = false;
  let memoryGameMisses = 0;
  let giftModalFocus = null;

  const gameText = (id, value) => { if (typeof value === 'string') $(id).textContent = value; };
  gameText('memory-game-eyebrow', memoryGame.eyebrow);
  // Single highlighted phrase allowed from local owner-editable config; never render user input as HTML.
  if (typeof memoryGame.title === 'string') {
    const heading = $('memory-game-heading');
    const match = memoryGame.title.match(/^(.*?)<i>(.*?)<\/i>(.*)$/);
    if (match) {
      heading.replaceChildren(document.createTextNode(match[1]));
      const accent = document.createElement('i'); accent.textContent = match[2]; heading.append(accent, document.createTextNode(match[3]));
    } else heading.textContent = memoryGame.title;
  }
  gameText('memory-game-intro', memoryGame.introduction);
  gameText('memory-game-question', memoryGame.question);
  if (typeof memoryGame.placeholder === 'string') memoryGameAnswer.placeholder = memoryGame.placeholder;
  gameText('memory-game-hint', memoryGame.presentHint);
  gameText('memory-gift-title', memoryGame.giftTitle);
  gameText('memory-gift-message', memoryGame.giftMessage);
  if (memoryGame.giftImage) {
    $('memory-gift-image').src = memoryGame.giftImage;
    $('memory-gift-image').hidden = false;
  }

  function cleanAnswer(value) {
    return String(value || '').trim().toLowerCase()
      .replace(/đ/g, 'd')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  }

  memoryGameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (memoryGameUnlocked) return;
    const submittedAnswer = cleanAnswer(memoryGameAnswer.value);
    if (submittedAnswer && submittedAnswer === cleanAnswer(memoryGame.answer || 'bún chả')) {
      memoryGameUnlocked = true;
      memoryGameAnswer.blur(); // Đóng bàn phím trên điện thoại trước khi hiện hộp quà.
      memoryGameAnswer.setAttribute('aria-invalid', 'false');
      memoryGameForm.hidden = true;
      memoryGameFeedback.textContent = memoryGame.success || 'Đúng rồi! Có quà cho cậu nè ♡';
      memoryGameFeedback.classList.add('is-correct');
      $('memory-game-reveal').hidden = false;
      burstHearts(24);
      setTimeout(() => $('memory-game-reveal').scrollIntoView({behavior:'smooth', block:'center'}), 250);
    } else {
      memoryGameMisses++;
      const hints = Array.isArray(memoryGame.wrong) && memoryGame.wrong.length ? memoryGame.wrong : ['Chưa đúng rồi, cậu thử lại nhé ♡'];
      memoryGameFeedback.textContent = submittedAnswer ? hints[(memoryGameMisses - 1) % hints.length] : 'Cậu chưa điền đáp án kìa! 🥺';
      memoryGameFeedback.classList.remove('is-correct');
      memoryGameAnswer.setAttribute('aria-invalid', 'true');
      memoryGameCard.classList.remove('shake');
      void memoryGameCard.offsetWidth;
      memoryGameCard.classList.add('shake');
    }
  });
  memoryGameAnswer.addEventListener('input', () => memoryGameAnswer.removeAttribute('aria-invalid'));

  function openMemoryGift() {
    if (!memoryGameUnlocked) return;
    giftModalFocus = document.activeElement;
    $('memory-gift-modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('memory-gift-close').focus();
    burstHearts(50);
  }
  function closeMemoryGift() {
    $('memory-gift-modal').hidden = true;
    document.body.style.overflow = '';
    giftModalFocus?.focus?.();
  }
  $('memory-gift-button').addEventListener('click', openMemoryGift);
  $('memory-gift-close').addEventListener('click', closeMemoryGift);
  $('memory-gift-done').addEventListener('click', closeMemoryGift);
  $('memory-gift-modal').addEventListener('click', event => { if (event.target === $('memory-gift-modal')) closeMemoryGift(); });

  // Bất ngờ kết thúc và hiệu ứng tim bay.
  function burstHearts(total = 40) {
    const layer = $('confetti-layer');
    const color = ['#d56b8a', '#ef8eaa', '#e6bdbb', '#bf6688', '#f8d4dc'];
    for (let i = 0; i < total; i++) {
      const particle = document.createElement('span');
      particle.className = 'heart-particle';
      particle.textContent = ['♥','♡','✦','♥','✿'][i % 5];
      particle.style.setProperty('--left', `${Math.random() * 100}%`);
      particle.style.setProperty('--size', `${15 + Math.random() * 30}px`);
      particle.style.setProperty('--color', color[i % color.length]);
      particle.style.setProperty('--dur', `${2.9 + Math.random() * 3.3}s`);
      particle.style.animationDelay = `${Math.random() * .9}s`;
      layer.appendChild(particle);
      setTimeout(() => particle.remove(), 7600);
    }
  }
  function openSurprise() {
    previousFocus = document.activeElement;
    $('surprise-title').textContent = config.surprise?.title || 'Yêu cậu nhiều lắm! ♡';
    $('surprise-message').textContent = config.surprise?.message || 'Happy 20/10 ♡';
    $('surprise-modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('surprise-close').focus();
    burstHearts(65);
  }
  function closeSurprise() {
    $('surprise-modal').hidden = true;
    document.body.style.overflow = '';
    previousFocus?.focus?.();
  }
  $('ending-button').addEventListener('click', openSurprise);
  $('header-surprise').addEventListener('click', openSurprise);
  $('surprise-close').addEventListener('click', closeSurprise);
  $('surprise-again').addEventListener('click', () => burstHearts(65));
  $('surprise-modal').addEventListener('click', e => { if (e.target === $('surprise-modal')) closeSurprise(); });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!$('photo-modal').hidden) closePhoto();
      if (!$('surprise-modal').hidden) closeSurprise();
      if (!$('memory-gift-modal').hidden) closeMemoryGift();
    }
    if (!$('photo-modal').hidden) {
      if (event.key === 'ArrowLeft') showPhoto(selectedPhotoIndex - 1);
      if (event.key === 'ArrowRight') showPhoto(selectedPhotoIndex + 1);
    }
  });

  // MUSIC: shuffle bốn bài. Mỗi lượt nghe đủ 4 bài, không bị lặp giữa chừng.
  // Nút Previous quay về bài vừa nghe; Next/ended đi tiếp theo thứ tự xáo ngẫu nhiên.
  const tracks = config.tracks || [];
  const audio = $('background-audio');
  let currentTrackIndex = -1;
  let isPlaying = false;
  let isMuted = false;
  let playAttempt = 0;
  let playQueue = []; // Danh sách bài chưa phát trong lượt ngẫu nhiên hiện tại.
  let playHistory = []; // Danh sách bài thực tế đã nghe, để nút Back hoạt động đúng.
  let historyCursor = -1;
  const musicHelp = $('music-help');
  audio.volume = .55;

  function shuffledIndices(avoidFirst = -1) {
    const order = tracks.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    // Khi kết thúc một lượt, tránh phát lại ngay bài cuối của lượt trước.
    if (order.length > 1 && order[0] === avoidFirst) {
      [order[0], order[1]] = [order[1], order[0]];
    }
    return order;
  }

  function renderMusic() {
    const track = tracks[currentTrackIndex] || tracks[0];
    if (!track) return;
    $('music-title').textContent = track.title;
    $('music-artist').textContent = track.artist;
    $('music-play').textContent = isPlaying ? '❚❚' : '▶';
    $('music-play').setAttribute('aria-label', isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc');
    $('music-mute').textContent = isMuted ? '🔇' : '♫';
    $('music-mute').setAttribute('aria-label', isMuted ? 'Bật tiếng' : 'Tắt âm thanh');
    [...$('playlist').children].forEach((item, idx) => item.classList.toggle('active', idx === currentTrackIndex));
  }

  function playAudio() {
    if (!tracks.length) return;
    if (currentTrackIndex < 0) { advanceTrack(); return; }
    const attempt = ++playAttempt;
    const promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(() => {
        if (attempt !== playAttempt) return;
        isPlaying = true;
        musicHelp.textContent = '';
        renderMusic();
      }).catch((error) => {
        if (attempt !== playAttempt) return; // Bỏ qua lỗi AbortError lúc đổi bài nhanh.
        isPlaying = false;
        musicHelp.textContent = 'Chưa phát được bài này. Hãy chạm Play lại hoặc kiểm tra file nhạc nhé.';
        renderMusic();
        console.warn('Music playback could not start:', error);
      });
    }
  }

  function setTrack(index, autoplay = false) {
    if (!tracks.length) return;
    ++playAttempt;
    currentTrackIndex = index;
    audio.src = tracks[index].file;
    audio.load();
    isPlaying = false;
    musicHelp.textContent = '';
    renderMusic();
    if (autoplay) playAudio();
  }

  function advanceTrack() {
    if (!tracks.length) return;
    if (historyCursor < playHistory.length - 1) {
      // Đã bấm Prev: nút Next quay về đúng bài kế tiếp từng phát.
      historyCursor++;
      setTrack(playHistory[historyCursor], true);
      return;
    }
    if (!playQueue.length) playQueue = shuffledIndices(currentTrackIndex);
    const nextIndex = playQueue.shift();
    playHistory.push(nextIndex);
    historyCursor = playHistory.length - 1;
    setTrack(nextIndex, true);
  }

  function chooseTrack(index) {
    if (index === currentTrackIndex) { playAudio(); return; }
    // Người dùng chọn bài trực tiếp vẫn được, bài đã chọn sẽ không lặp tự động trong lượt.
    if (historyCursor < playHistory.length - 1) {
      playHistory = playHistory.slice(0, historyCursor + 1);
    }
    if (!playQueue.length) playQueue = shuffledIndices(currentTrackIndex);
    playQueue = playQueue.filter((value) => value !== index);
    playHistory.push(index);
    historyCursor = playHistory.length - 1;
    setTrack(index, true);
  }

  function startMusic() { if (currentTrackIndex < 0) advanceTrack(); else playAudio(); }
  function pauseAudio() { ++playAttempt; audio.pause(); isPlaying = false; renderMusic(); }
  $('music-play').addEventListener('click', () => isPlaying ? pauseAudio() : playAudio());
  $('music-prev').addEventListener('click', () => {
    if (historyCursor > 0) {
      historyCursor--;
      setTrack(playHistory[historyCursor], true);
    } else if (currentTrackIndex >= 0) {
      audio.currentTime = 0;
      playAudio();
    }
  });
  $('music-next').addEventListener('click', advanceTrack);
  $('music-mute').addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    renderMusic();
  });
  audio.addEventListener('ended', advanceTrack);
  audio.addEventListener('error', () => {
    isPlaying = false;
    musicHelp.textContent = 'Không tải được file nhạc. Thử tải lại trang hoặc kiểm tra đường dẫn nhé ♡';
    renderMusic();
  });
  audio.addEventListener('play', () => { isPlaying = true; renderMusic(); });
  audio.addEventListener('pause', () => { isPlaying = false; renderMusic(); });

  tracks.forEach((track, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'playlist-item';
    const label = document.createElement('span'); label.className = 'playlist-index'; label.textContent = String(index + 1).padStart(2, '0');
    const info = document.createElement('span'); info.className = 'playlist-info';
    const title = document.createElement('strong'); title.textContent = track.title;
    const artist = document.createElement('small'); artist.textContent = track.artist;
    info.append(title, artist); btn.append(label, info);
    btn.addEventListener('click', () => chooseTrack(index));
    $('playlist').append(btn);
  });
  $('music-list-toggle').addEventListener('click', () => {
    $('music-expanded').hidden = !$('music-expanded').hidden;
    $('music-list-toggle').setAttribute('aria-expanded', String(!$('music-expanded').hidden));
  });
  renderMusic();
})();
