import { styleText } from "util";

export function logColor(...msg: (string | number)[]) {
    const messages = msg
        .map(message => styleText(['bgMagenta', 'whiteBright'], `${message}`))
        .join(' ');
        console.log(styleText('green', messages));
}