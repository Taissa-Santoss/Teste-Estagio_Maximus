import React, { useState, useEffect } from "react";

// --- Funções Auxiliares de Data ---
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) {
    return dateString;
  }
  return date.toLocaleDateString("pt-BR");
};

const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1 + "T00:00:00");
  const d2 = new Date(date2 + "T00:00:00");
  const diffTime = d2.getTime() - d1.getTime();
  return Math.ceil(diffTime / ((1000 * 60 * 60) / 24));
};

// --- Dados Iniciais do "Banco de Dados" em Memória ---
const createInitialData = () => {
  const today = "2025-06-28";

  const clientes = [
    {
      codigo: "C001",
      nome: "Ana Silva",
      dataNascimento: "15/03/1988",
      cpf: "123.456.789-01",
      telefone: "(11)98765-4321",
      endereco: "Rua das Flores, 100 - Centro",
    },
    {
      codigo: "C002",
      nome: "Bruno Costa",
      dataNascimento: "22/07/1992",
      cpf: "234.567.890-12",
      telefone: "(21)99876-5432",
      endereco: "Av. Principal, 50 - Boa Vista",
    },
    {
      codigo: "C003",
      nome: "Carla Pereira",
      dataNascimento: "01/11/1975",
      cpf: "345.678.901-23",
      telefone: "(31)97654-3210",
      endereco: "Travessa da Paz, 20 - Liberdade",
    },
    {
      codigo: "C004",
      nome: "Daniel Rocha",
      dataNascimento: "10/04/1995",
      cpf: "456.789.012-34",
      telefone: "(41)96543-2109",
      endereco: "Estrada Velha, 300 - Morada do Sol",
    },
    {
      codigo: "C005",
      nome: "Eduarda Santos",
      dataNascimento: "29/09/1980",
      cpf: "567.890.123-45",
      telefone: "(51)95432-1098",
      endereco: "Praça Central, 15 - Vila Nova",
    },
    {
      codigo: "C006",
      nome: "Felipe Almeida",
      dataNascimento: "03/02/1990",
      cpf: "678.901.234-56",
      telefone: "(61)94321-0987",
      endereco: "Alameda dos Anjos, 75 - Jardim América",
    },
    {
      codigo: "C007",
      nome: "Gabriela Lima",
      dataNascimento: "18/06/1983",
      cpf: "789.012.345-67",
      telefone: "(71)93210-9876",
      endereco: "Rua do Comércio, 25 - Centro",
    },
    {
      codigo: "C008",
      nome: "Henrique Mendes",
      dataNascimento: "07/12/1970",
      cpf: "890.123.456-78",
      telefone: "(81)92109-8765",
      endereco: "Av. Atlântica, 1200 - Boa Viagem",
    },
    {
      codigo: "C009",
      nome: "Isabela Nunes",
      dataNascimento: "25/01/1998",
      cpf: "901.234.567-89",
      telefone: "(91)91098-7654",
      endereco: "Rua da Praia, 40 - Orla",
    },
    {
      codigo: "C010",
      nome: "João Pedro",
      dataNascimento: "11/08/1985",
      cpf: "012.345.678-90",
      telefone: "(19)90987-6543",
      endereco: "Rua dos Coqueiros, 30 - Bairro Novo",
    },
  ];

  const produtos = [
    {
      codigo: "P001",
      nome: "Detergente",
      precoUnitario: 4.99,
      estoque: 80,
      departamento: "LIMPEZA",
      expirationDate: "2026-06-28",
    },
    {
      codigo: "P002",
      nome: "Sabão em Pó",
      precoUnitario: 25.0,
      estoque: 60,
      departamento: "LIMPEZA",
      expirationDate: "2026-08-15",
    },
    {
      codigo: "P003",
      nome: "Batata Frita",
      precoUnitario: 14.9,
      estoque: 35,
      departamento: "CONGELADOS",
      expirationDate: "2025-07-01",
    },
    {
      codigo: "P004",
      nome: "Arroz",
      precoUnitario: 21.9,
      estoque: 50,
      departamento: "ALIMENTOS",
      expirationDate: "2027-01-10",
    },
    {
      codigo: "P005",
      nome: "Feijão",
      precoUnitario: 7.99,
      estoque: 55,
      departamento: "ALIMENTOS",
      expirationDate: "2026-03-20",
    },
    {
      codigo: "P006",
      nome: "Macarrão",
      precoUnitario: 4.25,
      estoque: 70,
      departamento: "ALIMENTOS",
      expirationDate: "2026-04-01",
    },
    {
      codigo: "P007",
      nome: "Bolacha Recheada Chocolate",
      precoUnitario: 3.89,
      estoque: 120,
      departamento: "ALIMENTOS",
      expirationDate: "2025-07-10",
    },
    {
      codigo: "P008",
      nome: "Alface",
      precoUnitario: 2.5,
      estoque: 40,
      departamento: "HORTIFRUTI",
      expirationDate: "2025-06-30",
    },
    {
      codigo: "P009",
      nome: "Rúcula",
      precoUnitario: 2.8,
      estoque: 35,
      departamento: "HORTIFRUTI",
      expirationDate: "2025-07-02",
    },
    {
      codigo: "P010",
      nome: "Pão Francês",
      precoUnitario: 0.75,
      estoque: 200,
      departamento: "PADARIA",
      expirationDate: "2025-06-29",
    },
    {
      codigo: "P011",
      nome: "Pão de Queijo",
      precoUnitario: 1.5,
      estoque: 180,
      departamento: "PADARIA",
      expirationDate: "2025-11-01",
    },
    {
      codigo: "P012",
      nome: "Leite Integra",
      precoUnitario: 5.5,
      estoque: 90,
      departamento: "LATICÍNIOS",
      expirationDate: "2025-07-05",
    },
    {
      codigo: "P013",
      nome: "Café",
      precoUnitario: 18.0,
      estoque: 45,
      departamento: "ALIMENTOS",
      expirationDate: "2026-10-01",
    },
    {
      codigo: "P014",
      nome: "Suco de Laranja Natural",
      precoUnitario: 8.9,
      estoque: 25,
      departamento: "BEBIDAS",
      expirationDate: "2025-07-03",
    },
  ];

  const pedidos = [
    {
      codigo: "PE001",
      idCliente: "C002",
      produtos: ["P003", "P006"],
      dataPedido: "2025-06-25",
      status: "PAGO",
    },
    {
      codigo: "PE002",
      idCliente: "C003",
      produtos: ["P002", "P001"],
      dataPedido: "2025-06-24",
      status: "CANCELADO",
    },
    {
      codigo: "PE003",
      idCliente: "C008",
      produtos: ["P003"],
      dataPedido: "2025-06-23",
      status: "PAGO",
    },
    {
      codigo: "PE004",
      idCliente: "C003",
      produtos: ["P004", "P005"],
      dataPedido: "2025-06-22",
      status: "PENDENTE",
    },
    {
      codigo: "PE005",
      idCliente: "C004",
      produtos: ["P005"],
      dataPedido: "2025-06-21",
      status: "PAGO",
    },
    {
      codigo: "PE006",
      idCliente: "C001",
      produtos: ["P006"],
      dataPedido: "2025-06-20",
      status: "PAGO",
    },
    {
      codigo: "PE007",
      idCliente: "C007",
      produtos: ["P008"],
      dataPedido: "2025-06-19",
      status: "CANCELADO",
    },
    {
      codigo: "PE008",
      idCliente: "C005",
      produtos: ["P009"],
      dataPedido: "2025-06-18",
      status: "PAGO",
    },
    {
      codigo: "PE009",
      idCliente: "C002",
      produtos: ["P010"],
      dataPedido: "2025-06-17",
      status: "PAGO",
    },
    {
      codigo: "PE010",
      idCliente: "C009",
      produtos: ["P011"],
      dataPedido: "2025-06-16",
      status: "PAGO",
    },
    {
      codigo: "PE011",
      idCliente: "C001",
      produtos: ["P012", "P013"],
      dataPedido: "2025-06-15",
      status: "PAGO",
    },
    {
      codigo: "PE012",
      idCliente: "C006",
      produtos: ["P014"],
      dataPedido: "2025-06-14",
      status: "PENDENTE",
    },
  ];

  const pedidosComValorTotal = pedidos.map((pedido) => {
    let valorTotal = 0;
    pedido.produtos.forEach((prodId) => {
      const produto = produtos.find((p) => p.codigo === prodId);
      if (produto) {
        valorTotal += produto.precoUnitario;
      }
    });
    return { ...pedido, valorTotal: parseFloat(valorTotal.toFixed(2)) };
  });

  const totalClientesCadastrados = clientes.length;
  const numeroProdutosEmEstoque = produtos.reduce(
    (sum, prod) => sum + prod.estoque,
    0
  );
  const totalPedidosRealizados = pedidos.length;
  const valorTotalVendas = pedidosComValorTotal.reduce(
    (sum, ped) => sum + (ped.status === "PAGO" ? ped.valorTotal : 0),
    0
  );

  return {
    kpis: {
      totalClientesCadastrados,
      numeroProdutosEmEstoque,
      totalPedidosRealizados,
      valorTotalVendas,
    },
    alerts: [],
    clientes,
    produtos,
    pedidos: pedidosComValorTotal,
  };
};

export default function Dashboard({ onLogout }) {
  // --- Estados do Componente ---
  const [data, setData] = useState(createInitialData());
  const [activeMenu, setActiveMenu] = useState("Inicio");

  const [selectedItem, setSelectedItem] = useState({
    table: null,
    codigo: null,
    item: null,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [formTable, setFormTable] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // --- Efeito para Gerar Alertas de Vencimento ---
  useEffect(() => {
    const today = new Date("2025-06-28");
    const expirationThresholdDays = 7;

    const newAlerts = [];

    data.produtos.forEach((produto) => {
      if (produto.expirationDate) {
        const expirationDateObj = new Date(
          produto.expirationDate + "T00:00:00"
        );
        const daysUntilExpiration = getDaysDifference(
          today.toISOString().split("T")[0],
          produto.expirationDate
        );

        if (
          daysUntilExpiration <= expirationThresholdDays &&
          daysUntilExpiration >= 0
        ) {
          newAlerts.push({
            type: "danger",
            message: `Produto próximo ao vencimento: Lote de ${produto.nome} vence em ${daysUntilExpiration} dia(s).`,
            action: "Gerenciar Validade",
          });
        }
      }
    });
    setData((prevData) => ({ ...prevData, alerts: newAlerts }));
  }, [data.produtos]);

  // --- Funções Auxiliares de Dados ---
  const getClientNameById = (clientId) => {
    const client = data.clientes.find((c) => c.codigo === clientId);
    return client ? client.nome : "Cliente Desconhecido";
  };

  const getProductNamesByIds = (productIds) => {
    return productIds
      .map((prodId) => {
        const product = data.produtos.find((p) => p.codigo === prodId);
        return product ? product.nome : "Produto Desconhecido";
      })
      .join(" e ");
  };

  // --- Funções de Manipulação de Dados (CRUD) ---
  const handleSelectRow = (table, codigo) => {
    if (selectedItem.table === table && selectedItem.codigo === codigo) {
      setSelectedItem({ table: null, codigo: null, item: null });
    } else {
      const item = data[table].find((item) => item.codigo === codigo);
      setSelectedItem({ table, codigo, item });
    }
  };

  const handleRemoveClick = () => {
    if (!selectedItem.codigo) {
      alert("Por favor, selecione um registro para remover.");
      return;
    }
    if (
      !window.confirm(
        `Tem certeza que deseja remover o registro ${selectedItem.codigo} da tabela ${selectedItem.table}?`
      )
    ) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      [selectedItem.table]: prevData[selectedItem.table].filter(
        (item) => item.codigo !== selectedItem.codigo
      ),
    }));
    setSelectedItem({ table: null, codigo: null, item: null });
    alert("Registro removido com sucesso!");
  };

  const handleEditClick = () => {
    if (!selectedItem.codigo) {
      alert("Por favor, selecione um registro para editar.");
      return;
    }
    setFormMode("edit");
    setFormTable(selectedItem.table);
    setFormData({ ...selectedItem.item });
    setIsFormOpen(true);
  };

  const handleAddNewClick = (table) => {
    setFormMode("add");
    setFormTable(table);
    if (table === "clientes") {
      setFormData({
        codigo: "",
        nome: "",
        dataNascimento: "",
        cpf: "",
        telefone: "",
        endereco: "",
      });
    } else if (table === "produtos") {
      setFormData({
        codigo: "",
        nome: "",
        precoUnitario: 0,
        estoque: 0,
        departamento: "",
        expirationDate: "",
      });
    } else if (table === "pedidos") {
      setFormData({
        codigo: "",
        idCliente: "",
        produtos: [],
        dataPedido: "",
        valorTotal: 0,
        status: "PENDENTE",
      });
    }
    setIsFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formTable === "pedidos" && typeof formData.produtos === "string") {
      setFormData((prev) => ({
        ...prev,
        produtos: prev.produtos
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p !== ""),
      }));
    }

    if (formMode === "add") {
      const newCodigo = (() => {
        const currentItems = data[formTable];
        const lastItem = currentItems[currentItems.length - 1];
        let lastNum = 0;
        if (lastItem) {
          const match = lastItem.codigo.match(/\d+$/);
          if (match) lastNum = parseInt(match[0]);
        }

        if (formTable === "clientes") {
          return `C${String(lastNum + 1).padStart(3, "0")}`;
        } else if (formTable === "produtos") {
          return `P${String(lastNum + 1).padStart(3, "0")}`;
        } else if (formTable === "pedidos") {
          return `PE${String(lastNum + 1).padStart(3, "0")}`;
        }
        return `NEW${Date.now()}`;
      })();

      setData((prevData) => ({
        ...prevData,
        [formTable]: [
          ...prevData[formTable],
          { ...formData, codigo: newCodigo },
        ],
      }));
      alert("Registro adicionado com sucesso!");
    } else if (formMode === "edit") {
      setData((prevData) => ({
        ...prevData,
        [formTable]: prevData[formTable].map((item) =>
          item.codigo === formData.codigo ? { ...formData } : item
        ),
      }));
      alert("Registro editado com sucesso!");
    }
    handleCancelForm();
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setFormMode(null);
    setFormData({});
    setFormTable(null);
    setSelectedItem({ table: null, codigo: null, item: null });
  };

  // --- Funções de Exportação (Placeholders) ---
  const exportToPdf = (tableData, tableName) => {
    alert(
      `Funcionalidade de exportar ${tableName} para PDF será implementada aqui!`
    );
  };

  const exportToExcel = (tableData, tableName) => {
    alert(
      `Funcionalidade de exportar ${tableName} para Excel será implementada aqui!`
    );
  };

  // --- Lógica de Ordenação de Tabela ---
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // --- Função para Obter Dados da Tabela Ordenados ---
  const getSortedTableData = (tableName) => {
    let currentItems = [];
    if (tableName === "Cliente") {
      currentItems = [...data.clientes];
    } else if (tableName === "Produto") {
      currentItems = [...data.produtos];
    } else if (tableName === "Pedidos") {
      currentItems = [...data.pedidos];
    }

    if (sortConfig.key !== null) {
      currentItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          if (
            sortConfig.key.includes("data") ||
            sortConfig.key.includes("expirationDate")
          ) {
            const dateA = new Date(aValue + "T00:00:00");
            const dateB = new Date(bValue + "T00:00:00");
            if (dateA < dateB)
              return sortConfig.direction === "ascending" ? -1 : 1;
            if (dateA > dateB)
              return sortConfig.direction === "ascending" ? 1 : -1;
          } else {
            if (aValue.localeCompare(bValue) < 0)
              return sortConfig.direction === "ascending" ? -1 : 1;
            if (aValue.localeCompare(bValue) > 0)
              return sortConfig.direction === "ascending" ? 1 : -1;
          }
        } else {
          if (aValue < bValue)
            return sortConfig.direction === "ascending" ? -1 : 1;
          if (aValue > bValue)
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return currentItems;
  };

  // --- Renderização do Formulário Dinâmico ---
  const renderForm = () => {
    if (!isFormOpen) return null;

    const formFields = [];
    let title = "";

    if (formTable === "clientes") {
      title = formMode === "add" ? "Novo Cliente" : "Editar Cliente";
      formFields.push(
        {
          label: "Código",
          name: "codigo",
          type: "text",
          disabled: formMode === "edit",
        },
        { label: "Nome", name: "nome", type: "text" },
        { label: "Data Nascimento", name: "dataNascimento", type: "text" },
        { label: "CPF", name: "cpf", type: "text" },
        { label: "Telefone", name: "telefone", type: "text" },
        { label: "Endereço", name: "endereco", type: "text" }
      );
    } else if (formTable === "produtos") {
      title = formMode === "add" ? "Novo Produto" : "Editar Produto";
      formFields.push(
        {
          label: "Código",
          name: "codigo",
          type: "text",
          disabled: formMode === "edit",
        },
        { label: "Nome", name: "nome", type: "text" },
        { label: "Preço Unitário", name: "precoUnitario", type: "number" },
        { label: "Estoque", name: "estoque", type: "number" },
        { label: "Departamento", name: "departamento", type: "text" },
        { label: "Data de Vencimento", name: "expirationDate", type: "date" }
      );
    } else if (formTable === "pedidos") {
      title = formMode === "add" ? "Novo Pedido" : "Editar Pedido";
      formFields.push(
        {
          label: "Código",
          name: "codigo",
          type: "text",
          disabled: formMode === "edit",
        },
        { label: "ID Cliente", name: "idCliente", type: "text" },
        {
          label: "Produtos (IDs separados por vírgula)",
          name: "produtos",
          type: "text",
          value: Array.isArray(formData.produtos)
            ? formData.produtos.join(",")
            : formData.produtos,
        },
        { label: "Data do Pedido", name: "dataPedido", type: "date" },
        { label: "Valor Total", name: "valorTotal", type: "number" },
        {
          label: "Status",
          name: "status",
          type: "select",
          options: ["PAGO", "PENDENTE", "CANCELADO"],
        }
      );
    }

    return (
      <div style={dashboardStyles.formOverlay}>
        <div style={dashboardStyles.formCard}>
          <h3 style={dashboardStyles.formTitle}>{title}</h3>
          <form onSubmit={handleFormSubmit} style={dashboardStyles.formGrid}>
            {formFields.map((field) => (
              <div key={field.name} style={dashboardStyles.formGroup}>
                <label style={dashboardStyles.formLabel}>{field.label}:</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleFormChange}
                    style={dashboardStyles.formInput}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={
                      field.value !== undefined
                        ? field.value
                        : formData[field.name] || ""
                    }
                    onChange={handleFormChange}
                    disabled={field.disabled}
                    style={dashboardStyles.formInput}
                  />
                )}
              </div>
            ))}
            <div style={dashboardStyles.formActions}>
              <button
                type="submit"
                style={{
                  ...dashboardStyles.actionButton,
                  backgroundColor: "#38A169",
                }}
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={handleCancelForm}
                style={{
                  ...dashboardStyles.actionButton,
                  backgroundColor: "#E53E3E",
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- Renderização do Componente Principal (Dashboard) ---
  return (
    <div style={dashboardStyles.container}>
      {/* Sidebar de Navegação */}
      <div style={dashboardStyles.sidebar}>
        <div style={dashboardStyles.sidebarHeader}>
          <img
            src="/logo.png"
            alt="Dia a Dia Logo"
            style={dashboardStyles.sidebarLogo}
          />
        </div>
        <nav style={dashboardStyles.nav}>
          <ul style={dashboardStyles.navList}>
            <li style={dashboardStyles.navItem}>
              <button
                style={
                  activeMenu === "Sobre a conta"
                    ? dashboardStyles.navButtonActive
                    : dashboardStyles.navButton
                }
                onClick={() => setActiveMenu("Sobre a conta")}
              >
                <i className="fas fa-user" style={dashboardStyles.navIcon}></i>{" "}
                Sobre a conta
              </button>
            </li>
            <li style={dashboardStyles.navSectionHeader}>MAIN</li>
            <li style={dashboardStyles.navItem}>
              <button
                style={
                  activeMenu === "Inicio"
                    ? dashboardStyles.navButtonActive
                    : dashboardStyles.navButton
                }
                onClick={() => setActiveMenu("Inicio")}
              >
                <i className="fas fa-home" style={dashboardStyles.navIcon}></i>{" "}
                Início
              </button>
            </li>
            <li style={dashboardStyles.navItem}>
              <button
                style={
                  activeMenu === "Cliente"
                    ? dashboardStyles.navButtonActive
                    : dashboardStyles.navButton
                }
                onClick={() => setActiveMenu("Cliente")}
              >
                <i className="fas fa-users" style={dashboardStyles.navIcon}></i>{" "}
                Cliente
              </button>
            </li>
            <li style={dashboardStyles.navItem}>
              <button
                style={
                  activeMenu === "Produto"
                    ? dashboardStyles.navButtonActive
                    : dashboardStyles.navButton
                }
                onClick={() => setActiveMenu("Produto")}
              >
                <i className="fas fa-box" style={dashboardStyles.navIcon}></i>{" "}
                Produto
              </button>
            </li>
            <li style={dashboardStyles.navItem}>
              <button
                style={
                  activeMenu === "Pedidos"
                    ? dashboardStyles.navButtonActive
                    : dashboardStyles.navButton
                }
                onClick={() => setActiveMenu("Pedidos")}
              >
                <i
                  className="fas fa-clipboard-list"
                  style={dashboardStyles.navIcon}
                ></i>{" "}
                Pedidos
              </button>
            </li>
          </ul>
        </nav>
        <div style={dashboardStyles.sidebarFooter}>
          <button
            style={
              activeMenu === "Ajuda"
                ? dashboardStyles.navButtonActive
                : dashboardStyles.navButton
            }
            onClick={() => setActiveMenu("Ajuda")}
          >
            <i
              className="fas fa-question-circle"
              style={dashboardStyles.navIcon}
            ></i>{" "}
            Ajuda
          </button>
          <button
            style={dashboardStyles.logoutSidebarButton}
            onClick={onLogout}
          >
            <i
              className="fas fa-sign-out-alt"
              style={dashboardStyles.navIconRed}
            ></i>{" "}
            Sair da conta
          </button>
        </div>
      </div>

      {/* Conteúdo Principal do Dashboard */}
      <div style={dashboardStyles.mainContent}>
        {/* Navbar Superior */}
        <div style={dashboardStyles.navbar}>
          <h1 style={dashboardStyles.navbarTitle}>{activeMenu}</h1>
          <div style={dashboardStyles.navbarRight}>
            <button style={dashboardStyles.logoutButton} onClick={onLogout}>
              Sair
            </button>
          </div>
        </div>

        {/* Área de Conteúdo Dinâmico */}
        <div style={dashboardStyles.contentArea}>
          {/* Seção de Início */}
          {activeMenu === "Inicio" && (
            <div style={dashboardStyles.homeContent}>
              <h2 style={dashboardStyles.sectionTitle}>Visão Geral do Dia</h2>

              {/* KPIs / Cards de Resumo */}
              <div style={dashboardStyles.kpiContainer}>
                <div
                  style={{
                    ...dashboardStyles.kpiCard,
                    borderLeftColor: "#E3F5FF",
                  }}
                >
                  <h3>Total de Clientes Cadastrados</h3>
                  <p>{data.kpis.totalClientesCadastrados}</p>
                </div>
                <div
                  style={{
                    ...dashboardStyles.kpiCard,
                    borderLeftColor: "#FFFECE",
                  }}
                >
                  <h3>Número de Produtos em Estoque</h3>
                  <p>{data.kpis.numeroProdutosEmEstoque}</p>
                </div>
                <div
                  style={{
                    ...dashboardStyles.kpiCard,
                    borderLeftColor: "#E3F5FF",
                  }}
                >
                  <h3>Total de Pedidos Realizados</h3>
                  <p>{data.kpis.totalPedidosRealizados}</p>
                </div>
                <div
                  style={{
                    ...dashboardStyles.kpiCard,
                    borderLeftColor: "#FFFECE",
                  }}
                >
                  <h3>Valor Total de Vendas</h3>
                  <p>
                    R$
                    {data.kpis.valorTotalVendas.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>

              {/* Seção de Alertas */}
              <h2 style={dashboardStyles.sectionTitle}>Alertas Importantes</h2>
              <div style={dashboardStyles.alertsContainer}>
                {data.alerts.length > 0 ? (
                  data.alerts.map((alert, index) => (
                    <div
                      key={index}
                      style={{
                        ...dashboardStyles.alertCard,
                        ...(alert.type === "danger" &&
                          dashboardStyles.alertDanger),
                        ...(alert.type === "warning" &&
                          dashboardStyles.alertWarning),
                        ...(alert.type === "success" &&
                          dashboardStyles.alertSuccess),
                        ...(alert.type === "info" && dashboardStyles.alertInfo),
                      }}
                    >
                      {alert.type === "danger" && (
                        <i
                          className="fas fa-exclamation-triangle"
                          style={dashboardStyles.alertIcon}
                        ></i>
                      )}
                      {alert.type === "warning" && (
                        <i
                          className="fas fa-exclamation-circle"
                          style={dashboardStyles.alertIcon}
                        ></i>
                      )}
                      {alert.type === "success" && (
                        <i
                          className="fas fa-check-circle"
                          style={dashboardStyles.alertIcon}
                        ></i>
                      )}
                      {alert.type === "info" && (
                        <i
                          className="fas fa-info-circle"
                          style={dashboardStyles.alertIcon}
                        ></i>
                      )}
                      <span>{alert.message}</span>
                      {alert.action && (
                        <button
                          style={dashboardStyles.alertActionButton}
                          onClick={() => {
                            if (alert.action.includes("Validade"))
                              setActiveMenu("Produto");
                          }}
                        >
                          {alert.action}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      ...dashboardStyles.alertCard,
                      ...dashboardStyles.alertSuccess,
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={dashboardStyles.alertIcon}
                    ></i>
                    <span>Nenhum alerta crítico no momento. Tudo certo!</span>
                  </div>
                )}
              </div>

              {/* Últimos 5 Pedidos Realizados */}
              <h2 style={dashboardStyles.sectionTitle}>
                Últimos 5 Pedidos Realizados:
              </h2>
              <div style={dashboardStyles.tableContainer}>
                <div style={dashboardStyles.tableHeader}>
                  <span style={{ width: "20%" }}>Cliente</span>
                  <span style={{ width: "25%" }}>Produto</span>
                  <span style={{ width: "15%" }}>Data do pedido</span>
                  <span style={{ width: "15%" }}>Valor total</span>
                  <span style={{ width: "10%" }}>Status</span>
                  <span style={{ width: "15%" }}></span>
                </div>
                {data.pedidos.slice(0, 5).map((pedido) => (
                  <div key={pedido.codigo} style={dashboardStyles.tableRow}>
                    <span style={{ width: "20%" }}>
                      {getClientNameById(pedido.idCliente)}
                    </span>
                    <span style={{ width: "25%" }}>
                      {getProductNamesByIds(pedido.produtos)}
                    </span>
                    <span style={{ width: "15%" }}>
                      {formatDate(pedido.dataPedido)}
                    </span>
                    <span style={{ width: "15%" }}>
                      R$ {pedido.valorTotal.toFixed(2).replace(".", ",")}
                    </span>
                    <span
                      style={{
                        width: "10%",
                        ...dashboardStyles.listItemStatus(pedido.status),
                      }}
                    >
                      {pedido.status}
                    </span>
                    <span style={{ width: "15%", textAlign: "center" }}>
                      <input
                        type="radio"
                        name="selectPedido"
                        checked={
                          selectedItem.table === "pedidos" &&
                          selectedItem.codigo === pedido.codigo
                        }
                        onChange={() =>
                          handleSelectRow("pedidos", pedido.codigo)
                        }
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seção de Clientes */}
          {activeMenu === "Cliente" && (
            <div style={dashboardStyles.genericPageContent}>
              <div style={dashboardStyles.searchBar}>
                <i
                  className="fas fa-search"
                  style={dashboardStyles.searchIcon}
                ></i>
                <input
                  type="text"
                  placeholder="Search..."
                  style={dashboardStyles.searchInput}
                />
              </div>
              <h2 style={dashboardStyles.tableTitle}>Tabela de Dados</h2>
              <div style={dashboardStyles.tableContainer}>
                <div style={dashboardStyles.tableHeader}>
                  <span style={{ width: "5%" }}></span>
                  <span
                    style={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("nome")}
                  >
                    Nome
                  </span>
                  <span
                    style={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("dataNascimento")}
                  >
                    Data de Nascimento
                  </span>
                  <span style={{ width: "15%" }}>CPF</span>
                  <span style={{ width: "15%" }}>Telefone</span>
                  <span style={{ width: "35%" }}>Endereço</span>
                </div>
                {getSortedTableData("Cliente").map((cliente) => (
                  <div key={cliente.codigo} style={dashboardStyles.tableRow}>
                    <span style={{ width: "5%", textAlign: "center" }}>
                      <input
                        type="radio"
                        name="selectCliente"
                        checked={
                          selectedItem.table === "clientes" &&
                          selectedItem.codigo === cliente.codigo
                        }
                        onChange={() =>
                          handleSelectRow("clientes", cliente.codigo)
                        }
                      />
                    </span>
                    <span style={{ width: "15%" }}>{cliente.nome}</span>
                    <span style={{ width: "15%" }}>
                      {cliente.dataNascimento}
                    </span>
                    <span style={{ width: "15%" }}>{cliente.cpf}</span>
                    <span style={{ width: "15%" }}>{cliente.telefone}</span>
                    <span style={{ width: "35%" }}>{cliente.endereco}</span>
                  </div>
                ))}
              </div>
              <div style={dashboardStyles.tableActions}>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#CF0F0F",
                  }}
                  onClick={handleRemoveClick}
                >
                  <i className="fas fa-times-circle"></i> Remover
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#2264E5",
                  }}
                  onClick={handleEditClick}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => handleAddNewClick("clientes")}
                >
                  <i className="fas fa-plus-circle"></i> Novo Registro
                </button>
              </div>
              <div style={dashboardStyles.exportButtons}>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToPdf(data.clientes, "Clientes")}
                >
                  Exportar dados em PDF
                </button>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToExcel(data.clientes, "Clientes")}
                >
                  Exportar dados em Excel
                </button>
              </div>
            </div>
          )}
          {/* Seção de Produtos */}
          {activeMenu === "Produto" && (
            <div style={dashboardStyles.genericPageContent}>
              <div style={dashboardStyles.searchBar}>
                <i
                  className="fas fa-search"
                  style={dashboardStyles.searchIcon}
                ></i>
                <input
                  type="text"
                  placeholder="Search..."
                  style={dashboardStyles.searchInput}
                />
              </div>
              <h2 style={dashboardStyles.tableTitle}>Tabela de Dados</h2>
              <div style={dashboardStyles.tableContainer}>
                <div style={dashboardStyles.tableHeader}>
                  <span style={{ width: "5%" }}></span>
                  <span
                    style={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("nome")}
                  >
                    Nome
                  </span>
                  <span
                    style={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("precoUnitario")}
                  >
                    Preço Unitário
                  </span>
                  <span
                    style={{ width: "10%", cursor: "pointer" }}
                    onClick={() => requestSort("estoque")}
                  >
                    Estoque
                  </span>
                  <span
                    style={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("departamento")}
                  >
                    Departamento
                  </span>
                  <span
                    style={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("expirationDate")}
                  >
                    Vencimento
                  </span>
                </div>
                {getSortedTableData("Produto").map((produto) => (
                  <div key={produto.codigo} style={dashboardStyles.tableRow}>
                    <span style={{ width: "5%", textAlign: "center" }}>
                      <input
                        type="radio"
                        name="selectProduto"
                        checked={
                          selectedItem.table === "produtos" &&
                          selectedItem.codigo === produto.codigo
                        }
                        onChange={() =>
                          handleSelectRow("produtos", produto.codigo)
                        }
                      />
                    </span>
                    <span style={{ width: "20%" }}>{produto.nome}</span>
                    <span style={{ width: "15%" }}>
                      R$ {produto.precoUnitario.toFixed(2).replace(".", ",")}
                    </span>
                    <span style={{ width: "10%" }}>{produto.estoque}</span>
                    <span style={{ width: "20%" }}>{produto.departamento}</span>
                    <span style={{ width: "20%" }}>
                      {formatDate(produto.expirationDate)}
                    </span>
                  </div>
                ))}
              </div>
              <div style={dashboardStyles.tableActions}>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#CF0F0F",
                  }}
                  onClick={handleRemoveClick}
                >
                  <i className="fas fa-times-circle"></i> Remover
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#2264E5",
                  }}
                  onClick={handleEditClick}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => handleAddNewClick("produtos")}
                >
                  <i className="fas fa-plus-circle"></i> Novo Registro
                </button>
              </div>
              <div style={dashboardStyles.exportButtons}>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToPdf(data.produtos, "Produtos")}
                >
                  Exportar dados em PDF
                </button>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToExcel(data.produtos, "Produtos")}
                >
                  Exportar dados em Excel
                </button>
              </div>
            </div>
          )}
          {/* Seção de Pedidos */}
          {activeMenu === "Pedidos" && (
            <div style={dashboardStyles.genericPageContent}>
              <div style={dashboardStyles.searchBar}>
                <i
                  className="fas fa-search"
                  style={dashboardStyles.searchIcon}
                ></i>
                <input
                  type="text"
                  placeholder="Search..."
                  style={dashboardStyles.searchInput}
                />
              </div>
              <h2 style={dashboardStyles.tableTitle}>Tabela de Dados</h2>
              <div style={dashboardStyles.tableContainer}>
                <div style={dashboardStyles.tableHeader}>
                  <span style={{ width: "5%" }}></span>
                  <span
                    style={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("idCliente")}
                  >
                    Cliente
                  </span>
                  <span style={{ width: "25%" }}>Produto(s)</span>
                  <span
                    style={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("dataPedido")}
                  >
                    Data do pedido
                  </span>
                  <span
                    style={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("valorTotal")}
                  >
                    Valor total
                  </span>
                  <span
                    style={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("status")}
                  >
                    Status
                  </span>
                </div>
                {getSortedTableData("Pedidos").map((pedido) => (
                  <div key={pedido.codigo} style={dashboardStyles.tableRow}>
                    <span style={{ width: "5%", textAlign: "center" }}>
                      <input
                        type="radio"
                        name="selectPedido"
                        checked={
                          selectedItem.table === "pedidos" &&
                          selectedItem.codigo === pedido.codigo
                        }
                        onChange={() =>
                          handleSelectRow("pedidos", pedido.codigo)
                        }
                      />
                    </span>
                    <span style={{ width: "20%" }}>
                      {getClientNameById(pedido.idCliente)}
                    </span>
                    <span style={{ width: "25%" }}>
                      {getProductNamesByIds(pedido.produtos)}
                    </span>
                    <span style={{ width: "15%" }}>
                      {formatDate(pedido.dataPedido)}
                    </span>
                    <span style={{ width: "15%" }}>
                      R$ {pedido.valorTotal.toFixed(2).replace(".", ",")}
                    </span>
                    <span
                      style={{
                        width: "20%",
                        ...dashboardStyles.listItemStatus(pedido.status),
                      }}
                    >
                      {pedido.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={dashboardStyles.tableActions}>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#CF0F0F",
                  }}
                  onClick={handleRemoveClick}
                >
                  <i className="fas fa-times-circle"></i> Remover
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#2264E5",
                  }}
                  onClick={handleEditClick}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  style={{
                    ...dashboardStyles.actionButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => handleAddNewClick("pedidos")}
                >
                  <i className="fas fa-plus-circle"></i> Novo Registro
                </button>
              </div>
              <div style={dashboardStyles.exportButtons}>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToPdf(data.pedidos, "Pedidos")}
                >
                  Exportar dados em PDF
                </button>
                <button
                  style={{
                    ...dashboardStyles.exportButton,
                    backgroundColor: "#287F05",
                  }}
                  onClick={() => exportToExcel(data.pedidos, "Pedidos")}
                >
                  Exportar dados em Excel
                </button>
              </div>
            </div>
          )}
          {/* Seção "Sobre a Conta" */}
          {activeMenu === "Sobre a conta" && (
            <div style={dashboardStyles.genericContent}>
              Sobre a conta... Conteúdo detalhado da conta do usuário.
            </div>
          )}
          {/* Seção de Ajuda */}
          {activeMenu === "Ajuda" && (
            <div style={dashboardStyles.genericContent}>
              Ajuda... Aqui você encontraria FAQs, tutoriais ou contato para
              suporte.
            </div>
          )}
        </div>
      </div>
      {renderForm()}
    </div>
  );
}

// --- Estilos do Dashboard ---
const dashboardStyles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#F5F7FA",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
  },
  sidebarHeader: {
    marginBottom: "30px",
    textAlign: "center",
  },
  sidebarLogo: {
    width: "150px",
    height: "auto",
  },
  nav: {
    flexGrow: 1,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navSectionHeader: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#A0AEC0",
    marginTop: "20px",
    marginBottom: "10px",
    textTransform: "uppercase",
    paddingLeft: "10px",
  },
  navItem: {
    marginBottom: "5px",
  },
  navButton: {
    width: "100%",
    padding: "12px 10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    color: "#4A5568",
    fontWeight: "600",
    transition: "background-color 0.2s, color 0.2s",
    "&:hover": {
      backgroundColor: "#EDF2F7",
      color: "#2D89EF",
    },
  },
  navButtonActive: {
    width: "100%",
    padding: "12px 10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#E2E8F0",
    border: "none",
    borderRadius: "8px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    color: "#2D89EF",
    fontWeight: "700",
  },
  navIcon: {
    width: "20px",
    textAlign: "center",
    color: "#718096",
  },
  navIconRed: {
    width: "20px",
    textAlign: "center",
    color: "#E53E3E",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid #E2E8F0",
  },
  logoutSidebarButton: {
    width: "100%",
    padding: "12px 10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    color: "#E53E3E",
    fontWeight: "600",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#FED7D7",
    },
  },
  mainContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "#2D89EF",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  navbarTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  navbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navbarLogo: {
    width: "100px",
    height: "auto",
    filter: "brightness(0) invert(1)",
  },
  logoutButton: {
    backgroundColor: "#fff",
    color: "#2D89EF",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#E2E8F0",
    },
  },
  contentArea: {
    flexGrow: 1,
    padding: "30px",
    overflowY: "auto",
  },
  homeContent: {},
  genericPageContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "20px",
    marginTop: "30px",
    fontWeight: "700",
  },
  tableTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "15px",
    fontWeight: "600",
  },
  kpiContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  kpiCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center",
    borderLeft: "5px solid #2D89EF",
  },
  kpiCardH3: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  kpiCardP: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#333",
  },
  alertsContainer: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  alertCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  alertWarning: {
    backgroundColor: "#FFF3CD",
    color: "#856404",
    borderLeft: "5px solid #FFC107",
  },
  alertDanger: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
    borderLeft: "5px solid #DC3545",
  },
  alertSuccess: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
    borderLeft: "5px solid #28A745",
  },
  alertInfo: {
    backgroundColor: "#D1ECF1",
    color: "#0C5460",
    borderLeft: "5px solid #17A2B8",
  },
  alertIcon: {
    fontSize: "24px",
  },
  alertActionButton: {
    marginLeft: "auto",
    backgroundColor: "transparent",
    border: "none",
    color: "#2D89EF",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "text-decoration 0.2s",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  tableContainer: {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    display: "flex",
    padding: "12px 15px",
    backgroundColor: "#F8F9FA",
    borderBottom: "1px solid #E2E8F0",
    fontWeight: "700",
    color: "#4A5568",
    fontSize: "14px",
    textTransform: "uppercase",
  },
  tableRow: {
    display: "flex",
    padding: "10px 15px",
    borderBottom: "1px solid #EDF2F7",
    alignItems: "center",
    fontSize: "14px",
    color: "#2D3748",
    "&:last-child": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "#F7FAFC",
    },
  },
  listItemStatus: (status) => {
    let color = "#555";
    let backgroundColor = "#E2E8F0";
    if (status === "PAGO" || status === "Concluído") {
      color = "#155724";
      backgroundColor = "#D4EDDA";
    } else if (status === "CANCELADO") {
      color = "#721C24";
      backgroundColor = "#F8D7DA";
    } else if (status === "PENDENTE") {
      color = "#856404";
      backgroundColor = "#FFF3CD";
    } else if (status === "Baixo Estoque") {
      color = "#DC3545";
      backgroundColor = "#F8D7DA";
    } else if (status === "Vencendo") {
      color = "#A02C2C";
      backgroundColor = "#FFDDDD";
    } else if (status === "OK") {
      color = "#155724";
      backgroundColor = "#D4EDDA";
    }

    return {
      fontSize: "12px",
      fontWeight: "bold",
      padding: "4px 8px",
      borderRadius: "5px",
      backgroundColor: backgroundColor,
      color: color,
      textAlign: "center",
    };
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "8px 15px",
    marginBottom: "20px",
    width: "320px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  searchInput: {
    border: "none",
    outline: "none",
    flexGrow: 1,
    fontSize: "15px",
    paddingLeft: "10px",
  },
  searchIcon: {
    color: "#A0AEC0",
    fontSize: "16px",
  },
  tableActions: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    justifyContent: "flex-start",
  },
  actionButton: {
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s",
    "&:hover": {
      filter: "brightness(1.1)",
    },
  },
  exportButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    justifyContent: "flex-start",
  },
  exportButton: {
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      filter: "brightness(1.1)",
    },
  },
  formOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    width: "500px",
    maxWidth: "90%",
    position: "relative",
  },
  formTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "25px",
    textAlign: "center",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
    fontWeight: "600",
  },
  formInput: {
    padding: "10px 12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    "&:focus": {
      borderColor: "#2D89EF",
      boxShadow: "0 0 0 3px rgba(45, 137, 239, 0.1)",
    },
  },
  formActions: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "20px",
  },
};
