export function genOrderId(prefix = "HP"): string {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${prefix}-${yyyy}${mm}${dd}-${rand}`;
}
