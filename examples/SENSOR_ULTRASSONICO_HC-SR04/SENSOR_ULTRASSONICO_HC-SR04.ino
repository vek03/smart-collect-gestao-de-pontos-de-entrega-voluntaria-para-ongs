const int PINO_TRIG = 18; // Pino D4 conectado ao TRIG do HC-SR04
const int PINO_ECHO = 5; // Pino D2 conectado ao ECHO do HC-SR04

void setup() {
  Serial.begin(115200); // Inicializa a comunicação serial
  pinMode(PINO_TRIG, OUTPUT); // Configura o pino TRIG como saída
  pinMode(PINO_ECHO, INPUT); // Configura o pino ECHO como entrada
}

void loop() {
  digitalWrite(PINO_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PINO_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PINO_TRIG, LOW);
  
  long duracao = pulseIn(PINO_ECHO, HIGH); // Mede o tempo de resposta do ECHO  
  float distancia = (duracao * 0.0343) / 2;// Calcula a distância usando a velocidade do som (aproximadamente 343 m/s)
  Serial.print("Distância: ");
  Serial.print(distancia);
  Serial.println(" cm");
  
  delay(1000); // Aguarda 1 segundo antes de fazer a próxima leitura
}
//long -> A variável "long" é utilizada para armazenar números inteiros longos, ou seja, números inteiros maiores do que os que podem ser armazenados em uma variável "int"
//delayMicroseconds -> A função delayMicroseconds() lida com microssegundos (10 elevado a -6 segundos), enquanto a função delay() lida com milissegundos (10 elevado a -3 segundos).