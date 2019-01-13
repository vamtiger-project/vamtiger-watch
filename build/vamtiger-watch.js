"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../node_modules/tslib/tslib"));
const main_1 = require("vamtiger-argv/build/main");
const watch_1 = require("./watch");
const get_watch_params_1 = require("./get-watch-params");
const types_1 = require("./types");
const args = new main_1.default();
const { noFolder, noExtension, noScript, noCorrespondingArgs } = types_1.ErrorMessage;
const currentFoders = args.getAll(types_1.CommandlineArg.folder)
    || args.getAll(types_1.CommandlineArgShort.folder);
const extensions = args.getAll(types_1.CommandlineArg.extension)
    || args.getAll(types_1.CommandlineArgShort.extension);
const scripts = args.getAll(types_1.CommandlineArg.script)
    || args.getAll(types_1.CommandlineArgShort.script);
const folders = currentFoders.length === 1 && new Array(scripts.length).fill(currentFoders[0]) || currentFoders;
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
}));
const watchParams = params && params.reduce((watchParams, params) => get_watch_params_1.default(watchParams, params), []);
if (!folders) {
    throw new Error(noFolder);
}
else if (!extensions) {
    throw new Error(noExtension);
}
else if (!scripts) {
    throw new Error(noScript);
}
else if (argLength !== 1) {
    throw new Error(noCorrespondingArgs);
}
watchParams && watchParams.forEach(watch_1.default);
//# sourceMappingURL=vamtiger-watch.js.map