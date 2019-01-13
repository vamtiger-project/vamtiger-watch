import {
    IGetScripts
} from './types';

export default function ({ extension: currentExtension, extensions, scripts: currentScripts }: IGetScripts) {
    const scripts = [] as string[];

    extensions.forEach((extension, index) => {
        if (extension === currentExtension) {
            scripts.push(currentScripts[index]);
        }
    });

    return scripts;
}