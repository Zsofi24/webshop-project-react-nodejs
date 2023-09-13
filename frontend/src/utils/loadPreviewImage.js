export default function previewImage(filetest, setImage) {
    const fileReader = new FileReader()
    fileReader.onload = () => {
        setImage(fileReader.result)
    }
    if (filetest) {
        fileReader.readAsDataURL(filetest);
    }
}