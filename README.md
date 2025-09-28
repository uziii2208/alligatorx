# 📱 **AlligatorX Mobile Security App**

## **Overview**
AlligatorX is a mobile security application designed to protect sensitive user data through multi-layered encryption. Using **AES-256**, **SHA-256**, and **PBKDF2**, AlligatorX ensures that your documents, photos, and files remain secure from unauthorized access and internet-based threats.  

With a strong focus on user privacy and security, AlligatorX prevents common attacks like brute force, dictionary attacks, and unauthorized device access.

---

## **Core Features**
1. **AES-256 Encryption**  
   - Encrypts all device data securely.  
   - Combines the user's **PIN** and a **unique hardware key (UID)** embedded in the device.  
   - Provides robust security against tampering or unauthorized modifications.

2. **PBKDF2 (Password-Based Key Derivation Function 2)**  
   - Derives secure encryption keys from weak PINs and random salt.  
   - Hardens weak PINs against brute force and dictionary attacks.

3. **SHA-256 Encryption**  
   - Used for securing documents and files.  
   - Prevents unauthorized access or leakage of sensitive data.

4. **Dual Access Mechanism**  
   - **Anonymous Mode**: Allows app access with phone passcode only.  
   - **User Mode**: Requires a password processed through PBKDF2 for full app functionality.

5. **Encryption & Decryption**  
   - Data can be encrypted and decrypted seamlessly, ensuring usability while maintaining security.

---

## **How It Works**
1. An **anonymous user** can access the app using the device passcode.  
2. A **registered user** needs an additional password (processed with PBKDF2) to unlock advanced features.  
3. Sensitive data (e.g., documents and photos) is encrypted using **SHA-256** and stored securely.  
4. Device data is encrypted with **AES-256**, ensuring both hardware-based and PIN protection.

---

## **Technologies Used**
- **AES-256**: Advanced Encryption Standard for device-wide data encryption.  
- **PBKDF2**: Password key derivation for strengthening PIN-based authentication.  
- **SHA-256**: Hashing algorithm for securing user documents.  

---

## **Screenshots**  
*Coming Soon*  

---

## **Contributors**
| Name           | GitHub Profile                               |
|----------------|----------------------------------------------|
| **Hoang Gia**  | [Follow link](https://github.com/uziii2208)  |
| **Phuc Huy**   | [Follow link](https://github.com/huypnn2811) |
| **Ngoc Thang** | [Follow link](https://github.com/uziii2208)  |

---

## **License**
© 2024 AlligatorX. All rights reserved.  

---

## **Get Started**  
1. Download and install AlligatorX on your mobile device.  
2. Set a secure PIN and password for enhanced protection.  
3. Start encrypting your sensitive data securely!

---

For feedback, issues, or contributions, please contact the contributors via GitHub.  


<!-- Security scan triggered at 2025-09-02 05:21:10 -->

<!-- Security scan triggered at 2025-09-09 05:44:50 -->

<!-- Security scan triggered at 2025-09-28 15:54:14 -->