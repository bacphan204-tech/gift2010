/**
 * CHỈNH WEB NHANH: sửa chữ, thứ tự ảnh và tên file nhạc tại đây.
 * Không cần sửa HTML/CSS nếu chỉ thay nội dung.
 */
window.GIFT_CONFIG = {
  // Album: ảnh đã lọc từ file PhotoBoothPro.rar.
  // Muốn đổi ảnh: chép ảnh vào images/ rồi đổi đường dẫn bên dưới.
  photos: [
    { src: 'images/moment-01.webp', caption: 'Một khoảnh khắc chỉ có hai đứa ♡' },
    { src: 'images/moment-02.webp', caption: 'Cậu đáng yêu như thế này này' },
    { src: 'images/moment-03.webp', caption: 'Hôn một cái!' },
    { src: 'images/moment-04.webp', caption: 'Bên nhau là đủ rồi' },
    { src: 'images/moment-05.webp', caption: 'Một chút dịu dàng trong ký ức' },
    { src: 'images/moment-06.webp', caption: 'Cười thật nhiều nhé, người thương' },
    { src: 'images/moment-07.webp', caption: 'Khoảnh khắc tớ muốn giữ lại' },
    { src: 'images/moment-08.webp', caption: 'Đáng yêu quá trời luôn!' },
    { src: 'images/moment-09.webp', caption: 'Hai đứa mình hơi ngốc xíu ♡' },
    { src: 'images/moment-10.webp', caption: 'Our little photobooth moment' },
    { src: 'images/moment-11.webp', caption: 'Cứ mãi vui như thế này nha' },
    { src: 'images/moment-12.webp', caption: 'Home is wherever you are ♡' }
  ],
  letter: {
    greeting: 'Gửi cậu, người tớ thương ♡',
    paragraphs: [
      'Chúc mừng 20/10, cô gái đáng yêu của tớ!',
      'Tớ không biết phải bắt đầu từ đâu, vì có nhiều điều muốn nói với cậu lắm. Tớ chỉ biết rằng mỗi khi nghĩ về cậu, những điều bình thường nhất cũng trở nên dễ thương hơn một chút.',
      'Cảm ơn cậu vì đã xuất hiện trong cuộc sống của tớ, vì những nụ cười, những câu chuyện linh tinh, và cả những khoảnh khắc chẳng cần làm gì đặc biệt mà vẫn thấy rất vui.',
      'Hôm nay, tớ mong cậu luôn được yêu thương, bình yên, tự tin và hạnh phúc. Nếu có một ngày nào đó cậu thấy mệt, nhớ rằng vẫn có tớ ở đây, muốn nghe cậu kể mọi chuyện và ôm cậu thật lâu.',
      'Mong là chúng mình sẽ còn cùng nhau tạo ra thật nhiều kỷ niệm mới. Tớ thương cậu. Rất nhiều. ♡',
      'Và xin lỗi cậu rất nhiều, tớ không muốn cậu buồn bao giờ cả.'
    ],
    signature: '— từ tớ, người luôn thương cậu ♡'
  },
  surprise: {
    title: 'Yêu cậu nhiều lắm! ♡',
    message: '20/10 vui vẻ nhé, người đặc biệt nhất trong lòng tớ. Mong chúng mình có thật nhiều ngày bình thường thật hạnh phúc bên nhau.'
  },
  // MINI GAME KỶ NIỆM — chỉ cần sửa phần này để đổi câu hỏi hoặc phần quà.
  memoryGame: {
    eyebrow: 'CHAPTER 03 · A LITTLE LOVE QUIZ',
    title: 'Một câu hỏi <i>bé xíu</i>', // Phần trong <i> sẽ có màu hồng
    introduction: 'Cậu có nhớ kỷ niệm nhỏ đầu tiên của chúng mình không? Trả lời đúng sẽ có quà đó ♡',
    question: 'Món đầu tiên chúng mình ăn cùng nhau là gì?',
    answer: 'bún chả', // Có thể nhập "Bún Chả", "bun cha" hay " BÚN CHẢ ".
    placeholder: 'Gõ tên món ăn ở đây...',
    success: 'Đúng rồiii! Cậu nhớ giỏi quá ♡ Quà của cậu xuất hiện rồi nè!',
    wrong: [
      'Hmmm, chưa đúng rồi! Nhớ lại một xíu nữa nha 🥺',
      'Gợi ý nhẹ: một món ăn Việt Nam cực ngon đó ♡',
      'Tớ tin là cậu nhớ màaa, thử lại một lần nữa nhé!'
    ],
    presentHint: 'Một chiếc hộp nhỏ dành riêng cho cậu ♡',
    giftTitle: 'Một bất ngờ dành cho cậu ♡',
    giftMessage: 'Quà thật tớ đang chuẩn bị riêng cho cậu. Chờ tớ bật mí nhé! 🎀',
    giftImage: '' // Muốn hiện ảnh phần quà: thêm vào images/ rồi điền 'images/ten-qua.webp'
  },
  // Playlist 4 bài do bạn cung cấp. Phát SHUFFLE mỗi lượt, không lặp ngay bài vừa nghe.
  // Love Story hiện là bản Indila theo đúng file âm thanh bạn đã gửi.
  tracks: [
    { title: 'I Love You 3000', artist: 'Stephanie Poetri', file: 'music/01-i-love-you-3000.mp3' },
    { title: 'Love Story', artist: 'Indila', file: 'music/02-love-story-indila.mp3' },
    { title: 'Until I Found You', artist: 'Stephen Sanchez ft. Em Beihold', file: 'music/03-until-i-found-you.mp3' },
    { title: 'Time Machine', artist: 'mj apanay ft. aren park', file: 'music/04-time-machine.mp3' }
  ]
};
