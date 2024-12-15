export const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay(); // Get current day (0-6, where 0 is Sunday)
    const diff = (day === 0 ? -6 : 1) - day; // Calculate difference to get to Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff); // Set to the start of the week (Monday)
    return monday;
};

export const getDaysOfWeek = (date: Date): Date[] => {
    const startOfWeek = getStartOfWeek(date);
    const daysOfWeek: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i); // Add days to get the full week
        daysOfWeek.push(day);
    }

    return daysOfWeek;
};

// Function to get the current week's days starting from Monday
export const getCurrentWeekDays = (): Date[] => {
    return getDaysOfWeek(new Date());
};

// Function to get the next week's days starting from Monday
export const getNextWeekDays = (currentWeekMonday: Date): Date[] => {
    currentWeekMonday.setDate(currentWeekMonday.getDate() + 7); // Move to the same day next week
    return getDaysOfWeek(currentWeekMonday);
};

// Function to get the previous week's days starting from Monday
export const getPreviousWeekDays = (currentWeekMonday: Date): Date[] => {
    currentWeekMonday.setDate(currentWeekMonday.getDate() - 7); // Move to the same day next week
    return getDaysOfWeek(currentWeekMonday);
};
