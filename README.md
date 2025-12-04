# <img src="assets/logo_horizontal.png" alt="Logo do SmartCollect" width="600">

Projeto Integrador desenvolvido para implementar um **Ponto de Entrega Voluntária Inteligente (PEV)**.  
O sistema utiliza sensores ultrassônicos e um ESP32 para medir a porcentagem de preenchimento de coletores, exibindo os dados em um display OLED e enviando-os em tempo real para o **Firebase Realtime Database**.  

A solução tem como objetivo **apoiar ONGs** no gerenciamento de pontos de coleta, ao mesmo tempo em que engaja doadores, permitindo que verifiquem se os pontos estão ativos e recebendo doações.

---

## 🎯 Objetivos

O **SmartCollect IoT** busca tornar os Pontos de Entrega Voluntária mais **eficientes e transparentes**, permitindo:

- 📊 Monitoramento em tempo real da **ocupação dos coletores**  
- 🌍 Integração com uma **Plataforma Web** para gestão dos pontos pelas ONGs  
- 🙌 Engajamento dos doadores, que podem visualizar pontos ativos e em funcionamento  

---

## 👨‍👩‍👧‍👦 Público-Alvo
- ONGs → Gerenciar pontos de coleta com mais eficiência
- Doadores → Acompanhar a atividade dos pontos em tempo real
- Comunidade → Incentivo à cultura de doação e reaproveitamento

---

## 🔧 Componentes Eletrônicos

- **ESP32** – Microcontrolador principal (Wi-Fi integrado)  
- **Display OLED 128X64** – Exibição local das informações  
- **Sensor Ultrassônico HC-SR04** – Medição de distância (interno)  
- **Sensor Ultrassônico AJ-SR04M** – Medição de distância (externo)  
- **Fonte chaveada 5V 3A** – Alimentação estável do sistema  

---

## 🖥️ Tecnologias Utilizadas 

<div align="center">
  <img src="https://skillicons.dev/icons?i=cpp,firebase,arduino,git,github"/>

| **Camada**           | **Tecnologias**                                     |
|----------------------|-----------------------------------------------------|
| **Lógica**           | C++ Linguagem de programação do ESP32               |
| **Banco de Dados**   | Firebase Realtime (armazenamento em tempo real)     |
| **IoT**              | Sensores ultrassônicos · Microcontrolador ESP32     |
| **Versionamento**    | Git · GitHub                                        |

</div>  

---

## 🧊 Case 3D

👉 [Acessar Tinkercad da Case 3D](https://www.tinkercad.com/things/6KT6wEdCp2w-smartcollect-20)

> Case 3D com Posicionamento dos Componentes

<div align="center">
  <img src="circuit/case/SmartCollect 2.0.png" alt="Case 3D do SmartCollect" width="1000">
</div>

<br>
<hr>
<br>

> Case 3D Vazia

<div align="center">
  <img src="circuit/case/SmartCollect 2.0 - Vazio.png" alt="Case 3D do SmartCollect Vazio" width="1000">
</div>

---

## 📐 Esquemático dos Componentes

> Esquemático dos componentes eletrônicos feito no Fritzing:

<div align="center">
  <img src="circuit/smart-collect-iot-esquematico.png" alt="Esquemático dos Componentes do SmartCollect" width="1000">
</div>

---

## 🌐 Frontend (UI)

A branch do frontend que hospeda a UI está disponível no seguinte link:  

👉 [Acessar Branch do Frontend](https://github.com/vek03/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/main)

---

## 🚀 Funcionalidades

- Leitura da distância por sensores ultrassônicos  
- Cálculo da **porcentagem de preenchimento** dos coletores  
- Exibição em tempo real no **Display OLED**  
- Envio dos dados para o **Firebase Realtime Database**  
- Preparado para integração com o **painel web das ONGs**  
- Configuração do Wifi via **Hotspot do dispositivo**

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
├── assets/                   # Contém todas as logos e ícones do SmartCollect
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
   git clone https://github.com/vek03/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs.git
```

2. Troque para a branch do IoT:

```bash
   git checkout -b iot origin/iot
```

3. Abra o projeto na Arduino IDE ou PlatformIO.
4. Duplique o arquivo `smart-collect-iot-code/Config.example.h` e renomeie a cópia para `Config.h`
5. Configure suas credenciais do Firebase e do Wi-Fi no arquivo de configuração `Config.h`.
6. Compile e faça o upload para o ESP32.
7. Conecte os sensores e o display conforme o esquema elétrico.

---

## 📌 Status do Projeto
> 🚀 Release [v1.0-iot-beta](https://github.com/vek03/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/v1.0-iot-beta) - Primeira versão estável do IoT

> 🚀 Release [v2.0-iot-beta](https://github.com/vek03/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/v2.0-iot-beta) - Segunda versão estável do IoT

> 🚀 Release [v2.0-iot-alpha](https://github.com/vek03/smart-collect-gestao-de-pontos-de-entrega-voluntaria-para-ongs/tree/v2.0-iot-alpha) - Primeira versão Alpha do IoT

---

## 📜 Licença
> Este projeto é distribuído sob a licença GPL-3.0. Consulte o arquivo [LICENCE](LICENSE.txt)
 para mais detalhes.

---

## 👥 Colaboradores

<div align="center">
<table>
  <tr>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/c5cf0acd-8137-43b2-a02c-5d395ddd17fe" width="100px" style="border-radius:50%;" alt="Gabriel Mendes"/><br/>
      <b>Gabriel Mendes</b><br/>
      <a href="https://www.linkedin.com/in/gabrieldasilvamendes/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/gabrielMendes21">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/a3fefd4c-f6eb-4a3f-8c0c-e26e2524886e" width="100px" style="border-radius:50%;" alt="Juan Farias da Rocha"/><br/>
      <b>Juan Farias da Rocha</b><br/>
      <a href="https://www.linkedin.com/in/juan-farias-da-rocha">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/juan9321">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
    <td align="center" width="200">
      <img src="https://github.com/user-attachments/assets/02531667-4b8a-40be-a1ec-fe5af32bf976" width="100px" style="border-radius:50%;" alt="Victor Cardoso"/><br/>
      <b>Victor Cardoso</b><br/>
      <a href="https://www.linkedin.com/in/victorncardoso/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20"/>
      </a>
      <a href="https://github.com/vek03">
        <img alt="image" src="https://github.com/user-attachments/assets/4612c60a-9113-4dba-9329-9d2cb7cf514f" width="20"/>
      </a>
    </td>
  </tr>
</table>
</div>

<br>

<p align="center">  
  <sub>© 2025 Smart Collect — Todos os direitos reservados</sub>  
</p>





















