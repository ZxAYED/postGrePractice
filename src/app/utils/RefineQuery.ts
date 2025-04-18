
const refineQuery =<T extends Record<string,unknown>,K extends keyof T>(obj:T , keys:K []) => {
    const finalObj:Partial<T> = {}
    keys.forEach((key) => {
        if (Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
          }
    }
    )
    return finalObj
}

export default refineQuery