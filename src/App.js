import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "http://github.com/...",
      techs: ["ReactJS"],
    };

    const repository = await api.post("repositories", data);

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    await api.delete(`repositories/${id}`);

    const data = repositories;

    data.splice(repositoryIndex, 1);

    setRepositories([...data]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
