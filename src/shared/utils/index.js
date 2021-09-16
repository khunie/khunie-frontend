export function compare(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

export const blobToBase64 = data => {
    return new Promise((resolve, _) => {
        // instantiate a file reader
        const fileReader = new FileReader();

        // read the file
        fileReader.readAsDataURL(data);

        fileReader.onloadend = () => {
            resolve(fileReader.result); // Here is the base64 string
        };
    });
};
