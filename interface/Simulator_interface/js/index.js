// -------------------------
// Component
// -------------------------

class Component {

    constructor(type, x, y) {

        this.id = nextId++;

        this.type = type;

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 40;

        this.terminals = [];
    }

    addTerminal(name, x, y) {

        this.terminals.push({
            name: name,
            x: x,
            y: y,
            component: this
        });
    }

    draw() {

        const x = this.x;
        const y = this.y;

        ctx.beginPath();

        if (this.type === "battery") {

            ctx.moveTo(x + 30, y + 10);
            ctx.lineTo(x + 30, y + 30);

            ctx.moveTo(x + 50, y + 5);
            ctx.lineTo(x + 50, y + 35);

            ctx.stroke();

            ctx.fillText("+", x + 55, y + 15);
            ctx.fillText("-", x + 18, y + 15);
        }

        else if (this.type === "resistor") {

            ctx.beginPath();

            ctx.moveTo(x + 5, y + 20);

            ctx.lineTo(x + 15, y + 20);

            ctx.lineTo(x + 20, y + 10);
            ctx.lineTo(x + 30, y + 30);
            ctx.lineTo(x + 40, y + 10);
            ctx.lineTo(x + 50, y + 30);
            ctx.lineTo(x + 60, y + 10);
            ctx.lineTo(x + 65, y + 20);

            ctx.lineTo(x + 75, y + 20);

            ctx.stroke();
        }

        else if (this.type === "led") {

            ctx.beginPath();

            ctx.arc(
                x + 40,
                y + 20,
                18,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            ctx.beginPath();

            ctx.moveTo(x + 30, y + 10);
            ctx.lineTo(x + 50, y + 30);

            ctx.moveTo(x + 50, y + 10);
            ctx.lineTo(x + 30, y + 30);

            ctx.stroke();
        }

        ctx.fillText(
            this.type + " " + this.id,
            x,
            y + 55
        );

        this.drawTerminals();
    }


    drawTerminals() {

        for (let terminal of this.terminals) {

            ctx.beginPath();

            ctx.arc(
                terminal.x,
                terminal.y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.fillText(
                terminal.name,
                terminal.x - 5,
                terminal.y - 10
            );
        }
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let tool = "battery";

let components = [];
let wires = [];

let selectedComponent = null;
let wireStart = null;

let nextId = 1;





// -------------------------
// Create component
// -------------------------

function createComponent(type, x, y) {

    const c = new Component(type, x, y);

    if (type === "battery") {

        c.addTerminal(
            "A",
            x + 20,
            y + 20
        );

        c.addTerminal(
            "B",
            x + 60,
            y + 20
        );
    }

    else {

        c.addTerminal(
            "A",
            x,
            y + 20
        );

        c.addTerminal(
            "B",
            x + 80,
            y + 20
        );
    }

    return c;
}


// -------------------------
// Tool selection
// -------------------------

function selectTool(newTool) {

    tool = newTool;

    selectedComponent = null;
    wireStart = null;
}


// -------------------------
// Canvas click
// -------------------------

canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    if (
        tool === "battery" ||
        tool === "resistor" ||
        tool === "led"
    ) {

        const component =
            createComponent(tool, x, y);

        components.push(component);

        draw();

        return;
    }


    if (tool === "wire") {

        const terminal =
            findTerminal(x, y);

        if (terminal === null) {
            return;
        }

        if (wireStart === null) {

            wireStart = terminal;

        } else {

            wires.push({
                from: wireStart,
                to: terminal
            });

            wireStart = null;
        }

        draw();
    }

});


// -------------------------
// Find terminal
// -------------------------

function findTerminal(x, y) {

    for (let component of components) {

        for (let terminal of component.terminals) {

            const dx = x - terminal.x;
            const dy = y - terminal.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 12) {

                return terminal;
            }
        }
    }

    return null;
}


// -------------------------
// Draw wires
// -------------------------

function drawWires() {

    for (let wire of wires) {

        ctx.beginPath();

        ctx.moveTo(
            wire.from.x,
            wire.from.y
        );

        ctx.lineTo(
            wire.to.x,
            wire.to.y
        );

        ctx.stroke();
    }
}


// -------------------------
// Draw everything
// -------------------------

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawGrid();

    drawWires();

    for (let component of components) {

        component.draw();
    }

    if (wireStart !== null) {

        ctx.beginPath();

        ctx.arc(
            wireStart.x,
            wireStart.y,
            8,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    }
}


// -------------------------
// Grid
// -------------------------

function drawGrid() {

    const spacing = 7;

    ctx.beginPath();

    for (
        let x = 0;
        x < canvas.width;
        x += spacing
    ) {

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (
        let y = 0;
        y < canvas.height;
        y += spacing
    ) {

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
}


// -------------------------
// Clear
// -------------------------

function clearCircuit() {

    components = [];
    wires = [];

    selectedComponent = null;
    wireStart = null;

    nextId = 1;

    draw();
}


draw();