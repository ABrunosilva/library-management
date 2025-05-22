# 📚 Biblioteca Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-16+-DD0031.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![API](https://img.shields.io/badge/API-JWT_Protected-FF6F61.svg)

Um sistema completo para gerenciamento de bibliotecas pessoais com autenticação segura e operações CRUD. Desenvolvido com Angular e integrado a APIs RESTful.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Library+Dashboard+Preview) <!-- Adicione screenshot real -->

## 🌟 Recursos Principais

### Funcionalidades Essenciais
- 🔐 Autenticação JWT com refresh tokens
- 📖 CRUD completo de livros (título, autor, gênero, ISBN)
- 👤 Gerenciamento de perfil do usuário
- 🔍 Busca inteligente e filtros dinâmicos
- 📱 Design responsivo para todos os dispositivos

### Stack Tecnológica
| Camada       | Tecnologias                                 |
|--------------|--------------------------------------------|
| **Frontend** | Angular 16+, Angular Material, RxJS        |
| **Backend**  | Node.js/Express, MongoDB (ou JSON Server)  |
| **Segurança**| JWT, Bcrypt, CORS middleware               |
| **Ferramentas**| Postman, Swagger, GitHub Actions         |

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- Angular CLI 16+
- MongoDB 6+ (ou Docker para containerização)
- Postman (para testes de API)

### ⚙️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/library-management.git
cd library-management

2.Configure o backend

bash
cd backend
npm install
cp .env.example .env # Configure suas variáveis
npm run server

3.Configure o frontend

bash
cd frontend
npm install
ng serve --open

4.Acesse o sistema

Frontend: http://localhost:4200
Backend: http://localhost:3000
API Docs: http://localhost:3000/api-docs

