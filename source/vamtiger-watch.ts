export * from '../node_modules/tslib/tslib';
import Args from 'vamtiger-argv/build/main';
import watch from './watch';
import getWatchParams from './get-watch-params';
import {
    CommandlineArg,
    CommandlineArgShort,
    ErrorMessage,
    IGroupedWatchParams
} from './types';

const args = new Args();
const {
    noFolder,
    noExtension,
    noScript,
    noCorrespondingArgs
 } = ErrorMessage;
const currentFoders = args.getAll(CommandlineArg.folder)
    || args.getAll(CommandlineArgShort.folder);
const extensions = args.getAll(CommandlineArg.extension)
    || args.getAll(CommandlineArgShort.extension);
const scripts = args.getAll(CommandlineArg.script)
    || args.getAll(CommandlineArgShort.script);
const folders = currentFoders.length === 1 && new Array(scripts.length).fill(currentFoders[0]) as typeof currentFoders || currentFoders;
const argLength = new Set([
        folders,
        extensions,
        scripts
    ]
    .map(args => args.length))
    .size;
const params = argLength === 1 && folders.map((folder, index) => ({
    folder,
    extension: extensions[index],
    script: scripts[index]
}))
const watchParams = params && params.reduce(
    (watchParams, params) => getWatchParams(watchParams, params)
    , [] as IGroupedWatchParams[]
);

if (!folders) {
    throw new Error(noFolder);
} else if (!extensions) {
    throw new Error(noExtension);
} else if (!scripts) {
    throw new Error(noScript);
} else if (argLength !== 1) {
    throw new Error(noCorrespondingArgs);
}

watchParams && watchParams.forEach(watch);