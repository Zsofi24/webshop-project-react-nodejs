export default function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if(savedValue) return savedValue

    if(initialValue instanceof Function) return initialValue()
    return initialValue
}