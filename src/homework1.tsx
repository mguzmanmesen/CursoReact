import React from 'react';
import { setEnvironmentData } from 'worker_threads';


export const Homework1 = () => { 
    const [items, setItems] = React.useState(
        [
            {
                userId: '',
                id: '123',
                title: '',
                completed: true
            }
        ]
    );

    React.useEffect(() => {
        const fetchData = async () => {
            const all = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await all.json();
            setItems(data);
        }
        
        fetchData().catch(console.error);

    }, [items]);


    return (
        <ul>
            {items.map((item, i) => (
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
