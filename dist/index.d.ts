export declare type PasteResult = {
    kind: string;
    data: File | string;
    type: string;
};
export declare type OnPasteEventType = (e: PasteResult) => void;
/**
 * 监听用户的粘贴行为
 */
export default function onPaste(): {
    version: string;
    on(fn: OnPasteEventType): void;
};
