# SmartCommerce

Uma aplicação de e-commerce moderna construída com React e Vite.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd SmartCommerce
```

2. Instale as dependências:
```bash
npm install
```

## Executando a Aplicação

1. Para iniciar o servidor de desenvolvimento:
```bash
npx vite
```

2. Abra seu navegador e acesse:
```
http://localhost:5173
```

## Scripts Disponíveis

- `npx vite` - Inicia o servidor de desenvolvimento
- `npx vite build` - Cria uma versão otimizada para produção
- `npx vite preview` - Visualiza a versão de produção localmente

## Estrutura do Projeto

```
SmartCommerce/
├── client/           # Frontend da aplicação
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── contexts/    # Contextos React
│   │   ├── hooks/       # Hooks personalizados
│   │   ├── pages/       # Páginas da aplicação
│   │   └── types/       # Definições de tipos TypeScript
├── server/           # Backend da aplicação
└── shared/           # Código compartilhado entre frontend e backend
```