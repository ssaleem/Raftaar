require('../styles/app.css')
import num from './test';
import _ from './weather';


console.log(`I imported ${num} from another module!!`);

const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

renderTodoList();

document.getElementById('item').addEventListener('keydown', function (e) 
{
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) 
    {
        addItem(value);
    }
});

function addItem(value) 
{
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    update();
}

function renderTodoList() 
{
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) 
    {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) 
    {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function update() 
{
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() 
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    update();

    parent.removeChild(item);
}

function completeItem() 
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') 
    {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else 
    {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    update();

    // Check if the item should be added to the completed list or to re-added to the todo list
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) 
{
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = 'X';

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('input');
    complete.type = 'checkbox';
    complete.classList.add('complete');

    // Add click event for completing the item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}