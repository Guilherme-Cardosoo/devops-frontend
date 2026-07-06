# DevOps Frontend

Frontend da aplicação responsável pela interface de gerenciamento dos produtos.

## Objetivo

Este projeto fornece uma interface web para consumir a API desenvolvida em FastAPI, permitindo visualizar, cadastrar, editar e excluir produtos.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx

## Executando Localmente

Basta abrir o arquivo:

```
index.html
```

ou utilizar uma extensão como o Live Server do Visual Studio Code.

## Docker

Construir a imagem:

```bash
docker build -t devops-frontend .
```

Executar:

```bash
docker run -p 80:80 devops-frontend
```

A aplicação ficará disponível em:

```
http://localhost
```

## Docker Hub

Imagem publicada:

```
guiihermecardoso/devops-frontend:latest
```

## Comunicação com a API

O frontend realiza requisições HTTP para a API desenvolvida em FastAPI, consumindo os endpoints responsáveis pelo gerenciamento dos produtos.

## Autor

Guilherme Cardoso

Projeto desenvolvido como trabalho final da disciplina de DevOps.