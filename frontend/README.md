# Notification Front-End

Este é o front-end de uma aplicação de notificação, construída com Next.js e Tailwind CSS. A aplicação está configurada para funcionar com um back-end separado, utilizando service workers para notificações push.

# Melhorias
- Variáveis de Ambiente: As URLs das APIs e outras configurações específicas do ambiente estão agora configuradas através de variáveis de ambiente.
- Caching: Implementação futura para melhorar a performance.
- Responsividade: Utilização de Tailwind CSS para garantir que o design seja responsivo.
- Acessibilidade: Seguir as melhores práticas de acessibilidade web (WCAG).

## Instalação

1. **Clone o repositório:**
    ```sh
    git clone <URL do repositório>
    cd notification-front-end
    ```

2. **Instale as dependências:**
    ```sh
    npm install
    ```

3. **Configuração das Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
    ```env
    NEXT_PUBLIC_API_URL=<URL do back-end>
    ```

## Uso

1. **Inicie o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

    O servidor será iniciado na porta 3000. Acesse `http://localhost:3000` em seu navegador.

## Estrutura de Arquivos

- `/public/service-worker.js`: Service worker para gerenciamento de notificações push.
- `/tailwind.config.js`: Configurações do Tailwind CSS.
- `/app/globals.css`: Estilos globais utilizando Tailwind CSS.
- `/app/layout.js`: Layout base para a aplicação.
- `/app/page.js`: Página principal da aplicação.


# Contribuição 

Sinta-se à vontade para fazer um fork deste projeto e enviar pull requests. Para grandes mudanças, por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.