import React from "react";
import AddOption from "./AddOptions";
import Options from "./Options.js";
import Action from "./Action.js";
import Header from "./Header";

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

export default IndecisionApp;