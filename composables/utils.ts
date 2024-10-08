import assets from '../contentrain/assets.json';
export function getStaticImagePath(path: string): string {
    if(!path) return '';
    return path.replace('public/', '');
}

export function getImageAlt(path: string): string {
    const asset = assets.find((asset) => asset.path === path);
    return asset?.alt || '';
}
// T Tipi her zaman ID isimli field icermelidir asagidaki fonksiyonu buna gore duzenliyoruz
export function getRelationalFields<T extends { ID: string }>(data: T[], id: string): T | undefined {
    return data.find((item) => item.ID === id);
}