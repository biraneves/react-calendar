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