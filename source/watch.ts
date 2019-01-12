import { watch } from 'fs';
import { IWatchParams } from './types';
import { watch as config } from './config';
import runScript from './run-script';

const watchedFolders = new Set<string>();

export default ({ folder, extension, script }: IWatchParams) => {
    if (!watchedFolders.has(folder)) {
        watch(folder, config, (eventType, fileName) => runScript({ eventType, fileName, folder, extension, script }));
        watchedFolders.add(folder);
    }
}