const todoForm = document.querySelector('.to_do_form') // armazena to_do_form do index
const todoInput = document.querySelector('.to_do_input') //armazena o valor da input box
const todoItemsList = document.querySelector('.to_do_items') //armazena a <ul> 'to_do_items

let todos = [];                     //Cria um Array vazio para guardar os itens

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();         //Evita que o navegador execute o comportamento padrãoi do elemento selecionado
    addTodo(todoInput.value);       // chame a função addTodo com o valor atual da caixa de entrada
});

function addTodo(item) {            // Funcão para adicionar to-do
    if (item !== '') {              // se o item não estiver vazio
        const todo = {              // Cria um objeto todo, que tem id, nome e propriedades concluídas
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);           //Adiciona o objeto 'todos' ao array 'todo'
        addToLocalStorage(todos);
        todoInput.value = '';       //Limpa o valor da caixa de entrada
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';    //Limpa tudo dentro da <ul>
    todos.forEach(function (item) {   //Percorre cada item dentro do 'todos'
        const checked = item.completed ? 'checked' : null;   //Verifica se o 'item' foi completado
        const li = document.createElement('li'); //cria um elemento <li> e o preenche
        li.setAttribute('class', 'item'); //Adicione um atributo de classe a um elemento // <li class="item"> </li>
        li.setAttribute('data-key', item.id); //Adicione um atributo de classe a um elemento // <li class="item" data-key="20200708"> </li>
        if (item.completed === true) {   //Se o 'item' estiver concluido
            li.classList.add('checked'); //Adiciona uma classe a <li> chamada 'checked'
        }
        li.innerHTML = `
        <input type= "checkbox" class="checbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;
        todoItemsList.append(li);   //adiciona um conjunto de objeto ou sequencia de objetos em sequencia apos o ultimo filho
    });
}

function addToLocalStorage(todos) {      //Função para adicionar tudo no armazenamento local
    localStorage.setItem('todos', JSON.stringify(todos));   //converte em String o Array e então armazena
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) { //Verifica se existe 'reference'
        todos = JSON.parse(reference); //Converte de volta para Array
        renderTodos(todos);
    }
}

getFromLocalStorage();
todoItemsList.addEventListener('click', function (event) { //Ouve o evento click em todos os botões de exclusão e caixas de seleção
    if (event.target.type === 'checkbox') {  // verifica se o evento está na caixa de seleção
        toggle(event.target.parentElement.getAttribute('data-key')); // obtém id do valor do atributo data-key do pai <li> onde o botão delete está presente
    }
    if (event.target.classList.contains('delete-button')) {  // verifica se é um botão delete
        deleteTodo(event.target.parentElement.getAttribute('data-key'));    // obtém id do valor do atributo data-key do pai <li> onde o botão delete está presente
    }
});


function toggle(id) {   // alterna o valor para concluído e não concluído
    todos.forEach(function (item) {
      if (item.id == id) { //// use == não ===, porque aqui os tipos são diferentes. Um é número e outro é string
        item.completed = !item.completed;
      }
    });
    addToLocalStorage(todos);
  }

  function deleteTodo(id) {     // exclui um todo do array todos, então atualiza o localstorage e renderiza a lista atualizada na tela
    todos = todos.filter(function (item) {  // filtra o <li> com o id e atualiza o array todos
      return item.id != id; // use != não !==, porque aqui os tipos são diferentes. Um é número e outro é string
    });
    addToLocalStorage(todos); // atualiza o localStorage
  }
