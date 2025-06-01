import { useCompleteMutation, useFetchTodosQuery, useNotCompleteMutation } from '../features/todos/todos-slice';
import React from 'react';
import {
    Card,
    Col,
    Container,
    ListGroup,
    Row,
    Tab,
    Tabs,
    Form
} from 'react-bootstrap';
import AddTodo from './AddTodo';

export default function TodoList() {
    const { data = [], isLoading, error } = useFetchTodosQuery();
    const [complete] = useCompleteMutation();
    const [notComplete] = useNotCompleteMutation();

    // Функция для переключения статуса задачи
    function toggle(todo) {
        if (todo.completed) {
            notComplete(todo.id);
        } else {
            complete(todo.id);
        }
    }

    if (isLoading) return <div>Загрузка задач...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    // Фильтрация задач для вкладок
    const allTodos = data;
    const activeTodos = data.filter(todo => !todo.completed);
    const completedTodos = data.filter(todo => todo.completed);

    // Компонент списка задач
    const renderTodos = (todos) =>
        todos.map(todo => (
            <ListGroup.Item
                key={todo.id}
                className="d-flex align-items-center border-0 mb-2 rounded"
                style={{ backgroundColor: '#f4f6f7' }}
            >
                <Form.Check
                    type="checkbox"
                    id={`check-${todo.id}`}
                    className="me-2"
                    checked={todo.completed}
                    onChange={() => toggle(todo)}
                    aria-label={`Переключить выполнение для ${todo.title}`}
                />
                {todo.completed ? <s>{todo.title}</s> : todo.title }
                {todo.completed ? <s>{ todo.description}</s> : todo.description }
                {todo.completed ?<s>{todo.dueDate} </s>: todo.dueDate}
            </ListGroup.Item>
        ));

    return (
        <section
            className="vh-100"
            style={{
                background: 'radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%)',
            }}
        >
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xl={10}>
                        <Card>
                            <Card.Body className="p-5">
                                {/* Форма добавления задачи */}
                                <AddTodo />

                                {/* Вкладки */}
                                <Tabs
                                    defaultActiveKey="all"
                                    id="todo-tabs"
                                    className="mb-4 pb-2"
                                >
                                    <Tab eventKey="all" title="Все">
                                        <ListGroup className="mb-0">{renderTodos(allTodos)}</ListGroup>
                                    </Tab>
                                    <Tab eventKey="active" title="Текущие">
                                        <ListGroup className="mb-0">{renderTodos(activeTodos)}</ListGroup>
                                    </Tab>
                                    <Tab eventKey="completed" title="Завершённые">
                                        <ListGroup className="mb-0">{renderTodos(completedTodos)}</ListGroup>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}