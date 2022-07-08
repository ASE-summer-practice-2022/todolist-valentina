import { Box, Button, Checkbox, Stack } from "@mui/material";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

import { parseDate } from "../../helpers/date";
import useStore from "../../hooks/useStore";
import styles from "./todo-item.module.scss";

interface TaskItemProps {
  id: string;
  name: string;
  terms: string[] | Date[];
  completed: boolean;
}

function TodoItem({ id, name, terms, completed }: TaskItemProps) {
  const { todoStore } = useStore();
  const [fade, setFade] = useState(false);

  const toggleChb = () => todoStore.toggleCompleted(id);
  const openPopup = () => todoStore.setCurrentId(id);
  const rmTodo = () => fade && todoStore.deleteTodo(id);
  const runRmAnim = () => setFade(true);

  return (
    <Stack
      className={classnames(styles.todo, completed && styles.completed, fade && styles.fade)}
      direction="row"
      onAnimationEnd={rmTodo}
    >
      <Checkbox checked={completed} onChange={toggleChb} />
      <Stack spacing={2}>
        <Box>Дата выдачи: {parseDate(terms[0])}</Box>
        <Box>Дата сдачи: {parseDate(terms[1])}</Box>
      </Stack>
      <Box flex={1} textAlign="center">
        {name}
      </Box>

      <Button className={classnames(completed && styles.completed)} variant="outlined" onClick={openPopup}>
        Открыть
      </Button>
      <Button className={classnames(completed && styles.completed)} variant="outlined" onClick={runRmAnim}>
        Удалить
      </Button>
    </Stack>
  );
}

export default observer(TodoItem);
