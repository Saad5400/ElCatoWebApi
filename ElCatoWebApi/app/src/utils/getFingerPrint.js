import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default async function getFingerPrint() {
    let visitorId = localStorage.getItem("visitorId");
    if (visitorId) {
        return visitorId;
    }
    else {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        localStorage.setItem("visitorId", visitorId);
        return visitorId;
    }
}