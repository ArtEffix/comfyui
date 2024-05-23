module.exports = {
  title: "ComfyUI",
  description: "The most powerful and modular stable diffusion GUI and backend.",
  icon: "icon.png",
  install: "install.js",
  unInstall: "uninstall.json",
  start: "start.js",
  update: "update.json",
  isInstalled: function (ctx) {
    return ctx.absPath('app', 'env');
  },
}