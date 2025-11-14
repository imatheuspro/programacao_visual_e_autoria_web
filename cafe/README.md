🚀 Passo a passo para rodar o projeto

1️⃣ Instalar o Node.js

Se você ainda não tem o Node.js instalado, baixe aqui:

➡ https://nodejs.org/

Após instalar, abra o PowerShell ou Terminal e verifique:

node -v
npm -v


Se aparecerem as versões, está tudo instalado corretamente.

2️⃣ Abrir o projeto no terminal

No Windows:

Clique com o botão direito dentro da pasta do projeto

Escolha: "Abrir no Terminal" ou "Abrir no PowerShell"

Ou navegue manualmente usando:

cd caminho/da/pasta/do/projeto

3️⃣ Instalar as dependências

Com o terminal aberto dentro do projeto, execute:

npm install


Isso irá instalar todas as dependências automaticamente (incluindo o json-server, se estiver no package.json).

4️⃣ Iniciar a API local

Para rodar o servidor com o banco de dados db.json, use:

npx json-server db.json


A API ficará disponível em:

➡ http://localhost:3000/coffee

⚠️ Importante: deixe essa janela do terminal aberta enquanto estiver usando o site.

5️⃣ Abrir o site no navegador

Basta abrir o arquivo:

index.html


Pronto! O site já vai carregar os dados da API local normalmente.
