export type Tip = {
    id: number;
    image: string;
    title: string;
    short: string;
    full: string;
    category: string;
    level: string;
    place: string | null;
    createdAt: Date | undefined;
};

export async function fetchTips() {
    const res = await fetch("http://localhost:3000/tips");
    return res.json();
}