import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDelayedEffect } from "./hooks/useDelayedEffect";

export type BookData = {
  keepPlace: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  ndc: string;
  memo: string;
};

type SnackStatus = {
  open: boolean;
  message?: string;
};

const initialMessage = "入力されたNDC9に対応する項目を表示します";

class ResponseError extends Error {
  response: Response;
  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

export function BookForm() {
  const { handleSubmit, register, watch, setValue, control } = useForm<BookData>();
  const [snackStatus, setSnackStatus] = useState<SnackStatus>({
    open: false,
    message: undefined,
  });
  const [ndcContent, setNdcContent] = useState<string>(initialMessage);
  const onSubmit = (data: BookData) => {
    console.log(data);
  };

  const handleClickISBNSearch = async () => {
    const isbn = watch("isbn");
    if (!isbn) return;
    try {
      const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0 || data[0] === null) {
          console.log(data);
          setSnackStatus({ open: true, message: "本が見つかりませんでした" });
          return;
        }
        const title = data[0]?.summary?.title ?? "";
        const author = data[0]?.summary?.author ?? "";
        const publisher = data[0]?.summary?.publisher ?? "";

        setValue("title", title);
        setValue("author", author);
        setValue("publisher", publisher);

        handleGuessNDC();
      }
    } catch (e) {
      console.error("error occared at fetch book data", e);
      setSnackStatus({ open: true, message: "エラーが発生しました" });
    }
  };

  const handleGuessNDC = async () => {
    const title = watch("title");
    const author = watch("author");
    const publisher = watch("publisher");

    if (title) {
      try {
        const bib =
          `${title}` + (author ? `/${author};` : ";") + (publisher ? `${publisher} 刊;` : ";");
        const formData = new FormData();
        formData.append("bib", bib);
        const response = await fetch("https://lab.ndl.go.jp/ndc/api/predict", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) setValue("ndc", data[0]?.value ?? "");
        } else {
          throw new ResponseError("fetch did not work", response);
        }
      } catch (e) {
        setSnackStatus({ open: true, message: "エラーが発生しました" });
      }
    } else {
      setSnackStatus({ open: true, message: "書名を入力してください" });
    }
  };

  useDelayedEffect(
    () => {
      const fetchNDCContent = async (ndc: string) => {
        try {
          const response = await fetch(`https://api-4pccg7v5ma-an.a.run.app/ndc9/${ndc}`, {
            mode: "cors",
          });
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setNdcContent(data["label@ja"] ? data["label@ja"] : initialMessage);
            }
          } else {
            throw new ResponseError("fetch did no work", response);
          }
        } catch (e) {
          if (e instanceof ResponseError) {
            if (e.response.status === 500)
              setSnackStatus({ open: true, message: "該当番号は不正です" });
          } else {
            console.error(e);
            setSnackStatus({ open: true, message: "エラーが発生しました" });
          }
          setNdcContent(initialMessage);
        }
      };
      const ndc = watch("ndc");
      if (/^\d{1,3}(\.\d{1,4})?$/.test(ndc)) {
        void fetchNDCContent(ndc);
      } else {
        setNdcContent(initialMessage);
      }
    },
    [watch("ndc")],
    1000,
  );

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
        <Grid item xs={6}>
          <Box display='flex' gap={2}>
            <Controller
              control={control}
              name='keepPlace'
              defaultValue='me'
              render={({ field, formState: { errors } }) => {
                return (
                  <FormControl fullWidth error={errors.keepPlace ? true : false}>
                    <InputLabel id='keepPlace'>保管場所</InputLabel>
                    <Select labelId='keepPlace' label='保管場所' {...field}>
                      <MenuItem value='me'>自宅（東京）</MenuItem>
                      <MenuItem value='parent'>実家</MenuItem>
                      <MenuItem value='grandparent'>祖父母宅</MenuItem>
                    </Select>
                  </FormControl>
                );
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display='flex' gap={2}>
            <TextField {...register("isbn")} label='ISBNコード' autoComplete='off' fullWidth />
            <Button variant='contained' type='button' onClick={handleClickISBNSearch}>
              検索
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' gap={2}>
            <Controller
              control={control}
              name='title'
              defaultValue=''
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    label='書名'
                    autoComplete='off'
                    fullWidth
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name='author'
            defaultValue=''
            render={({ field }) => {
              return <TextField label='著者' autoComplete='off' fullWidth {...field} />;
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name='publisher'
            defaultValue=''
            render={({ field }) => {
              return <TextField label='出版社' autoComplete='off' fullWidth {...field} />;
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' gap={2}>
            <Controller
              control={control}
              name='ndc'
              defaultValue=''
              render={({ field }) => {
                return (
                  <TextField
                    label='日本十進分類'
                    autoComplete='off'
                    sx={{ width: "50%" }}
                    {...field}
                  />
                );
              }}
            />
            <Button variant='contained' sx={{ width: "30%" }}>
              選択
            </Button>
            <Button variant='contained' sx={{ width: "20%" }} onClick={handleGuessNDC}>
              AI推測
            </Button>
          </Box>
          <Typography variant='caption'>{ndcContent}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label='メモ' multiline fullWidth rows={4} {...register("memo")} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            sx={{ paddingX: 4 }}
            type='submit'
            color='secondary'
            fullWidth
          >
            登録
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackStatus.open}
        autoHideDuration={3000}
        onClose={() => setSnackStatus({ open: false, message: undefined })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity='error'
          sx={{ width: "100%" }}
          onClose={() => setSnackStatus({ open: false, message: undefined })}
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
