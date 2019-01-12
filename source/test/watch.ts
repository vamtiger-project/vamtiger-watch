import { resolve as resolvePath } from 'path';
import { spawn, SpawnOptions } from 'child_process';
import { expect } from 'chai';
import bash from 'vamtiger-bash';
import getFolderContent from 'vamtiger-get-directory-content';
import getFileText from 'vamtiger-get-file-text';
import createFile from 'vamtiger-create-file';

const workingDirectory = resolvePath(
    __dirname,
    '../'.repeat(2)
);
const sourceFolder = resolvePath(
    workingDirectory,
    'source'
);
const buildFolder = resolvePath(
    workingDirectory,
    'build'
);
const source = resolvePath(
    sourceFolder,
    'vamtiger-watch.ts'
);
const basOptions = {
    cwd: workingDirectory
};
const backgroundBashOptions: SpawnOptions = {
    cwd: workingDirectory,
    // stdio: 'ignore',
    detached: true
};
const clean = `npm run clean-bundle`;
const watchArgs = [
    '.',
    '--folder',
    'source',
    '--extension',
    'ts',
    '--script',
    'bundle-source'
];
const watch = `node`;
const bundle = `bundle`;
const copyParams = {
    source,
    destination: source
};
const watchProcess = spawn(
    watch,
    watchArgs,
    backgroundBashOptions
);

watchProcess.on('data', console.log);
watchProcess.on('error', console.warn);

describe('watch - run npm script(s) when', function () {
    before(async function () {
        let sourceFileText = await getFileText(source);

        await bash(clean, basOptions);

        await createFile(source, sourceFileText);
    });

    it('file change(s)', async function () {
        const folderContent = await getFolderContent(buildFolder);

        expect(folderContent.length).to.equal(3);
    })

    after(async function () {
        watchProcess.kill();
    })
})