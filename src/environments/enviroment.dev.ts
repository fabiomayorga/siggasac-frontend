// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    apiUrl: 'http://167.172.127.180',
    apiBaseMain: {
        main: 'sigasac',
        configuration: 'configuration',
    },
    versions: {
        v1: 'v1',
        v2: 'v2.0.1'
    },
    useHash: true,
    hmr: false
};