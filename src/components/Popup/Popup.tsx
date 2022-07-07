import { Box, Button, Dialog, DialogActions, DialogContent, Stack, TextField } from "@mui/material";
import { DateRange, DesktopDateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { ru } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import React from 'react';

import { today, tomorrow } from "../../helpers/date";
import useForm from "../../hooks/useForm";
import useStore from "../../hooks/useStore";

function Popup() {
  const { todoStore } = useStore();
  const initialState = todoStore.todos.find((task) => task.id === todoStore.currentId) || { terms: [today, tomorrow] };
  const [values, setValues] = useForm(initialState);

  const close = () => todoStore.setCurrentId(-1);
  const updateTerms = (value: DateRange<Date>) => {
    const e = { target: { name: "terms", value } };
    setValues(e);
  };
  const submit = () => {
    if (values.name) {
      if (todoStore.currentId) todoStore.updateTodo(values);
      else todoStore.addTodo(values);
      close();
    }
  };

  return (
    <Dialog open={todoStore.currentId !== -1} onClose={close} fullWidth>
      <DialogContent>
        <Stack spacing={3} pt={2}>
          <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns} localeText={{ start: "Выдача", end: "Сдача" }}>
            <DesktopDateRangePicker
              value={values.terms}
              onChange={updateTerms}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} fullWidth />
                  <Box sx={{ mx: 2 }}> до </Box>
                  <TextField {...endProps} fullWidth />
                </>
              )}
            />
          </LocalizationProvider>
          <TextField label="Тема" name="name" value={values.name} onChange={setValues} fullWidth />
          <TextField
            label="Описание"
            name="desc"
            minRows={3}
            value={values.desc}
            onChange={setValues}
            multiline
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={submit}>{todoStore.currentId ? "Сохранить" : "Создать"}</Button>
        <Button onClick={close}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}

export default observer(Popup);
