export type Payment = {
    payResponses: {
        date: Date;
        paid: number;
        image: string;
    }[];
    sum: number;
    num: number;
    price: number;
};
