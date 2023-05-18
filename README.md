# Dietas Já
Repositorio para o projeto da cadeira de Engenharia de Software.
* Python com Django, para o back-end;
* React Native (JS), HTML/CSS e Expo, para o front-end);
* Postgres, para a persistência de dados.

## Descrição:
O Dietas Já possibilita o acompanhamento da ingestão diária de calorias, além de
oferecer recompensa ao usuário (com foco na motivação para o cumprimento da dieta).

Ao se cadastrar (através de login e senha únicos), o usuário deverá inserir seu nome
e sobrenome, informações acerca da sua dieta, meta diária de consumo de calorias, além do
seu peso e altura (para cálculo do IMC).

Diariamente e a cada refeição, ele deverá informar no aplicativo quais alimentos
foram consumidos (caso não encontre um alimento nas opções disponíveis, ele poderá
adicioná-lo, junto com sua informação calórica).

Ao longo do dia, o usuário poderá consultar quanto da sua meta diária já foi atingida
para planejar as próximas refeições e, ao final do dia, visualizar se a meta diária foi cumprida
ou ultrapassada.

Para ajudá-lo a seguir a dieta de maneira consistente, um desafio será realizado: a
cada sete dias dentro da meta diária de consumo de calorias, o usuário ganhará uma
recompensa (poderá consumir um doce fora daquilo que está planejado na dieta). Além
disso, para enfatizar/encorajar as conquistas, o usuário poderá visualizar seu desempenho
nos últimos sete dias.

## Passo a Passo para Uso do Git:
Para começar a mexer numa funcionalidade faça:
1) Entre no site do github:
* Crie uma issue com o nome issue-n°: algo
* Crie uma branch com o nome issue-n° baseada na main

2) Na sua maquina:
* Sincronize o Github Desktop ou use o comando "git pull" no terminal(estando na branch main)
* Mude para a branch issue-n° no Github Desktop ou use o comando "git switch issue-n°" no terminal

3) Depois de fazer as primeira mudanças na sua maquina, antes do commit faça:
* Adcione no nome do commit [#n°]: seja na aba de nome da mensagem no Github Desktop ou no comando "git commit -m "[#n°]: Mensagem" "
* Depois de feito os commits do dia, aperte no botão push do Github Desktop ou use o comando "git push"

4) Após 100% a funcionalidade:
* Entre no site do github e aperte o botão "Compare and Pull Request"
* Crie um Pull Request
* Caso outra pessoa tenha testa e esteja acesso o botão de merge automatico, dê o merge
* Caso outra pessoa n tenha testado não dê o merge
* Caso tenha sido testado mas não dá para fazer o merge automaticamente, chame o Vinicius para resolverem os conflitos manualmente.

5) Beba água e seja feliz.
