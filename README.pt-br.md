# 📄 eStaff - Teste Técnico (Fluxo ASO)

*Leia em [Inglês 🇺🇸](README.md)*

Este repositório contém a resolução do teste técnico para a posição de Engenheiro de Software. O desafio consistiu em implementar o fluxo completo da tela de **"Dados e competências"** de um aplicativo para freelancers, com foco na funcionalidade de declaração e upload do **ASO (Atestado de Saúde Ocupacional)**.

## 📱 Demonstração do Projeto (Vídeos)

Assista ao aplicativo rodando nativamente em ambas as plataformas, demonstrando todas as regras de negócio exigidas, animações, fidelidade da UI e validações de formulário:

- **🤖 Demonstração Android:** [Assistir Vídeo no Google Drive](https://drive.google.com/file/d/1GHp2cWSMXffhaHXgQ_FeNY0G0qH7YZyq/view?usp=drive_link)
- **🍎 Demonstração iOS:** [Assistir Vídeo no Google Drive](https://drive.google.com/file/d/1OnJedtkrwymnojSjvHcM-NUYOleQVNCM/view?usp=drive_link)

## 🎯 Objetivo e Foco

O objetivo principal desta implementação não foi apenas entregar uma tela funcional, mas demonstrar domínio em arquitetura de software, padrões de design (Design Patterns), escalabilidade e qualidade de código em aplicativos móveis.

O aplicativo foi projetado para ser altamente testável, com uma clara Separação de Responsabilidades (SoC), tipagem estrita (TypeScript) e uma implementação fiel aos wireframes do Figma fornecidos (pixel-perfect).

## 🏗️ Arquitetura e Decisões Técnicas

A arquitetura foi modularizada seguindo os princípios do **Clean Code** e **SOLID**:

- **Componentização (Dumb Components):** Todo o Design System (Botões, Inputs, Tooltips, Checkboxes, RadioGroups) foi isolado no diretório `src/components/ui`. Esses componentes são "burros", recebem apenas `props` e não conhecem regras de negócio, facilitando a reutilização e testabilidade.
- **Gerenciamento de Estado e Validação:** A dupla **React Hook Form (RHF) + Zod** foi escolhida para garantir alta performance (evitando re-renderizações desnecessárias a cada tecla digitada) e uma validação de schema robusta, imutável e inferida pelo TypeScript.
- **Isolamento Lógico (Custom Hooks):** Toda a lógica de negócios da tela (controle de exibição condicional, interações de upload, visibilidade de tooltips e submissão) foi extraída para o hook `useAsoForm`. A tela (`DataAndSkillsScreen`) atua puramente de forma declarativa, orquestrando a interface do usuário.
- **Camada de Serviço (Mock API):** A comunicação externa foi abstraída em `asoService`. Se um backend real for conectado no futuro, a refatoração ficará restrita exclusivamente a este arquivo, sem impacto na UI ou no Hook.
- **Tratamento de Erros e Resiliência:** Implementação de um Error Boundary Global para prevenir fechamentos abruptos do app (crashes) e um serviço estruturado de Logger.
- **Tipagem Estrita:** Não há uso de `any`. Todos os schemas geram tipagens automáticas via `zod.infer`, criando uma Única Fonte de Verdade (Single Source of Truth).

## 🛠️ Stack Tecnológica

- **React Native / Expo:** Framework principal para desenvolvimento multiplataforma.
- **TypeScript:** Tipagem estática para evitar erros em tempo de compilação.
- **React Hook Form:** Gerenciamento otimizado de formulários.
- **Zod:** Declaração e validação de schemas.
- **Expo Document Picker:** Para acesso nativo aos arquivos do dispositivo (Upload de PDF).
- **React Navigation:** Navegação nativa em pilhas (Stack) e abas (Bottom Tabs).
- **Jest & React Native Testing Library:** Para testes robustos de integração e unidade.

## 📂 Estrutura de Diretórios

```text
estaff-technical-test/
├── src/
│   ├── components/
│   │   ├── forms/            # Seções de formulário complexas ligadas a regras de negócio
│   │   └── ui/               # Componentes visuais genéricos (Design System)
│   ├── constants/
│   │   └── theme.ts          # Tokens de design (Cores, Espaçamentos, Bordas)
│   ├── hooks/
│   │   └── useAsoForm.ts     # Lógica de negócio e orquestração do formulário
│   ├── navigation/
│   │   └── AppNavigator.tsx  # Configuração de rotas de navegação
│   ├── screens/
│   │   ├── ProfileScreen.tsx # Visualização do Perfil
│   │   ├── ProfessionalInfoScreen.tsx # Visualização de Informações Profissionais
│   │   ├── DataAndSkillsScreen.tsx # Visualização (Tela Principal)
│   │   └── SplashScreen.tsx  # Tela de splash animada e customizada
│   ├── services/
│   │   ├── asoService.ts     # Camada de comunicação com a API (Mock)
│   │   └── loggerService.ts  # Facade centralizado para registro de erros
│   ├── types/
│   │   └── aso.ts            # Tipagens globais derivadas do Zod
│   ├── utils/
│   │   ├── dateFormatter.ts  # Lógica reutilizável para datas
│   │   └── fileHandler.ts    # Lógica reutilizável para o sistema de arquivos
│   └── validations/
│   │   └── asoSchema.ts      # Regras de validação do formulário (Zod)
├── __tests__/                # Suítes de testes automatizados
├── App.tsx                   # Ponto de entrada da aplicação
└── package.json
```

## 🧪 Testes

O projeto inclui testes automatizados para garantir que todas as regras de negócio (como tempo de fechamento de tooltips, duplicação de arquivos e renderização condicional de formulários) funcionem conforme o esperado. Para rodar a suíte de testes:

```bash
npm run test
```

## 🚀 Como Rodar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Recomendamos o uso da versão LTS mais recente.

### 1. Instalar dependências
Na raiz do repositório, instale as dependências:
```bash
npm install
```

### 2. Iniciar o servidor (Metro Bundler)
Para rodar a aplicação localmente em ambiente de desenvolvimento:
```bash
npm run start
```
*Alternativa: `npx expo start -c` (para limpar o cache, se necessário)*

### 3. Rodando no dispositivo ou emulador
Após iniciar o servidor, um QR Code será exibido no seu terminal.
- **Dispositivo Físico:** Baixe o aplicativo **Expo Go** (disponível para iOS e Android), escaneie o QR Code e o aplicativo será carregado.
- **Emulador (Android Studio ou Xcode):** Pressione a tecla `a` (para Android) ou `i` (para iOS) no terminal onde o Metro Bundler está rodando.

---
*Desenvolvido com foco em qualidade e escalabilidade.*
