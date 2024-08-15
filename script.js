let currentQuestion = 1;
let score = 0;

const descriptions = {
    1: {
        correct: "¡Correcto! Entregamos servicios de alimentación, retail y gestión de instalaciones, donde las personas trabajan, aprenden y se recuperan.",
        incorrect: "Incorrecto. Entregamos servicios de alimentación, retail y gestión de instalaciones, donde las personas trabajan, aprenden y se recuperan."
    },
    2: {
        correct: "¡Correcto! Aramark fue fundada en 1936 en Filadelfia, Estados Unidos. Con el tiempo, la compañía expandió sus servicios a la1 gestión de alimentos y servicios de apoyo, adoptando el nombre de Aramark en 1969.",
        incorrect: "No es correcto. Aramark fue fundada en 1936 en Filadelfia, Estados Unidos. Con el tiempo, la compañía expandió sus servicios a la gestión de alimentos y servicios de apoyo, adoptando el nombre de Aramark en 1969."
    },
    3: {
        correct: "¡¡Correcto! Somos más de 25.000 trabajadores a lo largo de todo Chile. Los detalles que hacen nuestros colaboradores son los que nos hacen grandes.",
        incorrect: "Incorrecto. Somos más de 25.000 trabajadores a lo largo de todo Chile. Los detalles que hacen nuestros colaboradores son los que nos hacen grandes."
    },
    4: {
        correct: "¡Correcto! A diario, atendemos más de 1.800 puntos de Arica a Porvenir, ciudad a casi 50 km al sur de Punta Arenas.",
        incorrect: "No es correcto. A diario, atendemos más de 1.800 puntos de Arica a Porvenir, ciudad a casi 50 km al sur de Punta Arenas."
    }
};

document.querySelectorAll('.options input').forEach(input => {
    input.addEventListener('change', function() {
        const allOptions = document.querySelectorAll(`.question[data-question="${currentQuestion}"] .options li`);
        const correctOption = document.querySelector(`.question[data-question="${currentQuestion}"] input[value="1"]`);
        const selectedLabel = this.nextElementSibling;
        const description = document.getElementById(`desc${currentQuestion}`);

        // Deshabilitar todas las opciones después de seleccionar
        document.querySelectorAll(`.question[data-question="${currentQuestion}"] .options input`).forEach(option => {
            option.disabled = true;
        });

        // Limpiar clases anteriores
        allOptions.forEach(option => {
            const label = option.querySelector('label');
            label.classList.remove('correct-answer', 'incorrect-answer');
        });

        // Marcar respuesta seleccionada
        selectedLabel.classList.add(this.value == "1" ? 'correct-answer' : 'incorrect-answer');

        // Marcar la respuesta correcta
        correctOption.nextElementSibling.classList.add('correct-answer');

        // Mostrar el texto descriptivo específico para la pregunta
        if (this.value == "1") {
            description.textContent = descriptions[currentQuestion].correct;
        } else {
            description.textContent = descriptions[currentQuestion].incorrect;
        }

        // Habilitar el botón de siguiente
        document.getElementById('next-btn').disabled = false;
    });
});

document.getElementById('next-btn').addEventListener('click', function() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        score += parseInt(selectedOption.value);
        document.querySelector(`.question[data-question="${currentQuestion}"]`).style.display = 'none';
        currentQuestion++;
        if (currentQuestion <= 4) {
            document.querySelector(`.question[data-question="${currentQuestion}"]`).style.display = 'block';
            document.getElementById('next-btn').disabled = true;
        } else {
            document.getElementById('score').innerText = score;
            document.getElementById('quiz').style.display = 'none';
            document.getElementById('score-container').style.display = 'block';
        }
    }
});

document.getElementById('restart-btn').addEventListener('click', function() {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => option.checked = false);

    document.querySelectorAll('.correct-answer, .incorrect-answer').forEach(label => {
        label.classList.remove('correct-answer', 'incorrect-answer');
    });

    document.querySelectorAll('.options input').forEach(option => {
        option.disabled = false;
    });

    document.querySelectorAll('.description').forEach(desc => desc.textContent = '');

    document.querySelector(`.question[data-question="1"]`).style.display = 'block';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('score-container').style.display = 'none';
    currentQuestion = 1;
    score = 0;
    document.getElementById('next-btn').disabled = true;
});
