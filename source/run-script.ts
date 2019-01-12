import { resolve as resolvePath, parse } from 'path';
import bash from 'vamtiger-bash';
import { IRunScriptParams, regex, EventType, StringConstant } from './types';
import getTable from 'vamtiger-get-string-table';

const { nothing } = StringConstant;
const { nonWords } = regex;
const { change } = EventType;

const workingDirectory = process.cwd();

export default async function ({ eventType = '', fileName = '', folder, extension, script}: IRunScriptParams) {
    const bashOptions = {
        cwd: workingDirectory
    };
    const { ext } = parse(fileName);
    const currentExtension = ext.replace(nonWords, nothing);
    const runScript = currentExtension === extension
        && `npm run ${script}`;
    const info = getTable({
        header: ['Event', 'Folder', 'File', 'Extension', 'Script'],
        body: [
            [eventType, folder, fileName, extension, script]
        ]
    });

    console.log(info);

    if (runScript) {
        await bash(runScript, bashOptions).catch(console.warn);
    }
}