import { logColor } from "./log-color";

export async function asyncDelay(milliseconds: number = 0, verbose = false): Promise<void> {
 if(milliseconds <= 0 ) return;

 if(verbose) {
    logColor(`--- Delaying for ${milliseconds} ms ---`, Date.now());
 }

 await new Promise(resolve => setTimeout(resolve, milliseconds));
}