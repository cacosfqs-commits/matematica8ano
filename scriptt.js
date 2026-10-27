
const conteudo = document.getElementById("conteudo");
const botoesTrimestre = document.querySelectorAll(".trimestre");
const botoesCategoria = document.querySelectorAll(".categoria");

const tituloTrimestre = document.getElementById("titulo-trimestre");
const tituloCategoria = document.getElementById("titulo-categoria");
const subtituloCategoria = document.getElementById("subtitulo-categoria");

let trimestreAtual = 1;
let categoriaAtual = "resumos";

let atividadeAtual = null;
let questaoAtual = 0;
let respondeu = false;
let respostasCorretas = 0;

let flashcardsAtuais = [];
let flashcardAtual = 0;
let mostrandoResposta = false;

// CONTEÚDOS DE EXEMPLO.
// Depois, substitua estes dados pelos materiais da sua amiga.

const dados = {
    1: {
        resumos: [
            {
                titulo: "Álgebra E Potenciação , Conjuntos Numericos",
                descricao: "Link dos resumos a seguir.",
                texto: ""
            },
            {
                titulo: "Monomios E Polinomios , Raizes E Notação Cientifica",
                descricao: "Link dos resumos a seguir.",
                texto: ""
            }
        ],

        atividades: [
            {
                titulo: "Atividade de Álgebra",
                descricao: "Resolva as questões de exemplo.",
                questoes: [
                    {
                        pergunta: "Quanto é 3 + 5?",
                        opcoes: ["6", "8", "10", "15"],
                        correta: 1,
                        explicacao: "3 + 5 = 8."
                    },
                    {
                        pergunta: "Quanto é 4 × 3?",
                        opcoes: ["7", "10", "12", "15"],
                        correta: 2,
                        explicacao: "4 × 3 = 12."
                    }
                ]
            }
        ],

        flashcards: [
            {
                titulo: "Flash cards de Álgebra",
                cartas: [
                    {
                        frente: "O que é uma expressão numérica?",
                        verso: "Uma expressão formada por números e operações matemáticas."
                    },
                    {
                        frente: "Quanto é 7 × 8?",
                        verso: "56."
                    }
                ]
            }
        ],

        simulado: [
            {
                titulo: "Simulado do 1º trimestre",
                descricao: "Questões de demonstração.",
                questoes: [
                    {
                        pergunta: "Quanto é 12 ÷ 3?",
                        opcoes: ["2", "3", "4", "6"],
                        correta: 2,
                        explicacao: "12 dividido por 3 é igual a 4."
                    },
                    {
                        pergunta: "Quanto é 9 + 6?",
                        opcoes: ["13", "14", "15", "16"],
                        correta: 2,
                        explicacao: "9 + 6 = 15."
                    }
                ]
            }
        ],

        videos: [
            {
                titulo: "Vídeos de Matemática",
                descricao: "Troque este link pelo vídeo indicado pela sua amiga.",
                url: "https://www.youtube.com/"
            }
        ]
    },

    2: {
        resumos: [
            {
                titulo: "Proporção",
                descricao: "Exemplo de resumo do 2º trimestre.",
                texto: "Adicione aqui a explicação de proporção, fórmulas e exemplos."
            }
        ],

        atividades: [
            {
                titulo: "Atividade de Proporção",
                descricao: "Questão de demonstração.",
                questoes: [
                    {
                        pergunta: "Se 2 cadernos custam R$ 10, quanto custam 4 cadernos pelo mesmo preço unitário?",
                        opcoes: ["R$ 15", "R$ 20", "R$ 25", "R$ 40"],
                        correta: 1,
                        explicacao: "Cada caderno custa R$ 5. Quatro custam R$ 20."
                    }
                ]
            }
        ],

        flashcards: [
            {
                titulo: "Flash cards de Proporção",
                cartas: [
                    {
                        frente: "O que é uma proporção?",
                        verso: "É uma igualdade entre duas razões."
                    }
                ]
            }
        ],

        simulado: [
            {
                titulo: "Simulado do 2º trimestre",
                descricao: "Questão de demonstração.",
                questoes: [
                    {
                        pergunta: "Se 3 livros custam R$ 30, quanto custam 6 livros iguais?",
                        opcoes: ["R$ 45", "R$ 50", "R$ 60", "R$ 90"],
                        correta: 2,
                        explicacao: "A quantidade dobrou, então o preço também dobra: R$ 60."
                    }
                ]
            }
        ],

        videos: [
            {
                titulo: "Vídeos de Proporção",
                descricao: "Substitua pelo link do vídeo de estudo.",
                url: "https://www.youtube.com/"
            }
        ]
    },

    3: {
        resumos: [
            {
                titulo: "Equações",
                descricao: "Exemplo de resumo do 3º trimestre.",
                texto: "Adicione aqui os métodos de resolução de equações e os exemplos."
            }
        ],

        atividades: [
            {
                titulo: "Atividade de Equações",
                descricao: "Questão de demonstração.",
                questoes: [
                    {
                        pergunta: "Se x + 4 = 10, quanto vale x?",
                        opcoes: ["4", "5", "6", "14"],
                        correta: 2,
                        explicacao: "Subtraindo 4 dos dois lados, x = 10 - 4 = 6."
                    }
                ]
            }
        ],

        flashcards: [
            {
                titulo: "Flash cards de Equações",
                cartas: [
                    {
                        frente: "O que é uma incógnita?",
                        verso: "É um valor desconhecido representado por uma letra ou símbolo."
                    }
                ]
            }
        ],

        simulado: [
            {
                titulo: "Simulado do 3º trimestre",
                descricao: "Questão de demonstração.",
                questoes: [
                    {
                        pergunta: "Se 2x = 14, quanto vale x?",
                        opcoes: ["5", "6", "7", "12"],
                        correta: 2,
                        explicacao: "Dividindo os dois lados por 2, x = 7."
                    }
                ]
            }
        ],

        videos: [
            {
                titulo: "Vídeos de Equações",
                descricao: "Substitua pelo link do vídeo de estudo.",
                url: "https://www.youtube.com/"
            }
        ]
    }
};

const categorias = {
    resumos: {
        titulo: "Resumos",
        subtitulo: "Revise os principais conteúdos."
    },
    atividades: {
        titulo: "Atividades",
        subtitulo: "Pratique e confira as respostas."
    },
    flashcards: {
        titulo: "Flash cards",
        subtitulo: "Toque no cartão para revelar a resposta."
    },
    simulado: {
        titulo: "Simulado",
        subtitulo: "Responda uma questão por vez."
    },
    videos: {
        titulo: "Vídeos",
        subtitulo: "Acesse os links de estudo."
    }
};

// Trocar de trimestre
botoesTrimestre.forEach((botao) => {
    botao.addEventListener("click", () => {
        trimestreAtual = Number(botao.dataset.trimestre);

        botoesTrimestre.forEach((item) => {
            item.classList.toggle("ativo", item === botao);
        });

        tituloTrimestre.textContent = `${trimestreAtual}º trimestre`;

        renderizarCategoria();
    });
});

// Trocar de categoria
botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;

        botoesCategoria.forEach((item) => {
            item.classList.toggle("ativa", item === botao);
        });

        renderizarCategoria();
    });
});

function renderizarCategoria() {
    const categoria = categorias[categoriaAtual];

    tituloCategoria.textContent = categoria.titulo;
    subtituloCategoria.textContent = categoria.subtitulo;

    const itens = dados[trimestreAtual][categoriaAtual];

    if (!itens || itens.length === 0) {
        conteudo.innerHTML = `
            <div class="vazio">
                Nenhum conteúdo cadastrado nesta categoria ainda.
            </div>
        `;
        return;
    }

    if (categoriaAtual === "atividades" ||
        categoriaAtual === "simulado") {
        renderizarQuestionarios(itens);
        return;
    }

    if (categoriaAtual === "flashcards") {
        renderizarFlashcards(itens);
        return;
    }

    if (categoriaAtual === "videos") {
        renderizarVideos(itens);
        return;
    }

    renderizarResumos(itens);
}

// Resumos
function renderizarResumos(itens) {
    conteudo.innerHTML = `
        <div class="lista-conteudos">
            ${itens.map((item, indice) => `
                <article class="cartao">
                    <h3>${item.titulo}</h3>
                    <p>${item.descricao}</p>

                    <button class="botao"
                        data-acao="resumo"
                        data-indice="${indice}">
                        Abrir resumo
                    </button>

                    <div class="texto-resposta"
                        id="resumo-${indice}">${item.texto}</div>
                </article>
            `).join("")}
        </div>
    `;
}

// Atividades e simulados
function renderizarQuestionarios(itens) {
    conteudo.innerHTML = `
        <div class="lista-conteudos">
            ${itens.map((item, indice) => `
                <article class="cartao">
                    <h3>${item.titulo}</h3>
                    <p>${item.descricao}</p>
                    <p>${item.questoes.length} questão(ões)</p>

                    <button class="botao"
                        data-acao="iniciar-quiz"
                        data-indice="${indice}">
                        Começar
                    </button>
                </article>
            `).join("")}
        </div>
    `;
}

function iniciarQuestionario(indice) {
    const itens = dados[trimestreAtual][categoriaAtual];

    atividadeAtual = itens[indice];
    questaoAtual = 0;
    respondeu = false;
    respostasCorretas = 0;

    mostrarQuestao();
}

function mostrarQuestao() {
    const questao = atividadeAtual.questoes[questaoAtual];

    conteudo.innerHTML = `
        <article class="cartao">
            <p class="progresso">
                Questão ${questaoAtual + 1} de
                ${atividadeAtual.questoes.length}
            </p>

            <h3>${atividadeAtual.titulo}</h3>
            <p>${questao.pergunta}</p>

            <div class="alternativas">
                ${questao.opcoes.map((opcao, indice) => `
                    <button class="alternativa"
                        data-acao="responder"
                        data-indice="${indice}">
                        ${String.fromCharCode(65 + indice)}. ${opcao}
                    </button>
                `).join("")}
            </div>

            <p id="feedback" class="feedback"></p>

            <div class="acoes-questao">
                <button class="botao" id="proxima-questao"
                    data-acao="proxima" disabled>
                    ${questaoAtual === atividadeAtual.questoes.length - 1
                        ? "Ver resultado"
                        : "Próxima questão"}
                </button>

                <button class="botao botao-secundario"
                    data-acao="voltar">
                    Voltar
                </button>
            </div>
        </article>
    `;
}

function responder(indice) {
    if (respondeu) return;

    respondeu = true;

    const questao = atividadeAtual.questoes[questaoAtual];
    const correta = indice === questao.correta;

    if (correta) respostasCorretas++;

    document.querySelectorAll(".alternativa").forEach((botao, i) => {
        botao.disabled = true;

        if (i === questao.correta) {
            botao.classList.add("correta");
        } else if (i === indice) {
            botao.classList.add("errada");
        }
    });

    const feedback = document.getElementById("feedback");

    feedback.textContent = correta
        ? `Resposta correta! ${questao.explicacao}`
        : `Resposta incorreta. ${questao.explicacao}`;

    document.getElementById("proxima-questao").disabled = false;
}

function proximaQuestao() {
    if (!respondeu) return;

    if (questaoAtual < atividadeAtual.questoes.length - 1) {
        questaoAtual++;
        respondeu = false;
        mostrarQuestao();
        return;
    }

    const total = atividadeAtual.questoes.length;

    conteudo.innerHTML = `
        <article class="cartao">
            <h3>Atividade concluída!</h3>
            <p>Você acertou ${respostasCorretas} de ${total} questões.</p>
            <p>Continue praticando para revisar o conteúdo.</p>

            <button class="botao" data-acao="reiniciar">
                Refazer atividade
            </button>

            <button class="botao botao-secundario"
                data-acao="voltar">
                Voltar à lista
            </button>
        </article>
    `;
}

// Flash cards
function renderizarFlashcards(itens) {
    conteudo.innerHTML = `
        <div class="lista-conteudos">
            ${itens.map((item, indice) => `
                <article class="cartao">
                    <h3>${item.titulo}</h3>
                    <p>${item.cartas.length} cartão(ões)</p>

                    <button class="botao"
                        data-acao="iniciar-flashcards"
                        data-indice="${indice}">
                        Estudar cartões
                    </button>
                </article>
            `).join("")}
        </div>
    `;
}

function iniciarFlashcards(indice) {
    const itens = dados[trimestreAtual].flashcards;

    flashcardsAtuais = itens[indice].cartas;
    flashcardAtual = 0;
    mostrandoResposta = false;

    mostrarFlashcard();
}

function mostrarFlashcard() {
    const carta = flashcardsAtuais[flashcardAtual];
    const texto = mostrandoResposta ? carta.verso : carta.frente;

    conteudo.innerHTML = `
        <article class="cartao">
            <p class="progresso">
                Cartão ${flashcardAtual + 1} de ${flashcardsAtuais.length}
            </p>

            <button class="flashcard" data-acao="virar">
                ${texto}
                <small>Toque para ${mostrandoResposta
                    ? "ver a pergunta"
                    : "revelar a resposta"}</small>
            </button>

            <div class="acoes-questao">
                <button class="botao botao-secundario"
                    data-acao="anterior-flash"
                    ${flashcardAtual === 0 ? "disabled" : ""}>
                    Anterior
                </button>

                <button class="botao"
                    data-acao="proximo-flash">
                    ${flashcardAtual === flashcardsAtuais.length - 1
                        ? "Concluir"
                        : "Próximo cartão"}
                </button>

                <button class="botao botao-secundario"
                    data-acao="voltar">
                    Voltar à lista
                </button>
            </div>
        </article>
    `;
}

// Vídeos
function renderizarVideos(itens) {
    conteudo.innerHTML = `
        <div class="lista-conteudos">
            ${itens.map((item) => `
                <article class="cartao">
                    <h3>${item.titulo}</h3>
                    <p>${item.descricao}</p>

                    <a class="botao"
                        href="${item.url}"
                        target="_blank"
                        rel="noopener noreferrer">
                        Assistir vídeo
                    </a>
                </article>
            `).join("")}
        </div>
    `;
}

// Ações dos botões criados dinamicamente
conteudo.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-acao]");
    if (!botao) return;

    const acao = botao.dataset.acao;
    const indice = Number(botao.dataset.indice);

    if (acao === "resumo") {
        document.getElementById(`resumo-${indice}`)
            .classList.toggle("aberto");
    }

    if (acao === "iniciar-quiz") {
        iniciarQuestionario(indice);
    }

    if (acao === "responder") {
        responder(indice);
    }

    if (acao === "proxima") {
        proximaQuestao();
    }

    if (acao === "iniciar-flashcards") {
        iniciarFlashcards(indice);
    }

    if (acao === "virar") {
        mostrandoResposta = !mostrandoResposta;
        mostrarFlashcard();
    }

    if (acao === "anterior-flash" && flashcardAtual > 0) {
        flashcardAtual--;
        mostrandoResposta = false;
        mostrarFlashcard();
    }

    if (acao === "proximo-flash") {
        if (flashcardAtual < flashcardsAtuais.length - 1) {
            flashcardAtual++;
            mostrandoResposta = false;
            mostrarFlashcard();
        } else {
            renderizarCategoria();
        }
    }

    if (acao === "reiniciar") {
        iniciarQuestionario(
            dados[trimestreAtual][categoriaAtual]
                .indexOf(atividadeAtual)
        );
    }

    if (acao === "voltar") {
        renderizarCategoria();
    }
});

// Mostrar a página inicial
renderizarCategoria();
