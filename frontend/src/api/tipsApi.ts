export type Tip = {
    id: number;
    title: string;
    text: string;
};

export async function fetchTips() {
    const res = await fetch("http://localhost:3000/tips");
    return res.json();
}