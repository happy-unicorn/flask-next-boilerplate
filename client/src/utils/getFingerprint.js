import Fingerprint from 'fingerprintjs2';

export default async () => {
    const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true
        }
    };
    const components = await Fingerprint.getPromise(options);
    const values = components.map(component => component.value);
    return String(Fingerprint.x64hash128(values.join(''), 31));
}