// event interface
export interface Event {
    id: number;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
}

//attendee interface
export interface Attendee {
    id: number;
    name: string;
    email: string;
}

//event popularity interface
export interface EventPopularityResponse extends Event {
    spotsRemaining: number;
    popularityScore: number;
    popularityTier: string;
}

//hard coded events
let events: Event[] = [
    {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-03-15T09:00:00.000Z",
        capacity: 200,
        registrationCount: 185,
    },
    {
        id: 2,
        name: "Startup Pitch Night",
        date: "2025-02-20T18:00:00.000Z",
        capacity: 50,
        registrationCount: 12,
    },
    {
        id: 3,
        name: "Web Dev Workshop",
        date: "2025-02-10T10:00:00.000Z",
        capacity: 30,
        registrationCount: 30,
    },
];

//hard coded attendees
let attendees: Attendee[] = [
    { id: 1, name: "Jordan Smith", email: "jordan.smith@email.com" },
    { id: 2, name: "Alex Chen", email: "alex.chen@email.com" },
];

//popularity logic
const popularityTiers: { minimum: number; tier: string }[] = [
    { minimum: 90, tier: "Hot" },
    { minimum: 70, tier: "Popular" },
    { minimum: 50, tier: "Moderate" },
    { minimum: 25, tier: "Building" },
    { minimum: 0, tier: "New" },
];

export const getTier = (score: number): string => {
    for (const entry of popularityTiers) {
        if (score >= entry.minimum) return entry.tier;
    }
    return "New";
};

export const calculatePopularityScore = (event: Event): number => {
    if (event.capacity === 0) return 0;
    const value = (event.registrationCount / event.capacity) * 100;
    return Math.round(value * 10) / 10;
};

export const getPopularityResponse = (event: Event): EventPopularityResponse => {
    const score = calculatePopularityScore(event);
    return {
        id: event.id,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        spotsRemaining: event.capacity - event.registrationCount,
        popularityScore: score,
        popularityTier: getTier(score),
    };
};

//CRUD
const nextEventId = (): number => {
    return Math.max(...events.map(e => e.id), 0) + 1;
};

export const getAllEvents = (): Event[] => {
    return events;
};

export const getEventById = (id: number): Event | undefined => {
    return events.find((e) => e.id === id);
};

export const createEvent = (name: string, date: string, capacity: number): Event => {
    const newEvent: Event = {
        id: nextEventId(),
        name,
        date,
        capacity,
        registrationCount: 0,
    };
    events.push(newEvent);
    return newEvent;
};

export const updateEvent = (
    id: number,
    updates: Partial<Pick<Event, "name" | "date" | "capacity" | "registrationCount">>
): Event | undefined => {
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return undefined;

    events[index] = { ...events[index], ...updates };
    return events[index];
};

export const deleteEvent = (id: number): boolean => {
    const initialLength = events.length;
    events = events.filter((e) => e.id !== id);
    return events.length < initialLength;
};