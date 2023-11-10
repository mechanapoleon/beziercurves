const canvas = document.getElementById('bezierCanvas');
const ctx = canvas.getContext('2d');

let controlPoints = [
    { x: 100, y: 500 }, // Start point
    { x: 400, y: 100 }, // Control point
    { x: 700, y: 500 }  // End point
];

drawCurve(controlPoints);


let isDragging = false;
let dragPointIndex = -1;

canvas.addEventListener('mousedown', function(event) {
    const mousePos = getMousePos(canvas, event);
    for (let i = 0; i < controlPoints.length; i++) {
        const dist = Math.sqrt(Math.pow(mousePos.x - controlPoints[i].x, 2) + Math.pow(mousePos.y - controlPoints[i].y, 2));
        if (dist < 10) {
            isDragging = true;
            dragPointIndex = i;
            break;
        }
    }
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const mousePos = getMousePos(canvas, event);
        controlPoints[dragPointIndex] = mousePos;
        drawCurve(controlPoints);
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDragging = false;
    dragPointIndex = -1;
});

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function drawControlPoints() {
    for (let i = 0; i < controlPoints.length; i++) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(controlPoints[i].x, controlPoints[i].y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function drawCurve(points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawControlPoints(); // Draw the control points
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y); // Move to start point
    ctx.quadraticCurveTo(points[1].x, points[1].y, points[2].x, points[2].y); // Draw curve
    ctx.stroke();
}

drawCurve(controlPoints);
