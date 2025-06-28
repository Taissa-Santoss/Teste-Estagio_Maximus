import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const validUser = "usuario";
  const validPassword = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === validUser && password === validPassword) {
      setError("");
      setTimeout(() => {
        onLogin();
      }, 500);
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background} />
      <div style={styles.box}>
        <div style={styles.logoContainer}>
          <img
            src="/logo.png"
            alt="Dia a Dia Supermercado"
            style={styles.logo}
          />
        </div>
        <h2 style={styles.welcomeTitle}>
          Bem vindo!
          <br />
          Faça seu <span style={styles.loginHighlight}>LOGIN</span>
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Usuário
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={styles.input}
              placeholder="Digite seu usuário"
              required
            />
          </label>
          <label style={styles.label}>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Digite sua senha"
              required
            />
          </label>
          <div style={styles.optionsContainer}>
            <label style={styles.rememberMeLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              Lembre-me
            </label>
            <a href="#" style={styles.forgotPasswordLink}>
              Esqueceu sua senha
            </a>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/Fundo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
  },
  box: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "200px",
    height: "auto",
  },

  welcomeTitle: {
    marginBottom: "30px",
    color: "#333",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "1.4",
  },
  loginHighlight: {
    color: "#0078F0",
    fontWeight: "800",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "600",
    fontSize: "14px",
    color: "#555",
    textAlign: "left",
  },
  input: {
    marginTop: "8px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    "&:focus": {
      borderColor: "#2D89EF",
      boxShadow: "0 0 0 3px rgba(45, 137, 239, 0.2)",
    },
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    marginTop: "-10px",
  },
  rememberMeLabel: {
    display: "flex",
    alignItems: "center",
    color: "#555",
    fontWeight: "400",
  },
  checkbox: {
    marginRight: "8px",
  },
  forgotPasswordLink: {
    color: "#2D89EF",
    textDecoration: "none",
    fontWeight: "600",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  error: {
    color: "#D93025",
    fontWeight: "600",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px",
  },
  button: {
    padding: "14px 0",
    borderRadius: "8px",
    backgroundColor: "#0078F0",
    color: "#fff",
    fontWeight: "700",
    fontSize: "17px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#246EBE",
    },
    "&:active": {
      backgroundColor: "#1C579A",
    },
  },
};
