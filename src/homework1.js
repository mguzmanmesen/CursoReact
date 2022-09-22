import React, {Component} from 'react';

export default class homework1 extends Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    userId: '',
                    id: '123',
                    title: '',
                    completed: true
                },
                {
                    userId: '',
                    id: '456',
                    title: '',
                    completed: false
                }
            ]
        };
    }

    async getAll() {
        const all = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await all.json();
        this.setState(
            {
                items: data
            }

        );
    }

    async componentDidMount() { 
        this.getAll();
    }

    render() { 
        return (
            <ul>
                {this.state.items.map((item, i) => (
                    <li>
                        <p>{item.id}</p>
                        <p>{item.title}</p>
                        <input type="checkbox" id="completed" name="completed" checked={item.completed}></input>
                    </li>

                )
                )}
            </ul>
        )
    }

}