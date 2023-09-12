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
    tableElement.innerHTML = "";

    let content = "";

    tableList.tables.forEach((table) => {
        content += 
        `
            <div class="cards" onclick="">
                <h3>Cliente: ${table.client}</h3>
                <p>ID: ${table.id}</p>
                <p>Mesa: ${table.table}</p>
                <p>Descrição: ${table.description}</p>
            </div>
        `
    });
    tableElement.innerHTML = content;
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