// Mac Dynamic Island System - macOS Sequoia Edition
// Refined, Pixel-Perfect & Robust

const PRIORITY = {
  auth: 12, error: 10, call: 9, recording: 8, camera: 7, microphone: 7,
  QuickDrop: 6, download: 5, battery: 5, bluetooth: 4, media: 4,
  focus: 3, timer: 3, calendar: 3, navigation: 3,
  screenshot: 2, notification: 2, copy: 1, success: 1, idle: 0
};

const SIZE = {
  collapsed: { w: 130, h: 28, br: 14 },
  compact: { w: 215, h: 36, br: 18 },
  expanded: { w: 384, h: 182, br: 34 },
  idle_hover: { w: 260, h: 84, br: 24 },
  auth: { w: 164, h: 146, br: 32 },
  notification: { w: 300, h: 62, br: 22 },
  QuickDrop: { w: 290, h: 82, br: 24 },
  QuickDrop_compact: { w: 200, h: 36, br: 18 },
  download: { w: 290, h: 82, br: 24 },
  download_compact: { w: 200, h: 36, br: 18 },
  battery: { w: 195, h: 36, br: 18 },
  battery_expanded: { w: 290, h: 90, br: 24 },
  call: { w: 320, h: 130, br: 28 },
  call_compact: { w: 220, h: 36, br: 18 },
  recording: { w: 280, h: 78, br: 22 },
  recording_compact: { w: 180, h: 36, br: 18 },
  focus: { w: 185, h: 36, br: 18 },
  bluetooth: { w: 185, h: 36, br: 18 },
  camera: { w: 175, h: 36, br: 18 },
  microphone: { w: 195, h: 36, br: 18 },
  timer: { w: 185, h: 36, br: 18 },
  timer_expanded: { w: 260, h: 86, br: 24 },
  screenshot: { w: 205, h: 36, br: 18 },
  copy: { w: 155, h: 36, br: 18 },
  success: { w: 175, h: 36, br: 18 },
  error: { w: 225, h: 36, br: 18 }
};

// Internal Island State
const IslandState = {
  visible: false,
  mode: 'collapsed',
  type: null,
  priority: 0,
  persistent: false,
  autoDismiss: true,
  duration: 3500,
  data: {},
  _dismissTimer: null,
  _tickInterval: null,
  _hoverTimeout: null,
  tickValue: 0
};

// Robust Album Art Renderer with Never-Fail Fallback
function renderCover(src, size = 60, radius = 14, id = 'island-media-cover') {
  const fallbackGradient = 'linear-gradient(135deg, #ff2d55 0%, #a200ff 100%)';
  const hasSrc = src && typeof src === 'string' && src.trim().length > 0;
  
  return `
    <div style="position:relative;width:${size}px;height:${size}px;border-radius:${radius}px;overflow:hidden;background:#151517;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.14);display:flex;align-items:center;justify-content:center;">
      ${hasSrc ? `
        <img id="${id}" src="${src}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
      ` : ''}
      <div class="island-art-fallback" style="display:${hasSrc ? 'none' : 'flex'};position:absolute;inset:0;width:100%;height:100%;background:${fallbackGradient};align-items:center;justify-content:center;">
        <i class="fas fa-music" style="color:#ffffff;font-size:${Math.round(size * 0.4)}px;opacity:0.95;"></i>
      </div>
    </div>
  `;
}

// Scrubber Click Handler
window._islandScrub = function(event) {
  event.stopPropagation();
  const bar = document.getElementById('island-media-scrub-track');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
  
  // Instant visual feedback
  const fill = document.getElementById('island-media-bar');
  if (fill) fill.style.width = `${pct}%`;
  
  // Dispatch seek event to active players
  window.dispatchEvent(new CustomEvent('mac-island-seek', { detail: { percent: pct } }));
};

// Island View Templates
const T = {
  idle_hover: () => {
    return `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;padding:12px 18px;box-sizing:border-box;">
      <div style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg, #fa243c, #8900ff);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(250,36,60,0.35);border:1px solid rgba(255,255,255,0.18);">
          <i class="fab fa-apple" style="color:white;font-size:22px;"></i>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.2;">
          <span style="font-size:14px;font-weight:700;color:white;letter-spacing:-0.2px;">Apple Music</span>
          <span style="font-size:12px;color:rgba(255,255,255,0.6);font-weight:500;">Ready to Play</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:16px;">
        <button style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.15s;" onmousedown="this.style.transform='scale(0.92)'" onmouseup="this.style.transform='scale(1)'" onclick="event.stopPropagation(); if(window.appState && window.appState.openApp) window.appState.openApp('music')">
          <i class="fas fa-play" style="font-size:13px;margin-left:2px;"></i>
        </button>
      </div>
    </div>`;
  },

  media_compact: (d) => `<div class="island-row" style="justify-content:space-between;width:100%;height:100%;padding:0 12px;align-items:center;box-sizing:border-box;cursor:pointer;" onclick="IslandBus.toggleExpand()">
    <div style="display:flex;align-items:center;gap:8px;overflow:hidden;flex:1;">
      ${renderCover(d.cover, 22, 5, 'island-media-compact-cover')}
      <span id="island-media-compact-title" style="font-size:12.5px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.2px;max-width:130px;">${d.title || 'Playing'}</span>
    </div>
    <!-- Mini Equalizer Waveform -->
    <div style="display:flex;align-items:center;gap:2.5px;height:14px;margin-left:6px;flex-shrink:0;">
      <div style="width:2.5px;background:#fa243c;border-radius:1.5px;height:${d.playing ? '8px' : '3px'};${d.playing ? 'animation: islandWave 0.7s ease-in-out infinite alternate;' : ''}"></div>
      <div style="width:2.5px;background:#ff5b6b;border-radius:1.5px;height:${d.playing ? '13px' : '5px'};${d.playing ? 'animation: islandWave 0.5s ease-in-out infinite alternate 0.2s;' : ''}"></div>
      <div style="width:2.5px;background:#ffffff;border-radius:1.5px;height:${d.playing ? '7px' : '3px'};${d.playing ? 'animation: islandWave 0.8s ease-in-out infinite alternate 0.4s;' : ''}"></div>
    </div>
  </div>`,

  media_expanded: (d) => `<div style="display:flex;flex-direction:column;width:100%;height:100%;padding:18px 22px 16px;box-sizing:border-box;justify-content:space-between;background:transparent;user-select:none;">
    <!-- Top Row: Cover, Info & Visualizer -->
    <div style="display:flex;align-items:center;width:100%;gap:16px;">
      <!-- Album Art (Click to open Music) -->
      <div style="cursor:pointer;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        ${renderCover(d.cover, 58, 14, 'island-media-cover')}
      </div>

      <!-- Track Info -->
      <div style="display:flex;flex-direction:column;flex:1;overflow:hidden;text-align:left;line-height:1.2;cursor:pointer;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        <span id="island-media-title" style="font-size:16px;font-weight:700;color:#ffffff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.3px;">${d.title || 'Song Title'}</span>
        <span id="island-media-artist" style="font-size:14px;color:rgba(255,255,255,0.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500;margin-top:3px;">${d.artist || 'Artist Name'}</span>
        <span style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.8px;margin-top:4px;">${d.format || 'Apple Music • Lossless'}</span>
      </div>

      <!-- Right 4-Bar EQ Visualizer -->
      <div style="display:flex;align-items:center;gap:3px;height:24px;flex-shrink:0;align-self:flex-start;margin-top:4px;">
        <div style="width:3px;background:#fa243c;border-radius:1.5px;height:${d.playing ? '12px' : '4px'};${d.playing ? 'animation: islandWave 0.7s ease-in-out infinite alternate;' : ''}"></div>
        <div style="width:3px;background:#ff375f;border-radius:1.5px;height:${d.playing ? '18px' : '6px'};${d.playing ? 'animation: islandWave 0.5s ease-in-out infinite alternate 0.2s;' : ''}"></div>
        <div style="width:3px;background:#ff9f0a;border-radius:1.5px;height:${d.playing ? '10px' : '5px'};${d.playing ? 'animation: islandWave 0.6s ease-in-out infinite alternate 0.35s;' : ''}"></div>
        <div style="width:3px;background:#ffffff;border-radius:1.5px;height:${d.playing ? '16px' : '3px'};${d.playing ? 'animation: islandWave 0.8s ease-in-out infinite alternate 0.1s;' : ''}"></div>
      </div>
    </div>

    <!-- Middle Row: Interactive Scrubber Bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:12px;">
      <span id="island-media-time" style="font-size:11.5px;color:rgba(255,255,255,0.55);width:36px;font-variant-numeric:tabular-nums;font-weight:500;">${d.time || '0:00'}</span>
      
      <!-- Interactive Scrub Track -->
      <div id="island-media-scrub-track" onclick="window._islandScrub(event)" style="flex:1;height:6px;background:rgba(255,255,255,0.18);border-radius:3px;margin:0 12px;position:relative;cursor:pointer;">
        <div id="island-media-bar" style="width:${d.progress || 0}%;height:100%;background:#ffffff;border-radius:3px;position:relative;pointer-events:none;transition:width 0.1s linear;">
          <div style="position:absolute;right:-4px;top:50%;transform:translateY(-50%);width:8px;height:8px;border-radius:50%;background:#ffffff;box-shadow:0 0 6px rgba(255,255,255,0.8);"></div>
        </div>
      </div>

      <span id="island-media-rem" style="font-size:11.5px;color:rgba(255,255,255,0.55);width:40px;text-align:right;font-variant-numeric:tabular-nums;font-weight:500;">${d.remaining || '-0:00'}</span>
    </div>

    <!-- Bottom Row: Controls -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:10px;padding:0 10px;">
      <!-- Favorite Star -->
      <i id="island-media-fav" class="${d.isFavorite ? 'fas fa-star' : 'far fa-star'}" style="font-size:17px;color:${d.isFavorite ? '#ffd60a' : 'rgba(255,255,255,0.55)'};cursor:pointer;transition:all 0.15s;" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-favorite'))"></i>
      
      <!-- Previous -->
      <i class="fas fa-backward" style="font-size:20px;color:#ffffff;cursor:pointer;transition:transform 0.1s, opacity 0.15s;" onmousedown="this.style.transform='scale(0.88)'" onmouseup="this.style.transform='scale(1)'" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-prev'))"></i>
      
      <!-- Play / Pause -->
      <i id="island-media-playbtn" class="fas ${d.playing ? 'fa-pause' : 'fa-play'}" style="font-size:26px;color:#ffffff;cursor:pointer;transition:transform 0.1s, opacity 0.15s;" onmousedown="this.style.transform='scale(0.9)'" onmouseup="this.style.transform='scale(1)'" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-toggle-play'))"></i>

      <!-- Next -->
      <i class="fas fa-forward" style="font-size:20px;color:#ffffff;cursor:pointer;transition:transform 0.1s, opacity 0.15s;" onmousedown="this.style.transform='scale(0.88)'" onmouseup="this.style.transform='scale(1)'" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-next'))"></i>
      
      <!-- AirPlay Audio Output Indicator -->
      <div style="display:flex;align-items:center;gap:4px;cursor:pointer;opacity:0.6;transition:opacity 0.15s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'" onclick="event.stopPropagation(); if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/>
          <polygon points="12 15 17 21 7 21 12 15"/>
        </svg>
      </div>
    </div>
  </div>`,

  QuickDrop_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <div class="island-row" style="gap:8px;"><i class="fas fa-wifi" style="color:#0a84ff;font-size:15px;"></i><span style="font-weight:700;color:white;font-size:13px;">QuickDrop</span></div>
      <span style="font-size:12px;color:#0a84ff;font-weight:700;">${d.progress || 50}%</span>
    </div>
    <div style="width:100%;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;margin:8px 0;">
      <div style="width:${d.progress || 50}%;height:100%;background:linear-gradient(90deg, #0a84ff, #5ac8fa);border-radius:3px;transition:width 0.3s ease;"></div>
    </div>
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:12px;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">${d.filename || 'File.png'}</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.45);cursor:pointer;" onclick="IslandBus.close()">Cancel</span>
    </div>
  </div>`,

  QuickDrop_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;"><i class="fas fa-wifi" style="color:#0a84ff;font-size:13px;"></i><span style="font-size:12px;font-weight:600;color:white;">QuickDrop</span></div>
    <span style="font-size:11.5px;color:#0a84ff;font-weight:700;">${d.progress || 50}%</span>
  </div>`,

  download_compact: (d) => `<div class="island-row" style="justify-content:space-between;width:100%;height:100%;padding:0 14px;align-items:center;">
    <span style="font-size:12.5px;color:white;font-weight:600;"><i class="fas fa-arrow-down" style="color:#0a84ff;margin-right:8px;"></i>Downloading</span>
    <span style="font-size:12px;font-weight:700;color:#0a84ff;">${d.progress || '0'}%</span>
  </div>`,

  download_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:13px;font-weight:700;color:white;">Downloading File</span>
      <span style="font-size:13px;font-weight:700;color:#0a84ff;">${d.progress || '0'}%</span>
    </div>
    <div style="width:100%;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;margin:8px 0;">
      <div style="width:${d.progress || '0'}%;height:100%;background:linear-gradient(90deg, #0a84ff, #64d2ff);border-radius:3px;transition:width 0.3s ease;"></div>
    </div>
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:11.5px;color:rgba(255,255,255,0.65);">${d.filename || 'macOS_Update.pkg'}</span>
      <span style="font-size:11px;color:#ff453a;cursor:pointer;" onclick="IslandBus.close()">Cancel</span>
    </div>
  </div>`,

  recording_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <div style="width:8px;height:8px;border-radius:50%;background:#ff3b30;animation:islandPulse 1s infinite alternate;"></div>
      <span style="font-size:12px;color:white;font-weight:700;letter-spacing:0.5px;">REC</span>
    </div>
    <span id="island-live-tick" style="font-size:12px;color:rgba(255,255,255,0.8);font-family:monospace;font-weight:600;">00:00</span>
  </div>`,

  recording_expanded: () => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <div class="island-row" style="gap:8px;">
        <div style="width:10px;height:10px;border-radius:50%;background:#ff3b30;animation:islandPulse 1s infinite alternate;"></div>
        <span style="font-size:13.5px;font-weight:700;color:white;">Screen Recording</span>
      </div>
      <span id="island-live-tick" style="font-size:13px;color:rgba(255,255,255,0.8);font-family:monospace;font-weight:600;">00:00</span>
    </div>
    <div class="island-row" style="width:100%;justify-content:flex-end;">
      <button style="background:rgba(255,59,48,0.25);border:1px solid rgba(255,59,48,0.6);color:#ff453a;padding:5px 14px;border-radius:12px;font-size:12px;font-weight:600;cursor:pointer;" onclick="IslandBus.close()">Stop Recording</button>
    </div>
  </div>`,

  camera_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <div style="width:7px;height:7px;border-radius:50%;background:#30d158;box-shadow:0 0 6px #30d158;"></div>
    <span style="font-size:12px;color:white;font-weight:600;">Camera Active</span>
  </div>`,

  microphone_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <div style="width:7px;height:7px;border-radius:50%;background:#ff9f0a;box-shadow:0 0 6px #ff9f0a;"></div>
    <span style="font-size:12px;color:white;font-weight:600;">Microphone Active</span>
  </div>`,

  focus_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-moon" style="color:#bf5af2;font-size:12px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.name || 'Do Not Disturb'}</span>
  </div>`,

  battery_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <i class="fas fa-bolt" style="color:#30d158;font-size:13px;"></i>
      <span style="font-size:12.5px;color:white;font-weight:600;">Charging</span>
    </div>
    <span style="font-size:12.5px;font-weight:700;color:#30d158;">${d.percent || 100}%</span>
  </div>`,

  battery_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:13px;font-weight:700;color:white;">Power & Battery</span>
      <span style="font-size:13px;font-weight:700;color:#30d158;">${d.percent || '100'}%</span>
    </div>
    <div class="island-row" style="gap:14px;align-items:center;">
      <i class="fas fa-bolt" style="font-size:24px;color:#30d158;"></i>
      <div class="island-col" style="align-items:flex-start;">
        <span style="font-size:14px;font-weight:600;color:white;">MagSafe Connected</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.6);">Fully Charged in 24 min</span>
      </div>
    </div>
    <div style="width:100%;height:5px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;">
      <div style="width:${d.percent || '100'}%;height:100%;background:linear-gradient(90deg, #30d158, #34c759);border-radius:3px;"></div>
    </div>
  </div>`,

  bluetooth_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fab fa-bluetooth-b" style="color:#0a84ff;font-size:13px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.name || 'AirPods Connected'}</span>
  </div>`,

  timer_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <i class="fas fa-stopwatch" style="color:#ff9f0a;font-size:13px;"></i>
    <span style="font-size:12.5px;font-weight:700;color:white;font-family:monospace;">${d.time || '00:00'}</span>
  </div>`,

  call_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <i class="fas fa-phone-alt" style="color:#30d158;font-size:12px;"></i>
      <span style="font-size:12.5px;color:white;font-weight:600;">${d.name || 'Video Call'}</span>
    </div>
    <span style="font-size:11px;color:rgba(255,255,255,0.7);">00:12</span>
  </div>`,

  call_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:12.5px;color:#30d158;font-weight:700;">Video Call Audio</span>
      <span style="font-size:12px;color:white;" id="island-live-tick">00:00</span>
    </div>
    <div class="island-row" style="gap:12px;align-items:center;">
      <div style="width:38px;height:38px;border-radius:50%;background:#444;display:flex;align-items:center;justify-content:center;"><i class="fas fa-user" style="color:white;"></i></div>
      <span style="font-size:14.5px;font-weight:700;color:white;">${d.name || 'Caller'}</span>
    </div>
    <div class="island-row" style="width:100%;justify-content:center;gap:20px;">
      <div style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="fas fa-microphone-slash" style="color:white;font-size:12px;"></i></div>
      <div style="width:34px;height:34px;border-radius:50%;background:#ff453a;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="IslandBus.close()"><i class="fas fa-phone-slash" style="color:white;font-size:12px;"></i></div>
    </div>
  </div>`,

  screenshot_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-camera" style="color:#0a84ff;font-size:12px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">Screenshot Saved</span>
  </div>`,

  copy_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-check" style="color:#30d158;font-size:12px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">Copied</span>
  </div>`,

  success_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-check-circle" style="color:#30d158;font-size:13px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.text || d.message || 'Success'}</span>
  </div>`,

  error_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-exclamation-triangle" style="color:#ff453a;font-size:13px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.text || d.message || 'Error'}</span>
  </div>`,

  notification_compact: (d) => {
    const isFa = typeof d.icon === 'string' && (d.icon.startsWith('fa') || d.icon.includes(' '));
    return `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:flex-start;gap:8px;align-items:center;">
      ${isFa ? `<i class="${d.icon}" style="color:#0a84ff;font-size:13px;"></i>` : `<img src="${d.icon || 'images/Icons/Messages.png'}" style="width:16px;height:16px;border-radius:4px;object-fit:contain;" onerror="this.style.display='none'">`}
      <span style="font-size:12.5px;color:white;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.title || 'Notification'}${d.subtitle ? ' · ' + d.subtitle : ''}</span>
    </div>`;
  },

  notification_expanded: (d) => {
    const isFa = typeof d.icon === 'string' && (d.icon.startsWith('fa') || d.icon.includes(' '));
    return `<div class="island-row" style="width:100%;height:100%;padding:0 14px;align-items:center;gap:12px;box-sizing:border-box;">
      <div style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${isFa ? `<i class="${d.icon}" style="color:#0a84ff;font-size:16px;"></i>` : `<img src="${d.icon || 'images/Icons/Messages.png'}" style="width:24px;height:24px;border-radius:5px;object-fit:contain;" onerror="this.src='images/Icons/Finder.png'">`}
      </div>
      <div class="island-col" style="align-items:flex-start;flex:1;overflow:hidden;line-height:1.25;">
        <span style="font-size:13px;font-weight:700;color:white;letter-spacing:-0.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;">${d.title || 'Notification'}</span>
        <span style="font-size:11.5px;color:rgba(255,255,255,0.7);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;margin-top:2px;">${d.subtitle || ''}</span>
      </div>
    </div>`;
  },

  auth_expanded: (d) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:14px 10px;box-sizing:border-box;gap:8px;">
    <div style="position:relative;width:72px;height:72px;display:flex;align-items:center;justify-content:center;">
      <svg style="width:100%;height:100%;position:absolute;inset:0;pointer-events:none;" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g id="island-face-group" class="icon-group scanning-pulse" stroke="white" stroke-width="4.5">
          <path d="M 35 10 h -7 c -9.94 0 -18 8.06 -18 18 v 7" class="draw-path" style="animation-delay: 0.0s" />
          <path d="M 65 10 h 7 c 9.94 0 18 8.06 18 18 v 7" class="draw-path" style="animation-delay: 0.08s" />
          <path d="M 35 90 h -7 c -9.94 0 -18 -8.06 -18 -18 v -7" class="draw-path" style="animation-delay: 0.16s" />
          <path d="M 65 90 h 7 c 9.94 0 18 -8.06 18 -18 v -7" class="draw-path" style="animation-delay: 0.24s" />
          <path d="M 36 36 v 14" class="draw-path" style="animation-delay: 0.35s" />
          <path d="M 64 36 v 14" class="draw-path" style="animation-delay: 0.35s" />
          <path d="M 50 40 v 10 c 0 2 1.5 4 4 4 h 2" class="draw-path" style="animation-delay: 0.45s" />
          <path d="M 32 64 Q 50 84 68 64" class="draw-path" style="animation-delay: 0.55s" />
        </g>
        <g id="island-tick-group" class="icon-group" style="transform: scale(0.5); display: none; opacity: 0;" stroke="#32D74B">
          <circle cx="50" cy="50" r="40" class="tick-circle" stroke-width="5" id="island-circle-anim" />
          <path d="M 30 52 l 12 12 l 28 -26" class="tick-check" stroke-width="6" id="island-check-anim" />
        </g>
      </svg>
    </div>
    <span id="island-auth-label" style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.9);letter-spacing:-0.2px;transition:color 0.2s ease;">${d.title || 'Face ID'}</span>
  </div>`,

  collapsed: () => ``
};

// Template Resolver
const getTemplate = (type, mode, data) => {
  if (mode === 'idle_hover') return T.idle_hover();
  if (mode === 'collapsed') return T.collapsed();
  const key = `${type}_${mode}`;
  if (T[key]) return T[key](data);
  if (mode === 'expanded' && T[`${type}_compact`]) return T[`${type}_compact`](data);
  return `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;align-items:center;"><span style="font-size:12.5px;font-weight:600;color:white;">${type}</span></div>`;
};

// Event Bus & State Machine
const IslandBus = {
  toggleExpand: () => {
    if (!IslandState.visible) return;
    if (IslandState.mode === 'compact') {
      IslandState.mode = 'expanded';
      IslandBus.render();
    } else if (IslandState.mode === 'expanded') {
      IslandState.mode = 'compact';
      IslandBus.render();
    }
  },

  dispatch: (opts) => {
    const prio = PRIORITY[opts.type] || 0;
    
    if (IslandState.visible && prio < IslandState.priority) {
      return;
    }

    const isSameActiveType = IslandState.visible && IslandState.type === opts.type;
    let targetMode = opts.mode;
    if (!targetMode) {
      if (isSameActiveType && IslandState.mode !== 'collapsed' && IslandState.mode !== 'idle_hover') {
        // Retain current mode (e.g. if already expanded)
        targetMode = IslandState.mode;
      } else {
        if (['media', 'recording', 'call', 'focus', 'bluetooth', 'camera', 'microphone', 'screenshot', 'copy', 'success', 'error', 'battery', 'timer', 'QuickDrop', 'download'].includes(opts.type)) {
          targetMode = 'compact';
        } else {
          targetMode = 'expanded';
        }
      }
    }

    const sameMode = (IslandState.mode !== 'collapsed' && IslandState.mode !== 'idle_hover') && (IslandState.mode === targetMode);

    IslandState.type = opts.type;
    IslandState.mode = targetMode;
    IslandState.data = opts.data || {};
    IslandState.priority = prio;
    IslandState.persistent = opts.persistent || false;
    IslandState.autoDismiss = opts.autoDismiss !== false;
    IslandState.duration = opts.duration || 3500;

    if (isSameActiveType && sameMode) {
      IslandBus.updateInPlace();
      return;
    }

    IslandBus.render();
  },

  updateInPlace: () => {
    const content = document.getElementById('islandContent');
    if (!content) return;

    // Smooth real-time media updates
    if (IslandState.type === 'media') {
      const d = IslandState.data;
      if (IslandState.mode === 'expanded') {
        const timeEl = document.getElementById('island-media-time');
        const remEl = document.getElementById('island-media-rem');
        const barEl = document.getElementById('island-media-bar');
        const titleEl = document.getElementById('island-media-title');
        const artistEl = document.getElementById('island-media-artist');
        const playBtn = document.getElementById('island-media-playbtn');
        const favBtn = document.getElementById('island-media-fav');
        const coverEl = document.getElementById('island-media-cover');

        if (timeEl) timeEl.textContent = d.time || '0:00';
        if (remEl) remEl.textContent = d.remaining || '-0:00';
        if (barEl) barEl.style.width = `${d.progress || 0}%`;
        if (titleEl && d.title) titleEl.textContent = d.title;
        if (artistEl && d.artist) artistEl.textContent = d.artist;
        if (playBtn) playBtn.className = `fas ${d.playing ? 'fa-pause' : 'fa-play'}`;
        if (favBtn) {
          favBtn.className = d.isFavorite ? 'fas fa-star' : 'far fa-star';
          favBtn.style.color = d.isFavorite ? '#ffd60a' : 'rgba(255,255,255,0.55)';
        }
        if (coverEl && d.cover && coverEl.src !== d.cover) {
          coverEl.src = d.cover;
          coverEl.style.display = 'block';
        }
        return;
      } else if (IslandState.mode === 'compact') {
        const compactTitle = document.getElementById('island-media-compact-title');
        const compactCover = document.getElementById('island-media-compact-cover');
        if (compactTitle && d.title) compactTitle.textContent = d.title;
        if (compactCover && d.cover && compactCover.src !== d.cover) {
          compactCover.src = d.cover;
          compactCover.style.display = 'block';
        }
        return;
      }
    }

    content.innerHTML = getTemplate(IslandState.type, IslandState.mode, IslandState.data);
  },

  render: () => {
    const el = document.getElementById('dynamicIsland');
    const content = document.getElementById('islandContent');
    if (!el || !content) return;

    if (IslandState._dismissTimer) clearTimeout(IslandState._dismissTimer);
    if (IslandState._tickInterval) clearInterval(IslandState._tickInterval);

    if (IslandState.mode !== 'idle_hover') IslandState.visible = true;
    
    // Determine sizing
    let size;
    if (IslandState.type === 'auth') {
      size = SIZE.auth;
    } else if (IslandState.mode === 'compact') {
      size = SIZE[`${IslandState.type}_compact`] || SIZE[IslandState.type] || SIZE.compact;
    } else if (IslandState.mode === 'expanded') {
      size = SIZE[`${IslandState.type}_expanded`] || (T[`${IslandState.type}_expanded`] ? SIZE.expanded : (SIZE[IslandState.type] || SIZE.compact));
    } else {
      size = SIZE[IslandState.mode] || SIZE.compact;
    }

    el.style.width = size.w + 'px';
    el.style.height = size.h + 'px';
    el.style.borderRadius = `0 0 ${size.br}px ${size.br}px`;

    content.style.opacity = '0';
    
    setTimeout(() => {
      content.innerHTML = getTemplate(IslandState.type, IslandState.mode, IslandState.data);
      content.style.opacity = '1';
      content.style.visibility = 'visible';
      IslandBus.startLiveTick();
    }, 120);

    // Hover logic with debouncing
    el.onmouseenter = () => {
      if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
      IslandState._hoverTimeout = setTimeout(() => {
        if (!IslandState.visible) {
          IslandState.mode = 'idle_hover';
          IslandBus.render();
        } else if (IslandState.mode === 'compact' && (T[`${IslandState.type}_expanded`] || IslandState.type === 'media')) {
          IslandState.mode = 'expanded';
          IslandBus.render();
        }
      }, 160);
    };

    el.onmouseleave = () => {
      if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
      IslandState._hoverTimeout = setTimeout(() => {
        if (!IslandState.visible && IslandState.mode === 'idle_hover') {
          IslandState.mode = 'collapsed';
          IslandBus.render();
        } else if (IslandState.visible && IslandState.mode === 'expanded' && IslandState.type) {
          IslandState.mode = 'compact';
          IslandBus.render();
        }
      }, 220);
    };

    // Auto dismiss for transient notifications
    if (IslandState.autoDismiss && !IslandState.persistent) {
      IslandState._dismissTimer = setTimeout(() => {
        IslandBus.close();
      }, IslandState.duration);
    }
  },

  close: () => {
    const el = document.getElementById('dynamicIsland');
    const content = document.getElementById('islandContent');
    if (!el || !content) return;

    if (IslandState._dismissTimer) clearTimeout(IslandState._dismissTimer);
    if (IslandState._tickInterval) clearInterval(IslandState._tickInterval);
    if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);

    IslandState.visible = false;
    IslandState.type = null;
    IslandState.priority = 0;
    IslandState.mode = 'collapsed';

    const size = SIZE.collapsed;
    el.style.width = size.w + 'px';
    el.style.height = size.h + 'px';
    el.style.borderRadius = `0 0 ${size.br}px ${size.br}px`;
    
    content.style.opacity = '0';
    setTimeout(() => { if (!IslandState.visible) content.style.visibility = 'hidden'; }, 200);

    el.onmouseenter = () => {
      if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
      IslandState._hoverTimeout = setTimeout(() => {
        if (!IslandState.visible) {
          IslandState.mode = 'idle_hover';
          IslandBus.render();
        }
      }, 160);
    };

    el.onmouseleave = () => {
      if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
      IslandState._hoverTimeout = setTimeout(() => {
        if (!IslandState.visible && IslandState.mode === 'idle_hover') {
          IslandState.mode = 'collapsed';
          IslandBus.render();
        }
      }, 220);
    };
  },

  startLiveTick: () => {
    const tickEl = document.getElementById('island-live-tick');
    if (!tickEl) return;

    IslandState.tickValue = 0;
    IslandState._tickInterval = setInterval(() => {
      IslandState.tickValue++;
      const m = String(Math.floor(IslandState.tickValue / 60)).padStart(2, '0');
      const s = String(IslandState.tickValue % 60).padStart(2, '0');
      const el = document.getElementById('island-live-tick');
      if (el) el.innerText = `${m}:${s}`;
    }, 1000);
  }
};

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  IslandBus.close();
});
setTimeout(() => {
  IslandBus.close();
}, 100);

// Global Public API
window.MacIsland = {
  dispatch: IslandBus.dispatch,
  dismiss: IslandBus.close,
  expand: () => { IslandState.mode = 'expanded'; IslandBus.render(); },
  collapse: () => { IslandState.mode = 'compact'; IslandBus.render(); },
  
  media: (title, artist, playing=true, cover=null, time='0:00', duration='3:20', progress=0, remaining='-0:00', isFavorite=false, format='Lossless') => {
    IslandBus.dispatch({ 
      type: 'media', 
      data: { title, artist, playing, cover, time, duration, progress, remaining, isFavorite, format }, 
      autoDismiss: false, 
      persistent: true 
    });
  },
  
  QuickDrop: (filename, progress=50) => IslandBus.dispatch({ type: 'QuickDrop', data: { filename, progress } }),
  download: (progress, filename) => IslandBus.dispatch({ type: 'download', data: { progress, filename }, autoDismiss: false }),
  recording: () => IslandBus.dispatch({ type: 'recording', autoDismiss: false, persistent: true }),
  microphone: () => IslandBus.dispatch({ type: 'microphone', duration: 3500 }),
  camera: () => IslandBus.dispatch({ type: 'camera', duration: 3500 }),
  focus: (name) => IslandBus.dispatch({ type: 'focus', data: { name }, duration: 3000 }),
  battery: (percent) => IslandBus.dispatch({ type: 'battery', data: { percent }, duration: 4000 }),
  bluetooth: (name) => IslandBus.dispatch({ type: 'bluetooth', data: { name }, duration: 3500 }),
  timer: (time) => IslandBus.dispatch({ type: 'timer', data: { time }, autoDismiss: false }),
  call: (name) => IslandBus.dispatch({ type: 'call', data: { name }, autoDismiss: false, persistent: true }),
  copy: () => IslandBus.dispatch({ type: 'copy', duration: 1800 }),
  success: (text) => IslandBus.dispatch({ type: 'success', data: { text }, duration: 2500 }),
  error: (message) => IslandBus.dispatch({ type: 'error', data: { message }, duration: 4500 }),
  notification: (title, subtitle, icon, duration = 3500) => IslandBus.dispatch({ type: 'notification', data: { title, subtitle, icon }, duration }),
  screenshot: () => IslandBus.dispatch({ type: 'screenshot', duration: 2500 }),
  auth: (title = 'Face ID') => {
    return new Promise((resolve) => {
      IslandBus.dispatch({ 
        type: 'auth', 
        mode: 'expanded', 
        data: { title }, 
        autoDismiss: false, 
        persistent: true 
      });

      // Step 1: Scanning pulse animation (1050ms)
      setTimeout(() => {
        const faceGroup = document.getElementById('island-face-group');
        const tickGroup = document.getElementById('island-tick-group');
        const circleAnim = document.getElementById('island-circle-anim');
        const checkAnim = document.getElementById('island-check-anim');
        const authLabel = document.getElementById('island-auth-label');

        if (faceGroup) {
          faceGroup.classList.remove('scanning-pulse');
          faceGroup.style.transform = 'scale(0.65)';
          faceGroup.style.opacity = '0';
        }

        // Step 2: Smooth transition to green checkmark tick (240ms)
        setTimeout(() => {
          if (faceGroup) faceGroup.style.display = 'none';
          if (tickGroup) {
            tickGroup.style.display = 'block';
            void tickGroup.offsetWidth;
            tickGroup.style.opacity = '1';
            tickGroup.style.transform = 'scale(1)';
          }
          if (circleAnim) {
            circleAnim.style.animation = 'drawCircle 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
          }
          if (checkAnim) {
            checkAnim.style.animation = 'drawCheck 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.1s';
          }
          if (authLabel) {
            authLabel.style.color = '#32D74B';
            authLabel.textContent = 'Unlocked';
          }

          if (window.MacAudio) {
            try { MacAudio.play('unlock'); } catch (e) {}
          }

          // Step 3: Hold verified state, then dismiss Island smoothly (650ms)
          setTimeout(() => {
            IslandBus.close();
            setTimeout(() => {
              resolve(true);
            }, 260);
          }, 650);
        }, 240);
      }, 1050);
    });
  }
};

