import { resolve as resolvePath } from 'path'
import {
    IGroupedWatchParams,
    IWatchParams
} from './types'

const workingDirectory = process.cwd();

export default function (groupedParams: IGroupedWatchParams[], { folder, script, extension}: IWatchParams) {
    const currentFolder = resolvePath(
        workingDirectory,
        folder
    )
    const groupedParam = groupedParams.find(currentParams => currentParams.folder === currentFolder);

    if (!groupedParam) {
        groupedParams.push({
            folder: currentFolder,
            extensions: [extension],
            scripts: [script]
        })
    } else {
        groupedParam.extensions.push(extension);
        groupedParam.scripts.push(script);
    }

    return groupedParams;
}