const validInlineStyles = ['bold', 'underline', 'italic', 'spoiler', 'not_bold', 'not_italic', 'not_underline'];
export const isValidInlineStyle = (str: string) => validInlineStyles.includes(str);
