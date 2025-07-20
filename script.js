document.addEventListener('DOMContentLoaded', function () {
    // Elementos del reproductor de audio
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const songTitleEl = document.getElementById('song-title');
    const card = document.getElementById("interactive-card");
    const albumCoverEl = document.getElementById('album-cover');

    // Lista de canciones
    const songs = [ 
        { 
            title: "Escape", 
            src: "https://r2.guns.lol/210e0ae3-e7e1-4e91-9c84-2ba1e579279c.mp3"
        },
        { 
            title: "Apathy", 
            src: "https://r2.guns.lol/bc0a4278-5718-4f95-9a03-974860527c42.mp3"
        },
        { 
            title: "Luxury", 
            src: "https://r2.guns.lol/418d15de-81db-4c18-81b5-ba14e5bdc927.mp3"
        },
        { 
            title: "Dnt Lie", 
            src: "https://ch4d.me/musica/audio1.mp3"
        },
        { 
            title: "Montagem Tomada", 
            src: "https://ch4d.me/musica/audio2.mp3"
        },
        { 
            title: "Did It First", 
            src: "https://ch4d.me/musica/audio3.mp3"
        }
    ];

    // Funci車n para actualizar el contador de visitas
async function updateViewCount() {
    try {
        // Hacer la petici車n al servidor
        const response = await fetch('view_counter.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        
        // Esperar la respuesta
        const count = await response.text();
        
        // Actualizar el contador en la p芍gina
        document.getElementById('view-count').textContent = count;
        
        // Asegurarse de que el contador se actualice
        console.log('Contador actualizado:', count);
        
    } catch (error) {
        console.error('Error actualizando el contador de visitas:', error);
        // Si hay error, intentar nuevamente en 5 segundos
        setTimeout(updateViewCount, 5000);
    }
}

// Actualizar el contador cuando la p芍gina se carga
document.addEventListener('DOMContentLoaded', updateViewCount);

// Iniciar con una canci車n aleatoria
    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let isChangingSong = false;
    let autoplayAttempted = false;

    function handleSongEnded() {
        console.log("Canci車n terminada, pasando a la siguiente");
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playAudio();
    }

    // Cargar una canci車n aleatoria al inicio
    loadSong(currentSongIndex);

    

    // Actualizar el contador cuando la p芍gina carga
    
    function loadSong(index) {
        isChangingSong = true;
        const song = songs[index];
        songTitleEl.textContent = song.title;

        const wasPlaying = !audioPlayer.paused && autoplayAttempted;

        if (!audioPlayer.paused) {
            audioPlayer.pause();
        }

        audioPlayer.removeEventListener('ended', handleSongEnded);

        audioPlayer.src = song.src;
        audioPlayer.addEventListener('ended', handleSongEnded);

        audioPlayer.addEventListener('loadeddata', function onLoaded() {
            durationEl.textContent = formatTime(audioPlayer.duration);
            if (wasPlaying) {
                playAudio();
            } else {
                isChangingSong = false;
            }
            audioPlayer.removeEventListener('loadeddata', onLoaded);
        });
    }

    // Funci車n para reproducir audio compatible con Brave y otros navegadores
    function playAudio() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        audioPlayer.play()
            .then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                isChangingSong = false;
                autoplayAttempted = true;
            })
            .catch(error => {
                console.error("Error al reproducir:", error);

                // Mostrar notificaci車n si hubo cualquier bloqueo
                showBraveNotification();

                // Reintentar con clic del usuario
                document.body.addEventListener('click', function retryAudio() {
                    audioPlayer.play()
                        .then(() => {
                            playIcon.style.display = 'none';
                            pauseIcon.style.display = 'block';
                            isChangingSong = false;
                            autoplayAttempted = true;
                        })
                        .catch(e => console.error("Error tras clic:", e));
                    document.body.removeEventListener('click', retryAudio);
                }, { once: true });
            });
    }

    // Notificaci車n espec赤fica para Brave o cualquier navegador que bloquee autoplay
    function showBraveNotification() {
        const braveNotification = document.createElement('div');
        braveNotification.className = 'brave-audio-notification';
        braveNotification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0080ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <div>
                    <strong style="font-size: 18px;">Luxury Notificacion</strong>
                    <p style="margin: 8px 0 0; font-size: 16px;">Muchas gracias por visitarnos</p>
                </div>
            </div>
        `;

        Object.assign(braveNotification.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: 'rgba(18, 18, 18, 0.59)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
            zIndex: '10000',
            maxWidth: '380px',
            border: '2px solid rgba(0, 179, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'slideIn 0.4s ease-out',
            fontSize: '16px'
        });

        document.body.appendChild(braveNotification);

        const timeout = setTimeout(() => {
            braveNotification.style.animation = 'fadeOut 0.3s ease-out';
            braveNotification.addEventListener('animationend', () => braveNotification.remove());
        }, 8000);

        braveNotification.addEventListener('click', () => {
            clearTimeout(timeout);
            braveNotification.remove();
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                to { opacity: 0; transform: translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress() {
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${percentage}%`;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
    }

    function togglePlay() {
        if (isChangingSong) return;
        if (audioPlayer.paused) {
            playAudio();
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    function prevSong() {
        if (isChangingSong) return;
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    function nextSong() {
        if (isChangingSong) return;
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    playButton.addEventListener('click', togglePlay);
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);

    progressContainer.addEventListener('click', function (e) {
        if (isChangingSong) return;
        const rect = this.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const percentage = clickPosition / rect.width;
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            audioPlayer.currentTime = percentage * audioPlayer.duration;
            updateProgress();
        }
    });

    progressContainer.addEventListener('touchstart', function (e) {
        if (isChangingSong) return;
        const rect = this.getBoundingClientRect();
        const touchPosition = e.touches[0].clientX - rect.left;
        const percentage = touchPosition / rect.width;
        if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
            audioPlayer.currentTime = percentage * audioPlayer.duration;
            updateProgress();
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.target.closest('.progress-container')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Overlay inicial para iniciar la m迆sica manualmente
    const initialOverlay = document.getElementById('initial-overlay');
    initialOverlay.addEventListener('click', function () {
        this.classList.add('hidden');
        
        // Desplazar la p芍gina al inicio
        window.scrollTo(0, 0);
        
        // Activar animaciones inmediatamente
        const animatedElements = document.querySelectorAll('.profile-card, .logo-container, .profile-title, .profile-description, .circle-buttons, .user-info, .music-player, .action-buttons, .view-counter');
        
        animatedElements.forEach(el => {
            el.classList.add('animate');
        });
        
        // Eliminar el overlay despu谷s de que termine su transici車n
        setTimeout(() => this.remove(), 500);
        
        // Animaci車n del contador de visitas
        const viewCount = document.getElementById('view-count');
        
        // Funci車n para obtener el valor real del contador
        async function getRealCount() {
            try {
                const response = await fetch('view_counter.php');
                return await response.text();
            } catch (error) {
                console.error('Error obteniendo el contador:', error);
                return 0;
            }
        }
        
        // Funci車n para animar el conteo
        async function animateCount() {
            const targetNumber = await getRealCount();
            let current = 0;
            const duration = 1000; // 1 segundo
            const startTime = performance.now();
            
            function updateCount() {
                const currentTime = performance.now();
                const progress = (currentTime - startTime) / duration;
                
                // Usar una funci車n de easing para una animaci車n m芍s suave
                const ease = function(t) {
                    return t < 0.5 
                        ? 4 * t * t * t 
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                };
                
                const currentNumber = Math.floor(ease(progress) * targetNumber);
                
                if (progress < 1) {
                    viewCount.textContent = currentNumber;
                    requestAnimationFrame(updateCount);
                } else {
                    viewCount.textContent = targetNumber;
                }
            }
            
            updateCount();
        }

        // Iniciar la animaci車n del contador despu谷s de que termine la animaci車n del view-counter
        const viewCounter = document.querySelector('.view-counter');
        viewCounter.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                // Iniciar la animaci車n del contador
                animateCount();
                viewCounter.removeEventListener('transitionend', handler);
            }
        });
        
        // Mostrar notificaci車n y reproducir audio
        showBraveNotification();
        playAudio();
    });

    // animaciones para la card - no me gusta en lo personal pero lo dejo por si algun dia comparto este archivo xD 
        // lo que hace es solo usar la card como un formato "3D"
    // card.addEventListener('mousemove', function(e) {
    //     const rect = card.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;

    //     const centerX = rect.width / 2;
    //     const centerY = rect.height / 2;

    //     let xAxis = (x - centerX) / 30;
    //     let yAxis = -(y - centerY) / 30;

    // // Limita los valores a un m芍ximo de ㊣6 grados
    //     const maxRotation = 6;
    //     xAxis = Math.max(Math.min(xAxis, maxRotation), -maxRotation);
    //     yAxis = Math.max(Math.min(yAxis, maxRotation), -maxRotation);

    // card.style.transform = `
    //     perspective(800px)
    //     rotateX(${yAxis}deg)
    //     rotateY(${xAxis}deg)
    //     scale(1.04)
    // `;
    // card.style.boxShadow = `
    //     ${-xAxis * 2}px ${-yAxis * 2}px 25px rgba(0, 0, 0, 0.25)
    // `;
    // });

    // card.addEventListener('mouseleave', function() {
    //     card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    //     card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    // });


    // animacion del titulo de favicon
    const titles = ["@", "@L", "@Lu", "@Lux", "@Lux.", "@Lux._", "@Lux._e", "@Lux._ez"];
    let index = 0;
    setInterval(function() {
        document.title = titles[index];
        index = (index + 1) % titles.length;
    }, 300);

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // bloqueo para ratas


    (function() {
    const threshold = 160;
    setInterval(function () {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            document.body.innerHTML = "";
        }
    }, 500);
})();

});