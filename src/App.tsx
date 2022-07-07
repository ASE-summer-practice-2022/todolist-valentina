import { Add, ClearAll } from "@mui/icons-material";
import { AppBar, Box, CssBaseline, Fab, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import styles from "./app.module.scss";
import Popup from "./components/Popup";
import Todo from "./components/Todo";
import useStore from "./hooks/useStore";
import Task from "./models/Task";

function App() {
  const { todoStore } = useStore();

  useEffect(() => {
    autorun(() => localStorage.setItem("todos", JSON.stringify(todoStore.todos)));
  }, [todoStore.todos]);

  const taskList = todoStore.todos.map((task: Task) => <Todo key={task.id} {...task} />);

  const openPopup = () => todoStore.setCurrentId(0);
  const clearTasks = () => todoStore.clearTasks();

  return (
    <Box className={styles.app}>
      <CssBaseline />
      {todoStore.currentId !== -1 && <Popup />}
      <AppBar position="static">
        <Container maxWidth="lg">
          <Stack direction="row" py={2}>
            <Fab color="primary" aria-label="add" onClick={openPopup}>
              <Add />
            </Fab>
            <Typography variant="h1" flex={1} align="center">
              СПИСОК ЗАДАЧ НА ПРАКТИКУ
            </Typography>
            <Fab color="primary" aria-label="clear-all" onClick={clearTasks}>
              <ClearAll />
            </Fab>
          </Stack>
        </Container>
      </AppBar>

      <Container maxWidth="lg">
        <Stack spacing={3} mt={4}>
          {taskList}
        </Stack>
      </Container>
    </Box>
  );
}

export default observer(App);
