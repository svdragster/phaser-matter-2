var assetsLoaded = false;

export function loadAssetsOnce(ref) {
    if (assetsLoaded) return;
    assetsLoaded = true;
    console.log("Loading assets");
    ref.load.image("crate", "assets/crate.png");
    ref.load.image("platform", "assets/platform.png");
    ref.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
