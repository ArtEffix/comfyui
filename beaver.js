const STATUS = {
    INIT: 0,
    INSTALLED: 1,
    INSTALLING: 2,
    STARTING: 3,
    STARTED: 4,
    STOPPING: 5,
    STOPPED: 6,
    ERROR: 7,
};

module.exports = {
    title: "ComfyUI",
    description: "The most powerful and modular stable diffusion GUI and backend.",
    icon: "icon.png",
    menu: async (status) => {
        if (STATUS.INSTALLING === status) {
            return [{
                icon: "fa-solid fa-plug", text: "Installing", href: "install.json"
            }]
        }

        if (STATUS.INIT === status) {
            return [{
                icon: "fa-solid fa-plug",
                text: "Install",
                href: "install.json"
            }, {
                icon: "fa-solid fa-rotate",
                text: "Update",
                href: "update.json"
            }]
        }

        return [
            {
                icon: "fa-solid fa-rocket",
                text: "Start",
                href: "start.json"
            },
            {icon: "fa-solid fa-power-off", text: "Start CPU Mode (Slow)", href: "start_cpu.json",}
        ]
    }
}
