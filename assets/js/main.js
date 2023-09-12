class Table {
    constructor(client, table, description) {
        this.id = this.generateID();
        this.client = client;
        this.table = table;
        this.description = description;
    }

    generateID() {
        return Math.floor(Math.random() * 1000)
    }
}

class TableList {
    constructor() {
        this.tables = [];
    }

    add(param) {
        if(emptyInputs()) {
            alert("Preencha todos os campos")
        } else {
            this.tables.push(param)
            cleanInputs()
        }
    }

    tableById(param) {
        return this.tables.find((table) => table.id == param);
    }

    updateTable(id, client, tableNumber, description) {
        const table = this.tableById(id);

        table.client = client;
        table.table = tableNumber;
        table.description = description;

        return table;
    }

    deleteTable(param) {
        return this.tables.filter((table) => table.id != param);
    }
}

const tableList = new TableList();

function createTable() {
    const client = document.getElementById("client").value;
    const table = document.getElementById("table").value;
    const description = document.getElementById("description").value;

    const newTable = new Table(client, table, description);
    tableList.add(newTable)
    renderTable()
}

function renderTable() {
    const tableElement = document.getElementById("order-list");
    tableElement.classList.remove("hidden")
    tableElement.innerHTML = "";

    let content = "";

    tableList.tables.forEach((table) => {
        content += 
        `
            <div class="cards">
                <h3>Cliente: ${table.client}</h3>
                <p>ID: ${table.id}</p>
                <p>Mesa: ${table.table}</p>
                <p>Descrição: ${table.description}</p>
                <div id="actions">
                    <button onclick="updateTable(${table.id})">Editar</button>
                    <button onclick="deleteTable(${table.id})">Deletar</button>
                </div>
            </div>
        `
    });
    tableElement.innerHTML = content;
}

let aux = null;

function updateTable(id) {
    const table = tableList.tableById(id);

    document.getElementById("client").value = table.client;
    document.getElementById("table").value = table.table;
    document.getElementById("description").value = table.description;

    document.getElementById("button-register").classList.add("hidden");
    document.getElementById("button-edit").classList.remove("hidden");

    aux = id;
}

function editTable() {
    const client = document.getElementById("client").value;
    const table = document.getElementById("table").value;
    const description = document.getElementById("description").value;

    tableList.updateTable(aux, client, table, description);

    renderTable()

    document.getElementById("button-register").classList.remove("hidden");
    document.getElementById("button-edit").classList.add("hidden");

    aux = null;
    cleanInputs()
}

function deleteTable(id) {
    tableList.deleteTable(id)

    renderTable()

    document.getElementById("order-list").classList.add("hidden")

    if(teamList.teams.length == 0) {
        document.getElementById("order-list").classList.add("hidden")
    }
}

function emptyInputs() {
    const client = document.getElementById("client").value;
    const table = document.getElementById("table").value;
    const description = document.getElementById("description").value;

    if(client == "" && table == "" && description == "") {
        return true
    } else if(client == "" || table == "" || description == "") {
        return true
    } else {
        return false
    }
}

function cleanInputs() {
    document.getElementById("client").value = "";
    document.getElementById("table").value = "";
    document.getElementById("description").value = "";
}