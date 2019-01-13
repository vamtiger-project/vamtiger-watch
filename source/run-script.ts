import { resolve as resolvePath, parse } from 'path';
import bash from 'vamtiger-bash';
import getScripts from './get-scripts';
import { IRunScriptParams, regex, EventType, StringConstant } from './types';
import getTable from 'vamtiger-get-string-table';

const { nothing, andAnd, npmRun } = StringConstant;
const { nonWords } = regex;
const { change } = EventType;

const workingDirectory = process.cwd();

export default async function ({ eventType = '', fileName = '', folder, extensions, scripts}: IRunScriptParams) {
    const bashOptions = {
        cwd: workingDirectory
    };
    const { ext } = parse(fileName);
    const extension = ext.replace(nonWords, nothing);
    const runScript = getScripts({ extension, extensions, scripts })
        .map(currentScript => `${npmRun} ${currentScript}`)
        .join(andAnd);
    const info = getTable({
        header: ['Event', 'Folder', 'File', 'Extension', 'Script'],
        body: [
            [eventType, folder, fileName, extension, runScript]
        ]
    });

    console.log(info);

    runScript && await bash(runScript, bashOptions)
        .then(console.log)
        .catch(console.warn);
}