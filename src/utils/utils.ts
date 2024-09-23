export const phoneRegex = /^\d{8}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const thousands = /\B(?=(\d{3})+(?!\d))/g;

export const converHidePhone = (val: string) => {
    return val.length > 4
        ? val.substring(0, 2) + '***' + val.substring(5)
        : val;
}
