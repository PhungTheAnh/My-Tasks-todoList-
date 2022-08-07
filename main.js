const inputText = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const listTasks = document.querySelector('.list-tasks')
const clearAll = document.querySelector('.footer button')


inputText.onkeyup = () => {
    let EnteredText = inputText.value;
    if (EnteredText.trim() != 0) { // trim() loai bo khoang trang 2 ben
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}


addBtn.onclick = () => {
    let EnteredText = inputText.value;
    let getLocalStorage = localStorage.getItem('New Task');
    if (getLocalStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorage);
    }
    listArray.push(EnteredText);
    localStorage.setItem('New Task', JSON.stringify(listArray));

    showTasks();
    addBtn.classList.remove('active');

}

showTasks = () =>{
    let getLocalStorage = localStorage.getItem('New Task');
    
    if (getLocalStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorage);
    }

    const pendingTaskNumb = document.querySelector('.pendingTasks');
    pendingTaskNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        clearAll.classList.add('active');
    } else {
        clearAll.classList.remove('active');
    }

    let newTask = '';
    listArray.forEach((element,index) => {
        newTask += `<li> ${element} <span class='icon' onclick='deleteTask(${index})'><i class="fas fa-trash"></i></span></li>`
    });
    console.log(listTasks);
    listTasks.innerHTML = newTask;
    inputText.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Task');
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);     //splice xoa,them phan tu mang
    localStorage.setItem('New Task', JSON.stringify(listArray));
    showTasks();
}

clearAll.onclick = () => {
    listArray = [];
    localStorage.setItem('New Task', JSON.stringify(listArray));
    showTasks();
}

 