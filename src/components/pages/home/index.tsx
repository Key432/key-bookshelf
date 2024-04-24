import { Logo } from "@/components/bases/logo";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

export function Home() {
  return (
    <Box>
      <Box textAlign='center' py={4}>
        <Logo variant='h3' component='h1' />
      </Box>
      <Container maxWidth='md'>
        <Box py={2}>
          <Typography variant='h4' component='h2' pb={1}>
            Purpose
          </Typography>
          <Typography pl={4}>家の本を（今度こそ）まとめる。</Typography>
          <Typography pl={4}>React+Next.jsのお勉強</Typography>
        </Box>
        <Box>
          <Typography variant='h4' component='h2' pb={1}>
            Content
          </Typography>
          <Box display='flex' gap={4} px={4}>
            <LinkCard href='/list' title='一覧・検索' description='登録した本の一覧・検索' />
            <LinkCard href='/edit' title='登録' description='本の登録' />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const LinkCard = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) => {
  return (
    <Card
      sx={{ "minWidth": 275, "&:hover": { backgroundColor: "#ffe3f8" } }}
      component='a'
      href={href}
    >
      <CardContent>
        <Typography variant='h6' component='h3'>
          {title}
        </Typography>
        <Typography variant='body1'>{description}</Typography>
      </CardContent>
    </Card>
  );
};
