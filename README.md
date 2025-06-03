# 📚 Biblioteca Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-16+-DD0031.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![API](https://img.shields.io/badge/API-JWT_Protected-FF6F61.svg)

Sistema de Gerenciamento de Biblioteca Integrado
Visão Geral
Solução completa para gestão de bibliotecas com dois sistemas integrados:

Sistema Web (Administração): Plataforma Angular para gestão do acervo

Sistema Mobile (Android): Aplicativo para usuários realizarem empréstimos

Funcionalidades Principais
🖥️ Sistema Web (Staff)
Gestão de Acervo

CRUD completo de livros e autores

Visualização organizada por autor

Controle de Operações

Registro detalhado de logs (histórico de alterações)

Dashboard de gestão

Processamento de Empréstimos

Leitura de QR Codes gerados pelo app mobile

Confirmação/baixa de empréstimos

📱 Sistema Mobile (Usuários)
Busca e seleção de livros

Escolha de localização na biblioteca

Geração automática de QR Code único contendo:

ID do livro

ID do usuário

Localização física

Timestamp

Fluxo de Empréstimo
Diagram
Code
sequenceDiagram
    Usuário Mobile->>+App Android: Seleciona livro e local
    App Android-->>-Usuário Mobile: Gera QR Code
    Usuário Mobile->>Bibliotecário: Apresenta QR Code
    Bibliotecário->>Sistema Web: Escaneia código
    Sistema Web->>Banco de Dados: Registra empréstimo
    Sistema Web-->>Bibliotecário: Confirma liberação
    Bibliotecário->>Usuário: Entrega livro físico
Stack Tecnológica
Frontend Web: Angular 16+ (Componentes standalone)

Estado: NgRx (Redux pattern)

Estilo: Tailwind CSS

Comunicação: RxJS Observables

Autenticação: JWT Tokens

API: JSON Server (mock)

Mobile: Android Nativo (Java/Kotlin - não incluso neste repositório)
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

