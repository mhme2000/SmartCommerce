## Projeto: Produtos (React + .NET + Postgres)

### Requisitos
- Docker e Docker Compose

### Subir o projeto
```bash
docker compose up -d --build
```

### Endpoints e URLs
- Frontend: `http://localhost:3000`
- API (Swagger): `http://localhost:5150/swagger/index.html`
- Banco: Postgres em `localhost:5432`

Connection string usada pela API:
```
Host=db;Port=5432;Database=productsdb;Username=postgres;Password=postgres
```

### Observações
- A API expõe apenas HTTP (porta 5150).
- O frontend usa proxy Nginx para `/api` em produção (Docker). Em desenvolvimento local, usa `http://localhost:5150`.
