// Windows 98/2000 Style Homepage JavaScript

// Global Variables
let currentSection = 'profile';
let popupScore = 0;
let virusScore = 0;
let gameActive = false;
let upgradeMoney = 500;
let chatBotInterval;

// Winamp Variables
let isPlaying = false;
let currentTrack = 0;
let audioElement = null;
let winampPlaylist = [
    {
        title: "01. Green Day - American Idiot.mp3",
        file: "music/Green Day - American Idiot.mp3"
    },
    {
        title: "02. Rihanna - Pon De Replay.mp3", 
        file: "music/Rihanna - Pon De Replay.mp3"
    },
    {
        title: "03. Outkast - Hey Ya.mp3",
        file: "music/Outkast - Hey Ya.mp3"
    },
    {
        title: "04. The Killers - Mr. Brightside.mp3",
        file: "music/The Killers - Mr. Brightside.mp3"
    },
    {
        title: "05. Nelly - Hot In Herre.mp3",
        file: "music/Nelly - Hot In Herre.mp3"
    },
    {
        title: "06. Linkin Park - In The End.mp3",
        file: "music/Linkin Park - In The End.mp3"
    },
    {
        title: "07. Sum 41 - Still Waiting.mp3",
        file: "music/Sum 41 - Still Waiting.mp3"
    }
];

// Navigation Functions (removed - now all content is visible)

// HTML Editor Functions
function formatText(command) {
    const editor = document.getElementById('htmlEditor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    
    let formattedText = '';
    
    switch(command) {
        case 'bold':
            formattedText = `<b>${selectedText}</b>`;
            break;
        case 'italic':
            formattedText = `<i>${selectedText}</i>`;
            break;
        case 'underline':
            formattedText = `<u>${selectedText}</u>`;
            break;
    }
    
    editor.value = editor.value.substring(0, start) + formattedText + editor.value.substring(end);
    
    // Flash button effect
    const btn = event.target;
    btn.style.border = '1px inset #c0c0c0';
    setTimeout(() => {
        btn.style.border = '1px outset #c0c0c0';
    }, 100);
}

// Game Functions
function startPopupGame() {
    if (gameActive) return;
    
    gameActive = true;
    popupScore = 0;
    updatePopupScore();
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<div style="padding: 20px; text-align: center;">Click the pop-ups to close them! Game will end in 30 seconds.</div>';
    
    // Create pop-ups every 2 seconds
    const popupInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(popupInterval);
            return;
        }
        createPopup();
    }, 2000);
    
    // End game after 30 seconds
    setTimeout(() => {
        gameActive = false;
        clearInterval(popupInterval);
        gameArea.innerHTML = `<div style="padding: 20px; text-align: center;">Game Over! Final Score: ${popupScore}</div>`;
    }, 30000);
}

function createPopup() {
    const gameArea = document.getElementById('game-area');
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    
    const x = Math.random() * (gameArea.offsetWidth - 200);
    const y = Math.random() * (gameArea.offsetHeight - 100);
    
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    
    popup.innerHTML = `
        <div class="popup-title">!!! WARNING !!!</div>
        <div class="popup-content">
            Your computer has been infected!<br>
            Click X to close this window.
        </div>
        <button class="popup-close" onclick="closePopup(this)">×</button>
    `;
    
    gameArea.appendChild(popup);
    
    // Make popup blink
    popup.classList.add('blinking');
    
    // Auto-remove after 10 seconds if not clicked
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 10000);
}

function closePopup(button) {
    const popup = button.parentElement;
    popup.remove();
    popupScore++;
    updatePopupScore();
    
    // Play "uh-oh" sound (simulated with console)
    console.log('Uh-oh!');
}

function updatePopupScore() {
    document.getElementById('popup-score').textContent = `Score: ${popupScore}`;
}

function startVirusGame() {
    if (gameActive) return;
    
    gameActive = true;
    virusScore = 0;
    updateVirusScore();
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<div style="padding: 20px; text-align: center;">Catch the viruses! Click on trojan.exe files. Game will end when you catch 10 or after 45 seconds.</div>';
    
    // Create viruses every 1.5 seconds
    const virusInterval = setInterval(() => {
        if (!gameActive || virusScore >= 10) {
            clearInterval(virusInterval);
            if (virusScore >= 10) {
                gameActive = false;
                gameArea.innerHTML = '<div style="padding: 20px; text-align: center;">Congratulations! You caught all 10 viruses!</div>';
            }
            return;
        }
        createVirus();
    }, 1500);
    
    // End game after 45 seconds
    setTimeout(() => {
        if (gameActive) {
            gameActive = false;
            clearInterval(virusInterval);
            gameArea.innerHTML = `<div style="padding: 20px; text-align: center;">Time's up! You caught ${virusScore}/10 viruses.</div>`;
        }
    }, 45000);
}

function createVirus() {
    const gameArea = document.getElementById('game-area');
    const virus = document.createElement('div');
    virus.className = 'virus-icon';
    virus.textContent = 'EXE';
    virus.title = 'trojan.exe';
    
    const x = Math.random() * (gameArea.offsetWidth - 32);
    const y = Math.random() * (gameArea.offsetHeight - 32);
    
    virus.style.left = x + 'px';
    virus.style.top = y + 'px';
    
    virus.onclick = function() {
        virus.remove();
        virusScore++;
        updateVirusScore();
        
        if (virusScore >= 10) {
            gameActive = false;
        }
    };
    
    gameArea.appendChild(virus);
    
    // Auto-remove after 8 seconds if not clicked
    setTimeout(() => {
        if (virus.parentNode) {
            virus.remove();
        }
    }, 8000);
}

function updateVirusScore() {
    document.getElementById('virus-score').textContent = `Viruses Caught: ${virusScore}/10`;
}

function showUpgradeShop() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <div style="padding: 20px;">
            <h3>Pentium III Upgrade Shop</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                <div class="upgrade-item">
                    <div><strong>256MB RAM</strong></div>
                    <div>Price: $150</div>
                    <button onclick="buyUpgrade('ram', 150)">Buy</button>
                </div>
                <div class="upgrade-item">
                    <div><strong>Floppy Drive</strong></div>
                    <div>Price: $75</div>
                    <button onclick="buyUpgrade('floppy', 75)">Buy</button>
                </div>
                <div class="upgrade-item">
                    <div><strong>CPU Cooler</strong></div>
                    <div>Price: $45</div>
                    <button onclick="buyUpgrade('cooler', 45)">Buy</button>
                </div>
                <div class="upgrade-item">
                    <div><strong>Sound Blaster</strong></div>
                    <div>Price: $120</div>
                    <button onclick="buyUpgrade('sound', 120)">Buy</button>
                </div>
            </div>
            <div style="margin-top: 16px;">
                <div id="upgrade-status"></div>
            </div>
        </div>
    `;
    
    // Add CSS for upgrade items
    const style = document.createElement('style');
    style.textContent = `
        .upgrade-item {
            background: #c0c0c0;
            border: 1px outset #c0c0c0;
            padding: 8px;
            width: 120px;
            text-align: center;
            font-size: 11px;
        }
        .upgrade-item button {
            margin-top: 4px;
            padding: 2px 8px;
            background: #c0c0c0;
            border: 1px outset #c0c0c0;
            font-size: 10px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function buyUpgrade(item, price) {
    if (upgradeMoney >= price) {
        upgradeMoney -= price;
        document.getElementById('upgrade-money').textContent = `Money: $${upgradeMoney}`;
        document.getElementById('upgrade-status').innerHTML = `<div style="color: green;">Successfully purchased ${item}!</div>`;
        
        // Disable the button
        event.target.disabled = true;
        event.target.textContent = 'Owned';
        event.target.style.background = '#808080';
    } else {
        document.getElementById('upgrade-status').innerHTML = `<div style="color: red;">Not enough money!</div>`;
    }
    
    setTimeout(() => {
        const status = document.getElementById('upgrade-status');
        if (status) status.innerHTML = '';
    }, 3000);
}

// Chat Functions
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.innerHTML = `<span class="username">You:</span> <span class="text">${message}</span>`;
    messagesContainer.appendChild(userMessage);
    
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Auto-reply after 2 seconds
    setTimeout(() => {
        addBotMessage();
    }, 2000);
}

function addBotMessage() {
    const messages = [
        "LOL! That's so cool!",
        "Do you have MSN Messenger?",
        "Check out my new geocities page!",
        "I'm downloading MP3s on Napster",
        "What's your AIM screen name?",
        "This dial-up is so slow...",
        "Did you see the Matrix?",
        "I just got Windows XP!",
        "Want to play some Counter-Strike?",
        "My webpage has a visitor counter!"
    ];
    
    const usernames = ['CoolGuy2004', 'AngelGirl99', 'HackerDude', 'MusicLover'];
    const messagesContainer = document.getElementById('chatMessages');
    
    const botMessage = document.createElement('div');
    botMessage.className = 'message';
    
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    botMessage.innerHTML = `<span class="username">${randomUsername}:</span> <span class="text">${randomMessage}</span>`;
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Play "uh-oh" sound simulation
    console.log('Uh-oh! New message!');
}

function startChatBot() {
    if (chatBotInterval) return;
    
    chatBotInterval = setInterval(() => {
        if (currentSection === 'chat') {
            addBotMessage();
        }
    }, 15000); // Add bot message every 15 seconds
}

function stopChatBot() {
    if (chatBotInterval) {
        clearInterval(chatBotInterval);
        chatBotInterval = null;
    }
}

// Guestbook Functions
function addGuestbookEntry() {
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !message) {
        alert('Please fill in both name and message fields!');
        return;
    }
    
    const entriesContainer = document.getElementById('guestbookEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'entry';
    
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    
    newEntry.innerHTML = `
        <div class="entry-header">
            <strong>${name}</strong> - ${dateStr}
        </div>
        <div class="entry-message">
            ${message}
        </div>
    `;
    
    // Insert at the top
    entriesContainer.insertBefore(newEntry, entriesContainer.firstChild);
    
    // Clear form
    nameInput.value = '';
    messageInput.value = '';
    
    // Flash effect
    newEntry.style.background = '#ffff80';
    setTimeout(() => {
        newEntry.style.background = 'white';
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Allow Enter to send chat messages
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendMessage();
    }
    
    // Allow Enter to add guestbook entries when in message field
    if (e.key === 'Enter' && e.target.id === 'guestMessage' && e.ctrlKey) {
        addGuestbookEntry();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // All content is now visible, no need to show specific sections
    
    // Add some startup effects
    setTimeout(() => {
        console.log('Welcome to the Internet! - circa 2004');
    }, 1000);
    
    // Update visitor counter occasionally
    let visitorCount = 42;
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3);
        const counterElement = document.querySelector('.counter-digits');
        if (counterElement) {
            counterElement.textContent = visitorCount.toString().padStart(6, '0').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    }, 30000);
});

// Web Ring Functions
function navigateWebRing(direction) {
    const sites = [
        "TechGuru99's Amazing Page",
        "AnimeFreak2000's Kawaii Corner",
        "MusicDownloads4U Paradise",
        "GamerzZone Ultra",
        "CoolSite2004 Deluxe"
    ];
    
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    
    let message = '';
    switch(direction) {
        case 'prev':
            message = `Navigating to previous site: ${randomSite}`;
            break;
        case 'next':
            message = `Navigating to next site: ${randomSite}`;
            break;
        case 'random':
            message = `Random site selected: ${randomSite}`;
            break;
    }
    
    // Simulate navigation with alert
    alert(message + '\n\n(This would normally open in a new window)');
}

// Download Functions
function startDownload(category) {
    const progressDiv = document.getElementById('download-progress');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progressDiv.style.display = 'block';
    progressFill.style.width = '0%';
    
    let progress = 0;
    const messages = [
        'Connecting to server...',
        'Authenticating user...',
        'Locating file...',
        'Starting download...',
        'Downloading data...',
        'Verifying integrity...',
        'Download complete!'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        const messageIndex = Math.min(Math.floor(progress / 15), messages.length - 1);
        progressText.textContent = `${Math.floor(progress)}% - ${messages[messageIndex]}`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressDiv.style.display = 'none';
                alert('Download completed!\n\n(File would be saved to Downloads folder)');
            }, 1000);
        }
    }, 200);
}

// Initialize Audio Element
function initAudio() {
    if (!audioElement) {
        audioElement = new Audio();
        audioElement.volume = 0.7;
        
        // Add event listeners
        audioElement.addEventListener('loadedmetadata', updateTimeDisplay);
        audioElement.addEventListener('timeupdate', updateTimeDisplay);
        audioElement.addEventListener('ended', nextTrack);
        audioElement.addEventListener('error', handleAudioError);
    }
}

// Handle audio loading errors
function handleAudioError() {
    console.log('Audio loading error - file may not exist or be accessible');
    const songTitle = document.querySelector('.song-title');
    if (songTitle) {
        songTitle.textContent = `ERROR: ${winampPlaylist[currentTrack].title}`;
    }
}

// Update time display with real audio time
function updateTimeDisplay() {
    const songTime = document.querySelector('.song-time');
    if (songTime && audioElement) {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration || 0;
        
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        
        songTime.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
    }
}

// Winamp Player Functions
function updateWinampDisplay() {
    const songTitle = document.querySelector('.song-title');
    const songPath = document.querySelector('.song-path');
    const currentSong = winampPlaylist[currentTrack];
    
    if (songTitle) {
        songTitle.textContent = currentSong.title;
    }
    
    if (songPath) {
        songPath.textContent = `C:\\Users\\user\\Desktop\\old\\music\\${currentSong.title}`;
    }
    
    // Load new audio file
    if (audioElement) {
        audioElement.src = currentSong.file;
        audioElement.load();
    }
}

function togglePlayPause() {
    if (!audioElement) return;
    
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    } else {
        audioElement.play().catch(e => {
            console.log('Playback failed:', e.message);
            handleAudioError();
        });
        isPlaying = true;
    }
    
    const playButton = document.querySelector('.winamp-btn[title="Pause"], .winamp-btn[title="Play"]');
    if (playButton) {
        playButton.textContent = isPlaying ? '⏸' : '▶';
        playButton.title = isPlaying ? 'Pause' : 'Play';
    }
    
    // Update title bar to show playing/paused state
    const titleBar = document.querySelector('.winamp-title');
    if (titleBar) {
        const basePath = 'C:\\Users\\user\\Desktop\\old\\music - Winamp 2.91';
        titleBar.textContent = isPlaying ? basePath + ' - [Playing]' : basePath + ' - [Paused]';
    }
}

function previousTrack() {
    currentTrack = currentTrack > 0 ? currentTrack - 1 : winampPlaylist.length - 1;
    const wasPlaying = isPlaying;
    updateWinampDisplay();
    if (wasPlaying) {
        setTimeout(() => togglePlayPause(), 100);
    }
}

function nextTrack() {
    currentTrack = currentTrack < winampPlaylist.length - 1 ? currentTrack + 1 : 0;
    const wasPlaying = isPlaying;
    updateWinampDisplay();
    if (wasPlaying) {
        setTimeout(() => togglePlayPause(), 100);
    }
}

function stopPlayback() {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
    
    isPlaying = false;
    const playButton = document.querySelector('.winamp-btn[title="Pause"], .winamp-btn[title="Play"]');
    const titleBar = document.querySelector('.winamp-title');
    
    if (playButton) {
        playButton.textContent = '▶';
        playButton.title = 'Play';
    }
    
    if (titleBar) {
        titleBar.textContent = 'C:\\Users\\user\\Desktop\\old\\music - Winamp 2.91 - [Stopped]';
    }
}

// Add Winamp controls functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio and display
    initAudio();
    updateWinampDisplay();
    
    // Start chat bot since chat is always visible now
    startChatBot();
    
    // Add click handlers for Winamp buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('winamp-btn')) {
            // Button press effect
            e.target.style.border = '1px inset #c0c0c0';
            setTimeout(() => {
                e.target.style.border = '1px outset #c0c0c0';
            }, 100);
            
            // Handle different button actions based on title
            const buttonTitle = e.target.title;
            
            switch(buttonTitle) {
                case 'Previous':
                    previousTrack();
                    break;
                case 'Pause':
                case 'Play':
                    togglePlayPause();
                    break;
                case 'Next':
                    nextTrack();
                    break;
                case 'Stop':
                    stopPlayback();
                    break;
            }
        }
    });
    
    // Add more dynamic content
    setTimeout(() => {
        // Randomly update visitor counter
        setInterval(() => {
            const counter = document.querySelector('.counter-digits');
            if (counter) {
                let currentCount = parseInt(counter.textContent.replace(/,/g, ''));
                currentCount += Math.floor(Math.random() * 3) + 1;
                counter.textContent = currentCount.toString().padStart(6, '0').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
        }, 45000);
        

    }, 2000);
});

// Profile Save Functions
function saveProfile() {
    // Get form values
    const name = document.querySelector('input[placeholder="Enter your name"]').value;
    const band = document.querySelector('input[placeholder="e.g. Linkin Park"]').value;
    const emoticon = document.querySelector('.select-field').value;
    const photo = document.querySelector('.file-input').files[0];
    
    // Simple validation
    if (!name.trim()) {
        alert('Please enter your name!');
        return;
    }
    
    // Show confirmation dialog
    const confirmation = document.getElementById('save-confirmation');
    confirmation.style.display = 'flex';
    
    // Add some visual feedback
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.style.border = '1px inset #c0c0c0';
    saveBtn.textContent = '[ Saving... ]';
    
    // Simulate save delay
    setTimeout(() => {
        saveBtn.style.border = '1px outset #c0c0c0';
        saveBtn.textContent = '[ Save ]';
    }, 500);
    
    // Log saved data (in real app this would go to server)
    console.log('Profile saved:', {
        name: name,
        favoriteBand: band,
        favoriteEmoticon: emoticon,
        hasPhoto: !!photo
    });
}

function closeSaveConfirmation() {
    const confirmation = document.getElementById('save-confirmation');
    confirmation.style.display = 'none';
    
    // Add button press effect
    const okBtn = document.querySelector('.confirmation-ok');
    okBtn.style.border = '1px inset #c0c0c0';
    setTimeout(() => {
        okBtn.style.border = '1px outset #c0c0c0';
    }, 100);
}