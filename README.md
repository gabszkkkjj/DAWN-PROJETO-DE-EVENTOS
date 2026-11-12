# DAWN

Portal de eventos desenvolvido em Vue 3. Permite criar conta, fazer login, publicar eventos, editar, excluir e se inscrever neles.

## Funcionalidades

- Cadastro e login de usuários
- Criação, edição e exclusão de eventos (só o criador pode editar ou excluir)
- Inscrição e cancelamento de inscrição
- Busca por título ou local e filtro "Minhas inscrições"
- Tema claro e escuro automático
- Dados salvos no navegador com IndexedDB

## Ideias para futuro:
X - Quero tranformar em um app para ios e android
X - Divulgar eventos por ele 
X - Abrir vaga para comentarios
X - Adicionar fotos dos perfils, 
X - Criadores de festas com mais likes



## Tecnologias

- Vue 3 (Composition API, `<script setup>`)
- Vue Router
- Vite
- IndexedDB

## Como rodar

```bash
git clone <https://github.com/gabszkkkjj/DAWN-PROJETO-DE-EVENTOS>
cd dawn-app
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Estrutura

```
src/
├── assets/        CSS global
├── components/    BaseButton, CaixaMensagem, EventCard, Navbar
├── composables/   useAuth, useEventos, useTransicao
├── router/        rotas e proteção da tela de eventos
├── views/         InitView, LoginView, RegisterView, HomeView
└── db.js          acesso ao IndexedDB
```

## Autor
Marcus Gabriel Nunes dos Santos, Curso ADS