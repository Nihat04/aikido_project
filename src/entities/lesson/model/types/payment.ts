export type Payment = {
    payResponses: {
        date: {
            year: number;
            month: number;
            day: number;
            dayOfWeek: number;
            dayOfYear: number;
            dayNumber: number;
        };
        paid: number;
        image: string;
    }[];
    sum: number;
    num: number;
    price: number;
};
