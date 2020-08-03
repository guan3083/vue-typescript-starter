export const isValidUsername = (str: string) => /^[a-zA-Z]{4,12}/.test(str.trim())

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
