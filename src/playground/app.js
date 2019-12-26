class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
    }

    componentDidMount() {

        try{
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
     
            if(options) {
     
                this.setState(() => ({options: options}))
            }

        }catch (e) {

        }
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {

            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(option) {
       this.setState((prev) => ({
           options: prev.options.filter((element) => element !== option )
       }))
    }

    handlePick() {
        alert(this.state.options[Math.floor(Math.random() * this.state.options.length)])
    }

    handleAddOption(option) {
        if (!option) {
            return "Enter Value Please"
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists"
        }
        this.setState((prev) => {
            // prev.options.push(option)
            return {
                options: prev.options.concat(option)
            }
        })
        console.log(option);
    }
    render() {
        const title = 'Indecision';
        const subtitle = "Put your life in the hands of a computer"
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision"
}

const Action = (props) => {

    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            > what should i do </button>
        </div>
    );
}

const Options = (props) => {

    return (
        <div>
            {props.options.length === 0 && <p>Please Enter Text</p>}
            <button onClick={props.handleDeleteOptions}>RemoveAll</button>
            {
                props.options.map(element => (<Option
                    key={element}
                    optionText={element}
                    handleDeleteOption={props.handleDeleteOption}
                />))}

        </div>
    );
}

const Option = (props) => {

    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }
                }
            >Remove</button>
        </div>
    )
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault()
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)

        this.setState(() => {
            return {
                error
            }
        });

        if (!error) {
            e.target.elements.option.value = "";
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button >AddOption</button>

                </form>
            </div>
        )
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById("app"));

// class VisibilityToggle extends React.Component {
//     constructor(props){
//         super(props)
//         this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
//         this.state = {
//             visibility: false
//         }
//     }

//     handleToggleVisibility(){
//         this.setState((prev) => {
//             return{

//                 visibility: !prev.visibility
//             }
//         })
//         console.log(this.state.visibility)
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Visibility Toggle</h1>
//                 <button onClick={this.handleToggleVisibility}>{
//                     this.state.visibility ? "Hide Details" : "Show Details"
//                 }</button>

//                 {this.state.visibility && (
//                     <p>Hey I Am Here With More Details</p>
//                 )}
//             </div>
//         )
//     }
// }

// ReactDOM.render(<VisibilityToggle/>, document.getElementById("app"))