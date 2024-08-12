import CryptoJS from "crypto-js";

export const getDecryptData = (encrypted) => {
  if (!encrypted || !encrypted.key || !encrypted.iv || !encrypted.content) {
    throw new Error("Invalid encrypted data");
  }

  const key = CryptoJS.enc.Hex.parse(encrypted.key);
  const iv = CryptoJS.enc.Hex.parse(encrypted.iv);
  const encryptedContent = CryptoJS.enc.Hex.parse(encrypted.content);

  try {
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedContent },
      key,
      { iv: iv }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed");
  }
};
