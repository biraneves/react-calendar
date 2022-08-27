export const DAYS_OF_WEEK = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
];

export const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

export function getToday(): string {
    return '2021-06-21';
}

export function formatMonth(isoMonth: string): string {
    const [ year, month ] = isoMonth.split('-');
    return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function addMonths(isoMonth: string, increment: number): string {
    const jsDate = new Date(isoMonth + "-01T12:00:00");
    jsDate.setMonth(jsDate.getMonth() + increment);

    return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, '0')}`;
}