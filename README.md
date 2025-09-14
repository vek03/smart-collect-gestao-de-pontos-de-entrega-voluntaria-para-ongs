# 📦 SmartCollect IoT

Projeto Integrador desenvolvido para implementar um **Ponto de Entrega Voluntária Inteligente (PEV)**.  
O sistema utiliza sensores ultrassônicos e um ESP32 para medir a porcentagem de preenchimento de coletores, exibindo os dados em um display OLED e enviando-os em tempo real para o **Firebase Realtime Database**.  

A solução tem como objetivo **apoiar ONGs** no gerenciamento de pontos de coleta, ao mesmo tempo em que engaja doadores, permitindo que verifiquem se os pontos estão ativos e recebendo doações.

---

## 🔧 Peças Utilizadas

- **ESP32** – Microcontrolador principal (Wi-Fi integrado)  
- **Display LCD 16X2** – Exibição local das informações  
- **Sensor Ultrassônico HC-SR04** – Medição de distância (interno)  
- **Sensor Ultrassônico AJ-SR04M** – Medição de distância (externo)  
- **Fonte chaveada 5V 3A** – Alimentação estável do sistema  

---

## 🖥️ Tecnologias

- **C++** – Desenvolvimento do firmware no ESP32  
- **Firebase Realtime Database** – Armazenamento e sincronização dos dados na nuvem  

---

## 🎯 Objetivo

O **SmartCollect IoT** busca tornar os Pontos de Entrega Voluntária mais **eficientes e transparentes**, permitindo:

- 📊 Monitoramento em tempo real da **ocupação dos coletores**  
- 🌍 Integração com uma **Plataforma Web** para gestão dos pontos pelas ONGs  
- 🙌 Engajamento dos doadores, que podem visualizar pontos ativos e em funcionamento  

---

## 🌐 Frontend (UI)

A branch do frontend que hospeda a UI está disponível no seguinte link:  

👉 [Acessar Branch do Frontend](https://github.com/fatec-zona-leste/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/main)

---

## 🚀 Funcionalidades

- Leitura da distância por sensores ultrassônicos  
- Cálculo da **porcentagem de preenchimento** dos coletores  
- Exibição em tempo real no **Display OLED**  
- Envio dos dados para o **Firebase Realtime Database**  
- Preparado para integração com o **painel web das ONGs**  

---

## 🛠️ Requisitos

- C++
- Arduino IDE ou PlatformIO  
- Bibliotecas listadas em [libraries/libraries.txt](libraries/libraries.txt)
- Todos os componentes eletrônicos

---

## 📂 Estrutura do Repositório

```bash
SmartCollect-IoT/
│
├── circuit/                  # Contém arquivos Fritzing e diagramas de todos os componentes eletrônicos
├── examples/                 # Arquivos de teste para cada Função do projeto
├── libraries/                # Bibliotecas externas utilizadas
├── docs/                     # Documentação complementar
├── smart-collect-iot-code/   # Código fonte da aplicação em C++
├── .gitignore            # Arquivo de configuração do Git para ignorar arquivos de environments
├── LICENSE.txt               # Licença atribuída ao repositório
├── platformio.txt            # Arquivo de docuymentação das configurações utilizadas para rodar o projeto
└── README.md                 # Arquivo de explicação do projeto
```

---

## 🛠️ Como Usar

1. Clone este repositório:
   
```bash
   git clone https://github.com/fatec-zona-leste/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs.git
```

2. Abra o projeto na Arduino IDE ou PlatformIO.
3. Configure suas credenciais do Firebase e do Wi-Fi no arquivo de configuração.
4. Compile e faça o upload para o ESP32.
5. Conecte os sensores e o display conforme o esquema elétrico.

---

## 👨‍👩‍👧‍👦 Público-Alvo
- ONGs → Gerenciar pontos de coleta com mais eficiência
- Doadores → Acompanhar a atividade dos pontos em tempo real
- Comunidade → Incentivo à cultura de doação e reaproveitamento

---

## 📌 Status do Projeto
> 🚧 Em desenvolvimento – Versão inicial do firmware do IoT

---

## 📜 Licença
> Este projeto é distribuído sob a licença GPL-3.0. Consulte o arquivo [LICENCE](LICENSE.txt)
 para mais detalhes.




