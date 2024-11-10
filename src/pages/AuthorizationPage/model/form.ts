import { FieldErrors } from 'react-hook-form';

export function handleErrors(errors: FieldErrors): string[] {
    const keysAsArr = Object.keys(errors);
    const errorsMsgs: string[] = [];

    keysAsArr.forEach((errorPropName) => {
        const message = errors[errorPropName]?.message?.toString();

        if (message) {
            errorsMsgs.push(message);
        }
    });

    return errorsMsgs;
}
