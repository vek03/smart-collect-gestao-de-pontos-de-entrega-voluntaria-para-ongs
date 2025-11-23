import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../utils/auth.js'; 
import styles from './Cadastro.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { OngContext } from '../../context/OngContext.jsx';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [missao, setMissao] = useState('');

  const { setOng } = useContext(OngContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome || !email || !password || !confirmPassword || !telefone || !cnpj) {
      setError('Preencha todos os campos obrigatórios.');
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

    try {
      const userCredential = await register(email, password);

      const ongData = {
        email,
        owner: userCredential.user.uid,
        name: nome,
        phone: telefone,
        address: endereco,
        website,
        facebook,
        instagram,
        cnpj,
        mission: missao
      };

      await addDoc(collection(db, 'ongs'), ongData);
      setOng(ongData);

      setError('');
      navigate('/collection-points');
    } catch (err) {
      console.error('Erro no cadastro completo:', err);
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Este e-mail já está em uso.');
            break;
          case 'auth/invalid-email':
            setError('E-mail inválido.');
            break;
          case 'auth/weak-password':
            setError('Senha fraca.');
            break;
          default:
            setError(`Erro Firebase: ${err.message}`);
        }
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.loginContainer}>
        <h2>Crie sua conta</h2>

        <form onSubmit={handleRegister}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Nome da ONG *</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome da ONG"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone *</label>
              <input 
                type="text" 
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Digite o telefone"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Endereço</label>
              <input 
                type="text" 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Digite o endereço"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Website</label>
              <input 
                type="text" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Digite o site oficial"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Facebook</label>
              <input 
                type="text" 
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="@facebook"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Instagram</label>
              <input 
                type="text" 
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@instagram"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>CNPJ *</label>
              <input 
                type="text" 
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="Digite o CNPJ"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Senha *</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirme a senha *</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
              />
            </div>
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.inputGroup}>
              <label>Missão</label>
              <textarea 
                value={missao}
                onChange={(e) => setMissao(e.target.value)}
                placeholder="Descreva a missão da ONG"
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginButton}>Registrar</button>

          <span>Já tem conta? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </div>
  );
}
