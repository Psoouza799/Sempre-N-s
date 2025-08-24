// Data de início do relacionamento: 25 de dezembro de 2021, 00:00
const startDate = new Date('2021-12-25T00:00:00');

// Elementos do DOM
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startJourneyButton = document.getElementById('startJourney');

// Função para calcular a diferença de tempo
function calculateTimeDifference() {
    const now = new Date();
    const difference = now - startDate;
    
    // Calcular anos, meses, dias, horas, minutos e segundos
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { years, months, days, hours, minutes, seconds };
}

// Função para atualizar o contador
function updateCounter() {
    const time = calculateTimeDifference();
    
    // Atualizar os elementos com animação
    updateCounterElement(yearsElement, time.years);
    updateCounterElement(monthsElement, time.months);
    updateCounterElement(daysElement, time.days);
    updateCounterElement(hoursElement, time.hours);
    updateCounterElement(minutesElement, time.minutes);
    updateCounterElement(secondsElement, time.seconds);
}

// Função para atualizar um elemento do contador com animação
function updateCounterElement(element, newValue) {
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#FFD700';
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.color = '#FFD700';
        }, 150);
    }
}

// Função para criar efeito de partículas de coração
function createHeartParticle() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.animation = `heartFloat ${Math.random() * 10 + 10}s linear forwards`;
    
    document.body.appendChild(heart);
    
    // Remover o coração após a animação
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 20000);
}

// Função para adicionar efeitos de hover aos elementos
function addHoverEffects() {
    const counterItems = document.querySelectorAll('.counter-item');
    
    counterItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 15px 35px rgba(255,215,0,0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
    });
}

// Função para animar a entrada dos elementos
function animateElements() {
    const elements = document.querySelectorAll('.counter-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 2000);
    });
}

// Função para o botão de iniciar jornada
function setupJourneyButton() {
    startJourneyButton.addEventListener('click', () => {
        // Adicionar efeito de clique
        startJourneyButton.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            startJourneyButton.style.transform = 'scale(1)';
            
            // Criar explosão de corações
            for (let i = 0; i < 10; i++) {
                setTimeout(() => createHeartParticle(), i * 100);
            }
            
            // Redirecionar para a página de slides (será criada posteriormente)
            setTimeout(() => {
                window.location.href = 'slides.html';
            }, 1500);
            
        }, 150);
    });
    
    // Efeito de hover no botão
    startJourneyButton.addEventListener('mouseenter', () => {
        startJourneyButton.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    startJourneyButton.addEventListener('mouseleave', () => {
        startJourneyButton.style.transform = 'translateY(0) scale(1)';
    });
}

// Função para criar efeito de brilho no sol
function createSunGlow() {
    const sun = document.querySelector('.sun');
    
    setInterval(() => {
        sun.style.boxShadow = `
            0 0 ${Math.random() * 20 + 30}px rgba(255,215,0,0.8),
            0 0 ${Math.random() * 40 + 60}px rgba(255,165,0,0.6),
            0 0 ${Math.random() * 60 + 80}px rgba(255,69,0,0.4)
        `;
    }, 2000);
}

// Função para adicionar efeitos de teclado
function setupKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            startJourneyButton.click();
        }
        
        // Easter egg: tecla 'L' para "Love"
        if (e.code === 'KeyL') {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createHeartParticle(), i * 200);
            }
        }
    });
}

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para ajustar animações em dispositivos móveis
function adjustForMobile() {
    if (isMobile()) {
        // Reduzir a quantidade de partículas em dispositivos móveis
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 5) {
                particle.style.display = 'none';
            }
        });
        
        // Reduzir corações flutuantes
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach((heart, index) => {
            if (index > 3) {
                heart.style.display = 'none';
            }
        });
    }
}

// Função para adicionar efeito de paralaxe suave
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.solar-system, .floating-hearts');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Função de inicialização
function init() {
    // Atualizar contador imediatamente
    updateCounter();
    
    // Atualizar contador a cada segundo
    setInterval(updateCounter, 1000);
    
    // Configurar efeitos
    addHoverEffects();
    animateElements();
    setupJourneyButton();
    createSunGlow();
    setupKeyboardEffects();
    adjustForMobile();
    setupParallax();
    
    // Criar partículas de coração periodicamente
    setInterval(createHeartParticle, 3000);
    
    // Adicionar efeito de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('💖 Site de amor inicializado com sucesso! 💖');
    console.log('Relacionamento iniciado em:', startDate.toLocaleDateString('pt-BR'));
    console.log('Tempo juntos:', calculateTimeDifference());
}

// Aguardar o carregamento completo da página
document.addEventListener('DOMContentLoaded', init);

// Adicionar listener para redimensionamento da janela
window.addEventListener('resize', adjustForMobile);

// Função para mostrar mensagem de carregamento
window.addEventListener('load', () => {
    console.log('💕 Todos os recursos foram carregados! 💕');
    
    // Adicionar classe para animações finais
    document.body.classList.add('loaded');
});

// Prevenir zoom em dispositivos móveis (opcional)
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

// Adicionar suporte para gestos de toque
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Detectar swipe para cima (iniciar jornada)
    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
        startJourneyButton.click();
    }
});

// Adicionar efeitos sonoros (opcional - comentado por padrão)
/*
function playSound(soundName) {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Som não pôde ser reproduzido:', e));
}
*/

