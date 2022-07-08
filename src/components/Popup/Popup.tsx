import { Box, Button, Dialog, DialogActions, DialogContent, Stack, TextField } from "@mui/material";
import { DateRange, DesktopDateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { ru } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import React from "react";

import { today, tomorrow } from "../../helpers/date";
import useForm from "../../hooks/useForm";
import useStore from "../../hooks/useStore";
import { ITodo } from "../../models/Todo";

function Popup() {
  const { todoStore } = useStore();
  const init: ITodo = { id: "", name: "", terms: [today, tomorrow], desc: "", completed: false };
  const [values, setValues] = useForm(todoStore.currentTodo || init);

  const close = () => todoStore.setCurrentId(-1);
  const updateTerms = (value: DateRange<Date>) => setValues({ target: { name: "terms", value } });
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
          <LocalizationProvider
            adapterLocale={ru}
            dateAdapter={AdapterDateFns}
            localeText={{ start: "Дата выдачи", end: "Дата сдачи" }}
          >
            <DesktopDateRangePicker
              value={values.terms as DateRange<Date>}
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
          <TextField label="Тема" name="name" value={values.name} onChange={setValues} fullWidth autoComplete="off" />
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
