export const base64ToBlob = (base64String: string): Blob => {
    const byteCharacters = atob(base64String); // Decode base64
    const byteNumbers = new Uint8Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    return blob;
}
