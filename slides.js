// Configuração do Swiper
let swiper;
let isAutoplay = false;
let isFullscreen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeSwiper();
    setupControls();
    setupKeyboardNavigation();
    setupTouchGestures();
    updateSlideCounter();
    createFloatingHearts();
    
    console.log('💖 Slides de amor inicializados! 💖');
});

// Inicializar Swiper
function initializeSwiper() {
    swiper = new Swiper('.swiper', {
        // Configurações básicas
        direction: 'horizontal',
        loop: false,
        speed: 800,
        effect: 'slide',
        
        // Navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Paginação
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
        },
        
        // Teclado
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Mouse wheel
        mousewheel: {
            enabled: true,
            forceToAxis: true,
        },
        
        // Touch
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        
        // Efeitos de transição
        on: {
            slideChange: function() {
                updateSlideCounter();
                animateSlideContent();
                createHeartBurst();
            },
            
            slideChangeTransitionStart: function() {
                addSlideTransitionEffect();
            },
            
            slideChangeTransitionEnd: function() {
                removeSlideTransitionEffect();
            },
            
            init: function() {
                animateSlideContent();
            }
        }
    });
}

// Configurar controles
function setupControls() {
    const playPauseBtn = document.getElementById('playPause');
    const fullscreenBtn = document.getElementById('fullscreen');
    const shareBtn = document.getElementById('share');
    
    // Play/Pause autoplay
    playPauseBtn.addEventListener('click', function() {
        if (isAutoplay) {
            swiper.autoplay.stop();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('active');
            isAutoplay = false;
        } else {
            swiper.autoplay.start();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.classList.add('active');
            isAutoplay = true;
        }
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Compartilhar
    shareBtn.addEventListener('click', openShareModal);
}

// Navegação por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.code) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                swiper.slidePrev();
                break;
                
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                swiper.slideNext();
                break;
                
            case 'Space':
                e.preventDefault();
                document.getElementById('playPause').click();
                break;
                
            case 'Escape':
                if (isFullscreen) {
                    toggleFullscreen();
                }
                closeShareModal();
                break;
                
            case 'KeyF':
                e.preventDefault();
                toggleFullscreen();
                break;
                
            case 'KeyS':
                e.preventDefault();
                openShareModal();
                break;
                
            case 'Home':
                e.preventDefault();
                swiper.slideTo(0);
                break;
                
            case 'End':
                e.preventDefault();
                swiper.slideTo(swiper.slides.length - 1);
                break;
        }
    });
}

// Gestos de toque
function setupTouchGestures() {
    let touchStartY = 0;
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        
        const deltaY = touchEndY - touchStartY;
        const deltaX = touchEndX - touchStartX;
        
        // Swipe vertical para controles
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY < -50) {
                // Swipe para cima - fullscreen
                if (!isFullscreen) {
                    toggleFullscreen();
                }
            } else if (deltaY > 50) {
                // Swipe para baixo - sair do fullscreen
                if (isFullscreen) {
                    toggleFullscreen();
                }
            }
        }
    });
}

// Atualizar contador de slides
function updateSlideCounter() {
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');
    
    if (currentSlide && totalSlides) {
        currentSlide.textContent = swiper.activeIndex + 1;
        totalSlides.textContent = swiper.slides.length;
    }
}

// Animar conteúdo do slide
function animateSlideContent() {
    const activeSlide = document.querySelector('.swiper-slide-active');
    if (!activeSlide) return;
    
    const heading = activeSlide.querySelector('.slide-heading');
    const text = activeSlide.querySelector('.slide-text');
    const verse = activeSlide.querySelector('.bible-verse');
    const image = activeSlide.querySelector('.slide-image');
    
    // Reset animations
    [heading, text, verse, image].forEach(el => {
        if (el) {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
        }
    });
    
    // Apply animations with delays
    setTimeout(() => {
        if (image) {
            image.style.animation = 'slideIn 0.8s ease-out';
        }
    }, 100);
    
    setTimeout(() => {
        if (heading) {
            heading.style.animation = 'textFadeIn 0.6s ease-out';
        }
    }, 300);
    
    setTimeout(() => {
        if (text) {
            text.style.animation = 'textFadeIn 0.6s ease-out';
        }
    }, 500);
    
    setTimeout(() => {
        if (verse) {
            verse.style.animation = 'textFadeIn 0.6s ease-out';
        }
    }, 700);
}

// Efeito de transição
function addSlideTransitionEffect() {
    document.body.classList.add('slide-transitioning');
}

function removeSlideTransitionEffect() {
    document.body.classList.remove('slide-transitioning');
}

// Criar explosão de corações
function createHeartBurst() {
    const colors = ['💖', '💕', '💗', '💝', '💘'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingHeart(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

// Criar coração flutuante
function createFloatingHeart(emoji = '💖') {
    const heart = document.createElement('div');
    heart.textContent = emoji;
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = `heartFloat ${Math.random() * 3 + 4}s ease-out forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Criar corações flutuantes periódicos
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de chance
            createFloatingHeart();
        }
    }, 2000);
}

// Toggle fullscreen
function toggleFullscreen() {
    const container = document.querySelector('.slides-container');
    const fullscreenBtn = document.getElementById('fullscreen');
    
    if (!isFullscreen) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        
        container.classList.add('fullscreen-mode');
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        fullscreenBtn.classList.add('active');
        isFullscreen = true;
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        container.classList.remove('fullscreen-mode');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.classList.remove('active');
        isFullscreen = false;
    }
}

// Listener para mudanças de fullscreen
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const container = document.querySelector('.slides-container');
    const fullscreenBtn = document.getElementById('fullscreen');
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        container.classList.remove('fullscreen-mode');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.classList.remove('active');
        isFullscreen = false;
    }
}

// Modal de compartilhamento
function openShareModal() {
    const modal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');
    
    shareLink.value = window.location.href;
    modal.style.display = 'flex';
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    modal.style.display = 'none';
}

function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        showNotification('Link copiado com sucesso! 💖');
    } catch (err) {
        console.error('Erro ao copiar link:', err);
        showNotification('Erro ao copiar link');
    }
}

// Voltar para página inicial
function goBack() {
    // Adicionar efeito de transição
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Sistema de notificações
function showNotification(message, duration = 3000) {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.95);
        color: #333;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: notificationSlideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,105,180,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Adicionar estilos de animação para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes notificationSlideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes notificationSlideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Configurar autoplay com configurações personalizadas
function setupAutoplay() {
    swiper.autoplay = {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    };
}

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar para dispositivos móveis
function adjustForMobile() {
    if (isMobile()) {
        // Reduzir velocidade de transição em mobile
        swiper.params.speed = 600;
        
        // Ajustar sensibilidade do touch
        swiper.params.touchRatio = 1.5;
        
        // Desabilitar mousewheel em mobile
        swiper.mousewheel.disable();
    }
}

// Preload de imagens
function preloadImages() {
    const images = document.querySelectorAll('.slide-image');
    images.forEach(img => {
        if (img.src && !img.src.includes('placeholder')) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

// Adicionar efeitos de hover para desktop
function setupHoverEffects() {
    if (!isMobile()) {
        const slides = document.querySelectorAll('.swiper-slide');
        
        slides.forEach(slide => {
            const imageContainer = slide.querySelector('.image-container');
            
            if (imageContainer) {
                imageContainer.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02) rotateY(5deg)';
                });
                
                imageContainer.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotateY(0deg)';
                });
            }
        });
    }
}

// Inicialização adicional após carregamento
window.addEventListener('load', function() {
    preloadImages();
    setupHoverEffects();
    adjustForMobile();
    
    // Adicionar efeito de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('💕 Todos os recursos dos slides foram carregados! 💕');
});

// Listener para redimensionamento
window.addEventListener('resize', function() {
    adjustForMobile();
    swiper.update();
});

// Prevenir zoom em dispositivos móveis
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

// Adicionar suporte para Web Share API
function shareNatively() {
    if (navigator.share) {
        navigator.share({
            title: 'Nossa História de Amor',
            text: 'Veja nossa linda história de amor!',
            url: window.location.href
        }).then(() => {
            showNotification('Compartilhado com sucesso! 💖');
        }).catch(err => {
            console.log('Erro ao compartilhar:', err);
            openShareModal();
        });
    } else {
        openShareModal();
    }
}

// Atualizar função de compartilhamento
document.getElementById('share').addEventListener('click', shareNatively);

// Easter eggs
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg ativado!
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingHeart(['💖', '💕', '💗', '💝', '💘', '🌹', '💐'][Math.floor(Math.random() * 7)]);
            }, i * 100);
        }
        showNotification('💖 Easter egg ativado! Chuva de amor! 💖', 5000);
        konamiCode = [];
    }
});

// Salvar progresso no localStorage
function saveProgress() {
    localStorage.setItem('loveSlideProgress', swiper.activeIndex);
}

function loadProgress() {
    const savedIndex = localStorage.getItem('loveSlideProgress');
    if (savedIndex && parseInt(savedIndex) < swiper.slides.length) {
        swiper.slideTo(parseInt(savedIndex), 0);
    }
}

// Salvar progresso ao mudar de slide
swiper.on('slideChange', saveProgress);

// Carregar progresso ao inicializar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadProgress, 1000);
});

