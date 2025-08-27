import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { generateToken, saveToken } from '../../utils/auth';
import styles from './Cadastro.module.css';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validações básicas
    if (!email || !password || !confirmPassword || !cep || !rua || !numero || !bairro || !cidade || !estado || !telefone) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      setError('A senha precisa ter no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      setError('CEP inválido. Formato esperado: 00000-000');
      return;
    }

    if (!/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(telefone)) {
      setError('Telefone inválido. Ex: (11) 91234-5678');
      return;
    }

    const token = await generateToken({ email });
    saveToken(token);

    setError('');
    navigate('/collection-points');
  };

  return (
    <div className={styles['login-container']}>
      <h2>Crie uma conta</h2>
      <form onSubmit={handleRegister}>
        <div className={`${styles['input-group']} ${styles['full-width']}`}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(11) 91234-5678"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="00000-000"
          />
        </div>

        <div className={`${styles['input-group']} ${styles['span-2']}`}>
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            placeholder="Rua Exemplo"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="123"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Centro"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="São Paulo"
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="SP"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles['login-button']}>Registrar</button>

        <span>Já tem uma conta? Faça <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}
