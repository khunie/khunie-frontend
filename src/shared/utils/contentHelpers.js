export const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(date).toLocaleDateString(undefined, options);
};

export const removeExtraSpaces = input => {
    return input.replace(/\s+/g, ' ').trim();
};
