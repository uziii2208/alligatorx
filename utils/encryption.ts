import 'react-native-get-random-values';
import * as CryptoJS from 'crypto-js';

export async function encryptData(data: string, key: string): Promise<string> {
    try {
        // Generate key hash and IV
        const keyHash = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
        const iv = CryptoJS.lib.WordArray.random(16);
        
        // Encrypt the data
        const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(keyHash), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        // Convert IV and ciphertext to hex strings
        const ivHex = iv.toString(CryptoJS.enc.Hex);
        const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        
        // Combine IV and encrypted data with a delimiter
        const result = `${ivHex}++${encryptedHex}`;
        console.log('result:', result);
        return result;
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

export async function decryptData(data: string, key: string): Promise<string> {
    try {
        
        if (!data || typeof data !== 'string' || !data.includes('++')) {
            throw new Error('Invalid encrypted data format');
        }
        
        // Split IV and encrypted data
        const [ivHex, encryptedHex] = data.split('++');
        if (!ivHex || !encryptedHex) {
            throw new Error('Missing IV or encrypted data');
        }

        // Generate key hash
        const keyHash = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
        
        // Parse IV and encrypted data from hex
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
        
        // Create cipher params
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: encrypted,
            iv: iv,
            key: CryptoJS.enc.Hex.parse(keyHash)
        });

        // Decrypt
        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            CryptoJS.enc.Hex.parse(keyHash),
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        return decryptedText;
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}