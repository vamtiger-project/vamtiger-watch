export enum StringConstant {
    nothing = ''
}

export enum CommandlineArg {
    folder = 'folder',
    extension = 'extension',
    script = 'script'
}

export enum CommandlineArgShort {
    folder = 'f',
    extension = 'e',
    script = 's'
}

export enum CommandlineArgDescription {
    folder = 'Relative folder path',
    extension = 'File extension',
    script = 'NPM script'
}

export enum ErrorMessage {
    noFolder = 'No folder(s) defined',
    noExtension = 'No extension(s) defined',
    noScript = 'No script(s) defined',
    noCorrespondingArgs = "Folder(s), Extension(s) and Script(s) don't correspond."
}

export enum EventType {
    change = 'change'
}

export interface IWatchParams {
    folder: string;
    extension: string;
    script: string;
}

export interface IRunScriptParams extends IWatchParams {
    eventType?: string;
    fileName: string;
}

export const regex = {
    nonWords: /[\W]/g
}