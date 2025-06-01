import { useState } from 'react';
import { useAddTodoMutation } from '../features/todos/todos-slice';
import { Button, Form } from 'react-bootstrap';

export default function AddTodo() {
    const [input, setInput] = useState('');
    const [desc, setDesc] = useState('');
    const [ date, setDate] = useState('');
    const [addTodo, { isLoading }] = useAddTodoMutation();

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };


    const handleAddTodo = (e) => {
        e.preventDefault();
        if (input.trim()) {
            //addTodo({ title: input, completed: false });
            // Если нужно добавить description и dueDate, раскомментируйте:
            addTodo({ title: input, description: desc, completed: false, dueDate: date });
            setInput('');
            setDate('');
            setDesc('');
        }
    };

    return (
        <Form
            onSubmit={handleAddTodo}
            className="d-flex justify-content-center align-items-center mb-4"
        >
            <Form.Group className="flex-fill me-2">
                <Form.Control
                    type="text"
                    id="newTask"
                    value={input}
                    onChange={handleInput}
                    placeholder="Новая задача..."
                    disabled={isLoading}
                />
                <Form.Control
                    type="text"
                    id="Desc"
                    value={desc}
                    onChange={handleDesc}
                    placeholder="Описание"
                    disabled={isLoading}
                />

                <Form.Control
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDate}
                    placeholder="Текущая дата"
                    disabled={isLoading}
                />
            </Form.Group>
            <Button type="submit" variant="info" disabled={isLoading}>
                {isLoading ? 'Добавление...' : 'Добавить'}
            </Button>
        </Form>
    );
}