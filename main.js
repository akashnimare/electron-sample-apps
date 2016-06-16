const {Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const electron = require('electron');
const app = require('electron').app;
const iconPath = path.join(__dirname, 'Icon.png');
const icontray = path.join(__dirname, 'icon.png');
let appIcon = null;
let aboutWindow = null;
let mainWindow = null;


const About = () => {
    aboutWindow = createAboutWindow();
    aboutWindow.show();
  };

function onClosed() {
  mainWindow = null;
  aboutWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    title: 'Main Window',
    width: 800,
    height: 600,
    icon: process.platform === 'linux' && iconPath,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true
  });

  win.loadURL('file://' + __dirname + '/main.html');
  win.on('closed', onClosed);
  return win;
}

function createAboutWindow() {
  const abouturl = new electron.BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })
  abouturl.loadURL('file://' + __dirname + '/about.html');
  abouturl.on('closed', onClosed);
  return abouturl;
}


app.on('ready', function(){
  mainWindow = createMainWindow();
  aboutWindow = createAboutWindow();
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
        label: 'About',
        click: function () {
          About();
        }
    },
    {
      label: 'Toggle DevTools',
      click: function() {
        mainWindow.openDevTools();
      }
    },
    { label: 'Quit',
      click: function() {
        app.quit();
      }
    }
  ]);
  appIcon.setToolTip('Multiwindow');
  appIcon.setContextMenu(contextMenu);
});
