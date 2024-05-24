const cmds = {
    "win32": {
        "nvidia": "python main.py --disable-xformers",
        "amd": "python main.py --directml"
    },
    "darwin": "python main.py --force-fp16",
    "linux": {
        "nvidia": "python main.py --disable-xformers",
        "amd": "python main.py --disable-xformers"
    }
}

module.exports = {
    "daemon": true,
    "run": [
        {
            "method": "shell.execute",
            "params": {
                "venv": "env",
                "path": "app",
                messageFn: function ({platform, gpu}) {
                    return platform === 'darwin' ? cmds.darwin : cmds[platform][gpu]
                },
                "on": [
                    {
                        "event": "comfyui:start",
                    }
                ]
            }
        },
    ]
}
