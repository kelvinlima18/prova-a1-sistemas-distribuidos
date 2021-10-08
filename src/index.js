const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const clientes = [];

app.get('/usuario/:id', (request, response) => {
  const idUsuario = request.params.id;
  const checkUsuarioExiste = clientes.find(cliente => cliente.id === idUsuario);

  if (checkUsuarioExiste) {
    return response.status(200).json(checkUsuarioExiste);
  } else {
    return response.status(404).send({ error: 'Usuário não encontrato' });
  }
});

app.post('/usuario', (request, response) => {
  const { nome, endereco, cidade } = request.body;

  const cliente = {
    id: uuid(),
    nome,
    endereco,
    cidade
  };

  clientes.push(cliente);

  return response.status(201).json(cliente);
});

app.put('/usuario/:id', (request, response) => {
  const idUsuario = request.params.id;
  const { nome, endereco, cidade } = request.body;

  const clienteIndex = clientes.findIndex(cliente => cliente.id === idUsuario);

  if (clienteIndex < 0) {
    return response.status(404).send({ error: 'Usuário não encontrato' });
  } else {
    const cliente = {
      id: idUsuario,
      nome,
      endereco,
      cidade
    };

    clientes[clienteIndex] = cliente;

    return response.status(200).json(cliente);
  }
});

app.delete('/usuario/:id', (request, response) => {
  const idUsuario = request.params.id;

  const clienteIndex = clientes.findIndex(cliente => cliente.id === idUsuario);

  if (clienteIndex < 0) {
    return response.status(404).send({ error: 'Usuário não encontrato' });
  } else {

    clientes[clienteIndex] = {};

    return response.send({ message: 'Usuário deletado' });
  }
});

app.listen(3000, () => console.log('Ta rodando na porta 3000'));