export const formatCurrency = (value) => {
    const numero = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

    if (isNaN(numero)) return '0,00';

    // Formatea solo el número con separador de miles y decimales
    const formattedNumber = new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);

    return ` ${formattedNumber}`;
};