// console.log(Array.from(document.getElementsByTagName("script")).filter(e=>e.innerHTML.indexOf("window.ytplayer = window.ytplayer || {};")!=-1))
// console.log(document.body.innerHTML)
const genScript = (name1, name2) => {
    return `
try {
    if (!${name1}) {
        ${name1} = {
            "playerCaptionsRenderer": {},
            "playerCaptionsTracklistRenderer": {
                "captionTracks": [],
                "audioTracks": [{
                    "captionTrackIndices": []
                }],
                "translationLanguages": [],
                "defaultAudioTrackIndex": 0
            }
        }
    }

    const videoId = ${name2}.playerResponse.videoDetails.videoId;
    const pctr = ${name1}.playerCaptionsTracklistRenderer;

    // const captionData = await fetch("http://127.0.0.1:5050/api/captions/"+videoId).then(res=>res.json());
    let xhr = new XMLHttpRequest();
          xhr.open("GET", "http://127.0.0.1:5050/api/captions/"+videoId, false);
          xhr.send(null);
          const captionData = JSON.parse(xhr.responseText);
    pctr.audioTracks[0].captionTrackIndices.push(...new Array(captionData.length).fill(pctr.captionTracks.length).map((a,b)=>a+b));
    pctr.captionTracks.push(...captionData);
} catch(e) {
    console.error("CaptionInjectorError", e);
}
`};
new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            if (node.tagName === "SCRIPT") {
                if (node.src.endsWith("base.js")) {
                    const url = node.src
                    node.remove();
                        (async () => {
                            const base = await fetch(url).then(res => res.text())

                            // add captions
                            const f_base = base.replace(/var (\w+)=(\w+)\.playerResponse\.captions;/, (al, a, b) => `${al}\n${genScript(a, b)}`)
                            // bypass url check
                            const s_base = f_base.replace(/return \w+\(\w+\(\w+,\w+\),\w+,\w+,"Captions URL"\)/, "return true");
                            
                            const script = document.createElement("script");
                            script.innerHTML = s_base;
                            document.head.appendChild(script);
                        })()
                }
            }
        }
    }
}).observe(document, {
    childList: true,
    subtree: true,
});