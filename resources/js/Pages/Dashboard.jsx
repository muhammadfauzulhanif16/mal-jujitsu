import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Blockquote, Box, Grid, Group, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconClipboardText, IconMedal, IconReport, IconReportAnalytics, IconUser } from '@tabler/icons-react'
import { AreaChart, BarChart } from '@mantine/charts'

const Dashboard = (props) => {
  console.log(props)
  const exerciseList = props.exercises
  const groupedExercises = exerciseList.reduce((grouped, exercise) => {
    const date = new Date(exercise.date)
    const year = date.getFullYear()
    
    let yearGroup = grouped.find(group => group.year === year)
    if (!yearGroup) {
      yearGroup = { year, exercises: [] }
      grouped.push(yearGroup)
    }
    yearGroup.exercises.push(exercise)
    
    return grouped
  }, [])
  
  console.log(groupedExercises)
  
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
  
  const areaData = [
    {
      date: 'Mar 22',
      Apples: 110,
    },
    {
      date: 'Mar 23',
      Apples: 60,
    },
    {
      date: 'Mar 24',
      Apples: 80,
    },
    {
      date: 'Mar 25',
      Apples: null,
    },
    {
      date: 'Mar 26',
      Apples: null,
    },
    {
      date: 'Mar 27',
      Apples: 40,
    },
    {
      date: 'Mar 28',
      Apples: 120,
    },
    {
      date: 'Mar 29',
      Apples: 80,
    },
  ]
  
  const barData = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ]
  
  return (
    <AppLayout title="Beranda" authed={props.auth.user} meta={props.meta}>
      <Box pb={54}>
        <Breadcrumbs navList={[{ label: 'Beranda' }]} />
      </Box>
      
      <Stack gap={32}>
        <SimpleGrid cols={{
          base: 1,
          xs: 2,
          sm: 3,
          lg: 6,
        }} spacing={24}>
          {statList.map((stat, id, index) => (
            <Blockquote key={id} color={stat.color} radius={20} icon={stat.icon} styles={{ root: { padding: 32 } }}>
              <Title mb={16} fz={12} c="neutral.5">{stat.label.toUpperCase()}</Title>
              <Title fz={20}>{stat.total}</Title>
              <Text fz={14} c="neutral.5">{stat.description}</Text>
            </Blockquote>
          ))}
        </SimpleGrid>
        
        <Grid gutter={32}>
          <Grid.Col span={8}>
            <Stack gap={32}>
              <Stack p={32} gap={32} style={{
                borderRadius: 20,
                border: '1px solid #dcdcdc',
              }}>
                <Group justify="space-between">
                  <Title fz={20} c="neutral.2">Latihan</Title>
                  
                  <Select
                    withAsterisk
                    variant="filled"
                    styles={{
                      label: { marginBottom: 8 },
                      input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                      section: { marginLeft: 0, width: 48, height: 48 },
                      error: { marginTop: 8 },
                    }}
                    leftSection={<IconUser />}
                    placeholder="Pilih latihan..."
                    checkIconPosition="right"
                    // onChange={(value) => {
                    //   form.setData('exercise_id', value)
                    //
                    //   if (!value) {
                    //     form.setError({ exercise_id: 'Latihan tidak boleh kosong.' })
                    //   } else {
                    //     form.clearErrors('exercise_id')
                    //   }
                    // }}
                    // data={props.exercises.map((exercise) => ({
                    //   value: exercise.id,
                    //   label: `${exercise.name} ~ ${exercise.date} (${exercise.athlete.full_name} ~ ${exercise.athlete.role})`,
                    // }))}
                  />
                </Group>
                
                <AreaChart
                  h={320}
                  data={areaData}
                  dataKey="date"
                  series={[{ name: 'Apples', color: 'indigo.6' }]}
                  curveType="bump"
                  connectNulls
                />
              </Stack>
              
              <Stack p={32} gap={32} style={{
                borderRadius: 20,
                border: '1px solid #dcdcdc',
              }}>
                <Group justify="space-between">
                  <Title fz={20} c="neutral.2">Pertandingan</Title>
                  
                  <Select
                    withAsterisk
                    variant="filled"
                    styles={{
                      label: { marginBottom: 8 },
                      input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                      section: { marginLeft: 0, width: 48, height: 48 },
                      error: { marginTop: 8 },
                    }}
                    leftSection={<IconUser />}
                    placeholder="Pilih latihan..."
                    checkIconPosition="right"
                    // onChange={(value) => {
                    //   form.setData('exercise_id', value)
                    //
                    //   if (!value) {
                    //     form.setError({ exercise_id: 'Latihan tidak boleh kosong.' })
                    //   } else {
                    //     form.clearErrors('exercise_id')
                    //   }
                    // }}
                    // data={props.exercises.map((exercise) => ({
                    //   value: exercise.id,
                    //   label: `${exercise.name} ~ ${exercise.date} (${exercise.athlete.full_name} ~ ${exercise.athlete.role})`,
                    // }))}
                  />
                </Group>
                
                <AreaChart
                  h={320}
                  data={areaData}
                  dataKey="date"
                  series={[{ name: 'Apples', color: 'indigo.6' }]}
                  curveType="bump"
                  connectNulls
                />
              </Stack>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Stack p={32} h="100%" gap={32} style={{
              borderRadius: 20,
              border: '1px solid #dcdcdc',
            }}>
              <Title fz={20} c="neutral.2">Peringkat</Title>
              
              <BarChart
                h="100%"
                data={barData}
                dataKey="month"
                series={[{ name: 'Smartphones', color: 'blue' }]}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
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
