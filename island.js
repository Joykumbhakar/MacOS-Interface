// Mac Dynamic Island System - macOS Sequoia Edition
const PRIORITY = {
  auth: 12, error: 10, call: 9, recording: 8, camera: 7, microphone: 7,
  airdrop: 6, download: 5, battery: 5, bluetooth: 4, media: 4,
  focus: 3, timer: 3, calendar: 3, navigation: 3,
  screenshot: 2, notification: 2, copy: 1, success: 1, idle: 0
};

const SIZE = {
  collapsed: { w: 140, h: 32, br: 16 },
  compact: { w: 205, h: 36, br: 16 },
  expanded: { w: 380, h: 168, br: 36 },
  detail: { w: 380, h: 220, br: 24 },
  idle_hover: { w: 220, h: 96, br: 24 },
  auth: { w: 164, h: 142, br: 36 }
};

// Internal State
const IslandState = {
  visible: false,
  mode: 'collapsed',
  type: null,
  priority: 0,
  persistent: false,
  autoDismiss: true,
  duration: 3000,
  data: {},
  _dismissTimer: null,
  _tickInterval: null,
  tickValue: 0
};

// Templates
const T = {
  idle_hover: () => {
    return `<div class="island-col" style="width:100%;height:100%;padding:12px 16px;justify-content:center;box-sizing:border-box;">
      <div style="display:flex;align-items:center;gap:12px;cursor:pointer;width:100%;" onclick="if(window.appState) window.appState.openApp('music')">
        <img src="images/Music_Alums/album1.png" style="width:40px;height:40px;border-radius:8px;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
        <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.2;flex:1;">
          <span style="font-size:14px;font-weight:700;color:white;letter-spacing:-0.2px;">Music</span>
          <span style="font-size:11.5px;color:rgba(255,255,255,0.6);font-weight:500;">Not Playing</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:24px;justify-content:center;width:100%;margin-top:10px;">
         <i class="fas fa-backward" style="color:rgba(255,255,255,0.4);font-size:14px;cursor:pointer;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)'" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-prev'))"></i>
         <i class="fas fa-play" style="color:white;font-size:18px;cursor:pointer;transition:transform 0.1s;" onmousedown="this.style.transform='scale(0.9)'" onmouseup="this.style.transform='scale(1)'" onclick="event.stopPropagation(); if(window.appState) window.appState.openApp('music')"></i>
         <i class="fas fa-forward" style="color:rgba(255,255,255,0.4);font-size:14px;cursor:pointer;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)'" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-next'))"></i>
      </div>
    </div>`;
  },

  media_compact: (d) => `<div class="island-row" style="justify-content:space-between;width:100%;height:100%;padding:0 12px;align-items:center;box-sizing:border-box;cursor:pointer;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
    <div style="display:flex;align-items:center;gap:8px;overflow:hidden;flex:1;">
      <div style="position:relative;width:22px;height:22px;flex-shrink:0;">
        ${d.cover ? `<img id="island-media-compact-cover" src="${d.cover}" style="width:22px;height:22px;border-radius:5px;object-fit:cover;" />` : `<div style="width:22px;height:22px;border-radius:5px;background:#222;display:flex;align-items:center;justify-content:center;"><i class="fas fa-music" style="color:#fff;font-size:10px;"></i></div>`}
      </div>
      <span id="island-media-compact-title" style="font-size:12.5px;font-weight:500;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.2px;">${d.title || 'Playing'}</span>
    </div>
    <div style="display:flex;align-items:center;gap:2.5px;height:14px;margin-left:6px;flex-shrink:0;">
      <div style="width:2.5px;background:#fff;border-radius:1.5px;height:${d.playing ? '8px' : '4px'};${d.playing ? 'animation: islandWave 0.7s ease-in-out infinite alternate;' : ''}"></div>
      <div style="width:2.5px;background:#fff;border-radius:1.5px;height:${d.playing ? '12px' : '6px'};${d.playing ? 'animation: islandWave 0.5s ease-in-out infinite alternate 0.2s;' : ''}"></div>
      <div style="width:2.5px;background:#fff;border-radius:1.5px;height:${d.playing ? '6px' : '4px'};${d.playing ? 'animation: islandWave 0.8s ease-in-out infinite alternate 0.4s;' : ''}"></div>
    </div>
  </div>`,

  media_expanded: (d) => `<div style="display:flex;flex-direction:column;width:100%;height:100%;padding:20px;box-sizing:border-box;justify-content:space-between;background:transparent;">
    <!-- Top Row: Cover, Info & Visualizer -->
    <div style="display:flex;align-items:center;width:100%;">
      <!-- Album Art (clean rounded square) -->
      <div style="position:relative;width:64px;height:64px;flex-shrink:0;cursor:pointer;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        ${d.cover ? `<img id="island-media-cover" src="${d.cover}" style="width:64px;height:64px;border-radius:16px;object-fit:cover;display:block;" />` : `<div style="width:64px;height:64px;border-radius:16px;background:#222;display:flex;align-items:center;justify-content:center;"><i class="fas fa-music" style="font-size:24px;color:#fff;"></i></div>`}
      </div>

      <!-- Track Info -->
      <div style="display:flex;flex-direction:column;flex:1;overflow:hidden;text-align:left;line-height:1.2;cursor:pointer;margin-left:16px;" onclick="if(window.appState && window.appState.openApp) window.appState.openApp('music')">
        <span id="island-media-title" style="font-size:16px;font-weight:600;color:#ffffff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.2px;">${d.title || 'Song Name'}</span>
        <span id="island-media-artist" style="font-size:15px;color:rgba(255,255,255,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400;margin-top:2px;">${d.artist || 'Artist'}</span>
      </div>

      <!-- Right EQ Visualizer -->
      <div style="display:flex;align-items:center;gap:3px;height:24px;flex-shrink:0;align-self:flex-start;margin-top:6px;">
        <div style="width:3px;background:#fff;border-radius:1.5px;height:${d.playing ? '12px' : '4px'};${d.playing ? 'animation: islandWave 0.7s ease-in-out infinite alternate;' : ''}"></div>
        <div style="width:3px;background:#fff;border-radius:1.5px;height:${d.playing ? '18px' : '6px'};${d.playing ? 'animation: islandWave 0.5s ease-in-out infinite alternate 0.2s;' : ''}"></div>
        <div style="width:3px;background:#fff;border-radius:1.5px;height:${d.playing ? '10px' : '5px'};${d.playing ? 'animation: islandWave 0.6s ease-in-out infinite alternate 0.35s;' : ''}"></div>
        <div style="width:3px;background:#fff;border-radius:1.5px;height:${d.playing ? '16px' : '3px'};${d.playing ? 'animation: islandWave 0.8s ease-in-out infinite alternate 0.1s;' : ''}"></div>
      </div>
    </div>

    <!-- Middle Row: Scrubber Bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:16px;">
      <span id="island-media-time" style="font-size:12px;color:rgba(255,255,255,0.5);width:32px;font-variant-numeric: tabular-nums;">${d.time || '0:00'}</span>
      
      <!-- Interactive Scrubber Bar -->
      <div style="flex:1;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;margin:0 12px;position:relative;cursor:pointer;overflow:hidden;">
        <div id="island-media-bar" style="width:${d.progress || 0}%;height:100%;background:rgba(255,255,255,0.6);border-radius:3px;"></div>
      </div>

      <span id="island-media-rem" style="font-size:12px;color:rgba(255,255,255,0.5);width:36px;text-align:right;font-variant-numeric: tabular-nums;">${d.remaining || '-0:00'}</span>
    </div>

    <!-- Bottom Row: Controls -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:14px;padding:0 8px;">
      <i class="far fa-star" style="font-size:18px;color:rgba(255,255,255,0.5);cursor:pointer;transition:color 0.15s;" onmouseover="this.style.color='#fff';" onmouseout="this.style.color='rgba(255,255,255,0.5)';"></i>
      
      <i class="fas fa-backward" style="font-size:22px;color:#ffffff;cursor:pointer;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-prev'))"></i>
      
      <i id="island-media-playbtn" class="fas ${d.playing ? 'fa-pause' : 'fa-play'}" style="font-size:28px;color:#ffffff;cursor:pointer;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-toggle-play'))"></i>

      <i class="fas fa-forward" style="font-size:22px;color:#ffffff;cursor:pointer;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.7';" onmouseout="this.style.opacity='1';" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('mac-island-next'))"></i>
      
      <!-- Fake airplay icon using laptop -->
      <i class="fas fa-laptop" style="font-size:16px;color:rgba(255,255,255,0.5);cursor:pointer;transition:color 0.15s; border-bottom: 2px solid rgba(255,255,255,0.5); padding-bottom: 1px;" onmouseover="this.style.color='#fff'; this.style.borderColor='#fff';" onmouseout="this.style.color='rgba(255,255,255,0.5)'; this.style.borderColor='rgba(255,255,255,0.5)';"></i>
    </div>
  </div>`,

  airdrop_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <div class="island-row" style="gap:8px;"><i class="fas fa-wifi" style="color:#0a84ff;"></i><span style="font-weight:700;color:white;">AirDrop</span></div>
      <span style="font-size:12px;color:rgba(255,255,255,0.6);">${d.progress || 50}%</span>
    </div>
    <div style="width:100%;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;margin:8px 0;">
      <div style="width:${d.progress || 50}%;height:100%;background:#0a84ff;border-radius:3px;transition:width 0.3s ease;"></div>
    </div>
    <span style="font-size:12px;color:rgba(255,255,255,0.7);">${d.filename || 'File.png'}</span>
  </div>`,

  airdrop_compact: (d) => `<div class="island-row" style="padding:0 12px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;"><i class="fas fa-wifi" style="color:#0a84ff;font-size:14px;"></i><span style="font-size:12px;font-weight:600;color:white;">AirDrop</span></div>
    <span style="font-size:11px;color:#0a84ff;font-weight:700;">${d.progress || 50}%</span>
  </div>`,

  download_compact: (d) => `<div class="island-row" style="justify-content:space-between;width:100%;height:100%;padding:0 14px;align-items:center;">
    <span style="font-size:12.5px;color:white;font-weight:500;"><i class="fas fa-arrow-down" style="color:#0a84ff;margin-right:8px;"></i>Downloading</span>
    <span style="font-size:12.5px;font-weight:700;color:#0a84ff;">${d.progress || '0'}%</span>
  </div>`,

  download_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:13px;font-weight:600;color:white;">Downloading File</span>
      <span style="font-size:13px;font-weight:700;color:#0a84ff;">${d.progress || '0'}%</span>
    </div>
    <div style="width:100%;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;margin:8px 0;">
      <div style="width:${d.progress || '0'}%;height:100%;background:#0a84ff;border-radius:3px;transition:width 0.3s ease;"></div>
    </div>
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:11px;color:rgba(255,255,255,0.5);">5.2 MB of 12.4 MB</span>
      <span style="font-size:11px;color:#ff453a;cursor:pointer;">Cancel</span>
    </div>
  </div>`,

  recording_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <div style="width:8px;height:8px;border-radius:50%;background:#ff3b30;animation:islandPulse 1s infinite alternate;"></div>
      <span style="font-size:12.5px;color:white;font-weight:600;">REC</span>
    </div>
    <span id="island-live-tick" style="font-size:12px;color:rgba(255,255,255,0.7);font-family:monospace;">00:00</span>
  </div>`,

  recording_expanded: () => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <div class="island-row" style="gap:8px;">
        <div style="width:10px;height:10px;border-radius:50%;background:#ff3b30;animation:islandPulse 1s infinite alternate;"></div>
        <span style="font-size:14px;font-weight:700;color:white;">Screen Recording</span>
      </div>
      <span id="island-live-tick" style="font-size:13px;color:rgba(255,255,255,0.7);font-family:monospace;">00:00</span>
    </div>
    <div class="island-row" style="width:100%;justify-content:flex-end;">
      <button style="background:rgba(255,59,48,0.2);border:1px solid rgba(255,59,48,0.5);color:#ff3b30;padding:4px 12px;border-radius:12px;font-size:11px;font-weight:600;cursor:pointer;" onclick="IslandBus.close()">Stop</button>
    </div>
  </div>`,

  camera_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <div style="width:7px;height:7px;border-radius:50%;background:#30d158;"></div>
    <span style="font-size:12px;color:white;font-weight:500;">Camera Active</span>
  </div>`,

  microphone_compact: () => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <div style="width:7px;height:7px;border-radius:50%;background:#ff9f0a;"></div>
    <span style="font-size:12px;color:white;font-weight:500;">Microphone Active</span>
  </div>`,

  focus_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-moon" style="color:#5e5ce6;font-size:12px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.name || 'Do Not Disturb'}</span>
  </div>`,

  battery_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <i class="fas fa-bolt" style="color:#30d158;font-size:12px;"></i>
      <span style="font-size:12.5px;color:white;font-weight:500;">Charging</span>
    </div>
    <span style="font-size:12.5px;font-weight:700;color:#30d158;">${d.percent || 100}%</span>
  </div>`,

  battery_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:13px;font-weight:600;color:white;">Power & Battery</span>
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
      <div style="width:${d.percent || '100'}%;height:100%;background:#30d158;"></div>
    </div>
  </div>`,

  bluetooth_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fab fa-bluetooth-b" style="color:#0a84ff;font-size:12px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:500;">${d.name || 'Connected'}</span>
  </div>`,

  timer_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <i class="fas fa-stopwatch" style="color:#ff9f0a;font-size:12px;"></i>
    <span style="font-size:12px;font-weight:600;color:white;font-family:monospace;">${d.time || '00:00'}</span>
  </div>`,

  call_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <i class="fas fa-phone-alt" style="color:#30d158;font-size:12px;"></i>
      <span style="font-size:12.5px;color:white;font-weight:600;">${d.name || 'Incoming Call'}</span>
    </div>
    <span style="font-size:11px;color:rgba(255,255,255,0.7);">00:12</span>
  </div>`,

  call_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:space-between;box-sizing:border-box;">
    <div class="island-row" style="width:100%;justify-content:space-between;">
      <span style="font-size:12.5px;color:#30d158;font-weight:700;">FaceTime Audio</span>
      <span style="font-size:12px;color:white;" id="island-live-tick">00:00</span>
    </div>
    <div class="island-row" style="gap:12px;align-items:center;">
      <div style="width:38px;height:38px;border-radius:50%;background:#444;display:flex;align-items:center;justify-content:center;"><i class="fas fa-user" style="color:white;"></i></div>
      <span style="font-size:14.5px;font-weight:700;color:white;">${d.name || 'Caller'}</span>
    </div>
    <div class="island-row" style="width:100%;justify-content:center;gap:20px;">
      <div style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="fas fa-microphone-slash" style="color:white;font-size:12px;"></i></div>
      <div style="width:34px;height:34px;border-radius:50%;background:#ff453a;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="window.MacIsland.dismiss()"><i class="fas fa-phone-slash" style="color:white;font-size:12px;"></i></div>
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
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.text || 'Success'}</span>
  </div>`,

  error_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;gap:8px;align-items:center;">
    <i class="fas fa-exclamation-triangle" style="color:#ff453a;font-size:13px;"></i>
    <span style="font-size:12.5px;color:white;font-weight:600;">${d.text || 'Error'}</span>
  </div>`,

  notification_compact: (d) => `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:space-between;align-items:center;">
    <div class="island-row" style="gap:8px;">
      <i class="${d.icon || 'fas fa-bell'}" style="color:#0a84ff;font-size:12px;"></i>
      <span style="font-size:12.5px;color:white;font-weight:600;">${d.title || 'Notification'}</span>
    </div>
  </div>`,

  notification_expanded: (d) => `<div class="island-col" style="width:100%;height:100%;padding:14px 18px;justify-content:center;align-items:flex-start;box-sizing:border-box;gap:8px;">
    <div class="island-row" style="gap:10px;width:100%;align-items:center;">
      <img src="${d.icon || 'images/Icons/Messages.png'}" style="width:28px;height:28px;border-radius:6px;">
      <div class="island-col" style="align-items:flex-start;flex:1;">
        <span style="font-size:13.5px;font-weight:700;color:white;">${d.title || 'Messages'}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.7);">${d.subtitle || 'New notification'}</span>
      </div>
    </div>
  </div>`,

  auth_expanded: (d) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:14px 10px;box-sizing:border-box;gap:8px;">
    <div style="position:relative;width:72px;height:72px;display:flex;align-items:center;justify-content:center;">
      <svg style="width:100%;height:100%;position:absolute;inset:0;pointer-events:none;" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g id="island-face-group" class="icon-group scanning-pulse" stroke="white" stroke-width="4.5">
          <!-- Outer Brackets -->
          <path d="M 35 10 h -7 c -9.94 0 -18 8.06 -18 18 v 7" class="draw-path" style="animation-delay: 0.0s" />
          <path d="M 65 10 h 7 c 9.94 0 18 8.06 18 18 v 7" class="draw-path" style="animation-delay: 0.1s" />
          <path d="M 35 90 h -7 c -9.94 0 -18 -8.06 -18 -18 v -7" class="draw-path" style="animation-delay: 0.2s" />
          <path d="M 65 90 h 7 c 9.94 0 18 -8.06 18 -18 v -7" class="draw-path" style="animation-delay: 0.3s" />
          
          <!-- Facial Features -->
          <path d="M 36 36 v 14" class="draw-path" style="animation-delay: 0.5s" />
          <path d="M 64 36 v 14" class="draw-path" style="animation-delay: 0.5s" />
          <path d="M 50 40 v 10 c 0 2 1.5 4 4 4 h 2" class="draw-path" style="animation-delay: 0.7s" />
          <path d="M 32 64 Q 50 84 68 64" class="draw-path" style="animation-delay: 0.9s" />
        </g>
        <g id="island-tick-group" class="icon-group opacity-0" style="transform: scale(0.5); display: none; opacity: 0;" stroke="#32D74B">
          <!-- Outer Circle -->
          <circle cx="50" cy="50" r="40" class="tick-circle" stroke-width="5" id="island-circle-anim" />
          <!-- Inner Checkmark -->
          <path d="M 30 52 l 12 12 l 28 -26" class="tick-check" stroke-width="6" id="island-check-anim" />
        </g>
      </svg>
    </div>
    <span id="island-auth-label" style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85);letter-spacing:-0.2px;">${d.title || 'Face ID'}</span>
  </div>`,

  collapsed: () => ``
};

// Fallback logic for missing templates
const getTemplate = (type, mode, data) => {
  if (mode === 'idle_hover') return T.idle_hover();
  if (mode === 'collapsed') return T.collapsed();
  const key = `${type}_${mode}`;
  if (T[key]) return T[key](data);
  if (mode === 'expanded' && T[`${type}_compact`]) return T[`${type}_compact`](data);
  return `<div class="island-row" style="padding:0 14px;width:100%;height:100%;justify-content:center;align-items:center;"><span style="font-size:12.5px;font-weight:600;color:white;">${type}</span></div>`;
};

// Event Bus
const IslandBus = {
  dispatch: (opts) => {
    const prio = PRIORITY[opts.type] || 0;
    
    if (IslandState.visible && prio < IslandState.priority) {
      return;
    }

    const isSameActiveType = IslandState.visible && IslandState.type === opts.type;
    let targetMode = opts.mode;
    if (!targetMode) {
      if (isSameActiveType && IslandState.mode !== 'collapsed' && IslandState.mode !== 'idle_hover') {
        // PRESERVE the user's current mode (e.g. if they hovered to 'expanded')
        targetMode = IslandState.mode;
      } else {
        if (opts.type === 'media' || opts.type === 'recording' || opts.type === 'call') {
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
    IslandState.tickValue = 0;

    if (isSameActiveType && sameMode) {
      IslandBus.updateInPlace();
      return;
    }

    IslandBus.render();
  },

  updateInPlace: () => {
    const content = document.getElementById('islandContent');
    if (!content) return;

    // Fast-path for media playback in-place updates
    if (IslandState.type === 'media') {
      const d = IslandState.data;
      if (IslandState.mode === 'expanded') {
        const timeEl = document.getElementById('island-media-time');
        const remEl = document.getElementById('island-media-rem');
        const barEl = document.getElementById('island-media-bar');
        const titleEl = document.getElementById('island-media-title');
        const artistEl = document.getElementById('island-media-artist');
        const playBtn = document.getElementById('island-media-playbtn');

        if (timeEl && remEl && barEl) {
          timeEl.textContent = d.time || '0:00';
          remEl.textContent = d.remaining || '-0:00';
          barEl.style.width = `${d.progress || 0}%`;
          if (titleEl && d.title) titleEl.textContent = d.title;
          if (artistEl && d.artist) artistEl.textContent = d.artist;
          if (playBtn) playBtn.className = `fas ${d.playing ? 'fa-pause' : 'fa-play'}`;
          return;
        }
      } else if (IslandState.mode === 'compact') {
        const compactTitle = document.getElementById('island-media-compact-title');
        if (compactTitle && d.title) {
          compactTitle.textContent = d.title;
          return;
        }
      }
    }

    // Direct innerHTML without opacity flicker
    content.innerHTML = getTemplate(IslandState.type, IslandState.mode, IslandState.data);
  },

  render: () => {
    const el = document.getElementById('dynamicIsland');
    const content = document.getElementById('islandContent');
    const idle = document.getElementById('islandIdle');
    if(!el || !content || !idle) return;

    if (IslandState._dismissTimer) clearTimeout(IslandState._dismissTimer);
    if (IslandState._tickInterval) clearInterval(IslandState._tickInterval);

    if (IslandState.mode !== 'idle_hover') IslandState.visible = true;
    
    // Size transitions
    const size = (IslandState.type === 'auth' ? SIZE.auth : (SIZE[IslandState.mode] || SIZE.compact));
    el.style.width = size.w + 'px';
    el.style.height = size.h + 'px';
    el.style.borderRadius = `0 0 ${size.br}px ${size.br}px`;

    content.style.opacity = '0';
    
    setTimeout(() => {
      content.innerHTML = getTemplate(IslandState.type, IslandState.mode, IslandState.data);
      content.style.opacity = '1';
      content.style.visibility = 'visible';
      IslandBus.startLiveTick();
    }, 150);

    // Dynamic Hover Expansion with Delay
    if (!IslandState.visible || IslandState.mode === 'collapsed' || IslandState.mode === 'idle_hover') {
      el.onmouseenter = () => {
        if (!IslandState.visible) {
          IslandState._hoverTimeout = setTimeout(() => {
            IslandState.mode = 'idle_hover';
            IslandBus.render();
          }, 200); // 200ms delay to prevent accidental flashes
        }
      };
      el.onmouseleave = () => {
        if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
        if (!IslandState.visible && IslandState.mode === 'idle_hover') {
          // Slight delay before closing to make it feel natural
          setTimeout(() => {
             // Re-check just in case they re-hovered instantly
             if (!IslandState.visible && IslandState.mode === 'idle_hover') {
                 IslandState.mode = 'collapsed';
                 IslandBus.render();
             }
          }, 150);
        }
      };
    } else {
      el.onmouseenter = () => {
        if (IslandState.mode === 'compact') {
          IslandState._hoverTimeout = setTimeout(() => {
            IslandState.mode = 'expanded';
            IslandBus.render();
          }, 200); // 200ms delay to prevent accidental flashes
        }
      };
      el.onmouseleave = () => {
        if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
        if (IslandState.mode === 'expanded' && IslandState.type) {
          setTimeout(() => {
             if (IslandState.mode === 'expanded') {
                 IslandState.mode = 'compact';
                 IslandBus.render();
             }
          }, 150);
        }
      };
    }

    // Auto dismiss
    if (IslandState.autoDismiss && !IslandState.persistent) {
      IslandState._dismissTimer = setTimeout(() => {
        IslandBus.close();
      }, IslandState.duration);
    }
  },

  close: () => {
    const el = document.getElementById('dynamicIsland');
    const content = document.getElementById('islandContent');
    const idle = document.getElementById('islandIdle');
    if(!el || !content || !idle) return;

    if (IslandState._dismissTimer) clearTimeout(IslandState._dismissTimer);
    if (IslandState._tickInterval) clearInterval(IslandState._tickInterval);

    IslandState.visible = false;
    IslandState.type = null;
    IslandState.priority = 0;
    IslandState.mode = 'collapsed';

    const size = SIZE.collapsed;
    el.style.width = size.w + 'px';
    el.style.height = size.h + 'px';
    el.style.borderRadius = `0 0 ${size.br}px ${size.br}px`;
    
    content.style.opacity = '0';
    setTimeout(() => { if (!IslandState.visible) content.style.visibility = 'hidden'; }, 250);

    // Hover when idle: expands to show quick status
    el.onmouseenter = () => {
      if (!IslandState.visible) {
        IslandState._hoverTimeout = setTimeout(() => {
          IslandState.mode = 'idle_hover';
          IslandBus.render();
        }, 200);
      }
    };

    el.onmouseleave = () => {
      if (IslandState._hoverTimeout) clearTimeout(IslandState._hoverTimeout);
      if (!IslandState.visible && IslandState.mode === 'idle_hover') {
        setTimeout(() => {
           if (!IslandState.visible && IslandState.mode === 'idle_hover') {
               IslandState.mode = 'collapsed';
               IslandBus.render();
           }
        }, 150);
      }
    };
  },

  startLiveTick: () => {
    const tickEl = document.getElementById('island-live-tick');
    if (!tickEl) return;

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

// Global API
window.MacIsland = {
  dispatch: IslandBus.dispatch,
  dismiss: IslandBus.close,
  
  media: (title, artist, playing=true, cover=null, time='0:00', duration='3:20', progress=0, remaining='-0:00') => IslandBus.dispatch({ type: 'media', data: { title, artist, playing, cover, time, duration, progress, remaining }, autoDismiss: false, persistent: true }),
  airdrop: (filename, progress=50) => IslandBus.dispatch({ type: 'airdrop', data: { filename, progress } }),
  download: (progress) => IslandBus.dispatch({ type: 'download', data: { progress }, autoDismiss: false }),
  recording: () => IslandBus.dispatch({ type: 'recording', autoDismiss: false, persistent: true }),
  microphone: () => IslandBus.dispatch({ type: 'microphone', duration: 4000 }),
  camera: () => IslandBus.dispatch({ type: 'camera', duration: 4000 }),
  focus: (name) => IslandBus.dispatch({ type: 'focus', data: { name } }),
  battery: (percent) => IslandBus.dispatch({ type: 'battery', data: { percent } }),
  bluetooth: (name) => IslandBus.dispatch({ type: 'bluetooth', data: { name } }),
  timer: (time) => IslandBus.dispatch({ type: 'timer', data: { time }, autoDismiss: false }),
  call: (name) => IslandBus.dispatch({ type: 'call', data: { name }, autoDismiss: false, persistent: true }),
  copy: () => IslandBus.dispatch({ type: 'copy', duration: 1500 }),
  success: (text) => IslandBus.dispatch({ type: 'success', data: { text }, duration: 2500 }),
  error: (message) => IslandBus.dispatch({ type: 'error', data: { message }, duration: 5000 }),
  notification: (title, subtitle, icon, duration = 4000) => IslandBus.dispatch({ type: 'notification', data: { title, subtitle, icon }, duration }),
  screenshot: () => IslandBus.dispatch({ type: 'screenshot', duration: 3000 }),
  auth: (title = 'Face ID') => IslandBus.dispatch({ type: 'auth', mode: 'expanded', data: { title }, autoDismiss: false, persistent: true })
};
