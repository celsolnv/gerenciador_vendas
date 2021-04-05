<h1>Gerenciador de vendas</h1>

<h4> Requerimentos </h4> 

<ul>
    <li>Versão do nodejs 14.16.0 ou superior</li>
    <li>Versão do yarn 1.22.5 ou superior</li>
</ul>



<h4>Instalação</h4> 

<p>
    Para baixar o projeto você pode rodar o seguinte comando no seu terminal
</p>
<p>
    git clone https://github.com/celsolnv/gerenciador_vendas.git
</p>
<p>Em seguida entre na pasta que foi criada e instale as dependências</p>
<p>
    cd gerenciador_vendas/ && yarn install 
</p>
<p>
    Em seguida basta rodar o comando <strong>yarn dev</strong> para rodar o projeto.
</p>
<p>
    O projeto por padrão roda na porta 3000, logo você pode acessa-lo usando o
    endereço  http://localhost:3000.
</p>
<p>
    É provável que e ocorra um delay ao buscar buscar os dados no servidor então basta 
    aguardar um pouco ou dar um refresh na página.
    A api está hospedada no servidor heroku, logo quando ele identifica que ela não
    está recebendo muitos acessos ele a derruba (isso acontece por se tratar de uma versão 
    gratuita) .
    <a href="https://github.com/celsolnv/api_gerenciador_vendas">Link para o projeto do servidor</a>

</p>

<h4>Tela inicial</h4>
<img src="/static/index.png" alt="Tela inicial do projeto">

<p> A tela inicial do projeto é a de listagem dos pedidos. Ainda nessa tela você
    pode adicionar, editar ou excluir um pedido.
</p>