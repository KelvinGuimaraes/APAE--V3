const database = require('../config/database');
const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        // O banco será acessado via database.getDatabase() quando necessário
    }

    // Obter instância do banco
    getDB() {
        return database.getDatabase();
    }

    // Criar usuário
    async create(userData) {
        const { nome, idade, diagnostico, sexo, cpf, senha } = userData;
        
        return new Promise(async (resolve, reject) => {
            try {
                // Verificar se CPF já existe
                const existingUser = await this.findByCpf(cpf);
                if (existingUser) {
                    reject(new Error('Este CPF já está cadastrado.'));
                    return;
                }

                // Criptografar senha
                const senhaCriptografada = await bcrypt.hash(senha, 10);

                // Inserir usuário
                const db = this.getDB();
                db.run(
                    'INSERT INTO usuarios (nome, idade, diagnostico, sexo, cpf, senha) VALUES (?, ?, ?, ?, ?, ?)',
                    [nome, parseInt(idade), diagnostico, sexo.toUpperCase(), cpf, senhaCriptografada],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                id: this.lastID,
                                nome,
                                idade: parseInt(idade),
                                diagnostico,
                                sexo: sexo.toUpperCase(),
                                cpf
                            });
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    // Buscar usuário por CPF
    findByCpf(cpf) {
        return new Promise((resolve, reject) => {
            try {
                const db = this.getDB();
                db.get('SELECT * FROM usuarios WHERE cpf = ?', [cpf], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Buscar usuário por ID
    findById(id) {
        return new Promise((resolve, reject) => {
            try {
                const db = this.getDB();
                db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Listar todos os usuários
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                const db = this.getDB();
                db.all('SELECT id, nome, idade, diagnostico, sexo, cpf, tipo, data_criacao FROM usuarios', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Verificar senha
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = UserModel;