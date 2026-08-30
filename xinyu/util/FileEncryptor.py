import os

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class FileEncryptor:
    def __init__(self, password, algorithm='AES', key_size=32, salt_size=16, iv_size=16):
        """
        文件加密器
        :param password: 加密密码
        :param algorithm: 加密算法 ('AES' 或 'DES')
        :param key_size: 密钥长度(AES:16,24,32; DES:8)
        :param salt_size: 盐值长度
        :param iv_size: 初始化向量长度
        """
        self.password = password.encode()
        self.algorithm = algorithm.upper()
        self.key_size = key_size
        self.salt_size = salt_size
        self.iv_size = iv_size
        self.backend = default_backend()
        self.chunk_size = 64 * 1024  # 64KB块大小

        # 验证参数
        if self.algorithm == 'DES':
            self.key_size = 8  # DES密钥固定为8字节
            self.iv_size = 8  # DES IV固定为8字节
        elif self.algorithm == 'AES':
            if key_size not in (16, 24, 32):
                raise ValueError("AES key size must be 16, 24, or 32 bytes")
        else:
            raise ValueError("Unsupported algorithm. Use 'AES' or 'DES'")

    def _derive_key(self, salt):
        """从密码派生密钥"""
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=self.key_size,
            salt=salt,
            iterations=100000,
            backend=self.backend
        )
        return kdf.derive(self.password)

    def encrypt_file(self, input_path, output_path):
        """加密文件"""
        # 生成随机盐和IV
        salt = os.urandom(self.salt_size)
        iv = os.urandom(self.iv_size)

        # 派生密钥
        key = self._derive_key(salt)

        # 创建加密器
        if self.algorithm == 'AES':
            cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=self.backend)
        else:  # DES
            cipher = Cipher(algorithms.TripleDES(key), modes.CBC(iv), backend=self.backend)

        encryptor = cipher.encryptor()

        # 创建填充器
        block_size = 128 if self.algorithm == 'AES' else 64
        padder = padding.PKCS7(block_size).padder()

        # 加密文件
        with open(input_path, "rb") as f_in, open(output_path, "wb") as f_out:
            # 写入盐和IV
            f_out.write(salt)
            f_out.write(iv)

            # 分块加密
            while True:
                chunk = f_in.read(self.chunk_size)
                if not chunk:
                    break

                # 添加填充并加密
                padded_chunk = padder.update(chunk)
                encrypted_chunk = encryptor.update(padded_chunk)
                f_out.write(encrypted_chunk)

            # 处理最后的数据
            padded_final = padder.finalize()
            encrypted_final = encryptor.update(padded_final)
            encrypted_final += encryptor.finalize()
            f_out.write(encrypted_final)

    def decrypt_file(self, input_path, output_path):
        """解密文件"""
        # 获取文件大小
        file_size = os.path.getsize(input_path)
        header_size = self.salt_size + self.iv_size

        with open(input_path, "rb") as f_in, open(output_path, "wb") as f_out:
            # 读取盐和IV
            salt = f_in.read(self.salt_size)
            iv = f_in.read(self.iv_size)

            # 派生密钥
            key = self._derive_key(salt)

            # 创建解密器
            if self.algorithm == 'AES':
                cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=self.backend)
                block_size = 128
            else:  # DES
                cipher = Cipher(algorithms.TripleDES(key), modes.CBC(iv), backend=self.backend)
                block_size = 64

            decryptor = cipher.decryptor()

            # 创建解填充器
            unpadder = padding.PKCS7(block_size).unpadder()

            # 计算加密数据大小
            encrypted_size = file_size - header_size

            # 分块解密
            while True:
                # 获取当前位置
                position = f_in.tell()
                remaining = file_size - position

                # 如果是最后一块，一次性读取
                if remaining <= self.chunk_size:
                    chunk = f_in.read()
                    if not chunk:
                        break

                    # 解密最后一块
                    decrypted_chunk = decryptor.update(chunk)
                    decrypted_chunk += decryptor.finalize()

                    # 移除填充
                    unpadded_chunk = unpadder.update(decrypted_chunk)
                    unpadded_chunk += unpadder.finalize()
                    f_out.write(unpadded_chunk)
                    break

                # 读取并解密中间块
                chunk = f_in.read(self.chunk_size)
                if not chunk:
                    break

                decrypted_chunk = decryptor.update(chunk)
                f_out.write(decrypted_chunk)