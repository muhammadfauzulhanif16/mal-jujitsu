import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Blockquote, Box, Grid, Text, Title } from '@mantine/core'
import { IconClipboardText, IconMedal, IconReport, IconReportAnalytics, IconUser } from '@tabler/icons-react'

const Dashboard = (props) => {
  const colorList = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  
  const colors = shuffleArray(colorList)
  
  const statList = [
    {
      icon: <IconUser />,
      label: 'pelatih',
      total: props.coaches.length,
      color: colors[0],
      description: 'orang',
    },
    {
      icon: <IconUser />,
      label: 'atlet',
      total: props.athletes.length,
      color: colors[1],
      description: 'orang',
    },
    {
      icon: <IconClipboardText />,
      label: 'latihan',
      total: props.exercises.length,
      color: colors[2],
      description: 'kali',
    },
    {
      icon: <IconMedal />,
      label: 'pertandingan',
      total: props.tournaments.length,
      color: colors[3],
      description: 'kali',
    },
    {
      icon: <IconReportAnalytics />,
      label: 'penilaian',
      total: props.evaluations.length,
      color: colors[4],
      description: `dari ${props.exercises.length} latihan`,
    },
    {
      icon: <IconReport />,
      label: 'laporan',
      total: 0,
      description: 'orang',
      color: colors[5],
    },
  ]
  
  return (
    <AppLayout title="Beranda" authed={props.auth.user} meta={props.meta}>
      <Box pb={54}>
        <Breadcrumbs navList={[{ label: 'Beranda' }]} />
      </Box>
      
      <Grid grow>
        {statList.map((stat, id, index) => (
          <Grid.Col span={{
            base: 12,
            xs: 6,
            sm: 4,
            lg: 2,
          }} key={id}>
            <Blockquote color={stat.color} radius={20} icon={stat.icon} styles={{ root: { padding: 32 } }}>
              <Title mb={16} fz={12} c="neutral.5">{stat.label.toUpperCase()}</Title>
              <Title fz={20}>{stat.total}</Title>
              <Text fz={14} c="neutral.5">{stat.description}</Text>
            </Blockquote>
          </Grid.Col>
        ))}
      </Grid>
      {/*<Center bg="gold.1" h="25vh" style={{*/}
      {/*  borderRadius: 16,*/}
      {/*}}>*/}
      {/*  <Title order={1} c="gold.9">*/}
      {/*    Selamat datang, {props.auth.user.full_name}!*/}
      {/*  </Title>*/}
      {/*</Center>*/}
    </AppLayout>
  )
}

export default Dashboard
