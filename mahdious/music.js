document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const musicControlButton = document.getElementById('music-control-button');

    // بررسی وجود المان‌ها
    if (!audio || !musicControlButton) {
        console.error('المان‌های موسیقی یا دکمه پیدا نشدند.');
        return;
    }

    // بررسی پشتیبانی از sessionStorage
    const isMusicPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    musicControlButton.innerHTML = isMusicPlaying ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

    // تنظیم اولیه موسیقی
    if (isMusicPlaying) {
        audio.muted = false;
        audio.play().catch(function(error) {
            console.error('خطا در پخش موسیقی: ', error);
            musicControlButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            sessionStorage.setItem('musicPlaying', 'false');
        });
    } else {
        audio.muted = true;
    }

    // هندل کلیک دکمه
    musicControlButton.addEventListener('click', function() {
        if (audio.muted || audio.paused) {
            audio.muted = false;
            audio.play().then(() => {
                console.log('موسیقی در حال پخش است.');
                musicControlButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                sessionStorage.setItem('musicPlaying', 'true');
            }).catch(error => {
                console.error('خطا در پخش موسیقی: ', error);
            });
        } else {
            audio.pause();
            musicControlButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            sessionStorage.setItem('musicPlaying', 'false');
        }
    });
});