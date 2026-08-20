function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>

      <p>{mensagem}</p>
    </div>
  );
}

export default Loading;