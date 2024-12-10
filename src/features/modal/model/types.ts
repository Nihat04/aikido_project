export enum modaltypes {
    decisionModal,
}

export type decisionModal = {
    children: string | JSX.Element;
    btns: { text: string; action: () => void }[];
};

export type modal = {
    data: decisionModal;
    type: modaltypes;
};
