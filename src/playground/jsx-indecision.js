console.log("some weird shit")


var app = {
    title: 'Indecision App',
    subtitle: 'blah blah blah',
    location: 'enugu',
    options: []
};

function getLocation(location) {
    if(location){
        return location;
    }
    return 'unknown';
}

const onFormSubmit = (e) => {
    e.preventDefault();
    
    const option = e.target.elements.option.value;
    if(option){
        app.options.push(option);
        e.target.elements.option.value = ""
        renderCounterApp();
    }
}

const removeAll = () => {
    app.options = []
    renderCounterApp();
}

const mult = (x) => {

    let d = app.options.map((element, i)=>  <li key={i+""}>{element}</li>)
    return(d)
}

const onMakeDesicion = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    if(app.options[randomNum]){

        alert (app.options[randomNum])
    }
};


var appRoot = document.getElementById('app');

const renderCounterApp = () =>   {
    var template = (
        <div>
            <h1>{app.title}</h1>
            <p>{app.subtitle}</p>
            <p>{app.options.length}</p>
            <button disabled={app.options.length == 0} onClick={onMakeDesicion}>What Should I Do</button>
            <ol>
                location: {mult(5)}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                {<button>Add Option </button>}
            </form>
            {<button onClick={removeAll}>RemoveAll </button>}
        </div>
    );
    ReactDOM.render(template, appRoot);
}
renderCounterApp();