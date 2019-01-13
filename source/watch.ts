import { watch } from 'fs';
import { IGroupedWatchParams } from './types';
import { watch as config } from './config';
import runScript from './run-script';

const watchedFolders = new Set<string>();

export default ({ folder, extensions, scripts }: IGroupedWatchParams) => {
    if (!watchedFolders.has(folder)) {
        watch(folder, config, (eventType, fileName) => runScript({ eventType, fileName, folder, extensions, scripts }));
        watchedFolders.add(folder);
    }
}