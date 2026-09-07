# 🖥️ macOS Interface — Desktop App Guide

Welcome to the native desktop version of the **macOS Web Interface**. By wrapping the web experience in **Electron**, you can run this project locally as a standalone Windows `.exe` application. 

This guide will explain exactly how to install, build, and run the desktop application from the source code.

---

## ⚡ Quick Start

To launch the desktop application in development mode without building an installer, run the following commands:

```bash
# 1. Install dependencies
npm install

# 2. Launch the desktop app
npm run start-electron
```
*This will open the macOS interface natively in a frameless window on your desktop.*

---

## 📦 Building the `.exe` Installer

If you want to package the app into a shareable Windows installer (`.exe`), follow these steps. We use **Electron Builder** to compile the NSIS installer.

### 1. Requirements
Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **Git**

### 2. Build Command
Run the following command in your terminal:

```bash
npm run build
```

### 3. Locate the Output
Once the build completes (it typically takes 1-2 minutes to download binaries and compile), your installer will be securely output to:

> 📁 `dist-electron/macOS-Interface Fan Made Setup 1.0.0.exe`

Double-click the setup file to install the fan-made macOS interface directly onto your Windows machine.

---

## 🛠️ How It Works Under the Hood

The desktop app relies on three key files to bridge the web environment to your native operating system:

| File | Purpose |
| :--- | :--- |
| **`main.js`** | The Electron entry point. It creates a `BrowserWindow`, loads `index.html`, and configures the native window to hide the Windows menu bar and maximize on launch. |
| **`package.json`** | Contains the `build` configuration used by `electron-builder`. It tells the builder to ignore `node_modules`, target Windows NSIS, and use our custom app icon. |
| **`.gitignore`** | Ensures that the massive `node_modules` folder and the generated `dist-electron` build folders are ignored and never pushed to GitHub. |

---

## 🎨 Modifying the Desktop App

If you wish to change the desktop app's configuration (like the window size, icon, or metadata), you can edit the following:

- **Window Properties:** Open `main.js` and modify the `BrowserWindow` object. You can enable full-screen, change the default width/height, or enable Node integration.
- **App Name & Icon:** Open `package.json` and edit the `productName` inside the `"build"` block. To change the icon, replace `images/Icons/macOS.png` with your desired icon.

---

> **Note:** The desktop app runs exactly identical to the web version, meaning any HTML, CSS, or JS changes you make to the core project will automatically reflect the next time you open or build the `.exe`!
