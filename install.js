const cmds = {
    "win32": {
        "nvidia": "pip3 install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu121",
        "amd": "pip3 install torch-directml --index-url https://download.pytorch.org/whl/cu12",
        "cpu": "pip3 install torch torchvision torchaudio -i https://pypi.tuna.tsinghua.edu.cn/simple"
    },
    "darwin": "pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu",
    "linux": {
        "nvidia": "pip3 install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu121",
        "amd": "pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.7",
        "cpu": "pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu"
    }
}


module.exports = {
    "requires": [
        {
            "type": "conda",
            "name": "ffmpeg",
            "args": "-c conda-forge"
        }
    ],
    "run": [
        {
            "method": "shell.run",
            "params": {
                "message": "git pull"
            }
        },
        {
            "method": "shell.run",
            "params": {
                "message": "git clone https://github.com/comfyanonymous/ComfyUI.git app"
            }
        },
        {
            "method": "shell.run",
            "params": {
                "message": "git clone https://github.com/ltdrdata/ComfyUI-Manager",
                "path": "app/custom_nodes"
            }
        },
        {
            "method": "shell.run",
            "params": {
                "venv": "env",
                "path": "app",
                "messageFn": function ({gpu, platform}) {
                    const result = [];
                    if (gpu === 'nvidia') {
                        result.push('conda install -y nvidia/label/cuda-12.1.0::cuda');
                    }

                    result.push((platform === 'darwin' ? cmds.darwin : (['nvidia', 'amd'].includes(gpu) ? cmds[platform][gpu] : cmds[platform].cpu)));
                    result.push('pip install -r requirements.txt  -i https://pypi.tuna.tsinghua.edu.cn/simple');

                    return result;
                }
            }
        },
        {
            "method": "shell.run",
            "params": {
                "message": "mkdir workflows"
            }
        },
        {
            "method": "shell.run",
            "params": {
                "message": [
                    "git clone https://github.com/comfyanonymous/ComfyUI_examples",
                    "git clone https://github.com/cocktailpeanut/comfymp4"
                ],
                "path": "workflows"
            }
        },
        {
            "method": "fs.share",
            "params": {
                "drive": {
                    "checkpoints": "app/models/checkpoints",
                    "clip": "app/models/clip",
                    "clip_vision": "app/models/clip_vision",
                    "configs": "app/models/configs",
                    "controlnet": "app/models/controlnet",
                    "embeddings": "app/models/embeddings",
                    "loras": "app/models/loras",
                    "upscale_models": "app/models/upscale_models",
                    "vae": "app/models/vae"
                },
                peers: [
                    "https://github.com/ArtEffix/stable-diffusion-webui-forge.git"
                ]
            }
        },
        {
            "method": "fs.share",
            "params": {
                "drive": {
                    "output": "app/output"
                }
            }
        },
        // {
        //     "method": "fs.download",
        //     "params": {
        //         "url": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors?download=true",
        //         "dir": "app/models/checkpoints"
        //     }
        // },
        // {
        //     "method": "fs.download",
        //     "params": {
        //         "url": "https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/resolve/main/sd_xl_refiner_1.0.safetensors?download=true",
        //         "dir": "app/models/checkpoints"
        //     }
        // },
    ]
}
